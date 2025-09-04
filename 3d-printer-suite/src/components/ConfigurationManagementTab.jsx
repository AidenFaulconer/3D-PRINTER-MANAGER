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
  Zap
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'
import PrinterSettingsEditor from './PrinterSettingsEditor'

const ConfigurationManagementTab = () => {
  const [activeSection, setActiveSection] = useState('editor') // 'editor', 'summary', 'documentation'

  const serialStatus = useSerialStore(state => state.status)

  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.printerSettings
  })

  // Settings are fetched automatically on connection, no manual fetch needed

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
    </div>
  )
}

export default ConfigurationManagementTab
