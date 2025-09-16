import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Line, Grid, PerspectiveCamera, Text } from '@react-three/drei'

const MOVE_COLORS = {
  travel: new THREE.Color(0x808080), // Gray
  extrude: new THREE.Color(0x00ff00), // Green
  retract: new THREE.Color(0xff0000)  // Red
}

// Optimized G-code parser with point reduction for performance
const parseGcode = (gcode, maxPointsPerLayer = 1000) => {
  const lines = gcode.split('\n')
  const layers = new Map()
  let currentPosition = { x: 0, y: 0, z: 0, e: 0 }
  let lastPosition = { x: 0, y: 0, z: 0, e: 0 }
  let bounds = {
    min: { x: Infinity, y: Infinity, z: Infinity },
    max: { x: -Infinity, y: -Infinity, z: -Infinity }
  }
  
  // Point reduction variables
  const pointReduction = new Map() // Track points per layer for reduction

  const updateBounds = (pos) => {
    bounds.min.x = Math.min(bounds.min.x, pos.x)
    bounds.min.y = Math.min(bounds.min.y, pos.y)
    bounds.min.z = Math.min(bounds.min.z, pos.z)
    bounds.max.x = Math.max(bounds.max.x, pos.x)
    bounds.max.y = Math.max(bounds.max.y, pos.y)
    bounds.max.z = Math.max(bounds.max.z, pos.z)
  }

  const parseCoordinates = (parts) => {
    const coords = {}
    for (const part of parts) {
      const axis = part.charAt(0).toLowerCase()
      if ('xyzef'.includes(axis)) {
        const value = parseFloat(part.slice(1))
        // Only use valid numbers, skip NaN or Infinity values
        if (!isNaN(value) && isFinite(value)) {
          coords[axis] = value
        }
      }
    }
    return coords
  }

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith(';')) continue

    const parts = trimmedLine.split(' ')
    const command = parts[0]

    if (command === 'G0' || command === 'G1') {
      const coords = parseCoordinates(parts)
      
      // Debug logging for problematic lines
      if (Object.values(coords).some(val => isNaN(val) || !isFinite(val))) {
        console.warn('Invalid coordinates found in line:', trimmedLine, 'coords:', coords)
      }
      
      if (coords.x !== undefined) currentPosition.x = coords.x
      if (coords.y !== undefined) currentPosition.y = coords.y
      if (coords.z !== undefined) currentPosition.z = coords.z
      if (coords.e !== undefined) currentPosition.e = coords.e

      // Validate coordinates before using them
      const hasValidCoords = [currentPosition.x, currentPosition.y, currentPosition.z, lastPosition.x, lastPosition.y, lastPosition.z]
        .every(coord => !isNaN(coord) && isFinite(coord))
      
      if (hasValidCoords) {
        const isExtrusion = currentPosition.e > lastPosition.e
        const moveType = isExtrusion ? 'extrude' : 'travel'
        const layerZ = currentPosition.z

        if (!layers.has(layerZ)) {
          layers.set(layerZ, {
            points: [],
            moveTypes: [],
            pointCount: 0
          })
          pointReduction.set(layerZ, 0)
        }
        
        const layerData = layers.get(layerZ)
        const currentPointCount = pointReduction.get(layerZ)
        
        // Point reduction: only add every Nth point if layer has too many points
        const shouldAddPoint = currentPointCount < maxPointsPerLayer || 
                              (currentPointCount % Math.ceil(currentPointCount / maxPointsPerLayer)) === 0 ||
                              moveType === 'extrude' // Always keep extrusion moves
        
        if (shouldAddPoint) {
          layerData.points.push(
            lastPosition.x, lastPosition.y, lastPosition.z,
            currentPosition.x, currentPosition.y, currentPosition.z
          )
          layerData.moveTypes.push(moveType)
          layerData.pointCount++
        }
        
        pointReduction.set(layerZ, currentPointCount + 1)
        updateBounds(currentPosition)
        lastPosition = { ...currentPosition }
      } else {
        console.warn('Skipping invalid coordinates:', { lastPosition, currentPosition })
      }
    }
  }

  const sortedLayers = Array.from(layers.entries())
    .sort(([z1], [z2]) => z1 - z2)
    .map(([z, data]) => ({
      z,
      ...data
    }))

  // Ensure bounds are valid
  const validBounds = {
    min: {
      x: isFinite(bounds.min.x) ? bounds.min.x : 0,
      y: isFinite(bounds.min.y) ? bounds.min.y : 0,
      z: isFinite(bounds.min.z) ? bounds.min.z : 0
    },
    max: {
      x: isFinite(bounds.max.x) ? bounds.max.x : 100,
      y: isFinite(bounds.max.y) ? bounds.max.y : 100,
      z: isFinite(bounds.max.z) ? bounds.max.z : 10
    }
  }

  return {
    layers: sortedLayers,
    bounds: validBounds,
    stats: {
      totalLayers: sortedLayers.length,
      totalPoints: sortedLayers.reduce((sum, layer) => sum + layer.points.length / 6, 0)
    }
  }
}

