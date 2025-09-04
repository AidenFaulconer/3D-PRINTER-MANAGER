import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const usePrintHistoryStore = create(
  devtools(
    persist(
      (set, get) => ({
      // State
      printHistory: [], // Array of print records
      statistics: {
        totalPrints: 0,
        successfulPrints: 0,
        failedPrints: 0,
        totalPrintTime: 0,
        averagePrintTime: 0,
        filamentUsed: 0
      },

      // Actions
      addPrintRecord: (record) => {
        const newRecord = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ...record
        }

        set((state) => {
          const newHistory = [...state.printHistory, newRecord]
          
          // Update statistics
          const stats = {
            totalPrints: state.statistics.totalPrints + 1,
            successfulPrints: state.statistics.successfulPrints + (record.status === 'completed' ? 1 : 0),
            failedPrints: state.statistics.failedPrints + (record.status === 'failed' ? 1 : 0),
            totalPrintTime: state.statistics.totalPrintTime + (record.duration || 0),
            filamentUsed: state.statistics.filamentUsed + (record.filamentUsed || 0)
          }

          stats.averagePrintTime = stats.totalPrintTime / stats.totalPrints

          return {
            printHistory: newHistory,
            statistics: stats
          }
        })

        return newRecord.id
      },

      updatePrintRecord: (id, updates) => {
        set((state) => {
          const recordIndex = state.printHistory.findIndex(r => r.id === id)
          if (recordIndex === -1) return state

          const oldRecord = state.printHistory[recordIndex]
          const newRecord = { ...oldRecord, ...updates }
          const newHistory = [...state.printHistory]
          newHistory[recordIndex] = newRecord

          // Update statistics if status changed
          let stats = { ...state.statistics }
          if (updates.status && updates.status !== oldRecord.status) {
            if (oldRecord.status === 'completed') stats.successfulPrints--
            if (oldRecord.status === 'failed') stats.failedPrints--
            if (updates.status === 'completed') stats.successfulPrints++
            if (updates.status === 'failed') stats.failedPrints++
          }

          // Update time and filament statistics
          if (updates.duration !== undefined || updates.filamentUsed !== undefined) {
            stats.totalPrintTime += (updates.duration || 0) - (oldRecord.duration || 0)
            stats.filamentUsed += (updates.filamentUsed || 0) - (oldRecord.filamentUsed || 0)
            stats.averagePrintTime = stats.totalPrintTime / state.statistics.totalPrints
          }

          return {
            printHistory: newHistory,
            statistics: stats
          }
        })
      },

      deletePrintRecord: (id) => {
        set((state) => {
          const record = state.printHistory.find(r => r.id === id)
          if (!record) return state

          const newHistory = state.printHistory.filter(r => r.id !== id)
          
          // Update statistics
          const stats = {
            totalPrints: state.statistics.totalPrints - 1,
            successfulPrints: state.statistics.successfulPrints - (record.status === 'completed' ? 1 : 0),
            failedPrints: state.statistics.failedPrints - (record.status === 'failed' ? 1 : 0),
            totalPrintTime: state.statistics.totalPrintTime - (record.duration || 0),
            filamentUsed: state.statistics.filamentUsed - (record.filamentUsed || 0)
          }

          stats.averagePrintTime = stats.totalPrints > 0
            ? stats.totalPrintTime / stats.totalPrints
            : 0

          return {
            printHistory: newHistory,
            statistics: stats
          }
        })
      },

      addPrintNote: (id, note) => {
        set((state) => ({
          printHistory: state.printHistory.map(record =>
            record.id === id
              ? {
                  ...record,
                  notes: [...(record.notes || []), {
                    id: crypto.randomUUID(),
                    text: note,
                    timestamp: new Date().toISOString()
                  }]
                }
              : record
          )
        }))
      },

      updatePrintRating: (id, rating) => {
        set((state) => ({
          printHistory: state.printHistory.map(record =>
            record.id === id
              ? { ...record, rating }
              : record
          )
        }))
      },

      // Getters
      getPrintRecord: (id) => {
        return get().printHistory.find(record => record.id === id)
      },

      getStatistics: () => {
        return get().statistics
      },

      // Reset store
      resetStore: () => {
        set({
          printHistory: [],
          statistics: {
            totalPrints: 0,
            successfulPrints: 0,
            failedPrints: 0,
            totalPrintTime: 0,
            averagePrintTime: 0,
            filamentUsed: 0
          }
        })
      }
      }),
      {
        name: 'print-history-storage'
      }
    ),
    {
      name: 'PrintHistoryStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

export default usePrintHistoryStore
