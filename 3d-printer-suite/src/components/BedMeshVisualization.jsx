import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { 
  Grid, 
  RotateCcw, 
  RefreshCw, 
  Settings, 
  Eye, 
  EyeOff,
  Thermometer,
  Zap
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'
import { loadGlobalParameters } from '../utils/ParameterTracker'

// 2D Canvas Visualization Component
const BedMesh2D = ({ meshData, colorScheme, showValues, showGrid, screwPitch, getNotchRecommendations }) => {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })

  const processedData = useMemo(() => {
    if (!meshData || !meshData.mesh || meshData.mesh.length === 0) {
      return null
    }

    // Check if mesh is already in 2D array format
    let matrix
    let values
    
    if (Array.isArray(meshData.mesh[0])) {
      // Already in 2D array format
      matrix = meshData.mesh
      values = matrix.flat().filter(v => typeof v === 'number')
    } else {
      // Old format with {i, j, z} objects - convert to 2D array
      const points = meshData.mesh
      const maxI = Math.max(...points.map(p => p.i))
      const maxJ = Math.max(...points.map(p => p.j))
      
      matrix = Array(maxI + 1).fill().map(() => Array(maxJ + 1).fill(null))
      points.forEach(point => {
        matrix[point.i][point.j] = point.z
      })
      
      values = points.map(p => p.z)
    }
    const minZ = Math.min(...values)
    const maxZ = Math.max(...values)
    const range = maxZ - minZ

    // Calculate grid size from matrix dimensions
    const gridSize = {
      x: matrix.length > 0 ? matrix[0].length : 0,
      y: matrix.length
    }

    return {
      matrix,
      minZ,
      maxZ,
      range,
      gridSize
    }
  }, [meshData])


  const getColor = useCallback((value, min, max, range) => {
    if (range === 0) return '#808080'
    
    const normalized = (value - min) / range
    
    switch (colorScheme) {
      case 'heatmap':
        // Red (high) to Blue (low)
        if (normalized < 0.5) {
          const t = normalized * 2
          return `rgb(${Math.round(255 * t)}, ${Math.round(255 * t)}, 255)`
        } else {
          const t = (normalized - 0.5) * 2
          return `rgb(255, ${Math.round(255 * (1 - t))}, ${Math.round(255 * (1 - t))})`
        }
      case 'grayscale':
        const gray = Math.round(255 * normalized)
        return `rgb(${gray}, ${gray}, ${gray})`
      case 'rainbow':
        const hue = (1 - normalized) * 240 // Blue to Red
        return `hsl(${hue}, 100%, 50%)`
      default:
        return '#808080'
    }
  }, [colorScheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !processedData) return

    const ctx = canvas.getContext('2d')
    const { width, height } = dimensions
    const { matrix, minZ, maxZ, range, gridSize } = processedData

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate cell dimensions
    const cellWidth = width / gridSize.x
    const cellHeight = height / gridSize.y

    // Draw grid cells
    matrix.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== null) {
          const x = j * cellWidth
          // Front of bed (i=0) appears at bottom of visualization
          const y = (gridSize.y - 1 - i) * cellHeight
          
          // Fill cell with color
          ctx.fillStyle = getColor(value, minZ, maxZ, range)
          ctx.fillRect(x, y, cellWidth, cellHeight)
          
          // Draw grid lines
          if (showGrid) {
            ctx.strokeStyle = '#333'
            ctx.lineWidth = 1
            ctx.strokeRect(x, y, cellWidth, cellHeight)
          }
          
          // Draw value text
          if (showValues) {
            ctx.fillStyle = value > (minZ + maxZ) / 2 ? '#000' : '#fff'
            ctx.font = '10px monospace'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(
              value.toFixed(3),
              x + cellWidth / 2,
              y + cellHeight / 2
            )
          }
        }
      })
    })

    // Draw border
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, width, height)

  }, [processedData, dimensions, colorScheme, showValues, showGrid, getColor])

  if (!processedData) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Grid className="w-12 h-12 mx-auto mb-2" />
          <p>No bed mesh data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">2D Heatmap</h4>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-600">
            {processedData.minZ.toFixed(2)} to {processedData.maxZ.toFixed(2)}mm
          </div>
          <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200 px-2 py-1 rounded flex items-center gap-2">
            <span className="font-medium">Bed Mesh:</span>
            <span className="font-mono">{processedData.gridSize.x}×{processedData.gridSize.y}</span>
            <span>•</span>
            <span className="font-mono">Range: {processedData.minZ.toFixed(3)} to {processedData.maxZ.toFixed(3)}mm</span>
            <span>•</span>
            <span className="font-mono">Last: N/A</span>
            <span className="ml-2">Per 1/8 turn:</span>
            <span className="text-blue-700 font-mono">↻ +{(screwPitch/8).toFixed(3)}mm</span>
            <span className="text-red-700 font-mono">↺ −{(screwPitch/8).toFixed(3)}mm</span>
          </div>
        </div>
      </div>
      {/* Knob guidance (compact) */}
      <div className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded px-2 py-1 inline-flex items-center gap-3">
        <span className="font-medium">Per 1/8 turn:</span>
        <span className="flex items-center gap-1">
          <span className="text-blue-700">↻</span>
          <span>+{(screwPitch/8).toFixed(3)}mm</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="text-red-700">↺</span>
          <span>−{(screwPitch/8).toFixed(3)}mm</span>
        </span>
      </div>
      
      
      <div className="flex justify-center">
        <div className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="border border-gray-300 rounded"
        />
          {/* Front/Back labels */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded shadow">
            Front of Bed
          </div>
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded shadow">
            Back of Bed
          </div>
          {/* Left/Right labels */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded shadow writing-mode-vertical">
            Left
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded shadow writing-mode-vertical">
            Right
          </div>
        </div>
      </div>
      
      {/* Color scale legend */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Scale:</span>
        <div className="flex-1 h-4 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded border"></div>
        <div className="text-xs text-gray-500">
          {processedData.minZ.toFixed(2)}mm
        </div>
        <div className="text-xs text-gray-500">
          {processedData.maxZ.toFixed(2)}mm
        </div>
      </div>
    </div>
  )
}

// 3D Visualization Component
const BedMesh3D = ({ meshData, showWireframe, showPoints, getNotchRecommendations, screwPitch }) => {
  const meshRef = useRef()

  // Get bed size from printer settings
  const bedSize = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.bedSize || { x: 220, y: 220, z: 250 }
  })

  const { geometry, points, zMin, zMax, bedDimensions } = useMemo(() => {
    if (!meshData || !meshData.mesh || meshData.mesh.length === 0) {
      return { geometry: null, points: [], zMin: 0, zMax: 0, bedDimensions: { x: bedSize.x / 100, y: bedSize.y / 100 } }
    }

    // Check if mesh is already in 2D array format
    let meshArray
    let maxI, maxJ
    
    if (Array.isArray(meshData.mesh[0])) {
      // Already in 2D array format
      meshArray = meshData.mesh
      maxI = meshArray.length - 1
      maxJ = meshArray[0].length - 1
    } else {
      // Old format with {i, j, z} objects - convert to 2D array
      const meshPoints = meshData.mesh
      maxI = Math.max(...meshPoints.map(p => p.i))
      maxJ = Math.max(...meshPoints.map(p => p.j))
      
      // Create a 2D array to store mesh data
      meshArray = Array(maxI + 1).fill().map(() => Array(maxJ + 1).fill(0))
      
      // Fill the array with mesh data
      meshPoints.forEach(point => {
        meshArray[point.i][point.j] = point.z
      })
    }
    
    // Calculate min/max Z values
    const zMin = Math.min(...meshArray.flat())
    const zMax = Math.max(...meshArray.flat())
    
    // Calculate bed dimensions in 3D space (normalize to actual bed size)
    const bedDimensions = {
      x: bedSize.x / 100, // Convert mm to 3D units (scale down by 100)
      y: bedSize.y / 100
    }
    
    // Create geometry for the mesh surface - use actual bed dimensions
    const geometry = new THREE.PlaneGeometry(bedDimensions.x, bedDimensions.y, maxI, maxJ)
    const positions = geometry.attributes.position.array
    const colors = new Float32Array((maxI + 1) * (maxJ + 1) * 3)
    
    // Set Z positions based on mesh data, flip Y so i=0 is at front (bottom from camera)
    for (let i = 0; i <= maxI; i++) {
      for (let j = 0; j <= maxJ; j++) {
        const flippedI = maxI - i
        const vertexIndex = flippedI * (maxJ + 1) + j
        if (vertexIndex < positions.length / 3) {
          positions[vertexIndex * 3 + 2] = meshArray[i][j] * 10 // Scale for visibility
          // Heatmap color based on normalized Z (blue low -> red high)
          const norm = (meshArray[i][j] - zMin) / Math.max(1e-6, (zMax - zMin))
          const r = norm
          const g = 0.2 + 0.6 * (1 - Math.abs(norm - 0.5) * 2) // more at mid
          const b = 1 - norm
          colors[vertexIndex * 3 + 0] = r
          colors[vertexIndex * 3 + 1] = g
          colors[vertexIndex * 3 + 2] = b
        }
      }
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()

    // Create points array for visualization (scaled to bed dimensions, with Y flipped)
    const points = []
    for (let i = 0; i <= maxI; i++) {
      for (let j = 0; j <= maxJ; j++) {
        const xPos = -bedDimensions.x / 2 + (j / maxJ) * bedDimensions.x
        const yPos = -bedDimensions.y / 2 + ((maxI - i) / maxI) * bedDimensions.y
        points.push({ x: xPos, y: yPos, z: meshArray[i][j] })
      }
    }

    return { geometry, points, zMin, zMax, bedDimensions }
  }, [meshData, bedSize])

  if (!geometry) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Grid className="w-12 h-12 mx-auto mb-2" />
          <p>No bed mesh data available</p>
        </div>
      </div>
    )
  }

  // Calculate scale information
  const maxI = points.length > 0 ? Math.max(...points.map(p => p.x)) : 0
  const maxJ = points.length > 0 ? Math.max(...points.map(p => p.y)) : 0
  const minZ = zMin
  const maxZ = zMax
  const zRange = maxZ - minZ
  const scaleFactor = 10 // Z scaling factor for visibility

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">3D Surface</h4>
        <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200 px-2 py-1 rounded flex items-center gap-2">
          <span className="font-mono">{maxI + 1}×{maxJ + 1}</span>
          <span>•</span>
          <span className="font-mono">{bedSize.x}×{bedSize.y}mm</span>
          <span>•</span>
          <span className="font-mono">{minZ.toFixed(2)} to {maxZ.toFixed(2)}mm</span>
        </div>
        <div className="ml-2 text-xs text-gray-700 bg-gray-50 border border-gray-200 px-2 py-1 rounded flex items-center gap-2">
          <span className="font-medium">Bed Mesh:</span>
          <span className="font-mono">{maxI + 1}×{maxJ + 1}</span>
          <span>•</span>
          <span className="font-mono">Range: {minZ.toFixed(3)} to {maxZ.toFixed(3)}mm</span>
          <span>•</span>
          <span className="font-mono">Last: N/A</span>
          <span className="ml-2">Per 1/8 turn:</span>
          <span className="text-blue-700 font-mono">↻ +{(screwPitch/8).toFixed(3)}mm</span>
          <span className="text-red-700 font-mono">↺ −{(screwPitch/8).toFixed(3)}mm</span>
        </div>
      </div>
      <div className="h-[500px] border border-gray-300 rounded relative">
        <Canvas camera={{ position: [12, 12, 18], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          {/* Custom grid lines matching mesh vertices exactly */}
          <group rotation={[-Math.PI / 2, 0, 0]}>
            {/* Horizontal grid lines */}
            {Array.from({ length: maxI + 1 }, (_, i) => (
              <line key={`h-${i}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([
                      -bedDimensions.x / 2, -bedDimensions.y / 2 + (i / maxI) * bedDimensions.y, 0,
                      bedDimensions.x / 2, -bedDimensions.y / 2 + (i / maxI) * bedDimensions.y, 0
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#cccccc" />
              </line>
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: maxJ + 1 }, (_, j) => (
              <line key={`v-${j}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([
                      -bedDimensions.x / 2 + (j / maxJ) * bedDimensions.x, -bedDimensions.y / 2, 0,
                      -bedDimensions.x / 2 + (j / maxJ) * bedDimensions.x, bedDimensions.y / 2, 0
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#cccccc" />
              </line>
            ))}
          </group>
          
          {/* Scale Reference - 1mm cube for reference */}
          <mesh position={[bedDimensions.x * 0.4, bedDimensions.y * 0.4, 0]}>
            <boxGeometry args={[0.01, 0.01, 0.01]} />
            <meshStandardMaterial color="#666666" transparent opacity={0.7} />
          </mesh>
          <Text position={[bedDimensions.x * 0.42, bedDimensions.y * 0.4, 0]} fontSize={0.15} color="#666666" rotation={[-Math.PI / 2, 0, 0]}>
            1mm
          </Text>
          
          {/* Scale Rulers - Positioned away from bed mesh */}
          {/* X-Axis Ruler (Red) - Positioned below the bed */}
          <group position={[0, -bedDimensions.y * 0.5 - 1, 0]}>
            {/* Main ruler line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    -bedDimensions.x * 0.5, 0, 0,
                    bedDimensions.x * 0.5, 0, 0
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ff0000" linewidth={3} />
            </line>
            
            {/* Ruler ticks and labels */}
            {Array.from({ length: Math.floor(bedDimensions.x / 10) + 1 }, (_, i) => {
              const x = -bedDimensions.x * 0.5 + i * 10
              const isMajorTick = i % 5 === 0
              const tickHeight = isMajorTick ? 0.2 : 0.1
              
              return (
                <group key={`x-tick-${i}`}>
                  {/* Tick mark */}
                  <line>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([
                          x, -tickHeight, 0,
                          x, tickHeight, 0
                        ])}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial color="#ff0000" linewidth={isMajorTick ? 2 : 1} />
                  </line>
                  
                  {/* Label for major ticks */}
                  {isMajorTick && (
                    <Text 
                      position={[x, -0.4, 0]} 
                      fontSize={0.15} 
                      color="#ff0000" 
                      rotation={[0, 0, 0]}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {i * 10}
                    </Text>
                  )}
                </group>
              )
            })}
          </group>
          
          {/* Y-Axis Ruler (Green) - Positioned to the left of the bed */}
          <group position={[-bedDimensions.x * 0.5 - 1, 0, 0]}>
            {/* Main ruler line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    0, -bedDimensions.y * 0.5, 0,
                    0, bedDimensions.y * 0.5, 0
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ff00" linewidth={3} />
            </line>
            
            {/* Ruler ticks and labels */}
            {Array.from({ length: Math.floor(bedDimensions.y / 10) + 1 }, (_, i) => {
              const y = -bedDimensions.y * 0.5 + i * 10
              const isMajorTick = i % 5 === 0
              const tickHeight = isMajorTick ? 0.2 : 0.1
              
              return (
                <group key={`y-tick-${i}`}>
                  {/* Tick mark */}
                  <line>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([
                          -tickHeight, y, 0,
                          tickHeight, y, 0
                        ])}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00ff00" linewidth={isMajorTick ? 2 : 1} />
                  </line>
                  
                  {/* Label for major ticks */}
                  {isMajorTick && (
                    <Text 
                      position={[-0.4, y, 0]} 
                      fontSize={0.15} 
                      color="#00ff00" 
                      rotation={[0, 0, 0]}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {i * 10}
                    </Text>
                  )}
                </group>
              )
            })}
          </group>
          
          {/* Z-Axis Ruler (Blue) - Positioned to the right of the bed, rotated 90 degrees to be parallel with Z-up */}
          <group position={[bedDimensions.x * 0.5 + 1, -bedDimensions.y * 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            {/* Main ruler line - extends from bottom of bed into negative range */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    -0.5, 0, 0,
                    2.5, 0, 0
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#0000ff" linewidth={3} />
            </line>
            
            {/* Ruler ticks and labels - includes negative range */}
            {Array.from({ length: 31 }, (_, i) => {
              const x = (i - 5) * 0.1 // Start from -0.5, go to 2.5
              const isMajorTick = i % 5 === 0
              const tickHeight = isMajorTick ? 0.2 : 0.1
              
              return (
                <group key={`z-tick-${i}`}>
                  {/* Tick mark */}
                  <line>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([
                          x, -tickHeight, 0,
                          x, tickHeight, 0
                        ])}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial color="#0000ff" linewidth={isMajorTick ? 2 : 1} />
                  </line>
                  
                  {/* Label for major ticks */}
                  {isMajorTick && (
                    <Text 
                      position={[x, 0.3, 0]} 
                      fontSize={0.15} 
                      color="#0000ff" 
                      rotation={[0, 0, 0]}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {x.toFixed(1)}
                    </Text>
                  )}
                </group>
              )
            })}
          </group>
          
          {/* Bed mesh surface */}
          <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial
              vertexColors
              wireframe={showWireframe}
              transparent
              opacity={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Mesh points */}
          {showPoints && points.map((point, index) => (
            <mesh key={index} position={[point.x, point.y, point.z * 10]}>
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          ))}

          {/* Directional Labels - Positioned parallel to the grid */}
          {/* Front of Bed (bottom in 2D view) */}
          <Text 
            position={[0, -bedDimensions.y * 0.5 - 0.2, 0.1]} 
            fontSize={0.25} 
            color="#1f2937" 
            rotation={[0, 0, 0]}
            anchorX="center"
            anchorY="middle"
          >
            Front of Bed
          </Text>
          
          {/* Back of Bed (top in 2D view) */}
          <Text 
            position={[0, bedDimensions.y * 0.5 + 0.2, 0.1]} 
            fontSize={0.25} 
            color="#1f2937" 
            rotation={[0, 0, 0]}
            anchorX="center"
            anchorY="middle"
          >
            Back of Bed
          </Text>
          
          {/* Left Side */}
          <Text 
            position={[-bedDimensions.x * 0.5 - 0.2, 0, 0.1]} 
            fontSize={0.25} 
            color="#1f2937" 
            rotation={[0, 0, -Math.PI / 2]}
            anchorX="center"
            anchorY="middle"
          >
            Left
          </Text>
          
          {/* Right Side */}
          <Text 
            position={[bedDimensions.x * 0.5 + 0.2, 0, 0.1]} 
            fontSize={0.25} 
            color="#1f2937" 
            rotation={[0, 0, Math.PI / 2]}
            anchorX="center"
            anchorY="middle"
          >
            Right
          </Text>
          
          {/* Wireframe overlay when not in wireframe mode */}
          {!showWireframe && (
            <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <meshBasicMaterial 
                color="#000000" 
                wireframe={true}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
          
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={(5 * Math.PI) / 12}
            target={[0, -0.3, 0]}
          />
          
        </Canvas>
        
        {/* Visual Scale Indicator - Left Side */}
        <div className="absolute left-2 top-2 bottom-2 w-16 bg-white bg-opacity-90 rounded p-2 flex flex-col justify-between">
          {/* Z Scale Indicator */}
          <div className="flex flex-col items-center space-y-1">
            <div className="text-xs font-semibold text-gray-700">Z Scale</div>
            <div className="flex flex-col items-center space-y-1">
              <div className="text-xs text-gray-600">{maxZ.toFixed(2)}mm</div>
              <div className="w-1 h-16 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 rounded"></div>
              <div className="text-xs text-gray-600">{minZ.toFixed(2)}mm</div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Range: {(zRange).toFixed(2)}mm
            </div>
          </div>
          
          {/* Axis Legend */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-red-500"></div>
              <span className="text-xs">X</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span className="text-xs">Y</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span className="text-xs">Z</span>
            </div>
          </div>
        </div>
        
        {/* Height Scale Indicator - Right Side */}
        <div className="absolute right-2 top-2 bottom-2 w-12 bg-white bg-opacity-90 rounded p-2 flex flex-col justify-between">
          <div className="flex flex-col items-center space-y-1">
            <div className="text-xs font-semibold text-gray-700">Height</div>
            <div className="flex flex-col items-center space-y-1">
              <div className="text-xs text-gray-600">{maxZ.toFixed(2)}</div>
              <div className="w-1 h-20 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded"></div>
              <div className="text-xs text-gray-600">{minZ.toFixed(2)}</div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              mm
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend removed; content combined into Bed Leveling Details below */}
    </div>
  )
}

// Main Bed Mesh Visualization Component
const BedMeshVisualization = ({ showStatus = true, showActions = true }) => {
  const [viewMode, setViewMode] = useState('3d') // '2d' or '3d'
  const [colorScheme, setColorScheme] = useState('heatmap') // 'heatmap', 'grayscale', 'rainbow'
  const [showValues, setShowValues] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [showWireframe, setShowWireframe] = useState(false)
  const [showPoints, setShowPoints] = useState(false)

  const serialStatus = useSerialStore(state => state.status)
  const bedMesh = useSerialStore(state => state.bedMesh)
  const fetchBedLevel = useSerialStore(state => state.fetchBedLevel)
  const runBedLeveling = useSerialStore(state => state.runBedLeveling)
  const processCollectedBedMeshData = useSerialStore(state => state.processCollectedBedMeshData)

  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.printerSettings
  })
  const globalParams = React.useMemo(() => {
    if (!activePrinterId) return {}
    try { return loadGlobalParameters(activePrinterId) } catch { return {} }
  }, [activePrinterId])
  const screwPitch = (printerSettings?.bedScrewPitch ?? globalParams?.bedScrewPitch ?? 0.5)

  const handleFetchMesh = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }
    await fetchBedLevel()
  }, [serialStatus, fetchBedLevel])

  const handleRunAutoLevel = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }
    
    if (confirm('This will run automatic bed leveling (G29). This process takes several minutes. Continue?')) {
      await runBedLeveling()
    }
  }, [serialStatus, runBedLeveling])

  const handleProcessData = useCallback(() => {
    processCollectedBedMeshData()
  }, [processCollectedBedMeshData])

  const hasMeshData = bedMesh?.data && bedMesh.data.length > 0
  const hasSettingsMeshData = printerSettings?.bedLeveling?.mesh && printerSettings.bedLeveling.mesh.length > 0
  
  // Use serial store data if available, otherwise fall back to printer settings
  const meshData = hasMeshData ? {
    mesh: bedMesh.data,
    gridSize: bedMesh.gridSize,
    min: bedMesh.min,
    max: bedMesh.max,
    range: bedMesh.range
  } : hasSettingsMeshData ? {
    mesh: printerSettings.bedLeveling.mesh,
    gridSize: printerSettings.bedLeveling.gridSize || { x: 5, y: 5 },
    min: printerSettings.bedLeveling.min || 0,
    max: printerSettings.bedLeveling.max || 0,
    range: printerSettings.bedLeveling.range || 0
  } : null

  // Calculate notch recommendations for each corner
  const getNotchRecommendations = useMemo(() => {
    if (!meshData || !screwPitch) return null;
    
    const { mesh } = meshData;
    // If screwPitch is small (like 0.063), treat it as per 1/8 turn and scale up to a full turn
    const mmPerTurn = screwPitch < 0.2 ? screwPitch * 8 : screwPitch;
    
    // Get corner values
    const gridY = mesh.length;
    const gridX = mesh[0]?.length || 0;
    
    // Align corner naming with 2D view where front is the bottom row (i = gridY - 1)
    const corners = [
      { name: 'Front Left', value: mesh[gridY - 1]?.[0], row: gridY - 1, col: 0 },
      { name: 'Front Right', value: mesh[gridY - 1]?.[gridX - 1], row: gridY - 1, col: gridX - 1 },
      { name: 'Back Left', value: mesh[0]?.[0], row: 0, col: 0 },
      { name: 'Back Right', value: mesh[0]?.[gridX - 1], row: 0, col: gridX - 1 }
    ].filter(corner => corner.value !== null && corner.value !== undefined);
    
    if (corners.length === 0) return null;
    
    // Calculate average height for reference
    const avgHeight = mesh.flat().filter(v => typeof v === 'number').reduce((sum, val) => sum + val, 0) / mesh.flat().filter(v => typeof v === 'number').length;
    
    return corners.map(corner => {
      const deviation = corner.value - avgHeight; // mm relative to average
      const turns = mmPerTurn > 0 ? Math.abs(deviation) / mmPerTurn : 0; // full turns
      const direction = deviation > 0 ? 'lower' : 'raise';
      // High values need to be lowered (↻), low values raised (↺)
      const icon = deviation > 0 ? '↻' : '↺';
      const color = deviation > 0 ? 'text-blue-700' : 'text-red-700';

      return {
        ...corner,
        deviation,
        turns,
        turnsText: turns.toFixed(1),
        direction,
        icon,
        color
      };
    });
  }, [meshData, screwPitch]);

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Bed Mesh Visualization</h3>
          <div className="text-sm text-gray-600">
            {meshData ? (
              <>
              </>
            ) : (
              'No mesh data available'
            )}
          </div>
          <div className="mt-1 text-[11px] text-gray-700">
            {/* Per 1/8 turn removed here to avoid duplication; shown in inline summary and details */}
          </div>
        </div>
        
        {showActions && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFetchMesh}
            disabled={serialStatus !== 'connected'}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Process Data
          </button>
          
          {!hasMeshData && (
            <button
              onClick={handleRunAutoLevel}
              disabled={serialStatus !== 'connected'}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <Zap className="w-4 h-4 mr-2" />
              Run G29
            </button>
          )}
          
          <button
            onClick={handleProcessData}
            className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Process Data
          </button>
        </div>
        )}
      </div>

      {/* Bed leveling status */}
      {showStatus && printerSettings?.bedLeveling && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Bed Leveling Status</h4>
              <p className="text-sm text-blue-700">
                {printerSettings.bedLeveling.enabled ? 'Enabled' : 'Disabled'} • 
                Fade Height: {printerSettings.bedLeveling.fadeHeight}mm
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              printerSettings.bedLeveling.enabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {printerSettings.bedLeveling.enabled ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      )}

      {/* View mode toggle and visualization options */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* View mode toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('2d')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              viewMode === '2d' 
                ? 'bg-white text-gray-900 shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-4 h-4 mr-1 inline" />
            2D View
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              viewMode === '3d' 
                ? 'bg-white text-gray-900 shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <RotateCcw className="w-4 h-4 mr-1 inline" />
            3D View
          </button>
        </div>

        {/* Visualization options - inline with view toggle */}
        <div className="flex items-center space-x-6">
          {viewMode === '2d' ? (
            <>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Color:</label>
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="heatmap">Heatmap</option>
                  <option value="grayscale">Grayscale</option>
                  <option value="rainbow">Rainbow</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showValues"
                  checked={showValues}
                  onChange={(e) => setShowValues(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="showValues" className="text-sm text-gray-700">
                  Show Values
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showGrid"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="showGrid" className="text-sm text-gray-700">
                  Show Grid
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showWireframe"
                  checked={showWireframe}
                  onChange={(e) => setShowWireframe(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="showWireframe" className="text-sm text-gray-700">
                  Show Wireframe
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showPoints"
                  checked={showPoints}
                  onChange={(e) => setShowPoints(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="showPoints" className="text-sm text-gray-700">
                  Show Points
                </label>
              </div>
            </>
          )}
        </div>

        {/* Inline compact summary removed from this row per request */}
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        {viewMode === '2d' ? (
          <BedMesh2D 
            meshData={meshData}
            colorScheme={colorScheme}
            showValues={showValues}
            showGrid={showGrid}
            screwPitch={screwPitch}
            getNotchRecommendations={getNotchRecommendations}
          />
        ) : (
          <BedMesh3D 
            meshData={meshData}
            showWireframe={showWireframe}
            showPoints={showPoints}
            getNotchRecommendations={getNotchRecommendations}
            screwPitch={screwPitch}
          />
        )}
      </div>

      {/* Unified Bed Mesh Details (combined with legend) */}
      {meshData && (
        <div className="bg-white rounded-lg border border-gray-200 p-2">
          <h4 className="text-sm font-semibold mb-1 text-gray-800">Bed Leveling Details</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {/* Legend & Orientation (combined) */}
            <div className="space-y-1">
              <h5 className="text-xs font-medium text-gray-700">Legend & Orientation</h5>
              <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded px-1 py-0.5">
                <div className="grid grid-cols-2 gap-1">
            <div>
                    <div className="font-medium text-gray-700 mb-0.5">Colors</div>
                    <div>🔴 Red = Too close</div>
                    <div>🔵 Blue = Too far</div>
                    <div>⚪ White = Level</div>
            </div>
            <div>
                    <div className="font-medium text-gray-700 mb-0.5">Orientation</div>
                    <div>• Front = Bottom</div>
                    <div>• Back = Top</div>
                    <div>• Left/Right = Labels</div>
            </div>
            </div>
              </div>
            </div>
            {/* Knob Adjustment Guide */}
            <div className="space-y-1">
              <h5 className="text-xs font-medium text-gray-700">Knob Adjustment Guide</h5>
              <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded px-1 py-0.5">
                <div className="font-medium mb-0.5">Per 1/8 turn:</div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5">
                    <span className="text-blue-700">↻</span>
                    <span>+{(screwPitch/8).toFixed(3)}mm</span>
                  </span>
                  <span className="flex items-center gap-0.5">
                    <span className="text-red-700">↺</span>
                    <span>−{(screwPitch/8).toFixed(3)}mm</span>
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-gray-500">
                  <div><strong>Reading:</strong> 🔴 Red=Lower(↻) 🔵 Blue=Raise(↺)</div>
                  <div><strong>Orientation:</strong> Front at bottom</div>
                </div>
              </div>
            </div>
            
            {/* Corner Adjustments */}
            {getNotchRecommendations && getNotchRecommendations.length > 0 && (
              <div className="space-y-1">
                <h5 className="text-xs font-medium text-gray-700">Corner Adjustments</h5>
                <div className="bg-blue-50 border border-blue-200 rounded px-1 py-0.5">
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {getNotchRecommendations.map((corner, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="font-medium text-gray-600 text-xs">{corner.name}:</span>
                        <span className={`${corner.color} font-bold text-xs`}>
                          {corner.icon} {corner.turnsText} turns
                        </span>
                      </div>
                    ))}
            </div>
          </div>
        </div>
      )}
            
            {/* Mesh Statistics moved into 3D header chip to avoid duplication */}
          </div>
        </div>
      )}

    </div>
  )
}

export default BedMeshVisualization
