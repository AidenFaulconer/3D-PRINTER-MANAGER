/**
 * Logical numbering system for calibration steps
 * Based on Teaching Tech's 3D Printer Calibration Guide
 */

// Define the logical order and numbering for calibration steps
export const calibrationStepNumbers = {
  'bed-leveling': '1',
  'pid-autotune': '2', 
  'extruder-esteps': '3',
  'retraction-tuning': '4',
  'first-layer': '5',
  'flow-rate': '6',
  'temperature-tower': '7',
  'calibration-cube': '8',
  'speed-calibration': '9'
}

/**
 * Get the step number for a calibration step
 * @param {string} stepId - The calibration step ID
 * @returns {string} The step number (e.g., "1", "2", "3")
 */
export const getStepNumber = (stepId) => {
  return calibrationStepNumbers[stepId] || ''
}

/**
 * Get the step number with prefix for display
 * @param {string} stepId - The calibration step ID
 * @returns {string} The step number with # prefix (e.g., "#1", "#2", "#3")
 */
export const getStepNumberDisplay = (stepId) => {
  const number = getStepNumber(stepId)
  return number ? `#${number}` : ''
}

/**
 * Get all calibration steps in logical order with their numbers
 * @returns {Array} Array of objects with stepId, number, and displayNumber
 */
export const getCalibrationStepsWithNumbers = () => {
  return Object.entries(calibrationStepNumbers).map(([stepId, number]) => ({
    stepId,
    number,
    displayNumber: `#${number}`
  }))
}

export default calibrationStepNumbers
