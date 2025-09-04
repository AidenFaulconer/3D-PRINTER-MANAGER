import React, { useMemo } from 'react'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

// Safety validation rules for different setting types
const SAFETY_RULES = {
  'stepsPerUnit': {
    min: 1,
    max: 1000,
    warning: 'Values outside normal range may cause dimensional inaccuracy',
    critical: 'Extreme values can damage the printer'
  },
  'feedrates': {
    min: 1,
    max: 10000,
    warning: 'High feedrates may cause skipped steps',
    critical: 'Excessive feedrates can damage motors'
  },
  'acceleration': {
    min: 1,
    max: 10000,
    warning: 'High acceleration may cause print quality issues',
    critical: 'Excessive acceleration can damage the printer'
  },
  'pid': {
    min: 0,
    max: 100,
    warning: 'Incorrect PID values can cause temperature instability',
    critical: 'Extreme PID values can cause thermal runaway'
  },
  'zProbeOffset': {
    min: -10,
    max: 10,
    warning: 'Incorrect Z probe offset affects first layer height',
    critical: 'Extreme Z probe offset can cause nozzle crashes'
  },
  'linearAdvance': {
    min: 0,
    max: 10,
    warning: 'High linear advance values may cause extrusion issues',
    critical: 'Extreme linear advance can damage the extruder'
  }
}

const SafetyValidator = ({ settingKey, value, settingType }) => {
  const validation = useMemo(() => {
    if (value === null || value === undefined || value === '') {
      return { level: 'info', message: 'No value set' }
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      return { level: 'error', message: 'Invalid numeric value' }
    }

    // Find matching safety rule
    let rule = null
    for (const [key, ruleData] of Object.entries(SAFETY_RULES)) {
      if (settingKey.includes(key)) {
        rule = ruleData
        break
      }
    }

    if (!rule) {
      return { level: 'info', message: 'No safety validation available' }
    }

    // Check critical range
    if (numValue < rule.min * 0.1 || numValue > rule.max * 10) {
      return { level: 'critical', message: rule.critical }
    }

    // Check warning range
    if (numValue < rule.min || numValue > rule.max) {
      return { level: 'warning', message: rule.warning }
    }

    // Check if value is at extreme ends of safe range
    const safeRange = rule.max - rule.min
    const normalizedValue = (numValue - rule.min) / safeRange
    
    if (normalizedValue < 0.1 || normalizedValue > 0.9) {
      return { level: 'caution', message: 'Value is at extreme end of safe range' }
    }

    return { level: 'safe', message: 'Value is within safe range' }
  }, [settingKey, value, settingType])

  const getIcon = () => {
    switch (validation.level) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'caution':
        return <Info className="w-4 h-4 text-blue-600" />
      case 'safe':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getColorClasses = () => {
    switch (validation.level) {
      case 'critical':
        return 'text-red-800 bg-red-50 border-red-200'
      case 'warning':
        return 'text-yellow-800 bg-yellow-50 border-yellow-200'
      case 'caution':
        return 'text-blue-800 bg-blue-50 border-blue-200'
      case 'safe':
        return 'text-green-800 bg-green-50 border-green-200'
      default:
        return 'text-gray-800 bg-gray-50 border-gray-200'
    }
  }

  if (validation.level === 'info') {
    return null
  }

  return (
    <div className={`mt-2 p-2 rounded border text-xs ${getColorClasses()}`}>
      <div className="flex items-center">
        {getIcon()}
        <span className="ml-1 font-medium">{validation.message}</span>
      </div>
    </div>
  )
}

// Dangerous settings that require extra confirmation
export const DANGEROUS_SETTINGS = [
  'pid.hotend.p',
  'pid.hotend.i', 
  'pid.hotend.d',
  'pid.bed.p',
  'pid.bed.i',
  'pid.bed.d',
  'stepsPerUnit.x',
  'stepsPerUnit.y',
  'stepsPerUnit.z',
  'stepsPerUnit.e',
  'zProbeOffset.z',
  'homeOffset.z'
]

// Validation function for bulk operations
export const validateBulkCommands = (commands) => {
  const results = []
  
  for (const command of commands) {
    const result = { command, valid: true, warnings: [], errors: [] }
    
    // Check for dangerous commands
    if (command.includes('M112')) {
      result.warnings.push('M112 is an emergency stop command')
    }
    
    if (command.includes('M502')) {
      result.warnings.push('M502 resets all settings to defaults')
    }
    
    if (command.includes('M999')) {
      result.warnings.push('M999 resets the printer')
    }
    
    // Check for invalid G-code format
    if (!/^[GM]\d+/.test(command.trim())) {
      result.errors.push('Invalid G-code format')
      result.valid = false
    }
    
    // Check for potentially dangerous values
    const dangerousPatterns = [
      { pattern: /M92\s+X(\d+)/, type: 'stepsPerUnit', axis: 'X' },
      { pattern: /M92\s+Y(\d+)/, type: 'stepsPerUnit', axis: 'Y' },
      { pattern: /M92\s+Z(\d+)/, type: 'stepsPerUnit', axis: 'Z' },
      { pattern: /M92\s+E(\d+)/, type: 'stepsPerUnit', axis: 'E' },
      { pattern: /M203\s+X(\d+)/, type: 'feedrates', axis: 'X' },
      { pattern: /M203\s+Y(\d+)/, type: 'feedrates', axis: 'Y' },
      { pattern: /M203\s+Z(\d+)/, type: 'feedrates', axis: 'Z' },
      { pattern: /M203\s+E(\d+)/, type: 'feedrates', axis: 'E' },
      { pattern: /M301\s+P(\d+(?:\.\d+)?)/, type: 'pid', param: 'P' },
      { pattern: /M301\s+I(\d+(?:\.\d+)?)/, type: 'pid', param: 'I' },
      { pattern: /M301\s+D(\d+(?:\.\d+)?)/, type: 'pid', param: 'D' },
      { pattern: /M851\s+Z(-?\d+(?:\.\d+)?)/, type: 'zProbeOffset', axis: 'Z' }
    ]
    
    for (const { pattern, type, axis, param } of dangerousPatterns) {
      const match = command.match(pattern)
      if (match) {
        const value = parseFloat(match[1])
        const rule = SAFETY_RULES[type]
        
        if (rule) {
          if (value < rule.min * 0.1 || value > rule.max * 10) {
            result.errors.push(`${type} ${axis || param} value ${value} is critically dangerous`)
            result.valid = false
          } else if (value < rule.min || value > rule.max) {
            result.warnings.push(`${type} ${axis || param} value ${value} is outside safe range`)
          }
        }
      }
    }
    
    results.push(result)
  }
  
  return results
}

export default SafetyValidator
