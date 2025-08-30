import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types for better code organization (these would be TypeScript interfaces in a TS project)
// Printer object structure
// interface Printer {
//   id: string
//   name: string
//   model: string
//   firmware: string
//   bedSize: { x: number, y: number, z: number }
//   calibrationSteps: Record<string, any>
//   firmwareConfiguration: Record<string, any>
// }

const usePrintersStore = create(
  persist(
    (set, get) => ({
      // State
      printers: [],
      activePrinterId: null,

      // Actions
      addPrinter: (printerData) => {
        const newPrinter = {
          id: crypto.randomUUID(),
          name: printerData.name || 'New Printer',
          model: printerData.model || 'Unknown Model',
          firmware: printerData.firmware || 'Unknown Firmware',
          bedSize: printerData.bedSize || { x: 220, y: 220, z: 250 },
          calibrationSteps: printerData.calibrationSteps || {},
          firmwareConfiguration: printerData.firmwareConfiguration || {},
          ...printerData
        }

        set((state) => ({
          printers: [...state.printers, newPrinter],
          activePrinterId: newPrinter.id
        }))
      },

      updatePrinter: (id, updates) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === id ? { ...printer, ...updates } : printer
          )
        }))
      },

      deletePrinter: (id) => {
        set((state) => {
          const newPrinters = state.printers.filter((printer) => printer.id !== id)
          let newActivePrinterId = state.activePrinterId

          // If we're deleting the active printer, set a new active printer
          if (state.activePrinterId === id) {
            newActivePrinterId = newPrinters.length > 0 ? newPrinters[0].id : null
          }

          return {
            printers: newPrinters,
            activePrinterId: newActivePrinterId
          }
        })
      },

      setActivePrinter: (id) => {
        set({ activePrinterId: id })
      },

      updateCalibrationStep: (printerId, stepName, data) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  calibrationSteps: {
                    ...printer.calibrationSteps,
                    [stepName]: {
                      ...printer.calibrationSteps[stepName],
                      ...data,
                      lastUpdated: new Date().toISOString()
                    }
                  }
                }
              : printer
          )
        }))
      },

      // Getters
      getActivePrinter: () => {
        const state = get()
        return state.printers.find((printer) => printer.id === state.activePrinterId)
      },

      getPrinterById: (id) => {
        const state = get()
        return state.printers.find((printer) => printer.id === id)
      },

      // Utility actions
      resetStore: () => {
        set({ printers: [], activePrinterId: null })
      }
    }),
    {
      name: '3d-printer-suite-storage', // unique name for localStorage key
      partialize: (state) => ({
        printers: state.printers,
        activePrinterId: state.activePrinterId
      })
    }
  )
)

export default usePrintersStore
