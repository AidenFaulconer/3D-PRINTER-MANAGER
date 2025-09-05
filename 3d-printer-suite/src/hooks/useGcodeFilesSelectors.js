import useGcodeFilesStore from '../stores/gcodeFilesStore'

// Selector hooks for useGcodeFilesStore to prevent unnecessary re-renders
// Each hook only subscribes to the specific state it needs

// File management selectors
export const useGcodeFiles = () => useGcodeFilesStore(state => state.gcodeFiles)
export const useFileCount = () => useGcodeFilesStore(state => state.gcodeFiles.length)

export const useFileActions = () => useGcodeFilesStore(state => ({
  addFile: state.addFile,
  removeFile: state.removeFile,
  getFile: state.getFile
}))

// Print queue selectors
export const usePrintQueue = () => useGcodeFilesStore(state => state.printQueue)
export const usePrintQueueCount = () => useGcodeFilesStore(state => state.printQueue.length)
export const useQueuedFiles = () => useGcodeFilesStore(state => 
  state.printQueue.filter(item => item.status === 'queued')
)
export const usePrintingFiles = () => useGcodeFilesStore(state => 
  state.printQueue.filter(item => item.status === 'printing')
)
export const usePausedFiles = () => useGcodeFilesStore(state => 
  state.printQueue.filter(item => item.status === 'paused')
)
export const useCompletedFiles = () => useGcodeFilesStore(state => 
  state.printQueue.filter(item => item.status === 'completed')
)

export const useQueueActions = () => useGcodeFilesStore(state => ({
  addToQueue: state.addToQueue,
  removeFromQueue: state.removeFromQueue,
  updateQueueOrder: state.updateQueueOrder,
  getQueueItem: state.getQueueItem
}))

// Active print selectors
export const useActivePrint = () => useGcodeFilesStore(state => state.activePrint)
export const useIsPrinting = () => useGcodeFilesStore(state => !!state.activePrint)
export const usePrintProgress = () => useGcodeFilesStore(state => state.activePrint?.progress || 0)
export const usePrintStatus = () => useGcodeFilesStore(state => state.activePrint?.status || null)
export const usePrintStartTime = () => useGcodeFilesStore(state => state.activePrint?.startTime || null)
export const usePrintEstimatedEndTime = () => useGcodeFilesStore(state => state.activePrint?.estimatedEndTime || null)

export const usePrintActions = () => useGcodeFilesStore(state => ({
  startPrint: state.startPrint,
  pausePrint: state.pausePrint,
  resumePrint: state.resumePrint,
  stopPrint: state.stopPrint,
  completePrint: state.completePrint,
  updatePrintProgress: state.updatePrintProgress
}))

// File filtering and search selectors
export const useFilesByStatus = (status) => useGcodeFilesStore(state => 
  state.gcodeFiles.filter(file => file.status === status)
)

export const useFilesByType = (type) => useGcodeFilesStore(state => 
  state.gcodeFiles.filter(file => file.type === type)
)

export const useFilesByTag = (tag) => useGcodeFilesStore(state => 
  state.gcodeFiles.filter(file => file.tags?.includes(tag))
)

// Statistics selectors
export const useFileStatistics = () => useGcodeFilesStore(state => {
  const files = state.gcodeFiles
  const queue = state.printQueue
  
  return {
    totalFiles: files.length,
    totalSize: files.reduce((sum, file) => sum + (file.size || 0), 0),
    averageSize: files.length > 0 ? files.reduce((sum, file) => sum + (file.size || 0), 0) / files.length : 0,
    queueLength: queue.length,
    activePrints: queue.filter(item => item.status === 'printing').length,
    completedPrints: queue.filter(item => item.status === 'completed').length,
    failedPrints: queue.filter(item => item.status === 'failed').length
  }
})

// Utility selectors
export const useGetFile = () => useGcodeFilesStore(state => state.getFile)
export const useGetQueueItem = () => useGcodeFilesStore(state => state.getQueueItem)
export const useResetStore = () => useGcodeFilesStore(state => state.resetStore)
