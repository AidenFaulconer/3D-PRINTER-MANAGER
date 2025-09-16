import React, { useState, useCallback } from 'react'
import { 
  Settings, 
  Save, 
  Upload, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  Filter,
  BookOpen,
  Zap,
  Download,
  Send,
  HardDrive,
  Terminal
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'
import PrinterSettingsEditor from './PrinterSettingsEditor'
import FirmwareConfig from './FirmwareConfig'
import RemoteTerminal from './RemoteTerminal'

const ConfigurationManagementTab = () => {
  const [activeSection, setActiveSection] = useState('editor') // 'editor', 'summary', 'documentation', 'firmware', 'terminal'

  const serialStatus = useSerialStore(state => state.status)
  const sendCommand = useSerialStore(state => state.sendCommand)

  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const activePrinter = usePrintersStore(state => state.printers.find(p => p.id === state.activePrinterId))
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.printerSettings
  })

  // Settings are fetched automatically on connection, no manual fetch needed

  // JSON Export/Import functionality
  const exportSettings = useCallback(() => {
    if (!printerSettings || !activePrinter) {
      alert('No settings available to export')
      return
    }

    const exportData = {
      printerName: activePrinter.name,
      printerId: activePrinterId,
      exportDate: new Date().toISOString(),
      settings: printerSettings
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const filename = `printer-config_${activePrinter.name.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.json`
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [printerSettings, activePrinter, activePrinterId])

  const importSettings = useCallback((event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result)
        
        if (!importData.settings) {
          alert('Invalid configuration file format')
          return
        }

        if (confirm(`Import settings from ${importData.printerName || 'Unknown Printer'}? This will overwrite current settings.`)) {
          // Update printer settings in store
          usePrintersStore.getState().updatePrinter(activePrinterId, {
            printerSettings: importData.settings
          })
          alert('Settings imported successfully!')
        }
      } catch (error) {
        alert('Error reading configuration file: ' + error.message)
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    event.target.value = ''
  }, [activePrinterId])

  // Send settings to printer
  const sendSettingsToPrinter = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }

    if (!printerSettings) {
      alert('No settings available to send')
      return
    }

    if (!confirm('This will send all configuration settings to the printer. Continue?')) {
      return
    }

    try {
      // Send motion settings
      if (printerSettings.stepsPerUnit) {
        await sendCommand(`M92 X${printerSettings.stepsPerUnit.x} Y${printerSettings.stepsPerUnit.y} Z${printerSettings.stepsPerUnit.z} E${printerSettings.stepsPerUnit.e}`)
      }

      // Send feedrate settings
      if (printerSettings.feedrates) {
        await sendCommand(`M203 X${printerSettings.feedrates.x} Y${printerSettings.feedrates.y} Z${printerSettings.feedrates.z} E${printerSettings.feedrates.e}`)
      }

      // Send acceleration settings
      if (printerSettings.acceleration) {
        await sendCommand(`M201 X${printerSettings.acceleration.max} Y${printerSettings.acceleration.max} Z${printerSettings.acceleration.max} E${printerSettings.acceleration.max}`)
        await sendCommand(`M204 P${printerSettings.acceleration.print} R${printerSettings.acceleration.retract} T${printerSettings.acceleration.travel}`)
      }

      // Send PID settings
      if (printerSettings.pid?.hotend) {
        await sendCommand(`M301 P${printerSettings.pid.hotend.p} I${printerSettings.pid.hotend.i} D${printerSettings.pid.hotend.d}`)
      }
      if (printerSettings.pid?.bed) {
        await sendCommand(`M304 P${printerSettings.pid.bed.p} I${printerSettings.pid.bed.i} D${printerSettings.pid.bed.d}`)
      }

      // Send bed leveling settings
      if (printerSettings.bedLeveling) {
        await sendCommand(`M420 S${printerSettings.bedLeveling.enabled ? 1 : 0}`)
        if (printerSettings.bedLeveling.fadeHeight) {
          await sendCommand(`M420 Z${printerSettings.bedLeveling.fadeHeight}`)
        }
      }

      // Send Z probe offset
      if (printerSettings.zProbeOffset) {
        await sendCommand(`M851 X${printerSettings.zProbeOffset.x} Y${printerSettings.zProbeOffset.y} Z${printerSettings.zProbeOffset.z}`)
      }

      // Send home offset
      if (printerSettings.homeOffset) {
        await sendCommand(`M206 X${printerSettings.homeOffset.x} Y${printerSettings.homeOffset.y} Z${printerSettings.homeOffset.z}`)
      }

      // Send linear advance
      if (printerSettings.linearAdvance) {
        await sendCommand(`M900 K${printerSettings.linearAdvance}`)
      }

      // Send power loss recovery
      if (printerSettings.powerLossRecovery !== undefined) {
        await sendCommand(`M413 S${printerSettings.powerLossRecovery ? 1 : 0}`)
      }

      alert('Settings sent to printer successfully!')
    } catch (error) {
      alert('Error sending settings to printer: ' + error.message)
    }
  }, [serialStatus, printerSettings, sendCommand])

  // Save settings to printer EEPROM
  const saveSettingsToPrinter = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }

    if (!confirm('This will save all current settings to the printer\'s EEPROM. Continue?')) {
      return
    }

    try {
      await sendCommand('M500') // Save to EEPROM
      alert('Settings saved to printer EEPROM successfully!')
    } catch (error) {
      alert('Error saving settings to printer: ' + error.message)
    }
  }, [serialStatus, sendCommand])

  const getSettingsSummary = () => {
    if (!printerSettings) return null

    const summary = {
      motion: {
        stepsPerUnit: printerSettings.stepsPerUnit,
        feedrates: printerSettings.feedrates
      },
      acceleration: {
        max: printerSettings.acceleration?.max,
        print: printerSettings.acceleration?.print,
        retract: printerSettings.acceleration?.retract,
        travel: printerSettings.acceleration?.travel
      },
      temperature: {
        pidHotend: printerSettings.pid?.hotend,
        pidBed: printerSettings.pid?.bed
      },
      bedLeveling: {
        enabled: printerSettings.bedLeveling?.enabled,
        fadeHeight: printerSettings.bedLeveling?.fadeHeight,
        meshPoints: printerSettings.bedLeveling?.mesh?.length || 0
      },
      advanced: {
        homeOffset: printerSettings.homeOffset,
        zProbeOffset: printerSettings.zProbeOffset,
        linearAdvance: printerSettings.linearAdvance,
        powerLossRecovery: printerSettings.powerLossRecovery
      },
      bowdenTube: {
        length: printerSettings.bowdenTube?.length,
        type: printerSettings.bowdenTube?.type
      }
    }

    return summary
  }

  const getSettingsStatus = () => {
    if (!printerSettings) {
      return {
        status: 'no-data',
        message: 'No configuration data available',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle
      }
    }

    const lastUpdated = printerSettings.lastUpdated
    const isRecent = lastUpdated && (Date.now() - new Date(lastUpdated).getTime()) < 24 * 60 * 60 * 1000 // 24 hours

    if (isRecent) {
      return {
        status: 'current',
        message: 'Configuration is up to date',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle
      }
    } else {
      return {
        status: 'outdated',
        message: 'Configuration may be outdated',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: AlertTriangle
      }
    }
  }

  const settingsSummary = getSettingsSummary()
  const settingsStatus = getSettingsStatus()
  const StatusIcon = settingsStatus.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configuration Management</h2>
          <p className="text-gray-600">Manage and configure all printer settings</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Settings Auto-Fetched on Connection
          </div>
        </div>
      </div>

      {/* Export/Import and Send/Save Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportSettings}
              disabled={!printerSettings}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </button>
            
            <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Import Settings
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={sendSettingsToPrinter}
              disabled={serialStatus !== 'connected' || !printerSettings}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Send to Printer
            </button>
            
            <button
              onClick={saveSettingsToPrinter}
              disabled={serialStatus !== 'connected'}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <HardDrive className="w-4 h-4 mr-2" />
              Save to EEPROM
            </button>
          </div>
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          <p><strong>Export:</strong> Download current settings as JSON file with timestamp and printer name</p>
          <p><strong>Import:</strong> Load settings from a previously exported JSON file</p>
          <p><strong>Send to Printer:</strong> Upload all settings to the connected printer (temporary)</p>
          <p><strong>Save to EEPROM:</strong> Permanently save current settings to printer memory</p>
        </div>
      </div>

      {/* Configuration Status */}
      <div className={`rounded-lg border-2 ${settingsStatus.borderColor} ${settingsStatus.bgColor} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StatusIcon className={`w-6 h-6 mr-3 ${settingsStatus.color}`} />
            <div>
              <h3 className={`font-semibold ${settingsStatus.color}`}>Configuration Status</h3>
              <p className={`text-sm ${settingsStatus.color}`}>{settingsStatus.message}</p>
            </div>
          </div>
          
          {printerSettings?.lastUpdated && (
            <div className="text-right">
              <div className={`text-sm ${settingsStatus.color}`}>
                {new Date(printerSettings.lastUpdated).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Last Updated</div>
            </div>
          )}
        </div>
      </div>

      {/* Printer Configuration Summary */}
      {printerSettings && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <HardDrive className="w-5 h-5 mr-2 text-blue-600" />
              Printer Configuration Summary
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {printerSettings.lastUpdated ? 
                `Last updated: ${new Date(printerSettings.lastUpdated).toLocaleDateString()}` : 
                'Auto-fetched on connection'
              }
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Motion Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Motion</div>
              <div className="text-sm font-mono">
                X:{settingsSummary.motion.stepsPerUnit?.x || 'N/A'} | 
                Y:{settingsSummary.motion.stepsPerUnit?.y || 'N/A'}
              </div>
              <div className="text-sm font-mono">
                Z:{settingsSummary.motion.stepsPerUnit?.z || 'N/A'} | 
                E:{settingsSummary.motion.stepsPerUnit?.e || 'N/A'}
              </div>
            </div>

            {/* Acceleration */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Acceleration</div>
              <div className="text-sm font-mono">
                Max: {settingsSummary.acceleration?.max || 'N/A'}
              </div>
              <div className="text-sm font-mono">
                Print: {settingsSummary.acceleration?.print || 'N/A'}
              </div>
            </div>

            {/* Temperature */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Temperature</div>
              <div className="text-sm font-mono">
                Hotend PID: {settingsSummary.temperature.pidHotend?.p ? 'Set' : 'N/A'}
              </div>
              <div className="text-sm font-mono">
                Bed PID: {settingsSummary.temperature.pidBed?.p ? 'Set' : 'N/A'}
              </div>
            </div>

            {/* Bed Leveling */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bed Leveling</div>
              <div className={`text-sm font-semibold ${
                settingsSummary.bedLeveling.enabled ? 'text-green-600' : 'text-red-600'
              }`}>
                {settingsSummary.bedLeveling.enabled ? 'Enabled' : 'Disabled'}
              </div>
              <div className="text-sm font-mono">
                {settingsSummary.bedLeveling.meshPoints} points
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Advanced</div>
              <div className="text-sm font-mono">
                Linear Adv: {settingsSummary.advanced.linearAdvance || 'N/A'}
              </div>
              <div className={`text-sm font-semibold ${
                settingsSummary.advanced.powerLossRecovery ? 'text-green-600' : 'text-red-600'
              }`}>
                PLR: {settingsSummary.advanced.powerLossRecovery ? 'On' : 'Off'}
              </div>
            </div>

            {/* Offsets */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Offsets</div>
              <div className="text-sm font-mono">
                Z Probe: {settingsSummary.advanced.zProbeOffset?.z || 'N/A'}mm
              </div>
              <div className="text-sm font-mono">
                Home Z: {settingsSummary.advanced.homeOffset?.z || 'N/A'}mm
              </div>
            </div>

            {/* Bowden Tube */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bowden Tube</div>
              <div className="text-sm font-mono">
                Length: {settingsSummary.bowdenTube?.length || 'N/A'}mm
              </div>
              <div className="text-sm font-mono">
                Type: {settingsSummary.bowdenTube?.type || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveSection('editor')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeSection === 'editor' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="w-4 h-4 mr-2 inline" />
          Settings Editor
        </button>
        <button
          onClick={() => setActiveSection('summary')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeSection === 'summary' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4 mr-2 inline" />
          Summary
        </button>
        <button
          onClick={() => setActiveSection('documentation')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeSection === 'documentation' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2 inline" />
          Documentation
        </button>
        <button
          onClick={() => setActiveSection('firmware')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeSection === 'firmware' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4 mr-2 inline" />
          Firmware Config
        </button>
        <button
          onClick={() => setActiveSection('terminal')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeSection === 'terminal' 
              ? 'bg-white text-gray-900 shadow' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Terminal className="w-4 h-4 mr-2 inline" />
          Terminal & Build
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'editor' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <PrinterSettingsEditor />
        </div>
      )}

      {activeSection === 'summary' && (
        <div className="space-y-6">
          {settingsSummary ? (
            <>
              {/* Motion Settings Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Motion Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-600">X Steps/mm</div>
                    <div className="text-xl font-bold">{settingsSummary.motion.stepsPerUnit?.x || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Y Steps/mm</div>
                    <div className="text-xl font-bold">{settingsSummary.motion.stepsPerUnit?.y || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Z Steps/mm</div>
                    <div className="text-xl font-bold">{settingsSummary.motion.stepsPerUnit?.z || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">E Steps/mm</div>
                    <div className="text-xl font-bold">{settingsSummary.motion.stepsPerUnit?.e || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Acceleration Settings Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Acceleration Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-600">Max Acceleration</div>
                    <div className="text-xl font-bold">{settingsSummary.acceleration?.max || 'N/A'} mm/s²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Print Acceleration</div>
                    <div className="text-xl font-bold">{settingsSummary.acceleration?.print || 'N/A'} mm/s²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Retract Acceleration</div>
                    <div className="text-xl font-bold">{settingsSummary.acceleration?.retract || 'N/A'} mm/s²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Travel Acceleration</div>
                    <div className="text-xl font-bold">{settingsSummary.acceleration?.travel || 'N/A'} mm/s²</div>
                  </div>
                </div>
              </div>

              {/* Temperature Settings Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Temperature Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Hotend PID</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">P:</span>
                        <span className="font-mono">{settingsSummary.temperature.pidHotend?.p || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">I:</span>
                        <span className="font-mono">{settingsSummary.temperature.pidHotend?.i || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">D:</span>
                        <span className="font-mono">{settingsSummary.temperature.pidHotend?.d || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Bed PID</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">P:</span>
                        <span className="font-mono">{settingsSummary.temperature.pidBed?.p || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">I:</span>
                        <span className="font-mono">{settingsSummary.temperature.pidBed?.i || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">D:</span>
                        <span className="font-mono">{settingsSummary.temperature.pidBed?.d || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bed Leveling Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Bed Leveling</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div className={`text-lg font-semibold ${
                      settingsSummary.bedLeveling.enabled ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {settingsSummary.bedLeveling.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Fade Height</div>
                    <div className="text-xl font-bold">{settingsSummary.bedLeveling.fadeHeight || 'N/A'} mm</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Mesh Points</div>
                    <div className="text-xl font-bold">{settingsSummary.bedLeveling.meshPoints}</div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-600">Linear Advance</div>
                    <div className="text-xl font-bold">{settingsSummary.advanced.linearAdvance || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Power Loss Recovery</div>
                    <div className={`text-lg font-semibold ${
                      settingsSummary.advanced.powerLossRecovery ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {settingsSummary.advanced.powerLossRecovery ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Z Probe Z Offset</div>
                    <div className="text-xl font-bold">{settingsSummary.advanced.zProbeOffset?.z || 'N/A'} mm</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Home Z Offset</div>
                    <div className="text-xl font-bold">{settingsSummary.advanced.homeOffset?.z || 'N/A'} mm</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Configuration Data</h3>
              <p className="text-gray-500 mb-4">Connect to printer to automatically fetch configuration</p>
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded flex items-center justify-center mx-auto max-w-xs">
                <CheckCircle className="w-4 h-4 mr-2" />
                Auto-Fetch on Connection
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === 'documentation' && (
        <div className="space-y-6">
          {/* Marlin G-code Reference */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Marlin G-code Reference</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Motion Commands</h4>
                  <div className="space-y-1 text-sm">
                    <div><code className="bg-gray-200 px-1 rounded">M92</code> - Set steps per unit</div>
                    <div><code className="bg-gray-200 px-1 rounded">M203</code> - Set maximum feedrate</div>
                    <div><code className="bg-gray-200 px-1 rounded">M201</code> - Set maximum acceleration</div>
                    <div><code className="bg-gray-200 px-1 rounded">M204</code> - Set acceleration</div>
                    <div><code className="bg-gray-200 px-1 rounded">M205</code> - Set advanced settings</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Temperature Commands</h4>
                  <div className="space-y-1 text-sm">
                    <div><code className="bg-gray-200 px-1 rounded">M301</code> - Set hotend PID</div>
                    <div><code className="bg-gray-200 px-1 rounded">M304</code> - Set bed PID</div>
                    <div><code className="bg-gray-200 px-1 rounded">M145</code> - Set material presets</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Bed Leveling Commands</h4>
                  <div className="space-y-1 text-sm">
                    <div><code className="bg-gray-200 px-1 rounded">M420</code> - Enable/disable bed leveling</div>
                    <div><code className="bg-gray-200 px-1 rounded">G29</code> - Auto bed leveling</div>
                    <div><code className="bg-gray-200 px-1 rounded">M851</code> - Set Z probe offset</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Advanced Commands</h4>
                  <div className="space-y-1 text-sm">
                    <div><code className="bg-gray-200 px-1 rounded">M206</code> - Set home offset</div>
                    <div><code className="bg-gray-200 px-1 rounded">M900</code> - Set linear advance</div>
                    <div><code className="bg-gray-200 px-1 rounded">M413</code> - Power loss recovery</div>
                    <div><code className="bg-gray-200 px-1 rounded">M500</code> - Save to EEPROM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Safety Information
            </h3>
            <div className="space-y-3 text-sm text-yellow-800">
              <div>
                <strong>PID Settings:</strong> Incorrect PID values can cause temperature instability and potential damage to your printer.
              </div>
              <div>
                <strong>Steps per Unit:</strong> Wrong values will cause dimensional inaccuracy in your prints.
              </div>
              <div>
                <strong>Acceleration/Jerk:</strong> Too high values can cause skipped steps and print failures.
              </div>
              <div>
                <strong>Z Probe Offset:</strong> Critical for first layer height and print quality.
              </div>
              <div>
                <strong>Always test changes:</strong> Make small adjustments and test thoroughly before making major changes.
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Best Practices
            </h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div>
                <strong>Backup First:</strong> Always fetch and save your current configuration before making changes.
              </div>
              <div>
                <strong>One at a Time:</strong> Make one setting change at a time and test the results.
              </div>
              <div>
                <strong>Document Changes:</strong> Keep track of what you've changed and why.
              </div>
              <div>
                <strong>Save to EEPROM:</strong> Always use "Save All" to permanently save changes to the printer's memory.
              </div>
              <div>
                <strong>Test Prints:</strong> Run test prints after making significant changes to verify everything works correctly.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'firmware' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Firmware Configuration</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Upload and analyze your Marlin firmware configuration files to understand your printer's capabilities
            </p>
            <FirmwareConfig />
          </div>
        </div>
      )}

      {activeSection === 'terminal' && (
        <div className="space-y-6">
          <RemoteTerminal />
        </div>
      )}
    </div>
  )
}

export default ConfigurationManagementTab
