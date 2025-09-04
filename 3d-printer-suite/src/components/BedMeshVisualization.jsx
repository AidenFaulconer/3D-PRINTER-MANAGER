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

// 2D Canvas Visualization Component
const BedMesh2D = ({ meshData, colorScheme, showValues, showGrid }) => {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 })

  const processedData = useMemo(() => {
    if (!meshData || !meshData.mesh || meshData.mesh.length === 0) {
      return null
    }

    // Convert {i, j, z} points to 2D matrix
    const points = meshData.mesh
    const maxI = Math.max(...points.map(p => p.i))
    const maxJ = Math.max(...points.map(p => p.j))
    
    const matrix = Array(maxI + 1).fill().map(() => Array(maxJ + 1).fill(null))
    points.forEach(point => {
      matrix[point.i][point.j] = point.z
    })

    // Calculate min/max for color scaling
    const values = points.map(p => p.z)
    const minZ = Math.min(...values)
    const maxZ = Math.max(...values)
    const range = maxZ - minZ

    return {
      matrix,
      minZ,
      maxZ,
      range,
      gridSize: { x: maxI + 1, y: maxJ + 1 }
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
          const y = i * cellHeight
          
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
      <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
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
        <div className="text-sm text-gray-600">
          Range: {processedData.minZ.toFixed(3)}mm to {processedData.maxZ.toFixed(3)}mm
        </div>
      </div>
      
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="border border-gray-300 rounded"
        />
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
const BedMesh3D = ({ meshData, showWireframe, showPoints }) => {
  const meshRef = useRef()

  const { geometry, points } = useMemo(() => {
    if (!meshData || !meshData.mesh || meshData.mesh.length === 0) {
      return { geometry: null, points: [] }
    }

    const meshPoints = meshData.mesh
    const maxI = Math.max(...meshPoints.map(p => p.i))
    const maxJ = Math.max(...meshPoints.map(p => p.j))
    
    // Create a 2D array to store mesh data
    const meshArray = Array(maxI + 1).fill().map(() => Array(maxJ + 1).fill(0))
    
    // Fill the array with mesh data
    meshPoints.forEach(point => {
      meshArray[point.i][point.j] = point.z
    })
    
    // Create geometry for the mesh surface
    const geometry = new THREE.PlaneGeometry(maxJ, maxI, maxJ, maxI)
    const positions = geometry.attributes.position.array
    
    // Set Z positions based on mesh data
    for (let i = 0; i <= maxI; i++) {
      for (let j = 0; j <= maxJ; j++) {
        const vertexIndex = i * (maxJ + 1) + j
        if (vertexIndex < positions.length / 3) {
          positions[vertexIndex * 3 + 2] = meshArray[i][j] * 10 // Scale for visibility
        }
      }
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    return { geometry, points: meshPoints }
  }, [meshData])

  if (!geometry) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Grid className="w-12 h-12 mx-auto mb-2" />
          <p>No bed mesh data available</p>
        </div>
      </div>
    )
  }

  // Calculate scale information
  const maxI = Math.max(...points.map(p => p.i))
  const maxJ = Math.max(...points.map(p => p.j))
  const minZ = Math.min(...points.map(p => p.z))
  const maxZ = Math.max(...points.map(p => p.z))
  const zRange = maxZ - minZ
  const scaleFactor = 10 // Z scaling factor for visibility

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">3D Surface</h4>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
          <div>Grid: {maxI + 1}×{maxJ + 1} points</div>
          <div>Z Range: {minZ.toFixed(3)} to {maxZ.toFixed(3)} mm</div>
          <div>Scale: 1 unit = 1mm (Z ×{scaleFactor} for visibility)</div>
        </div>
      </div>
      <div className="h-96 border border-gray-300 rounded relative">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          {/* Grid lines like Klipper */}
          <gridHelper args={[10, 20, '#cccccc', '#cccccc']} />
          
          {/* Scale Reference - 1mm cube for reference */}
          <mesh position={[4, 4, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#666666" transparent opacity={0.7} />
          </mesh>
          <Text position={[4.2, 4, 0]} fontSize={0.15} color="#666666" rotation={[-Math.PI / 2, 0, 0]}>
            1mm
          </Text>
          
          {/* Colored XYZ Axes - Positioned at top-left corner */}
          {/* X Axis - Red */}
          <mesh position={[-4, 4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <mesh position={[-2.5, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.08, 0.15, 8]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          
          {/* Y Axis - Green */}
          <mesh position={[-4, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
            <meshStandardMaterial color="#00ff00" />
          </mesh>
          <mesh position={[-4, 2.5, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.08, 0.15, 8]} />
            <meshStandardMaterial color="#00ff00" />
          </mesh>
          
          {/* Z Axis - Blue */}
          <mesh position={[-4, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
            <meshStandardMaterial color="#0000ff" />
          </mesh>
          <mesh position={[-4, 4, 0.5]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.08, 0.15, 8]} />
            <meshStandardMaterial color="#0000ff" />
          </mesh>
          
          {/* Bed mesh surface */}
          <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#4f46e5" 
              wireframe={showWireframe}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide} // Show both sides
            />
          </mesh>
          
          {/* Mesh points */}
          {showPoints && points.map((point, index) => (
            <mesh key={index} position={[point.j - 2.5, point.i - 2.5, point.z * 10]} rotation={[-Math.PI / 2, 0, 0]}>
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          ))}
          
          {/* Wireframe overlay when not in wireframe mode */}
          {!showWireframe && (
            <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
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
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0, 0]}
          />
          
          {/* Colored Axis Labels - Positioned at top-left corner */}
          <Text position={[-2.2, 4, 0]} fontSize={0.25} color="#ff0000" rotation={[-Math.PI / 2, 0, 0]}>
            X
          </Text>
          <Text position={[-4, 2.2, 0]} fontSize={0.25} color="#00ff00" rotation={[-Math.PI / 2, 0, 0]}>
            Y
          </Text>
          <Text position={[-4, 4, 0.7]} fontSize={0.25} color="#0000ff">
            Z
          </Text>
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
    </div>
  )
}

// Main Bed Mesh Visualization Component
const BedMeshVisualization = () => {
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
    gridSize: { x: Math.max(...printerSettings.bedLeveling.mesh.map(p => p.i)) + 1, y: Math.max(...printerSettings.bedLeveling.mesh.map(p => p.j)) + 1 },
    min: Math.min(...printerSettings.bedLeveling.mesh.map(p => p.z)),
    max: Math.max(...printerSettings.bedLeveling.mesh.map(p => p.z)),
    range: Math.max(...printerSettings.bedLeveling.mesh.map(p => p.z)) - Math.min(...printerSettings.bedLeveling.mesh.map(p => p.z))
  } : null

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Bed Mesh Visualization</h3>
          <div className="text-sm text-gray-600">
            {meshData ? (
              <>
                {meshData.gridSize.x}×{meshData.gridSize.y} grid • 
                Range: {meshData.min.toFixed(3)}mm to {meshData.max.toFixed(3)}mm • 
                {hasMeshData ? (
                  <>Last updated: {bedMesh.timestamp ? new Date(bedMesh.timestamp).toLocaleTimeString() : 'Unknown'}</>
                ) : (
                  <>Data from printer settings</>
                )}
              </>
            ) : (
              'No mesh data available'
            )}
          </div>
        </div>
        
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
      </div>

      {/* Bed leveling status */}
      {printerSettings?.bedLeveling && (
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

      {/* View mode toggle */}
      <div className="flex items-center space-x-4">
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
      </div>

      {/* Visualization controls */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Visualization Options</h4>
        
        {viewMode === '2d' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Scheme
              </label>
              <select
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
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
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
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
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {viewMode === '2d' ? (
          <BedMesh2D 
            meshData={meshData}
            colorScheme={colorScheme}
            showValues={showValues}
            showGrid={showGrid}
          />
        ) : (
          <BedMesh3D 
            meshData={meshData}
            showWireframe={showWireframe}
            showPoints={showPoints}
          />
        )}
      </div>

      {/* Mesh statistics */}
      {meshData && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Mesh Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Min Height:</span>
              <div className="font-mono">{meshData.min.toFixed(3)}mm</div>
            </div>
            <div>
              <span className="text-gray-600">Max Height:</span>
              <div className="font-mono">{meshData.max.toFixed(3)}mm</div>
            </div>
            <div>
              <span className="text-gray-600">Range:</span>
              <div className="font-mono">{meshData.range.toFixed(3)}mm</div>
            </div>
            <div>
              <span className="text-gray-600">Points:</span>
              <div className="font-mono">{meshData.mesh.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BedMeshVisualization
