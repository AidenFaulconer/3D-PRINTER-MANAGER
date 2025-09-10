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
  FolderUp,
  Box
} from 'lucide-react'
import ConnectionButton from './controls/ConnectionButton'
import usePrintersStore from '../stores/printersStore'
import useSerialStore from '../stores/serialStore'
import { 
  loadGlobalParameters,
  saveGlobalParameters,
  updateGlobalParameters
} from '../utils/ParameterTracker'

import CalibrationReportModal from './CalibrationReportModal'
import CalibrationMonitor from './CalibrationMonitor'
import TemperatureControl from './controls/TemperatureControl'
import BedLevelVisualization from './BedLevelVisualization'
import { GcodeViewer3D } from './GcodeViewer3D'
import { SimpleGcodeViewer3D } from './SimpleGcodeViewer3D'
import Input from './Input'

const Tabs = ['Instructions', 'Visuals', 'Configuration', 'Results']

// Global parameters that should persist across all calibration steps
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

// Separate monitor component to prevent re-renders (TemperatureControl-only for this view)
const MonitorSection = memo(() => {
  const status = useSerialStore(state => state.status)
  const send = useSerialStore(state => state.sendCommand)
  return (
    <div className="mb-4">
      <TemperatureControl send={send} isConnected={status === 'connected'} />
    </div>
  )
})

