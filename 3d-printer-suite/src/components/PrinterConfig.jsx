import { useState, useCallback } from 'react'
import { Edit, Save, X, Printer, Settings, Ruler, Zap, Thermometer, Grid, RotateCcw, RefreshCw, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import useSerialStore from '../stores/serialStore'
import BedMeshVisualization from './BedMeshVisualization'

const PrinterConfig = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [activeSection, setActiveSection] = useState('basic') // 'basic', 'bedLevel'
  const { updatePrinter } = usePrintersStore()
  
  // Only subscribe to the specific printer data we need for this component
  const printerData = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    if (!activePrinter) return null
    return {
      id: activePrinter.id,
      name: activePrinter.name,
      model: activePrinter.model,
      firmware: activePrinter.firmware,
      bedSize: activePrinter.bedSize,
      firmwareConfiguration: activePrinter.firmwareConfiguration,
      calibrationSteps: activePrinter.calibrationSteps,
      lastUpdated: activePrinter.lastUpdated
    }
  })
  
  // Bed leveling functionality
  const serialStatus = useSerialStore(state => state.status)
  const bedMesh = useSerialStore(state => state.bedMesh)
  const fetchBedLevel = useSerialStore(state => state.fetchBedLevel)
  const runBedLeveling = useSerialStore(state => state.runBedLeveling)
  const processCollectedBedMeshData = useSerialStore(state => state.processCollectedBedMeshData)

  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.printerSettings
  })

  const hasMeshData = bedMesh?.data && bedMesh.data.length > 0
  const bedLevelingEnabled = printerSettings?.bedLeveling?.enabled

  const handleFetchMesh = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }
    await fetchBedLevel()
  }, [serialStatus, fetchBedLevel])

  const handleRunAutoLevel = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }
    
    if (confirm('This will run automatic bed leveling (G29). This process takes several minutes. Continue?')) {
      await runBedLeveling()
    }
  }, [serialStatus, runBedLeveling])

  const handleProcessData = useCallback(async () => {
    await processCollectedBedMeshData()
  }, [processCollectedBedMeshData])

  if (!printerData) {
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
      name: printerData.name,
      model: printerData.model,
      firmware: printerData.firmware || '',
      bedSize: { ...printerData.bedSize }
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    updatePrinter(printerData.id, editData)
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
          <p className="text-gray-600 mt-1">Manage your printer's basic settings and bed leveling</p>
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

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveSection('basic')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'basic'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Basic Configuration
          </button>
          <button
            onClick={() => setActiveSection('bedLevel')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'bedLevel'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Grid className="h-4 w-4 inline mr-2" />
            Bed Leveling
          </button>
        </nav>
      </div>

      {/* Basic Configuration Section */}
      {activeSection === 'basic' && (
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
                {renderField('Printer Name', printerData.name, 'name')}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                {renderField('Model', printerData.model, 'model')}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmware</label>
                {renderField('Firmware', printerData.firmware, 'firmware')}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bed Size (X × Y × Z)</label>
                {renderField('Bed Size', printerData.bedSize, 'bedSize')}
              </div>
            </div>
          </div>

          {/* Firmware Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Firmware Configuration</h3>
            </div>
            
            <div className="space-y-3">
              {printerData.firmwareConfiguration?.maxHotendTemp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Hotend Temperature</label>
                  <span className="text-gray-900">{printerData.firmwareConfiguration.maxHotendTemp}°C</span>
                </div>
              )}
              
              {printerData.firmwareConfiguration?.maxBedTemp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Bed Temperature</label>
                  <span className="text-gray-900">{printerData.firmwareConfiguration.maxBedTemp}°C</span>
                </div>
              )}
              
              {printerData.firmwareConfiguration?.stepsPerMm && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Steps per mm</label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">X:</span>
                      <span className="ml-2 text-gray-900">{printerData.firmwareConfiguration.stepsPerMm.x}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Y:</span>
                      <span className="ml-2 text-gray-900">{printerData.firmwareConfiguration.stepsPerMm.y}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Z:</span>
                      <span className="ml-2 text-gray-900">{printerData.firmwareConfiguration.stepsPerMm.z}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">E:</span>
                      <span className="ml-2 text-gray-900">{printerData.firmwareConfiguration.stepsPerMm.e}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {!printerData.firmwareConfiguration || Object.keys(printerData.firmwareConfiguration).length === 0 ? (
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
              {printerData.calibrationSteps && Object.entries(printerData.calibrationSteps).map(([stepName, stepData]) => (
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
              
              {!printerData.calibrationSteps || Object.keys(printerData.calibrationSteps).length === 0 ? (
                <p className="text-gray-500 text-sm">No calibration steps configured</p>
              ) : null}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Thermometer className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Printer ID</h4>
                <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">{printerData.id}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Last Updated</h4>
                <p className="text-sm text-gray-600">
                  {printerData.lastUpdated 
                    ? new Date(printerData.lastUpdated).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bed Leveling Section */}
      {activeSection === 'bedLevel' && (
        <div className="space-y-6">
          {/* Bed Leveling Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Grid className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Bed Leveling Status</h3>
              </div>
              <div className="flex items-center space-x-2">
                {bedLevelingEnabled ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Disabled
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {bedMesh?.gridSize ? `${bedMesh.gridSize.x}×${bedMesh.gridSize.y}` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Grid Size</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {hasMeshData ? bedMesh.data.length : 0}
                </div>
                <div className="text-sm text-gray-600">Mesh Points</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {bedMesh?.variance ? `${bedMesh.variance.toFixed(3)}` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Variance (mm)</div>
              </div>
            </div>
          </div>

          {/* Bed Mesh Visualization */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Ruler className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Bed Mesh Visualization</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleFetchMesh}
                  disabled={serialStatus !== 'connected'}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Fetch Mesh
                </button>
                <button
                  onClick={handleRunAutoLevel}
                  disabled={serialStatus !== 'connected'}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Auto Level
                </button>
                {bedMesh?.rawData && bedMesh.rawData.length > 0 && (
                  <button
                    onClick={handleProcessData}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Process Data
                  </button>
                )}
              </div>
            </div>
            
            <BedMeshVisualization />
          </div>

          {/* Bed Leveling Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Info className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Bed Leveling Information</h3>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Fade Height:</strong> {printerSettings?.bedLeveling?.fadeHeight || 'Not set'} mm
              </p>
              <p>
                <strong>Mesh Type:</strong> {printerSettings?.bedLeveling?.type || 'Unknown'}
              </p>
              <p>
                <strong>Last Updated:</strong> {bedMesh?.lastUpdated ? new Date(bedMesh.lastUpdated).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrinterConfig