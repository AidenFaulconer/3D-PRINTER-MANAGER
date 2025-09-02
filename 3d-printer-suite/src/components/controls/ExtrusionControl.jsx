import React, { useState } from 'react'

export default function ExtrusionControl({ send, preheat }) {
  const [length, setLength] = useState(5)
  const [speed, setSpeed] = useState(120) // mm/min

  const extrude = (dir) => {
    send('G91')
    send(`G1 E${dir * length} F${speed}`)
    send('G90')
  }

  const filamentChange = () => {
    // M600 if supported, otherwise scripted
    send('M600')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Extrusion</h3>
        <div className="space-x-2">
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => preheat?.('PLA')}>Preheat PLA</button>
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => preheat?.('PETG')}>Preheat PETG</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <label className="text-sm">
          <span className="text-gray-700">Length (mm)</span>
          <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={length} onChange={(e)=>setLength(parseFloat(e.target.value)||0)} />
        </label>
        <label className="text-sm">
          <span className="text-gray-700">Speed (mm/min)</span>
          <input type="number" className="w-full border border-gray-300 rounded px-2 py-1" value={speed} onChange={(e)=>setSpeed(parseFloat(e.target.value)||0)} />
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => extrude(1)}>Extrude</button>
        <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={() => extrude(-1)}>Retract</button>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={filamentChange}>Filament Change</button>
      </div>
    </div>
  )
}
