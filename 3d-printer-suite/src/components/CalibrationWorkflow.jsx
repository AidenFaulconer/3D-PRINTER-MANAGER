import React, { useState, useEffect, useMemo } from 'react'
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
  Zap
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import { calibrationSteps } from '../data/calibrationSteps'
import { generateParameterizedGcode } from '../utils/GcodeParameterizer'
import { 
  getDefaultParameters, 
  loadParametersFromSettings, 
  saveParametersToSettings,
  saveParameterHistory,
  getBestParameters,
  getParameterHistory,
  clearParameterHistory,
  exportParameterHistory
} from '../utils/ParameterTracker'
import TemperatureChart from './controls/TemperatureChart'

const CalibrationWorkflow = () => {
  // Persistent state management using sessionStorage
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
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
  const [parameters, setParameters] = useState(() => {
    const saved = sessionStorage.getItem('calibration_parameters')
    return saved ? JSON.parse(saved) : {}
  })
  const [generatedGcode, setGeneratedGcode] = useState(() => {
    const saved = sessionStorage.getItem('calibration_generatedGcode')
    return saved || ''
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

  // Serial store subscriptions
  const status = useSerialStore(state => state.status)
  const sendGcodeProgram = useSerialStore(state => state.sendGcodeProgram)
  const temperatures = useSerialStore(state => state.temperatures)
  const position = useSerialStore(state => state.position)

  const currentStep = calibrationSteps[currentStepIndex]
  const isLastStep = currentStepIndex === calibrationSteps.length - 1
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
    sessionStorage.setItem('calibration_parameters', JSON.stringify(parameters))
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

  // Initialize parameters for current step
  useEffect(() => {
    if (currentStep) {
      const initializeParameters = async () => {
        try {
          // Try to load from printer settings first
          const loadedParams = await loadParametersFromSettings(currentStep.id)
          
          // Merge with step defaults
          const initialParams = {}
          currentStep.inputs?.forEach(input => {
            initialParams[input.key] = loadedParams[input.key] || input.defaultValue || ''
          })
          
          setParameters(prev => ({ ...prev, ...initialParams }))
        } catch (error) {
          console.error('Error loading parameters:', error)
          // Fall back to defaults
          const initialParams = {}
          currentStep.inputs?.forEach(input => {
            initialParams[input.key] = input.defaultValue || ''
          })
          setParameters(prev => ({ ...prev, ...initialParams }))
        }
      }
      
      initializeParameters()
    }
  }, [currentStepIndex])

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

  const handleParameterChange = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }))
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

  const cancelExecution = () => {
    if (confirm('Are you sure you want to cancel the current calibration execution?')) {
      setStepState('config')
      setWorkflowState('idle')
      setExecutionProgress({ sent: 0, total: 0 })
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
    if (workflowResults[stepId]?.completed) return 'completed'
    if (stepResults[stepId]) return 'review'
    if (currentStepIndex > calibrationSteps.findIndex(s => s.id === stepId)) return 'pending'
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
                onClick={cancelExecution}
                className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs"
              >
                Cancel
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
          {calibrationSteps.map((step, index) => {
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
                  <div className="text-sm font-medium">{step.name}</div>
                  <div className="text-xs text-gray-500">
                    {status === 'completed' ? 'Completed' :
                     status === 'review' ? 'Review Results' :
                     isCurrent ? 'Current' : 'Pending'}
                  </div>
                  </div>
                {index < calibrationSteps.length - 1 && (
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
              <span className="text-sm text-gray-500">Step {currentStepIndex + 1} of {calibrationSteps.length}</span>
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
          </div>

          {/* Step Content */}
          {stepState === 'config' && (
            <div className="space-y-6">
              {/* Parameters */}
              {currentStep.inputs && currentStep.inputs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStep.inputs.map(input => (
                    <div key={input.key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {input.label}
                        {input.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <input
                        type={input.type}
                        value={parameters[input.key] || ''}
                        onChange={(e) => handleParameterChange(input.key, e.target.value)}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={input.placeholder}
                      />
                      {input.description && (
                        <p className="text-xs text-gray-500">{input.description}</p>
                      )}
              </div>
            ))}
                </div>
              )}

              {/* Generated G-code Preview */}
              {generatedGcode && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Generated G-code:</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-40 overflow-y-auto">
                    <pre>{generatedGcode}</pre>
          </div>
        </div>
      )}

              {/* Start Button */}
              <div className="flex justify-end">
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