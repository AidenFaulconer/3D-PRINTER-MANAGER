import usePrintHistoryStore from '../stores/printHistoryStore'

// Selector hooks for usePrintHistoryStore to prevent unnecessary re-renders
// Each hook only subscribes to the specific state it needs

// Print history selectors
export const usePrintHistory = () => usePrintHistoryStore(state => state.printHistory)
export const usePrintHistoryCount = () => usePrintHistoryStore(state => state.printHistory.length)

export const usePrintHistoryActions = () => usePrintHistoryStore(state => ({
  addPrintRecord: state.addPrintRecord,
  updatePrintRecord: state.updatePrintRecord,
  deletePrintRecord: state.deletePrintRecord,
  addPrintNote: state.addPrintNote,
  updatePrintRating: state.updatePrintRating,
  getPrintRecord: state.getPrintRecord
}))

// Statistics selectors
export const usePrintStatistics = () => usePrintHistoryStore(state => state.statistics)
export const useTotalPrints = () => usePrintHistoryStore(state => state.statistics.totalPrints)
export const useSuccessfulPrints = () => usePrintHistoryStore(state => state.statistics.successfulPrints)
export const useFailedPrints = () => usePrintHistoryStore(state => state.statistics.failedPrints)
export const useTotalPrintTime = () => usePrintHistoryStore(state => state.statistics.totalPrintTime)
export const useAveragePrintTime = () => usePrintHistoryStore(state => state.statistics.averagePrintTime)
export const useFilamentUsed = () => usePrintHistoryStore(state => state.statistics.filamentUsed)

// Success rate selectors
export const useSuccessRate = () => usePrintHistoryStore(state => {
  const { totalPrints, successfulPrints } = state.statistics
  return totalPrints > 0 ? (successfulPrints / totalPrints) * 100 : 0
})

export const useFailureRate = () => usePrintHistoryStore(state => {
  const { totalPrints, failedPrints } = state.statistics
  return totalPrints > 0 ? (failedPrints / totalPrints) * 100 : 0
})

// Filtered history selectors
export const usePrintsByStatus = (status) => usePrintHistoryStore(state => 
  state.printHistory.filter(record => record.status === status)
)

export const useCompletedPrints = () => usePrintHistoryStore(state => 
  state.printHistory.filter(record => record.status === 'completed')
)

export const useFailedPrintRecords = () => usePrintHistoryStore(state => 
  state.printHistory.filter(record => record.status === 'failed')
)

export const useCancelledPrints = () => usePrintHistoryStore(state => 
  state.printHistory.filter(record => record.status === 'cancelled')
)

// Time-based selectors
export const usePrintsByDateRange = (startDate, endDate) => usePrintHistoryStore(state => 
  state.printHistory.filter(record => {
    const recordDate = new Date(record.timestamp)
    return recordDate >= startDate && recordDate <= endDate
  })
)

export const useRecentPrints = (days = 7) => usePrintHistoryStore(state => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  return state.printHistory.filter(record => 
    new Date(record.timestamp) >= cutoffDate
  )
})

// Rating selectors
export const usePrintsByRating = (rating) => usePrintHistoryStore(state => 
  state.printHistory.filter(record => record.rating === rating)
)

export const useAverageRating = () => usePrintHistoryStore(state => {
  const ratedPrints = state.printHistory.filter(record => record.rating !== undefined)
  if (ratedPrints.length === 0) return 0
  return ratedPrints.reduce((sum, record) => sum + record.rating, 0) / ratedPrints.length
})

// Material selectors
export const usePrintsByMaterial = (material) => usePrintHistoryStore(state => 
  state.printHistory.filter(record => record.material === material)
)

export const useMaterialUsage = () => usePrintHistoryStore(state => {
  const materialCounts = {}
  state.printHistory.forEach(record => {
    if (record.material) {
      materialCounts[record.material] = (materialCounts[record.material] || 0) + 1
    }
  })
  return materialCounts
})

// Duration selectors
export const usePrintsByDuration = (minDuration, maxDuration) => usePrintHistoryStore(state => 
  state.printHistory.filter(record => {
    const duration = record.duration || 0
    return duration >= minDuration && duration <= maxDuration
  })
)

export const useLongestPrint = () => usePrintHistoryStore(state => 
  state.printHistory.reduce((longest, record) => 
    (record.duration || 0) > (longest.duration || 0) ? record : longest, 
    { duration: 0 }
  )
)

export const useShortestPrint = () => usePrintHistoryStore(state => 
  state.printHistory.reduce((shortest, record) => 
    (record.duration || Infinity) < (shortest.duration || Infinity) ? record : shortest, 
    { duration: Infinity }
  )
)

// Utility selectors
export const useGetPrintRecord = () => usePrintHistoryStore(state => state.getPrintRecord)
export const useGetStatistics = () => usePrintHistoryStore(state => state.getStatistics)
export const useResetStore = () => usePrintHistoryStore(state => state.resetStore)
