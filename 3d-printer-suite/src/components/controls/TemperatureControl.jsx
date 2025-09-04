import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import useSerialStore from '../../stores/serialStore'

const MATERIAL_PRESETS = {
  PLA: { hotend: 205, bed: 60 },
  PETG: { hotend: 235, bed: 80 },
  ABS: { hotend: 245, bed: 100 }
}

// Custom hook to only subscribe to temperatures when connected
function useTemperatureData() {
  const isConnected = useSerialStore(state => state.status === 'connected')
  const [temperatureValues, setTemperatureValues] = useState({
    hotendCurrent: 0,
    hotendTarget: 0,
    bedCurrent: 0,
    bedTarget: 0
  })
  
  useEffect(() => {
    if (!isConnected) {
      setTemperatureValues({
        hotendCurrent: 0,
        hotendTarget: 0,
        bedCurrent: 0,
        bedTarget: 0
      })
      return
    }
    
    // Only subscribe when connected
    const unsubscribe = useSerialStore.subscribe(
      (state) => state.temperatures,
      (temperatures) => {
        if (temperatures) {
          setTemperatureValues({
            hotendCurrent: temperatures.hotend?.current || 0,
            hotendTarget: temperatures.hotend?.target || 0,
            bedCurrent: temperatures.bed?.current || 0,
            bedTarget: temperatures.bed?.target || 0
          })
        }
      }
    )
    
    return unsubscribe
  }, [isConnected])
  
  return temperatureValues
}

