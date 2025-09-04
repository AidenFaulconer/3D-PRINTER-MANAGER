import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

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
  devtools(
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
          printerSettings: printerData.printerSettings || {
            units: {
              linear: 'mm',
              temperature: 'C'
            },
            filament: {
              diameter: 1.75,
              type: 'PLA'
            },
            stepsPerUnit: {
              x: 80,
              y: 80,
              z: 400,
              e: 93
            },
            feedrates: {
              x: 500,
              y: 500,
              z: 5,
              e: 25
            },
            acceleration: {
              max: 1000,
              print: 1000,
              retract: 1000,
              travel: 1000,
              jerk: {
                x: 0,
                y: 0,
                z: 0,
                e: 0
              }
            },
            homeOffset: {
              x: 0,
              y: 0,
              z: 0
            },
            bedLeveling: {
              enabled: false,
              mesh: [],
              fadeHeight: 10
            },
            materialHeating: {
              pla: { hotend: 200, bed: 60 },
              abs: { hotend: 240, bed: 100 },
              petg: { hotend: 230, bed: 80 }
            },
            pid: {
              hotend: { p: 21.73, i: 1.54, d: 73.76 },
              bed: { p: 301.25, i: 24.20, d: 73.76 }
            },
            powerLossRecovery: true,
            zProbeOffset: {
              x: 0,
              y: 0,
              z: 0
            },
            linearAdvance: 0,
            filamentLoadUnload: {
              loadLength: 0,
              unloadLength: 0
            },
            lastUpdated: null
          },
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

      updatePrinterSettings: (printerId, settings) => {
        set((state) => ({
          printers: state.printers.map((printer) =>
            printer.id === printerId 
              ? { 
                  ...printer, 
                  printerSettings: {
                    ...printer.printerSettings,
                    ...settings,
                    lastUpdated: new Date().toISOString()
                  }
                }
              : printer
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
          printers: state.printers.map((printer) => {
            if (printer.id !== printerId) return printer;
            
            // Ensure slicerProfiles exists with default values
            const currentSlicerProfiles = printer.slicerProfiles || {
              curaPath: '',
              profiles: [],
              materials: []
            };
            
            return {
              ...printer,
              slicerProfiles: {
                ...currentSlicerProfiles,
                profiles: [...(currentSlicerProfiles.profiles || []), newProfile]
              }
            };
          })
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

      // Configuration backup/restore functions
      createConfigurationSnapshot: (printerId, name, description = '') => {
        const state = get()
        const printer = state.printers.find(p => p.id === printerId)
        
        if (!printer) {
          throw new Error('Printer not found')
        }
        
        const snapshot = {
          id: crypto.randomUUID(),
          name,
          description,
          timestamp: new Date().toISOString(),
          printerId,
          printerName: printer.name,
          configuration: {
            printerSettings: printer.printerSettings,
            firmwareConfiguration: printer.firmwareConfiguration,
            bedSize: printer.bedSize,
            model: printer.model,
            firmware: printer.firmware
          }
        }
        
        set((state) => ({
          printers: state.printers.map(p =>
            p.id === printerId
              ? {
                  ...p,
                  configurationSnapshots: [...(p.configurationSnapshots || []), snapshot]
                }
              : p
          )
        }))
        
        return snapshot
      },

      restoreConfigurationSnapshot: (printerId, snapshotId) => {
        const state = get()
        const printer = state.printers.find(p => p.id === printerId)
        
        if (!printer) {
          throw new Error('Printer not found')
        }
        
        const snapshot = printer.configurationSnapshots?.find(s => s.id === snapshotId)
        
        if (!snapshot) {
          throw new Error('Snapshot not found')
        }
        
        set((state) => ({
          printers: state.printers.map(p =>
            p.id === printerId
              ? {
                  ...p,
                  printerSettings: { ...snapshot.configuration.printerSettings },
                  firmwareConfiguration: { ...snapshot.configuration.firmwareConfiguration },
                  bedSize: { ...snapshot.configuration.bedSize },
                  model: snapshot.configuration.model,
                  firmware: snapshot.configuration.firmware
                }
              : p
          )
        }))
        
        return snapshot
      },

      deleteConfigurationSnapshot: (printerId, snapshotId) => {
        set((state) => ({
          printers: state.printers.map(p =>
            p.id === printerId
              ? {
                  ...p,
                  configurationSnapshots: (p.configurationSnapshots || []).filter(s => s.id !== snapshotId)
                }
              : p
          )
        }))
      },

      exportConfiguration: (printerId) => {
        const state = get()
        const printer = state.printers.find(p => p.id === printerId)
        
        if (!printer) {
          throw new Error('Printer not found')
        }
        
        const exportData = {
          version: '1.0',
          timestamp: new Date().toISOString(),
          printer: {
            name: printer.name,
            model: printer.model,
            firmware: printer.firmware,
            bedSize: printer.bedSize,
            printerSettings: printer.printerSettings,
            firmwareConfiguration: printer.firmwareConfiguration
          },
          snapshots: printer.configurationSnapshots || []
        }
        
        return exportData
      },

      importConfiguration: (printerId, importData) => {
        if (!importData.version || !importData.printer) {
          throw new Error('Invalid configuration file format')
        }
        
        set((state) => ({
          printers: state.printers.map(p =>
            p.id === printerId
              ? {
                  ...p,
                  name: importData.printer.name || p.name,
                  model: importData.printer.model || p.model,
                  firmware: importData.printer.firmware || p.firmware,
                  bedSize: importData.printer.bedSize || p.bedSize,
                  printerSettings: importData.printer.printerSettings || p.printerSettings,
                  firmwareConfiguration: importData.printer.firmwareConfiguration || p.firmwareConfiguration,
                  configurationSnapshots: importData.snapshots || []
                }
              : p
          )
        }))
      },

      compareConfigurations: (printerId, snapshotId1, snapshotId2) => {
        const state = get()
        const printer = state.printers.find(p => p.id === printerId)
        
        if (!printer) {
          throw new Error('Printer not found')
        }
        
        const snapshots = printer.configurationSnapshots || []
        const snapshot1 = snapshots.find(s => s.id === snapshotId1)
        const snapshot2 = snapshots.find(s => s.id === snapshotId2)
        
        if (!snapshot1 || !snapshot2) {
          throw new Error('One or both snapshots not found')
        }
        
        const differences = []
        
        // Compare printer settings
        const compareSettings = (settings1, settings2, path = '') => {
          for (const key in settings1) {
            const currentPath = path ? `${path}.${key}` : key
            
            if (typeof settings1[key] === 'object' && settings1[key] !== null) {
              if (typeof settings2[key] === 'object' && settings2[key] !== null) {
                compareSettings(settings1[key], settings2[key], currentPath)
              } else {
                differences.push({
                  path: currentPath,
                  type: 'modified',
                  oldValue: settings1[key],
                  newValue: settings2[key]
                })
              }
            } else if (settings1[key] !== settings2[key]) {
              differences.push({
                path: currentPath,
                type: 'modified',
                oldValue: settings1[key],
                newValue: settings2[key]
              })
            }
          }
          
          // Check for new keys in settings2
          for (const key in settings2) {
            if (!(key in settings1)) {
              differences.push({
                path: path ? `${path}.${key}` : key,
                type: 'added',
                oldValue: undefined,
                newValue: settings2[key]
              })
            }
          }
        }
        
        compareSettings(snapshot1.configuration.printerSettings, snapshot2.configuration.printerSettings)
        
        return {
          snapshot1: { name: snapshot1.name, timestamp: snapshot1.timestamp },
          snapshot2: { name: snapshot2.name, timestamp: snapshot2.timestamp },
          differences
        }
      },

      // Utility actions
      resetStore: () => {
        set({ 
          printers: [], 
          activePrinterId: null
        })
      }
      }),
      {
        name: '3d-printer-suite-storage', // unique name for localStorage key
        partialize: (state) => ({
          printers: state.printers,
          activePrinterId: state.activePrinterId
        })
      }
    ),
    {
      name: 'PrintersStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

export default usePrintersStore