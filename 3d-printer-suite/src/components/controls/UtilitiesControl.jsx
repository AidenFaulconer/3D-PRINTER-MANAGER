import React from 'react'
import FirmwareInfoDisplay from './FirmwareInfoDisplay'

export default function UtilitiesControl({ send }) {
  const pidTune = () => {
    // Default PID autotune for hotend @ 210C, 8 cycles
    send('M303 E0 S210 C8')
  }

  const bedLeveling = () => {
    // If supported: mesh leveling assistant
    send('G29')
  }

  const emergencyStop = () => {
    send('M112')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="font-medium text-gray-900">Utilities</h3>
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={pidTune}>PID Tune (E0)</button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={bedLeveling}>Bed Leveling</button>
        <FirmwareInfoDisplay />
        <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={emergencyStop}>Emergency Stop</button>
      </div>
    </div>
  )
}
