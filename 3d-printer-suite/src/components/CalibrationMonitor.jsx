import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSerial } from '../context/SerialConnectionContext'
import usePrintersStore from '../stores/printersStore'

const MAX_POINTS = 180

const useMonitorState = () => {
  const { status, log, sendCommand } = useSerial()
  const { temperatures, temperatureHistory } = usePrintersStore(state => ({
    temperatures: state.temperatures,
    temperatureHistory: state.temperatureHistory
  }))
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [okCount, setOkCount] = useState(0)
  const [errCount, setErrCount] = useState(0)

  // Memoize the last log entry to prevent unnecessary re-renders
  const lastLogEntry = useMemo(() => {
    return log[log.length - 1];
  }, [log.length])

  // Parse incoming lines for position and ok/error counts
  useEffect(() => {
    if (!lastLogEntry || lastLogEntry.direction !== 'rx') return
    const line = lastLogEntry.message

    if (/\bok\b/i.test(line)) setOkCount((c)=>c+1)
    if (/error[:\s]/i.test(line)) setErrCount((c)=>c+1)

    if (/\bX:\s*[-\d.]+/.test(line) && /\bY:\s*[-\d.]+/.test(line) && /\bZ:\s*[-\d.]+/.test(line)) {
      setPosition({
        x: parseFloat((line.match(/X:\s*([-\d.]+)/) || [])[1] || 0),
        y: parseFloat((line.match(/Y:\s*([-\d.]+)/) || [])[1] || 0),
        z: parseFloat((line.match(/Z:\s*([-\d.]+)/) || [])[1] || 0)
      })
    }
  }, [lastLogEntry])

  // Poll temps periodically when connected
  useEffect(() => {
    if (status !== 'connected') return
    const id = setInterval(() => sendCommand('M105'), 1500)
    return () => clearInterval(id)
  }, [status, sendCommand])

  return { 
    temps: temperatures,
    series: temperatureHistory,
    position,
    okCount,
    errCount,
    status 
  }
}

const CalibrationMonitor = React.memo(() => {
  const { temps, series, position, okCount, errCount } = useMonitorState()
  const canvasRef = useRef(null)
  
  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    if (series.length === 0) return

    const valuesH = series.map(p => p.hotend || 0)
    const valuesB = series.map(p => p.bed || 0)
    const targetH = series.map(p => p.targetHotend || 0)
    const targetB = series.map(p => p.targetBed || 0)
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
    const toX = (i) => margin.left + (i / Math.max(1, series.length - 1)) * chartWidth
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
  }, [series])

  return (
    <div className="bg-white border border-gray-200 rounded p-3 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div>
            Hotend: <span className="font-medium">{temps?.hotend?.current ?? 0}°C</span>
            {temps?.hotend?.target > 0 && <span className="text-gray-500"> → {temps.hotend.target}°C</span>}
          </div>
          <div>
            Bed: <span className="font-medium">{temps?.bed?.current ?? 0}°C</span>
            {temps?.bed?.target > 0 && <span className="text-gray-500"> → {temps.bed.target}°C</span>}
          </div>
          <div>Pos: <span className="font-mono">X{position.x.toFixed?.(2) ?? position.x} Y{position.y.toFixed?.(2) ?? position.y} Z{position.z.toFixed?.(2) ?? position.z}</span></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-700">ok: {okCount}</span>
          <span className="text-red-700">err: {errCount}</span>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded p-2">
        <canvas ref={canvasRef} width={600} height={120} className="w-full h-28" />
        <div className="text-xs text-gray-500 flex justify-between">
          <span>Hotend (red)</span>
          <span>Bed (blue)</span>
        </div>
      </div>
    </div>
  )
})

export default CalibrationMonitor;
