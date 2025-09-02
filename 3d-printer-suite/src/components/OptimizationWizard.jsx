import React, { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import { OPTIMIZATION_WIZARDS } from '../data/profileTemplates'

const OptimizationWizard = ({ isOpen, onClose, wizardId, currentSettings, onApplyChanges }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedValues, setSelectedValues] = useState({})
  const [showComparison, setShowComparison] = useState(false)

  const wizard = OPTIMIZATION_WIZARDS[wizardId]

  useEffect(() => {
    if (isOpen && wizard) {
      setCurrentStep(0)
      setSelectedValues({})
      setShowComparison(false)
    }
  }, [isOpen, wizard])

  if (!isOpen || !wizard) return null

  const currentStepData = wizard.steps[currentStep]
  const isLastStep = currentStep === wizard.steps.length - 1
  const canProceed = selectedValues[currentStepData?.setting] !== undefined

  const handleValueSelect = (setting, value) => {
    setSelectedValues(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handleNext = () => {
    if (isLastStep) {
      setShowComparison(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (showComparison) {
      setShowComparison(false)
    } else {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleApply = () => {
    const newSettings = { ...currentSettings }
    
    Object.entries(selectedValues).forEach(([setting, value]) => {
      if (typeof value === 'string' && value.includes('°C')) {
        // Handle temperature adjustments
        const currentTemp = currentSettings[setting] || 200
        const adjustment = parseInt(value.replace(/[^-+\d]/g, ''))
        newSettings[setting] = currentTemp + adjustment
      } else if (value === 'calibrate') {
        // Skip calibration recommendations for now
        return
      } else {
        newSettings[setting] = value
      }
    })

    onApplyChanges(newSettings)
    onClose()
  }

  const renderStepContent = () => {
    const step = currentStepData
    const currentValue = currentSettings[step.setting]
    const recommendedValue = step.recommendation

    const getInputComponent = () => {
      switch (step.setting) {
        case 'layer_height':
          return (
            <div className="space-y-2">
              {[0.1, 0.15, 0.2, 0.25, 0.3].map(value => (
                <label key={value} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="layer_height"
                    value={value}
                    checked={selectedValues[step.setting] === value}
                    onChange={() => handleValueSelect(step.setting, value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{value}mm</div>
                    <div className="text-sm text-gray-600">
                      {value <= 0.15 ? 'High detail' : value <= 0.25 ? 'Balanced' : 'Fast print'}
                    </div>
                  </div>
                  {value === recommendedValue && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </label>
              ))}
            </div>
          )

        case 'infill_sparse_density':
          return (
            <div className="space-y-2">
              {[5, 10, 15, 20, 30, 40, 50].map(value => (
                <label key={value} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="infill_density"
                    value={value}
                    checked={selectedValues[step.setting] === value}
                    onChange={() => handleValueSelect(step.setting, value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{value}%</div>
                    <div className="text-sm text-gray-600">
                      {value <= 15 ? 'Light/decorative' : value <= 30 ? 'Standard' : 'Heavy duty'}
                    </div>
                  </div>
                  {value === recommendedValue && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </label>
              ))}
            </div>
          )

        case 'infill_pattern':
          const patterns = ['lines', 'grid', 'triangles', 'cubic', 'gyroid', 'honeycomb']
          return (
            <div className="space-y-2">
              {patterns.map(pattern => (
                <label key={pattern} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="infill_pattern"
                    value={pattern}
                    checked={selectedValues[step.setting] === pattern}
                    onChange={() => handleValueSelect(step.setting, pattern)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium capitalize">{pattern}</div>
                    <div className="text-sm text-gray-600">
                      {pattern === 'grid' && 'Strong in all directions'}
                      {pattern === 'lines' && 'Fast, directional strength'}
                      {pattern === 'gyroid' && 'Organic, good strength-to-weight'}
                      {pattern === 'honeycomb' && 'Excellent strength, slower print'}
                      {pattern === 'cubic' && 'Isotropic strength'}
                      {pattern === 'triangles' && 'Good strength, fast print'}
                    </div>
                  </div>
                  {pattern === recommendedValue && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </label>
              ))}
            </div>
          )

        case 'support_enable':
          return (
            <div className="space-y-2">
              {[true, false].map(value => (
                <label key={String(value)} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="supports"
                    value={String(value)}
                    checked={selectedValues[step.setting] === value}
                    onChange={() => handleValueSelect(step.setting, value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{value ? 'Enable' : 'Disable'} Supports</div>
                    <div className="text-sm text-gray-600">
                      {value ? 'Print overhangs and bridges' : 'Faster print, design dependent'}
                    </div>
                  </div>
                  {value === recommendedValue && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </label>
              ))}
            </div>
          )

        default:
          // Generic number input
          const isTemperature = step.setting.includes('temperature')
          const isSpeed = step.setting.includes('speed')
          
          if (typeof recommendedValue === 'string') {
            return (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center space-x-2 text-blue-800">
                  <Lightbulb className="h-5 w-5" />
                  <span className="font-medium">Recommendation: {recommendedValue}</span>
                </div>
                <p className="text-sm text-blue-700 mt-2">{step.explanation}</p>
                <button
                  onClick={() => handleValueSelect(step.setting, recommendedValue)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Accept Recommendation
                </button>
              </div>
            )
          }

          return (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {step.setting.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <input
                    type="number"
                    value={selectedValues[step.setting] || currentValue || ''}
                    onChange={(e) => handleValueSelect(step.setting, parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    step={isTemperature ? 1 : isSpeed ? 5 : 0.1}
                  />
                </label>
                {recommendedValue && (
                  <button
                    onClick={() => handleValueSelect(step.setting, recommendedValue)}
                    className="px-3 py-2 bg-green-100 text-green-700 border border-green-300 rounded hover:bg-green-200"
                  >
                    Use {recommendedValue}
                    {isTemperature && '°C'}
                    {isSpeed && ' mm/s'}
                    {!isTemperature && !isSpeed && typeof recommendedValue === 'number' && ' mm'}
                  </button>
                )}
              </div>
            </div>
          )
      }
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-4">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Current value:</span>
            <span className="ml-2">{currentValue || 'Not set'}</span>
          </div>
        </div>

        {getInputComponent()}

        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">{step.explanation}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderComparison = () => {
    const changes = Object.entries(selectedValues).map(([setting, newValue]) => ({
      setting,
      oldValue: currentSettings[setting],
      newValue,
      label: setting.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }))

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Changes</h3>
          <p className="text-gray-600">These settings will be applied to optimize your profile for {wizard.name.toLowerCase()}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h4 className="font-medium text-gray-900">Setting Changes</h4>
          </div>
          <div className="divide-y">
            {changes.map(change => (
              <div key={change.setting} className="px-4 py-3 flex items-center justify-between">
                <span className="font-medium text-gray-900">{change.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">{String(change.oldValue)}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-blue-600">{String(change.newValue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium">Expected Results:</p>
              <p>
                {wizard.id === 'optimize-strength' && 'Improved layer adhesion, increased structural integrity, and better resistance to mechanical stress.'}
                {wizard.id === 'optimize-speed' && 'Significantly reduced print time while maintaining acceptable quality for functional parts.'}
                {wizard.id === 'optimize-quality' && 'Enhanced surface finish, better dimensional accuracy, and reduced visible layer lines.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{wizard.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{wizard.name}</h2>
              <p className="text-sm text-gray-600">{wizard.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2 bg-gray-50 border-b">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>
              {showComparison ? 'Review' : `Step ${currentStep + 1} of ${wizard.steps.length}`}
            </span>
            <span>{Math.round(((showComparison ? wizard.steps.length : currentStep) / wizard.steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((showComparison ? wizard.steps.length : currentStep + 1) / wizard.steps.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {showComparison ? renderComparison() : renderStepContent()}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0 && !showComparison}
            className={`px-4 py-2 rounded transition-colors ${
              currentStep === 0 && !showComparison
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-4 w-4 inline mr-1" />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            {showComparison ? 'Ready to apply changes' : `${Object.keys(selectedValues).length} of ${wizard.steps.length} completed`}
          </div>

          {showComparison ? (
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Apply Changes
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-4 py-2 rounded transition-colors ${
                canProceed
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLastStep ? 'Review' : 'Next'}
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OptimizationWizard
