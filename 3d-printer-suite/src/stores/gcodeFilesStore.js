import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const useGcodeFilesStore = create(
  devtools(
    persist(
      (set, get) => ({
      // State
      gcodeFiles: [], // Array of { id, name, size, uploadDate, content, estimatedPrintTime }
      printQueue: [], // Array of { fileId, status, addedDate, startDate, endDate }
      activePrint: null, // { fileId, progress, startTime, estimatedEndTime, status }

      // Actions
      addFile: (file) => {
        const newFile = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          uploadDate: new Date().toISOString(),
          content: file.content,
          estimatedPrintTime: file.estimatedPrintTime || null
        }

        set((state) => ({
          gcodeFiles: [...state.gcodeFiles, newFile]
        }))

        return newFile.id
      },

      removeFile: (fileId) => {
        set((state) => ({
          gcodeFiles: state.gcodeFiles.filter((file) => file.id !== fileId),
          // Also remove from queue if present
          printQueue: state.printQueue.filter((item) => item.fileId !== fileId)
        }))
      },

      addToQueue: (fileId) => {
        const file = get().gcodeFiles.find((f) => f.id === fileId)
        if (!file) return

        const queueItem = {
          fileId,
          status: 'queued',
          addedDate: new Date().toISOString(),
          startDate: null,
          endDate: null
        }

        set((state) => ({
          printQueue: [...state.printQueue, queueItem]
        }))
      },

      removeFromQueue: (fileId) => {
        set((state) => ({
          printQueue: state.printQueue.filter((item) => item.fileId !== fileId)
        }))
      },

      updateQueueOrder: (newOrder) => {
        set((state) => {
          const updatedQueue = newOrder.map(fileId => 
            state.printQueue.find(item => item.fileId === fileId)
          ).filter(Boolean)
          return { printQueue: updatedQueue }
        })
      },

      startPrint: (fileId) => {
        const file = get().gcodeFiles.find((f) => f.id === fileId)
        if (!file) return

        // Update queue item status
        set((state) => ({
          printQueue: state.printQueue.map((item) =>
            item.fileId === fileId
              ? { ...item, status: 'printing', startDate: new Date().toISOString() }
              : item
          ),
          activePrint: {
            fileId,
            progress: 0,
            startTime: new Date().toISOString(),
            estimatedEndTime: file.estimatedPrintTime 
              ? new Date(Date.now() + file.estimatedPrintTime * 1000).toISOString()
              : null,
            status: 'printing'
          }
        }))
      },

      pausePrint: () => {
        set((state) => {
          if (!state.activePrint) return state

          return {
            printQueue: state.printQueue.map((item) =>
              item.fileId === state.activePrint.fileId
                ? { ...item, status: 'paused' }
                : item
            ),
            activePrint: {
              ...state.activePrint,
              status: 'paused'
            }
          }
        })
      },

      resumePrint: () => {
        set((state) => {
          if (!state.activePrint) return state

          return {
            printQueue: state.printQueue.map((item) =>
              item.fileId === state.activePrint.fileId
                ? { ...item, status: 'printing' }
                : item
            ),
            activePrint: {
              ...state.activePrint,
              status: 'printing'
            }
          }
        })
      },

      stopPrint: () => {
        set((state) => {
          if (!state.activePrint) return state

          return {
            printQueue: state.printQueue.map((item) =>
              item.fileId === state.activePrint.fileId
                ? { 
                    ...item, 
                    status: 'cancelled',
                    endDate: new Date().toISOString()
                  }
                : item
            ),
            activePrint: null
          }
        })
      },

      completePrint: () => {
        set((state) => {
          if (!state.activePrint) return state

          return {
            printQueue: state.printQueue.map((item) =>
              item.fileId === state.activePrint.fileId
                ? { 
                    ...item, 
                    status: 'completed',
                    endDate: new Date().toISOString()
                  }
                : item
            ),
            activePrint: null
          }
        })
      },

      updatePrintProgress: (progress) => {
        set((state) => {
          if (!state.activePrint) return state

          return {
            activePrint: {
              ...state.activePrint,
              progress
            }
          }
        })
      },

      // Getters
      getFile: (fileId) => {
        return get().gcodeFiles.find((file) => file.id === fileId)
      },

      getQueueItem: (fileId) => {
        return get().printQueue.find((item) => item.fileId === fileId)
      },

      // Reset store
      resetStore: () => {
        set({
          gcodeFiles: [],
          printQueue: [],
          activePrint: null
        })
      }
      }),
      {
        name: 'gcode-files-storage',
        partialize: (state) => ({
          gcodeFiles: state.gcodeFiles.map(file => ({
            ...file,
            // Don't persist the actual file content to localStorage
            content: undefined
          })),
          printQueue: state.printQueue,
          // Don't persist active print state
          activePrint: null
        })
      }
    ),
    {
      name: 'GcodeFilesStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

export default useGcodeFilesStore
