import React, { useEffect, useRef, useState } from 'react'
import { useSerial } from '../../context/SerialConnectionContext'
import usePrintersStore from '../../stores/printersStore'

const MATERIAL_PRESETS = {
  PLA: { hotend: 205, bed: 60 },
  PETG: { hotend: 235, bed: 80 },
  ABS: { hotend: 245, bed: 100 }
}

const TemperatureControl = React.memo(function TemperatureControl({ send }) {
  const { temperatures, temperatureHistory } = usePrintersStore(state => ({
    temperatures: state.temperatures || { hotend: { current: 0, target: 0 }, bed: { current: 0, target: 0 } },
    temperatureHistory: state.temperatureHistory || []
  }))
  const [targets, setTargets] = useState({ hotend: '', bed: '' })
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    if (temperatureHistory.length === 0) return

    const valuesH = temperatureHistory.map(p => p.hotend || 0)
    const valuesB = temperatureHistory.map(p => p.bed || 0)
    const targetH = temperatureHistory.map(p => p.targetHotend || 0)
    const targetB = temperatureHistory.map(p => p.targetBed || 0)
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
    const toX = (i) => margin.left + (i / Math.max(1, temperatureHistory.length - 1)) * chartWidth
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
  }, [temperatureHistory])

  const setHotend = () => {
    const t = parseInt(targets.hotend, 10)
    if (!isNaN(t)) send(`M104 S${t}`)
  }

  const setBed = () => {
    const t = parseInt(targets.bed, 10)
    if (!isNaN(t)) send(`M140 S${t}`)
  }

  const preheat = (mat) => {
    const p = MATERIAL_PRESETS[mat]
    if (!p) return
    if (p.hotend) send(`M104 S${p.hotend}`)
    if (p.bed) send(`M140 S${p.bed}`)
  }

  const coolDown = () => {
    send('M104 S0')
    send('M140 S0')
    send('M106 S0')
  }

  const hotend = temperatures?.hotend.current ?? 0
  const bed = temperatures?.bed.current ?? 0
  const targetHotend = temperatures?.hotend.target ?? 0
  const targetBed = temperatures?.bed.target ?? 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Temperature</h3>
        <div className="flex items-center space-x-2">
          {Object.keys(MATERIAL_PRESETS).map(k => (
            <button key={k} className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => preheat(k)}>{k}</button>
          ))}
          <button className="px-2 py-1 text-xs bg-red-600 text-white rounded" onClick={coolDown}>Cool Down</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Hotend: <span className="font-medium text-gray-900">{hotend}°C</span>
            {targetHotend > 0 && <span className="text-gray-500"> → {targetHotend}°C</span>}
          </div>
          <div className="flex items-center space-x-2">
            <input placeholder="Target °C" className="w-32 border border-gray-300 rounded px-2 py-1" value={targets.hotend} onChange={(e)=>setTargets({...targets,hotend:e.target.value})} />
            <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={setHotend}>Set</button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Bed: <span className="font-medium text-gray-900">{bed}°C</span>
            {targetBed > 0 && <span className="text-gray-500"> → {targetBed}°C</span>}
          </div>
          <div className="flex items-center space-x-2">
            <input placeholder="Target °C" className="w-32 border border-gray-300 rounded px-2 py-1" value={targets.bed} onChange={(e)=>setTargets({...targets,bed:e.target.value})} />
            <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={setBed}>Set</button>
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
