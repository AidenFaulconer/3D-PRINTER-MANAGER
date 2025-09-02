import React, { useState } from 'react'
import { X, Zap, Star, Settings } from 'lucide-react'
import { PROFILE_TEMPLATES, getTemplatesByCategory, applyTemplate } from '../data/profileTemplates'

const TemplateModal = ({ isOpen, onClose, onApplyTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  if (!isOpen) return null

  const templatesByCategory = getTemplatesByCategory()
  const categories = ['All', ...Object.keys(templatesByCategory)]
  
  const filteredTemplates = selectedCategory === 'All' 
    ? Object.values(PROFILE_TEMPLATES)
    : templatesByCategory[selectedCategory] || []

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onApplyTemplate(selectedTemplate.id, selectedTemplate)
      onClose()
    }
  }

  const getSettingsPreview = (template) => {
    const keySettings = [
      { key: 'layer_height', label: 'Layer Height', unit: 'mm' },
      { key: 'infill_sparse_density', label: 'Infill', unit: '%' },
      { key: 'speed_print', label: 'Print Speed', unit: 'mm/s' },
      { key: 'wall_thickness', label: 'Wall Thickness', unit: 'mm' }
    ]
    
    return keySettings
      .filter(setting => template.settings[setting.key] !== undefined)
      .slice(0, 3)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Choose Profile Template</h2>
            <p className="text-sm text-gray-600">Start with optimized settings for your print type</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Category Sidebar */}
          <div className="w-48 border-r bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="space-y-1">
                    {getSettingsPreview(template).map(setting => (
                      <div key={setting.key} className="flex justify-between text-xs">
                        <span className="text-gray-500">{setting.label}:</span>
                        <span className="font-medium">
                          {template.settings[setting.key]}{setting.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Details */}
          {selectedTemplate && (
            <div className="w-80 border-l bg-gray-50 p-6 overflow-y-auto">
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">{selectedTemplate.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedTemplate.name}</h3>
                    <span className="text-sm text-blue-600">{selectedTemplate.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Key Settings</h4>
                <div className="space-y-2">
                  {Object.entries(selectedTemplate.settings).slice(0, 8).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                  {Object.keys(selectedTemplate.settings).length > 8 && (
                    <p className="text-xs text-gray-500 italic">
                      +{Object.keys(selectedTemplate.settings).length - 8} more settings...
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Template Benefits</p>
                    <p className="text-yellow-700">
                      {selectedTemplate.category === 'Quality' && 'Optimized for visual appearance and detail'}
                      {selectedTemplate.category === 'Speed' && 'Balanced speed and quality for faster prints'}
                      {selectedTemplate.category === 'Strength' && 'Maximized durability and mechanical properties'}
                      {selectedTemplate.category === 'Material' && 'Tuned for specific material characteristics'}
                      {selectedTemplate.category === 'Specialty' && 'Specialized settings for unique applications'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedTemplate ? `${selectedTemplate.name} template selected` : 'Select a template to continue'}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedTemplate
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Apply Template
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateModal
