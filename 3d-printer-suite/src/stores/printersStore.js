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
      
      // Serial connection state
      serialPort: null,
      serialStatus: 'disconnected', // 'disconnected' | 'connecting' | 'connected'
      serialBaudRate: 115200,
      serialAutoDetect: true,
      serialError: null,
      serialLog: [], // { timestamp, message, direction: 'tx' | 'rx' | 'sys' | 'err' }
      temperatures: {
        hotend: { current: 0, target: 0 },
        bed: { current: 0, target: 0 },
        timestamp: Date.now()
      },
      temperatureHistory: [], // Array of temperature readings

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
          slicerProfiles: printerData.slicerProfiles || {
            curaPath: '',
            profiles: [],
            materials: []
          },
          macros: printerData.macros || [],
          calibrationHistory: printerData.calibrationHistory || [],
          ...printerData
        }

        set((state) => ({
          printers: [...state.printers, newPrinter],
          activePrinterId: newPrinter.id
        }))
      },
      // Macro management
      addMacro: (printerId, macro) => {
        const newMacro = {
          id: crypto.randomUUID(),
          name: macro.name || 'New Macro',
          description: macro.description || '',
          commands: macro.commands || [],
          isFavorite: !!macro.isFavorite,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? { ...printer, macros: [...(printer.macros||[]), newMacro] }
              : printer
          )
        }))
      },

      updateMacro: (printerId, macroId, updates) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  macros: (printer.macros||[]).map((m) =>
                    m.id === macroId ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
                  )
                }
              : printer
          )
        }))
      },

      deleteMacro: (printerId, macroId) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? { ...printer, macros: (printer.macros||[]).filter((m) => m.id !== macroId) }
              : printer
          )
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
                      lastUpdated: new Date().toISOString(),
                      activeTab: data.activeTab || printer.calibrationSteps[stepName]?.activeTab || 'Instructions'
                    }
                  },
                  calibrationHistory: [
                    ...((printer.calibrationHistory)||[]),
                    {
                      id: crypto.randomUUID(),
                      stepId: stepName,
                      timestamp: new Date().toISOString(),
                      results: data.results || null,
                      inputs: data.inputValues || null
                    }
                  ]
                }
              : printer
          )
        }))
      },

      // Issue management actions
      addIssue: (printerId, issueData) => {
        const newIssue = {
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          status: 'open',
          resolvedTimestamp: null,
          followUpActions: [],
          ...issueData
        }

        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  issues: [...(printer.issues || []), newIssue]
                }
              : printer
          )
        }))

        return newIssue.id
      },

      updateIssue: (printerId, issueId, updates) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  issues: printer.issues?.map((issue) =>
                    issue.id === issueId
                      ? {
                          ...issue,
                          ...updates,
                          // Auto-set resolvedTimestamp when status changes to resolved
                          ...(updates.status === 'resolved' && issue.status !== 'resolved' 
                            ? { resolvedTimestamp: new Date().toISOString() }
                            : {}),
                          // Clear resolvedTimestamp when status changes from resolved
                          ...(updates.status !== 'resolved' && issue.status === 'resolved'
                            ? { resolvedTimestamp: null }
                            : {})
                        }
                      : issue
                  ) || []
                }
              : printer
          )
        }))
      },

      deleteIssue: (printerId, issueId) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  issues: printer.issues?.filter((issue) => issue.id !== issueId) || []
                }
              : printer
          )
        }))
      },

      addFollowUpAction: (printerId, issueId, actionDescription) => {
        const newAction = {
          id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          description: actionDescription,
          completed: false,
          timestamp: new Date().toISOString()
        }

        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  issues: printer.issues?.map((issue) =>
                    issue.id === issueId
                      ? {
                          ...issue,
                          followUpActions: [...issue.followUpActions, newAction]
                        }
                      : issue
                  ) || []
                }
              : printer
          )
        }))
      },

      updateFollowUpAction: (printerId, issueId, actionId, completed) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  issues: printer.issues?.map((issue) =>
                    issue.id === issueId
                      ? {
                          ...issue,
                          followUpActions: issue.followUpActions.map((action) =>
                            action.id === actionId
                              ? { ...action, completed }
                              : action
                          )
                        }
                      : issue
                  ) || []
                }
              : printer
          )
        }))
      },

      // Profile management actions
      addProfile: (printerId, profileData) => {
        const newProfile = {
          id: crypto.randomUUID(),
          name: profileData.name || 'New Profile',
          type: profileData.type || 'quality',
          settings: profileData.settings || {},
          isActive: profileData.isActive || false,
          materialId: profileData.materialId || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...profileData
        }

        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    profiles: [...printer.slicerProfiles.profiles, newProfile]
                  }
                }
              : printer
          )
        }))
      },

      updateProfile: (printerId, profileId, updates) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    profiles: printer.slicerProfiles.profiles.map((profile) => {
                      if (profile.id === profileId) {
                        const updatedProfile = { ...profile, ...updates, updatedAt: new Date().toISOString() }
                        
                        // Add to history if settings changed
                        if (updates.settings) {
                          const historyEntry = {
                            id: crypto.randomUUID(),
                            timestamp: new Date().toISOString(),
                            changes: Object.keys(updates.settings || {}),
                            snapshot: { ...updatedProfile.settings },
                            source: updates.source || 'manual'
                          }
                          
                          updatedProfile.history = [
                            ...(profile.history || []).slice(-9), // Keep last 9 entries
                            historyEntry
                          ]
                        }
                        
                        return updatedProfile
                      }
                      return profile
                    })
                  }
                }
              : printer
          )
        }))
      },

      deleteProfile: (printerId, profileId) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    profiles: printer.slicerProfiles.profiles.filter((profile) => profile.id !== profileId)
                  }
                }
              : printer
          )
        }))
      },

      duplicateProfile: (printerId, profileId) => {
        const state = get()
        const printer = state.printers.find((p) => p.id === printerId)
        const profile = printer?.slicerProfiles.profiles.find((p) => p.id === profileId)
        
        if (profile) {
          const duplicatedProfile = {
            ...profile,
            id: crypto.randomUUID(),
            name: `${profile.name} (Copy)`,
            isActive: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          set((state) => ({
            printers: state.printers.map((printer) =>
              printer.id === printerId
                ? {
                    ...printer,
                    slicerProfiles: {
                      ...printer.slicerProfiles,
                      profiles: [...printer.slicerProfiles.profiles, duplicatedProfile]
                    }
                  }
                : printer
            )
          }))
        }
      },

      setActiveProfile: (printerId, profileId) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    profiles: printer.slicerProfiles.profiles.map((profile) => ({
                      ...profile,
                      isActive: profile.id === profileId
                    }))
                  }
                }
              : printer
          )
        }))
      },

      updateCuraPath: (printerId, curaPath) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    curaPath
                  }
                }
              : printer
          )
        }))
      },

      // Profile history actions
      revertProfileToVersion: (printerId, profileId, historyId) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    profiles: printer.slicerProfiles.profiles.map((profile) => {
                      if (profile.id === profileId) {
                        const historyEntry = profile.history?.find(h => h.id === historyId)
                        if (historyEntry) {
                          const revertedProfile = {
                            ...profile,
                            settings: { ...historyEntry.snapshot },
                            updatedAt: new Date().toISOString()
                          }
                          
                          // Add revert to history
                          const revertHistoryEntry = {
                            id: crypto.randomUUID(),
                            timestamp: new Date().toISOString(),
                            changes: ['reverted'],
                            snapshot: { ...historyEntry.snapshot },
                            source: 'revert',
                            revertedFrom: historyId
                          }
                          
                          revertedProfile.history = [
                            ...(profile.history || []).slice(-9),
                            revertHistoryEntry
                          ]
                          
                          return revertedProfile
                        }
                      }
                      return profile
                    })
                  }
                }
              : printer
          )
        }))
      },

      // Materials management
      addMaterial: (printerId, materialData) => {
        const newMaterial = {
          id: crypto.randomUUID(),
          name: materialData.name || 'New Material',
          type: materialData.type || 'PLA',
          properties: materialData.properties || {},
          recommendedSettings: materialData.recommendedSettings || {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...materialData
        }

        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    materials: [...(printer.slicerProfiles.materials || []), newMaterial]
                  }
                }
              : printer
          )
        }))
      },

      updateMaterial: (printerId, materialId, updates) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    materials: (printer.slicerProfiles.materials || []).map((mat) =>
                      mat.id === materialId ? { ...mat, ...updates, updatedAt: new Date().toISOString() } : mat
                    )
                  }
                }
              : printer
          )
        }))
      },

      deleteMaterial: (printerId, materialId) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId
              ? {
                  ...printer,
                  slicerProfiles: {
                    ...printer.slicerProfiles,
                    materials: (printer.slicerProfiles.materials || []).filter((mat) => mat.id !== materialId)
                  }
                }
              : printer
          )
        }))
      },

      setProfileMaterial: (printerId, profileId, materialId, applyRecommendations = true) => {
        set((state) => ({
          printers: state.printers.map((printer) => {
            if (printer.id !== printerId) return printer
            const material = (printer.slicerProfiles.materials || []).find(m => m.id === materialId)
            return {
              ...printer,
              slicerProfiles: {
                ...printer.slicerProfiles,
                profiles: printer.slicerProfiles.profiles.map((profile) => {
                  if (profile.id !== profileId) return profile
                  const newSettings = applyRecommendations && material?.recommendedSettings
                    ? { ...profile.settings, ...material.recommendedSettings }
                    : profile.settings
                  return { ...profile, materialId, settings: newSettings, updatedAt: new Date().toISOString() }
                })
              }
            }
          })
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

      // Serial communication actions
      setSerialPort: (port) => set({ serialPort: port }),
      setSerialStatus: (status) => set({ serialStatus: status }),
      setSerialBaudRate: (baudRate) => set({ serialBaudRate: baudRate }),
      setSerialAutoDetect: (autoDetect) => set({ serialAutoDetect: autoDetect }),
      setSerialError: (error) => set({ serialError: error }),
      
      setTemperatures: (temps) => {
        const timestamp = Date.now()
        set((state) => ({
          temperatures: { ...temps, timestamp },
          temperatureHistory: [...state.temperatureHistory, {
            t: timestamp,
            hotend: temps.hotend.current,
            bed: temps.bed.current,
            targetHotend: temps.hotend.target,
            targetBed: temps.bed.target
          }].slice(-120) // Keep last 120 readings
        }))
      },
      
      appendSerialLog: (message, direction = 'sys') => 
        set((state) => ({
          serialLog: [
            ...state.serialLog,
            { 
              timestamp: new Date().toISOString(), 
              message, 
              direction 
            }
          ].slice(-1000) // Keep last 1000 messages
        })),
      
      clearSerialLog: () => set({ serialLog: [] }),

      // Utility actions
      resetStore: () => {
        set({ 
          printers: [], 
          activePrinterId: null,
          serialPort: null,
          serialStatus: 'disconnected',
          serialBaudRate: 115200,
          serialAutoDetect: true,
          serialError: null,
          serialLog: []
        })
      }
    }),
    {
      name: '3d-printer-suite-storage', // unique name for localStorage key
      partialize: (state) => ({
        printers: state.printers,
        activePrinterId: state.activePrinterId,
        // Don't persist serial port object, but persist other serial settings
        serialBaudRate: state.serialBaudRate,
        serialAutoDetect: state.serialAutoDetect
      })
    }
  )
)

export default usePrintersStore
