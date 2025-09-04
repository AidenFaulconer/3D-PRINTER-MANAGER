import React, { useMemo } from 'react'
import useSerialStore from '../stores/serialStore'

const BedLevelVisualization = React.memo(() => {
  // Subscribe to bed mesh data from store
  const bedMesh = useSerialStore(state => state.bedMesh)
  const fetchBedLevel = useSerialStore(state => state.fetchBedLevel)
  const runBedLeveling = useSerialStore(state => state.runBedLeveling)
  const processCollectedBedMeshData = useSerialStore(state => state.processCollectedBedMeshData)
  const fetchAllPrinterSettings = useSerialStore(state => state.fetchAllPrinterSettings)
  const serialStatus = useSerialStore(state => state.status)

  // Use stored bed mesh data or show placeholder
  const bedData = useMemo(() => {
    if (bedMesh.data.length > 0) {
      return {
        mesh: bedMesh.data,
        gridSize: bedMesh.gridSize,
        min: bedMesh.min,
        max: bedMesh.max,
        range: bedMesh.range
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

  const maxDeviation = Math.max(...bedData.mesh.flat().map(Math.abs))
  const minDeviation = Math.min(...bedData.mesh.flat())

  const getColor = (value) => {
    const normalized = (value - minDeviation) / (maxDeviation - minDeviation)
    if (normalized < 0.33) return 'bg-green-500'
    if (normalized < 0.66) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-4">
      {bedMesh.data.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 mb-3">No bed leveling data available</p>
          <div className="space-y-2">
            <button 
              onClick={runBedLeveling}
              disabled={serialStatus !== 'connected'}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Run Auto Bed Leveling (G29)
            </button>
            <div className="text-xs text-gray-400">or</div>
            <button 
              onClick={fetchBedLevel}
              disabled={serialStatus !== 'connected'}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Fetch Existing Data (M503)
            </button>
            <div className="text-xs text-gray-400">or</div>
            <button 
              onClick={processCollectedBedMeshData}
              className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Process Collected Data
            </button>
            <div className="text-xs text-gray-400">or</div>
            <button 
              onClick={fetchAllPrinterSettings}
              disabled={serialStatus !== 'connected'}
              className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Fetch All Settings (M503)
            </button>
          </div>
          {serialStatus !== 'connected' && (
            <p className="text-xs text-red-500 mt-2">Connect to printer first</p>
          )}
        </div>
      ) : (
        <>
          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
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
          
          {/* Bed level grid visualization */}
          <div 
            className="grid gap-1 max-w-xs mx-auto"
            style={{
              gridTemplateColumns: `repeat(${bedData.gridSize.x}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${bedData.gridSize.y}, minmax(0, 1fr))`
            }}
          >
            {bedData.mesh.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-8 w-8 rounded border flex items-center justify-center text-xs text-white font-mono ${getColor(value)}`}
                  title={`X${colIndex} Y${rowIndex}: ${value.toFixed(3)}mm`}
                >
                  {value.toFixed(2)}
                </div>
              ))
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
        </>
      )}
    </div>
  )
})

export default BedLevelVisualization