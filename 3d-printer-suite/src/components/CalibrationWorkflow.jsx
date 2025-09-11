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
  Box
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

// Import GLOBAL_PARAMETERS for UI indicators
const GLOBAL_PARAMETERS = {
  hotendTemp: true,
  bedTemp: true,
  nozzleDiameter: true,
  layerHeight: true,
  printSpeed: true,
  retractionDistance: true,
  retractionSpeed: true,
  primeSpeed: true,
  flowRate: true,
  wallThickness: true,
  enableABL: true,
  firstLayerSpeed: true
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
    return stepId === 'pid-autotune' || stepId === 'bed-leveling'
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

  // Load bed mesh when navigating to bed leveling step
  useEffect(() => {
    if (currentStep?.id === 'bed-leveling' && activePrinter?.id) {
      const loadBedMeshFromPrinter = useSerialStore.getState().loadBedMeshFromPrinter
      loadBedMeshFromPrinter(activePrinter.id)
      console.log('Loading bed mesh for bed leveling step')
    }
  }, [currentStep?.id, activePrinter?.id])

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
          
          // Create merged parameters: sessionStorage > global > printer settings > defaults
          const initialParams = {}
          currentStep.inputs?.forEach(input => {
            initialParams[input.key] = sessionParams[input.key] || 
                                     globalParams[input.key] || 
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

  const getStepStatus = (stepId) => {
    // Auto inference using serial store data
    try {
      const serialState = useSerialStore.getState()
      const printer = serialState.activePrinter
      const settings = printer?.printerSettings || {}
      const bedMesh = serialState.bedMesh

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
        if (hasMesh || meshFromSettings) return 'review'
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">3D Printer Calibration Workflow</h1>
          <div className="flex items-center gap-2">
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
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
              Reset Workflow
          </button>
        </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {workflowSteps.map((step, index) => {
            const Icon = getStepIcon(step.id)
            const status = getStepStatus(step.id)
            const isCurrent = index === currentStepIndex
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                  status === 'review' ? 'bg-yellow-500 border-yellow-500 text-white' :
                  isCurrent ? 'bg-blue-500 border-blue-500 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  {status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">
                    <span className="text-xs text-gray-400 mr-2">{getStepNumberDisplay(step.id)}</span>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {status === 'completed' ? 'Completed' :
                     status === 'review' ? 'Review Results' :
                     isCurrent ? 'Current' : 'Pending'}
                  </div>
                  </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                    )}
                  </div>
            )
          })}
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
                    <div><strong>Typical direction:</strong></div>
                    <div>↻ <strong>Clockwise</strong> = Lower the bed (bed moves away from nozzle)</div>
                    <div>↺ <strong>Counter-clockwise</strong> = Raise the bed (bed moves toward nozzle)</div>
                    <div className="mt-1 opacity-90">Note: Some printers invert this behavior depending on spring orientation and screw threading. Make a small test adjustment to confirm.</div>
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
                        disabled={stepState !== 'config'}
                        validate={validateInput}
                        syncWithStore={isGlobalParam}
                        getStoreValue={() => globalParams[input.key]}
                        onChangeStore={(value) => {
                          console.log('Store update for global parameter:', input.key, 'value:', value)
                          handleParameterChange(input.key, value)
                        }}
                        initialValue={parameters[input.key] || input.defaultValue || ''}
                        className={isGlobalParam ? 'border-blue-300 bg-blue-50' : ''}
                        errorClassName="text-red-600"
                        helpText={getParameterHelpText(input.key, currentStep.id)}
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

              {/* Bed Leveling Visualization or Generated G-code Preview */}
              {currentStep.id === 'bed-leveling' ? (
                <div className="space-y-4">
                  <BedMeshVisualization showStatus={true} showActions={true} />
                </div>
              ) : generatedGcode && (
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
                <button
                  onClick={startStep}
                  disabled={!isConnected || !generatedGcode}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Calibration
                </button>
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
