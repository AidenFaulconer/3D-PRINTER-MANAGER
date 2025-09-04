import React, { useState, useEffect } from 'react'
import useCalibrationStore from '../stores/calibrationStore'
import useAdvancedQueueStore from '../stores/advancedQueueStore'
import usePrintersStore from '../stores/printersStore'

const WORKFLOW_TEMPLATES = {
  basic_calibration: {
    name: 'Basic Calibration',
    description: 'Essential calibration steps for optimal print quality',
    steps: [
      {
        type: 'bed_level',
        name: 'Bed Leveling',
        description: 'Level the print bed and set Z-offset',
        settings: {
          temperature_bed: 60,
          temperature_nozzle: 210,
          speed: 50
        }
      },
      {
        type: 'first_layer',
        name: 'First Layer Test',
        description: 'Verify bed adhesion and first layer quality',
        settings: {
          temperature_bed: 60,
          temperature_nozzle: 210,
          first_layer_speed: 30,
          first_layer_height: 0.2
        }
      },
      {
        type: 'stringing',
        name: 'Retraction Test',
        description: 'Optimize retraction settings',
        settings: {
          temperature_nozzle: 200,
          retraction_distance: 6,
          retraction_speed: 45
        }
      }
    ]
  },
  advanced_tuning: {
    name: 'Advanced Tuning',
    description: 'Fine-tune printer settings for optimal performance',
    steps: [
      {
        type: 'temperature_tower',
        name: 'Temperature Tower',
        description: 'Find optimal printing temperature',
        settings: {
          start_temp: 220,
          temp_step: -5,
          layers_per_step: 40
        }
      },
      {
        type: 'speed_test',
        name: 'Speed Test',
        description: 'Determine maximum reliable print speed',
        settings: {
          start_speed: 50,
          speed_step: 10,
          test_distance: 100
        }
      },
      {
        type: 'acceleration',
        name: 'Acceleration Test',
        description: 'Optimize acceleration settings',
        settings: {
          start_accel: 500,
          accel_step: 500,
          test_moves: 20
        }
      }
    ]
  }
}

const CalibrationWorkflow = () => {
  const {
    calibrationWorkflows,
    activeWorkflow,
    addCalibrationWorkflow,
    startWorkflow,
    updateWorkflowStep,
    getWorkflow
  } = useCalibrationStore()

  const { addToQueue, getNextPrintable } = useAdvancedQueueStore()
  const { getActivePrinter, updatePrinter } = usePrintersStore()

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [customSettings, setCustomSettings] = useState({})
  const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false)

  // Monitor active workflow
  useEffect(() => {
    if (!activeWorkflow) return

    const workflow = getWorkflow(activeWorkflow)
    if (!workflow || workflow.status !== 'running') return

    const currentStep = workflow.steps[workflow.currentStep]
    if (!currentStep) return

    // Check if current print is complete
    const nextPrint = getNextPrintable()
    if (!nextPrint && workflow.currentStep < workflow.steps.length) {
      // Current print is complete, analyze results and move to next step
      handleStepCompletion(workflow, workflow.currentStep)
    }
  }, [activeWorkflow, getWorkflow, getNextPrintable])

  const handleStepCompletion = async (workflow, stepIndex) => {
    const step = workflow.steps[stepIndex]
    
    // Wait for user to upload analysis image
    // This would typically be handled through a modal or separate component
    // For now, we'll simulate the analysis
    const analysisResult = {
      score: 0.85,
      recommendations: [
        { setting: step.type + '_speed', value: 45, confidence: 0.9 },
        { setting: step.type + '_temperature', value: 210, confidence: 0.85 }
      ]
    }

    // Update workflow with results
    updateWorkflowStep(workflow.id, stepIndex, 'completed', analysisResult)

    // Apply high-confidence recommendations
    const printer = getActivePrinter()
    if (printer) {
      const highConfidenceSettings = analysisResult.recommendations
        .filter(rec => rec.confidence > 0.8)
        .reduce((acc, rec) => ({
          ...acc,
          [rec.setting]: rec.value
        }), {})

      updatePrinter(printer.id, {
        settings: {
          ...printer.settings,
          ...highConfidenceSettings
        }
      })
    }

    // Queue next step if available
    if (stepIndex + 1 < workflow.steps.length) {
      queueCalibrationStep(workflow.steps[stepIndex + 1])
    }
  }

  const createWorkflow = () => {
    if (!selectedTemplate) return

    const template = WORKFLOW_TEMPLATES[selectedTemplate]
    const workflow = {
      ...template,
      steps: template.steps.map(step => ({
        ...step,
        settings: {
          ...step.settings,
          ...customSettings[step.type]
        }
      }))
    }

    const workflowId = addCalibrationWorkflow(workflow)
    setShowNewWorkflowModal(false)
    startWorkflow(workflowId)

    // Queue first step
    queueCalibrationStep(workflow.steps[0])
  }

  const queueCalibrationStep = (step) => {
    // Generate G-code for calibration step
    const gcode = generateCalibrationGcode(step)
    
    // Add to queue with appropriate settings
    addToQueue(gcode.id, {
      priority: 2, // Calibration prints get higher priority
      settings: step.settings,
      notes: `Calibration step: ${step.name}`,
      onComplete: () => {
        // This will trigger the workflow monitoring effect
      }
    })
  }

  const generateCalibrationGcode = (step) => {
    // This would generate appropriate G-code for each calibration type
    // For now, we'll return a placeholder
    return {
      id: crypto.randomUUID(),
      name: `${step.name}_${new Date().toISOString()}`,
      content: '; Calibration G-code would go here'
    }
  }

  return (
    <div className="space-y-6">
      {/* Active Workflow */}
      {activeWorkflow && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Active Calibration</h2>
          <div className="space-y-4">
            {getWorkflow(activeWorkflow)?.steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 border rounded ${
                  index === getWorkflow(activeWorkflow).currentStep
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{step.name}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index < getWorkflow(activeWorkflow).currentStep && (
                      <span className="text-green-500">✓</span>
                    )}
                    {index === getWorkflow(activeWorkflow).currentStep && (
                      <span className="text-blue-500">In Progress</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workflow List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Calibration Workflows</h2>
          <button
            onClick={() => setShowNewWorkflowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            New Workflow
          </button>
        </div>

        <div className="divide-y">
          {calibrationWorkflows.map(workflow => (
            <div key={workflow.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{workflow.name}</h3>
                  <p className="text-sm text-gray-500">{workflow.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Status: </span>
                    <span className={`font-medium ${
                      workflow.status === 'completed'
                        ? 'text-green-500'
                        : workflow.status === 'running'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {workflow.status === 'pending' && (
                    <button
                      onClick={() => startWorkflow(workflow.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              {workflow.status !== 'pending' && (
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {Math.round((workflow.currentStep / workflow.steps.length) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{
                          width: `${(workflow.currentStep / workflow.steps.length) * 100}%`
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Workflow Modal */}
      {showNewWorkflowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Create New Workflow</h3>

            <div className="space-y-4">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workflow Template
                </label>
                <select
                  value={selectedTemplate || ''}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a template</option>
                  {Object.entries(WORKFLOW_TEMPLATES).map(([key, template]) => (
                    <option key={key} value={key}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Template Preview */}
              {selectedTemplate && (
                <div className="border rounded p-4">
                  <h4 className="font-medium mb-2">
                    {WORKFLOW_TEMPLATES[selectedTemplate].name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    {WORKFLOW_TEMPLATES[selectedTemplate].description}
                  </p>

                  <div className="space-y-2">
                    {WORKFLOW_TEMPLATES[selectedTemplate].steps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-gray-500">{index + 1}.</span>
                        <span>{step.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowNewWorkflowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createWorkflow}
                  disabled={!selectedTemplate}
                  className={`px-4 py-2 rounded ${
                    selectedTemplate
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Create Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalibrationWorkflow
