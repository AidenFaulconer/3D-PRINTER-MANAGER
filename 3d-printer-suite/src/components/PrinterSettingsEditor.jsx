import React, { useState, useMemo, useCallback, useRef } from 'react'
import { 
  Settings, 
  Save, 
  Send, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  RotateCcw,
  Download,
  Upload
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import usePrintersStore from '../stores/printersStore'
import SafetyValidator, { DANGEROUS_SETTINGS } from './SafetyValidator'

// Setting field component with validation and documentation
const SettingField = ({ 
  setting, 
  value, 
  onChange, 
  onSend, 
  hasChanges, 
  isDangerous = false,
  documentation = null 
}) => {
  const [showHelp, setShowHelp] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const validateValue = useCallback((newValue) => {
    if (!setting.validation) {
      setIsValid(true)
      setErrorMessage('')
      return true
    }

    const { min, max, pattern, required } = setting.validation
    
    if (required && (newValue === '' || newValue === null || newValue === undefined)) {
      setIsValid(false)
      setErrorMessage('This field is required')
      return false
    }

    if (min !== undefined && parseFloat(newValue) < min) {
      setIsValid(false)
      setErrorMessage(`Value must be at least ${min}`)
      return false
    }

    if (max !== undefined && parseFloat(newValue) > max) {
      setIsValid(false)
      setErrorMessage(`Value must be at most ${max}`)
      return false
    }

    if (pattern && !pattern.test(String(newValue))) {
      setIsValid(false)
      setErrorMessage('Invalid format')
      return false
    }

    setIsValid(true)
    setErrorMessage('')
    return true
  }, [setting.validation])

  const handleChange = useCallback((newValue) => {
    validateValue(newValue)
    onChange(newValue)
  }, [onChange, validateValue])

  const handleSend = useCallback(() => {
    if (isValid && hasChanges) {
      // Check if this is a dangerous setting
      if (DANGEROUS_SETTINGS.includes(setting.key)) {
        if (!confirm(`Warning: ${setting.label} is a potentially dangerous setting. Are you sure you want to send this command?`)) {
          return
        }
      }
      onSend()
    }
  }, [isValid, hasChanges, onSend, setting.key, setting.label])

  const renderInput = () => {
    const inputProps = {
      value: value || '',
      onChange: (e) => handleChange(e.target.value),
      className: `w-full px-3 py-2 border rounded text-sm ${
        !isValid ? 'border-red-300 bg-red-50' : 
        hasChanges ? 'border-yellow-300 bg-yellow-50' : 
        'border-gray-300'
      }`,
      placeholder: setting.placeholder || ''
    }

    switch (setting.type) {
      case 'number':
        return (
          <input
            {...inputProps}
            type="number"
            step={setting.step || 'any'}
            min={setting.validation?.min}
            max={setting.validation?.max}
          />
        )
      case 'boolean':
        return (
          <select
            {...inputProps}
            value={value ? '1' : '0'}
            onChange={(e) => handleChange(e.target.value === '1')}
          >
            <option value="0">Disabled</option>
            <option value="1">Enabled</option>
          </select>
        )
      case 'select':
        return (
          <select {...inputProps}>
            {setting.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'text':
      default:
        return <input {...inputProps} type="text" />
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {setting.label}
          </label>
          {isDangerous && (
            <AlertTriangle className="w-4 h-4 text-red-500" title="Dangerous setting" />
          )}
          {documentation && (
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              Changed
            </span>
          )}
          <button
            onClick={handleSend}
            disabled={!isValid || !hasChanges}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="w-3 h-3 mr-1" />
            Send
          </button>
        </div>
      </div>

      <div className="flex space-x-2">
        {renderInput()}
        <span className="text-xs text-gray-500 self-center">
          {setting.unit || ''}
        </span>
      </div>

      {!isValid && errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}

      {showHelp && documentation && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
          <div className="font-medium text-blue-900 mb-1">Documentation</div>
          <div className="text-blue-800">{documentation.description}</div>
          {documentation.marlinRef && (
            <div className="mt-2 text-xs text-blue-600">
              Marlin Reference: {documentation.marlinRef}
            </div>
          )}
          {documentation.warning && (
            <div className="mt-2 text-xs text-red-600 font-medium">
              ⚠️ {documentation.warning}
            </div>
          )}
        </div>
      )}

      {/* Safety Validation */}
      <SafetyValidator 
        settingKey={setting.key} 
        value={value} 
        settingType={setting.type} 
      />
    </div>
  )
}

// Category section component
const SettingsCategory = ({ 
  category, 
  settings, 
  values, 
  onChange, 
  onSend, 
  changedSettings,
  isExpanded,
  onToggle 
}) => {
  const changedCount = Object.keys(changedSettings).filter(key => 
    settings.some(s => s.key === key && changedSettings[key])
  ).length

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          <h3 className="font-semibold text-gray-900">{category.name}</h3>
          <span className="text-sm text-gray-500">({settings.length} settings)</span>
          {changedCount > 0 && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              {changedCount} changed
            </span>
          )}
        </div>
        <category.icon className="w-5 h-5 text-gray-400" />
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {settings.map(setting => (
            <SettingField
              key={setting.key}
              setting={setting}
              value={values[setting.key]}
              onChange={(value) => onChange(setting.key, value)}
              onSend={() => onSend(setting)}
              hasChanges={changedSettings[setting.key]}
              isDangerous={setting.dangerous}
              documentation={setting.documentation}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Main settings editor component
const PrinterSettingsEditor = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedCategories, setExpandedCategories] = useState({})
  const [changedSettings, setChangedSettings] = useState({})
  const [settingsValues, setSettingsValues] = useState({})

  const serialStatus = useSerialStore(state => state.status)
  const sendCommand = useSerialStore(state => state.sendCommand)
  const sendBulkConfiguration = useSerialStore(state => state.sendBulkConfiguration)
  const processM503Response = useSerialStore(state => state.processM503Response)
  const fetchAllPrinterSettings = useSerialStore(state => state.fetchAllPrinterSettings)

  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
    return activePrinter?.printerSettings
  })
  const updatePrinterSettings = usePrintersStore(state => state.updatePrinterSettings)

  // Define all settings with validation and documentation
  const settingsDefinition = useMemo(() => [
    {
      category: 'motion',
      name: 'Motion Settings',
      icon: Settings,
      settings: [
        {
          key: 'stepsPerUnit.x',
          label: 'X Steps per Unit',
          type: 'number',
          unit: 'steps/mm',
          validation: { min: 1, max: 1000 },
          documentation: {
            description: 'Number of steps per millimeter for X-axis movement',
            marlinRef: 'M92 X<value>',
            warning: 'Incorrect values can cause dimensional inaccuracy'
          }
        },
        {
          key: 'stepsPerUnit.y',
          label: 'Y Steps per Unit',
          type: 'number',
          unit: 'steps/mm',
          validation: { min: 1, max: 1000 },
          documentation: {
            description: 'Number of steps per millimeter for Y-axis movement',
            marlinRef: 'M92 Y<value>'
          }
        },
        {
          key: 'stepsPerUnit.z',
          label: 'Z Steps per Unit',
          type: 'number',
          unit: 'steps/mm',
          validation: { min: 1, max: 1000 },
          documentation: {
            description: 'Number of steps per millimeter for Z-axis movement',
            marlinRef: 'M92 Z<value>'
          }
        },
        {
          key: 'stepsPerUnit.e',
          label: 'E Steps per Unit',
          type: 'number',
          unit: 'steps/mm',
          validation: { min: 1, max: 1000 },
          documentation: {
            description: 'Number of steps per millimeter for extruder',
            marlinRef: 'M92 E<value>'
          }
        },
        {
          key: 'feedrates.x',
          label: 'X Max Feedrate',
          type: 'number',
          unit: 'mm/min',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Maximum feedrate for X-axis movement',
            marlinRef: 'M203 X<value>'
          }
        },
        {
          key: 'feedrates.y',
          label: 'Y Max Feedrate',
          type: 'number',
          unit: 'mm/min',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Maximum feedrate for Y-axis movement',
            marlinRef: 'M203 Y<value>'
          }
        },
        {
          key: 'feedrates.z',
          label: 'Z Max Feedrate',
          type: 'number',
          unit: 'mm/min',
          validation: { min: 1, max: 1000 },
          documentation: {
            description: 'Maximum feedrate for Z-axis movement',
            marlinRef: 'M203 Z<value>'
          }
        },
        {
          key: 'feedrates.e',
          label: 'E Max Feedrate',
          type: 'number',
          unit: 'mm/min',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Maximum feedrate for extruder',
            marlinRef: 'M203 E<value>'
          }
        }
      ]
    },
    {
      category: 'acceleration',
      name: 'Acceleration Settings',
      icon: Settings,
      settings: [
        {
          key: 'acceleration.max',
          label: 'Max Acceleration',
          type: 'number',
          unit: 'mm/s²',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Maximum acceleration for all axes',
            marlinRef: 'M201',
            warning: 'Too high values can cause skipped steps'
          }
        },
        {
          key: 'acceleration.print',
          label: 'Print Acceleration',
          type: 'number',
          unit: 'mm/s²',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Acceleration used during printing',
            marlinRef: 'M204 P<value>'
          }
        },
        {
          key: 'acceleration.retract',
          label: 'Retract Acceleration',
          type: 'number',
          unit: 'mm/s²',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Acceleration used for retraction moves',
            marlinRef: 'M204 R<value>'
          }
        },
        {
          key: 'acceleration.travel',
          label: 'Travel Acceleration',
          type: 'number',
          unit: 'mm/s²',
          validation: { min: 1, max: 10000 },
          documentation: {
            description: 'Acceleration used for travel moves',
            marlinRef: 'M204 T<value>'
          }
        },
        {
          key: 'acceleration.jerk.x',
          label: 'X Jerk',
          type: 'number',
          unit: 'mm/s',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Maximum instantaneous speed change for X-axis',
            marlinRef: 'M205 X<value>'
          }
        },
        {
          key: 'acceleration.jerk.y',
          label: 'Y Jerk',
          type: 'number',
          unit: 'mm/s',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Maximum instantaneous speed change for Y-axis',
            marlinRef: 'M205 Y<value>'
          }
        },
        {
          key: 'acceleration.jerk.z',
          label: 'Z Jerk',
          type: 'number',
          unit: 'mm/s',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Maximum instantaneous speed change for Z-axis',
            marlinRef: 'M205 Z<value>'
          }
        },
        {
          key: 'acceleration.jerk.e',
          label: 'E Jerk',
          type: 'number',
          unit: 'mm/s',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Maximum instantaneous speed change for extruder',
            marlinRef: 'M205 E<value>'
          }
        }
      ]
    },
    {
      category: 'temperature',
      name: 'Temperature Settings',
      icon: Settings,
      settings: [
        {
          key: 'pid.hotend.p',
          label: 'Hotend PID P',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Proportional gain for hotend PID controller',
            marlinRef: 'M301 P<value>',
            warning: 'Incorrect PID values can cause temperature instability'
          },
          dangerous: true
        },
        {
          key: 'pid.hotend.i',
          label: 'Hotend PID I',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Integral gain for hotend PID controller',
            marlinRef: 'M301 I<value>'
          },
          dangerous: true
        },
        {
          key: 'pid.hotend.d',
          label: 'Hotend PID D',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Derivative gain for hotend PID controller',
            marlinRef: 'M301 D<value>'
          },
          dangerous: true
        },
        {
          key: 'pid.bed.p',
          label: 'Bed PID P',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Proportional gain for bed PID controller',
            marlinRef: 'M304 P<value>'
          },
          dangerous: true
        },
        {
          key: 'pid.bed.i',
          label: 'Bed PID I',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Integral gain for bed PID controller',
            marlinRef: 'M304 I<value>'
          },
          dangerous: true
        },
        {
          key: 'pid.bed.d',
          label: 'Bed PID D',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Derivative gain for bed PID controller',
            marlinRef: 'M304 D<value>'
          },
          dangerous: true
        }
      ]
    },
    {
      category: 'bedLeveling',
      name: 'Bed Leveling Settings',
      icon: Settings,
      settings: [
        {
          key: 'bedLeveling.enabled',
          label: 'Bed Leveling Enabled',
          type: 'boolean',
          documentation: {
            description: 'Enable or disable automatic bed leveling compensation',
            marlinRef: 'M420 S<0|1>'
          }
        },
        {
          key: 'bedLeveling.fadeHeight',
          label: 'Fade Height',
          type: 'number',
          unit: 'mm',
          validation: { min: 0, max: 100 },
          documentation: {
            description: 'Height at which bed leveling compensation fades out',
            marlinRef: 'M420 Z<value>'
          }
        },
        {
          key: 'zProbeOffset.x',
          label: 'Z Probe X Offset',
          type: 'number',
          unit: 'mm',
          validation: { min: -100, max: 100 },
          documentation: {
            description: 'X offset of the Z probe relative to the nozzle',
            marlinRef: 'M851 X<value>'
          }
        },
        {
          key: 'zProbeOffset.y',
          label: 'Z Probe Y Offset',
          type: 'number',
          unit: 'mm',
          validation: { min: -100, max: 100 },
          documentation: {
            description: 'Y offset of the Z probe relative to the nozzle',
            marlinRef: 'M851 Y<value>'
          }
        },
        {
          key: 'zProbeOffset.z',
          label: 'Z Probe Z Offset',
          type: 'number',
          unit: 'mm',
          validation: { min: -10, max: 10 },
          documentation: {
            description: 'Z offset of the Z probe relative to the nozzle',
            marlinRef: 'M851 Z<value>',
            warning: 'Critical for first layer height'
          }
        }
      ]
    },
    {
      category: 'advanced',
      name: 'Advanced Settings',
      icon: Settings,
      settings: [
        {
          key: 'homeOffset.x',
          label: 'Home X Offset',
          type: 'number',
          unit: 'mm',
          validation: { min: -1000, max: 1000 },
          documentation: {
            description: 'X offset from home position',
            marlinRef: 'M206 X<value>'
          }
        },
        {
          key: 'homeOffset.y',
          label: 'Home Y Offset',
          type: 'number',
          unit: 'mm',
          validation: { min: -1000, max: 1000 },
          documentation: {
            description: 'Y offset from home position',
            marlinRef: 'M206 Y<value>'
          }
        },
        {
          key: 'homeOffset.z',
          label: 'Home Z Offset',
          type: 'number',
          unit: 'mm',
          validation: { min: -1000, max: 1000 },
          documentation: {
            description: 'Z offset from home position',
            marlinRef: 'M206 Z<value>'
          }
        },
        {
          key: 'linearAdvance',
          label: 'Linear Advance',
          type: 'number',
          unit: '',
          validation: { min: 0, max: 10 },
          documentation: {
            description: 'Linear advance K-factor for pressure advance',
            marlinRef: 'M900 K<value>'
          }
        },
        {
          key: 'powerLossRecovery',
          label: 'Power Loss Recovery',
          type: 'boolean',
          documentation: {
            description: 'Enable power loss recovery feature',
            marlinRef: 'M413 S<0|1>'
          }
        }
      ]
    }
  ], [])

  // Initialize settings values from printer settings
  React.useEffect(() => {
    if (printerSettings) {
      const values = {}
      settingsDefinition.forEach(category => {
        category.settings.forEach(setting => {
          const keys = setting.key.split('.')
          let value = printerSettings
          for (const key of keys) {
            value = value?.[key]
          }
          values[setting.key] = value
        })
      })
      setSettingsValues(values)
    }
  }, [printerSettings, settingsDefinition])

  const handleSettingChange = useCallback((key, value) => {
    setSettingsValues(prev => ({ ...prev, [key]: value }))
    setChangedSettings(prev => ({ ...prev, [key]: true }))
  }, [])

  const handleSendSetting = useCallback(async (setting) => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }

    try {
      const value = settingsValues[setting.key]
      let command = ''

      // Generate G-code command based on setting
      switch (setting.key) {
        case 'stepsPerUnit.x':
          command = `M92 X${value}`
          break
        case 'stepsPerUnit.y':
          command = `M92 Y${value}`
          break
        case 'stepsPerUnit.z':
          command = `M92 Z${value}`
          break
        case 'stepsPerUnit.e':
          command = `M92 E${value}`
          break
        case 'feedrates.x':
          command = `M203 X${value}`
          break
        case 'feedrates.y':
          command = `M203 Y${value}`
          break
        case 'feedrates.z':
          command = `M203 Z${value}`
          break
        case 'feedrates.e':
          command = `M203 E${value}`
          break
        case 'acceleration.max':
          command = `M201 X${value} Y${value} Z${value} E${value}`
          break
        case 'acceleration.print':
          command = `M204 P${value}`
          break
        case 'acceleration.retract':
          command = `M204 R${value}`
          break
        case 'acceleration.travel':
          command = `M204 T${value}`
          break
        case 'acceleration.jerk.x':
          command = `M205 X${value}`
          break
        case 'acceleration.jerk.y':
          command = `M205 Y${value}`
          break
        case 'acceleration.jerk.z':
          command = `M205 Z${value}`
          break
        case 'acceleration.jerk.e':
          command = `M205 E${value}`
          break
        case 'pid.hotend.p':
        case 'pid.hotend.i':
        case 'pid.hotend.d':
          const hotendP = settingsValues['pid.hotend.p'] || 0
          const hotendI = settingsValues['pid.hotend.i'] || 0
          const hotendD = settingsValues['pid.hotend.d'] || 0
          command = `M301 P${hotendP} I${hotendI} D${hotendD}`
          break
        case 'pid.bed.p':
        case 'pid.bed.i':
        case 'pid.bed.d':
          const bedP = settingsValues['pid.bed.p'] || 0
          const bedI = settingsValues['pid.bed.i'] || 0
          const bedD = settingsValues['pid.bed.d'] || 0
          command = `M304 P${bedP} I${bedI} D${bedD}`
          break
        case 'bedLeveling.enabled':
          command = `M420 S${value ? 1 : 0}`
          break
        case 'bedLeveling.fadeHeight':
          command = `M420 Z${value}`
          break
        case 'zProbeOffset.x':
        case 'zProbeOffset.y':
        case 'zProbeOffset.z':
          const x = settingsValues['zProbeOffset.x'] || 0
          const y = settingsValues['zProbeOffset.y'] || 0
          const z = settingsValues['zProbeOffset.z'] || 0
          command = `M851 X${x} Y${y} Z${z}`
          break
        case 'homeOffset.x':
        case 'homeOffset.y':
        case 'homeOffset.z':
          const hx = settingsValues['homeOffset.x'] || 0
          const hy = settingsValues['homeOffset.y'] || 0
          const hz = settingsValues['homeOffset.z'] || 0
          command = `M206 X${hx} Y${hy} Z${hz}`
          break
        case 'linearAdvance':
          command = `M900 K${value}`
          break
        case 'powerLossRecovery':
          command = `M413 S${value ? 1 : 0}`
          break
        default:
          console.warn('Unknown setting:', setting.key)
          return
      }

      await sendCommand(command)
      setChangedSettings(prev => ({ ...prev, [setting.key]: false }))
    } catch (error) {
      console.error('Error sending setting:', error)
      alert(`Error sending setting: ${error.message}`)
    }
  }, [serialStatus, sendCommand, settingsValues])

  const handleSaveAll = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }

    if (!confirm('Are you sure you want to save all changed settings to the printer? This will overwrite current printer configuration.')) {
      return
    }

    try {
      // Generate commands for all changed settings
      const changedKeys = Object.keys(changedSettings).filter(key => changedSettings[key])
      const commands = []
      
      // Group related commands to avoid duplicates
      const commandGroups = {}
      
      for (const key of changedKeys) {
        const setting = settingsDefinition
          .flatMap(cat => cat.settings)
          .find(s => s.key === key)
        
        if (setting) {
          const value = settingsValues[setting.key]
          let command = ''

          // Generate G-code command based on setting
          switch (setting.key) {
            case 'stepsPerUnit.x':
            case 'stepsPerUnit.y':
            case 'stepsPerUnit.z':
            case 'stepsPerUnit.e':
              const x = settingsValues['stepsPerUnit.x'] || 0
              const y = settingsValues['stepsPerUnit.y'] || 0
              const z = settingsValues['stepsPerUnit.z'] || 0
              const e = settingsValues['stepsPerUnit.e'] || 0
              command = `M92 X${x} Y${y} Z${z} E${e}`
              commandGroups['M92'] = command
              break
            case 'feedrates.x':
            case 'feedrates.y':
            case 'feedrates.z':
            case 'feedrates.e':
              const fx = settingsValues['feedrates.x'] || 0
              const fy = settingsValues['feedrates.y'] || 0
              const fz = settingsValues['feedrates.z'] || 0
              const fe = settingsValues['feedrates.e'] || 0
              command = `M203 X${fx} Y${fy} Z${fz} E${fe}`
              commandGroups['M203'] = command
              break
            case 'acceleration.max':
              const maxAccel = settingsValues['acceleration.max'] || 0
              command = `M201 X${maxAccel} Y${maxAccel} Z${maxAccel} E${maxAccel}`
              commandGroups['M201'] = command
              break
            case 'acceleration.print':
            case 'acceleration.retract':
            case 'acceleration.travel':
              const printAccel = settingsValues['acceleration.print'] || 0
              const retractAccel = settingsValues['acceleration.retract'] || 0
              const travelAccel = settingsValues['acceleration.travel'] || 0
              command = `M204 P${printAccel} R${retractAccel} T${travelAccel}`
              commandGroups['M204'] = command
              break
            case 'acceleration.jerk.x':
            case 'acceleration.jerk.y':
            case 'acceleration.jerk.z':
            case 'acceleration.jerk.e':
              const jx = settingsValues['acceleration.jerk.x'] || 0
              const jy = settingsValues['acceleration.jerk.y'] || 0
              const jz = settingsValues['acceleration.jerk.z'] || 0
              const je = settingsValues['acceleration.jerk.e'] || 0
              command = `M205 X${jx} Y${jy} Z${jz} E${je}`
              commandGroups['M205'] = command
              break
            case 'pid.hotend.p':
            case 'pid.hotend.i':
            case 'pid.hotend.d':
              const hotendP = settingsValues['pid.hotend.p'] || 0
              const hotendI = settingsValues['pid.hotend.i'] || 0
              const hotendD = settingsValues['pid.hotend.d'] || 0
              command = `M301 P${hotendP} I${hotendI} D${hotendD}`
              commandGroups['M301'] = command
              break
            case 'pid.bed.p':
            case 'pid.bed.i':
            case 'pid.bed.d':
              const bedP = settingsValues['pid.bed.p'] || 0
              const bedI = settingsValues['pid.bed.i'] || 0
              const bedD = settingsValues['pid.bed.d'] || 0
              command = `M304 P${bedP} I${bedI} D${bedD}`
              commandGroups['M304'] = command
              break
            case 'bedLeveling.enabled':
            case 'bedLeveling.fadeHeight':
              const enabled = settingsValues['bedLeveling.enabled'] ? 1 : 0
              const fadeHeight = settingsValues['bedLeveling.fadeHeight'] || 0
              command = `M420 S${enabled} Z${fadeHeight}`
              commandGroups['M420'] = command
              break
            case 'zProbeOffset.x':
            case 'zProbeOffset.y':
            case 'zProbeOffset.z':
              const zx = settingsValues['zProbeOffset.x'] || 0
              const zy = settingsValues['zProbeOffset.y'] || 0
              const zz = settingsValues['zProbeOffset.z'] || 0
              command = `M851 X${zx} Y${zy} Z${zz}`
              commandGroups['M851'] = command
              break
            case 'homeOffset.x':
            case 'homeOffset.y':
            case 'homeOffset.z':
              const hx = settingsValues['homeOffset.x'] || 0
              const hy = settingsValues['homeOffset.y'] || 0
              const hz = settingsValues['homeOffset.z'] || 0
              command = `M206 X${hx} Y${hy} Z${hz}`
              commandGroups['M206'] = command
              break
            case 'linearAdvance':
              command = `M900 K${value}`
              commandGroups['M900'] = command
              break
            case 'powerLossRecovery':
              command = `M413 S${value ? 1 : 0}`
              commandGroups['M413'] = command
              break
          }
        }
      }

      // Convert grouped commands to array
      const finalCommands = Object.values(commandGroups)
      
      if (finalCommands.length === 0) {
        alert('No settings to save')
        return
      }

      // Add M500 to save to EEPROM
      finalCommands.push('M500')

      // Send bulk configuration
      const result = await sendBulkConfiguration(finalCommands, {
        delayMs: 150,
        maxRetries: 2,
        onProgress: (current, total, command) => {
          console.log(`Sending ${current}/${total}: ${command}`)
        }
      })

      if (result.failureCount > 0) {
        alert(`Settings saved with ${result.failureCount} failures. Check serial log for details.`)
      } else {
        alert('All settings saved successfully!')
      }
      
      // Update printer settings in store
      if (activePrinterId) {
        const updatedSettings = { ...printerSettings }
        changedKeys.forEach(key => {
          const keys = key.split('.')
          let target = updatedSettings
          for (let i = 0; i < keys.length - 1; i++) {
            if (!target[keys[i]]) target[keys[i]] = {}
            target = target[keys[i]]
          }
          target[keys[keys.length - 1]] = settingsValues[key]
        })
        
        updatePrinterSettings(activePrinterId, updatedSettings)
      }

      setChangedSettings({})
    } catch (error) {
      console.error('Error saving settings:', error)
      alert(`Error saving settings: ${error.message}`)
    }
  }, [serialStatus, sendBulkConfiguration, changedSettings, settingsDefinition, settingsValues, activePrinterId, printerSettings, updatePrinterSettings])

  const handleFetchSettings = useCallback(async () => {
    // Settings are fetched automatically on connection, no manual refresh needed
  }, [])

  const handleResetChanges = useCallback(() => {
    setChangedSettings({})
    // Reset values to original
    if (printerSettings) {
      const values = {}
      settingsDefinition.forEach(category => {
        category.settings.forEach(setting => {
          const keys = setting.key.split('.')
          let value = printerSettings
          for (const key of keys) {
            value = value?.[key]
          }
          values[setting.key] = value
        })
      })
      setSettingsValues(values)
    }
  }, [printerSettings, settingsDefinition])

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }, [])

  // Filter settings based on search and category
  const filteredCategories = useMemo(() => {
    return settingsDefinition
      .filter(category => 
        selectedCategory === 'all' || category.category === selectedCategory
      )
      .map(category => ({
        ...category,
        settings: category.settings.filter(setting =>
          searchTerm === '' || 
          setting.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          setting.key.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(category => category.settings.length > 0)
  }, [settingsDefinition, searchTerm, selectedCategory])

  const totalChangedSettings = Object.values(changedSettings).filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Printer Settings Editor</h2>
          <p className="text-gray-600">Configure and manage all printer settings</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFetchSettings}
            disabled={serialStatus !== 'connected'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Fetch Settings
          </button>
          
          {totalChangedSettings > 0 && (
            <>
              <button
                onClick={handleResetChanges}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Changes
              </button>
              
              <button
                onClick={handleSaveAll}
                disabled={serialStatus !== 'connected'}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save All ({totalChangedSettings})
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search settings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="min-w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {settingsDefinition.map(category => (
                <option key={category.category} value={category.category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="space-y-4">
        {filteredCategories.map(category => (
          <SettingsCategory
            key={category.category}
            category={category}
            settings={category.settings}
            values={settingsValues}
            onChange={handleSettingChange}
            onSend={handleSendSetting}
            changedSettings={changedSettings}
            isExpanded={expandedCategories[category.category] || false}
            onToggle={() => toggleCategory(category.category)}
          />
        ))}
      </div>

      {/* Summary */}
      {totalChangedSettings > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 font-medium">
                {totalChangedSettings} setting{totalChangedSettings !== 1 ? 's' : ''} have been modified
              </span>
            </div>
            <button
              onClick={handleSaveAll}
              disabled={serialStatus !== 'connected'}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrinterSettingsEditor
