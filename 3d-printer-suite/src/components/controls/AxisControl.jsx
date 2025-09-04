import React, { useState } from 'react'
import { Home, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

const STEP_SIZES = [0.1, 1, 10, 50, 100]

const AxisControl = React.memo(function AxisControl({ send }) {
  const [stepSize, setStepSize] = useState(1)
  const [feedrate, setFeedrate] = useState(1000)

  // Ensure relative positioning mode
  const ensureRelative = async () => {
    await send('G91') // Set relative positioning
  }

  // Movement commands
  const move = async (axis, direction) => {
    await ensureRelative()
    const distance = direction * stepSize
    // F parameter sets feedrate in mm/min (multiply by 60 to convert from mm/s)
    await send(`G1 ${axis}${distance} F${feedrate}`)
    // Request position update
    await send('M114')
  }

  // Home commands
  const home = async (axes) => {
    await send('G90') // Set absolute positioning
    await send(`G28 ${axes}`) // Home specified axes
    await send('M114') // Request position
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Movement Control</h3>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">
            Speed:
            <input
              type="number"
              value={feedrate}
              onChange={(e) => setFeedrate(Math.max(1, parseInt(e.target.value) || 0))}
              className="ml-2 w-20 border border-gray-300 rounded px-2 py-1"
            />
            mm/min
          </label>
          <button
            onClick={() => home('X Y Z')}
            className="px-3 py-1.5 bg-blue-600 text-white rounded flex items-center gap-2"
          >
            <Home size={16} />
            Home All
          </button>
        </div>
      </div>

      <div className="flex items-start gap-8">
        {/* XY Control */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 w-fit">
            <button
              onClick={() => move('X Y', 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowUp className="rotate-45" size={24} />
            </button>
            <button
              onClick={() => move('Y', 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowUp size={24} />
            </button>
            <button
              onClick={() => move('X Y', -1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowUp className="-rotate-45" size={24} />
            </button>
            
            <button
              onClick={() => move('X', -1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => home('X Y')}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <Home size={24} />
            </button>
            <button
              onClick={() => move('X', 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowRight size={24} />
            </button>

            <button
              onClick={() => move('X Y', -1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowDown className="rotate-45" size={24} />
            </button>
            <button
              onClick={() => move('Y', -1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowDown size={24} />
            </button>
            <button
              onClick={() => move('X Y', 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowDown className="-rotate-45" size={24} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Step Size:</span>
            <div className="flex gap-1">
              {STEP_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setStepSize(size)}
                  className={`px-2 py-1 text-sm rounded ${
                    stepSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}mm
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Z Control */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => move('Z', 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowUp size={24} />
            </button>
            <button
              onClick={() => home('Z')}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <Home size={24} />
            </button>
            <button
              onClick={() => move('Z', -1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>

        {/* E Control */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => move('E', 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <RotateCcw size={24} />
            </button>
            <button
              onClick={() => move('E', -1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <RotateCcw size={24} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default AxisControl
