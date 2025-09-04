/**
 * Parses a Cura config file (.cfg) into a structured object
 * @param {string} content - Raw content of the config file
 * @returns {Object|null} Parsed settings or null if parsing fails
 */
export function parseCuraConfig(content) {
  try {
    const settings = {}
    let currentSection = null
    
    // Split into lines and process each
    const lines = content.split(/\r?\n/)
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith(';')) continue
      
      // Check for section header
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        currentSection = trimmed.slice(1, -1)
        settings[currentSection] = {}
        continue
      }
      
      // Process key=value pairs
      if (currentSection && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=')
        const value = valueParts.join('=').trim() // Handle values that might contain =
        
        // Try to parse numbers and booleans
        let parsedValue = value
        if (value.toLowerCase() === 'true') parsedValue = true
        else if (value.toLowerCase() === 'false') parsedValue = false
        else if (!isNaN(value)) parsedValue = parseFloat(value)
        
        settings[currentSection][key.trim()] = parsedValue
      }
    }
    
    // Basic validation - must have at least one section
    return Object.keys(settings).length > 0 ? settings : null
    
  } catch (e) {
    console.warn('Failed to parse Cura config:', e)
    return null
  }
}

/**
 * Converts profile settings back to Cura config format
 * @param {Object} settings - Profile settings object
 * @returns {string} Formatted config file content
 */
export function generateCuraConfig(settings) {
  const lines = []
  
  for (const [section, values] of Object.entries(settings)) {
    // Add section header
    lines.push(`[${section}]`)
    
    // Add key=value pairs
    for (const [key, value] of Object.entries(values)) {
      lines.push(`${key}=${value}`)
    }
    
    // Add blank line between sections
    lines.push('')
  }
  
  return lines.join('\n')
}

/**
 * Schema for validating Cura settings
 * This is a subset of common settings - extend as needed
 */
export const CURA_SETTINGS_SCHEMA = {
  resolution: {
    layer_height: { type: 'number', min: 0.05, max: 0.35 },
    initial_layer_height: { type: 'number', min: 0.1, max: 0.5 },
    line_width: { type: 'number', min: 0.1, max: 2 }
  },
  material: {
    material_print_temperature: { type: 'number', min: 150, max: 300 },
    material_bed_temperature: { type: 'number', min: 0, max: 120 },
    material_flow: { type: 'number', min: 50, max: 200 },
    retraction_enable: { type: 'boolean' },
    retraction_amount: { type: 'number', min: 0, max: 10 },
    retraction_speed: { type: 'number', min: 0, max: 100 }
  },
  speed: {
    speed_print: { type: 'number', min: 10, max: 300 },
    speed_travel: { type: 'number', min: 10, max: 500 },
    speed_layer_0: { type: 'number', min: 5, max: 100 },
    acceleration_print: { type: 'number', min: 100, max: 5000 },
    acceleration_travel: { type: 'number', min: 100, max: 5000 }
  },
  cooling: {
    cool_fan_enabled: { type: 'boolean' },
    cool_fan_speed: { type: 'number', min: 0, max: 100 },
    cool_fan_speed_0: { type: 'number', min: 0, max: 100 },
    cool_min_layer_time: { type: 'number', min: 0, max: 60 }
  },
  support: {
    support_enable: { type: 'boolean' },
    support_type: { type: 'enum', values: ['none', 'buildplate', 'everywhere'] },
    support_angle: { type: 'number', min: 0, max: 90 },
    support_pattern: { type: 'enum', values: ['grid', 'lines', 'triangles', 'concentric', 'zigzag'] }
  },
  adhesion: {
    adhesion_type: { type: 'enum', values: ['none', 'skirt', 'brim', 'raft'] },
    skirt_line_count: { type: 'number', min: 0, max: 20 },
    brim_width: { type: 'number', min: 0, max: 30 },
    raft_margin: { type: 'number', min: 0, max: 30 }
  },
  infill: {
    infill_sparse_density: { type: 'number', min: 0, max: 100 },
    infill_pattern: { type: 'enum', values: ['grid', 'lines', 'triangles', 'cubic', 'tetrahedral', 'concentric', 'zigzag', 'cross', 'cross_3d', 'gyroid'] },
    infill_overlap: { type: 'number', min: 0, max: 100 },
    infill_wipe_dist: { type: 'number', min: 0, max: 10 }
  },
  shell: {
    wall_thickness: { type: 'number', min: 0.1, max: 5 },
    wall_line_count: { type: 'number', min: 0, max: 10 },
    top_thickness: { type: 'number', min: 0.1, max: 5 },
    top_layers: { type: 'number', min: 0, max: 20 },
    bottom_thickness: { type: 'number', min: 0.1, max: 5 },
    bottom_layers: { type: 'number', min: 0, max: 20 }
  }
}

/**
 * Validates profile settings against the schema
 * @param {Object} settings - Profile settings to validate
 * @returns {Object} Validation results { isValid: boolean, errors: Array }
 */
export function validateProfileSettings(settings) {
  const errors = []
  
  for (const [section, schema] of Object.entries(CURA_SETTINGS_SCHEMA)) {
    const sectionSettings = settings[section]
    if (!sectionSettings) continue
    
    for (const [key, rules] of Object.entries(schema)) {
      const value = sectionSettings[key]
      if (value === undefined) continue
      
      switch (rules.type) {
        case 'number':
          if (typeof value !== 'number') {
            errors.push(`${section}.${key}: Expected number, got ${typeof value}`)
          } else {
            if ('min' in rules && value < rules.min) {
              errors.push(`${section}.${key}: Value ${value} is below minimum ${rules.min}`)
            }
            if ('max' in rules && value > rules.max) {
              errors.push(`${section}.${key}: Value ${value} is above maximum ${rules.max}`)
            }
          }
          break
          
        case 'boolean':
          if (typeof value !== 'boolean') {
            errors.push(`${section}.${key}: Expected boolean, got ${typeof value}`)
          }
          break
          
        case 'enum':
          if (!rules.values.includes(value)) {
            errors.push(`${section}.${key}: Invalid value "${value}". Must be one of: ${rules.values.join(', ')}`)
          }
          break
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Compares two profiles and returns their differences
 * @param {Object} profile1 - First profile settings
 * @param {Object} profile2 - Second profile settings
 * @returns {Object} Differences { section: { key: { old: value1, new: value2 } } }
 */
export function compareProfiles(profile1, profile2) {
  const differences = {}
  
  // Get all sections from both profiles
  const sections = new Set([
    ...Object.keys(profile1),
    ...Object.keys(profile2)
  ])
  
  for (const section of sections) {
    const section1 = profile1[section] || {}
    const section2 = profile2[section] || {}
    
    // Get all keys from both sections
    const keys = new Set([
      ...Object.keys(section1),
      ...Object.keys(section2)
    ])
    
    for (const key of keys) {
      const value1 = section1[key]
      const value2 = section2[key]
      
      // Check for differences
      if (value1 !== value2) {
        if (!differences[section]) {
          differences[section] = {}
        }
        differences[section][key] = {
          old: value1,
          new: value2
        }
      }
    }
  }
  
  return differences
}

/**
 * Optimizes profile settings based on common patterns and rules
 * @param {Object} settings - Profile settings to optimize
 * @returns {Object} Optimization suggestions { setting: { current, suggested, reason } }
 */
export function analyzeProfileOptimizations(settings) {
  const suggestions = {}
  
  // Check layer height vs nozzle size relationship
  if (settings.resolution?.layer_height && settings.resolution?.line_width) {
    const layerHeight = settings.resolution.layer_height
    const lineWidth = settings.resolution.line_width
    
    if (layerHeight > lineWidth * 0.8) {
      suggestions['resolution.layer_height'] = {
        current: layerHeight,
        suggested: lineWidth * 0.8,
        reason: 'Layer height should generally not exceed 80% of line width for optimal layer adhesion'
      }
    }
  }
  
  // Check retraction settings
  if (settings.material?.retraction_enable) {
    const amount = settings.material?.retraction_amount
    const speed = settings.material?.retraction_speed
    
    if (amount > 8) {
      suggestions['material.retraction_amount'] = {
        current: amount,
        suggested: 8,
        reason: 'Very high retraction amounts can cause filament grinding. Consider reducing unless specifically needed.'
      }
    }
    
    if (speed > 60) {
      suggestions['material.retraction_speed'] = {
        current: speed,
        suggested: 60,
        reason: 'Very high retraction speeds can cause filament grinding. Consider reducing unless specifically needed.'
      }
    }
  }
  
  // Check speed vs acceleration relationship
  if (settings.speed?.speed_print && settings.speed?.acceleration_print) {
    const speed = settings.speed.speed_print
    const accel = settings.speed.acceleration_print
    
    const minAccel = speed * speed / 40 // Simple approximation
    if (accel < minAccel) {
      suggestions['speed.acceleration_print'] = {
        current: accel,
        suggested: Math.ceil(minAccel),
        reason: 'Print acceleration may be too low to reach target speed. Consider increasing for better performance.'
      }
    }
  }
  
  // Check cooling settings vs layer time
  if (settings.cooling?.cool_fan_enabled && settings.cooling?.cool_min_layer_time) {
    const minLayerTime = settings.cooling.cool_min_layer_time
    const fanSpeed = settings.cooling.cool_fan_speed
    
    if (minLayerTime < 5 && fanSpeed < 100) {
      suggestions['cooling.cool_fan_speed'] = {
        current: fanSpeed,
        suggested: 100,
        reason: 'Short layer times with reduced fan speed may cause insufficient cooling. Consider maximum fan speed.'
      }
    }
  }
  
  return suggestions
}
