import React, { useState, useEffect, useMemo, useRef } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Ruler,
  Zap,
  FileText,
  Box,
  Send
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'
import { calibrationSteps } from '../data/calibrationSteps'
import { getParameterHelpText } from '../data/parameterHelpText'
import { getStepNumberDisplay } from '../utils/calibrationNumbering'
import Input from './Input'

// Create custom workflow with bed leveling as first step
const createWorkflowSteps = () => {
  const bedLevelingStep = calibrationSteps.find(step => step.id === 'bed-leveling')
  const otherSteps = calibrationSteps.filter(step => step.id !== 'bed-leveling')
  
  if (bedLevelingStep) {
    return [bedLevelingStep, ...otherSteps]
  }
  return calibrationSteps
}

const workflowSteps = createWorkflowSteps()
import { generateParameterizedGcode } from '../utils/GcodeParameterizer'
import { 
  getDefaultParameters, 
  loadParametersFromSettings, 
  saveParametersToSettings,
  saveParameterHistory,
  getBestParameters,
  getParameterHistory,
  clearParameterHistory,
  exportParameterHistory,
  loadGlobalParameters,
  saveGlobalParameters,
  getMergedParameters,
  updateGlobalParameters
} from '../utils/ParameterTracker'

// Import GLOBAL_PARAMETERS for UI indicators and default values
const GLOBAL_PARAMETERS = {
  hotendTemp: 200,
  bedTemp: 60,
  nozzleDiameter: 0.4,
  layerHeight: 0.2,
  printSpeed: 50,
  retractionDistance: 5,
  retractionSpeed: 45,
  primeSpeed: 45,
  flowRate: 100,
  wallThickness: 0.4,
  enableABL: true,
  firstLayerSpeed: 20,
  probeZOffset: 0.0,
  bedLevelGridX: 5,
  bedLevelGridY: 5,
  currentEsteps: 93
}
import TemperatureChart from './controls/TemperatureChart'
import BedMeshVisualization from './BedMeshVisualization'
// Dynamic imports for 3D viewers to reduce bundle size
const GcodeViewer3D = React.lazy(() => import('./GcodeViewer3D').then(module => ({ default: module.GcodeViewer3D })))
const SimpleGcodeViewer3D = React.lazy(() => import('./SimpleGcodeViewer3D').then(module => ({ default: module.SimpleGcodeViewer3D })))

