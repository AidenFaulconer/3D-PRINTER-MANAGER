import { useState } from 'react'
import { Plus, Printer, CheckCircle, Circle, Settings, Trash2, Database } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import { samplePrinters } from '../data/samplePrinters'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const PrinterDashboard = ({ onPrinterSelect }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPrinter, setNewPrinter] = useState({
    name: '',
    model: '',
    firmware: '',
    bedSize: { x: 220, y: 220, z: 250 }
  })

  const { printers, addPrinter, deletePrinter, setActivePrinter, resetStore } = usePrintersStore()

  // Predefined options for dropdowns
  const printerModels = [
    'Ender 3',
    'Ender 3 Pro',
    'Ender 3 V2',
    'Ender 3 S1',
    'Ender 3 S1 Pro',
    'Ender 5',
    'Ender 5 Plus',
    'Prusa i3 MK3S+',
    'Prusa i3 MK4',
    'Prusa Mini+',
    'Voron 2.4',
    'Voron Trident',
    'RatRig V-Core 3',
    'Custom'
  ]

  const firmwareOptions = [
    'Marlin 2.0.x',
    'Marlin 2.1.x',
    'Marlin 2.2.x',
    'Prusa Firmware',
    'Klipper',
    'RepRapFirmware',
    'Custom'
  ]

  const handleAddPrinter = () => {
    if (newPrinter.name && newPrinter.model) {
      addPrinter(newPrinter)
      setNewPrinter({ name: '', model: '', firmware: '', bedSize: { x: 220, y: 220, z: 250 } })
      setShowAddForm(false)
    }
  }

  const handlePrinterSelect = (printerId) => {
    setActivePrinter(printerId)
    onPrinterSelect(printerId)
  }

  const handleLoadSampleData = () => {
    samplePrinters.forEach(printer => addPrinter(printer))
  }

  const getCompletedCalibrationCount = (printer) => {
    if (!printer.calibrationSteps) return 0
    return Object.values(printer.calibrationSteps).filter(step => step?.completed).length
  }

  const getTotalCalibrationCount = (printer) => {
    if (!printer.calibrationSteps) return 0
    return Object.keys(printer.calibrationSteps).length
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">3D Printer Suite</h1>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={handleLoadSampleData}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Database className="h-4 w-4" />
                <span>Load Sample Data</span>
              </button>
              <button
                onClick={() => resetStore()}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <span>Reset Store</span>
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Printer</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Printer Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Printer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Printer Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., My Ender 3"
                  value={newPrinter.name}
                  onChange={(e) => setNewPrinter({ ...newPrinter, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Model *
                </label>
                <select
                  value={newPrinter.model}
                  onChange={(e) => setNewPrinter({ ...newPrinter, model: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Model</option>
                  {printerModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Firmware
                </label>
                <select
                  value={newPrinter.firmware}
                  onChange={(e) => setNewPrinter({ ...newPrinter, firmware: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Firmware</option>
                  {firmwareOptions.map(firmware => (
                    <option key={firmware} value={firmware}>{firmware}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bed Size (mm)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="X"
                    value={newPrinter.bedSize.x}
                    onChange={(e) => setNewPrinter({
                      ...newPrinter,
                      bedSize: { ...newPrinter.bedSize, x: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Y"
                    value={newPrinter.bedSize.y}
                    onChange={(e) => setNewPrinter({
                      ...newPrinter,
                      bedSize: { ...newPrinter.bedSize, y: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Z"
                    value={newPrinter.bedSize.z}
                    onChange={(e) => setNewPrinter({
                      ...newPrinter,
                      bedSize: { ...newPrinter.bedSize, z: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPrinter}
                disabled={!newPrinter.name || !newPrinter.model}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Printer
              </button>
            </div>
          </div>
        )}

        {/* Printers Grid */}
        {printers.length === 0 ? (
          <div className="text-center py-12">
            <Printer className="h-16 w-16 text-gray-300 dark:text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Printers Added</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first 3D printer</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-6 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Add Your First Printer</span>
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Printers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {printers.map((printer) => (
                <div
                  key={printer.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handlePrinterSelect(printer.id)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <Printer className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{printer.name}</h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePrinter(printer.id)
                        }}
                        className="text-gray-400 dark:text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Model:</span> {printer.model}
                      </p>
                      {printer.firmware && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Firmware:</span> {printer.firmware}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Bed Size:</span> {printer.bedSize.x} × {printer.bedSize.y} × {printer.bedSize.z} mm
                      </p>
                    </div>

                    {/* Calibration Progress */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Calibration Progress</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {getCompletedCalibrationCount(printer)}/{getTotalCalibrationCount(printer)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gray-50 dark:bg-gray-800 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getTotalCalibrationCount(printer) > 0 
                              ? (getCompletedCalibrationCount(printer) / getTotalCalibrationCount(printer)) * 100 
                              : 0}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrinterSelect(printer.id)
                        }}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </button>
                      <div className="flex items-center space-x-1">
                        {getCompletedCalibrationCount(printer) > 0 && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getCompletedCalibrationCount(printer) > 0 ? 'Ready' : 'Setup Required'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PrinterDashboard
