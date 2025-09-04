import React, { useEffect, useRef, useState } from 'react'
import GcodePreviewGenerator from '../utils/GcodePreviewGenerator'

const GcodePreview = ({ content, width = 400, height = 400 }) => {
  const canvasRef = useRef(null)
  const [previewData, setPreviewData] = useState(null)
  const [selectedLayer, setSelectedLayer] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const generatePreview = async () => {
      setIsGenerating(true)
      try {
        const generator = new GcodePreviewGenerator(content)
        const data = await generator.generatePreview()
        setPreviewData(data)
        setSelectedLayer(data.layers.length - 1) // Show last layer by default
      } catch (error) {
        console.error('Error generating preview:', error)
      } finally {
        setIsGenerating(false)
      }
    }

    if (content) {
      generatePreview()
    }
  }, [content])

  useEffect(() => {
    if (!previewData || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { bounds } = previewData

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate scale to fit the model in the canvas
    const margin = 20
    const scaleX = (width - margin * 2) / bounds.size.x
    const scaleY = (height - margin * 2) / bounds.size.y
    const scale = Math.min(scaleX, scaleY)

    // Transform coordinates to canvas space
    const transformPoint = (point) => ({
      x: (point.x - bounds.min.x) * scale + margin,
      y: height - ((point.y - bounds.min.y) * scale + margin) // Flip Y axis
    })

    // Draw build plate outline
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 1
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2)

    // Draw layers up to selected layer
    for (let i = 0; i <= selectedLayer; i++) {
      const layer = previewData.layers[i]
      if (!layer) continue

      // Calculate layer opacity based on height
      const opacity = i === selectedLayer ? 1 : 0.3
      
      let lastPoint = null
      layer.points.forEach(point => {
        if (lastPoint) {
          const start = transformPoint(lastPoint)
          const end = transformPoint(point)

          ctx.beginPath()
          ctx.moveTo(start.x, start.y)
          ctx.lineTo(end.x, end.y)
          
          // Style based on whether it's an extrusion move
          if (point.extrusion) {
            ctx.strokeStyle = `rgba(0, 128, 255, ${opacity})`
            ctx.lineWidth = 2
          } else {
            ctx.strokeStyle = `rgba(128, 128, 128, ${opacity})`
            ctx.lineWidth = 1
          }
          
          ctx.stroke()
        }
        lastPoint = point
      })
    }
  }, [previewData, selectedLayer, width, height])

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Generating preview...</span>
        </div>
      </div>
    )
  }

  if (!previewData) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-lg shadow">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border border-gray-200 rounded-lg"
        />
        
        {/* Layer slider */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-2 rounded-lg shadow">
          <input
            type="range"
            min={0}
            max={previewData.layers.length - 1}
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Layer 1</span>
            <span>Layer {selectedLayer + 1} of {previewData.layers.length}</span>
          </div>
        </div>
      </div>

      {/* Preview stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Total Layers:</span>
          <span className="ml-2 font-medium">{previewData.stats.totalLayers}</span>
        </div>
        <div>
          <span className="text-gray-500">Points Sampled:</span>
          <span className="ml-2 font-medium">{previewData.stats.totalPoints}</span>
        </div>
      </div>
    </div>
  )
}

export default GcodePreview
