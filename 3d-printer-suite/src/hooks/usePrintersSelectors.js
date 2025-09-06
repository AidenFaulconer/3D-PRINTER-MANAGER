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

// Printer management actions - use individual selectors to avoid object creation
export const useAddPrinter = () => usePrintersStore(state => state.addPrinter)
export const useUpdatePrinter = () => usePrintersStore(state => state.updatePrinter)
export const useDeletePrinter = () => usePrintersStore(state => state.deletePrinter)
export const useSetActivePrinter = () => usePrintersStore(state => state.setActivePrinter)
export const useResetPrintersStore = () => usePrintersStore(state => state.resetStore)

// Printer settings selectors
export const usePrinterSettings = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.printerSettings || null
})

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

export const useAddIssue = () => usePrintersStore(state => state.addIssue)
export const useUpdateIssue = () => usePrintersStore(state => state.updateIssue)
export const useDeleteIssue = () => usePrintersStore(state => state.deleteIssue)
export const useAddFollowUpAction = () => usePrintersStore(state => state.addFollowUpAction)
export const useUpdateFollowUpAction = () => usePrintersStore(state => state.updateFollowUpAction)

// Profile management selectors
export const useProfiles = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.slicerProfiles?.profiles || []
})

export const useMaterials = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.slicerProfiles?.materials || []
})

export const useAddProfile = () => usePrintersStore(state => state.addProfile)
export const useUpdateProfile = () => usePrintersStore(state => state.updateProfile)
export const useDeleteProfile = () => usePrintersStore(state => state.deleteProfile)
export const useDuplicateProfile = () => usePrintersStore(state => state.duplicateProfile)
export const useSetActiveProfile = () => usePrintersStore(state => state.setActiveProfile)
export const useRevertProfileToVersion = () => usePrintersStore(state => state.revertProfileToVersion)

// Legacy object-returning selector for backward compatibility
export const useProfileActions = () => usePrintersStore(state => ({
  addProfile: state.addProfile,
  updateProfile: state.updateProfile,
  deleteProfile: state.deleteProfile,
  duplicateProfile: state.duplicateProfile,
  setActiveProfile: state.setActiveProfile,
  revertProfileToVersion: state.revertProfileToVersion
}))

export const useAddMaterial = () => usePrintersStore(state => state.addMaterial)
export const useUpdateMaterial = () => usePrintersStore(state => state.updateMaterial)
export const useDeleteMaterial = () => usePrintersStore(state => state.deleteMaterial)
export const useSetProfileMaterial = () => usePrintersStore(state => state.setProfileMaterial)

// Legacy object-returning selector for backward compatibility
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

export const useAddMacro = () => usePrintersStore(state => state.addMacro)
export const useUpdateMacro = () => usePrintersStore(state => state.updateMacro)
export const useDeleteMacro = () => usePrintersStore(state => state.deleteMacro)

// Configuration management selectors
export const useConfigurationSnapshots = (printerId) => usePrintersStore(state => {
  const printer = state.printers.find(p => p.id === printerId)
  return printer?.configurationSnapshots || []
})

export const useCreateConfigurationSnapshot = () => usePrintersStore(state => state.createConfigurationSnapshot)
export const useRestoreConfigurationSnapshot = () => usePrintersStore(state => state.restoreConfigurationSnapshot)
export const useDeleteConfigurationSnapshot = () => usePrintersStore(state => state.deleteConfigurationSnapshot)
export const useExportConfiguration = () => usePrintersStore(state => state.exportConfiguration)
export const useImportConfiguration = () => usePrintersStore(state => state.importConfiguration)
export const useCompareConfigurations = () => usePrintersStore(state => state.compareConfigurations)

// Utility selectors
export const useGetActivePrinter = () => usePrintersStore(state => state.getActivePrinter)
export const useGetPrinterById = () => usePrintersStore(state => state.getPrinterById)
