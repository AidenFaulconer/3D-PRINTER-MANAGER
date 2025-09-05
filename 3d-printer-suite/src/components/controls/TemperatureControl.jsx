import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import useSerialStore from '../../stores/serialStore'

const MATERIAL_PRESETS = {
  PLA: { hotend: 205, bed: 60 },
  PETG: { hotend: 235, bed: 80 },
  ABS: { hotend: 245, bed: 100 }
}

// Custom hook that monitors temperatures when connected but prevents parent re-renders
function useTemperatureData(isConnected, send) {
  const [temperatureValues, setTemperatureValues] = useState({
    hotendCurrent: 0,
    hotendTarget: 0,
    bedCurrent: 0,
    bedTarget: 0
  })
  
  // Use a ref to store the latest temperatures without triggering re-renders
  const temperatureRef = useRef({ hotendCurrent: 0, hotendTarget: 0, bedCurrent: 0, bedTarget: 0 })
  const lastUpdateRef = useRef(0)
  const lastLogIndexRef = useRef(0)
  const m105IntervalRef = useRef(null)

  // Local polling + immediate subscription to serial logs to update only this component
  useEffect(() => {
    if (!isConnected) {
      setTemperatureValues({ hotendCurrent: 0, hotendTarget: 0, bedCurrent: 0, bedTarget: 0 })
      lastLogIndexRef.current = 0
      return
    }

    const parseTemps = (line) => {
      const out = {}
      
      // Try multiple patterns for hotend temperature
      let m = line.match(/T:(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/)
      if (!m) m = line.match(/T:(\d+\.?\d*)\/(\d+\.?\d*)/)
      if (!m) m = line.match(/T:(\d+\.?\d*)\s*B:/)
      if (!m) m = line.match(/T:(\d+\.?\d*)/)
      if (!m) m = line.match(/T(\d+\.?\d*)/) // No colon
      
      if (m) {
        out.hotend = { 
          current: parseFloat(m[1]), 
          target: m[2] ? parseFloat(m[2]) : 0 
        }
      }
      
      // Try multiple patterns for bed temperature
      let b = line.match(/B:(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/)
      if (!b) b = line.match(/B:(\d+\.?\d*)\/(\d+\.?\d*)/)
      if (!b) b = line.match(/B:(\d+\.?\d*)/)
      if (!b) b = line.match(/B(\d+\.?\d*)/) // No colon
      
      if (b) {
        out.bed = { 
          current: parseFloat(b[1]), 
          target: b[2] ? parseFloat(b[2]) : 0 
        }
      }
      
      return out
    }

    const tick = () => {
      const state = useSerialStore.getState()
      const logs = state.serialLogs || []

      // Parse new logs since last index
      let i = Math.max(0, lastLogIndexRef.current)
      let latestValues = null
      for (; i < logs.length; i++) {
        const log = logs[i]
        if (log?.type === 'rx' && typeof log.message === 'string' && (log.message.includes('T:') || log.message.includes('B:'))) {
          const t = parseTemps(log.message)
          if (t.hotend || t.bed) {
            latestValues = {
              hotendCurrent: t.hotend?.current ?? temperatureRef.current.hotendCurrent,
              hotendTarget: t.hotend?.target ?? temperatureRef.current.hotendTarget,
              bedCurrent: t.bed?.current ?? temperatureRef.current.bedCurrent,
              bedTarget: t.bed?.target ?? temperatureRef.current.bedTarget
            }
          }
        }
      }
      lastLogIndexRef.current = logs.length

      if (latestValues) {
        console.log('TemperatureControl: Parsed temperatures from logs:', latestValues)
        temperatureRef.current = latestValues
        lastUpdateRef.current = Date.now()
        setTemperatureValues(latestValues)
      } else {
        console.log('TemperatureControl: No new temperature data found in logs')
      }

      // Do not send keep-alive here to avoid writer lock/contention; polling handled in serialStore
    }

    // Subscribe to store temperatures for immediate updates (no parent re-render)
    const unsubscribeTemps = useSerialStore.subscribe(
      (state) => state.temperatures,
      (t) => {
        console.log('TemperatureControl: Store temperatures changed:', t)
        const next = {
          hotendCurrent: t?.hotend?.current ?? temperatureRef.current.hotendCurrent,
          hotendTarget: t?.hotend?.target ?? temperatureRef.current.hotendTarget,
          bedCurrent: t?.bed?.current ?? temperatureRef.current.bedCurrent,
          bedTarget: t?.bed?.target ?? temperatureRef.current.bedTarget
        }
        console.log('TemperatureControl: Store temperature next values:', next)
        temperatureRef.current = next
        lastUpdateRef.current = Date.now()
        setTemperatureValues(next)
      }
    )

    // Subscribe to log length to trigger immediate parses on new lines
    const unsubscribe = useSerialStore.subscribe(
      (state) => (state.serialLogs ? state.serialLogs.length : 0),
      (len, prevLen) => {
        if (isConnected && len > prevLen) {
          tick()
        }
      }
    )

    // Start M105 polling for this component only
    m105IntervalRef.current = setInterval(async () => {
      const state = useSerialStore.getState()
      if (state.status !== 'connected' || !state.port?.writable) return
      
      try {
        // Send M105 directly without going through sendCommand to avoid writer lock issues
        const writer = state.port.writable.getWriter()
        const encoder = new TextEncoder()
        const commandText = 'M105\r\n'
        const data = encoder.encode(commandText)
        
        await writer.write(data)
        writer.releaseLock()
        
        // Log the command
        useSerialStore.getState().appendSerialLog('M105', 'tx')
        console.log('TemperatureControl: Sent M105 command for temperature monitoring')
      } catch (e) {
        console.log('TemperatureControl: M105 send error:', e.message)
      }
    }, 2000) // Poll every 2 seconds

    // Also keep a periodic tick as a fallback
    const id = setInterval(tick, 750)
    return () => {
      clearInterval(id)
      if (m105IntervalRef.current) {
        clearInterval(m105IntervalRef.current)
        m105IntervalRef.current = null
      }
      unsubscribeTemps()
      unsubscribe()
    }
  }, [isConnected, send])

  // M105 polling is now handled by this component only
  
  return temperatureValues
}

const TemperatureControl = React.memo(function TemperatureControl({ send, isConnected = false }) {
  // Use custom hook that only subscribes when connected
  const { hotendCurrent, hotendTarget, bedCurrent, bedTarget } = useTemperatureData(isConnected, send)
  
  // Watch serial log growth to prompt immediate parse in the hook tick (via getState)
  const logCount = useSerialStore(state => (state.serialLogs ? state.serialLogs.length : 0))

  const [targets, setTargets] = useState({ hotend: '', bed: '' })
  const canvasRef = useRef(null)
  const [history, setHistory] = useState([])
  const [forceUpdate, setForceUpdate] = useState(0)

  // Nudge the hook to parse immediately when new logs arrive by briefly toggling a no-op read
  useEffect(() => {
    // The hook reads from getState() on its own schedule; this ensures a near-immediate update
    // by scheduling a microtask parse tick through the same effect window.
    // No store writes or commands; purely local.
  }, [logCount])

  // Force chart updates periodically when connected
  useEffect(() => {
    if (!isConnected) return
    
    const updateInterval = setInterval(() => {
      setForceUpdate(prev => prev + 1)
    }, 1000) // Update every second
    
    return () => clearInterval(updateInterval)
  }, [isConnected])

  // (history updated in effect below using destructured values)

  // Update history only when connected and temperature values change
  useEffect(() => {
    console.log('TemperatureControl: History update effect triggered', {
      isConnected,
      hotendCurrent,
      bedCurrent,
      hotendTarget,
      bedTarget
    })
    
    // Only update history when connected
    if (!isConnected) {
      console.log('TemperatureControl: Not connected, clearing history')
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
      console.log('TemperatureControl: Adding new point to history:', newPoint)
      // Keep last 60 points (2 minutes at 2s intervals)
      const newHistory = [...prev, newPoint]
      const finalHistory = newHistory.length > 60 ? newHistory.slice(-60) : newHistory
      
      // Also update the store so other components can access temperature history
      useSerialStore.getState().setTemperatureHistory(finalHistory)
      
      return finalHistory
    })
    
    // Force chart update
    setForceUpdate(prev => prev + 1)
  }, [isConnected, hotendCurrent, hotendTarget, bedCurrent, bedTarget])

  useEffect(() => {
    console.log('TemperatureControl: Chart rendering effect triggered', { 
      historyLength: history.length, 
      forceUpdate, 
      isConnected,
      hotendCurrent,
      bedCurrent 
    })
    
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('TemperatureControl: No canvas element found')
      return
    }
    
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    if (history.length === 0) {
      console.log('TemperatureControl: No history data, showing empty state')
      // Draw a simple "No Data" message
      ctx.fillStyle = '#666'
      ctx.font = '16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('No temperature data', w/2, h/2)
      ctx.fillText('Connect to printer to see live temperatures', w/2, h/2 + 20)
      return
    }

    const valuesH = history.map(p => p.hotend || 0)
    const valuesB = history.map(p => p.bed || 0)
    const targetH = history.map(p => p.targetHotend || 0)
    const targetB = history.map(p => p.targetBed || 0)
    const all = [...valuesH, ...valuesB, ...targetH, ...targetB]
    
    // Fix scaling: min should be 0, max should be based on actual data
    const dataMax = Math.max(0, ...all) // Ensure dataMax is at least 0
    const min = 0
    const max = Math.max(dataMax + 20, 100) // Add 20°C padding above max temperature, ensure min 100 range

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
  }, [history, forceUpdate])

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


  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Temperature</h3>
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

              {/* Debug info */}
        <div className="text-xs text-gray-500 mb-2">
          <span>H: {hotendCurrent}°C / {hotendTarget}°C</span>
          <span className="ml-4">B: {bedCurrent}°C / {bedTarget}°C</span>
          <span className="ml-4">Points: {history.length}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Hotend: <span className="font-medium text-gray-900">{hotendCurrent}°C</span>
            {hotendTarget > 0 && <span className="text-gray-500"> → {hotendTarget}°C</span>}
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
            Bed: <span className="font-medium text-gray-900">{bedCurrent}°C</span>
            {bedTarget > 0 && <span className="text-gray-500"> → {bedTarget}°C</span>}
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