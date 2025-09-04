import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { Line } from '@react-three/drei/core/Line'
import { Grid } from '@react-three/drei/core/Grid'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { Stats } from '@react-three/drei/core/Stats'
import { useThree, useFrame } from '@react-three/fiber'
import * as Comlink from 'comlink'
import GcodeLodManager from '../utils/GcodeLodManager'

// Import worker
const worker = new Worker(new URL('../workers/gcode.worker.js', import.meta.url), {
  type: 'module'
})
const GcodeGeometryWorker = Comlink.wrap(worker)

const MOVE_COLORS = {
  travel: new THREE.Color(0x808080), // Gray
  extrude: new THREE.Color(0x00ff00), // Green
  retract: new THREE.Color(0xff0000)  // Red
}

const Scene = ({ geometryData, visibleLayers, showTravelMoves }) => {
  const { camera, size } = useThree()
  const [currentGeometryData, setCurrentGeometryData] = useState(geometryData)
  const lodManagerRef = useRef(null)

  // Initialize LOD manager when geometry data changes
  useEffect(() => {
    if (geometryData) {
      lodManagerRef.current = new GcodeLodManager(geometryData)
      setCurrentGeometryData(geometryData)
    }
  }, [geometryData])

  // Update geometry based on camera distance
  useFrame(() => {
    if (!lodManagerRef.current) return

    const distance = camera.position.distanceTo(new THREE.Vector3())
    const newGeometryData = lodManagerRef.current.getGeometryForDistance(
      distance,
      Math.min(size.width, size.height)
    )
    
    if (newGeometryData !== currentGeometryData) {
      setCurrentGeometryData(newGeometryData)
    }
  })

  // Center camera on model when data changes
  useEffect(() => {
    if (geometryData?.bounds) {
      const { min, max } = geometryData.bounds
      const center = new THREE.Vector3(
        (min.x + max.x) / 2,
        (min.y + max.y) / 2,
        (min.z + max.z) / 2
      )
      const size = new THREE.Vector3(
        max.x - min.x,
        max.y - min.y,
        max.z - min.z
      )
      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      const distance = Math.abs(maxDim / Math.sin(fov / 2) / 2)

      camera.position.set(center.x, center.y + distance, center.z + distance)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    }
  }, [geometryData, camera])

  if (!currentGeometryData) return null

  return (
    <>
      {/* Build plate grid */}
      <Grid
        args={[1000, 1000]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#606060"
        sectionSize={50}
        sectionThickness={1}
        sectionColor="#808080"
        fadeDistance={1000}
        fadeStrength={1}
      />

      {/* Render layers */}
      {currentGeometryData.layers.map((layer, layerIndex) => {
        if (!visibleLayers.has(layerIndex)) return null

        return layer.points.map((_, i) => {
          if (i % 6 !== 0) return null // Skip duplicate points
          
          const moveType = layer.moveTypes[i / 6]
          if (moveType === 'travel' && !showTravelMoves) return null

          const points = [
            new THREE.Vector3(
              layer.points[i],
              layer.points[i + 1],
              layer.points[i + 2]
            ),
            new THREE.Vector3(
              layer.points[i + 3],
              layer.points[i + 4],
              layer.points[i + 5]
            )
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

const GcodeViewer3D = ({ content, width = 800, height = 600 }) => {
  const [geometryData, setGeometryData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentLayer, setCurrentLayer] = useState(0)
  const [showTravelMoves, setShowTravelMoves] = useState(true)
  const workerRef = useRef(null)

  // Initialize worker
  useEffect(() => {
    const initWorker = async () => {
      workerRef.current = await new GcodeGeometryWorker()
    }
    initWorker()

    return () => {
      if (workerRef.current) {
        worker.terminate()
      }
    }
  }, [])

  // Process G-code when content changes
  useEffect(() => {
    const processGcode = async () => {
      if (!content || !workerRef.current) return

      setIsProcessing(true)
      try {
        const result = await workerRef.current.convertToGeometry(content, {
          sampleRate: 1,
          simplifyThreshold: 0.1,
          maxPoints: 1000000
        })
        setGeometryData(result)
        setCurrentLayer(result.layers.length - 1) // Show all layers initially
      } catch (error) {
        console.error('Error processing G-code:', error)
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

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg shadow-lg" style={{ width, height }}>
        <Canvas>
          <Stats />
          <PerspectiveCamera makeDefault position={[0, 200, 200]} />
          <OrbitControls enableDamping dampingFactor={0.05} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={0.8} />
          <Scene
            geometryData={geometryData}
            visibleLayers={visibleLayers}
            showTravelMoves={showTravelMoves}
          />
        </Canvas>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg shadow space-y-4">
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
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showTravelMoves}
                onChange={(e) => setShowTravelMoves(e.target.checked)}
                className="rounded text-blue-500"
              />
              <span className="text-sm">Show Travel Moves</span>
            </label>
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
            <span className="text-gray-500">Total Points:</span>
            <span className="ml-2 font-medium">{geometryData.stats.totalPoints}</span>
          </div>
          <div>
            <span className="text-gray-500">Build Volume:</span>
            <span className="ml-2 font-medium">
              {Math.round(geometryData.bounds.max.x - geometryData.bounds.min.x)}x
              {Math.round(geometryData.bounds.max.y - geometryData.bounds.min.y)}x
              {Math.round(geometryData.bounds.max.z - geometryData.bounds.min.z)}mm
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export { GcodeViewer3D }
