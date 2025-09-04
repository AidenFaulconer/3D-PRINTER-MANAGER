import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import { 
  Play, 
  Save, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Thermometer,
  Move,
  Zap,
  Settings,
  FileText,
  Image,
  ListChecks,
  Video,
  FolderUp
} from 'lucide-react'
import ConnectionButton from './controls/ConnectionButton'
import usePrintersStore from '../stores/printersStore'
import useSerialStore from '../stores/serialStore'

import CalibrationReportModal from './CalibrationReportModal'
import CalibrationMonitor from './CalibrationMonitor'
import BedLevelVisualization from './BedLevelVisualization'

const Tabs = ['Instructions', 'Visuals', 'Configuration', 'Results']

// Separate monitor component to prevent re-renders
const MonitorSection = memo(() => {
  return <CalibrationMonitor />
})

// Separate control section to prevent re-renders
const ControlSection = memo(({ 
  step,
  canProceed,
  execState,
  generateGcode,
  sendToPrinter,
  renderInput,
  pauseExec,
  resumeExec,
  abortExec,
  showGcode,
  setShowGcode,
  generatedGcode,
  copyGcode
}) => {
  // Get only the serial state we need directly from the store
  const serialStatus = useSerialStore(state => state.status)

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Configuration Parameters</h3>
        <ConnectionButton className="w-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(step.inputs || []).map(renderInput)}
      </div>
      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <button
          onClick={generateGcode}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Play className="h-4 w-4" />
          <span>Generate G-code</span>
        </button>
        <button
          onClick={sendToPrinter}
          disabled={serialStatus !== 'connected' || !canProceed || execState.running}
          className={`px-4 py-2 rounded-md transition-colors ${serialStatus === 'connected' && canProceed && !execState.running ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Send to Printer
        </button>

        {execState.running && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-40 bg-gray-200 rounded h-2 overflow-hidden">
              <div className="h-2 bg-blue-600" style={{ width: `${execState.total ? Math.round((execState.progress/execState.total)*100) : 0}%` }} />
            </div>
            <span>{execState.progress}/{execState.total}</span>
            {!execState.paused ? (
              <button className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded" onClick={pauseExec}>Pause</button>
            ) : (
              <button className="px-2 py-1 bg-green-100 text-green-800 rounded" onClick={resumeExec}>Resume</button>
            )}
            <button className="px-2 py-1 bg-red-100 text-red-800 rounded" onClick={abortExec}>Abort</button>
          </div>
        )}
      </div>
      {generatedGcode && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Generated G-code</h4>
            <div className="flex items-center gap-2">
              <button onClick={copyGcode} className="px-2 py-1 bg-gray-100 rounded text-sm">Copy</button>
              <button onClick={()=>setShowGcode(!showGcode)} className="px-2 py-1 bg-gray-100 rounded text-sm">{showGcode ? 'Hide' : 'Show'}</button>
            </div>
          </div>
          {showGcode && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{generatedGcode}</pre>
            </div>
          )}
        </div>
      )}
    </>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.canProceed === nextProps.canProceed &&
    prevProps.execState.running === nextProps.execState.running &&
    prevProps.execState.progress === nextProps.execState.progress &&
    prevProps.showGcode === nextProps.showGcode &&
    prevProps.generatedGcode === nextProps.generatedGcode
  )
})

// Configuration tab component
const ConfigurationTab = memo(({ 
  step,
  canProceed,
  execState,
  generateGcode,
  sendToPrinter,
  renderInput,
  pauseExec,
  resumeExec,
  abortExec,
  showGcode,
  setShowGcode,
  generatedGcode,
  copyGcode
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 space-y-4">
      <MonitorSection />
      <div className="h-px bg-gray-200" />
      {/* Add bed leveling visualization if this is a leveling-related step */}
      {step.category === 'Movement' && step.id.includes('level') && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bed Level Visualization</h3>
            <BedLevelVisualization />
          </div>
          <div className="h-px bg-gray-200" />
        </>
      )}
      <ControlSection 
        step={step}
        canProceed={canProceed}
        execState={execState}
        generateGcode={generateGcode}
        sendToPrinter={sendToPrinter}
        renderInput={renderInput}
        pauseExec={pauseExec}
        resumeExec={resumeExec}
        abortExec={abortExec}
        showGcode={showGcode}
        setShowGcode={setShowGcode}
        generatedGcode={generatedGcode}
        copyGcode={copyGcode}
      />
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.canProceed === nextProps.canProceed &&
    prevProps.execState.running === nextProps.execState.running &&
    prevProps.execState.progress === nextProps.execState.progress
  )
})

const CalibrationStep = memo(({ step = {}, onComplete }) => {
  // Get serial state from store with selective subscriptions
  const serialStatus = useSerialStore(state => state.status)
  const sendCommand = useSerialStore(state => state.sendCommand)
  const connect = useSerialStore(state => state.connect)
  const disconnect = useSerialStore(state => state.disconnect)

  // Prevent re-renders if serial props haven't changed
  const serialProps = useMemo(() => ({ 
    status: serialStatus, 
    send: sendCommand,
    connect,
    disconnect
  }), [serialStatus, sendCommand, connect, disconnect])
  // Get active tab from store
  
  // Only subscribe to the specific data we need to prevent unnecessary re-renders
  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const hasActivePrinter = usePrintersStore(state => !!state.printers.find(p => p.id === state.activePrinterId))
  const calibrationStepData = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.calibrationSteps?.[step.id]
  })
  const updateCalibrationStep = usePrintersStore(state => state.updateCalibrationStep)
  const storedTab = calibrationStepData?.activeTab || 'Instructions'
  const [activeTab, _setActiveTab] = useState(storedTab)
  // Update store when tab changes
  const setActiveTab = useCallback((newTab) => {
    _setActiveTab(newTab)
    if (activePrinterId && step?.id) {
      updateCalibrationStep(activePrinterId, step.id, { activeTab: newTab })
    }
  }, [activePrinterId, step?.id, updateCalibrationStep])
  
  // Keep local state in sync with store
  useEffect(() => {
    if (storedTab !== activeTab) {
      _setActiveTab(storedTab)
    }
  }, [storedTab])
  
  // Use refs to track if state has been initialized
  const initializedRef = useRef(false)
  const gcodeInitializedRef = useRef(false)
  const resultsInitializedRef = useRef(false)
  const inputValuesInitializedRef = useRef(false)
  const inputValuesRef = useRef({})
  
  const [inputValues, setInputValues] = useState({})
  const [generatedGcode, setGeneratedGcode] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [showGcode, setShowGcode] = useState(false)
  const [checklist, setChecklist] = useState({})
  const [results, setResults] = useState({ measurements: {}, notes: '', photos: [] })
  const fileInputRef = useRef(null)

  const [execState, setExecState] = useState({ running: false, paused: false, progress: 0, total: 0 })
  const [showReport, setShowReport] = useState(false)
  
  // Remove unused updateActiveTab since we're using setActiveTab directly


  // Initialize input values and checklist only when step changes
  useEffect(() => {
    if (!step?.id) return;

    // Skip if already initialized for this step
    if (initializedRef.current === step.id) return;
    initializedRef.current = step.id;

    // Get existing data from store
    const stepData = calibrationStepData;
    
    // Initialize input values if not already set
    if (!inputValuesInitializedRef.current) {
      if (stepData?.inputValues) {
        console.log('Loading input values from store:', stepData.inputValues);
        setInputValues(stepData.inputValues);
        inputValuesRef.current = stepData.inputValues;
      } else if (step.inputs) {
        const initialValues = {};
        step.inputs.forEach(input => {
          initialValues[input.key] = input.defaultValue;
        });
        console.log('Initializing input values with defaults:', initialValues);
        setInputValues(initialValues);
        inputValuesRef.current = initialValues;
      }
      inputValuesInitializedRef.current = true;
    }

    // Initialize checklist if not already set
    if (!Object.keys(checklist).length) {
      if (stepData?.checklist) {
        setChecklist(stepData.checklist);
      } else if (step.checklist) {
        const initChecklist = {};
        step.checklist.forEach((_, i) => { initChecklist[i] = false; });
        setChecklist(initChecklist);
      }
    }

    // Set completion status
    if (stepData?.completed && !isCompleted) {
      setIsCompleted(true);
    }
  }, [step?.id]) // Only run when step changes, safely handle undefined step

  // Debug effect to track tab changes
  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);

  // Load results from store if exists
  // Reset initialization refs when step changes
  useEffect(() => {
    gcodeInitializedRef.current = false
    resultsInitializedRef.current = false
    inputValuesInitializedRef.current = false
  }, [step.id])

  // Load saved data from store only once when component mounts or step changes
  useEffect(() => {
    if (calibrationStepData) {
      const stepData = calibrationStepData
      
      // Only load G-code if we haven't initialized it yet and there's saved data
      if (stepData.generatedGcode && !gcodeInitializedRef.current) {
        setGeneratedGcode(stepData.generatedGcode)
        gcodeInitializedRef.current = true
      }
      
      // Only load results if we haven't initialized them yet and there's saved data
      if (stepData.results && !resultsInitializedRef.current) {
        setResults(stepData.results)
        resultsInitializedRef.current = true
      }
    }
  }, [hasActivePrinter, step.id]) // Removed generatedGcode and results from dependencies

  if (!step) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Calibration Step Selected</h3>
        <p className="text-gray-500">Please select a calibration step from the sidebar</p>
      </div>
    )
  }

  const handleInputChange = useCallback((key, value) => {
    setInputValues(prev => {
      const newValues = {
        ...prev,
        [key]: value
      }
      inputValuesRef.current = newValues
      return newValues
    })
  }, [])

  const generateGcode = useCallback(() => {
    console.log('Generating G-code for step:', step?.id)
    console.log('Step gcode function:', step?.gcode)
    console.log('Input values:', inputValuesRef.current)
    
    if (!step?.gcode) {
      console.error('No gcode generator found for step:', step?.id)
      return
    }

    try {
      let gcode
      if (typeof step.gcode === 'function') {
        // Validate required inputs
        const missingInputs = step.inputs?.filter(input => 
          input.required && (inputValuesRef.current[input.key] === undefined || inputValuesRef.current[input.key] === '')
        )
        
        if (missingInputs?.length > 0) {
          console.error('Missing required inputs:', missingInputs.map(i => i.key))
          alert(`Missing required inputs: ${missingInputs.map(i => i.label || i.key).join(', ')}`)
          return
        }

        console.log('Calling gcode function with inputs:', inputValuesRef.current)
        gcode = step.gcode(inputValuesRef.current)
        console.log('Generated gcode:', gcode)
      } else if (typeof step.gcode === 'string') {
        gcode = step.gcode
        console.log('Using static gcode:', gcode)
      }

      if (gcode) {
        console.log('Setting generated gcode and showing preview')
        setGeneratedGcode(gcode)
        setShowGcode(true)
        gcodeInitializedRef.current = true // Mark as initialized to prevent overwriting
        
        // Save to store
        if (activePrinterId && step?.id) {
          updateCalibrationStep(activePrinterId, step.id, { 
            generatedGcode: gcode,
            inputValues: inputValuesRef.current
          })
        }
      } else {
        console.error('No gcode generated')
        alert('Failed to generate G-code. Please check the console for details.')
      }
    } catch (error) {
      console.error('Error generating gcode:', error)
      alert(`Error generating G-code: ${error.message}`)
    }
  }, [step?.gcode, step?.id, step?.inputs, activePrinterId, updateCalibrationStep])

  const sendToPrinter = useCallback(async () => {
    if (serialProps.status !== 'connected') {
      console.log('Cannot send to printer - not connected. Current status:', serialProps.status)
      return
    }
    if (!generatedGcode) {
      generateGcode()
      // Wait for next render to get updated gcode
      await new Promise(resolve => setTimeout(resolve, 0))
      if (!generatedGcode) return
    }
    
    // Safety checks for common cases
    const lower = generatedGcode.toUpperCase()
    const requiresHeat = /\bE[+\-]?\d/.test(lower) || /M109\s+S\d+/.test(lower)
    if (requiresHeat) {
      // ask confirmation
      if (!confirm('This routine may involve extrusion or heating. Ensure target temperatures are set and safe to proceed. Continue?')) return
    }
    
    // Optional temp checks (best-effort): request M105 and parse recent
    await sendCommand('M105')
    
    const lines = generatedGcode.split(/\r?\n/).map(l=>l.trim())
    const payload = lines.filter(l => l && !l.startsWith(';'))
    
    // Set initial state with safe defaults
    const initialState = {
      running: true,
      paused: false,
      progress: 0,
      total: payload.length
    }
    setExecState(initialState)
    
    try {
      for (let i = 0; i < payload.length; i++) {
        // Get current state safely
        const currentState = execState || initialState
        
        // Check execution state
        if (currentState.paused) { 
          i--
          await new Promise(r=>setTimeout(r,200))
          continue 
        }
        if (!currentState.running) break
        
        await sendCommand(payload[i])
        
        // Update progress safely
        setExecState(prev => ({
          ...(prev || initialState),
          progress: i+1
        }))
        
        // Fixed delay between commands
        await new Promise(r=>setTimeout(r, 60))
      }
    } finally {
      // Ensure we always reset running state safely
      setExecState(prev => ({
        ...(prev || initialState),
        running: false
      }))
    }
  }, [serialStatus, sendCommand, generatedGcode, execState, generateGcode])

  const pauseExec = useCallback(() => 
    setExecState(p => ({ ...p, paused: true }))
  , [])
  
  const resumeExec = useCallback(() => 
    setExecState(p => ({ ...p, paused: false }))
  , [])
  
  const abortExec = useCallback(() => 
    setExecState({ running: false, paused: false, progress: 0, total: 0 })
  , [])

  const canProceed = Object.values(checklist).every(Boolean) || (step.checklist || []).length === 0

  const saveConfiguration = () => {
    if (!hasActivePrinter) return

    const stepData = {
      completed: true,
      lastUpdated: new Date().toISOString(),
      inputValues: { ...inputValuesRef.current },
      generatedGcode: generatedGcode,
      category: step.category,
      checklist: { ...checklist },
      results: { ...results }
    }

    updateCalibrationStep(activePrinterId, step.id, stepData)
    setIsCompleted(true)
    if (onComplete) onComplete(step.id)
  }

  const copyGcode = () => {
    navigator.clipboard.writeText(generatedGcode).catch(()=>{})
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Temperature':
        return Thermometer
      case 'Movement':
        return Move
      case 'Quality':
        return Settings
      default:
        return Zap
    }
  }

  const CategoryIcon = getCategoryIcon(step.category)

  // Create individual tab handlers at the top level
  const handleInstructionsTab = useCallback(() => setActiveTab('Instructions'), [setActiveTab]);
  const handleVisualsTab = useCallback(() => setActiveTab('Visuals'), [setActiveTab]);
  const handleConfigurationTab = useCallback(() => setActiveTab('Configuration'), [setActiveTab]);
  const handleResultsTab = useCallback(() => setActiveTab('Results'), [setActiveTab]);

  // Map tab names to their handlers
  const tabHandlers = useMemo(() => ({
    'Instructions': handleInstructionsTab,
    'Visuals': handleVisualsTab,
    'Configuration': handleConfigurationTab,
    'Results': handleResultsTab
  }), [handleInstructionsTab, handleVisualsTab, handleConfigurationTab, handleResultsTab])

  // Memoize CalibrationMonitor to prevent unnecessary unmounts
  const memoizedMonitor = useMemo(() => (
    <CalibrationMonitor />
  ), [])

  const renderInput = useCallback((input) => {
    const { type, label, key, defaultValue, min, max, step: stepValue, required } = input
    // Access current inputValues via ref to avoid dependency issues
    const value = inputValuesRef.current[key] ?? defaultValue

    switch (type) {
      case 'checkbox':
        return (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              id={key}
              checked={value}
              onChange={(e) => handleInputChange(key, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={key} className="ml-2 text-sm text-gray-700">
              {label}
            </label>
          </div>
        )
      case 'number':
        return (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              id={key}
              value={value}
              onChange={(e) => handleInputChange(key, parseFloat(e.target.value) || 0)}
              min={min}
              max={max}
              step={stepValue}
              required={required}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )
      case 'text':
        return (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              required={required}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )
      default:
        return null
    }
  }, [handleInputChange])

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const readers = files.map((file) => new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve({ name: file.name, dataUrl: reader.result })
      reader.readAsDataURL(file)
    }))
    Promise.all(readers).then((images) => {
      setResults((prev) => ({ ...prev, photos: [...prev.photos, ...images] }))
    })
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <CategoryIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
          {isCompleted && (
            <CheckCircle className="h-6 w-6 text-green-500" />
          )}
        </div>
        <p className="text-gray-600">{step.description}</p>
        <div className="mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            step.category === 'Temperature' ? 'bg-red-100 text-red-800' :
            step.category === 'Movement' ? 'bg-blue-100 text-blue-800' :
            step.category === 'Quality' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {step.category}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {Tabs.map((tab) => (
            <button
              key={tab}
              onClick={tabHandlers[tab]}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Pre-checklist gate for Configuration */}
      {activeTab === 'Configuration' && !canProceed && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          Complete the pre-calibration checklist in the Instructions tab before proceeding.
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'Instructions' && (
        <div className="space-y-6">
          {/* Checklist */}
          {step.checklist && step.checklist.length > 0 && (
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Pre-Calibration Checklist</h3>
                <ListChecks className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-2">
                {step.checklist.map((item, idx) => (
                  <label key={idx} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={!!checklist[idx]} onChange={(e)=>setChecklist((prev)=>({...prev, [idx]: e.target.checked}))} />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Instructions list */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">Step-by-step Guide</h3>
            {step.instructions && step.instructions.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                {step.instructions.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-500">No detailed instructions available.</p>
            )}

            {step.commonIssues && step.commonIssues.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Common Issues & Solutions</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {step.commonIssues.map((ci, i) => (
                    <li key={i}><span className="font-medium">{ci.issue}:</span> {ci.solution}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.expectedOutcomes && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                <span className="font-medium">Expected Outcome:</span> {step.expectedOutcomes}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'Visuals' && (
        <div className="space-y-4">
          {step.videoUrl && (
            <div className="aspect-video bg-black rounded overflow-hidden">
              <iframe
                className="w-full h-full"
                src={step.videoUrl.replace('watch?v=', 'embed/')}
                title="Calibration Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {step.visualAids && step.visualAids.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {step.visualAids.map((v, i) => (
                <figure key={i} className="bg-white border border-gray-200 rounded p-2">
                  <img src={v.imageUrl} alt={v.caption} className="w-full h-48 object-cover rounded" />
                  <figcaption className="text-xs text-gray-600 mt-1">{v.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {!step.videoUrl && (!step.visualAids || step.visualAids.length === 0) && (
            <div className="text-sm text-gray-500">No visual references available.</div>
          )}
        </div>
      )}

      {activeTab === 'Configuration' && (
        <ConfigurationTab
          step={step}
          canProceed={canProceed}
          execState={execState}
          generateGcode={generateGcode}
          sendToPrinter={sendToPrinter}
          renderInput={renderInput}
          pauseExec={pauseExec}
          resumeExec={resumeExec}
          abortExec={abortExec}
          showGcode={showGcode}
          setShowGcode={setShowGcode}
          generatedGcode={generatedGcode}
          copyGcode={copyGcode}
        />
      )}

      {activeTab === 'Results' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="font-medium text-gray-900 mb-3">Record Measurements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-sm">
                <span className="text-gray-700">Primary Measurement</span>
                <input className="w-full border border-gray-300 rounded px-2 py-1" value={results.measurements.primary || ''} onChange={(e)=>setResults(prev=>({ ...prev, measurements: { ...prev.measurements, primary: e.target.value }}))} />
              </label>
              <label className="text-sm">
                <span className="text-gray-700">Secondary</span>
                <input className="w-full border border-gray-300 rounded px-2 py-1" value={results.measurements.secondary || ''} onChange={(e)=>setResults(prev=>({ ...prev, measurements: { ...prev.measurements, secondary: e.target.value }}))} />
              </label>
              <label className="text-sm">
                <span className="text-gray-700">Observation</span>
                <input className="w-full border border-gray-300 rounded px-2 py-1" value={results.measurements.observation || ''} onChange={(e)=>setResults(prev=>({ ...prev, measurements: { ...prev.measurements, observation: e.target.value }}))} />
              </label>
            </div>
            {/* Example: auto-calc for E-steps */}
            {step.id === 'extruder-esteps' && (
              <div className="mt-3 text-sm text-gray-700">
                <span className="font-medium">Helper:</span>{' '}
                {(() => {
                  const current = Number(inputValuesRef.current.currentEsteps || 0)
                  const requested = Number(inputValuesRef.current.extrudeDistance || 0)
                  const actual = Number(results.measurements.primary || 0)
                  if (current > 0 && requested > 0 && actual > 0) {
                    const newEsteps = (current * requested) / actual
                    return (
                      <>
                        Suggested E-steps: <span className="text-indigo-700 font-medium">{newEsteps.toFixed(2)}</span>
                        <button
                          className="ml-2 px-2 py-1 bg-indigo-600 text-white rounded"
                          onClick={() => setGeneratedGcode(`M92 E${newEsteps.toFixed(2)}\nM500`)}
                        >
                          Generate Update G-code
                        </button>
                      </>
                    )
                  }
                  return <span>Enter actual extruded mm as Primary Measurement to calculate new E-steps.</span>
                })()}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="font-medium text-gray-900 mb-3">Notes</h3>
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 h-28" value={results.notes} onChange={(e)=>setResults(prev=>({ ...prev, notes: e.target.value }))} />
          </div>

          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Photos</h3>
              <button className="px-3 py-2 bg-gray-100 rounded" onClick={()=>fileInputRef.current?.click()}><FolderUp className="h-4 w-4 inline mr-1"/>Upload</button>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
            </div>
            {results.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {results.photos.map((p, i) => (
                  <div key={i} className="border rounded overflow-hidden">
                    <img src={p.dataUrl} alt={p.name} className="w-full h-24 object-cover" />
                    <div className="text-xs text-gray-600 px-2 py-1 truncate">{p.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No photos uploaded.</div>
            )}
          </div>

          {/* Suggestion placeholder: computation rules can be implemented per step */}
          <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
            Suggestions will appear here based on recorded measurements.
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={saveConfiguration}
          disabled={!canProceed}
          className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
            canProceed ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="h-4 w-4" />
          <span>{isCompleted ? 'Update Results' : 'Save & Mark Complete'}</span>
        </button>
        {isCompleted && (
          <button className="ml-2 px-4 py-2 bg-gray-100 rounded" onClick={()=>setShowReport(true)}>Generate Report</button>
        )}
      </div>

      {showReport && (
        <CalibrationReportModal
          isOpen={showReport}
          onClose={()=>setShowReport(false)}
          step={step}
          stepData={{ inputValues: inputValuesRef.current, results, generatedGcode, lastUpdated: new Date().toISOString() }}
          printer={hasActivePrinter ? { id: activePrinterId } : null}
        />
      )}
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.serialProps.status === nextProps.serialProps.status &&
    prevProps.canProceed === nextProps.canProceed &&
    // prevProps.execState.running === nextProps.execState.running && 
    prevProps.activeTab === nextProps.activeTab && 
    prevProps.isCompleted === nextProps.isCompleted
  )
});

export default CalibrationStep
