import { useState, useRef, useEffect } from 'react'
import { 
  Upload, 
  FileText, 
  Settings, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  CheckCircle, 
  XCircle,
  Save,
  Download,
  Eye,
  EyeOff,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  GitCompare,
  Palette,
  Info,
  AlertTriangle
} from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import { 
  parseMarlinConfig, 
  groupConfigsByCategory, 
  filterConfigs, 
  sortConfigs 
} from '../utils/marlinConfigParser'
import {
  categorizeMarlinSettings,
  validateMarlinSetting,
  getSettingInfo,
  compareConfigurations,
  applyPreset,
  searchSettings,
  isSettingRelevantForPrinter,
  MARLIN_PRESETS
} from '../utils/marlinConfigEnhanced'

const FirmwareConfig = () => {
  const [basicConfigFile, setBasicConfigFile] = useState(null)
  const [advancedConfigFile, setAdvancedConfigFile] = useState(null)
  const [basicConfigs, setBasicConfigs] = useState([])
  const [advancedConfigs, setAdvancedConfigs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [groupByCategory, setGroupByCategory] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [editingSettings, setEditingSettings] = useState(new Set())
  const [editValues, setEditValues] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [showDiffView, setShowDiffView] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState('')
  const [baselineConfig, setBaselineConfig] = useState([])
  const [showSettingInfo, setShowSettingInfo] = useState({})
  const [showAutoSaveMessage, setShowAutoSaveMessage] = useState(false)
  const [showDisabledSettings, setShowDisabledSettings] = useState(true)
  const [showPrinterSpecificOnly, setShowPrinterSpecificOnly] = useState(true)
  
  const fileInputRef = useRef(null)
  const { getActivePrinter, updatePrinter } = usePrintersStore()
  
  const activePrinter = getActivePrinter()

  // Load saved configuration data when component mounts or printer changes
  useEffect(() => {
    if (activePrinter && activePrinter.firmwareConfiguration) {
      const config = activePrinter.firmwareConfiguration
      
      if (config.basic && config.basic.length > 0) {
        setBasicConfigs(config.basic)
        // Note: We can't restore the actual file object, but we can show the filename
        if (config.summary?.basicFile) {
          setBasicConfigFile({ name: config.summary.basicFile })
        }
      }
      
      if (config.advanced && config.advanced.length > 0) {
        setAdvancedConfigs(config.advanced)
        // Note: We can't restore the actual file object, but we can show the filename
        if (config.summary?.advancedFile) {
          setAdvancedConfigFile({ name: config.summary.advancedFile })
        }
      }
    }
  }, [activePrinter])

  if (!activePrinter) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Printer Selected</h3>
        <p className="text-gray-500">Please select a printer to configure firmware</p>
      </div>
    )
  }

  const handleFileUpload = async (file, isAdvanced) => {
    if (!file) return

    try {
      setIsProcessing(true)
      const text = await file.text()
      const configs = parseMarlinConfig(text, isAdvanced)
      
      if (isAdvanced) {
        setAdvancedConfigs(configs)
        setAdvancedConfigFile(file)
      } else {
        setBasicConfigs(configs)
        setBasicConfigFile(file)
      }

      // Auto-save to store after successful parsing
      await autoSaveToStore(configs, isAdvanced, file)
    } catch (error) {
      console.error('Error reading file:', error)
      alert('Error reading file. Please make sure it\'s a valid text file.')
    } finally {
      setIsProcessing(false)
    }
  }

  const autoSaveToStore = async (newConfigs, isAdvanced, file) => {
    try {
      // Get current configurations from store or use empty arrays
      const currentConfig = activePrinter.firmwareConfiguration || { basic: [], advanced: [] }
      
      // Update the appropriate configuration array
      const updatedBasic = isAdvanced ? (currentConfig.basic || []) : newConfigs
      const updatedAdvanced = isAdvanced ? newConfigs : (currentConfig.advanced || [])
      
      // Update the configuration object
      const updatedConfig = {
        basic: updatedBasic,
        advanced: updatedAdvanced,
        lastUpdated: new Date().toISOString(),
        summary: {
          totalDefines: updatedBasic.length + updatedAdvanced.length,
          enabledDefines: updatedBasic.filter(c => c.enabled).length + updatedAdvanced.filter(c => c.enabled).length,
          basicFile: isAdvanced ? (currentConfig.summary?.basicFile || null) : file.name,
          advancedFile: isAdvanced ? file.name : (currentConfig.summary?.advancedFile || null)
        }
      }

      // Update the printer in the store
      updatePrinter(activePrinter.id, {
        firmwareConfiguration: updatedConfig
      })

      // Mark this calibration step as completed
      updatePrinter(activePrinter.id, {
        calibrationSteps: {
          ...activePrinter.calibrationSteps,
          firmwareConfig: {
            completed: true,
            lastUpdated: new Date().toISOString(),
            configCount: updatedConfig.summary.totalDefines
          }
        }
      })

      console.log(`Configuration ${isAdvanced ? 'advanced' : 'basic'} saved automatically`)
      
      // Show success message
      setShowAutoSaveMessage(true)
      setTimeout(() => setShowAutoSaveMessage(false), 3000) // Hide after 3 seconds
    } catch (error) {
      console.error('Error auto-saving configuration:', error)
      alert('Error saving configuration automatically. Please try saving manually.')
    }
  }

  // Manual save function (now mainly for re-saving or force saving)
  const handleSaveToStore = () => {
    if (basicConfigs.length === 0 && advancedConfigs.length === 0) {
      alert('Please upload at least one configuration file first.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Create a comprehensive firmware configuration object
      const firmwareConfig = {
        basic: basicConfigs,
        advanced: advancedConfigs,
        lastUpdated: new Date().toISOString(),
        summary: {
          totalDefines: basicConfigs.length + advancedConfigs.length,
          enabledDefines: basicConfigs.filter(c => c.enabled).length + advancedConfigs.filter(c => c.enabled).length,
          basicFile: basicConfigFile?.name || null,
          advancedFile: advancedConfigFile?.name || null
        }
      }

      // Update the printer in the store
      updatePrinter(activePrinter.id, {
        firmwareConfiguration: firmwareConfig
      })

      // Mark this calibration step as completed
      updatePrinter(activePrinter.id, {
        calibrationSteps: {
          ...activePrinter.calibrationSteps,
          firmwareConfig: {
            completed: true,
            lastUpdated: new Date().toISOString(),
            configCount: firmwareConfig.summary.totalDefines
          }
        }
      })

      alert('Firmware configuration saved successfully!')
    } catch (error) {
      console.error('Error saving configuration:', error)
      alert('Error saving configuration. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleExportConfig = () => {
    const allConfigs = [...basicConfigs, ...advancedConfigs]
    const csvContent = [
      'Feature Name,Enabled,Value,Description,File Type,Line Number',
      ...allConfigs.map(config => 
        `"${config.name}",${config.enabled ? 'Yes' : 'No'},"${config.value}","${config.description}","${config.fileType}",${config.lineNumber}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activePrinter.name}_firmware_config.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getFilteredAndSortedConfigs = () => {
    let configs = [...basicConfigs]
    if (showAdvanced) {
      configs = [...configs, ...advancedConfigs]
    }
    
    let filtered = searchSettings(configs, searchTerm)
    
    // Filter out disabled settings if toggle is off
    if (!showDisabledSettings) {
      filtered = filtered.filter(config => config.enabled)
    }
    
    // Filter out printer-specific settings that don't apply to this printer
    if (showPrinterSpecificOnly && activePrinter) {
      // Determine printer type from the printer model or firmware
      const printerType = getPrinterType(activePrinter)
      filtered = filtered.filter(config => isSettingRelevantForPrinter(config.name, printerType))
    }
    
    return sortConfigs(filtered, sortBy, sortOrder)
  }

  const getPrinterType = (printer) => {
    const model = printer.model?.toLowerCase() || ''
    const firmware = printer.firmware?.toLowerCase() || ''
    
    if (model.includes('delta') || firmware.includes('delta')) return 'delta'
    if (model.includes('scara') || firmware.includes('scara')) return 'scara'
    if (model.includes('corexy') || model.includes('corexz') || model.includes('coreyz') || 
        firmware.includes('corexy') || firmware.includes('corexz') || firmware.includes('coreyz')) return 'corexy'
    if (model.includes('dual') && model.includes('x')) return 'dual_x'
    if (model.includes('dual') && model.includes('y')) return 'dual_y'
    if (model.includes('dual') && model.includes('z')) return 'dual_z'
    
    return 'cartesian' // Default to cartesian
  }

  const handleEditStart = (settingName) => {
    const setting = [...basicConfigs, ...advancedConfigs].find(s => s.name === settingName)
    if (setting) {
      setEditingSettings(prev => new Set([...prev, settingName]))
      setEditValues(prev => ({ ...prev, [settingName]: setting.value }))
    }
  }

  const handleEditCancel = (settingName) => {
    setEditingSettings(prev => {
      const newSet = new Set(prev)
      newSet.delete(settingName)
      return newSet
    })
    setEditValues(prev => {
      const newValues = { ...prev }
      delete newValues[settingName]
      return newValues
    })
    setValidationErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[settingName]
      return newErrors
    })
  }

  const handleEditSave = (settingName) => {
    const newValue = editValues[settingName]
    const settingInfo = getSettingInfo(settingName)
    
    // Convert value to appropriate type before validation
    let convertedValue = newValue
    if (settingInfo.type === 'number') {
      convertedValue = parseFloat(newValue)
      if (isNaN(convertedValue)) {
        setValidationErrors(prev => ({ ...prev, [settingName]: 'Must be a valid number' }))
        return
      }
    } else if (settingInfo.type === 'boolean') {
      convertedValue = newValue === 'true'
    } else if (settingInfo.constraints.values && typeof settingInfo.constraints.values[0] === 'number') {
      // Convert enum values to numbers if they are numeric
      convertedValue = parseFloat(newValue)
    }
    
    const validation = validateMarlinSetting(settingName, convertedValue)
    
    if (!validation.isValid) {
      setValidationErrors(prev => ({ ...prev, [settingName]: validation.error }))
      return
    }

    // Update the setting in the appropriate config array
    const updateConfigs = (configs) => 
      configs.map(config => 
        config.name === settingName 
          ? { ...config, value: convertedValue }
          : config
      )

    if (basicConfigs.find(c => c.name === settingName)) {
      setBasicConfigs(updateConfigs)
    } else if (advancedConfigs.find(c => c.name === settingName)) {
      setAdvancedConfigs(updateConfigs)
    }

    // Clear editing state
    handleEditCancel(settingName)
  }

  const handleToggleSetting = (settingName) => {
    // Update the setting in the appropriate config array
    const updateConfigs = (configs) => 
      configs.map(config => 
        config.name === settingName 
          ? { ...config, enabled: !config.enabled }
          : config
      )

    if (basicConfigs.find(c => c.name === settingName)) {
      setBasicConfigs(updateConfigs)
    } else if (advancedConfigs.find(c => c.name === settingName)) {
      setAdvancedConfigs(updateConfigs)
    }

    // Auto-save the changes
    const updatedBasic = basicConfigs.find(c => c.name === settingName) 
      ? updateConfigs(basicConfigs) 
      : basicConfigs
    const updatedAdvanced = advancedConfigs.find(c => c.name === settingName) 
      ? updateConfigs(advancedConfigs) 
      : advancedConfigs
    
    // Create updated config object
    const updatedConfig = {
      basic: updatedBasic,
      advanced: updatedAdvanced,
      lastUpdated: new Date().toISOString(),
      summary: {
        totalDefines: updatedBasic.length + updatedAdvanced.length,
        enabledDefines: updatedBasic.filter(c => c.enabled).length + updatedAdvanced.filter(c => c.enabled).length,
        basicFile: activePrinter.firmwareConfiguration?.summary?.basicFile || null,
        advancedFile: activePrinter.firmwareConfiguration?.summary?.advancedFile || null
      }
    }

    // Update the printer in the store
    updatePrinter(activePrinter.id, {
      firmwareConfiguration: updatedConfig
    })
  }

  const handlePresetApply = () => {
    if (!selectedPreset) return

    const allConfigs = [...basicConfigs, ...advancedConfigs]
    const updatedConfigs = applyPreset(allConfigs, selectedPreset)
    
    // Separate back into basic and advanced
    const updatedBasic = updatedConfigs.filter(c => c.fileType === 'basic')
    const updatedAdvanced = updatedConfigs.filter(c => c.fileType === 'advanced')
    
    setBasicConfigs(updatedBasic)
    setAdvancedConfigs(updatedAdvanced)
    setSelectedPreset('')
  }

  const toggleCategoryExpanded = (categoryName) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  const toggleSettingInfo = (settingName) => {
    setShowSettingInfo(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }))
  }

  const renderSettingCard = (config) => {
    const isEditing = editingSettings.has(config.name)
    const editValue = editValues[config.name]
    const validationError = validationErrors[config.name]
    const settingInfo = getSettingInfo(config.name)
    const showInfo = showSettingInfo[config.name]
    
    // Check if this setting is relevant for the current printer
    const printerType = activePrinter ? getPrinterType(activePrinter) : 'cartesian'
    const isRelevant = isSettingRelevantForPrinter(config.name, printerType)

    return (
      <div key={config.name} className={`bg-white border rounded-lg p-3 hover:shadow-md transition-shadow ${
        config.enabled 
          ? isRelevant ? 'border-gray-200' : 'border-yellow-300 bg-yellow-50' 
          : 'border-gray-300 bg-gray-50'
      }`}>
        {/* Warning for irrelevant settings */}
        {!isRelevant && (
          <div className="mb-2 p-1 bg-yellow-100 border border-yellow-200 rounded text-xs text-yellow-800">
            ⚠️ May not be relevant for {printerType} printers
          </div>
        )}
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono truncate">
                {config.name}
              </code>
              <button
                onClick={() => toggleSettingInfo(config.name)}
                className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
              >
                <Info className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => handleToggleSetting(config.name)}
            className={`ml-2 p-1 rounded transition-colors ${
              config.enabled 
                ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            }`}
            title={config.enabled ? 'Disable setting' : 'Enable setting'}
          >
            {config.enabled ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Description */}
        {showInfo && (
          <div className="mb-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
            <p>{settingInfo.description}</p>
            {settingInfo.constraints.min !== undefined && (
              <p className="mt-1">Min: {settingInfo.constraints.min}</p>
            )}
            {settingInfo.constraints.max !== undefined && (
              <p>Max: {settingInfo.constraints.max}</p>
            )}
            {settingInfo.constraints.values && (
              <p>Valid values: {settingInfo.constraints.values.join(', ')}</p>
            )}
          </div>
        )}

        {/* Value and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-1">
                {settingInfo.constraints.values ? (
                  // Dropdown for enum values
                  <select
                    value={editValue || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      setEditValues(prev => ({ ...prev, [config.name]: value }))
                      
                      // Clear validation error when valid option is selected
                      if (value) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors[config.name]
                          return newErrors
                        })
                      }
                    }}
                    className={`w-full px-2 py-1 text-xs border rounded ${
                      validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a value...</option>
                    {settingInfo.constraints.values.map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                ) : settingInfo.type === 'boolean' ? (
                  // Checkbox for boolean values
                  <select
                    value={editValue || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      setEditValues(prev => ({ ...prev, [config.name]: value }))
                      
                      // Clear validation error when valid option is selected
                      if (value) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors[config.name]
                          return newErrors
                        })
                      }
                    }}
                    className={`w-full px-2 py-1 text-xs border rounded ${
                      validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : (
                  // Text input for other types
                  <input
                    type={settingInfo.type === 'number' ? 'number' : 'text'}
                    value={editValue || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      setEditValues(prev => ({ ...prev, [config.name]: value }))
                      
                      // Real-time validation
                      if (value) {
                        const settingInfo = getSettingInfo(config.name)
                        let convertedValue = value
                        
                        if (settingInfo.type === 'number') {
                          convertedValue = parseFloat(value)
                          if (isNaN(convertedValue)) {
                            setValidationErrors(prev => ({ ...prev, [config.name]: 'Must be a valid number' }))
                            return
                          }
                        } else if (settingInfo.type === 'boolean') {
                          convertedValue = value === 'true'
                        } else if (settingInfo.constraints.values && typeof settingInfo.constraints.values[0] === 'number') {
                          convertedValue = parseFloat(value)
                        }
                        
                        const validation = validateMarlinSetting(config.name, convertedValue)
                        if (!validation.isValid) {
                          setValidationErrors(prev => ({ ...prev, [config.name]: validation.error }))
                        } else {
                          setValidationErrors(prev => {
                            const newErrors = { ...prev }
                            delete newErrors[config.name]
                            return newErrors
                          })
                        }
                      } else {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors[config.name]
                          return newErrors
                        })
                      }
                    }}
                    className={`w-full px-2 py-1 text-xs border rounded ${
                      validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    min={settingInfo.constraints.min}
                    max={settingInfo.constraints.max}
                    step={settingInfo.type === 'number' ? 'any' : undefined}
                  />
                )}
                {validationError && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {validationError}
                  </p>
                )}
              </div>
            ) : (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {String(config.value)}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 ml-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              config.fileType === 'basic' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {config.fileType}
            </span>
            
            {isEditing ? (
              <>
                <button
                  onClick={() => handleEditSave(config.name)}
                  className="text-green-600 hover:text-green-800 p-1"
                  title="Save"
                >
                  <Check className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleEditCancel(config.name)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Cancel"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditStart(config.name)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit value"
              >
                <Edit className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Description (truncated) */}
        {config.description && !showInfo && (
          <p className="text-xs text-gray-600 mt-2 truncate" title={config.description}>
            {config.description}
          </p>
        )}
      </div>
    )
  }

  const renderCategorizedConfigs = (configs) => {
    const categorized = categorizeMarlinSettings(configs)
    
    return (
      <div className="space-y-6">
        {Object.entries(categorized).map(([category, subcategories]) => {
          const isExpanded = expandedCategories.has(category)
          const totalSettings = Object.values(subcategories).flat().length
          
          if (totalSettings === 0) return null
          
          return (
            <div key={category} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleCategoryExpanded(category)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <h3 className="font-medium text-gray-900">{category}</h3>
                  <span className="text-sm text-gray-500">({totalSettings} settings)</span>
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  {Object.entries(subcategories).map(([subcategory, settings]) => {
                    if (settings.length === 0) return null
                    
                    return (
                      <div key={subcategory} className="mb-6 last:mb-0">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 border-b border-gray-100 pb-1">
                          {subcategory} ({settings.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {settings.map(renderSettingCard)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderGroupedConfigs = (configs) => {
    const grouped = groupConfigsByCategory(configs)
    
    return Object.entries(grouped).map(([category, categoryConfigs]) => (
      <div key={category} className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          {category} ({categoryConfigs.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {categoryConfigs.map(renderSettingCard)}
        </div>
      </div>
    ))
  }

  const totalConfigs = basicConfigs.length + advancedConfigs.length
  const enabledConfigs = basicConfigs.filter(c => c.enabled).length + advancedConfigs.filter(c => c.enabled).length

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Firmware Configuration</h2>
        <p className="text-gray-600 mt-1">
          Upload and analyze your Marlin firmware configuration files to understand your printer's capabilities
        </p>
      </div>

      {/* Auto-save Notification */}
      {showAutoSaveMessage && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-sm text-green-800">
              Configuration saved automatically! Your changes are now persistent.
            </p>
          </div>
        </div>
      )}

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Configuration Files</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Configuration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Configuration.h
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              {basicConfigFile ? (
                <div className="space-y-2">
                  <FileText className="h-8 w-8 text-green-500 mx-auto" />
                  <p className="text-sm text-gray-900">{basicConfigFile.name}</p>
                  <p className="text-xs text-gray-500">{basicConfigs.length} defines found</p>
                  <button
                    onClick={() => setBasicConfigFile(null)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept=".h,.txt,.conf"
                    onChange={(e) => handleFileUpload(e.target.files[0], false)}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Choose File
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Configuration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Configuration_adv.h (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              {advancedConfigFile ? (
                <div className="space-y-2">
                  <FileText className="h-8 w-8 text-purple-500 mx-auto" />
                  <p className="text-sm text-gray-900">{advancedConfigFile.name}</p>
                  <p className="text-xs text-gray-500">{advancedConfigs.length} defines found</p>
                  <button
                    onClick={() => setAdvancedConfigFile(null)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept=".h,.txt,.conf"
                    onChange={(e) => handleFileUpload(e.target.files[0], true)}
                    className="hidden"
                  />
                  <button
                    onClick={() => document.querySelector('input[type="file"]:last-of-type')?.click()}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                  >
                    Choose File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary and Actions */}
        {totalConfigs > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Statistics */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>Total: <strong className="text-gray-900">{totalConfigs}</strong></span>
                <span>Enabled: <strong className="text-green-600">{enabledConfigs}</strong></span>
                <span>Disabled: <strong className="text-red-600">{totalConfigs - enabledConfigs}</strong></span>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  <option value="">Select Preset...</option>
                  {Object.keys(MARLIN_PRESETS).map(preset => (
                    <option key={preset} value={preset}>{preset}</option>
                  ))}
                </select>
                <button
                  onClick={handlePresetApply}
                  disabled={!selectedPreset}
                  className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors text-sm disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDiffView(!showDiffView)}
                  className="bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2 text-sm"
                >
                  <GitCompare className="h-4 w-4" />
                  <span>Diff</span>
                </button>
                <button
                  onClick={handleExportConfig}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleSaveToStore}
                  disabled={isProcessing}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isProcessing ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Preset Description */}
            {selectedPreset && MARLIN_PRESETS[selectedPreset] && (
              <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
                <p className="text-sm text-purple-800">
                  <strong>{selectedPreset}:</strong> {MARLIN_PRESETS[selectedPreset].description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Configuration Display */}
      {totalConfigs > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Configuration Analysis</h3>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search configurations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Toggle Advanced */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showAdvanced 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {showAdvanced ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span className="ml-2">Advanced</span>
              </button>

              {/* Group by Category */}
              <button
                onClick={() => setGroupByCategory(!groupByCategory)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  groupByCategory 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span className="ml-2">Group</span>
              </button>

              {/* Show/Hide Disabled Settings */}
              <button
                onClick={() => setShowDisabledSettings(!showDisabledSettings)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showDisabledSettings 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {showDisabledSettings ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span className="ml-2">Disabled</span>
              </button>

              {/* Show/Hide Printer-Specific Settings */}
              <button
                onClick={() => setShowPrinterSpecificOnly(!showPrinterSpecificOnly)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showPrinterSpecificOnly 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
                title={showPrinterSpecificOnly ? 'Show only relevant settings for this printer' : 'Show all settings including irrelevant ones'}
              >
                {showPrinterSpecificOnly ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span className="ml-2">Relevant</span>
              </button>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Configuration Display */}
          <div className="overflow-hidden">
            {renderCategorizedConfigs(getFilteredAndSortedConfigs())}
          </div>
        </div>
      )}

      {/* Help Section */}
      {totalConfigs === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
          <p className="text-blue-800 mb-4">
            To analyze your printer's firmware configuration:
          </p>
          <ol className="list-decimal list-inside text-blue-800 space-y-2">
            <li>Upload your <code className="bg-blue-100 px-1 rounded">Configuration.h</code> file</li>
            <li>Optionally upload your <code className="bg-blue-100 px-1 rounded">Configuration_adv.h</code> file</li>
            <li>Review the parsed configuration items</li>
            <li>Save the configuration to your printer profile</li>
          </ol>
          <p className="text-blue-800 mt-4 text-sm">
            <strong>Note:</strong> These files are typically located in your Marlin source code folder.
          </p>
        </div>
      )}
    </div>
  )
}

export default FirmwareConfig