const CalibrationWorkflow = () => {
  // Check if we're coming from bed-leveling route
  const isBedLevelingRoute = window.location.hash === '#/bed-leveling'
  
  // Persistent state management using sessionStorage
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (isBedLevelingRoute) {
      // Find bed leveling step index
      const bedLevelingIndex = workflowSteps.findIndex(step => step.id === 'bed-leveling')
      return bedLevelingIndex >= 0 ? bedLevelingIndex : 0
    }
    const saved = sessionStorage.getItem('calibration_currentStepIndex')
    return saved ? parseInt(saved) : 0
  })
  const [workflowState, setWorkflowState] = useState(() => {
    const saved = sessionStorage.getItem('calibration_workflowState')
    return saved || 'idle'
  })
  const [stepState, setStepState] = useState(() => {
    const saved = sessionStorage.getItem('calibration_stepState')
    return saved || 'config'
  })
  const [parameters, setParameters] = useState({})
  const [generatedGcode, setGeneratedGcode] = useState(() => {
    const saved = sessionStorage.getItem('calibration_generatedGcode')
    return saved || ''
  })
  // Steps that do not produce printable toolpaths (prefer text view)
  const isNonPrintingStep = (stepId) => {
    return stepId === 'pid-autotune' || stepId === 'bed-leveling' || stepId === 'extruder-esteps'
  }

  const [gcodeViewMode, setGcodeViewMode] = useState(() => {
    const saved = sessionStorage.getItem('calibration_gcodeViewMode')
    if (saved) return saved
    const initialStep = workflowSteps[
      (typeof window !== 'undefined' && parseInt(sessionStorage.getItem('calibration_currentStepIndex') || '0')) || 0
    ]
    return initialStep && isNonPrintingStep(initialStep.id) ? 'text' : '3d'
  })
  const [executionProgress, setExecutionProgress] = useState(() => {
    const saved = sessionStorage.getItem('calibration_executionProgress')
    return saved ? JSON.parse(saved) : { sent: 0, total: 0 }
  })
  const [stepResults, setStepResults] = useState(() => {
    const saved = sessionStorage.getItem('calibration_stepResults')
    return saved ? JSON.parse(saved) : {}
  })
  const [workflowResults, setWorkflowResults] = useState(() => {
    const saved = sessionStorage.getItem('calibration_workflowResults')
    return saved ? JSON.parse(saved) : {}
  })
  const [isConnected, setIsConnected] = useState(false)
  const [globalParams, setGlobalParams] = useState({})
  const [bedMeshUpdateTrigger, setBedMeshUpdateTrigger] = useState(0)
  
  // Check if bed level quality is acceptable for printing
  const checkBedLevelQuality = (meshData) => {
    if (!meshData?.data || !Array.isArray(meshData.data)) return false
    
    try {
      // Flatten mesh data to get all Z values
      let values
      if (Array.isArray(meshData.data[0])) {
        // 2D array format
        values = meshData.data.flat().filter(v => typeof v === 'number')
      } else {
        // Object format with z property
        values = meshData.data.map(p => p.z).filter(v => typeof v === 'number')
      }
      
      if (values.length === 0) return false
      
      const minZ = Math.min(...values)
      const maxZ = Math.max(...values)
      const range = maxZ - minZ
      const avgZ = values.reduce((sum, val) => sum + val, 0) / values.length
      
      // Calculate average deviation from mean
      const avgDeviation = values.reduce((sum, val) => sum + Math.abs(val - avgZ), 0) / values.length
      
      // Acceptable tolerances:
      // - Total range ≤ 0.3mm (good for most printers)
      // - Average deviation ≤ 0.15mm (excellent for ABL)
      const isRangeAcceptable = range <= 0.3
      const isDeviationAcceptable = avgDeviation <= 0.15
      
      console.log('Bed level quality check:', {
        range: range.toFixed(3),
        avgDeviation: avgDeviation.toFixed(3),
        isRangeAcceptable,
        isDeviationAcceptable,
        overallAcceptable: isRangeAcceptable && isDeviationAcceptable
      })
      
      return isRangeAcceptable && isDeviationAcceptable
    } catch (error) {
      console.warn('Error checking bed level quality:', error)
      return false
    }
  }
  
  // Icon map for global parameter keys (reuse existing imported icons)
  const globalParamIcons = useMemo(() => ({
    hotendTemp: Thermometer,
    bedTemp: Thermometer,
    nozzleDiameter: Ruler,
    layerHeight: Ruler,
    printSpeed: Zap,
    retractionDistance: RotateCcw,
    retractionSpeed: Zap,
    primeSpeed: Zap,
    flowRate: Settings,
    wallThickness: Ruler,
    enableABL: Settings,
    firstLayerSpeed: Zap,
    probeZOffset: Ruler,
    bedLevelGridX: Settings,
    bedLevelGridY: Settings,
    currentEsteps: Ruler
  }), [])
  
  // Ref to track if parameters have been initialized for current step
  const initializedStepRef = useRef(null)

  // Serial store subscriptions
  const status = useSerialStore(state => state.status)
  const sendGcodeProgram = useSerialStore(state => state.sendGcodeProgram)
  const temperatures = useSerialStore(state => state.temperatures)
  const position = useSerialStore(state => state.position)
  const activeExecution = useSerialStore(state => state.activeExecution)
  const activePrinter = useSerialStore(state => state.activePrinter)

  const currentStep = workflowSteps[currentStepIndex]
  const isLastStep = currentStepIndex === workflowSteps.length - 1
  const isFirstStep = currentStepIndex === 0

  // Persist state changes to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('calibration_currentStepIndex', currentStepIndex.toString())
  }, [currentStepIndex])

  useEffect(() => {
    sessionStorage.setItem('calibration_workflowState', workflowState)
  }, [workflowState])

  useEffect(() => {
    sessionStorage.setItem('calibration_stepState', stepState)
  }, [stepState])

  useEffect(() => {
    // Only persist parameters if we're not in the middle of initializing
    if (Object.keys(parameters).length > 0) {
      sessionStorage.setItem('calibration_parameters', JSON.stringify(parameters))
    }
  }, [parameters])

  useEffect(() => {
    sessionStorage.setItem('calibration_generatedGcode', generatedGcode)
  }, [generatedGcode])

  useEffect(() => {
    sessionStorage.setItem('calibration_executionProgress', JSON.stringify(executionProgress))
  }, [executionProgress])

  useEffect(() => {
    sessionStorage.setItem('calibration_stepResults', JSON.stringify(stepResults))
  }, [stepResults])

  useEffect(() => {
    sessionStorage.setItem('calibration_workflowResults', JSON.stringify(workflowResults))
  }, [workflowResults])

  useEffect(() => {
    sessionStorage.setItem('calibration_gcodeViewMode', gcodeViewMode)
  }, [gcodeViewMode])

  // When step changes, automatically prefer text view for non-printing steps
  useEffect(() => {
    if (currentStep && isNonPrintingStep(currentStep.id) && gcodeViewMode !== 'text') {
      setGcodeViewMode('text')
    }
  }, [currentStepIndex])

  // Load global parameters when printer changes
  useEffect(() => {
    if (activePrinter?.id) {
      const globalParams = loadGlobalParameters(activePrinter.id)
      setGlobalParams(globalParams)
      console.log('Loaded global parameters for display:', globalParams)
    }
  }, [activePrinter?.id])

  // Refresh global parameters when serial store updates them
  useEffect(() => {
    if (activePrinter?.id && isConnected) {
      const refreshGlobalParams = () => {
        const updatedGlobalParams = loadGlobalParameters(activePrinter.id)
        setGlobalParams(updatedGlobalParams)
        console.log('Refreshed global parameters from store:', updatedGlobalParams)
      }
      
      // Refresh immediately
      refreshGlobalParams()
      
      // Set up interval to refresh periodically when connected
      const interval = setInterval(refreshGlobalParams, 2000)
      
      return () => clearInterval(interval)
    }
  }, [activePrinter?.id, isConnected])

  // Update parameters when global parameters change (for global parameter inputs)
  useEffect(() => {
    if (currentStep?.inputs && Object.keys(globalParams).length > 0) {
      const updatedParams = { ...parameters }
      let hasChanges = false
      
      currentStep.inputs.forEach(input => {
        // Only update if this is a global parameter and we don't have a value yet
        if (GLOBAL_PARAMETERS.hasOwnProperty(input.key) && 
            globalParams[input.key] !== undefined && 
            (parameters[input.key] === undefined || parameters[input.key] === '' || parameters[input.key] === input.defaultValue)) {
          updatedParams[input.key] = globalParams[input.key]
          hasChanges = true
        }
      })
      
      if (hasChanges) {
        console.log('Updating parameters with global values:', updatedParams)
        setParameters(updatedParams)
      }
    }
  }, [globalParams, currentStep?.inputs])

  // Calculate new e-steps when remaining filament is entered
  useEffect(() => {
    console.log('E-steps calculation useEffect triggered:', {
      stepId: currentStep?.id,
      remainingFilament: parameters.remainingFilament,
      currentEsteps: parameters.currentEsteps,
      extrudeDistance: parameters.extrudeDistance,
      allParameters: parameters
    })
    
    if (currentStep?.id === 'extruder-esteps' && parameters.remainingFilament && parameters.currentEsteps && parameters.extrudeDistance) {
      const remainingFilament = parseFloat(parameters.remainingFilament)
      const currentEsteps = parseFloat(parameters.currentEsteps)
      const extrudeDistance = parseFloat(parameters.extrudeDistance)
      
      console.log('Parsed values:', {
        remainingFilament,
        currentEsteps,
        extrudeDistance
      })
      
      if (remainingFilament > 0 && currentEsteps > 0 && extrudeDistance > 0) {
        // Calculate actual extruded distance
        const actualExtruded = extrudeDistance - remainingFilament
        
        console.log('Actual extruded calculation:', {
          extrudeDistance,
          remainingFilament,
          actualExtruded
        })
        
        if (actualExtruded > 0) {
          // New E-steps = (Current E-steps × Requested distance) ÷ Actual distance
          const newEsteps = (currentEsteps * extrudeDistance) / actualExtruded
          
          console.log('E-steps calculation:', {
            currentEsteps,
            extrudeDistance,
            remainingFilament,
            actualExtruded,
            newEsteps
          })
          
          setParameters(prev => {
            const updated = {
              ...prev,
              calculatedEsteps: Math.round(newEsteps * 10) / 10 // Round to 1 decimal place
            }
            console.log('Updating parameters with calculated e-steps:', updated)
            return updated
          })
        } else {
          console.log('Actual extruded is not positive:', actualExtruded)
        }
      } else {
        console.log('One or more values are not positive:', {
          remainingFilament,
          currentEsteps,
          extrudeDistance
        })
      }
    } else {
      console.log('Conditions not met for e-steps calculation')
    }
  }, [currentStep?.id, parameters.remainingFilament, parameters.currentEsteps, parameters.extrudeDistance])

  // Load bed mesh when navigating to bed leveling step
  useEffect(() => {
    if (currentStep?.id === 'bed-leveling' && activePrinter?.id) {
      const loadBedMeshFromPrinter = useSerialStore.getState().loadBedMeshFromPrinter
      loadBedMeshFromPrinter(activePrinter.id)
      console.log('Loading bed mesh for bed leveling step')
      
      // Force re-evaluation of step status when navigating to bed leveling
      setBedMeshUpdateTrigger(prev => prev + 1)
    }
  }, [currentStep?.id, activePrinter?.id])

  // Auto-proceed for bed leveling when marked as completed (ok)
  useEffect(() => {
    if (currentStep?.id === 'bed-leveling' && stepState === 'config') {
      const status = getStepStatus('bed-leveling')
      if (status === 'completed') {
        console.log('Bed leveling is marked as completed (ok), allowing user to proceed')
        setStepState('completed')
      }
    }
  }, [currentStep?.id, stepState, bedMeshUpdateTrigger])

  // Refresh global parameters when navigating to e-steps calibration
  useEffect(() => {
    if (currentStep?.id === 'extruder-esteps' && activePrinter?.id && isConnected) {
      // Immediately refresh global parameters for e-steps
      const refreshGlobalParams = () => {
        const updatedGlobalParams = loadGlobalParameters(activePrinter.id)
        setGlobalParams(updatedGlobalParams)
        console.log('Refreshed global parameters for e-steps navigation:', updatedGlobalParams)
      }
      
      refreshGlobalParams()
    }
  }, [currentStep?.id, activePrinter?.id, isConnected])

  // Force re-evaluation of step status when bed mesh data changes
  useEffect(() => {
    if (isConnected) {
      const unsubscribe = useSerialStore.subscribe(
        (state) => state.bedMesh,
        (bedMesh) => {
          if (bedMesh?.data && Array.isArray(bedMesh.data) && bedMesh.data.length > 0) {
            console.log('Bed mesh data updated, triggering step status re-evaluation')
            setBedMeshUpdateTrigger(prev => prev + 1)
          }
        }
      )
      
      return unsubscribe
    }
  }, [isConnected])

  // Initialize parameters for current step (only when step changes)
  useEffect(() => {
    if (currentStep && initializedStepRef.current !== currentStep.id && activePrinter?.id) {
      console.log('Initializing parameters for step:', currentStep.id, 'printer:', activePrinter.id, 'current parameters:', parameters)
      const initializeParameters = async () => {
        try {
          // Check sessionStorage first for this step's parameters
          const savedParams = sessionStorage.getItem('calibration_parameters')
          let sessionParams = {}
          if (savedParams) {
            try {
              sessionParams = JSON.parse(savedParams)
            } catch (e) {
              console.warn('Failed to parse saved parameters:', e)
            }
          }
          
          // Load global parameters for this printer
          const globalParams = loadGlobalParameters(activePrinter.id)
          console.log('Loaded global parameters:', globalParams)
          
          // Try to load from printer settings
          const loadedParams = await loadParametersFromSettings(currentStep.id)
          
          // For e-steps calibration, refresh global parameters after M92 command
          let refreshedGlobalParams = globalParams
          if (currentStep.id === 'extruder-esteps') {
            // Wait a bit more for the M92 response to be processed
            await new Promise(resolve => setTimeout(resolve, 1000))
            refreshedGlobalParams = loadGlobalParameters(activePrinter.id)
            console.log('Refreshed global parameters for e-steps:', refreshedGlobalParams)
            
            // Also update the global params state immediately
            setGlobalParams(refreshedGlobalParams)
          }
          
          // Create merged parameters: sessionStorage > global > printer settings > defaults
          const initialParams = {}
          currentStep.inputs?.forEach(input => {
            initialParams[input.key] = sessionParams[input.key] || 
                                     refreshedGlobalParams[input.key] || 
                                     loadedParams[input.key] || 
                                     input.defaultValue || ''
          })
          
          // Only update if we have inputs for this step and parameters aren't already set
          if (currentStep.inputs && currentStep.inputs.length > 0) {
            console.log('Setting initial parameters:', initialParams)
            setParameters(prev => {
              // Only update if we don't already have parameters for this step
              if (Object.keys(prev).length === 0 || initializedStepRef.current !== currentStep.id) {
                return initialParams
              }
              return prev
            })
            initializedStepRef.current = currentStep.id
          }
        } catch (error) {
          console.error('Error loading parameters:', error)
          // Fall back to global parameters + defaults
          const globalParams = loadGlobalParameters(activePrinter.id)
          const initialParams = {}
          currentStep.inputs?.forEach(input => {
            initialParams[input.key] = globalParams[input.key] || input.defaultValue || ''
          })
          console.log('Setting fallback parameters:', initialParams)
          setParameters(initialParams)
          initializedStepRef.current = currentStep.id
        }
      }
      
      initializeParameters()
    }
  }, [currentStepIndex, activePrinter?.id]) // Run when step or printer changes

  // Generate G-code when parameters change
  useEffect(() => {
    if (currentStep && Object.keys(parameters).length > 0) {
      generateGcode()
    }
  }, [parameters, currentStepIndex])

  const generateGcode = async () => {
    if (!currentStep) return

    try {
      if (currentStep.gcode) {
        const gcode = await currentStep.gcode(parameters)
        setGeneratedGcode(gcode)
      }
    } catch (error) {
      console.error('Error generating G-code:', error)
      setGeneratedGcode('')
    }
  }

  const downloadGcode = () => {
    if (!generatedGcode || !currentStep) return

    // Get printer information
    const { activePrinterId, printers } = usePrintersStore.getState()
    const activePrinter = printers.find(p => p.id === activePrinterId)
    
    // Generate filename with printer and material info
    const printerName = activePrinter?.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Unknown_Printer'
    const printerModel = activePrinter?.model?.replace(/[^a-zA-Z0-9]/g, '_') || 'Unknown_Model'
    const materialType = activePrinter?.printerSettings?.filament?.type?.replace(/[^a-zA-Z0-9]/g, '_') || 'PLA'
    const stepName = currentStep.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'calibration'
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `${stepName}_${printerName}_${printerModel}_${materialType}_${timestamp}.gcode`
    
    // Create and download file
    const blob = new Blob([generatedGcode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleParameterChange = (key, value) => {
    console.log('Parameter change:', key, 'from', parameters[key], 'to', value, 'step:', currentStep?.id)
    
    // Convert value to appropriate type
    let processedValue = value
    if (value === '') {
      processedValue = ''
    } else if (currentStep.inputs) {
      const inputDef = currentStep.inputs.find(input => input.key === key)
      if (inputDef?.type === 'number') {
        processedValue = parseFloat(value) || 0
      }
    }
    
    console.log('Processed value:', processedValue, 'for key:', key)
    
    setParameters(prev => {
      const newParams = {
        ...prev,
        [key]: processedValue
      }
      console.log('Setting new parameters:', newParams, 'previous:', prev)
      
      // Update global parameters if this is a global parameter
      if (activePrinter?.id && Object.keys(GLOBAL_PARAMETERS).includes(key)) {
        console.log('Updating global parameter:', key, 'to', processedValue)
        updateGlobalParameters(activePrinter.id, currentStep.id, { [key]: processedValue })
        
        // Update local global params state for immediate UI update
        setGlobalParams(prevGlobal => ({
          ...prevGlobal,
          [key]: processedValue
        }))
      }
      
      return newParams
    })
  }

  const sendToPrinter = async () => {
    if (!isConnected) {
      alert('Please connect to your printer first')
      return
    }

    if (!generatedGcode) {
      alert('No commands to send. Please generate commands first.')
      return
    }

    try {
      const sendCommand = useSerialStore.getState().sendCommand
      const commands = generatedGcode.split('\n').filter(line => line.trim())
      
      for (const command of commands) {
        if (command.trim()) {
          await sendCommand(command.trim())
          // Small delay between commands
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
      
      alert('Commands sent successfully!')
    } catch (error) {
      console.error('Error sending commands:', error)
      alert('Error sending commands: ' + error.message)
    }
  }

  const sendCalculatedEsteps = async () => {
    if (!isConnected) {
      alert('Please connect to your printer first')
      return
    }

    if (!parameters.calculatedEsteps || parameters.calculatedEsteps <= 0) {
      alert('Please calculate the new e-steps first by entering the remaining filament measurement.')
      return
    }

    try {
      const newEsteps = parameters.calculatedEsteps
      console.log('Sending calculated e-steps to printer:', newEsteps)
      
      const sendCommand = useSerialStore.getState().sendCommand
      
      // Send M92 command to set new e-steps
      await sendCommand(`M92 E${newEsteps}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for command to process
      
      // Save to EEPROM
      await sendCommand('M500')
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for save to complete
      
      // Update global parameters with new e-steps
      if (activePrinter?.id) {
        const updatedGlobalParams = { ...globalParams, currentEsteps: newEsteps }
        setGlobalParams(updatedGlobalParams)
        
        // Save to localStorage
        const { saveGlobalParameters } = await import('../utils/ParameterTracker.js')
        saveGlobalParameters(activePrinter.id, updatedGlobalParams)
        
        console.log('Updated global parameters with new e-steps:', newEsteps)
      }
      
      // Show success message
      useSerialStore.getState().appendSerialLog(`E-steps updated to ${newEsteps} and saved to EEPROM`, 'sys')
      alert(`E-steps successfully updated to ${newEsteps} and saved to printer!`)
      
    } catch (error) {
      console.error('Error sending calculated e-steps to printer:', error)
      useSerialStore.getState().appendSerialLog(`Error updating e-steps: ${error.message}`, 'err')
      alert('Error updating e-steps: ' + error.message)
    }
  }

  const startStep = async () => {
    if (!isConnected) {
      alert('Please connect to your printer first')
      return
    }

    setStepState('running')
    setWorkflowState('running')
    setExecutionProgress({ sent: 0, total: 0 })

    try {
      const result = await sendGcodeProgram(generatedGcode, {
        delayMs: 100,
        waitForReady: true,
        executionData: {
          stepName: currentStep.name,
          stepId: currentStep.id,
          workflowId: `calibration-${Date.now()}`
        },
        onProgress: (sent, total) => {
          setExecutionProgress({ sent, total })
        }
      })

      setStepState('review')
      setStepResults(prev => ({
        ...prev,
        [currentStep.id]: {
          parameters: { ...parameters },
          gcode: generatedGcode,
          executionResult: result,
          timestamp: Date.now()
        }
      }))
    } catch (error) {
      console.error('Error executing G-code:', error)
      alert('Error executing G-code: ' + error.message)
      setStepState('config')
      setWorkflowState('idle')
      setExecutionProgress({ sent: 0, total: 0 })
    }
  }

  const abortExecution = useSerialStore(state => state.abortExecution)
  
  const handleAbort = async () => {
    if (confirm('Are you sure you want to abort the current calibration execution? This will send an emergency stop to the printer.')) {
      try {
        await abortExecution()
        setStepState('config')
        setWorkflowState('idle')
        setExecutionProgress({ sent: 0, total: 0 })
      } catch (error) {
        console.error('Failed to abort execution:', error)
        alert('Failed to abort execution: ' + error.message)
      }
    }
  }

  const completeStep = async () => {
    setStepState('completed')
    
    const stepResult = {
      ...stepResults[currentStep.id],
      completed: true,
      timestamp: Date.now(),
      success: true
    }
    
    setWorkflowResults(prev => ({
      ...prev,
      [currentStep.id]: stepResult
    }))

    // Save parameter history
    saveParameterHistory(currentStep.id, parameters, stepResult)

    // Update global parameters for this printer
    if (activePrinter?.id) {
      updateGlobalParameters(activePrinter.id, currentStep.id, parameters)
      console.log('Updated global parameters for printer:', activePrinter.id)
    }

    // Save parameters to printer settings if step requires it
    if (currentStep.requiresSave) {
      try {
        await saveParametersToSettings(currentStep.id, parameters)
        await savePrinterSettings()
      } catch (error) {
        console.error('Error saving parameters:', error)
        alert('Error saving parameters: ' + error.message)
      }
    }
  }

  const savePrinterSettings = async () => {
    try {
      // Send M500 to save settings
      const sendCommand = useSerialStore.getState().sendCommand
      await sendCommand('M500')
      alert('Printer settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings: ' + error.message)
    }
  }

  const redoStep = () => {
    setStepState('config')
    setStepResults(prev => {
      const newResults = { ...prev }
      delete newResults[currentStep.id]
      return newResults
    })
  }

  const nextStep = () => {
    if (isLastStep) {
      setWorkflowState('completed')
    } else {
      setCurrentStepIndex(prev => prev + 1)
      setStepState('config')
    }
  }

  const skipStep = () => {
    // Mark step as skipped
    setStepResults(prev => ({
      ...prev,
      [currentStep.id]: {
        ...prev[currentStep.id],
        skipped: true,
        timestamp: Date.now(),
        reason: 'User skipped - previously completed'
      }
    }))
    
    // Move to next step
    nextStep()
  }

  const previousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1)
      setStepState('config')
    }
  }

  const resetWorkflow = () => {
    setCurrentStepIndex(0)
    setWorkflowState('idle')
    setStepState('config')
    setStepResults({})
    setWorkflowResults({})
    setParameters({})
    setGeneratedGcode('')
    setExecutionProgress({ sent: 0, total: 0 })
    
    // Clear sessionStorage
    sessionStorage.removeItem('calibration_currentStepIndex')
    sessionStorage.removeItem('calibration_workflowState')
    sessionStorage.removeItem('calibration_stepState')
    sessionStorage.removeItem('calibration_parameters')
    sessionStorage.removeItem('calibration_generatedGcode')
    sessionStorage.removeItem('calibration_executionProgress')
    sessionStorage.removeItem('calibration_stepResults')
    sessionStorage.removeItem('calibration_workflowResults')
  }


  // Recovery mechanism for interrupted executions
  useEffect(() => {
    const checkForInterruptedExecution = () => {
      if (workflowState === 'running' && stepState === 'running') {
        // Check if we're in the middle of an execution
        const savedProgress = sessionStorage.getItem('calibration_executionProgress')
        if (savedProgress) {
          const progress = JSON.parse(savedProgress)
          if (progress.sent > 0 && progress.sent < progress.total) {
            // We were interrupted during execution, show recovery option
            if (confirm('Previous calibration execution was interrupted. Do you want to continue from where you left off?')) {
              // Continue from where we left off
              setStepState('running')
              setWorkflowState('running')
            } else {
              // Reset to config state
              setStepState('config')
              setWorkflowState('idle')
              setExecutionProgress({ sent: 0, total: 0 })
            }
          }
        }
      }
    }

    checkForInterruptedExecution()
  }, [])

  // Prevent navigation away during execution
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (workflowState === 'running' && stepState === 'running') {
        e.preventDefault()
        e.returnValue = 'Calibration is currently running. Are you sure you want to leave?'
        return 'Calibration is currently running. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [workflowState, stepState])

  // Update connection status
  useEffect(() => {
    setIsConnected(status === 'connected')
  }, [status])

  // Sync with global execution state
  useEffect(() => {
    if (activeExecution && activeExecution.status === 'running') {
      // If there's an active execution and we're not in running state, sync
      if (stepState !== 'running') {
        setStepState('running')
        setWorkflowState('running')
        setExecutionProgress(activeExecution.progress)
      }
    } else if (!activeExecution && stepState === 'running') {
      // If there's no active execution but we think we're running, reset
      setStepState('config')
      setWorkflowState('idle')
      setExecutionProgress({ sent: 0, total: 0 })
    }
  }, [activeExecution])

  const getStepIcon = (stepId) => {
    const icons = {
      'pid-tune': Thermometer,
      'extruder-esteps': Ruler,
      'retraction-tuning': Zap,
      'first-layer': Settings,
      'temperature-tower': Thermometer,
      'flow-rate': Ruler,
      'calibration-cube': Ruler,
      'speed-calibration': Zap
    }
    return icons[stepId] || Settings
  }

  const getStepStatus = useMemo(() => {
    return (stepId) => {
      // Auto inference using serial store data
      try {
        const serialState = useSerialStore.getState()
        const printer = serialState.activePrinter
        const settings = printer?.printerSettings || {}
        const bedMesh = serialState.bedMesh
        
        // Force re-evaluation when bed mesh data changes
        if (bedMeshUpdateTrigger > 0) {
          console.log('Re-evaluating step status due to bed mesh update, trigger:', bedMeshUpdateTrigger)
        }

        // Heuristics per step
        if (stepId === 'pid-autotune') {
          const hot = settings?.pid?.hotend
          const bed = settings?.pid?.bed
          const looksTuned = hot && bed && hot.p > 0 && hot.i > 0 && hot.d >= 0 && bed.p > 0 && bed.i > 0 && bed.d >= 0
          if (looksTuned) return 'review' // previously tuned; not guaranteed perfect
        }
        if (stepId === 'bed-leveling') {
          const hasMesh = Array.isArray(bedMesh?.data) && bedMesh.data.length > 0
          const meshFromSettings = Array.isArray(settings?.bedLeveling?.mesh) && settings.bedLeveling.mesh.length > 0
          
          console.log('Bed leveling status check:', {
            hasMesh,
            meshFromSettings,
            bedMeshData: bedMesh?.data,
            settingsMesh: settings?.bedLeveling?.mesh
          })
          
          if (hasMesh || meshFromSettings) {
            // Check if bed is within acceptable tolerances
            const meshData = hasMesh ? bedMesh : { data: settings.bedLeveling.mesh }
            const isBedLevelAcceptable = checkBedLevelQuality(meshData)
            
            console.log('Bed level quality check result:', isBedLevelAcceptable)
            
            if (isBedLevelAcceptable) {
              console.log('Bed leveling marked as completed due to acceptable quality')
              return 'completed' // Bed is level enough for good prints
            } else {
              console.log('Bed leveling marked as review due to poor quality')
              return 'review' // Has mesh data but needs adjustment
            }
          } else {
            console.log('No bed mesh data available for bed leveling check')
          }
        }
        if (stepId === 'extruder-esteps') {
          const esteps = settings?.currentEsteps || settings?.esteps || serialState?.printerState?.esteps
          if (esteps && typeof esteps === 'number' && esteps > 0) return 'review'
        }
      } catch (e) {
        // fall through to manual status
      }

    if (workflowResults[stepId]?.completed) return 'completed'
    if (stepResults[stepId]) return 'review'
    if (currentStepIndex > workflowSteps.findIndex(s => s.id === stepId)) return 'pending'
    return 'current'
  }
  }, [bedMeshUpdateTrigger, workflowResults, stepResults, currentStepIndex])

  const getValidationChecks = (stepId) => {
    const checks = {
      'pid-tune': [
        'Check temperature stability - should be within ±1°C of target',
        'Verify no temperature oscillations',
        'Confirm heating time is reasonable'
      ],
      'extruder-esteps': [
        'Measure 100mm of filament with calipers',
        'Check if measurement matches expected 100mm',
        'Verify consistent extrusion throughout test'
      ],
      'retraction-tuning': [
        'Look for stringing between printed parts',
        'Check for blobs or zits on print surface',
        'Verify clean retraction without under-extrusion'
      ],
      'first-layer': [
        'Check bed adhesion - no warping or lifting',
        'Verify first layer height is consistent',
        'Look for proper squish without over-squish'
      ],
      'temperature-tower': [
        'Examine each temperature section for quality',
        'Look for best balance of strength and appearance',
        'Check for layer adhesion issues'
      ],
      'flow-rate': [
        'Measure wall thickness with calipers',
        'Check for over/under-extrusion patterns',
        'Verify consistent wall thickness'
      ],
      'calibration-cube': [
        'Measure cube dimensions with calipers',
        'Check for dimensional accuracy (should be 20mm)',
        'Look for layer consistency and surface quality'
      ],
      'speed-calibration': [
        'Check for ringing or ghosting at higher speeds',
        'Look for missed steps or layer shifts',
        'Verify print quality at different speeds'
      ]
    }
    return checks[stepId] || []
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Persistent Execution Status Banner */}
      {workflowState === 'running' && stepState === 'running' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                  <div>
                  <h3 className="font-medium text-blue-900">Calibration in Progress</h3>
                  <p className="text-sm text-blue-700">
                    {currentStep?.name} - {executionProgress.sent} / {executionProgress.total} commands sent
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    ⚠️ Do not navigate away or refresh the page during execution
                  </p>
                </div>
              </div>
            <div className="text-right">
              <div className="text-sm font-mono text-blue-800">
                {executionProgress.total > 0 ? 
                  `${Math.round((executionProgress.sent / executionProgress.total) * 100)}%` : 
                  '0%'
                }
              </div>
              <div className="w-24 bg-blue-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${executionProgress.total > 0 ? (executionProgress.sent / executionProgress.total) * 100 : 0}%` }}
                />
                  </div>
              <button
                onClick={handleAbort}
                className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs"
              >
                Abort (Emergency Stop)
              </button>
                  </div>
                </div>
              </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">3D Printer Calibration Workflow</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              workflowState === 'idle' ? 'bg-gray-100 text-gray-800' :
              workflowState === 'running' ? 'bg-blue-100 text-blue-800' :
              workflowState === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {workflowState === 'idle' && 'Ready to Start'}
              {workflowState === 'running' && 'Running'}
              {workflowState === 'completed' && 'Completed'}
              {workflowState === 'paused' && 'Paused'}
          </div>
            {workflowState === 'running' && stepState === 'running' && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Executing G-code...</span>
        </div>
      )}
          <button
              onClick={resetWorkflow}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
              Reset Workflow
          </button>
        </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          {workflowSteps.map((step, index) => {
            const Icon = getStepIcon(step.id)
            const status = getStepStatus(step.id)
            const isCurrent = index === currentStepIndex
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                  status === 'review' ? 'bg-yellow-500 border-yellow-500 text-white' :
                    stepResults[step.id]?.skipped ? 'bg-orange-500 border-orange-500 text-white' :
                  isCurrent ? 'bg-blue-500 border-blue-500 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                    {status === 'completed' ? <CheckCircle className="w-5 h-5" /> : 
                     stepResults[step.id]?.skipped ? <ArrowRight className="w-5 h-5" /> :
                     <Icon className="w-5 h-5" />}
                </div>
                  <div className="ml-3 min-w-0">
                  <div className="text-sm font-medium">
                    <span className="text-xs text-gray-400 mr-2">{getStepNumberDisplay(step.id)}</span>
                      <span className="truncate">{step.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {status === 'completed' ? 'Completed' :
                     status === 'review' ? 'Review Results' :
                       stepResults[step.id]?.skipped ? 'Skipped' :
                     isCurrent ? 'Current' : 'Pending'}
                  </div>
                  </div>
                {index < workflowSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-2 lg:mx-4 flex-shrink-0" />
                    )}
                  </div>
            )
          })}
          </div>
        </div>
      </div>

      {/* Current Step */}
      {currentStep && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{currentStep.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Step {currentStepIndex + 1} of {workflowSteps.length}</span>
                  </div>
                </div>

          {/* Step Description */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{currentStep.description}</p>
            {currentStep.instructions && (
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  {currentStep.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bed leveling: clarify turns to mm conversion */}
            {currentStep.id === 'bed-leveling' && (
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-800">Bed Leveling Knob Adjustment Guide</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Store per printer</span>
                  </div>
                </div>
                
                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-xs text-blue-800 font-medium mb-1">What is "one turn"?</p>
                  <p className="text-xs text-blue-700">
                    One complete 360° rotation of the bed leveling knob/screw. 
                    This is the distance the bed moves up or down when you turn the knob all the way around once.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Screw pitch (mm per full 360° turn):</label>
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                      value={globalParams.bedScrewPitch ?? 0.5}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (activePrinter?.id) {
                          updateGlobalParameters(activePrinter.id, currentStep.id, { bedScrewPitch: val })
                          setGlobalParams(prev => ({ ...prev, bedScrewPitch: val }))
                        }
                      }}
                    >
                      <option value={0.5}>0.50mm (M3 typical)</option>
                      <option value={0.7}>0.70mm (M4 typical)</option>
                      <option value={0.8}>0.80mm (M5 typical)</option>
                      <option value={1}>1.00mm</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-700">
                    {[
                      { label: '1/16 turn (22.5°)', frac: 1/16 },
                      { label: '1/8 turn (45°)', frac: 1/8 },
                      { label: '1/4 turn (90°)', frac: 1/4 },
                      { label: '1/2 turn (180°)', frac: 1/2 },
                      { label: '3/4 turn (270°)', frac: 3/4 },
                      { label: '1 full turn (360°)', frac: 1 }
                    ].map(({ label, frac }) => {
                      const pitch = globalParams.bedScrewPitch ?? 0.5
                      const mm = (pitch * frac).toFixed(3)
                      return (
                        <div key={label} className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-between">
                          <span className="text-xs">{label}</span>
                          <span className="font-mono text-xs">{mm}mm</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="text-xs text-yellow-800 space-y-1">
                    <div><strong>Typical direction (most printers):</strong></div>
                    <div>↻ <strong>Clockwise</strong> = Raise the bed (moves closer to nozzle)</div>
                    <div>↺ <strong>Counter-clockwise</strong> = Lower the bed (moves away from nozzle)</div>
                    <div className="mt-1 opacity-90">Note: Some printers may invert this behavior. Test with a small adjustment to confirm your printer's behavior.</div>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Step Content */}
          {stepState === 'config' && (
            <div className="space-y-6">

              {/* Parameters */}
              {currentStep.inputs && currentStep.inputs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStep.inputs.map(input => {
                    const isGlobalParam = Object.keys(GLOBAL_PARAMETERS).includes(input.key)
                    
                    // Validation function for this input
                    const validateInput = (value) => {
                      if (input.required && (!value || value === '')) {
                        return 'This field is required'
                      }
                      if (input.type === 'number' && value !== '') {
                        const numValue = parseFloat(value)
                        if (isNaN(numValue)) {
                          return 'Must be a valid number'
                        }
                        if (input.min !== undefined && numValue < input.min) {
                          return `Must be at least ${input.min}`
                        }
                        if (input.max !== undefined && numValue > input.max) {
                          return `Must be at most ${input.max}`
                        }
                      }
                      return true
                    }
                    
                    return (
                      <Input
                        key={input.key}
                        type={input.type}
                        label={input.label}
                        placeholder={input.placeholder}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        required={input.required}
                        readOnly={input.readOnly}
                        helpText={input.helpText}
                        disabled={stepState !== 'config'}
                        validate={validateInput}
                        syncWithStore={isGlobalParam}
                        getStoreValue={() => globalParams[input.key]}
                        controlledValue={isGlobalParam ? globalParams[input.key] : parameters[input.key]}
                        controlledOnChange={isGlobalParam ? (value) => {
                          console.log('Store update for global parameter:', input.key, 'value:', value)
                          handleParameterChange(input.key, value)
                        } : (value) => {
                          console.log('Regular parameter change:', input.key, 'value:', value)
                          handleParameterChange(input.key, value)
                        }}
                        initialValue={parameters[input.key] || input.defaultValue || ''}
                        className={isGlobalParam ? 'border-blue-300 bg-blue-50' : input.readOnly ? 'border-green-300 bg-green-50' : ''}
                        errorClassName="text-red-600"
                      />
                    )
                  })}
                </div>
              )}

              {/* Global Parameters Display - Ultra Compact */}
              {activePrinter?.id && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-1.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-xs font-medium text-blue-900 dark:text-blue-100 flex items-center gap-1">
                      <Settings className="w-2.5 h-2.5" />
                      Global Parameters
                    </h3>
                    <span className="text-xs text-blue-600 dark:text-blue-400">{activePrinter.name || `P${activePrinter.id}`}</span>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-0.5 text-xs">
                    {Object.entries(globalParams).map(([key, value]) => {
                      const Icon = globalParamIcons[key] || Settings
                      return (
                      <div key={key} className="flex justify-between items-center min-w-0 px-1 py-0.5 bg-white dark:bg-gray-800 rounded">
                          <span className="flex items-center gap-1 text-blue-700 dark:text-blue-300 font-medium truncate mr-1 text-xs">
                            <Icon className="w-3 h-3" />
                            {key}:
                          </span>
                        <span className="text-blue-900 dark:text-blue-100 font-mono text-xs">{value}</span>
                      </div>
                      )
                    })}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5 opacity-75">
                    Persist across steps • Saved per printer
                  </p>
                </div>
              )}

              {/* Bed Leveling Visualization */}
              {currentStep.id === 'bed-leveling' && (
                <div className="space-y-4">
                  <BedMeshVisualization showStatus={true} showActions={true} />
                  
                  {/* Bed Level Quality Indicator */}
                  {(() => {
                    const bedMesh = useSerialStore.getState().bedMesh
                    const printerSettings = usePrintersStore.getState().printers.find(p => p.id === activePrinter?.id)?.printerSettings
                    const hasMesh = Array.isArray(bedMesh?.data) && bedMesh.data.length > 0
                    const meshFromSettings = Array.isArray(printerSettings?.bedLeveling?.mesh) && printerSettings.bedLeveling.mesh.length > 0
                    
                    if (hasMesh || meshFromSettings) {
                      const meshData = hasMesh ? bedMesh : { data: printerSettings.bedLeveling.mesh }
                      const isAcceptable = checkBedLevelQuality(meshData)
                      
                      return (
                        <div className={`p-3 rounded-lg border ${isAcceptable ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${isAcceptable ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className={`font-medium ${isAcceptable ? 'text-green-800' : 'text-yellow-800'}`}>
                              {isAcceptable ? '✅ Bed Level Quality: EXCELLENT' : '⚠️ Bed Level Quality: NEEDS ADJUSTMENT'}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${isAcceptable ? 'text-green-700' : 'text-yellow-700'}`}>
                            {isAcceptable 
                              ? 'Your bed is level enough for high-quality prints with ABL. No manual adjustment needed!'
                              : 'Consider adjusting bed leveling knobs to improve print quality. Use the corner adjustment guide above.'
                            }
                          </p>
                        </div>
                      )
                    }
                    return null
                  })()}
                </div>
              )}

              {/* Non-printing steps: Show commands and send button */}
              {isNonPrintingStep(currentStep.id) && generatedGcode && (
                <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-700">Generated Commands:</h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={downloadGcode}
                            className="px-3 py-1 rounded text-sm flex items-center space-x-1 bg-green-600 text-white hover:bg-green-700"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={sendToPrinter}
                            disabled={serialStatus !== 'connected'}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send to Printer</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-40 overflow-y-auto">
                        <pre>{generatedGcode}</pre>
                      </div>
                      
                      {/* Step-specific acceptance criteria */}
                      {currentStep.id === 'bed-leveling' && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <h4 className="font-medium text-blue-800 mb-2">Acceptance Criteria:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Bed mesh range ≤ 0.3mm</li>
                            <li>• Average deviation ≤ 0.15mm</li>
                            <li>• ABL can compensate for these variations</li>
                          </ul>
                        </div>
                      )}
                      
                      {currentStep.id === 'pid-autotune' && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <h4 className="font-medium text-blue-800 mb-2">Acceptance Criteria:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Temperature remains stable during test</li>
                            <li>• No temperature oscillations</li>
                            <li>• PID values are automatically calculated</li>
                          </ul>
                        </div>
                      )}
                      
                      {currentStep.id === 'extruder-esteps' && (
                        <div className="space-y-3">
                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <h4 className="font-medium text-blue-800 mb-2">Acceptance Criteria:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Measure actual extrusion distance</li>
                              <li>• Calculate new E-steps: (Current × Requested) ÷ Actual</li>
                              <li>• Test with 100mm extrusion for accuracy</li>
                            </ul>
                          </div>
                          
                          {parameters.calculatedEsteps && parameters.calculatedEsteps > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded p-3">
                              <h4 className="font-medium text-green-800 mb-2">Apply Calculated E-Steps:</h4>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-green-700">
                                  <p>New E-steps: <span className="font-mono font-bold">{parameters.calculatedEsteps}</span></p>
                                  <p className="text-xs opacity-75">This will update your printer's E-steps and save to EEPROM</p>
                                </div>
                                <button
                                  onClick={sendCalculatedEsteps}
                                  disabled={!isConnected}
                                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                  <Send className="w-4 h-4" />
                                  <span>Send to Printer</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                </div>
              )}

              {/* Printing steps: Show full G-code visualization */}
              {!isNonPrintingStep(currentStep.id) && generatedGcode && currentStep.id !== 'extruder-esteps' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Generated G-code:</h3>
                <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setGcodeViewMode('text')}
                        className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                          gcodeViewMode === 'text' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Text View</span>
                      </button>
                      <button
                        onClick={() => {
                          console.log('Switching to 3D view, current mode:', gcodeViewMode)
                          setGcodeViewMode('3d')
                        }}
                        className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                          gcodeViewMode === '3d' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Box className="w-4 h-4" />
                        <span>3D View</span>
                      </button>
                    <button
                        onClick={downloadGcode}
                        className="px-3 py-1 rounded text-sm flex items-center space-x-1 bg-green-600 text-white hover:bg-green-700"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Download</span>
                    </button>
                </div>
              </div>

                  {gcodeViewMode === 'text' ? (
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-40 overflow-y-auto">
                      <pre>{generatedGcode}</pre>
                      </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      {console.log('Rendering 3D view, gcodeViewMode:', gcodeViewMode, 'generatedGcode length:', generatedGcode?.length)}
                      <React.Suspense fallback={
                        <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-800">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Loading 3D viewer...</p>
                      </div>
                    </div>
                      }>
                        <SimpleGcodeViewer3D 
                          content={generatedGcode} 
                          width="100%" 
                          height={600}
                          buildPlateSize={activePrinter?.bedSize || { x: 220, y: 220 }}
                        />
                      </React.Suspense>
                    </div>
                  )}
                    </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                {stepState === 'running' && (
                  <button
                    onClick={handleAbort}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Abort (Emergency Stop)
                  </button>
                )}
                <div className="flex gap-3">
                <button
                  onClick={startStep}
                  disabled={!isConnected || !generatedGcode}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Calibration
                </button>
                  
                  {/* Skip button for PID tuning and e-steps */}
                  {(currentStep.id === 'pid-autotune' || currentStep.id === 'extruder-esteps') && (
                    <button
                      onClick={skipStep}
                      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Skip (Previously Done)
                    </button>
                  )}
                </div>
                  </div>
                </div>
              )}

          {stepState === 'running' && (
            <div className="space-y-6">
              {/* Execution Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    Executing G-code...
                  </span>
                  <span className="font-mono">{executionProgress.sent} / {executionProgress.total} commands</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${executionProgress.total > 0 ? (executionProgress.sent / executionProgress.total) * 100 : 0}%` }}
                  />
            </div>
                <div className="text-xs text-gray-600 text-center">
                  {executionProgress.total > 0 ? 
                    `${Math.round((executionProgress.sent / executionProgress.total) * 100)}% complete` : 
                    'Preparing...'
                  }
        </div>
      </div>

              {/* Temperature Chart */}
              <div className="bg-gray-50 rounded p-4">
                <h3 className="font-medium text-gray-700 mb-2">Temperature Monitoring</h3>
                <TemperatureChart series={[]} />
              </div>

              {/* Current Status */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  <span>Hotend: {temperatures?.hotend?.current || 0}°C / {temperatures?.hotend?.target || 0}°C</span>
                      </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  <span>Bed: {temperatures?.bed?.current || 0}°C / {temperatures?.bed?.target || 0}°C</span>
                    </div>
                  </div>
                </div>
              )}

          {stepState === 'review' && (
            <div className="space-y-6">
              {/* Validation Checks */}
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h3 className="font-medium text-yellow-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Review Results
                </h3>
                <p className="text-yellow-800 mb-3">
                  Please check the following items after the calibration has completed:
                </p>
                <ul className="list-disc list-inside text-yellow-800 space-y-1">
                  {getValidationChecks(currentStep.id).map((check, index) => (
                    <li key={index}>{check}</li>
                  ))}
                </ul>
              </div>

              {/* Results Actions */}
              <div className="flex justify-between">
                <button
                  onClick={redoStep}
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Redo with New Parameters
                </button>
                <button
                  onClick={completeStep}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Complete Step
                </button>
                  </div>
                </div>
              )}

          {stepState === 'completed' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Step Completed
                </h3>
                <p className="text-green-800">
                  This calibration step has been completed successfully. You can proceed to the next step.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  disabled={isFirstStep}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  {isLastStep ? 'Finish Workflow' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Parameter History */}
      {currentStep && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Parameter History</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const history = getParameterHistory(currentStep.id)
                  if (history.length > 0) {
                    const bestParams = getBestParameters(currentStep.id)
                    setParameters(prev => ({ ...prev, ...bestParams }))
                  }
                }}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
              >
                Load Best Parameters
              </button>
                <button
                onClick={exportParameterHistory}
                className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm"
                >
                Export History
                </button>
                <button
                onClick={() => {
                  if (confirm('Clear parameter history for this step?')) {
                    clearParameterHistory(currentStep.id)
                    setParameters(getDefaultParameters(currentStep.id))
                  }
                }}
                className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
              >
                Clear History
                </button>
              </div>
          </div>
          
          <div className="space-y-2">
            {getParameterHistory(currentStep.id).length === 0 ? (
              <p className="text-gray-500 text-sm">No parameter history for this step yet.</p>
            ) : (
              <div className="space-y-2">
                {getParameterHistory(currentStep.id).slice(-5).reverse().map((entry, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        entry.result?.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {entry.result?.success ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      {Object.entries(entry.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setParameters(prev => ({ ...prev, ...entry.parameters }))}
                      className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs"
                    >
                      Use These Parameters
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Workflow Summary */}
      {workflowState === 'completed' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Calibration Workflow Completed</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              All calibration steps have been completed. Your printer should now be properly calibrated.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(workflowResults).map(([stepId, result]) => {
                const step = calibrationSteps.find(s => s.id === stepId)
                return (
                  <div key={stepId} className="bg-green-50 border border-green-200 rounded p-4">
                    <h3 className="font-medium text-green-900">{step?.name}</h3>
                    <p className="text-sm text-green-800">
                      Completed at {new Date(result.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalibrationWorkflow
