import React, { memo } from 'react'
import { Settings, Edit3 } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'

const PrinterSettingsDisplay = memo(() => {
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.printerSettings
  })

  // Settings are now fetched automatically on connection

  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2)
    }
    return String(value)
  }

  const renderSettingsSection = (title, settings, keys) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {keys.map(key => {
          const value = settings?.[key]
          return (
            <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">{key}:</span>
              <span className="text-gray-900 font-mono text-sm">
                {formatValue(value)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (!printerSettings) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <Settings className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Printer Settings</h3>
          <p className="text-gray-500 mb-4">Connect to a printer to automatically fetch and view configuration</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Printer Settings</h2>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '#/configuration'}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Settings
          </button>
        </div>
      </div>

      {printerSettings.lastUpdated && (
        <div className="text-sm text-gray-500 mb-4">
          Last updated: {new Date(printerSettings.lastUpdated).toLocaleString()}
        </div>
      )}

      {renderSettingsSection('Steps Per Unit (M92)', printerSettings.stepsPerUnit, ['x', 'y', 'z', 'e'])}
      
      {renderSettingsSection('Feedrates (M203)', printerSettings.feedrates, ['x', 'y', 'z', 'e'])}
      
      {renderSettingsSection('Acceleration (M201/M204)', printerSettings.acceleration, ['max', 'print', 'retract', 'travel'])}
      
      {renderSettingsSection('Jerk Settings (M205)', printerSettings.acceleration?.jerk, ['x', 'y', 'z', 'e'])}
      
      {renderSettingsSection('Home Offset (M206)', printerSettings.homeOffset, ['x', 'y', 'z'])}
      
      {renderSettingsSection('Z Probe Offset (M851)', printerSettings.zProbeOffset, ['x', 'y', 'z'])}
      
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Bed Leveling (M420)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">Enabled:</span>
            <span className={`px-2 py-1 rounded text-sm ${printerSettings.bedLeveling?.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {printerSettings.bedLeveling?.enabled ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">Fade Height:</span>
            <span className="text-gray-900 font-mono text-sm">
              {printerSettings.bedLeveling?.fadeHeight}mm
            </span>
          </div>
        </div>
        {printerSettings.bedLeveling?.mesh && printerSettings.bedLeveling.mesh.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-gray-700 mb-2">Mesh Points ({printerSettings.bedLeveling.mesh.length}):</h4>
            <div className="max-h-32 overflow-y-auto bg-gray-50 rounded p-2">
              <pre className="text-xs font-mono">
                {printerSettings.bedLeveling.mesh.map((point, i) => 
                  `Point ${i + 1}: (${point.i}, ${point.j}) = ${point.z.toFixed(3)}mm`
                ).join('\n')}
              </pre>
            </div>
          </div>
        )}
      </div>

      {renderSettingsSection('PID Hotend (M301)', printerSettings.pid?.hotend, ['p', 'i', 'd'])}
      
      {renderSettingsSection('PID Bed (M304)', printerSettings.pid?.bed, ['p', 'i', 'd'])}

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Material Heating (M145)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(printerSettings.materialHeating || {}).map(([material, temps]) => (
            <div key={material} className="p-3 bg-gray-50 rounded">
              <h4 className="font-medium text-gray-700 mb-2 capitalize">{material}</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Hotend:</span>
                  <span className="text-sm font-mono">{temps.hotend}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bed:</span>
                  <span className="text-sm font-mono">{temps.bed}°C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Other Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">Power Loss Recovery:</span>
            <span className={`px-2 py-1 rounded text-sm ${printerSettings.powerLossRecovery ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {printerSettings.powerLossRecovery ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">Linear Advance:</span>
            <span className="text-gray-900 font-mono text-sm">
              {printerSettings.linearAdvance}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

PrinterSettingsDisplay.displayName = 'PrinterSettingsDisplay'

export default PrinterSettingsDisplay