const TemperatureControl = React.memo(function TemperatureControl({ send }) {
  // Use custom hook that only subscribes when connected
  const { hotendCurrent, hotendTarget, bedCurrent, bedTarget } = useTemperatureData()
  
  // Get connection status for UI logic
  const isConnected = useSerialStore(state => state.status === 'connected')
  
  const [targets, setTargets] = useState({ hotend: '', bed: '' })
  const canvasRef = useRef(null)
  const [history, setHistory] = useState([])

  // Update history only when connected and temperature values change
  useEffect(() => {
    // Only update history when connected
    if (!isConnected) {
      // Clear history when disconnected
      setHistory([])
      return
    }
    
    setHistory(prev => {
      const newPoint = {
        hotend: hotendCurrent,
        bed: bedCurrent,
        targetHotend: hotendTarget,
        targetBed: bedTarget,
        timestamp: Date.now()
      }
      // Keep last 60 points (2 minutes at 2s intervals)
      const newHistory = [...prev, newPoint]
      if (newHistory.length > 60) {
        return newHistory.slice(-60)
      }
      return newHistory
    })
  }, [isConnected, hotendCurrent, hotendTarget, bedCurrent, bedTarget])

  useEffect(() => {
    console.log('TemperatureControl: Rendering chart with history length:', history.length)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    if (history.length === 0) {
      console.log('TemperatureControl: No history data to render')
      return
    }

    const valuesH = history.map(p => p.hotend || 0)
    const valuesB = history.map(p => p.bed || 0)
    const targetH = history.map(p => p.targetHotend || 0)
    const targetB = history.map(p => p.targetBed || 0)
    const all = [...valuesH, ...valuesB, ...targetH, ...targetB]
    const min = Math.min(0, ...all)
    const max = Math.max(Math.ceil((Math.max(...all) + 10) / 10) * 10, 100)

    // Chart margins
    const margin = {
      left: 40,  // Space for y-axis labels
      right: 10,
      top: 10,
      bottom: 20
    }

    const chartWidth = w - margin.left - margin.right
    const chartHeight = h - margin.top - margin.bottom

    // Convert data coordinates to pixel coordinates
    const toX = (i) => margin.left + (i / Math.max(1, history.length - 1)) * chartWidth
    const toY = (v) => margin.top + chartHeight - ((v - min) / Math.max(1, (max - min))) * chartHeight

    // Draw y-axis and grid lines
    ctx.strokeStyle = '#e5e7eb' // gray-200
    ctx.lineWidth = 1
    ctx.setLineDash([])
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.font = '10px sans-serif'

    // Calculate step size for y-axis (aim for about 5-7 lines)
    const yStep = Math.ceil((max - min) / 5 / 10) * 10
    for (let v = Math.ceil(min / yStep) * yStep; v <= max; v += yStep) {
      const y = toY(v)
      // Grid line
      ctx.beginPath()
      ctx.moveTo(margin.left, y)
      ctx.lineTo(w - margin.right, y)
      ctx.stroke()
      // Label
      ctx.fillStyle = '#6b7280' // gray-500
      ctx.fillText(v.toString() + '°C', margin.left - 5, y)
    }

    const drawLine = (vals, color, dashed = false) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.setLineDash(dashed ? [5, 5] : [])
      
      // Draw line
      ctx.beginPath()
      vals.forEach((v, i) => {
        const x = toX(i)
        const y = toY(v)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()

      // Draw points
      if (!dashed) {
        ctx.fillStyle = color
        vals.forEach((v, i) => {
          const x = toX(i)
          const y = toY(v)
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    }

    // Draw target temperatures (dashed lines)
    drawLine(targetH, '#ef4444', true) // red dashed
    drawLine(targetB, '#3b82f6', true) // blue dashed

    // Draw actual temperatures (solid lines with points)
    drawLine(valuesH, '#ef4444') // red
    drawLine(valuesB, '#3b82f6') // blue
  }, [history])

  const setHotend = () => {
    if (!isConnected) return
    const t = parseInt(targets.hotend, 10)
    if (!isNaN(t)) send(`M104 S${t}`)
  }

  const setBed = () => {
    if (!isConnected) return
    const t = parseInt(targets.bed, 10)
    if (!isNaN(t)) send(`M140 S${t}`)
  }

  const preheat = (mat) => {
    if (!isConnected) return
    const p = MATERIAL_PRESETS[mat]
    if (!p) return
    if (p.hotend) send(`M104 S${p.hotend}`)
    if (p.bed) send(`M140 S${p.bed}`)
  }

  const coolDown = () => {
    if (!isConnected) return
    send('M104 S0')
    send('M140 S0')
    send('M106 S0')
  }

  const hotend = hotendCurrent
  const bed = bedCurrent
  const targetHotend = hotendTarget
  const targetBed = bedTarget

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Temperature</h3>
        <button 
          onClick={() => isConnected && send('M105')}
          disabled={!isConnected}
          className={`px-2 py-1 text-xs rounded ${
            isConnected 
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Refresh
        </button>
        <div className="flex items-center space-x-2">
          {Object.keys(MATERIAL_PRESETS).map(k => (
            <button 
              key={k} 
              disabled={!isConnected}
              className={`px-2 py-1 text-xs rounded ${
                isConnected 
                  ? 'bg-gray-100 hover:bg-gray-200' 
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`} 
              onClick={() => preheat(k)}
            >
              {k}
            </button>
          ))}
          <button 
            disabled={!isConnected}
            className={`px-2 py-1 text-xs rounded ${
              isConnected 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`} 
            onClick={coolDown}
          >
            Cool Down
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Hotend: <span className="font-medium text-gray-900">{hotend}°C</span>
            {targetHotend > 0 && <span className="text-gray-500"> → {targetHotend}°C</span>}
          </div>
          <div className="flex items-center space-x-2">
            <input 
              placeholder="Target °C" 
              disabled={!isConnected}
              className={`w-32 border rounded px-2 py-1 ${
                isConnected 
                  ? 'border-gray-300' 
                  : 'border-gray-200 bg-gray-50 text-gray-400'
              }`} 
              value={targets.hotend} 
              onChange={(e)=>setTargets({...targets,hotend:e.target.value})} 
            />
            <button 
              disabled={!isConnected}
              className={`px-3 py-2 rounded ${
                isConnected 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`} 
              onClick={setHotend}
            >
              Set
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Bed: <span className="font-medium text-gray-900">{bed}°C</span>
            {targetBed > 0 && <span className="text-gray-500"> → {targetBed}°C</span>}
          </div>
          <div className="flex items-center space-x-2">
            <input 
              placeholder="Target °C" 
              disabled={!isConnected}
              className={`w-32 border rounded px-2 py-1 ${
                isConnected 
                  ? 'border-gray-300' 
                  : 'border-gray-200 bg-gray-50 text-gray-400'
              }`} 
              value={targets.bed} 
              onChange={(e)=>setTargets({...targets,bed:e.target.value})} 
            />
            <button 
              disabled={!isConnected}
              className={`px-3 py-2 rounded ${
                isConnected 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`} 
              onClick={setBed}
            >
              Set
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-2">
        <canvas ref={canvasRef} width={600} height={160} className="w-full h-40" />
        <div className="text-xs text-gray-500 flex justify-between">
          <span>Hotend (red, dashed = target)</span>
          <span>Bed (blue, dashed = target)</span>
        </div>
      </div>
    </div>
  )
})

export default TemperatureControl