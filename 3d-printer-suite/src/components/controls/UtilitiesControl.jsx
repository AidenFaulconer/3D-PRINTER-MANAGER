import React from 'react'
import FirmwareInfoDisplay from './FirmwareInfoDisplay'
import BedLevelingControl from './BedLevelingControl'

export default function UtilitiesControl({ send, extraActions }) {
  const pidTune = () => {
    // Default PID autotune for hotend @ 210C, 8 cycles
    send('M303 E0 S210 C8')
  }


  const disableSteppers = () => {
    // Disable all stepper motors
    send('M18')
  }

  const enableSteppers = () => {
    // Enable stepper motors (home first to enable)
    send('G28')
  }

  const emergencyStop = () => {
    send('M112')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="font-medium text-gray-900">Utilities</h3>
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={pidTune}>PID Tune (E0)</button>
        <button className="px-3 py-2 bg-orange-600 text-white rounded" onClick={disableSteppers}>Disable Steppers</button>
        <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={enableSteppers}>Enable Steppers</button>
        <FirmwareInfoDisplay />
        <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={emergencyStop}>Emergency Stop</button>
      </div>
      <div className="pt-2">
        {extraActions ? extraActions : <BedLevelingControl send={send} />}
      </div>
    </div>
  )
}
