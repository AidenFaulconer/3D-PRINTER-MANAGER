import React, { useState } from 'react'
import useAdvancedQueueStore from '../stores/advancedQueueStore'
import useGcodeFilesStore from '../stores/gcodeFilesStore'

const PrintTemplates = () => {
  const {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    addToQueue
  } = useAdvancedQueueStore()

  const { gcodeFiles } = useGcodeFilesStore()
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    parameters: [],
    defaultSettings: {},
    compatibleFiles: []
  })

  const handleAddParameter = () => {
    setTemplateForm(prev => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        {
          id: crypto.randomUUID(),
          name: '',
          type: 'number',
          default: '',
          min: '',
          max: '',
          step: '1',
          unit: '',
          description: ''
        }
      ]
    }))
  }

  const handleParameterChange = (paramId, field, value) => {
    setTemplateForm(prev => ({
      ...prev,
      parameters: prev.parameters.map(param =>
        param.id === paramId
          ? { ...param, [field]: value }
          : param
      )
    }))
  }

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.id, templateForm)
    } else {
      addTemplate(templateForm)
    }
    setShowNewTemplateModal(false)
    setSelectedTemplate(null)
    setTemplateForm({
      name: '',
      description: '',
      parameters: [],
      defaultSettings: {},
      compatibleFiles: []
    })
  }

  const handleUseTemplate = (template) => {
    // Show parameter input modal
    setSelectedTemplate(template)
  }

  const handleApplyTemplate = (template, parameterValues) => {
    // Apply template settings with parameter values
    const settings = { ...template.defaultSettings }
    
    // Replace parameter placeholders with actual values
    Object.entries(parameterValues).forEach(([paramId, value]) => {
      const param = template.parameters.find(p => p.id === paramId)
      if (param) {
        // Replace all instances of ${paramName} in settings
        Object.keys(settings).forEach(key => {
          if (typeof settings[key] === 'string') {
            settings[key] = settings[key].replace(`\${${param.name}}`, value)
          }
        })
      }
    })

    // Add to queue with template settings
    template.compatibleFiles.forEach(fileId => {
      addToQueue(fileId, {
        templateId: template.id,
        parameterOverrides: parameterValues,
        settings
      })
    })
  }

  return (
    <div className="space-y-4">
      {/* Templates List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Print Templates</h2>
          <button
            onClick={() => setShowNewTemplateModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            New Template
          </button>
        </div>

        <div className="divide-y">
          {templates.map(template => (
            <div key={template.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Use Template
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template)
                      setTemplateForm({
                        ...template,
                        parameters: [...template.parameters]
                      })
                      setShowNewTemplateModal(true)
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Parameters */}
              {template.parameters.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Parameters</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {template.parameters.map(param => (
                      <div key={param.id} className="text-sm">
                        <span className="font-medium">{param.name}</span>
                        <span className="text-gray-500 ml-1">
                          ({param.type}
                          {param.unit && ` ${param.unit}`}
                          {param.min !== '' && `, min: ${param.min}`}
                          {param.max !== '' && `, max: ${param.max}`})
                        </span>
                        {param.description && (
                          <p className="text-gray-500 text-xs mt-1">{param.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compatible Files */}
              {template.compatibleFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Compatible Files</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.compatibleFiles.map(fileId => {
                      const file = gcodeFiles.find(f => f.id === fileId)
                      return file ? (
                        <span
                          key={fileId}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                        >
                          {file.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          {templates.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No templates found
            </div>
          )}
        </div>
      </div>

      {/* Template Modal */}
      {showNewTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedTemplate ? 'Edit Template' : 'New Template'}
            </h3>

            <div className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Parameters */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Parameters
                  </label>
                  <button
                    onClick={handleAddParameter}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    + Add Parameter
                  </button>
                </div>

                <div className="space-y-4">
                  {templateForm.parameters.map(param => (
                    <div key={param.id} className="grid grid-cols-2 gap-4 p-4 border rounded">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Name</label>
                        <input
                          type="text"
                          value={param.name}
                          onChange={(e) => handleParameterChange(param.id, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Type</label>
                        <select
                          value={param.type}
                          onChange={(e) => handleParameterChange(param.id, 'type', e.target.value)}
                          className="w-full p-2 border rounded"
                        >
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="boolean">Boolean</option>
                          <option value="select">Select</option>
                        </select>
                      </div>

                      {param.type === 'number' && (
                        <>
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">Min</label>
                            <input
                              type="number"
                              value={param.min}
                              onChange={(e) => handleParameterChange(param.id, 'min', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-500 mb-1">Max</label>
                            <input
                              type="number"
                              value={param.max}
                              onChange={(e) => handleParameterChange(param.id, 'max', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-500 mb-1">Step</label>
                            <input
                              type="number"
                              value={param.step}
                              onChange={(e) => handleParameterChange(param.id, 'step', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-500 mb-1">Unit</label>
                            <input
                              type="text"
                              value={param.unit}
                              onChange={(e) => handleParameterChange(param.id, 'unit', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        </>
                      )}

                      <div className="col-span-2">
                        <label className="block text-sm text-gray-500 mb-1">Description</label>
                        <input
                          type="text"
                          value={param.description}
                          onChange={(e) => handleParameterChange(param.id, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatible Files */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compatible Files
                </label>
                <select
                  multiple
                  value={templateForm.compatibleFiles}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setTemplateForm(prev => ({
                      ...prev,
                      compatibleFiles: values
                    }))
                  }}
                  className="w-full p-2 border rounded"
                  size={5}
                >
                  {gcodeFiles.map(file => (
                    <option key={file.id} value={file.id}>
                      {file.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => {
                    setShowNewTemplateModal(false)
                    setSelectedTemplate(null)
                    setTemplateForm({
                      name: '',
                      description: '',
                      parameters: [],
                      defaultSettings: {},
                      compatibleFiles: []
                    })
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrintTemplates
