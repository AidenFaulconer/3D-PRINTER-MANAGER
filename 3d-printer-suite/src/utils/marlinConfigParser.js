/**
 * Parse Marlin firmware configuration files to extract #define directives
 * @param {string} configText - The text content of the configuration file
 * @param {boolean} isAdvanced - Whether this is Configuration_adv.h (advanced config)
 * @returns {Array} Array of parsed configuration objects
 */
export function parseMarlinConfig(configText, isAdvanced = false) {
  if (!configText || typeof configText !== 'string') {
    return []
  }

  const lines = configText.split('\n')
  const configs = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines and pure comment lines (but not commented #define lines)
    if (!line || (line.startsWith('//') && !line.includes('#define')) || line.startsWith('/*')) {
      continue
    }

    // Look for #define directives (including commented out ones)
    // This regex handles:
    // #define NAME value
    // //#define NAME value  
    // // #define NAME value
    // //  #define NAME value
    let match = line.match(/^(\s*\/\/\s*)?#define\s+([A-Za-z0-9_]+)\s*(.*)/)
    
    if (match) {
      const [, commentPrefix, name, rest] = match
      const isCommentedOut = !!commentPrefix
      
      // Extract value and description
      let value = ''
      let description = ''
      
      if (rest) {
        // Split on comment markers
        const parts = rest.split(/(?:\/\/|\/\*)/)
        const valuePart = parts[0].trim()
        
                // For commented defines, the value might be empty or different
        if (isCommentedOut && !valuePart) {
          value = false // Default to false for commented defines with no value
        } else if (valuePart) {
          // Handle different value types
          if (valuePart === 'true' || valuePart === 'false') {
            value = valuePart === 'true'
          } else if (valuePart === '1' || valuePart === '0') {
            value = valuePart === '1'
          } else if (!isNaN(valuePart) && valuePart !== '') {
            // Check if it's a number (including decimals and negative)
            if (valuePart.includes('.') || valuePart.startsWith('-')) {
              value = parseFloat(valuePart)
            } else {
              value = parseInt(valuePart, 10)
            }
          } else if (valuePart.startsWith('"') && valuePart.endsWith('"')) {
            // String value
            value = valuePart.slice(1, -1)
          } else if (valuePart.startsWith("'") && valuePart.endsWith("'")) {
            // Character value
            value = valuePart.slice(1, -1)
          } else {
            // Other values (like expressions, constants, etc.)
            value = valuePart
          }
        }
        
        // Extract description from comments
        if (parts.length > 1) {
          description = parts[1].trim()
        }
      }
      
      // Look for description in the next line if it's a comment
      if (!description && i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim()
        if (nextLine.startsWith('//') && !nextLine.includes('#define')) {
          description = nextLine.substring(2).trim()
        }
      }
      
      // Look for description in the previous line if it's a comment
      if (!description && i > 0) {
        const prevLine = lines[i - 1].trim()
        if (prevLine.startsWith('//') && !prevLine.includes('#define')) {
          description = prevLine.substring(2).trim()
        }
      }

      // Debug logging for commented defines
      if (isCommentedOut) {
        console.log(`Found commented define: ${name} (line ${i + 1})`)
      }
      
      configs.push({
        name,
        value,
        enabled: !isCommentedOut,
        description,
        lineNumber: i + 1,
        fileType: isAdvanced ? 'advanced' : 'basic'
      })
    }
  }

  // Log parsing summary
  const enabledCount = configs.filter(c => c.enabled).length
  const disabledCount = configs.filter(c => !c.enabled).length
  console.log(`Parsed ${configs.length} defines: ${enabledCount} enabled, ${disabledCount} disabled`)
  
  return configs
}

/**
 * Group configuration items by category for better organization
 * @param {Array} configs - Array of parsed configuration objects
 * @returns {Object} Grouped configurations by category
 */
export function groupConfigsByCategory(configs) {
  const categories = {
    'Machine Configuration': [],
    'Driver Settings': [],
    'Endstops': [],
    'Movement': [],
    'Temperature': [],
    'Filament': [],
    'LCD & UI': [],
    'Advanced Features': [],
    'Other': []
  }

  const categoryKeywords = {
    'Machine Configuration': ['MACHINE', 'BOARD', 'PRINTER', 'BED', 'CHAMBER'],
    'Driver Settings': ['DRIVER', 'STEP', 'MOTOR', 'TMC', 'A4988'],
    'Endstops': ['ENDSTOP', 'STOP', 'LIMIT', 'HOME'],
    'Movement': ['MOVE', 'TRAVEL', 'SPEED', 'ACCEL', 'JERK'],
    'Temperature': ['TEMP', 'THERMAL', 'HEAT', 'COOL', 'FAN'],
    'Filament': ['FILAMENT', 'EXTRUDER', 'E_STEP', 'FLOW'],
    'LCD & UI': ['LCD', 'DISPLAY', 'UI', 'MENU', 'BUTTON'],
    'Advanced Features': ['ADVANCED', 'EXPERIMENTAL', 'DEBUG', 'TEST']
  }

  configs.forEach(config => {
    let categorized = false
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => 
        config.name.toUpperCase().includes(keyword) || 
        config.description.toUpperCase().includes(keyword)
      )) {
        categories[category].push(config)
        categorized = true
        break
      }
    }
    
    if (!categorized) {
      categories['Other'].push(config)
    }
  })

  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key]
    }
  })

  return categories
}

/**
 * Filter configurations by search term
 * @param {Array} configs - Array of parsed configuration objects
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered configurations
 */
export function filterConfigs(configs, searchTerm) {
  if (!searchTerm) return configs
  
  const term = searchTerm.toLowerCase()
  return configs.filter(config => 
    config.name.toLowerCase().includes(term) ||
    config.description.toLowerCase().includes(term) ||
    String(config.value).toLowerCase().includes(term)
  )
}

/**
 * Sort configurations by various criteria
 * @param {Array} configs - Array of parsed configuration objects
 * @param {string} sortBy - Field to sort by ('name', 'enabled', 'value', 'description')
 * @param {string} sortOrder - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted configurations
 */
export function sortConfigs(configs, sortBy = 'name', sortOrder = 'asc') {
  return [...configs].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    
    // Handle boolean values
    if (typeof aVal === 'boolean') aVal = aVal ? 1 : 0
    if (typeof bVal === 'boolean') bVal = bVal ? 1 : 0
    
    // Handle numeric values
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    // Handle string values
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal)
      return sortOrder === 'asc' ? comparison : -comparison
    }
    
    // Fallback to string comparison
    const comparison = String(aVal).localeCompare(String(bVal))
    return sortOrder === 'asc' ? comparison : -comparison
  })
}