// Download G-code function
const downloadGcode = (generatedGcode, step) => {
  if (!generatedGcode || !step) return

  // Get printer information
  const { activePrinterId, printers } = usePrintersStore.getState()
  const activePrinter = printers.find(p => p.id === activePrinterId)
  
  // Generate filename with printer and material info
  const printerName = activePrinter?.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Unknown_Printer'
  const printerModel = activePrinter?.model?.replace(/[^a-zA-Z0-9]/g, '_') || 'Unknown_Model'
  const materialType = activePrinter?.printerSettings?.filament?.type?.replace(/[^a-zA-Z0-9]/g, '_') || 'PLA'
  const stepName = step.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'calibration'
  
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
  copyGcode,
  activePrinterId,
  gcodeViewMode,
  setGcodeViewMode
}) => {
  // Get only the serial state we need directly from the store
  const serialStatus = useSerialStore(state => state.status)
  const activePrinter = usePrintersStore(state => state.printers.find(p => p.id === activePrinterId))

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration Parameters</h3>
        <ConnectionButton className="w-auto" />
      </div>
      
      {/* Global Parameters Display */}
      {activePrinterId && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Global Parameters for Printer {activePrinterId}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {Object.entries(loadGlobalParameters(activePrinterId)).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-blue-700 dark:text-blue-300 font-medium">{key}:</span>
                <span className="text-blue-900 dark:text-blue-100 font-mono">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            These parameters persist across all calibration steps and are saved per printer.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(step.inputs || []).map(renderInput)}
      </div>
      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <button
          onClick={generateGcode}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Play className="h-4 w-4" />
          <span>Generate G-code</span>
        </button>
        <button
          onClick={sendToPrinter}
          disabled={serialStatus !== 'connected' || !generatedGcode || execState.running}
          className={`px-4 py-2 rounded-md transition-colors shadow-sm ${serialStatus === 'connected' && generatedGcode && !execState.running ? 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
        >
          Send to Printer
        </button>

        {execState.running && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-40 bg-gray-300 dark:bg-gray-600 rounded h-2 overflow-hidden">
              <div className="h-2 bg-blue-600 dark:bg-blue-600" style={{ width: `${execState.total ? Math.round((execState.progress/execState.total)*100) : 0}%` }} />
            </div>
            <span>{execState.progress}/{execState.total}</span>
            {!execState.paused ? (
              <button className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded" onClick={pauseExec}>Pause</button>
            ) : (
              <button className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded" onClick={resumeExec}>Resume</button>
            )}
            <button className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded" onClick={abortExec}>Abort</button>
          </div>
        )}
      </div>
      {generatedGcode && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Generated G-code</h4>
            <div className="flex items-center gap-2">
              <button onClick={copyGcode} className="px-2 py-1 bg-gray-50 dark:bg-gray-8000 dark:bg-gray-700 rounded text-sm">Copy</button>
              <button onClick={() => downloadGcode(generatedGcode, step)} className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">Download</button>
              <button onClick={()=>{ const v=!showGcode; setShowGcode(v); try{ if(step?.id){ sessionStorage.setItem(`gcode_show_${step.id}`, v?'1':'0') } } catch{} }} className="px-2 py-1 bg-gray-50 dark:bg-gray-8000 dark:bg-gray-700 rounded text-sm">{showGcode ? 'Hide' : 'Show'}</button>
            </div>
          </div>
          {showGcode && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Preview Mode:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setGcodeViewMode('text')}
                    className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                      gcodeViewMode === 'text' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Text</span>
                  </button>
                  <button
                    onClick={() => setGcodeViewMode('3d')}
                    className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                      gcodeViewMode === '3d' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    <span>3D</span>
                  </button>
                </div>
              </div>
              
              {gcodeViewMode === 'text' ? (
                <div className="bg-gray-900 text-gray-400 dark:text-gray-500 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{generatedGcode}</pre>
                </div>
              ) : (
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <SimpleGcodeViewer3D 
                    content={generatedGcode} 
                    width="100%" 
                    height={600}
                    buildPlateSize={activePrinter?.bedSize || { x: 220, y: 220 }}
                  />
                </div>
              )}
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
    prevProps.generatedGcode === nextProps.generatedGcode &&
    prevProps.renderInput === nextProps.renderInput
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
  copyGcode,
  activePrinterId,
  gcodeViewMode,
  setGcodeViewMode
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6 space-y-4">
      <MonitorSection />
      <div className="h-px bg-gray-300 dark:bg-gray-600" />
      {/* Add bed leveling visualization if this is a leveling-related step */}
      {step.category === 'Movement' && step.id.includes('level') && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bed Level Visualization</h3>
            <BedLevelVisualization />
          </div>
          <div className="h-px bg-gray-300 dark:bg-gray-600" />
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
        activePrinterId={activePrinterId}
        gcodeViewMode={gcodeViewMode}
        setGcodeViewMode={setGcodeViewMode}
      />
    </div>
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
  const activePrinter = usePrintersStore(state => state.printers.find(p => p.id === state.activePrinterId))
  const hasActivePrinter = usePrintersStore(state => !!state.printers.find(p => p.id === state.activePrinterId))

  // Load global parameters when printer changes
  useEffect(() => {
    if (activePrinterId) {
      const globalParams = loadGlobalParameters(activePrinterId)
      setGlobalParams(globalParams)
      console.log('Loaded global parameters for display:', globalParams)
    }
  }, [activePrinterId])

  // Cleanup execution state when component unmounts or step changes
  useEffect(() => {
    return () => {
      // Only abort execution if we're actually changing steps, not just navigating away
      // The execution should continue running globally even when navigating between pages
      const { activeExecution } = useSerialStore.getState()
      if (activeExecution && activeExecution.stepId === step.id) {
        // Don't abort execution when just navigating away - let it continue globally
        // The GlobalExecutionStatus component will handle showing progress
        console.log('CalibrationStep unmounting, but keeping execution running globally')
      }
    }
  }, [step.id])
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
  const [inputUpdateCounter, setInputUpdateCounter] = useState(0)
  const [generatedGcode, setGeneratedGcode] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [globalParams, setGlobalParams] = useState({})
  const [showGcode, setShowGcode] = useState(false)
  const [gcodeViewMode, setGcodeViewMode] = useState('3d') // 'text' or '3d'
  const [checklist, setChecklist] = useState({})
  const [results, setResults] = useState({ measurements: {}, notes: '', photos: [] })
  const fileInputRef = useRef(null)

  const [showReport, setShowReport] = useState(false)
  
  // Get global execution state
  const activeExecution = useSerialStore(state => state.activeExecution)
  const execState = useMemo(() => {
    if (!activeExecution) {
      return { running: false, paused: false, progress: 0, total: 0 }
    }
    return {
      running: activeExecution.status === 'running',
      paused: false, // Global execution doesn't track pause state
      progress: activeExecution.progress?.sent || 0,
      total: activeExecution.progress?.total || 0
    }
  }, [activeExecution])
  
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
        // Load global parameters for this printer
        const globalParams = activePrinterId ? loadGlobalParameters(activePrinterId) : {};
        console.log('Loaded global parameters:', globalParams);
        
        const initialValues = {};
        step.inputs.forEach(input => {
          // Priority: global parameters > step defaults
          initialValues[input.key] = globalParams[input.key] || input.defaultValue;
        });
        console.log('Initializing input values with global + defaults:', initialValues);
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

  useEffect(() => {
    // Restore from sessionStorage to survive parent remounts
    if (!step?.id) return
    // For first-layer, always prefer latest generator: clear any cached legacy preview
    if (step.id === 'first-layer') {
      try {
        sessionStorage.removeItem(`gcode_${step.id}`)
        sessionStorage.removeItem(`gcode_show_${step.id}`)
      } catch {}
    }
    const savedGcode = sessionStorage.getItem(`gcode_${step.id}`)
    const savedShow = sessionStorage.getItem(`gcode_show_${step.id}`)
    if (savedGcode && !gcodeInitializedRef.current) {
      setGeneratedGcode(savedGcode)
      gcodeInitializedRef.current = true
    }
    if (savedShow != null) {
      setShowGcode(savedShow === '1')
    }
  }, [step?.id])

  if (!step) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Calibration Step Selected</h3>
        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500">Please select a calibration step from the sidebar</p>
      </div>
    )
  }

  const handleInputChange = useCallback((key, value) => {
    console.log(`handleInputChange called: ${key} = ${value}`)
    
    setInputValues(prev => {
      const newValues = {
        ...prev,
        [key]: value
      }
      inputValuesRef.current = newValues
      
      console.log('New input values:', newValues)
      
        // Update global parameters if this is a global parameter
        if (activePrinterId && GLOBAL_PARAMETERS[key]) {
          updateGlobalParameters(activePrinterId, step.id, newValues)
          console.log('Updated global parameter:', key, '=', value)
          
          // Update local global params state for immediate UI update
          setGlobalParams(prevGlobal => ({
            ...prevGlobal,
            [key]: value
          }))
        }
      
      return newValues
    })
    
    // Force re-render by incrementing counter
    setInputUpdateCounter(prev => prev + 1)
  }, [activePrinterId, step.id])

  const generateGcode = useCallback(async () => {
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
        gcode = await step.gcode(inputValuesRef.current)
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
        
        // Persist locally to avoid losing on parent rerenders
        try {
          if (step?.id && step.id !== 'first-layer') { // avoid caching legacy preview for first-layer
            sessionStorage.setItem(`gcode_${step.id}`, gcode)
            sessionStorage.setItem(`gcode_show_${step.id}`, '1')
          }
        } catch {}
        
        // IMPORTANT: Do NOT write to the global store here to avoid triggering parent rerenders.
        // Persisting is handled explicitly in saveConfiguration().
      } else {
        console.error('No gcode generated')
        alert('Failed to generate G-code. Please check the console for details.')
      }
    } catch (error) {
      console.error('Error generating gcode:', error)
      alert(`Error generating G-code: ${error.message}`)
    }
  }, [step?.gcode, step?.id, step?.inputs])

  const sendToPrinter = useCallback(async () => {
    if (serialStatus !== 'connected') {
      console.log('Cannot send to printer - not connected. Current status:', serialStatus)
      return
    }
    if (!generatedGcode) {
      await generateGcode()
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
    // Note: Execution state is managed by the global serial store
    // We don't need to set local state here
    
    try {
      const sendProgram = useSerialStore.getState().sendGcodeProgram
      if (typeof sendProgram === 'function') {
        await sendProgram(payload.join('\n'), {
          delayMs: 60,
          waitForOk: true,
          okTimeoutMs: 5000,
          executionData: {
            stepName: step.name,
            stepId: step.id,
            workflowId: `calibration-${Date.now()}`
          },
          onProgress: (progress, total) => {
            // Progress is handled by the global serial store
            console.log(`G-code progress: ${progress}/${total}`)
          }
        })
      } else {
        // Fallback: line-by-line - start execution tracking manually
        const { startExecution, updateExecutionProgress, completeExecution } = useSerialStore.getState()
        startExecution({
          stepName: step.name,
          stepId: step.id,
          totalCommands: payload.length,
          workflowId: `calibration-${Date.now()}`
        })
        
        try {
          for (let i = 0; i < payload.length; i++) {
            // Check if execution is still running via global store
            const currentExecution = useSerialStore.getState().activeExecution
            if (currentExecution?.status === 'paused') { 
              i--; 
              await new Promise(r=>setTimeout(r,200)); 
              continue 
            }
            if (currentExecution?.status !== 'running') {
              console.log('Execution stopped, breaking out of loop')
              break
            }
            
            // Check if execution was aborted
            if (currentExecution?.status === 'cancelled') {
              console.log('Execution was cancelled, breaking out of loop')
              break
            }
            
            // Use sendCommandWithWait to ensure we wait for printer to be ready
            const { sendCommandWithWait } = useSerialStore.getState()
            await sendCommandWithWait(payload[i], { waitForReady: true })
            console.log(`Sent line ${i+1}/${payload.length}: ${payload[i]}`)
            
            // Update progress
            updateExecutionProgress({ sent: i + 1, total: payload.length })
            
            await new Promise(r=>setTimeout(r, 60))
          }
          
          // Complete execution
          completeExecution({ success: true })
        } catch (error) {
          // Complete execution with error
          completeExecution({ success: false, error: error.message })
          throw error
        }
      }
    } finally {
      // Execution state is managed by the global serial store
      console.log('G-code execution completed')
    }
  }, [serialStatus, sendCommand, generatedGcode, execState, generateGcode])

  const pauseExec = useCallback(() => {
    // Pause execution via global serial store
    const pauseExecution = useSerialStore.getState().pauseExecution
    if (pauseExecution) {
      pauseExecution()
    }
  }, [])
  
  const resumeExec = useCallback(() => {
    // Resume execution via global serial store
    const resumeExecution = useSerialStore.getState().resumeExecution
    if (resumeExecution) {
      resumeExecution()
    }
  }, [])
  
  const abortExec = useCallback(() => {
    // Abort execution via global serial store
    const abortExecution = useSerialStore.getState().abortExecution
    if (abortExecution) {
      abortExecution()
    }
  }, [])

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

  // Reference images for "GOOD" vs "BAD" outcomes per step
  const referenceImageMap = useMemo(() => ({
    'first-layer': {
      good: {
        urls: [
          'https://reprap.org/mediawiki/images/d/d8/First_layer_good_example.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/1/1b/3D_print_first_layer_good_example.jpg'
        ],
        caption: 'GOOD: Smooth lines, slight squish, even surface'
      },
      bad: {
        urls: [
          'https://reprap.org/mediawiki/images/3/3b/First_layer_bad_example.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/5/57/3D_print_first_layer_bad_example.jpg'
        ],
        caption: 'BAD: Under-extruded/too high Z — lines separated and rough'
      }
    },
    'extruder-esteps': {
      good: {
        urls: [
          'https://reprap.org/mediawiki/images/0/0e/Extrusion_good_example.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/7/7e/3D_print_good_extrusion_example.jpg'
        ],
        caption: 'GOOD: Accurate measured extrusion length'
      },
      bad: {
        urls: [
          'https://reprap.org/mediawiki/images/4/4e/Extrusion_bad_example.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/4/4d/3D_print_under_over_extrusion_example.jpg'
        ],
        caption: 'BAD: Over/under extrusion — inaccurate length vs requested'
      }
    }
  }), [])

  const ReferenceImage = ({ urls = [], alt = '', caption = '', fallbackQuery = '' }) => {
    const [idx, setIdx] = useState(0)
    const current = urls[idx]
    return (
      <div>
        {current ? (
          <img
            src={current}
            alt={alt}
            className="w-full h-56 object-cover rounded"
            onError={() => setIdx((i) => i + 1)}
          />
        ) : (
          <div className="w-full h-56 bg-gray-50 dark:bg-gray-8000 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500">
            Image unavailable. {fallbackQuery && (
              <a
                className="underline ml-1"
                href={`https://www.google.com/search?q=${encodeURIComponent(fallbackQuery)}`}
                target="_blank" rel="noreferrer"
              >Search examples</a>
            )}
          </div>
        )}
        {caption && <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">{caption}</div>}
      </div>
    )
  }

  // Helper to get privacy-enhanced YouTube embed URL
  const getEmbedUrl = useCallback((url) => {
    if (!url) return null
    try {
      // Extract video id for common forms
      // e.g. https://www.youtube.com/watch?v=VIDEOID or youtu.be/VIDEOID
      const ytIdMatch = url.match(/[?&]v=([^&]+)|youtu\.be\/([^?&/]+)/)
      const vid = ytIdMatch ? (ytIdMatch[1] || ytIdMatch[2]) : null
      if (vid) {
        return `https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`
      }
      // fallback to original embed transform
      return url.replace('watch?v=', 'embed/').replace('www.youtube.com', 'www.youtube-nocookie.com') + (url.includes('?') ? '&' : '?') + 'rel=0&modestbranding=1'
    } catch {
      return url
    }
  }, [])

  // Memoize CalibrationMonitor to prevent unnecessary unmounts
  const memoizedMonitor = useMemo(() => (
    <CalibrationMonitor />
  ), [])

  const renderInput = useCallback((input) => {
    const { type, label, key, defaultValue, min, max, step: stepValue, required } = input
    const isGlobalParam = GLOBAL_PARAMETERS[key]

    // Validation function for this input
    const validateInput = (value) => {
      if (required && (!value || value === '')) {
        return 'This field is required'
      }
      if (type === 'number' && value !== '') {
        const numValue = parseFloat(value)
        if (isNaN(numValue)) {
          return 'Must be a valid number'
        }
        if (min !== undefined && numValue < min) {
          return `Must be at least ${min}`
        }
        if (max !== undefined && numValue > max) {
          return `Must be at most ${max}`
        }
      }
      return true
    }

    return (
      <Input
        key={key}
        type={type}
        label={label}
        placeholder={input.placeholder}
        min={min}
        max={max}
        step={stepValue}
        required={required}
        validate={validateInput}
        syncWithStore={isGlobalParam}
        getStoreValue={() => globalParams[key]}
        onChangeStore={(value) => {
          console.log('Store update for global parameter:', key, 'value:', value)
          handleInputChange(key, value)
        }}
        initialValue={inputValues[key] || defaultValue || ''}
        className={isGlobalParam ? 'border-blue-300 bg-blue-50' : ''}
        errorClassName="text-red-600"
      />
    )
  }, [inputValues, handleInputChange, globalParams])

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
          <CategoryIcon className="h-6 w-6 text-blue-50 dark:text-blue-9000" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h2>
          {isCompleted && (
            <CheckCircle className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
        <div className="mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            step.category === 'Temperature' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            step.category === 'Movement' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            step.category === 'Quality' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-gray-50 dark:bg-gray-8000 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}>
            {step.category}
          </span>
        </div>
      </div>

      {/* Execution Status Banner */}
      {execState.running && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
              <div>
                <h3 className="font-medium text-blue-900">Calibration in Progress</h3>
                <p className="text-sm text-blue-700">
                  {step.name} - {execState.progress} / {execState.total} commands sent
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  ⚠️ Do not navigate away or refresh the page during execution
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-blue-800">
                {execState.total > 0 ? 
                  `${Math.round((execState.progress / execState.total) * 100)}%` : 
                  '0%'
                }
              </div>
              <div className="w-24 bg-blue-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${execState.total > 0 ? (execState.progress / execState.total) * 100 : 0}%` }}
                />
              </div>
              <button
                onClick={abortExec}
                className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs"
              >
                Abort (Emergency Stop)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {Tabs.map((tab) => (
            <button
              key={tab}
              onClick={tabHandlers[tab]}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab ? 'border-deep-900 text-blue-50 dark:text-blue-9000' : 'border-transparent text-gray-500 dark:text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:border-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Pre-checklist gate for Configuration */}
      {activeTab === 'Configuration' && !canProceed && (
        <div className="mb-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-light-800">
          Complete the pre-calibration checklist in the Instructions tab before proceeding.
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'Instructions' && (
        <div className="space-y-6">
          {/* Checklist */}
          {step.checklist && step.checklist.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Pre-Calibration Checklist</h3>
                <ListChecks className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-500" />
              </div>
              <div className="space-y-2">
                {step.checklist.map((item, idx) => (
                  <label key={idx} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={!!checklist[idx]} onChange={(e)=>setChecklist((prev)=>({...prev, [idx]: e.target.checked}))} />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Instructions list */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Step-by-step Guide</h3>
            {step.instructions && step.instructions.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {step.instructions.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">No detailed instructions available.</p>
            )}

            {step.commonIssues && step.commonIssues.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Common Issues & Solutions</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {step.commonIssues.map((ci, i) => (
                    <li key={i}><span className="font-medium">{ci.issue}:</span> {ci.solution}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.expectedOutcomes && (
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-light-800">
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
                src={getEmbedUrl(step.videoUrl)}
                title="Calibration Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}
          {step.visualAids && step.visualAids.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {step.visualAids.map((v, i) => (
                <figure key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2">
                  <img src={v.imageUrl} alt={v.caption} className="w-full h-48 object-cover rounded" />
                  <figcaption className="text-xs text-gray-600 dark:text-gray-300 mt-1">{v.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {/* GOOD vs BAD reference gallery */}
          {referenceImageMap[step.id] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
                <div className="text-sm font-semibold text-light-700 mb-2">GOOD RESULT</div>
                <ReferenceImage
                  urls={referenceImageMap[step.id].good.urls}
                  alt="Good result"
                  caption={referenceImageMap[step.id].good.caption}
                  fallbackQuery={`${step.title} good result 3D print`}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">BAD RESULT</div>
                <ReferenceImage
                  urls={referenceImageMap[step.id].bad.urls}
                  alt="Bad result"
                  caption={referenceImageMap[step.id].bad.caption}
                  fallbackQuery={`${step.title} bad result 3D print`}
                />
              </div>
            </div>
          )}
          {!step.videoUrl && (!step.visualAids || step.visualAids.length === 0) && (
            <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">No visual references available.</div>
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
          activePrinterId={activePrinterId}
          gcodeViewMode={gcodeViewMode}
          setGcodeViewMode={setGcodeViewMode}
        />
      )}

      {activeTab === 'Results' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Record Measurements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-sm">
                <span className="text-gray-700 dark:text-gray-300">Primary Measurement</span>
                <input className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1" value={results.measurements.primary || ''} onChange={(e)=>setResults(prev=>({ ...prev, measurements: { ...prev.measurements, primary: e.target.value }}))} />
              </label>
              <label className="text-sm">
                <span className="text-gray-700 dark:text-gray-300">Secondary</span>
                <input className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1" value={results.measurements.secondary || ''} onChange={(e)=>setResults(prev=>({ ...prev, measurements: { ...prev.measurements, secondary: e.target.value }}))} />
              </label>
              <label className="text-sm">
                <span className="text-gray-700 dark:text-gray-300">Observation</span>
                <input className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1" value={results.measurements.observation || ''} onChange={(e)=>setResults(prev=>({ ...prev, measurements: { ...prev.measurements, observation: e.target.value }}))} />
              </label>
            </div>
            {/* Example: auto-calc for E-steps */}
            {step.id === 'extruder-esteps' && (
              <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Helper:</span>{' '}
                {(() => {
                  const current = Number(inputValuesRef.current.currentEsteps || 0)
                  const requested = Number(inputValuesRef.current.extrudeDistance || 0)
                  const actual = Number(results.measurements.primary || 0)
                  if (current > 0 && requested > 0 && actual > 0) {
                    const newEsteps = (current * requested) / actual
                    return (
                      <>
                        Suggested E-steps: <span className="text-gray-800 dark:text-gray-200 font-medium">{newEsteps.toFixed(2)}</span>
                        <button
                          className="ml-2 px-2 py-1 bg-accent-medium text-white rounded"
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

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Notes</h3>
            <textarea className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 h-28" value={results.notes} onChange={(e)=>setResults(prev=>({ ...prev, notes: e.target.value }))} />
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Photos</h3>
              <button className="px-3 py-2 bg-gray-50 dark:bg-gray-8000 dark:bg-gray-700 rounded" onClick={()=>fileInputRef.current?.click()}><FolderUp className="h-4 w-4 inline mr-1"/>Upload</button>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
            </div>
            {results.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {results.photos.map((p, i) => (
                  <div key={i} className="border rounded overflow-hidden">
                    <img src={p.dataUrl} alt={p.name} className="w-full h-24 object-cover" />
                    <div className="text-xs text-gray-600 dark:text-gray-300 px-2 py-1 truncate">{p.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">No photos uploaded.</div>
            )}
          </div>

          {/* Suggestion placeholder: computation rules can be implemented per step */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 text-sm text-light-800">
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
            canProceed ? 'bg-gray-600 dark:bg-gray-300 text-white hover:bg-gray-700 dark:bg-gray-200' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="h-4 w-4" />
          <span>{isCompleted ? 'Update Results' : 'Save & Mark Complete'}</span>
        </button>
        {isCompleted && (
          <button className="ml-2 px-4 py-2 bg-gray-50 dark:bg-gray-8000 dark:bg-gray-700 rounded" onClick={()=>setShowReport(true)}>Generate Report</button>
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
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.step?.id === nextProps.step?.id
  )
});

export default CalibrationStep
