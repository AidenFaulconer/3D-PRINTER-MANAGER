/**
 * Issue analysis and diagnostic utilities
 */

// Issue categories and their descriptions
export const ISSUE_CATEGORIES = {
  mechanical: {
    label: 'Mechanical',
    description: 'Physical printer components, movement, and structural issues',
    color: 'blue'
  },
  electrical: {
    label: 'Electrical',
    description: 'Wiring, sensors, heating elements, and power-related issues',
    color: 'yellow'
  },
  firmware: {
    label: 'Firmware',
    description: 'Configuration, settings, and software-related issues',
    color: 'purple'
  }
}

// Issue status configurations
export const ISSUE_STATUS = {
  open: {
    label: 'Open',
    description: 'Issue reported and needs attention',
    color: 'red'
  },
  'in-progress': {
    label: 'In Progress',
    description: 'Currently working on this issue',
    color: 'yellow'
  },
  resolved: {
    label: 'Resolved',
    description: 'Issue has been fixed',
    color: 'green'
  }
}

// Static keyword mapping for issue analysis
export const ISSUE_ANALYSIS_RULES = {
  // Under-extrusion issues
  'under-extrusion': [
    'Check extruder tension and ensure proper grip on filament',
    'Calibrate E-Steps to ensure accurate extrusion amounts',
    'Increase nozzle temperature by 5-10°C',
    'Check for partial nozzle clogs',
    'Verify filament diameter settings in slicer',
    'Check for worn extruder gear'
  ],
  'under extrusion': [
    'Check extruder tension and ensure proper grip on filament',
    'Calibrate E-Steps to ensure accurate extrusion amounts',
    'Increase nozzle temperature by 5-10°C',
    'Check for partial nozzle clogs',
    'Verify filament diameter settings in slicer'
  ],

  // Over-extrusion issues
  'over-extrusion': [
    'Reduce flow rate in slicer by 5-10%',
    'Lower nozzle temperature by 5-10°C',
    'Recalibrate E-Steps (may be too high)',
    'Check linear advance settings',
    'Verify filament diameter is correct'
  ],
  'over extrusion': [
    'Reduce flow rate in slicer by 5-10%',
    'Lower nozzle temperature by 5-10°C',
    'Recalibrate E-Steps (may be too high)',
    'Check linear advance settings'
  ],

  // Stringing and oozing
  'stringing': [
    'Increase retraction distance (try 0.5-1mm more)',
    'Increase retraction speed',
    'Lower nozzle temperature by 5-10°C',
    'Enable "Wipe Nozzle" in slicer settings',
    'Reduce print speed for travel moves',
    'Check for worn PTFE tube in Bowden setups'
  ],
  'oozing': [
    'Increase retraction distance',
    'Lower nozzle temperature',
    'Enable retraction at layer change',
    'Check nozzle for damage or wear'
  ],

  // Layer adhesion issues
  'layer adhesion': [
    'Increase nozzle temperature by 5-10°C',
    'Reduce cooling fan speed for first few layers',
    'Increase print speed slightly to improve heat transfer',
    'Check for drafts affecting the print area',
    'Clean the nozzle and check for partial clogs'
  ],
  'delamination': [
    'Increase bed and nozzle temperatures',
    'Reduce cooling fan speed',
    'Check for environmental temperature fluctuations',
    'Increase infill percentage for structural parts'
  ],

  // Bed adhesion issues
  'bed adhesion': [
    'Level the bed more precisely',
    'Clean bed surface with isopropyl alcohol',
    'Adjust first layer height (try 0.1-0.3mm)',
    'Increase bed temperature by 5-10°C',
    'Use adhesion aids (hairspray, glue stick, or specialized bed adhesives)',
    'Check first layer extrusion width settings'
  ],
  'warping': [
    'Increase bed temperature',
    'Use a heated enclosure or reduce drafts',
    'Apply adhesion aids to bed surface',
    'Add brim or raft to print',
    'Check bed level and first layer height'
  ],

  // Print quality issues
  'layer shifting': [
    'Check belt tension (should be tight but not over-tensioned)',
    'Verify stepper motor connections',
    'Reduce print speed and acceleration',
    'Check for mechanical obstructions in axis movement',
    'Verify stepper driver current settings',
    'Check for loose pulleys or set screws'
  ],
  'ghosting': [
    'Reduce print speed and acceleration',
    'Tighten frame connections and check for mechanical looseness',
    'Add dampers to stepper motors',
    'Check belt tension',
    'Enable S-curve acceleration if supported'
  ],
  'ringing': [
    'Reduce print speed, especially for outer perimeters',
    'Lower acceleration and jerk settings',
    'Check frame rigidity and tighten loose components',
    'Enable pressure advance/linear advance',
    'Consider adding anti-vibration feet to printer'
  ],

  // Temperature issues
  'temperature fluctuation': [
    'Run PID autotune for hotend and bed',
    'Check thermistor connections',
    'Verify heater cartridge is properly secured',
    'Check for loose wiring',
    'Ensure adequate power supply capacity'
  ],
  'thermal runaway': [
    'Check thermistor and heater connections immediately',
    'Verify thermistor is properly secured to hotend',
    'Check for damaged wiring',
    'Test heater cartridge resistance',
    'Ensure thermal protection is enabled in firmware'
  ],

  // Mechanical issues
  'grinding': [
    'Check extruder tension (may be too tight)',
    'Verify filament path is clear',
    'Check for nozzle clogs',
    'Increase nozzle temperature',
    'Check extruder gear for wear or damage'
  ],
  'clicking': [
    'Check for nozzle clogs',
    'Reduce extruder tension slightly',
    'Increase nozzle temperature',
    'Check filament diameter and quality',
    'Verify correct steps/mm calibration'
  ],
  'jamming': [
    'Check for nozzle clogs and perform cold pull',
    'Verify PTFE tube is properly seated (Bowden setups)',
    'Check for heat creep in hotend',
    'Ensure proper filament storage (dry conditions)',
    'Check extruder alignment and filament path'
  ],

  // Cooling issues
  'overheating': [
    'Check part cooling fan operation',
    'Verify hotend cooling fan is working',
    'Reduce print speed for small features',
    'Add minimum layer time settings',
    'Check for adequate ventilation around printer'
  ],
  'curling': [
    'Increase part cooling fan speed',
    'Reduce nozzle temperature',
    'Add supports for overhanging features',
    'Reduce print speed for overhangs',
    'Check cooling fan duct alignment'
  ]
}

/**
 * Analyze an issue description and return suggested solutions
 */
export function analyzeIssue(title, description) {
  const text = `${title} ${description}`.toLowerCase()
  const suggestions = new Set()

  // Check for keyword matches
  Object.entries(ISSUE_ANALYSIS_RULES).forEach(([keyword, actions]) => {
    if (text.includes(keyword)) {
      actions.forEach(action => suggestions.add(action))
    }
  })

  // Convert to array and limit to most relevant suggestions
  const suggestionArray = Array.from(suggestions)
  
  // If no specific matches, provide general troubleshooting steps
  if (suggestionArray.length === 0) {
    return [
      'Check basic printer maintenance (bed level, belt tension, cleanliness)',
      'Verify slicer settings match printer specifications',
      'Ensure filament quality and proper storage',
      'Check for loose connections and mechanical issues',
      'Review recent changes to printer or settings'
    ]
  }

  // Return top 8 suggestions to avoid overwhelming the user
  return suggestionArray.slice(0, 8)
}

/**
 * Get category information by key
 */
export function getCategoryInfo(category) {
  return ISSUE_CATEGORIES[category] || {
    label: 'Unknown',
    description: 'Unknown category',
    color: 'gray'
  }
}

/**
 * Get status information by key
 */
export function getStatusInfo(status) {
  return ISSUE_STATUS[status] || {
    label: 'Unknown',
    description: 'Unknown status',
    color: 'gray'
  }
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  
  return date.toLocaleDateString()
}

/**
 * Generate issue summary statistics
 */
export function getIssueStats(issues) {
  if (!issues || issues.length === 0) {
    return {
      total: 0,
      open: 0,
      inProgress: 0,
      resolved: 0,
      byCategory: {
        mechanical: 0,
        electrical: 0,
        firmware: 0
      }
    }
  }

  const stats = {
    total: issues.length,
    open: 0,
    inProgress: 0,
    resolved: 0,
    byCategory: {
      mechanical: 0,
      electrical: 0,
      firmware: 0
    }
  }

  issues.forEach(issue => {
    // Count by status
    if (issue.status === 'open') stats.open++
    else if (issue.status === 'in-progress') stats.inProgress++
    else if (issue.status === 'resolved') stats.resolved++

    // Count by category
    if (stats.byCategory.hasOwnProperty(issue.category)) {
      stats.byCategory[issue.category]++
    }
  })

  return stats
}

