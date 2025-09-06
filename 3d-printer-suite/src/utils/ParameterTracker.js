/**
 * Parameter tracking system for calibration workflow
 * Tracks parameters used in each calibration step and saves them to printer settings
 * Handles global parameters that persist across all calibration steps
 */

import useSerialStore from '../stores/serialStore'

// Global parameters that should persist across all calibration steps
const GLOBAL_PARAMETERS = {
  hotendTemp: 200,
  bedTemp: 60,
  nozzleDiameter: 0.4,
  layerHeight: 0.2,
  printSpeed: 50,
  retractionDistance: 5,
  retractionSpeed: 45,
  primeSpeed: 45,
  flowRate: 100,
  wallThickness: 0.4,
  enableABL: true,
  firstLayerSpeed: 20
}

// Default parameter values based on common printer configurations
const DEFAULT_PARAMETERS = {
  'pid-autotune': {
    hotendTemp: 200,
    bedTemp: 60,
    cycles: 8,
    target: 'hotend'
  },
  'extruder-esteps': {
    hotendTemp: 200,
    bedTemp: 60,
    extrudeLength: 100,
    currentEsteps: 93
  },
  'retraction-tuning': {
    hotendTemp: 200,
    bedTemp: 60,
    retractionDistance: 5,
    retractionSpeed: 45,
    primeSpeed: 45
  },
  'first-layer': {
    hotendTemp: 200,
    bedTemp: 60,
    layerHeight: 0.2,
    firstLayerSpeed: 20,
    enableABL: true
  },
  'flow-rate': {
    hotendTemp: 200,
    bedTemp: 60,
    flowRate: 100,
    wallThickness: 0.4
  },
  'temperature-tower': {
    hotendTemp: 200,
    bedTemp: 60,
    startTemp: 180,
    endTemp: 220,
    tempStep: 5
  },
  'calibration-cube': {
    hotendTemp: 200,
    bedTemp: 60,
    cubeSize: 20,
    layerHeight: 0.2,
    printSpeed: 50
  },
  'speed-calibration': {
    hotendTemp: 200,
    bedTemp: 60,
    startSpeed: 40,
    endSpeed: 120,
    stepSpeed: 10,
    lineLength: 160
  }
}

// Parameter mapping to printer settings (M500 commands)
const PARAMETER_TO_SETTINGS = {
  'pid-autotune': {
    'hotendTemp': 'M301', // PID hotend
    'bedTemp': 'M304'     // PID bed
  },
  'extruder-esteps': {
    'currentEsteps': 'M92' // E-steps per mm
  },
  'retraction-tuning': {
    'retractionDistance': 'M207', // Retract length
    'retractionSpeed': 'M207'      // Retract speed
  },
  'flow-rate': {
    'flowRate': 'M221' // Flow rate percentage
  }
}

/**
 * Get default parameters for a calibration step
 */
export const getDefaultParameters = (stepId) => {
  return DEFAULT_PARAMETERS[stepId] || {}
}

/**
 * Load parameters from printer settings
 */
export const loadParametersFromSettings = async (stepId) => {
  try {
    const sendCommand = useSerialStore.getState().sendCommand
    const parameters = { ...getDefaultParameters(stepId) }
    
    // Load relevant settings based on step
    const settingsMapping = PARAMETER_TO_SETTINGS[stepId]
    if (settingsMapping) {
      for (const [paramKey, command] of Object.entries(settingsMapping)) {
        try {
          // Send command to get current value
          await sendCommand(command)
          // Note: In a real implementation, you'd parse the response
          // For now, we'll use the default values
        } catch (error) {
          console.warn(`Failed to load ${command}:`, error)
        }
      }
    }
    
    return parameters
  } catch (error) {
    console.error('Error loading parameters from settings:', error)
    return getDefaultParameters(stepId)
  }
}

/**
 * Save parameters to printer settings
 */
export const saveParametersToSettings = async (stepId, parameters) => {
  try {
    const sendCommand = useSerialStore.getState().sendCommand
    const settingsMapping = PARAMETER_TO_SETTINGS[stepId]
    
    if (settingsMapping) {
      for (const [paramKey, command] of Object.entries(settingsMapping)) {
        const value = parameters[paramKey]
        if (value !== undefined) {
          try {
            // Send the appropriate command with the parameter value
            if (command === 'M92' && paramKey === 'currentEsteps') {
              await sendCommand(`M92 E${value}`)
            } else if (command === 'M207' && paramKey === 'retractionDistance') {
              await sendCommand(`M207 S${value}`)
            } else if (command === 'M207' && paramKey === 'retractionSpeed') {
              await sendCommand(`M207 F${value * 60}`) // Convert mm/s to mm/min
            } else if (command === 'M221' && paramKey === 'flowRate') {
              await sendCommand(`M221 S${value}`)
            }
          } catch (error) {
            console.warn(`Failed to save ${command} with value ${value}:`, error)
          }
        }
      }
      
      // Save all settings to EEPROM
      await sendCommand('M500')
    }
  } catch (error) {
    console.error('Error saving parameters to settings:', error)
    throw error
  }
}

/**
 * Get parameter history for a step
 */
export const getParameterHistory = (stepId) => {
  try {
    const history = localStorage.getItem(`calibration_parameters_${stepId}`)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error loading parameter history:', error)
    return []
  }
}

/**
 * Save parameter history for a step
 */
export const saveParameterHistory = (stepId, parameters, result) => {
  try {
    const history = getParameterHistory(stepId)
    const newEntry = {
      parameters: { ...parameters },
      result: result,
      timestamp: Date.now()
    }
    
    history.push(newEntry)
    
    // Keep only last 10 entries
    if (history.length > 10) {
      history.splice(0, history.length - 10)
    }
    
    localStorage.setItem(`calibration_parameters_${stepId}`, JSON.stringify(history))
  } catch (error) {
    console.error('Error saving parameter history:', error)
  }
}

/**
 * Get the best parameters for a step based on history
 */
export const getBestParameters = (stepId) => {
  const history = getParameterHistory(stepId)
  if (history.length === 0) {
    return getDefaultParameters(stepId)
  }
  
  // Find the most recent successful calibration
  const successfulEntries = history.filter(entry => entry.result?.success)
  if (successfulEntries.length > 0) {
    return successfulEntries[successfulEntries.length - 1].parameters
  }
  
  // Fall back to most recent entry
  return history[history.length - 1].parameters
}

/**
 * Clear parameter history for a step
 */
export const clearParameterHistory = (stepId) => {
  try {
    localStorage.removeItem(`calibration_parameters_${stepId}`)
  } catch (error) {
    console.error('Error clearing parameter history:', error)
  }
}

/**
 * Export all parameter history
 */
export const exportParameterHistory = () => {
  try {
    const allHistory = {}
    Object.keys(DEFAULT_PARAMETERS).forEach(stepId => {
      allHistory[stepId] = getParameterHistory(stepId)
    })
    
    const dataStr = JSON.stringify(allHistory, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `calibration_parameters_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting parameter history:', error)
  }
}

/**
 * Import parameter history
 */
export const importParameterHistory = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        Object.keys(data).forEach(stepId => {
          localStorage.setItem(`calibration_parameters_${stepId}`, JSON.stringify(data[stepId]))
        })
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}

// Get printer-specific global parameter storage key
const getGlobalKey = (printerId) => `printer_${printerId}_global_parameters`

/**
 * Load global parameters for a printer
 */
export const loadGlobalParameters = (printerId) => {
  try {
    const saved = localStorage.getItem(getGlobalKey(printerId))
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...GLOBAL_PARAMETERS, ...parsed }
    }
    return { ...GLOBAL_PARAMETERS }
  } catch (error) {
    console.error('Error loading global parameters:', error)
    return { ...GLOBAL_PARAMETERS }
  }
}

/**
 * Save global parameters for a printer
 */
export const saveGlobalParameters = (printerId, parameters) => {
  try {
    // Only save parameters that are in the global parameters list
    const globalParams = {}
    Object.keys(GLOBAL_PARAMETERS).forEach(key => {
      if (parameters[key] !== undefined) {
        globalParams[key] = parameters[key]
      }
    })
    
    localStorage.setItem(getGlobalKey(printerId), JSON.stringify(globalParams))
    console.log('Saved global parameters for printer', printerId, ':', globalParams)
  } catch (error) {
    console.error('Error saving global parameters:', error)
  }
}

/**
 * Get merged parameters for a step (global + step-specific)
 */
export const getMergedParameters = (printerId, stepId, stepParameters = {}) => {
  const globalParams = loadGlobalParameters(printerId)
  const stepDefaults = getDefaultParameters(stepId)
  
  // Merge: stepParameters > globalParams > stepDefaults
  return {
    ...stepDefaults,
    ...globalParams,
    ...stepParameters
  }
}

/**
 * Update global parameters when step parameters change
 */
export const updateGlobalParameters = (printerId, stepId, parameters) => {
  const globalParams = loadGlobalParameters(printerId)
  const updatedGlobalParams = { ...globalParams }
  
  // Update global parameters with any matching keys from step parameters
  Object.keys(GLOBAL_PARAMETERS).forEach(key => {
    if (parameters[key] !== undefined) {
      updatedGlobalParams[key] = parameters[key]
    }
  })
  
  // Save updated global parameters
  saveGlobalParameters(printerId, updatedGlobalParams)
  
  return updatedGlobalParams
}
