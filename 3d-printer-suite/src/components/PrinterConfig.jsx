import { useState } from 'react'
import { Edit, Save, X, Printer, Settings, Ruler, Zap, Thermometer } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'

const PrinterConfig = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const { getActivePrinter, updatePrinter } = usePrintersStore()
  
  const activePrinter = getActivePrinter()

  if (!activePrinter) {
    return (
      <div className="text-center py-12">
        <Printer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Printer Selected</h3>
        <p className="text-gray-500">Please select a printer to view configuration</p>
      </div>
    )
  }

  const handleEdit = () => {
    setEditData({
      name: activePrinter.name,
      model: activePrinter.model,
      firmware: activePrinter.firmware || '',
      bedSize: { ...activePrinter.bedSize }
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    updatePrinter(activePrinter.id, editData)
    setIsEditing(false)
    setEditData({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({})
  }

  const handleInputChange = (field, value) => {
    if (field === 'bedSize') {
      setEditData(prev => ({
        ...prev,
        bedSize: { ...prev.bedSize, ...value }
      }))
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const renderField = (label, value, field, type = 'text') => {
    if (isEditing && editData[field] !== undefined) {
      if (field === 'bedSize') {
        return (
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="X"
              value={editData.bedSize.x}
              onChange={(e) => handleInputChange('bedSize', { x: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Y"
              value={editData.bedSize.y}
              onChange={(e) => handleInputChange('bedSize', { y: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Z"
              value={editData.bedSize.z}
              onChange={(e) => handleInputChange('bedSize', { z: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )
      }
      return (
        <input
          type={type}
          value={editData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )
    }
    
    if (field === 'bedSize') {
      return (
        <div className="flex items-center space-x-4">
          <span className="text-gray-900 font-medium">{value.x} × {value.y} × {value.z} mm</span>
        </div>
      )
    }
    
    return <span className="text-gray-900">{value || 'Not specified'}</span>
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Printer Configuration</h2>
          <p className="text-gray-600 mt-1">Manage your printer's basic settings and information</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Configuration</span>
            </button>
          )}
        </div>
      </div>

      {/* Configuration Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Printer className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Printer Name</label>
              {renderField('Printer Name', activePrinter.name, 'name')}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              {renderField('Model', activePrinter.model, 'model')}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firmware</label>
              {renderField('Firmware', activePrinter.firmware, 'firmware')}
            </div>
          </div>
        </div>

        {/* Bed Dimensions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Ruler className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Bed Dimensions</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bed Size (mm)</label>
            {renderField('Bed Size', activePrinter.bedSize, 'bedSize')}
          </div>
        </div>

        {/* Firmware Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Firmware Configuration</h3>
          </div>
          
          <div className="space-y-4">
            {activePrinter.firmwareConfiguration?.maxTemp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Hotend Temperature</label>
                <span className="text-gray-900">{activePrinter.firmwareConfiguration.maxTemp}°C</span>
              </div>
            )}
            
            {activePrinter.firmwareConfiguration?.maxBedTemp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Bed Temperature</label>
                <span className="text-gray-900">{activePrinter.firmwareConfiguration.maxBedTemp}°C</span>
              </div>
            )}
            
            {activePrinter.firmwareConfiguration?.stepsPerMm && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Steps per mm</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">X:</span>
                    <span className="ml-2 text-gray-900">{activePrinter.firmwareConfiguration.stepsPerMm.x}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Y:</span>
                    <span className="ml-2 text-gray-900">{activePrinter.firmwareConfiguration.stepsPerMm.y}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Z:</span>
                    <span className="ml-2 text-gray-900">{activePrinter.firmwareConfiguration.stepsPerMm.z}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">E:</span>
                    <span className="ml-2 text-gray-900">{activePrinter.firmwareConfiguration.stepsPerMm.e}</span>
                  </div>
                </div>
              </div>
            )}
            
            {!activePrinter.firmwareConfiguration || Object.keys(activePrinter.firmwareConfiguration).length === 0 ? (
              <p className="text-gray-500 text-sm">No firmware configuration data available</p>
            ) : null}
          </div>
        </div>

        {/* Calibration Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Zap className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Calibration Status</h3>
          </div>
          
          <div className="space-y-3">
            {activePrinter.calibrationSteps && Object.entries(activePrinter.calibrationSteps).map(([stepName, stepData]) => (
              <div key={stepName} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {stepName.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  {stepData?.completed ? (
                    <span className="text-green-600 text-sm font-medium">Completed</span>
                  ) : (
                    <span className="text-gray-500 text-sm">Pending</span>
                  )}
                </div>
              </div>
            ))}
            
            {!activePrinter.calibrationSteps || Object.keys(activePrinter.calibrationSteps).length === 0 ? (
              <p className="text-gray-500 text-sm">No calibration steps configured</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Thermometer className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Printer ID</h4>
            <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">{activePrinter.id}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Last Updated</h4>
            <p className="text-sm text-gray-600">
              {activePrinter.lastUpdated 
                ? new Date(activePrinter.lastUpdated).toLocaleDateString()
                : 'Never'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrinterConfig
