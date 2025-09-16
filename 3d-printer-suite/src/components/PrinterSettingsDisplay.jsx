import React, { memo } from 'react'
import { Settings, Edit3 } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'

const PrinterSettingsDisplay = memo(() => {
  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === activePrinterId)
    console.log('PrinterSettingsDisplay: activePrinterId:', activePrinterId)
    console.log('PrinterSettingsDisplay: activePrinter:', activePrinter)
    console.log('PrinterSettingsDisplay: printerSettings:', activePrinter?.printerSettings)
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
    <div className="bg-gray-50 rounded p-3 mb-2">
      <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
        <Settings className="w-4 h-4 mr-1" />
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {keys.map(key => {
          const value = settings?.[key]
          return (
            <div key={key} className="flex justify-between items-center px-2 py-1 bg-white rounded text-xs">
              <span className="font-medium text-gray-600">{key}:</span>
              <span className="text-gray-900 font-mono">
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
      <div className="bg-gray-50 rounded p-3">
        <div className="text-center">
          <Settings className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <h3 className="text-sm font-semibold text-gray-700 mb-1">No Printer Settings</h3>
          <p className="text-xs text-gray-500">Connect to a printer to automatically fetch and view configuration</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Printer Settings</h2>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '#/configuration'}
            className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Edit Settings
          </button>
        </div>
      </div>

      {printerSettings.lastUpdated && (
        <div className="text-xs text-gray-500 mb-2">
          Last updated: {new Date(printerSettings.lastUpdated).toLocaleString()}
        </div>
      )}

      {renderSettingsSection('Steps Per Unit (M92)', printerSettings.stepsPerUnit, ['x', 'y', 'z', 'e'])}
      
      {renderSettingsSection('Feedrates (M203)', printerSettings.feedrates, ['x', 'y', 'z', 'e'])}
      
      {renderSettingsSection('Acceleration (M201/M204)', printerSettings.acceleration, ['max', 'print', 'retract', 'travel'])}
      
      {renderSettingsSection('Jerk Settings (M205)', printerSettings.acceleration?.jerk, ['x', 'y', 'z', 'e'])}
      
      {renderSettingsSection('Home Offset (M206)', printerSettings.homeOffset, ['x', 'y', 'z'])}
      
      {renderSettingsSection('Z Probe Offset (M851)', printerSettings.zProbeOffset, ['x', 'y', 'z'])}
      
      <div className="bg-gray-50 rounded p-3 mb-2">
        <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
          <Settings className="w-4 h-4 mr-1" />
          Bed Leveling (M420)
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex justify-between items-center px-2 py-1 bg-white rounded text-xs">
            <span className="font-medium text-gray-600">Enabled:</span>
            <span className={`px-1 py-0.5 rounded text-xs ${printerSettings.bedLeveling?.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {printerSettings.bedLeveling?.enabled ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-white rounded text-xs">
            <span className="font-medium text-gray-600">Fade Height:</span>
            <span className="text-gray-900 font-mono">
              {printerSettings.bedLeveling?.fadeHeight}mm
            </span>
          </div>
        </div>
        {printerSettings.bedLeveling?.mesh && printerSettings.bedLeveling.mesh.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-600 mb-1 text-xs">Mesh Points ({printerSettings.bedLeveling.mesh.length}):</h4>
            <div className="max-h-20 overflow-y-auto bg-white rounded p-1">
              <pre className="text-xs font-mono">
                {printerSettings.bedLeveling.mesh.map((row, j) => 
                  row.map((z, i) => 
                    `Point (${i}, ${j}) = ${typeof z === 'number' ? z.toFixed(3) : '0.000'}mm`
                  ).join('\n')
                ).join('\n')}
              </pre>
            </div>
          </div>
        )}
      </div>

      {renderSettingsSection('PID Hotend (M301)', printerSettings.pid?.hotend, ['p', 'i', 'd'])}
      
      {renderSettingsSection('PID Bed (M304)', printerSettings.pid?.bed, ['p', 'i', 'd'])}

      <div className="bg-gray-50 rounded p-3 mb-2">
        <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
          <Settings className="w-4 h-4 mr-1" />
          Material Heating (M145)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(printerSettings.materialHeating || {}).map(([material, temps]) => (
            <div key={material} className="p-2 bg-white rounded text-xs">
              <h4 className="font-medium text-gray-600 mb-1 capitalize">{material}</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Hotend:</span>
                  <span className="font-mono">{temps.hotend}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bed:</span>
                  <span className="font-mono">{temps.bed}°C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded p-3 mb-2">
        <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
          <Settings className="w-4 h-4 mr-1" />
          Other Settings
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between items-center px-2 py-1 bg-white rounded text-xs">
            <span className="font-medium text-gray-600">Power Loss Recovery:</span>
            <span className={`px-1 py-0.5 rounded text-xs ${printerSettings.powerLossRecovery ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {printerSettings.powerLossRecovery ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-white rounded text-xs">
            <span className="font-medium text-gray-600">Linear Advance:</span>
            <span className="text-gray-900 font-mono">
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
