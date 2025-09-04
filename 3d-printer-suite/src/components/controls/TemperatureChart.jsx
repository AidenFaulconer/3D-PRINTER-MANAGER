import React, { useEffect, useRef } from 'react'

const TemperatureChart = React.memo(function TemperatureChart({ series, width = 600, height = 120 }) {
  const canvasRef = useRef(null)
  
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
  }, [series, width, height])

  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-2">
      <canvas ref={canvasRef} width={width} height={height} className="w-full h-28" />
      <div className="text-xs text-gray-500 flex justify-between">
        <span>Hotend (red)</span>
        <span>Bed (blue)</span>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  if (prevProps.series.length !== nextProps.series.length) return false
  if (prevProps.width !== nextProps.width) return false
  if (prevProps.height !== nextProps.height) return false
  
  // Only re-render if the last few temperature points have changed
  const lastIndex = prevProps.series.length - 1
  return (
    prevProps.series[lastIndex]?.hotend === nextProps.series[lastIndex]?.hotend &&
    prevProps.series[lastIndex]?.bed === nextProps.series[lastIndex]?.bed &&
    prevProps.series[lastIndex]?.targetHotend === nextProps.series[lastIndex]?.targetHotend &&
    prevProps.series[lastIndex]?.targetBed === nextProps.series[lastIndex]?.targetBed
  )
})

export default TemperatureChart
