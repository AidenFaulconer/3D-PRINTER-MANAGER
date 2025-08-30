import { useState, useEffect } from 'react'
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
  FileText
} from 'lucide-react'
import usePrintersStore from '../stores/printersStore'

const CalibrationStep = ({ step, onComplete }) => {
  const [inputValues, setInputValues] = useState({})
  const [generatedGcode, setGeneratedGcode] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [showGcode, setShowGcode] = useState(false)
  
  const { getActivePrinter, updateCalibrationStep } = usePrintersStore()
  const activePrinter = getActivePrinter()

  // Initialize input values with defaults
  useEffect(() => {
    if (step && step.inputs) {
      const initialValues = {}
      step.inputs.forEach(input => {
        initialValues[input.key] = input.defaultValue
      })
      setInputValues(initialValues)
    }
  }, [step])

  // Check if this step is already completed
  useEffect(() => {
    if (activePrinter && activePrinter.calibrationSteps) {
      const stepData = activePrinter.calibrationSteps[step.id]
      if (stepData && stepData.completed) {
        setIsCompleted(true)
        setInputValues(stepData.inputValues || {})
        setGeneratedGcode(stepData.generatedGcode || '')
      }
    }
  }, [activePrinter, step.id])

  if (!step) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Calibration Step Selected</h3>
        <p className="text-gray-500">Please select a calibration step from the sidebar</p>
      </div>
    )
  }

  const handleInputChange = (key, value) => {
    setInputValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const generateGcode = () => {
    if (typeof step.gcode === 'function') {
      const gcode = step.gcode(inputValues)
      setGeneratedGcode(gcode)
      setShowGcode(true)
    } else if (typeof step.gcode === 'string') {
      setGeneratedGcode(step.gcode)
      setShowGcode(true)
    }
  }

  const saveConfiguration = () => {
    if (!activePrinter) return

    const stepData = {
      completed: true,
      lastUpdated: new Date().toISOString(),
      inputValues: { ...inputValues },
      generatedGcode: generatedGcode,
      category: step.category
    }

    updateCalibrationStep(activePrinter.id, step.id, stepData)
    setIsCompleted(true)
    
    if (onComplete) {
      onComplete(step.id)
    }
  }

  const copyGcode = () => {
    navigator.clipboard.writeText(generatedGcode).then(() => {
      // Could add a toast notification here
      console.log('G-code copied to clipboard')
    }).catch(err => {
      console.error('Failed to copy G-code:', err)
    })
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

  const renderInput = (input) => {
    const { type, label, key, defaultValue, min, max, step: stepValue, required } = input
    const value = inputValues[key] ?? defaultValue

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
  }

  return (
    <div className="max-w-4xl mx-auto">
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

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Parameters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {step.inputs.map(renderInput)}
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={generateGcode}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Generate G-code</span>
          </button>
        </div>
      </div>

      {/* Generated G-code */}
      {generatedGcode && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated G-code</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyGcode}
                className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => setShowGcode(!showGcode)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
              >
                <FileText className="h-4 w-4" />
                <span>{showGcode ? 'Hide' : 'Show'}</span>
              </button>
            </div>
          </div>

          {showGcode && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{generatedGcode}</pre>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={saveConfiguration}
              disabled={isCompleted}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                isCompleted
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Save className="h-4 w-4" />
              <span>{isCompleted ? 'Configuration Saved' : 'Save Configuration'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Instructions</h3>
        <ol className="list-decimal list-inside text-blue-800 space-y-2">
          <li>Configure the parameters above for your printer and filament</li>
          <li>Click "Generate G-code" to create the calibration commands</li>
          <li>Copy the G-code and send it to your printer</li>
          <li>Follow the printer's instructions and complete the calibration</li>
          <li>Click "Save Configuration" to mark this step as complete</li>
        </ol>
        <p className="text-blue-800 mt-4 text-sm">
          <strong>Note:</strong> Always ensure your printer is properly heated and calibrated before running these commands.
        </p>
      </div>
    </div>
  )
}

export default CalibrationStep
