import React, { useEffect, useState } from 'react'
import { GcodeViewer3D } from './GcodeViewer3D'
import usePrintMonitor from '../hooks/usePrintMonitor'
import useGcodeFilesStore from '../stores/gcodeFilesStore'
import useSerialStore from '../stores/serialStore'
import BedLevelVisualization from './BedLevelVisualization'

const PrintMonitorDashboard = () => {
  const {
    printerState,
    temperatures,
    pausePrint,
    resumePrint,
    emergencyStop,
    adjustZOffset
  } = usePrintMonitor()

  const { activePrint, getFile } = useGcodeFilesStore()
  const sendCommand = useSerialStore(state => state.sendCommand)
  const [startTime, setStartTime] = useState(null)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(null)

  const handleBackToControl = () => {
    window.location.hash = '#/control'
  }

  // Initialize start time when print begins
  useEffect(() => {
    if (activePrint && !startTime) {
      setStartTime(new Date())
    } else if (!activePrint) {
      setStartTime(null)
    }
  }, [activePrint, startTime])

  // Update estimated time remaining
  useEffect(() => {
    if (!activePrint || !startTime) {
      setEstimatedTimeRemaining(null)
      return
    }

    const file = getFile(activePrint.fileId)
    if (!file?.estimatedPrintTime) return

    const elapsed = (new Date() - startTime) / 1000
    const remaining = Math.max(0, file.estimatedPrintTime - elapsed)
    setEstimatedTimeRemaining(remaining)

    const timer = setInterval(() => {
      const elapsed = (new Date() - startTime) / 1000
      const remaining = Math.max(0, file.estimatedPrintTime - elapsed)
      setEstimatedTimeRemaining(remaining)
    }, 1000)

    return () => clearInterval(timer)
  }, [activePrint, startTime, getFile])

  const formatTime = (seconds) => {
    if (!seconds) return '--:--:--'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (!activePrint) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Print Monitor</h2>
          <button
            onClick={handleBackToControl}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Control Panel
          </button>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <p className="text-lg mb-2">No active print</p>
          <p className="text-sm">Start a print from the control panel to monitor its progress here.</p>
        </div>
      </div>
    )
  }

  const file = getFile(activePrint.fileId)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Print Monitor</h2>
        <button
          onClick={handleBackToControl}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Control Panel
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left column - Print visualization */}
      <div className="space-y-4">
        {/* 3D Viewer */}
        <div className="bg-black rounded-lg shadow-lg">
          <GcodeViewer3D
            content={file?.content}
            width="100%"
            height={400}
            currentPosition={printerState.position}
            highlightedLayer={Math.floor(activePrint.progress * file?.layerCount || 0)}
          />
        </div>

        {/* Print Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Print Controls</h3>
          
          {/* Basic Controls */}
          <div className="flex space-x-2">
            {printerState.isPaused ? (
              <button
                onClick={resumePrint}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Resume Print
              </button>
            ) : (
              <button
                onClick={pausePrint}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Pause Print
              </button>
            )}
            <button
              onClick={() => emergencyStop()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Emergency Stop
            </button>
          </div>

          {/* Z Offset Adjustment */}
          <div className="space-y-2">
            <h4 className="font-medium">Z Offset Adjustment</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => adjustZOffset(-0.1)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                -0.1mm
              </button>
              <button
                onClick={() => adjustZOffset(-0.05)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                -0.05mm
              </button>
              <button
                onClick={() => adjustZOffset(0.05)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +0.05mm
              </button>
              <button
                onClick={() => adjustZOffset(0.1)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +0.1mm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right column - Print status and info */}
      <div className="space-y-4">
        {/* Print Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Print Progress</h3>
          
          <div className="space-y-4">
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span>{Math.round(activePrint.progress)}%</span>
                <span>Layer {Math.floor(activePrint.progress * file?.layerCount || 0)} / {file?.layerCount}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${activePrint.progress}%` }}
                />
              </div>
            </div>

            {/* Time information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Elapsed Time</p>
                <p className="font-medium">
                  {startTime ? formatTime((new Date() - startTime) / 1000) : '--:--:--'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Time</p>
                <p className="font-medium">
                  {formatTime(estimatedTimeRemaining)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Monitor */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Temperatures</h3>
          
          <div className="space-y-4">
            {/* Hotend temperature */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Hotend</span>
                <span className="text-sm font-medium">
                  {temperatures.hotend?.current}°C / {temperatures.hotend?.target}°C
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{
                    width: `${(temperatures.hotend?.current / Math.max(temperatures.hotend?.target, 250)) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Bed temperature */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Bed</span>
                <span className="text-sm font-medium">
                  {temperatures.bed?.current}°C / {temperatures.bed?.target}°C
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{
                    width: `${(temperatures.bed?.current / Math.max(temperatures.bed?.target, 100)) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Position Monitor */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Position</h3>
          
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">X</p>
              <p className="font-medium">{printerState.position.x.toFixed(2)}mm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Y</p>
              <p className="font-medium">{printerState.position.y.toFixed(2)}mm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Z</p>
              <p className="font-medium">{printerState.position.z.toFixed(2)}mm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">E</p>
              <p className="font-medium">{printerState.position.e.toFixed(2)}mm</p>
            </div>
          </div>
        </div>

        {/* Bed Leveling Visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bed Leveling</h3>
            <button 
              onClick={() => sendCommand('M503')}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
          <BedLevelVisualization />
        </div>

        {/* Error Display */}
        {printerState.lastError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-600 font-semibold mb-2">Error</h3>
            <p className="text-red-600">{printerState.lastError}</p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default PrintMonitorDashboard
