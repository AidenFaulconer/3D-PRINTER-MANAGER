import React, { useState } from 'react'
import { Zap, Eye, EyeOff } from 'lucide-react'
import { QUICK_PRESETS, applyPreset } from '../data/profileTemplates'

const QuickPresets = ({ currentSettings, onApplyPreset, className = '' }) => {
  const [showPreview, setShowPreview] = useState({})
  const [hoveredPreset, setHoveredPreset] = useState(null)

  const handlePresetClick = (presetId) => {
    const newSettings = applyPreset(presetId, currentSettings)
    onApplyPreset(newSettings, presetId)
  }

  const handlePreviewToggle = (presetId) => {
    setShowPreview(prev => ({
      ...prev,
      [presetId]: !prev[presetId]
    }))
  }

  const getPreviewChanges = (presetId) => {
    const preset = QUICK_PRESETS[presetId]
    if (!preset) return []

    return Object.entries(preset.changes).map(([key, change]) => {
      const currentValue = currentSettings[key] || 0
      let newValue = currentValue
      let changeDescription = ''

      if (typeof change === 'string') {
        if (change.startsWith('+')) {
          const increment = parseFloat(change.substring(1))
          newValue = currentValue + increment
          changeDescription = `+${increment}`
        } else if (change.startsWith('-')) {
          const decrement = parseFloat(change.substring(1))
          newValue = Math.max(0, currentValue - decrement)
          changeDescription = `-${decrement}`
        } else {
          newValue = change
          changeDescription = `→ ${change}`
        }
      } else {
        newValue = change
        changeDescription = `→ ${change}`
      }

      return {
        key,
        currentValue,
        newValue,
        change: changeDescription,
        setting: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }
    })
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Quick Adjustments</h3>
        <Zap className="h-4 w-4 text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(QUICK_PRESETS).map(([presetId, preset]) => (
          <div key={presetId} className="relative">
            <div
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                hoveredPreset === presetId
                  ? 'border-blue-300 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onMouseEnter={() => setHoveredPreset(presetId)}
              onMouseLeave={() => setHoveredPreset(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{preset.icon}</span>
                  <span className="font-medium text-sm">{preset.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePreviewToggle(presetId)
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={showPreview[presetId] ? 'Hide preview' : 'Show preview'}
                >
                  {showPreview[presetId] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-600 mb-3">{preset.description}</p>

              {showPreview[presetId] && (
                <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                  <div className="font-medium text-gray-700 mb-1">Changes Preview:</div>
                  <div className="space-y-1">
                    {getPreviewChanges(presetId).map(change => (
                      <div key={change.key} className="flex justify-between">
                        <span className="text-gray-600">{change.setting}:</span>
                        <span className="font-medium">
                          {change.currentValue} {change.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handlePresetClick(presetId)}
                className="w-full py-2 px-3 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Apply {preset.name}
              </button>
            </div>

            {/* Hover tooltip */}
            {hoveredPreset === presetId && !showPreview[presetId] && (
              <div className="absolute z-10 bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded shadow-lg">
                <div className="font-medium mb-1">Preview Changes:</div>
                <div className="space-y-1">
                  {getPreviewChanges(presetId).slice(0, 3).map(change => (
                    <div key={change.key} className="flex justify-between">
                      <span className="text-gray-300">{change.setting}:</span>
                      <span>{change.currentValue} {change.change}</span>
                    </div>
                  ))}
                  {getPreviewChanges(presetId).length > 3 && (
                    <div className="text-gray-400 italic">
                      +{getPreviewChanges(presetId).length - 3} more changes...
                    </div>
                  )}
                </div>
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <div className="flex items-start space-x-2">
          <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-blue-800">
            <span className="font-medium">Quick Tip:</span> These presets apply multiple related changes at once. 
            Preview changes before applying to understand the impact on your print.
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickPresets
