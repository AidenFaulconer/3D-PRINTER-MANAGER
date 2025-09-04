import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Line, Grid, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Visualization types
const VIZ_TYPES = {
  BED_LEVEL: 'bed_level',
  FIRST_LAYER: 'first_layer',
  STRINGING: 'stringing',
  TEMP_TOWER: 'temp_tower',
  SPEED_TEST: 'speed_test'
}

// Measurement tools
const MeasurementTools = ({ type, onMeasure }) => {
  const [measuring, setMeasuring] = useState(false)
  const [startPoint, setStartPoint] = useState(null)
  const [endPoint, setEndPoint] = useState(null)

  const handleClick = (e) => {
    if (!measuring) return

    const point = {
      x: e.clientX,
      y: e.clientY
    }

    if (!startPoint) {
      setStartPoint(point)
    } else {
      setEndPoint(point)
      const distance = Math.sqrt(
        Math.pow(point.x - startPoint.x, 2) +
        Math.pow(point.y - startPoint.y, 2)
      )
      onMeasure(distance)
      setMeasuring(false)
      setStartPoint(null)
      setEndPoint(null)
    }
  }

  return (
    <div className="absolute top-4 right-4 space-y-2">
      <button
        onClick={() => setMeasuring(!measuring)}
        className={`px-3 py-1 rounded ${
          measuring
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {measuring ? 'Cancel Measure' : 'Measure'}
      </button>

      {measuring && (
        <div className="text-sm text-gray-500">
          Click two points to measure distance
        </div>
      )}
    </div>
  )
}

// Bed Level Visualization
const BedLevelViz = ({ data }) => {
  const { size } = useThree()
  const points = []
  const colors = []

  // Generate mesh points and colors
  data.forEach((point) => {
    points.push(point.x, point.y, point.z)
    
    // Color based on deviation
    const deviation = Math.abs(point.z)
    if (deviation > 0.1) {
      colors.push(1, 0, 0) // Red for high deviation
    } else if (deviation > 0.05) {
      colors.push(1, 1, 0) // Yellow for medium deviation
    } else {
      colors.push(0, 1, 0) // Green for acceptable
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={new Float32Array(points)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={5}
        vertexColors
        sizeAttenuation={false}
      />
    </points>
  )
}

// First Layer Analysis
const FirstLayerViz = ({ data }) => {
  const { size } = useThree()
  const lines = []
  const colors = []

  // Generate extrusion lines and colors
  data.forEach((line) => {
    lines.push(
      line.start.x, line.start.y, line.start.z,
      line.end.x, line.end.y, line.end.z
    )

    // Color based on width consistency
    const widthDeviation = Math.abs(line.width - line.targetWidth)
    if (widthDeviation > 0.05) {
      colors.push(1, 0, 0, 1, 0, 0) // Red for inconsistent width
    } else {
      colors.push(0, 1, 0, 0, 1, 0) // Green for good width
    }
  })

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={lines.length / 3}
          array={new Float32Array(lines)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        linewidth={2}
      />
    </line>
  )
}

// Stringing Test Analysis
const StringingViz = ({ data }) => {
  const { size } = useThree()
  const strings = []
  const colors = []

  // Generate string lines and colors
  data.strings.forEach((string) => {
    strings.push(
      string.start.x, string.start.y, string.start.z,
      string.end.x, string.end.y, string.end.z
    )

    // Color based on thickness
    const thicknessRatio = string.thickness / data.targetThickness
    if (thicknessRatio > 1.2) {
      colors.push(1, 0, 0, 1, 0, 0) // Red for thick strings
    } else if (thicknessRatio < 0.8) {
      colors.push(0, 1, 1, 0, 1, 1) // Cyan for thin strings
    } else {
      colors.push(1, 1, 0, 1, 1, 0) // Yellow for medium strings
    }
  })

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={strings.length / 3}
          array={new Float32Array(strings)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        linewidth={1}
      />
    </line>
  )
}

// Temperature Tower Analysis
const TempTowerViz = ({ data }) => {
  const sections = []
  const colors = []

  // Generate tower sections and colors
  data.sections.forEach((section, index) => {
    const y = index * section.height
    const points = [
      // Front face
      -10, y, 10,
      10, y, 10,
      10, y + section.height, 10,
      -10, y + section.height, 10
    ]
    sections.push(...points)

    // Color based on quality score
    const r = Math.max(0, 1 - section.qualityScore)
    const g = Math.min(1, section.qualityScore)
    const color = [r, g, 0]
    colors.push(...color, ...color, ...color, ...color)
  })

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={sections.length / 3}
          array={new Float32Array(sections)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <meshBasicMaterial
        vertexColors
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

const CalibrationVisualizer = ({ type, data, onMeasure }) => {
  const [highlightedArea, setHighlightedArea] = useState(null)
  const [showMeasurements, setShowMeasurements] = useState(false)

  const renderVisualization = () => {
    switch (type) {
      case VIZ_TYPES.BED_LEVEL:
        return <BedLevelViz data={data} />
      case VIZ_TYPES.FIRST_LAYER:
        return <FirstLayerViz data={data} />
      case VIZ_TYPES.STRINGING:
        return <StringingViz data={data} />
      case VIZ_TYPES.TEMP_TOWER:
        return <TempTowerViz data={data} />
      default:
        return null
    }
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow">
        {/* 3D Viewer */}
        <div className="h-96">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 50, 100]} />
            <OrbitControls enableDamping dampingFactor={0.05} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={0.8} />
            <Grid
              args={[200, 200]}
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            {renderVisualization()}
          </Canvas>
        </div>

        {/* Controls */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <button
                onClick={() => setShowMeasurements(!showMeasurements)}
                className={`px-3 py-1 rounded ${
                  showMeasurements
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Measurements
              </button>
            </div>

            {/* Type-specific controls */}
            {type === VIZ_TYPES.BED_LEVEL && (
              <div className="space-x-2">
                <button
                  onClick={() => setHighlightedArea('corners')}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Show Corners
                </button>
                <button
                  onClick={() => setHighlightedArea('center')}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Show Center
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Measurement Tools */}
      {showMeasurements && (
        <MeasurementTools type={type} onMeasure={onMeasure} />
      )}

      {/* Analysis Results */}
      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">Analysis</h3>
        {type === VIZ_TYPES.BED_LEVEL && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Max Deviation:</span>
              <span className="ml-2 font-medium">
                {data.maxDeviation.toFixed(2)}mm
              </span>
            </div>
            <div>
              <span className="text-gray-500">Average Deviation:</span>
              <span className="ml-2 font-medium">
                {data.avgDeviation.toFixed(2)}mm
              </span>
            </div>
          </div>
        )}

        {type === VIZ_TYPES.FIRST_LAYER && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Width Consistency:</span>
              <span className="ml-2 font-medium">
                {(data.widthConsistency * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-gray-500">Adhesion Score:</span>
              <span className="ml-2 font-medium">
                {(data.adhesionScore * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {type === VIZ_TYPES.STRINGING && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">String Count:</span>
              <span className="ml-2 font-medium">
                {data.stringCount}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Average Thickness:</span>
              <span className="ml-2 font-medium">
                {data.avgThickness.toFixed(2)}mm
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalibrationVisualizer
