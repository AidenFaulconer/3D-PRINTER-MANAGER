import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const useCalibrationStore = create(
  devtools(
    persist(
      (set, get) => ({
      // State
      calibrationFiles: [], // Generated calibration G-code files
      calibrationResults: [], // Analysis results
      calibrationWorkflows: [], // Automated workflows
      activeWorkflow: null, // Currently running workflow

      // File Management
      addCalibrationFile: (file) => {
        const newFile = {
          id: crypto.randomUUID(),
          ...file,
          type: 'calibration',
          createdAt: new Date().toISOString(),
          results: null,
          settings: file.settings || {},
          analysisData: null
        }

        set((state) => ({
          calibrationFiles: [...state.calibrationFiles, newFile]
        }))

        return newFile.id
      },

      updateCalibrationFile: (fileId, updates) => {
        set((state) => ({
          calibrationFiles: state.calibrationFiles.map(file =>
            file.id === fileId
              ? { ...file, ...updates }
              : file
          )
        }))
      },

      // Results Management
      addCalibrationResult: (fileId, result) => {
        const resultRecord = {
          id: crypto.randomUUID(),
          fileId,
          timestamp: new Date().toISOString(),
          data: result,
          recommendations: [],
          appliedSettings: null
        }

        set((state) => ({
          calibrationResults: [...state.calibrationResults, resultRecord],
          calibrationFiles: state.calibrationFiles.map(file =>
            file.id === fileId
              ? { ...file, results: resultRecord.id }
              : file
          )
        }))

        return resultRecord.id
      },

      updateCalibrationResult: (resultId, updates) => {
        set((state) => ({
          calibrationResults: state.calibrationResults.map(result =>
            result.id === resultId
              ? { ...result, ...updates }
              : result
          )
        }))
      },

      // Workflow Management
      addCalibrationWorkflow: (workflow) => {
        const newWorkflow = {
          id: crypto.randomUUID(),
          ...workflow,
          createdAt: new Date().toISOString(),
          status: 'pending',
          currentStep: 0,
          results: [],
          recommendations: []
        }

        set((state) => ({
          calibrationWorkflows: [...state.calibrationWorkflows, newWorkflow]
        }))

        return newWorkflow.id
      },

      startWorkflow: (workflowId) => {
        set((state) => ({
          activeWorkflow: workflowId,
          calibrationWorkflows: state.calibrationWorkflows.map(workflow =>
            workflow.id === workflowId
              ? { ...workflow, status: 'running', currentStep: 0 }
              : workflow
          )
        }))
      },

      updateWorkflowStep: (workflowId, stepIndex, status, result = null) => {
        set((state) => {
          const workflow = state.calibrationWorkflows.find(w => w.id === workflowId)
          if (!workflow) return state

          const updatedWorkflow = {
            ...workflow,
            currentStep: stepIndex + 1,
            results: [...workflow.results]
          }

          if (result) {
            updatedWorkflow.results[stepIndex] = result
          }

          // Check if workflow is complete
          if (stepIndex + 1 >= workflow.steps.length) {
            updatedWorkflow.status = 'completed'
            updatedWorkflow.recommendations = analyzeWorkflowResults(updatedWorkflow.results)
          }

          return {
            calibrationWorkflows: state.calibrationWorkflows.map(w =>
              w.id === workflowId ? updatedWorkflow : w
            ),
            activeWorkflow: updatedWorkflow.status === 'completed' ? null : state.activeWorkflow
          }
        })
      },

      // Analysis Functions
      analyzeFirstLayerAdhesion: (imageData) => {
        // Implement image analysis for first layer adhesion
        // This would use computer vision to detect issues
        return {
          score: 0.85,
          issues: ['slight_warping_corners'],
          recommendations: [
            { setting: 'bed_temperature', value: 65, confidence: 0.8 },
            { setting: 'first_layer_height', value: 0.24, confidence: 0.7 }
          ]
        }
      },

      analyzeStringingTest: (imageData) => {
        // Implement stringing test analysis
        return {
          score: 0.75,
          stringCount: 12,
          stringThickness: 0.1,
          recommendations: [
            { setting: 'retraction_distance', value: 6.5, confidence: 0.85 },
            { setting: 'retraction_speed', value: 45, confidence: 0.75 }
          ]
        }
      },

      analyzeBedLevel: (heightMap) => {
        // Analyze bed leveling mesh data
        return {
          maxDeviation: 0.15,
          problemAreas: [
            { x: 10, y: 10, deviation: 0.15 },
            { x: 190, y: 190, deviation: -0.12 }
          ],
          recommendations: [
            { corner: 'front_left', adjustment: '+0.1mm' },
            { corner: 'back_right', adjustment: '-0.1mm' }
          ]
        }
      },

      // Utility Functions
      getCalibrationFile: (fileId) => {
        return get().calibrationFiles.find(file => file.id === fileId)
      },

      getCalibrationResult: (resultId) => {
        return get().calibrationResults.find(result => result.id === resultId)
      },

      getWorkflow: (workflowId) => {
        return get().calibrationWorkflows.find(workflow => workflow.id === workflowId)
      },

      // Reset store
      resetStore: () => {
        set({
          calibrationFiles: [],
          calibrationResults: [],
          calibrationWorkflows: [],
          activeWorkflow: null
        })
      }
      }),
      {
        name: 'calibration-storage'
      }
    ),
    {
      name: 'CalibrationStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

// Helper function to analyze workflow results and generate recommendations
function analyzeWorkflowResults(results) {
  const recommendations = []

  // Analyze each result and combine recommendations
  results.forEach(result => {
    if (result.recommendations) {
      result.recommendations.forEach(rec => {
        const existing = recommendations.find(r => r.setting === rec.setting)
        if (existing) {
          // Average recommendations with confidence weighting
          const totalConfidence = existing.confidence + rec.confidence
          existing.value = (
            (existing.value * existing.confidence + rec.value * rec.confidence) /
            totalConfidence
          )
          existing.confidence = Math.max(existing.confidence, rec.confidence)
        } else {
          recommendations.push({ ...rec })
        }
      })
    }
  })

  return recommendations
}

export default useCalibrationStore
