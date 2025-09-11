import React, { useMemo, useState, useEffect } from 'react'
import { Play, Download, RefreshCw, Settings, Zap, Layers, RotateCcw, LayoutGrid } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'

const BedLevelVisualization = React.memo(() => {
  // Subscribe to bed mesh data from store
  const bedMesh = useSerialStore(state => state.bedMesh)
  const fetchBedLevel = useSerialStore(state => state.fetchBedLevel)
  const fetchBedMeshData = useSerialStore(state => state.fetchBedMeshData)
  const runBedLeveling = useSerialStore(state => state.runBedLeveling)
  const processCollectedBedMeshData = useSerialStore(state => state.processCollectedBedMeshData)
  const fetchAllPrinterSettings = useSerialStore(state => state.fetchAllPrinterSettings)
  const loadBedMeshFromPrinter = useSerialStore(state => state.loadBedMeshFromPrinter)
  const serialStatus = useSerialStore(state => state.status)
  
  // Get active printer ID
  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  
  // Load bed mesh data when active printer changes
  useEffect(() => {
    if (activePrinterId) {
      loadBedMeshFromPrinter(activePrinterId)
    }
  }, [activePrinterId, loadBedMeshFromPrinter])

  // Scaling state
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [view3D, setView3D] = useState(false)
  const [showWireframe, setShowWireframe] = useState(false)
  const [showPoints, setShowPoints] = useState(true)

  // Use stored bed mesh data or show placeholder
  const bedData = useMemo(() => {
    if (bedMesh.data && bedMesh.data.length > 0) {
      // Ensure mesh data is a proper 2D array
      let mesh = bedMesh.data
      
      // If mesh is a flat array, convert it to 2D based on grid size
      if (Array.isArray(mesh) && mesh.length > 0 && !Array.isArray(mesh[0])) {
        const gridSize = bedMesh.gridSize || { x: 5, y: 5 }
        const rows = []
        for (let y = 0; y < gridSize.y; y++) {
          const row = []
          for (let x = 0; x < gridSize.x; x++) {
            const index = y * gridSize.x + x
            row.push(mesh[index] || 0)
          }
          rows.push(row)
        }
        mesh = rows
      }
      
      // Validate that mesh is a proper 2D array
      if (Array.isArray(mesh) && mesh.length > 0 && Array.isArray(mesh[0])) {
        return {
          mesh: mesh,
          gridSize: bedMesh.gridSize || { x: mesh[0].length, y: mesh.length },
          min: bedMesh.min || Math.min(...mesh.flat()),
          max: bedMesh.max || Math.max(...mesh.flat()),
          range: bedMesh.range || (Math.max(...mesh.flat()) - Math.min(...mesh.flat()))
        }
      }
    }
    
    // Mock data for visualization when no real data is available
    return {
      mesh: [
        [0.1, 0.05, 0.0, -0.05, -0.1],
        [0.08, 0.03, -0.02, -0.07, -0.12],
        [0.05, 0.0, -0.05, -0.1, -0.15],
        [0.02, -0.03, -0.08, -0.13, -0.18],
        [-0.01, -0.06, -0.11, -0.16, -0.21]
      ],
      gridSize: { x: 5, y: 5 },
      min: -0.21,
      max: 0.1,
      range: 0.31
    }
  }, [bedMesh])

  const maxDeviation = bedData.mesh && Array.isArray(bedData.mesh) ? 
    Math.max(...bedData.mesh.flat().map(v => Math.abs(typeof v === 'number' ? v : parseFloat(v) || 0))) : 0
  const minDeviation = bedData.mesh && Array.isArray(bedData.mesh) ? 
    Math.min(...bedData.mesh.flat().map(v => typeof v === 'number' ? v : parseFloat(v) || 0)) : 0

  const getColor = (value) => {
    // Ensure value is a number
    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0
    if (maxDeviation === minDeviation) return 'bg-gray-500'
    const normalized = (numValue - minDeviation) / (maxDeviation - minDeviation)
    if (normalized < 0.33) return 'bg-green-500'
    if (normalized < 0.66) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // 3D Visualization Component
  const BedMesh3D = ({ meshData, showWireframe, showPoints }) => {
    const meshRef = React.useRef()

    const { geometry, points, zMin, zMax } = useMemo(() => {
      if (!meshData || !meshData.mesh || meshData.mesh.length === 0) {
        return { geometry: null, points: [], zMin: 0, zMax: 0 }
      }

      const matrix = meshData.mesh
      const rows = matrix.length
      const cols = matrix[0] ? matrix[0].length : 0
      
      if (rows === 0 || cols === 0) {
        return { geometry: null, points: [], zMin: 0, zMax: 0 }
      }

      // Create geometry
      const geometry = new THREE.PlaneGeometry(10, 10, cols - 1, rows - 1)
      const positions = geometry.attributes.position.array
      
      let zMin = Infinity
      let zMax = -Infinity
      
      // Update Z positions based on mesh data
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const vertexIndex = (i * cols + j) * 3
          const zValue = typeof matrix[i][j] === 'number' ? matrix[i][j] : parseFloat(matrix[i][j]) || 0
          positions[vertexIndex + 2] = zValue * 10 // Scale for visibility
          
          zMin = Math.min(zMin, zValue)
          zMax = Math.max(zMax, zValue)
        }
      }
      
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()

      // Create points for visualization
      const points = []
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = (j / (cols - 1)) * 10 - 5
          const y = (i / (rows - 1)) * 10 - 5
          const z = (typeof matrix[i][j] === 'number' ? matrix[i][j] : parseFloat(matrix[i][j]) || 0) * 10
          points.push(new THREE.Vector3(x, y, z))
        }
      }

      return { geometry, points, zMin, zMax }
    }, [meshData])

    if (!geometry) {
      return (
        <div className="h-96 flex items-center justify-center text-gray-500">
          No 3D data available
        </div>
      )
    }

    return (
      <div className="h-96 border border-gray-300 rounded relative">
        <Canvas camera={{ position: [6, 6, 10], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          {/* Grid lines */}
          <gridHelper args={[10, 20, '#cccccc', '#cccccc']} />
          
          {/* Bed mesh surface */}
          <mesh ref={meshRef} geometry={geometry}>
            <meshLambertMaterial 
              color="#4f46e5" 
              wireframe={showWireframe}
              transparent={showWireframe}
              opacity={showWireframe ? 0.3 : 0.8}
            />
          </mesh>
          
          {/* Points */}
          {showPoints && points.map((point, index) => (
            <mesh key={index} position={point}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          ))}
          
          {/* Axes */}
          <Text position={[4, 0, 0.5]} fontSize={0.25} color="#ff0000">
            X
          </Text>
          <Text position={[-4, 4, 0.7]} fontSize={0.25} color="#0000ff">
            Y
          </Text>
          <Text position={[-4, 4, 0.7]} fontSize={0.25} color="#0000ff">
            Z
          </Text>
          
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
        
        {/* Scale indicator */}
        <div className="absolute left-2 top-2 bottom-2 w-16 bg-white bg-opacity-90 rounded p-2 flex flex-col justify-between">
          <div className="flex flex-col items-center space-y-1">
            <div className="text-xs font-bold text-blue-600">{zMax.toFixed(2)}</div>
            <div className="w-1 h-20 bg-gradient-to-b from-red-500 to-green-500 rounded"></div>
            <div className="text-xs font-bold text-red-600">{zMin.toFixed(2)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bedMesh.data.length === 0 ? (
        <div className="text-center py-4">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Layers className="w-5 h-5 text-gray-400" />
            <p className="text-sm text-gray-500">No bed leveling data available</p>
          </div>
          {message && (
            <div className={`mb-3 p-2 rounded text-sm ${
              message.includes('error') || message.includes('Error') 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <button 
              onClick={async () => {
                console.log('Running bed leveling...')
                setIsLoading(true)
                setMessage('')
                try {
                  await runBedLeveling()
                  console.log('Bed leveling completed')
                  setMessage('Bed leveling completed successfully! Check the terminal for progress.')
                } catch (error) {
                  console.error('Bed leveling error:', error)
                  setMessage(`Error: ${error.message || 'Failed to run bed leveling'}`)
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={serialStatus !== 'connected' || isLoading}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>Run Auto Bed Leveling (G29)</span>
            </button>
            <button 
              onClick={async () => {
                console.log('Fetching bed level data...')
                setIsLoading(true)
                setMessage('')
                try {
                  await fetchBedLevel()
                  console.log('Bed level data fetched')
                  setMessage('Bed level data fetched successfully!')
                } catch (error) {
                  console.error('Fetch bed level error:', error)
                  setMessage(`Error: ${error.message || 'Failed to fetch bed level data'}`)
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={serialStatus !== 'connected' || isLoading}
              className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Download className="w-3 h-3" />
              )}
              <span>Fetch Existing Data (M503)</span>
            </button>
            <button 
              onClick={async () => {
                console.log('Fetching bed mesh data with G29 W...')
                setIsLoading(true)
                setMessage('')
                try {
                  await fetchBedMeshData()
                  console.log('Bed mesh data fetched')
                  setMessage('Bed mesh data fetched successfully!')
                } catch (error) {
                  console.error('Fetch bed mesh error:', error)
                  setMessage(`Error: ${error.message || 'Failed to fetch bed mesh data'}`)
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={serialStatus !== 'connected' || isLoading}
              className="px-3 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Zap className="w-3 h-3" />
              )}
              <span>Fetch Bed Mesh (G29 W)</span>
            </button>
            <button 
              onClick={async () => {
                console.log('Processing collected bed mesh data...')
                setIsLoading(true)
                setMessage('')
                try {
                  await processCollectedBedMeshData()
                  console.log('Bed mesh data processed')
                  setMessage('Bed mesh data processed successfully!')
                } catch (error) {
                  console.error('Process bed mesh error:', error)
                  setMessage(`Error: ${error.message || 'Failed to process bed mesh data'}`)
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
              className="px-3 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              <span>Process Collected Data</span>
            </button>
            <button 
              onClick={async () => {
                console.log('Fetching all printer settings...')
                setIsLoading(true)
                setMessage('')
                try {
                  await fetchAllPrinterSettings()
                  console.log('All printer settings fetched')
                  setMessage('All printer settings fetched successfully!')
                } catch (error) {
                  console.error('Fetch all settings error:', error)
                  setMessage(`Error: ${error.message || 'Failed to fetch printer settings'}`)
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={serialStatus !== 'connected' || isLoading}
              className="px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Settings className="w-3 h-3" />
              )}
              <span>Fetch All Settings (M503)</span>
            </button>
          </div>
          {serialStatus !== 'connected' && (
            <p className="text-xs text-red-500 mt-2">Connect to printer first</p>
          )}
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="flex justify-between items-center">
            {/* View and scaling controls */}
            <div className="flex items-center space-x-4">
              {/* View toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView3D(false)}
                  className={`px-3 py-1 text-xs rounded transition-all duration-200 flex items-center space-x-1 ${
                    !view3D 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>2D</span>
                </button>
                <button
                  onClick={() => setView3D(true)}
                  className={`px-3 py-1 text-xs rounded transition-all duration-200 flex items-center space-x-1 ${
                    view3D 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>3D</span>
                </button>
              </div>
              
              {/* 3D view options */}
              {view3D && (
                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-600 flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={showWireframe}
                      onChange={(e) => setShowWireframe(e.target.checked)}
                      className="w-3 h-3"
                    />
                    <span>Wireframe</span>
                  </label>
                  <label className="text-xs text-gray-600 flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={showPoints}
                      onChange={(e) => setShowPoints(e.target.checked)}
                      className="w-3 h-3"
                    />
                    <span>Points</span>
                  </label>
                </div>
              )}
              
              {/* Scaling control (only for 2D view) */}
              {!view3D && (
                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-600">Scale:</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-xs text-gray-600 w-8">{scale.toFixed(1)}x</span>
                  <button
                    onClick={() => setScale(1.0)}
                    className="px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                    title="Reset to default scale"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={runBedLeveling}
                disabled={serialStatus !== 'connected'}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Run New Leveling
              </button>
              <button 
                onClick={fetchBedLevel}
                disabled={serialStatus !== 'connected'}
                className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            </div>
          </div>
          
          {/* Visualization */}
          {view3D ? (
            <BedMesh3D 
              meshData={bedData}
              showWireframe={showWireframe}
              showPoints={showPoints}
            />
          ) : (
            <>
              {/* 2D Bed level grid visualization */}
              <div 
                className="grid gap-1 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${bedData.gridSize.x}, ${32 * scale}px)`,
                  gridTemplateRows: `repeat(${bedData.gridSize.y}, ${32 * scale}px)`,
                  maxWidth: `${Math.min(320 * scale, 600)}px`
                }}
              >
                {bedData.mesh && Array.isArray(bedData.mesh) && bedData.mesh.map((row, rowIndex) =>
                  Array.isArray(row) && row.map((value, colIndex) => {
                    // Ensure value is a number
                    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`rounded border flex items-center justify-center text-white font-mono ${getColor(numValue)}`}
                        style={{
                          fontSize: `${Math.max(8, 12 * scale)}px`
                        }}
                        title={`X${colIndex} Y${rowIndex}: ${numValue.toFixed(3)}mm`}
                      >
                        {numValue.toFixed(2)}
                      </div>
                    )
                  })
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Critical</span>
                </div>
              </div>
            </>
          )}

          {/* Statistics */}
          <div className="text-center text-sm text-gray-600">
            <p>Max deviation: {bedData.max.toFixed(3)}mm</p>
            <p>Min deviation: {bedData.min.toFixed(3)}mm</p>
            <p>Range: {bedData.range.toFixed(3)}mm</p>
            <p>Grid: {bedData.gridSize.x}x{bedData.gridSize.y}</p>
            {bedMesh.timestamp && (
              <p className="text-xs text-gray-400">
                Last updated: {new Date(bedMesh.timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Bed Leveling Correction Guide */}
          {bedData.mesh && Array.isArray(bedData.mesh) && bedData.mesh.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Bed Leveling Correction Guide (Ender 3/V2)
              </h4>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                Adjust the bed leveling knobs based on the mesh data. Each full turn ≈ 0.1mm adjustment.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Corner adjustments */}
                {(() => {
                  const mesh = bedData.mesh
                  const rows = mesh.length
                  const cols = mesh[0] ? mesh[0].length : 0
                  
                  if (rows < 2 || cols < 2) return null
                  
                  // Get corner values
                  const topLeft = typeof mesh[0][0] === 'number' ? mesh[0][0] : parseFloat(mesh[0][0]) || 0
                  const topRight = typeof mesh[0][cols-1] === 'number' ? mesh[0][cols-1] : parseFloat(mesh[0][cols-1]) || 0
                  const bottomLeft = typeof mesh[rows-1][0] === 'number' ? mesh[rows-1][0] : parseFloat(mesh[rows-1][0]) || 0
                  const bottomRight = typeof mesh[rows-1][cols-1] === 'number' ? mesh[rows-1][cols-1] : parseFloat(mesh[rows-1][cols-1]) || 0
                  
                  // Calculate average for reference
                  const avg = (topLeft + topRight + bottomLeft + bottomRight) / 4
                  
                  // Calculate turns needed (assuming 0.1mm per turn)
                  const turnsPerMm = 10 // 10 turns per mm
                  
                  const getTurns = (value) => {
                    const diff = value - avg
                    return Math.round(diff * turnsPerMm * 10) / 10 // Round to 1 decimal
                  }
                  
                  const topLeftTurns = getTurns(topLeft)
                  const topRightTurns = getTurns(topRight)
                  const bottomLeftTurns = getTurns(bottomLeft)
                  const bottomRightTurns = getTurns(bottomRight)
                  
                  return (
                    <>
                      {/* Top Left */}
                      <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Top Left</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{topLeft.toFixed(3)}mm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {topLeftTurns > 0 ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <span className="text-lg">↻</span>
                              <span className="text-sm font-mono">{Math.abs(topLeftTurns)} turns</span>
                            </div>
                          ) : topLeftTurns < 0 ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <span className="text-lg">↺</span>
                              <span className="text-sm font-mono">{Math.abs(topLeftTurns)} turns</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500">
                              <span className="text-sm">✓ Good</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Top Right */}
                      <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Top Right</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{topRight.toFixed(3)}mm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {topRightTurns > 0 ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <span className="text-lg">↻</span>
                              <span className="text-sm font-mono">{Math.abs(topRightTurns)} turns</span>
                            </div>
                          ) : topRightTurns < 0 ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <span className="text-lg">↺</span>
                              <span className="text-sm font-mono">{Math.abs(topRightTurns)} turns</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500">
                              <span className="text-sm">✓ Good</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Bottom Left */}
                      <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Bottom Left</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{bottomLeft.toFixed(3)}mm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {bottomLeftTurns > 0 ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <span className="text-lg">↻</span>
                              <span className="text-sm font-mono">{Math.abs(bottomLeftTurns)} turns</span>
                            </div>
                          ) : bottomLeftTurns < 0 ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <span className="text-lg">↺</span>
                              <span className="text-sm font-mono">{Math.abs(bottomLeftTurns)} turns</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500">
                              <span className="text-sm">✓ Good</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Bottom Right */}
                      <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Bottom Right</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{bottomRight.toFixed(3)}mm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {bottomRightTurns > 0 ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <span className="text-lg">↻</span>
                              <span className="text-sm font-mono">{Math.abs(bottomRightTurns)} turns</span>
                            </div>
                          ) : bottomRightTurns < 0 ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <span className="text-lg">↺</span>
                              <span className="text-sm font-mono">{Math.abs(bottomRightTurns)} turns</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500">
                              <span className="text-sm">✓ Good</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
              
              <div className="mt-3 text-xs text-yellow-700 dark:text-yellow-300">
                <p><strong>Instructions:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>↻ Clockwise = Lower the bed (turn knob clockwise)</li>
                  <li>↺ Counter-clockwise = Raise the bed (turn knob counter-clockwise)</li>
                  <li>Make small adjustments and re-run bed leveling to check progress</li>
                  <li>Target: All corners within ±0.1mm of each other</li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
})

export default BedLevelVisualization