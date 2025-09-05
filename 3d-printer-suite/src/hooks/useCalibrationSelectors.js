import useCalibrationStore from '../stores/calibrationStore'

// Selector hooks for useCalibrationStore to prevent unnecessary re-renders
// Each hook only subscribes to the specific state it needs

// Calibration files selectors
export const useCalibrationFiles = () => useCalibrationStore(state => state.calibrationFiles)
export const useCalibrationFileCount = () => useCalibrationStore(state => state.calibrationFiles.length)

export const useCalibrationFileActions = () => useCalibrationStore(state => ({
  addCalibrationFile: state.addCalibrationFile,
  updateCalibrationFile: state.updateCalibrationFile,
  getCalibrationFile: state.getCalibrationFile
}))

// Calibration results selectors
export const useCalibrationResults = () => useCalibrationStore(state => state.calibrationResults)
export const useCalibrationResultCount = () => useCalibrationStore(state => state.calibrationResults.length)

export const useCalibrationResultActions = () => useCalibrationStore(state => ({
  addCalibrationResult: state.addCalibrationResult,
  updateCalibrationResult: state.updateCalibrationResult,
  getCalibrationResult: state.getCalibrationResult
}))

// Workflow selectors
export const useCalibrationWorkflows = () => useCalibrationStore(state => state.calibrationWorkflows)
export const useActiveWorkflow = () => useCalibrationStore(state => state.activeWorkflow)
export const useWorkflowCount = () => useCalibrationStore(state => state.calibrationWorkflows.length)

export const useWorkflowActions = () => useCalibrationStore(state => ({
  addCalibrationWorkflow: state.addCalibrationWorkflow,
  startWorkflow: state.startWorkflow,
  updateWorkflowStep: state.updateWorkflowStep,
  getWorkflow: state.getWorkflow
}))

export const useCalibrationWorkflowActions = () => useCalibrationStore(state => ({
  addCalibrationWorkflow: state.addCalibrationWorkflow,
  startWorkflow: state.startWorkflow,
  updateWorkflowStep: state.updateWorkflowStep,
  getWorkflow: state.getWorkflow
}))

// Analysis selectors
export const useAnalysisActions = () => useCalibrationStore(state => ({
  analyzeFirstLayerAdhesion: state.analyzeFirstLayerAdhesion,
  analyzeStringingTest: state.analyzeStringingTest,
  analyzeBedLevel: state.analyzeBedLevel
}))

// Workflow status selectors
export const useRunningWorkflows = () => useCalibrationStore(state => 
  state.calibrationWorkflows.filter(workflow => workflow.status === 'running')
)

export const useCompletedWorkflows = () => useCalibrationStore(state => 
  state.calibrationWorkflows.filter(workflow => workflow.status === 'completed')
)

export const usePendingWorkflows = () => useCalibrationStore(state => 
  state.calibrationWorkflows.filter(workflow => workflow.status === 'pending')
)

// Results by type selectors
export const useResultsByType = (type) => useCalibrationStore(state => 
  state.calibrationResults.filter(result => result.data?.type === type)
)

export const useFilesByType = (type) => useCalibrationStore(state => 
  state.calibrationFiles.filter(file => file.type === type)
)

// Statistics selectors
export const useCalibrationStatistics = () => useCalibrationStore(state => {
  const files = state.calibrationFiles
  const results = state.calibrationResults
  const workflows = state.calibrationWorkflows
  
  return {
    totalFiles: files.length,
    totalResults: results.length,
    totalWorkflows: workflows.length,
    completedWorkflows: workflows.filter(w => w.status === 'completed').length,
    runningWorkflows: workflows.filter(w => w.status === 'running').length,
    pendingWorkflows: workflows.filter(w => w.status === 'pending').length,
    filesWithResults: files.filter(f => f.results).length,
    averageScore: results.length > 0 
      ? results.reduce((sum, r) => sum + (r.data?.score || 0), 0) / results.length 
      : 0
  }
})

// Utility selectors
export const useGetCalibrationFile = () => useCalibrationStore(state => state.getCalibrationFile)
export const useGetCalibrationResult = () => useCalibrationStore(state => state.getCalibrationResult)
export const useGetWorkflow = () => useCalibrationStore(state => state.getWorkflow)
export const useResetStore = () => useCalibrationStore(state => state.resetStore)
