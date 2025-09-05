/**
 * G-code Parameterization System
 * Loads base G-code files and replaces parameters with user-defined values
 */

// Cache for loaded G-code files
const gcodeCache = new Map()

/**
 * Load a G-code file from the gcode directory
 */
export async function loadGcodeFile(filename) {
  if (gcodeCache.has(filename)) {
    return gcodeCache.get(filename)
  }

  try {
    const response = await fetch(`/src/gcode/${filename}`)
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}: ${response.statusText}`)
    }
    const content = await response.text()
    gcodeCache.set(filename, content)
    return content
  } catch (error) {
    console.error(`Error loading G-code file ${filename}:`, error)
    throw error
  }
}

/**
 * Parameter definitions for each calibration step
 */
export const gcodeParameters = {
  'first-layer': {
    filename: 'firstlayer.gcode',
    parameters: {
      bedTemp: { placeholder: 'S80', description: 'Bed temperature (°C)' },
      hotendTemp: { placeholder: 'S185', description: 'Hotend temperature (°C)' },
      finalHotendTemp: { placeholder: 'S235', description: 'Final hotend temperature (°C)' },
      layerHeight: { placeholder: 'Z0.280', description: 'Layer height (mm)' },
      retractionDistance: { placeholder: 'E-6', description: 'Retraction distance (mm)' },
      retractionSpeed: { placeholder: 'F2400', description: 'Retraction speed (mm/min)' },
      printSpeed: { placeholder: 'F3300', description: 'Print speed (mm/min)' },
      travelSpeed: { placeholder: 'F11000', description: 'Travel speed (mm/min)' },
      enableABL: { placeholder: ';G29', description: 'Enable auto bed leveling (G29)' },
      restoreABL: { placeholder: 'M420 S1', description: 'Restore ABL mesh' }
    },
    defaultValues: {
      bedTemp: 80,
      hotendTemp: 185,
      finalHotendTemp: 235,
      layerHeight: 0.28,
      retractionDistance: 6,
      retractionSpeed: 2400,
      printSpeed: 3300,
      travelSpeed: 11000,
      enableABL: false,
      restoreABL: true
    }
  },
  'temperature-tower': {
    filename: 'temperature-tower.gcode',
    parameters: {
      bedTemp: { placeholder: 'S80', description: 'Bed temperature (°C)' },
      hotendTemp: { placeholder: 'S185', description: 'Initial hotend temperature (°C)' },
      finalHotendTemp: { placeholder: 'S235', description: 'Final hotend temperature (°C)' },
      layerHeight: { placeholder: 'Z0.280', description: 'Layer height (mm)' },
      retractionDistance: { placeholder: 'E-6', description: 'Retraction distance (mm)' },
      retractionSpeed: { placeholder: 'F2400', description: 'Retraction speed (mm/min)' },
      printSpeed: { placeholder: 'F3300', description: 'Print speed (mm/min)' },
      travelSpeed: { placeholder: 'F11000', description: 'Travel speed (mm/min)' },
      enableABL: { placeholder: 'G29', description: 'Enable auto bed leveling (G29)' },
      restoreABL: { placeholder: ';M420 S1', description: 'Restore ABL mesh' }
    },
    defaultValues: {
      bedTemp: 80,
      hotendTemp: 185,
      finalHotendTemp: 235,
      layerHeight: 0.28,
      retractionDistance: 6,
      retractionSpeed: 2400,
      printSpeed: 3300,
      travelSpeed: 11000,
      enableABL: true,
      restoreABL: false
    }
  },
  'retraction-tuning': {
    filename: 'retraction.gcode',
    parameters: {
      bedTemp: { placeholder: 'S80', description: 'Bed temperature (°C)' },
      hotendTemp: { placeholder: 'S185', description: 'Initial hotend temperature (°C)' },
      finalHotendTemp: { placeholder: 'S235', description: 'Final hotend temperature (°C)' },
      layerHeight: { placeholder: 'Z0.280', description: 'Layer height (mm)' },
      retractionDistance: { placeholder: 'E-5', description: 'Retraction distance (mm)' },
      retractionSpeed: { placeholder: 'F2400', description: 'Retraction speed (mm/min)' },
      printSpeed: { placeholder: 'F3300', description: 'Print speed (mm/min)' },
      travelSpeed: { placeholder: 'F11000', description: 'Travel speed (mm/min)' },
      enableABL: { placeholder: ';G29', description: 'Enable auto bed leveling (G29)' },
      restoreABL: { placeholder: 'M420 S1', description: 'Restore ABL mesh' }
    },
    defaultValues: {
      bedTemp: 80,
      hotendTemp: 185,
      finalHotendTemp: 235,
      layerHeight: 0.28,
      retractionDistance: 5,
      retractionSpeed: 2400,
      printSpeed: 3300,
      travelSpeed: 11000,
      enableABL: false,
      restoreABL: true
    }
  },
  'flow-rate': {
    filename: 'flow-rate.gcode',
    parameters: {
      bedTemp: { placeholder: 'S90', description: 'Bed temperature (°C)' },
      hotendTemp: { placeholder: 'S255', description: 'Initial hotend temperature (°C)' },
      finalHotendTemp: { placeholder: 'S235', description: 'Final hotend temperature (°C)' },
      layerHeight: { placeholder: 'Z0.4', description: 'Layer height (mm)' },
      retractionDistance: { placeholder: 'E-3.2', description: 'Retraction distance (mm)' },
      retractionSpeed: { placeholder: 'F2700', description: 'Retraction speed (mm/min)' },
      printSpeed: { placeholder: 'F3300', description: 'Print speed (mm/min)' },
      travelSpeed: { placeholder: 'F11000', description: 'Travel speed (mm/min)' },
      enableABL: { placeholder: ';G29', description: 'Enable auto bed leveling (G29)' },
      restoreABL: { placeholder: 'M420 S1', description: 'Restore ABL mesh' }
    },
    defaultValues: {
      bedTemp: 90,
      hotendTemp: 255,
      finalHotendTemp: 235,
      layerHeight: 0.4,
      retractionDistance: 3.2,
      retractionSpeed: 2700,
      printSpeed: 3300,
      travelSpeed: 11000,
      enableABL: false,
      restoreABL: false
    }
  },
  'calibration-cube': {
    filename: 'calibration-cube.gcode',
    parameters: {
      bedTemp: { placeholder: 'S80', description: 'Bed temperature (°C)' },
      hotendTemp: { placeholder: 'S185', description: 'Initial hotend temperature (°C)' },
      finalHotendTemp: { placeholder: 'S235', description: 'Final hotend temperature (°C)' },
      layerHeight: { placeholder: 'Z0.280', description: 'Layer height (mm)' },
      retractionDistance: { placeholder: 'E-6', description: 'Retraction distance (mm)' },
      retractionSpeed: { placeholder: 'F2400', description: 'Retraction speed (mm/min)' },
      printSpeed: { placeholder: 'F3300', description: 'Print speed (mm/min)' },
      travelSpeed: { placeholder: 'F11000', description: 'Travel speed (mm/min)' },
      enableABL: { placeholder: ';G29', description: 'Enable auto bed leveling (G29)' },
      restoreABL: { placeholder: 'M420 S1', description: 'Restore ABL mesh' }
    },
    defaultValues: {
      bedTemp: 80,
      hotendTemp: 185,
      finalHotendTemp: 235,
      layerHeight: 0.28,
      retractionDistance: 6,
      retractionSpeed: 2400,
      printSpeed: 3300,
      travelSpeed: 11000,
      enableABL: false,
      restoreABL: true
    }
  },
  'speed-calibration': {
    filename: 'speed.gcode',
    parameters: {
      bedTemp: { placeholder: 'S50', description: 'Bed temperature (°C)' },
      hotendTemp: { placeholder: 'S240', description: 'Initial hotend temperature (°C)' },
      finalHotendTemp: { placeholder: 'S240', description: 'Final hotend temperature (°C)' },
      layerHeight: { placeholder: 'Z0.28', description: 'Layer height (mm)' },
      retractionDistance: { placeholder: 'E-6', description: 'Retraction distance (mm)' },
      retractionSpeed: { placeholder: 'F2700', description: 'Retraction speed (mm/min)' },
      printSpeed: { placeholder: 'F1500', description: 'Print speed (mm/min)' },
      travelSpeed: { placeholder: 'F7500', description: 'Travel speed (mm/min)' },
      enableABL: { placeholder: ';G29', description: 'Enable auto bed leveling (G29)' },
      restoreABL: { placeholder: 'M420 S1', description: 'Restore ABL mesh' }
    },
    defaultValues: {
      bedTemp: 50,
      hotendTemp: 240,
      finalHotendTemp: 240,
      layerHeight: 0.28,
      retractionDistance: 6,
      retractionSpeed: 2700,
      printSpeed: 1500,
      travelSpeed: 7500,
      enableABL: false,
      restoreABL: false
    }
  }
}

/**
 * Generate parameterized G-code for a calibration step
 */
export async function generateParameterizedGcode(stepId, parameters = {}) {
  const stepConfig = gcodeParameters[stepId]
  if (!stepConfig) {
    throw new Error(`No G-code configuration found for step: ${stepId}`)
  }

  // Load the base G-code file
  const baseGcode = await loadGcodeFile(stepConfig.filename)
  
  // Merge user parameters with defaults
  const finalParams = { ...stepConfig.defaultValues, ...parameters }
  
  // Replace parameters in the G-code
  let parameterizedGcode = baseGcode
  
  // Replace each parameter
  for (const [paramKey, paramConfig] of Object.entries(stepConfig.parameters)) {
    const value = finalParams[paramKey]
    const placeholder = paramConfig.placeholder
    
    if (typeof value === 'boolean') {
      // Handle boolean parameters (like enableABL, restoreABL)
      if (value) {
        // Enable the command by removing the comment
        parameterizedGcode = parameterizedGcode.replace(`;${placeholder}`, placeholder)
      } else {
        // Disable the command by commenting it out
        parameterizedGcode = parameterizedGcode.replace(placeholder, `;${placeholder}`)
      }
    } else {
      // Handle numeric parameters
      const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      parameterizedGcode = parameterizedGcode.replace(regex, placeholder.replace(/\d+\.?\d*/, value))
    }
  }
  
  return {
    gcode: parameterizedGcode,
    parameters: finalParams,
    stepConfig
  }
}

/**
 * Get parameter definitions for a calibration step
 */
export function getStepParameters(stepId) {
  const stepConfig = gcodeParameters[stepId]
  if (!stepConfig) {
    return null
  }
  
  return {
    parameters: stepConfig.parameters,
    defaultValues: stepConfig.defaultValues
  }
}

/**
 * Validate parameters for a calibration step
 */
export function validateParameters(stepId, parameters) {
  const stepConfig = gcodeParameters[stepId]
  if (!stepConfig) {
    return { valid: false, errors: [`Unknown step: ${stepId}`] }
  }
  
  const errors = []
  
  for (const [paramKey, paramConfig] of Object.entries(stepConfig.parameters)) {
    const value = parameters[paramKey]
    
    if (value === undefined || value === null || value === '') {
      continue // Skip validation for undefined values
    }
    
    if (typeof value === 'number') {
      // Basic numeric validation
      if (isNaN(value)) {
        errors.push(`${paramConfig.description} must be a valid number`)
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}