const Scene = ({ geometryData, visibleLayers, showTravelMoves, buildPlateSize }) => {
  if (!geometryData) {
    // Show a test cube if no geometry data
    return (
      <>
        <gridHelper 
          args={[buildPlateSize.x, Math.max(10, Math.floor(buildPlateSize.x / 10)), '#cccccc', '#cccccc']} 
          position={[0, 0, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
        />
        
        {/* Build plate outline for test cube */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[buildPlateSize.x, buildPlateSize.y]} />
          <meshBasicMaterial color="#f0f0f0" transparent opacity={0.1} />
        </mesh>
        
        {/* Build plate border for test cube */}
        <group position={[0, 0, 0.02]}>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={8}
                array={new Float32Array([
                  // Bottom edge
                  -buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                  buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                  // Right edge  
                  buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                  buildPlateSize.x/2, buildPlateSize.y/2, 0,
                  // Top edge
                  buildPlateSize.x/2, buildPlateSize.y/2, 0,
                  -buildPlateSize.x/2, buildPlateSize.y/2, 0,
                  // Left edge
                  -buildPlateSize.x/2, buildPlateSize.y/2, 0,
                  -buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#666666" />
          </lineSegments>
        </group>
        
        {/* Colored XYZ Axes */}
        <mesh position={[-4, 4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        <mesh position={[-2.5, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        
        <mesh position={[-4, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#00ff00" />
        </mesh>
        <mesh position={[-4, 2.5, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color="#00ff00" />
        </mesh>
        
        <mesh position={[-4, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#0000ff" />
        </mesh>
        <mesh position={[-4, 4, 0.5]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color="#0000ff" />
        </mesh>
        
        <Text position={[-2.2, 4, 0]} fontSize={0.25} color="#ff0000" rotation={[-Math.PI / 2, 0, 0]}>
          X
        </Text>
        <Text position={[-4, 2.2, 0]} fontSize={0.25} color="#00ff00" rotation={[-Math.PI / 2, 0, 0]}>
          Y
        </Text>
        <Text position={[-4, 4, 0.7]} fontSize={0.25} color="#0000ff">
          Z
        </Text>
        
        <mesh position={[0, 0, 1]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </>
    )
  }

  return (
    <>
      {/* Calculate grid and bed positioning based on G-code bounds */}
      {(() => {
        const { min, max } = geometryData.bounds
        const centerX = (min.x + max.x) / 2
        const centerY = (min.y + max.y) / 2
        
        // Use the larger of G-code bounds or build plate size
        const gcodeSizeX = max.x - min.x
        const gcodeSizeY = max.y - min.y
        const gridSizeX = Math.max(gcodeSizeX, buildPlateSize.x)
        const gridSizeY = Math.max(gcodeSizeY, buildPlateSize.y)
        
        return (
          <>
            {/* Grid lines positioned to match G-code bounds */}
            <gridHelper 
              args={[gridSizeX, Math.max(10, Math.floor(gridSizeX / 10)), '#cccccc', '#cccccc']} 
              position={[centerX, centerY, 0]} 
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            {/* Build plate outline positioned to match G-code center */}
            <mesh position={[centerX, centerY, 0.01]}>
              <planeGeometry args={[buildPlateSize.x, buildPlateSize.y]} />
              <meshBasicMaterial color="#f0f0f0" transparent opacity={0.1} />
            </mesh>
            
            {/* Build plate border positioned to match G-code center */}
            <group position={[centerX, centerY, 0.02]}>
              {/* Create border lines manually to ensure proper orientation */}
              <lineSegments>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={8}
                    array={new Float32Array([
                      // Bottom edge
                      -buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                      buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                      // Right edge  
                      buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                      buildPlateSize.x/2, buildPlateSize.y/2, 0,
                      // Top edge
                      buildPlateSize.x/2, buildPlateSize.y/2, 0,
                      -buildPlateSize.x/2, buildPlateSize.y/2, 0,
                      // Left edge
                      -buildPlateSize.x/2, buildPlateSize.y/2, 0,
                      -buildPlateSize.x/2, -buildPlateSize.y/2, 0,
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#666666" />
              </lineSegments>
            </group>
          </>
        )
      })()}
      
      {/* Colored XYZ Axes - Positioned at top-left corner like bed mesh */}
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
      
      {/* Colored Axis Labels */}
      <Text position={[-2.2, 4, 0]} fontSize={0.25} color="#ff0000" rotation={[-Math.PI / 2, 0, 0]}>
        X
      </Text>
      <Text position={[-4, 2.2, 0]} fontSize={0.25} color="#00ff00" rotation={[-Math.PI / 2, 0, 0]}>
        Y
      </Text>
      <Text position={[-4, 4, 0.7]} fontSize={0.25} color="#0000ff">
        Z
      </Text>

      {/* Render layers */}
      {geometryData.layers.map((layer, layerIndex) => {
        if (!visibleLayers.has(layerIndex)) return null

        return layer.points.map((_, i) => {
          if (i % 6 !== 0) return null // Skip duplicate points
          
          const moveType = layer.moveTypes[i / 6]
          if (moveType === 'travel' && !showTravelMoves) return null

          // Extract coordinates for this line segment
          const x1 = layer.points[i]
          const y1 = layer.points[i + 1]
          const z1 = layer.points[i + 2]
          const x2 = layer.points[i + 3]
          const y2 = layer.points[i + 4]
          const z2 = layer.points[i + 5]

          // Validate coordinates before creating vectors
          const coords = [x1, y1, z1, x2, y2, z2]
          const hasValidCoords = coords.every(coord => !isNaN(coord) && isFinite(coord))
          
          if (!hasValidCoords) {
            console.warn('Skipping invalid line segment:', { x1, y1, z1, x2, y2, z2 })
            return null
          }

          const points = [
            new THREE.Vector3(x1, y1, z1),
            new THREE.Vector3(x2, y2, z2)
          ]

          return (
            <Line
              key={`${layerIndex}-${i}`}
              points={points}
              color={MOVE_COLORS[moveType]}
              lineWidth={moveType === 'travel' ? 0.5 : 2}
            />
          )
        })
      })}
    </>
  )
}

const SimpleGcodeViewer3D = ({ content, width = 800, height = 700, buildPlateSize = { x: 220, y: 220 } }) => {
  const [geometryData, setGeometryData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentLayer, setCurrentLayer] = useState(0)
  const [showTravelMoves, setShowTravelMoves] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([0, 0, 50])
  const [qualityLevel, setQualityLevel] = useState('medium') // 'low', 'medium', 'high'
  const [maxPointsPerLayer, setMaxPointsPerLayer] = useState(1000)

  console.log('SimpleGcodeViewer3D rendered with content length:', content?.length, 'width:', width, 'height:', height, 'buildPlateSize:', buildPlateSize)

  // Update quality settings based on content size
  useEffect(() => {
    if (content && content.length > 50000) {
      setQualityLevel('low')
      setMaxPointsPerLayer(500)
    } else if (content && content.length > 20000) {
      setQualityLevel('medium')
      setMaxPointsPerLayer(1000)
    } else {
      setQualityLevel('high')
      setMaxPointsPerLayer(2000)
    }
  }, [content])

  // Process G-code when content changes
  useEffect(() => {
    const processGcode = () => {
      console.log('SimpleGcodeViewer3D: Processing G-code, content length:', content?.length, 'quality:', qualityLevel, 'maxPoints:', maxPointsPerLayer)
      if (!content) {
        console.log('SimpleGcodeViewer3D: No content, skipping processing')
        return
      }

      setIsProcessing(true)
      try {
        console.log('SimpleGcodeViewer3D: Starting G-code processing...')
        const result = parseGcode(content, maxPointsPerLayer)
        console.log('SimpleGcodeViewer3D: Processing complete, result:', result)
        setGeometryData(result)
        setCurrentLayer(result.layers.length - 1) // Show all layers initially
        
        // Calculate optimal camera position for birds-eye view
        if (result.bounds) {
          const { min, max } = result.bounds
          
          // Calculate the center of the G-code
          const centerX = (min.x + max.x) / 2
          const centerY = (min.y + max.y) / 2
          const centerZ = (min.z + max.z) / 2
          
          // Calculate the size of the G-code
          const sizeX = max.x - min.x
          const sizeY = max.y - min.y
          const sizeZ = max.z - min.z
          const maxSize = Math.max(sizeX, sizeY, sizeZ)
          
          // Calculate distance for birds-eye view (from corner)
          // Use the larger of G-code size or build plate size for proper scaling
          const buildPlateMax = Math.max(buildPlateSize.x, buildPlateSize.y)
          const effectiveSize = Math.max(maxSize, buildPlateMax)
          const distance = Math.max(effectiveSize * 1.4, 40)
          
          // Position camera at corner for birds-eye view
          // Offset to corner: move away from center in both X and Y
          const cornerOffset = effectiveSize * 0.45
          const newCameraPosition = [
            centerX + cornerOffset,   // Slightly towards right
            centerY + cornerOffset,   // Slightly towards front
            centerZ + distance * 0.9  // Higher Z for stronger top-down look
          ]
          
          console.log('Setting camera position:', newCameraPosition, 'for bounds:', result.bounds, 'buildPlateSize:', buildPlateSize)
          setCameraPosition(newCameraPosition)
        }
      } catch (error) {
        console.error('SimpleGcodeViewer3D: Error processing G-code:', error)
      } finally {
        setIsProcessing(false)
      }
    }

    processGcode()
  }, [content])

  // Calculate visible layers based on current layer
  const visibleLayers = useMemo(() => {
    if (!geometryData) return new Set()
    return new Set(Array.from({ length: currentLayer + 1 }, (_, i) => i))
  }, [currentLayer, geometryData])

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing G-code...</span>
        </div>
      </div>
    )
  }

  // Fallback if no geometry data
  if (!geometryData) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <div className="text-center">
          <div className="text-gray-500 mb-2">No G-code data to visualize</div>
          <div className="text-sm text-gray-400">Generate G-code first to see 3D preview</div>
          <div className="text-xs text-gray-400 mt-2">Content length: {content?.length || 0}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-lg border border-gray-300" style={{ width, height }}>
        <Canvas camera={{ position: cameraPosition, fov: 45 }}>
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            target={geometryData ? [
              (geometryData.bounds.min.x + geometryData.bounds.max.x) / 2,
              (geometryData.bounds.min.y + geometryData.bounds.max.y) / 2,
              (geometryData.bounds.min.z + geometryData.bounds.max.z) / 2
            ] : [0, 0, 0]}
            minDistance={5}
            maxDistance={500}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Scene
            geometryData={geometryData}
            visibleLayers={visibleLayers}
            showTravelMoves={showTravelMoves}
            buildPlateSize={buildPlateSize}
          />
        </Canvas>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow space-y-4">
          {/* Layer slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Layer: {currentLayer + 1} / {geometryData?.layers.length || 0}
            </label>
            <input
              type="range"
              min={0}
              max={(geometryData?.layers.length || 1) - 1}
              value={currentLayer}
              onChange={(e) => setCurrentLayer(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* View options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTravelMoves}
                  onChange={(e) => setShowTravelMoves(e.target.checked)}
                  className="rounded text-blue-500"
                />
                <span className="text-sm">Show Travel Moves</span>
              </label>
              <button
                onClick={() => {
                  if (geometryData?.bounds) {
                    const { min, max } = geometryData.bounds
                    const centerX = (min.x + max.x) / 2
                    const centerY = (min.y + max.y) / 2
                    const centerZ = (min.z + max.z) / 2
                    
                    const sizeX = max.x - min.x
                    const sizeY = max.y - min.y
                    const sizeZ = max.z - min.z
                    const maxSize = Math.max(sizeX, sizeY, sizeZ)
                    
                    // Use the larger of G-code size or build plate size for proper scaling
                    const buildPlateMax = Math.max(buildPlateSize.x, buildPlateSize.y)
                    const effectiveSize = Math.max(maxSize, buildPlateMax)
                    const distance = Math.max(effectiveSize * 1.2, 30)
                    
                    // Position camera at corner for birds-eye view
                    const cornerOffset = effectiveSize * 0.6
                    setCameraPosition([
                      centerX + cornerOffset,
                      centerY + cornerOffset,
                      centerZ + distance * 0.6
                    ])
                  }
                }}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Reset View
              </button>
            </div>
            
            {/* Quality Controls */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quality:</span>
              <div className="flex items-center space-x-2">
                <select
                  value={qualityLevel}
                  onChange={(e) => {
                    const newQuality = e.target.value
                    setQualityLevel(newQuality)
                    if (newQuality === 'low') setMaxPointsPerLayer(500)
                    else if (newQuality === 'medium') setMaxPointsPerLayer(1000)
                    else setMaxPointsPerLayer(2000)
                  }}
                  className="px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="low">Low (Fast)</option>
                  <option value="medium">Medium</option>
                  <option value="high">High (Slow)</option>
                </select>
                <button
                  onClick={() => {
                    if (content) {
                      setIsProcessing(true)
                      try {
                        const result = parseGcode(content, maxPointsPerLayer)
                        setGeometryData(result)
                        setCurrentLayer(result.layers.length - 1)
                      } catch (error) {
                        console.error('Error reprocessing G-code:', error)
                      } finally {
                        setIsProcessing(false)
                      }
                    }
                  }}
                  className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {geometryData && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Layers:</span>
            <span className="ml-2 font-medium">{geometryData.stats.totalLayers}</span>
          </div>
          <div>
            <span className="text-gray-500">Rendered Points:</span>
            <span className="ml-2 font-medium">{geometryData.stats.totalPoints}</span>
          </div>
          <div>
            <span className="text-gray-500">Quality Level:</span>
            <span className="ml-2 font-medium capitalize">{qualityLevel}</span>
          </div>
          <div>
            <span className="text-gray-500">Max Points/Layer:</span>
            <span className="ml-2 font-medium">{maxPointsPerLayer}</span>
          </div>
          <div>
            <span className="text-gray-500">Build Volume:</span>
            <span className="ml-2 font-medium">
              {Math.round(geometryData.bounds.max.x - geometryData.bounds.min.x)}x
              {Math.round(geometryData.bounds.max.y - geometryData.bounds.min.y)}x
              {Math.round(geometryData.bounds.max.z - geometryData.bounds.min.z)}mm
            </span>
          </div>
          <div>
            <span className="text-gray-500">Performance:</span>
            <span className="ml-2 font-medium">
              {qualityLevel === 'low' ? 'Fast' : qualityLevel === 'medium' ? 'Balanced' : 'Detailed'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export { SimpleGcodeViewer3D }

