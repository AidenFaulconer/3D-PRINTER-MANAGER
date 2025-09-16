import React from 'react'

export default function BedLevelingControl({ send }) {
  const bedLeveling = () => {
    // CRITICAL: Run auto-homing first to prevent belt damage
    // If supported: mesh leveling assistant
    send('G28') // Auto-homing first
    setTimeout(() => {
      send('G29') // Then bed leveling
    }, 2000) // Wait 2 seconds for homing to complete
  }

  const enableBedLeveling = () => {
    // Enable bed leveling compensation
    send('M420 S1')
  }

  const disableBedLeveling = () => {
    // Disable bed leveling compensation
    send('M420 S0')
  }

  const loadBedLeveling = () => {
    // Load bed leveling mesh from EEPROM
    send('M420 V')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
      <h3 className="text-sm font-medium text-gray-900">Bed Leveling Controls</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" 
          onClick={bedLeveling}
          title="Run Bed Leveling: Homes printer then runs G29 mesh leveling"
        >
          Run Bed Leveling
        </button>
        <button 
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors" 
          onClick={enableBedLeveling}
          title="Enable Leveling: Toggle bed leveling compensation on/off"
        >
          Enable Leveling
        </button>
        <button 
          className="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors" 
          onClick={disableBedLeveling}
          title="Disable Leveling: Toggle bed leveling compensation on/off"
        >
          Disable Leveling
        </button>
        <button 
          className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors" 
          onClick={loadBedLeveling}
          title="Load Mesh: Load saved bed leveling mesh from EEPROM"
        >
          Load Mesh
        </button>
      </div>
    </div>
  )
}
