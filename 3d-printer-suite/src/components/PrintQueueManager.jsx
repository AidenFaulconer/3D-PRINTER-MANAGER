import React, { useCallback, useEffect } from 'react'
import useGcodeFilesStore from '../stores/gcodeFilesStore'
import useGcodeStreaming from '../hooks/useGcodeStreaming'
import useSerialConnection from '../hooks/useSerialConnection'

const PrintQueueManager = () => {
  const {
    gcodeFiles,
    printQueue,
    activePrint,
    removeFromQueue,
    updateQueueOrder,
    startPrint,
    pausePrint,
    resumePrint,
    stopPrint,
    completePrint
  } = useGcodeFilesStore()

  const { status: connectionStatus } = useSerialConnection()
  const { 
    streamGcode,
    pauseStreaming,
    resumeStreaming,
    stopStreaming,
    getStreamingStatus
  } = useGcodeStreaming()

  // Handle print start
  const handleStartPrint = useCallback(async (fileId) => {
    if (connectionStatus !== 'connected') {
      alert('Please connect to the printer first')
      return
    }

    const file = gcodeFiles.find(f => f.id === fileId)
    if (!file) return

    try {
      startPrint(fileId)
      await streamGcode(fileId, file.content)
    } catch (error) {
      console.error('Failed to start print:', error)
      stopPrint()
    }
  }, [connectionStatus, gcodeFiles, startPrint, streamGcode, stopPrint])

  // Handle print controls
  const handlePausePrint = useCallback(() => {
    pausePrint()
    pauseStreaming()
  }, [pausePrint, pauseStreaming])

  const handleResumePrint = useCallback(() => {
    resumePrint()
    resumeStreaming()
  }, [resumePrint, resumeStreaming])

  const handleStopPrint = useCallback(() => {
    stopPrint()
    stopStreaming()
  }, [stopPrint, stopStreaming])

  // Monitor streaming status
  useEffect(() => {
    const checkStreamingStatus = () => {
      const status = getStreamingStatus()
      if (status.active && activePrint) {
        // Print is complete
        if (status.progress >= 100) {
          completePrint()
        }
      }
    }

    const interval = setInterval(checkStreamingStatus, 1000)
    return () => clearInterval(interval)
  }, [activePrint, completePrint, getStreamingStatus])

  const handleDragStart = (e, fileId) => {
    e.dataTransfer.setData('text/plain', fileId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = useCallback((e, targetFileId) => {
    e.preventDefault()
    const draggedFileId = e.dataTransfer.getData('text/plain')
    
    // Get current queue order
    const currentOrder = printQueue.map(item => item.fileId)
    
    // Find indices
    const fromIndex = currentOrder.indexOf(draggedFileId)
    const toIndex = currentOrder.indexOf(targetFileId)
    
    if (fromIndex === -1 || toIndex === -1) return
    
    // Create new order
    const newOrder = [...currentOrder]
    newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, draggedFileId)
    
    // Update queue order
    updateQueueOrder(newOrder)
  }, [printQueue, updateQueueOrder])

  const formatTime = (isoString) => {
    if (!isoString) return ''
    return new Date(isoString).toLocaleTimeString()
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'printing': return 'text-green-500'
      case 'paused': return 'text-yellow-500'
      case 'completed': return 'text-blue-500'
      case 'failed': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Active Print */}
      {activePrint && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Currently Printing</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {gcodeFiles.find(f => f.id === activePrint.fileId)?.name}
              </span>
              <span className={getStatusColor(activePrint.status)}>
                {activePrint.status.charAt(0).toUpperCase() + activePrint.status.slice(1)}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${activePrint.progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Started: {formatTime(activePrint.startTime)}</span>
              <span>
                Est. completion: {formatTime(activePrint.estimatedEndTime)}
              </span>
            </div>

            {/* Control buttons */}
            <div className="flex space-x-2 mt-2">
              {activePrint.status === 'printing' ? (
                <button
                  onClick={handlePausePrint}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={handleResumePrint}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Resume
                </button>
              )}
              <button
                onClick={handleStopPrint}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Queue */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Print Queue</h3>
        </div>
        
        <div className="divide-y">
          {printQueue.map((item) => {
            const file = gcodeFiles.find(f => f.id === item.fileId)
            if (!file) return null

            return (
              <div
                key={item.fileId}
                className="p-4 flex items-center justify-between hover:bg-gray-50"
                draggable
                onDragStart={(e) => handleDragStart(e, item.fileId)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.fileId)}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{file.name}</span>
                    <span className={`ml-2 text-sm ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span className="mx-2">•</span>
                    <span>Est. time: {formatDuration(file.estimatedPrintTime)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {item.status === 'queued' && !activePrint && (
                    <button
                      onClick={() => handleStartPrint(item.fileId)}
                      disabled={connectionStatus !== 'connected'}
                      className={`p-2 ${
                        connectionStatus === 'connected'
                          ? 'text-green-500 hover:bg-green-50'
                          : 'text-gray-400 cursor-not-allowed'
                      } rounded`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeFromQueue(item.fileId)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}

          {printQueue.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No files in queue
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PrintQueueManager
