import React, { useState } from 'react'

export default function FanControl({ send }) {
  const [speed, setSpeed] = useState(0)

  const apply = (value) => {
    const clamped = Math.max(0, Math.min(100, value))
    setSpeed(clamped)
    const s255 = Math.round((clamped / 100) * 255)
    send(`M106 S${s255}`)
  }

  const off = () => {
    setSpeed(0)
    send('M106 S0')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Fan</h3>
        <div className="space-x-2">
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => apply(50)}>50%</button>
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => apply(100)}>100%</button>
          <button className="px-2 py-1 text-xs bg-red-600 text-white rounded" onClick={off}>Off</button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input type="range" min={0} max={100} value={speed} onChange={(e)=>apply(parseInt(e.target.value,10))} className="w-full" />
        <div className="w-12 text-right text-sm text-gray-700">{speed}%</div>
      </div>
    </div>
  )
}
