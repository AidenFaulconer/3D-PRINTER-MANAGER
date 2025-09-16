import React, { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import usePrintersStore from '../../stores/printersStore'
import useSerialStore from '../../stores/serialStore'

const STEP_PRESETS = [-0.05, -0.02, -0.01, 0.01, 0.02, 0.05]

const BabyStepControl = React.memo(function BabyStepControl({ send, isConnected = false }) {
  const [accumulated, setAccumulated] = useState(0)
  const [custom, setCustom] = useState('0.02')
  
  // Get printer settings and current position
  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const activePrinter = usePrintersStore(state => state.printers.find(p => p.id === activePrinterId))
  const currentPosition = useSerialStore(state => state.position)
  
  // Calculate current Z offset
  const zProbeOffset = activePrinter?.printerSettings?.zProbeOffset?.z || 0
  const currentZ = currentPosition?.z || 0
  const totalZOffset = zProbeOffset + accumulated

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

  // Visual representation of nozzle position
  const NozzleVisual = () => {
    const bedHeight = 0.3 // Visual bed thickness
    const nozzleHeight = 0.1 // Visual nozzle height
    const maxOffset = 2.0 // Maximum offset for scaling
    const visualScale = 0.8 // Scale factor for visual
    
    // Calculate visual positions
    const bedY = 0
    const nozzleY = Math.max(-maxOffset, Math.min(maxOffset, totalZOffset)) * visualScale
    const isTooClose = totalZOffset < -0.1
    const isTooFar = totalZOffset > 0.5
    
    return (
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="text-xs font-medium text-gray-700 mb-2">Nozzle Position</div>
        <div className="relative h-16 bg-gray-200 rounded border">
          {/* Bed representation */}
          <div 
            className="absolute w-full bg-blue-200 border-t-2 border-blue-400"
            style={{ 
              height: `${bedHeight * 20}px`, 
              bottom: '0px' 
            }}
          />
          
          {/* Nozzle representation */}
          <div 
            className={`absolute w-2 h-2 rounded-full border-2 ${
              isTooClose ? 'bg-red-500 border-red-700' : 
              isTooFar ? 'bg-yellow-500 border-yellow-700' : 
              'bg-green-500 border-green-700'
            }`}
            style={{ 
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: `${Math.max(0, Math.min(100, 50 + nozzleY * 20))}px`
            }}
          />
          
          {/* Distance indicator */}
          <div className="absolute right-2 top-1 text-xs font-mono text-gray-600">
            {totalZOffset.toFixed(3)}mm
          </div>
          
          {/* Reference lines */}
          <div className="absolute left-1 top-1 text-xs text-gray-500">+0.5mm</div>
          <div className="absolute left-1 top-8 text-xs text-gray-500">0mm</div>
          <div className="absolute left-1 bottom-1 text-xs text-gray-500">-0.5mm</div>
        </div>
        
        {/* Status indicator */}
        <div className="mt-2 text-xs">
          {isTooClose && <span className="text-red-600">⚠️ Too close to bed</span>}
          {isTooFar && <span className="text-yellow-600">⚠️ Too far from bed</span>}
          {!isTooClose && !isTooFar && <span className="text-green-600">✓ Good distance</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Z Babystep</h3>
        <div className="text-xs text-gray-600">Δ {accumulated.toFixed(3)} mm</div>
      </div>
      
      {/* Nozzle position visual */}
      <NozzleVisual />

      <div className="grid grid-cols-6 gap-2">
        {STEP_PRESETS.map((s) => (
          <button
            key={s}
            disabled={!isConnected}
            onClick={() => doStep(s)}
            className={`px-2 py-1 rounded text-sm flex items-center justify-center space-x-1 ${
              isConnected ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
            title={`M290 Z${s}`}
          >
            {s > 0 ? (
              <>
                <ArrowUp className="w-3 h-3" />
                <span>+{s}</span>
              </>
            ) : (
              <>
                <ArrowDown className="w-3 h-3" />
                <span>{s}</span>
              </>
            )}
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
          className={`px-3 py-2 rounded text-sm flex items-center space-x-1 ${
            isConnected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          {Number(custom) > 0 ? (
            <>
              <ArrowUp className="w-3 h-3" />
              <span>Apply</span>
            </>
          ) : Number(custom) < 0 ? (
            <>
              <ArrowDown className="w-3 h-3" />
              <span>Apply</span>
            </>
          ) : (
            <span>Apply</span>
          )}
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


