import usePrintersStore from '../stores/printersStore'

// Selector hooks for usePrintersStore to prevent unnecessary re-renders
// Each hook only subscribes to the specific state it needs

// Basic printer data selectors
export const usePrinters = () => usePrintersStore(state => state.printers)
export const useActivePrinterId = () => usePrintersStore(state => state.activePrinterId)
export const useActivePrinter = () => usePrintersStore(state => {
  const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
  return activePrinter
})

// Printer management actions
export const usePrinterActions = () => usePrintersStore(state => ({
  addPrinter: state.addPrinter,
  updatePrinter: state.updatePrinter,
  deletePrinter: state.deletePrinter,
  setActivePrinter: state.setActivePrinter,
  resetStore: state.resetStore
}))

// Printer settings selectors
export const usePrinterSettings = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.printerSettings || null
})

export const useUpdatePrinter = () => usePrintersStore(state => state.updatePrinter)
export const useSetActivePrinter = () => usePrintersStore(state => state.setActivePrinter)
export const useUpdatePrinterSettings = () => usePrintersStore(state => state.updatePrinterSettings)

// Calibration selectors
export const useCalibrationSteps = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.calibrationSteps || {}
})

export const useUpdateCalibrationStep = () => usePrintersStore(state => state.updateCalibrationStep)

// Issue management selectors
export const useIssues = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.issues || []
})

export const useIssueActions = () => usePrintersStore(state => ({
  addIssue: state.addIssue,
  updateIssue: state.updateIssue,
  deleteIssue: state.deleteIssue,
  addFollowUpAction: state.addFollowUpAction,
  updateFollowUpAction: state.updateFollowUpAction
}))

// Profile management selectors
export const useProfiles = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.slicerProfiles?.profiles || []
})

export const useMaterials = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.slicerProfiles?.materials || []
})

export const useUpdateProfile = () => usePrintersStore(state => state.updateProfile)

export const useProfileActions = () => usePrintersStore(state => ({
  addProfile: state.addProfile,
  updateProfile: state.updateProfile,
  deleteProfile: state.deleteProfile,
  duplicateProfile: state.duplicateProfile,
  setActiveProfile: state.setActiveProfile,
  revertProfileToVersion: state.revertProfileToVersion
}))

export const useMaterialActions = () => usePrintersStore(state => ({
  addMaterial: state.addMaterial,
  updateMaterial: state.updateMaterial,
  deleteMaterial: state.deleteMaterial,
  setProfileMaterial: state.setProfileMaterial
}))

// Macro management selectors
export const useMacros = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.macros || []
})

export const useMacroActions = () => usePrintersStore(state => ({
  addMacro: state.addMacro,
  updateMacro: state.updateMacro,
  deleteMacro: state.deleteMacro
}))

// Configuration management selectors
export const useConfigurationSnapshots = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.configurationSnapshots || []
})

export const useConfigurationActions = () => usePrintersStore(state => ({
  createConfigurationSnapshot: state.createConfigurationSnapshot,
  restoreConfigurationSnapshot: state.restoreConfigurationSnapshot,
  deleteConfigurationSnapshot: state.deleteConfigurationSnapshot,
  exportConfiguration: state.exportConfiguration,
  importConfiguration: state.importConfiguration,
  compareConfigurations: state.compareConfigurations
}))

// Utility selectors
export const useGetActivePrinter = () => usePrintersStore(state => state.getActivePrinter)
export const useGetPrinterById = () => usePrintersStore(state => state.getPrinterById)
