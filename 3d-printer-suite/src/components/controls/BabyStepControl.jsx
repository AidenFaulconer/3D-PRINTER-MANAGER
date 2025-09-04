import React, { useState } from 'react'

const STEP_PRESETS = [-0.05, -0.02, -0.01, 0.01, 0.02, 0.05]

const BabyStepControl = React.memo(function BabyStepControl({ send, isConnected = false }) {
  const [accumulated, setAccumulated] = useState(0)
  const [custom, setCustom] = useState('0.02')

  const doStep = async (delta) => {
    if (!isConnected) return
    const d = Number(delta)
    if (Number.isNaN(d) || d === 0) return
    // Marlin: M290 Z<delta> (in mm). Positive moves nozzle away from bed; negative towards bed.
    await send(`M290 Z${d}`)
    setAccumulated(prev => Number((prev + d).toFixed(3)))
  }

  const reset = async () => {
    if (!isConnected) return
    // Reset babysteps (Marlin supports M290 R)
    await send('M290 R')
    setAccumulated(0)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Z Babystep</h3>
        <div className="text-xs text-gray-600">Δ {accumulated.toFixed(3)} mm</div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {STEP_PRESETS.map((s) => (
          <button
            key={s}
            disabled={!isConnected}
            onClick={() => doStep(s)}
            className={`px-2 py-1 rounded text-sm ${
              isConnected ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
            title={`M290 Z${s}`}
          >
            {s > 0 ? `+${s}` : `${s}`}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          className={`w-24 border rounded px-2 py-1 text-sm ${
            isConnected ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'
          }`}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="0.02"
        />
        <button
          disabled={!isConnected}
          onClick={() => doStep(Number(custom))}
          className={`px-3 py-2 rounded text-sm ${
            isConnected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          Apply
        </button>
        <button
          disabled={!isConnected}
          onClick={reset}
          className={`ml-auto px-3 py-2 rounded text-sm ${
            isConnected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          Reset
        </button>
      </div>
      <div className="text-xs text-gray-500">
        Tip: Negative moves nozzle closer to bed; positive moves away. Real-time during first layer.
      </div>
    </div>
  )
})

export default BabyStepControl


