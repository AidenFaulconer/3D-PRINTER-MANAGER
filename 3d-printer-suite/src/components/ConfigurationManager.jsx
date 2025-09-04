import React, { useState, useCallback, useRef } from 'react'
import { 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle,
  Info,
  Play,
  Pause,
  Square,
  FileText,
  GitBranch,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'

// Configuration Snapshot Component
const ConfigurationSnapshot = ({ snapshot, onRestore, onDelete, onView }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{snapshot.name}</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(snapshot.id)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRestore(snapshot.id)}
            className="p-1 text-blue-400 hover:text-blue-600"
            title="Restore"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(snapshot.id)}
            className="p-1 text-red-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {snapshot.description && (
        <p className="text-sm text-gray-600 mb-2">{snapshot.description}</p>
      )}
      
      <div className="text-xs text-gray-500">
        Created: {new Date(snapshot.timestamp).toLocaleString()}
      </div>
    </div>
  )
}

// Bulk Configuration Progress Component
const BulkConfigurationProgress = ({ isVisible, progress, onCancel }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Sending Configuration</h3>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress.current}/{progress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          Current command: <code className="bg-gray-100 px-1 rounded">{progress.currentCommand}</code>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Emergency Stop Component
const EmergencyStopButton = ({ onEmergencyStop }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = useCallback(() => {
    setIsPressed(true)
    onEmergencyStop()
    
    // Reset after 2 seconds
    setTimeout(() => setIsPressed(false), 2000)
  }, [onEmergencyStop])

  return (
    <button
      onClick={handlePress}
      disabled={isPressed}
      className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
        isPressed 
          ? 'bg-red-700 scale-95' 
          : 'bg-red-600 hover:bg-red-700 hover:scale-105'
      } shadow-lg`}
    >
      <Square className="w-5 h-5 mr-2 inline" />
      {isPressed ? 'STOPPING...' : 'EMERGENCY STOP'}
    </button>
  )
}

// Main Configuration Manager Component
const ConfigurationManager = () => {
  const [activeTab, setActiveTab] = useState('snapshots') // 'snapshots', 'bulk', 'backup'
  const [showCreateSnapshot, setShowCreateSnapshot] = useState(false)
  const [snapshotName, setSnapshotName] = useState('')
  const [snapshotDescription, setSnapshotDescription] = useState('')
  const [bulkProgress, setBulkProgress] = useState({ isVisible: false, current: 0, total: 0, currentCommand: '' })
  const [bulkCommands, setBulkCommands] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const serialStatus = useSerialStore(state => state.status)
  const sendBulkConfiguration = useSerialStore(state => state.sendBulkConfiguration)
  const emergencyStop = useSerialStore(state => state.emergencyStop)

  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const printer = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter
  })
  const createConfigurationSnapshot = usePrintersStore(state => state.createConfigurationSnapshot)
  const restoreConfigurationSnapshot = usePrintersStore(state => state.restoreConfigurationSnapshot)
  const deleteConfigurationSnapshot = usePrintersStore(state => state.deleteConfigurationSnapshot)
  const exportConfiguration = usePrintersStore(state => state.exportConfiguration)
  const importConfiguration = usePrintersStore(state => state.importConfiguration)

  const handleCreateSnapshot = useCallback(async () => {
    if (!snapshotName.trim()) {
      alert('Please enter a snapshot name')
      return
    }

    try {
      createConfigurationSnapshot(activePrinterId, snapshotName, snapshotDescription)
      setSnapshotName('')
      setSnapshotDescription('')
      setShowCreateSnapshot(false)
      alert('Configuration snapshot created successfully!')
    } catch (error) {
      alert(`Error creating snapshot: ${error.message}`)
    }
  }, [activePrinterId, snapshotName, snapshotDescription, createConfigurationSnapshot])

  const handleRestoreSnapshot = useCallback(async (snapshotId) => {
    if (!confirm('Are you sure you want to restore this configuration? This will overwrite current settings.')) {
      return
    }

    try {
      restoreConfigurationSnapshot(activePrinterId, snapshotId)
      alert('Configuration restored successfully!')
    } catch (error) {
      alert(`Error restoring snapshot: ${error.message}`)
    }
  }, [activePrinterId, restoreConfigurationSnapshot])

  const handleDeleteSnapshot = useCallback(async (snapshotId) => {
    if (!confirm('Are you sure you want to delete this snapshot?')) {
      return
    }

    try {
      deleteConfigurationSnapshot(activePrinterId, snapshotId)
      alert('Snapshot deleted successfully!')
    } catch (error) {
      alert(`Error deleting snapshot: ${error.message}`)
    }
  }, [activePrinterId, deleteConfigurationSnapshot])

  const handleBulkSend = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }

    const commands = bulkCommands
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith(';') && !line.startsWith('#'))

    if (commands.length === 0) {
      alert('Please enter some G-code commands')
      return
    }

    if (!confirm(`Are you sure you want to send ${commands.length} commands to the printer?`)) {
      return
    }

    setBulkProgress({ isVisible: true, current: 0, total: commands.length, currentCommand: '' })

    try {
      const result = await sendBulkConfiguration(commands, {
        delayMs: 100,
        maxRetries: 3,
        onProgress: (current, total, command, success) => {
          setBulkProgress(prev => ({
            ...prev,
            current,
            currentCommand: command
          }))
        },
        onError: (command, error, current, total) => {
          console.error(`Command failed: ${command}`, error)
        }
      })

      setBulkProgress({ isVisible: false, current: 0, total: 0, currentCommand: '' })
      
      if (result.failureCount > 0) {
        alert(`Bulk configuration completed with ${result.failureCount} failures out of ${result.total} commands. Check the serial log for details.`)
      } else {
        alert(`All ${result.total} commands sent successfully!`)
      }
    } catch (error) {
      setBulkProgress({ isVisible: false, current: 0, total: 0, currentCommand: '' })
      alert(`Error sending bulk configuration: ${error.message}`)
    }
  }, [serialStatus, bulkCommands, sendBulkConfiguration])

  const handleExportConfiguration = useCallback(() => {
    try {
      const exportData = exportConfiguration(activePrinterId)
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${printer?.name || 'printer'}_configuration_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      alert(`Error exporting configuration: ${error.message}`)
    }
  }, [activePrinterId, exportConfiguration, printer?.name])

  const handleImportConfiguration = useCallback((event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result)
        importConfiguration(activePrinterId, importData)
        alert('Configuration imported successfully!')
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } catch (error) {
        alert(`Error importing configuration: ${error.message}`)
      }
    }
    reader.readAsText(file)
  }, [activePrinterId, importConfiguration])

  const handleEmergencyStop = useCallback(async () => {
    try {
      await emergencyStop()
      alert('Emergency stop activated!')
    } catch (error) {
      alert(`Emergency stop failed: ${error.message}`)
    }
  }, [emergencyStop])

  if (!printer) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Printer Selected</h3>
        <p className="text-gray-500">Please select a printer to manage configurations</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configuration Manager</h2>
          <p className="text-gray-600">Manage printer configurations, snapshots, and bulk operations</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <EmergencyStopButton onEmergencyStop={handleEmergencyStop} />
        </div>
      </div>

      {/* Connection Status */}
      <div className={`rounded-lg border-2 p-4 ${
        serialStatus === 'connected' 
          ? 'border-green-200 bg-green-50' 
          : 'border-red-200 bg-red-50'
      }`}>
        <div className="flex items-center">
          {serialStatus === 'connected' ? (
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
          )}
          <div>
            <h3 className={`font-semibold ${
              serialStatus === 'connected' ? 'text-green-900' : 'text-red-900'
            }`}>
              Serial Connection
            </h3>
            <p className={`text-sm ${
              serialStatus === 'connected' ? 'text-green-700' : 'text-red-700'
            }`}>
              {serialStatus === 'connected' ? 'Connected to printer' : 'Not connected to printer'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('snapshots')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'snapshots' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <GitBranch className="w-4 h-4 mr-2 inline" />
          Snapshots
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'bulk' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Play className="w-4 h-4 mr-2 inline" />
          Bulk Operations
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'backup' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Download className="w-4 h-4 mr-2 inline" />
          Backup/Restore
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'snapshots' && (
        <div className="space-y-6">
          {/* Create Snapshot */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Configuration Snapshots</h3>
              <button
                onClick={() => setShowCreateSnapshot(!showCreateSnapshot)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Snapshot
              </button>
            </div>

            {showCreateSnapshot && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-3">Create New Snapshot</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={snapshotName}
                      onChange={(e) => setSnapshotName(e.target.value)}
                      placeholder="e.g., PLA Profile, High Speed Settings"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={snapshotDescription}
                      onChange={(e) => setSnapshotDescription(e.target.value)}
                      placeholder="Optional description of this configuration..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCreateSnapshot}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Create Snapshot
                    </button>
                    <button
                      onClick={() => setShowCreateSnapshot(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Snapshots List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {printer.configurationSnapshots?.map(snapshot => (
                <ConfigurationSnapshot
                  key={snapshot.id}
                  snapshot={snapshot}
                  onRestore={handleRestoreSnapshot}
                  onDelete={handleDeleteSnapshot}
                  onView={(id) => console.log('View snapshot:', id)}
                />
              ))}
              
              {(!printer.configurationSnapshots || printer.configurationSnapshots.length === 0) && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <GitBranch className="w-12 h-12 mx-auto mb-2" />
                  <p>No configuration snapshots yet</p>
                  <p className="text-sm">Create your first snapshot to save current settings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bulk' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Bulk G-code Operations</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  G-code Commands (one per line)
                </label>
                <textarea
                  value={bulkCommands}
                  onChange={(e) => setBulkCommands(e.target.value)}
                  placeholder="M92 X80 Y80 Z400 E93&#10;M203 X500 Y500 Z5 E25&#10;M201 X1000 Y1000 Z100 E1000&#10;M500"
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Warning:</strong> Bulk operations send multiple commands in sequence. 
                    Make sure your commands are correct and safe for your printer. 
                    Use the emergency stop button if needed.
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkSend}
                  disabled={serialStatus !== 'connected' || !bulkCommands.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Send Commands
                </button>
                <button
                  onClick={() => setBulkCommands('')}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Backup & Restore</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Export Configuration</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Export current printer configuration and all snapshots to a JSON file.
                </p>
                <button
                  onClick={handleExportConfiguration}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Configuration
                </button>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Import Configuration</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Import configuration from a previously exported JSON file.
                </p>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportConfiguration}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Configuration Progress Modal */}
      <BulkConfigurationProgress
        isVisible={bulkProgress.isVisible}
        progress={bulkProgress}
        onCancel={() => setBulkProgress({ isVisible: false, current: 0, total: 0, currentCommand: '' })}
      />
    </div>
  )
}

export default ConfigurationManager
