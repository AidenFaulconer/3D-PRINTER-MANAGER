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
  AlertTriangle,
  FolderOpen,
  Hammer,
  GitBranch,
  FileDiff,
  Play,
  Terminal,
  History,
  Trash2,
  Copy,
  RefreshCw,
  Toggle
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
import {
  writeConfigFiles,
  generateDetailedDiff,
  applyConfigChanges,
  buildMarlinFirmware,
  getBuildEnvironment,
  createChangeSummary,
  saveChangeHistory
} from '../utils/firmwareBuilder'

const EnhancedFirmwareConfig = () => {
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
  
  // New state for enhanced features
  const [marlinRepoPath, setMarlinRepoPath] = useState('')
  const [showFolderDialog, setShowFolderDialog] = useState(false)
  const [changeHistory, setChangeHistory] = useState([])
  const [showBuildDialog, setShowBuildDialog] = useState(false)
  const [buildStatus, setBuildStatus] = useState('idle') // 'idle', 'building', 'success', 'error'
  const [buildOutput, setBuildOutput] = useState('')
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [previewChanges, setPreviewChanges] = useState(null)
  const [originalFileContent, setOriginalFileContent] = useState({})
  const [modifiedFileContent, setModifiedFileContent] = useState({})
  const [showChangeHistory, setShowChangeHistory] = useState(false)
  
  const fileInputRef = useRef(null)
  const folderInputRef = useRef(null)
  const { getActivePrinter, updatePrinter } = usePrintersStore()
  
  const activePrinter = getActivePrinter()

  // Load saved configuration data when component mounts or printer changes
  useEffect(() => {
    if (activePrinter && activePrinter.firmwareConfiguration) {
      const config = activePrinter.firmwareConfiguration
      
      if (config.basic && config.basic.length > 0) {
        setBasicConfigs(config.basic)
        if (config.summary?.basicFile) {
          setBasicConfigFile({ name: config.summary.basicFile })
        }
      }
      
      if (config.advanced && config.advanced.length > 0) {
        setAdvancedConfigs(config.advanced)
        if (config.summary?.advancedFile) {
          setAdvancedConfigFile({ name: config.summary.advancedFile })
        }
      }

      // Load change history
      if (config.changeHistory) {
        setChangeHistory(config.changeHistory)
      }

      // Load Marlin repo path
      if (config.marlinRepoPath) {
        setMarlinRepoPath(config.marlinRepoPath)
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
      
      // Store original file content for diff comparison
      setOriginalFileContent(prev => ({
        ...prev,
        [isAdvanced ? 'advanced' : 'basic']: text
      }))
      
      if (isAdvanced) {
        setAdvancedConfigs(configs)
        setAdvancedConfigFile(file)
      } else {
        setBasicConfigs(configs)
        setBasicConfigFile(file)
      }

      // Auto-save to store after successful parsing
      await autoSaveToStore(configs, isAdvanced, file)
      
      // Add to change history
      addToChangeHistory({
        type: 'file_upload',
        file: file.name,
        isAdvanced,
        timestamp: new Date().toISOString(),
        changes: configs.length
      })
    } catch (error) {
      console.error('Error reading file:', error)
      alert('Error reading file. Please make sure it\'s a valid text file.')
    } finally {
      setIsProcessing(false)
    }
  }

  const addToChangeHistory = (change) => {
    const newHistory = [change, ...changeHistory.slice(0, 49)] // Keep last 50 changes
    setChangeHistory(newHistory)
    
    // Update in store
    if (activePrinter) {
      updatePrinter(activePrinter.id, {
        firmwareConfiguration: {
          ...activePrinter.firmwareConfiguration,
          changeHistory: newHistory
        }
      })
    }
  }

  const autoSaveToStore = async (newConfigs, isAdvanced, file) => {
    try {
      const currentConfig = activePrinter.firmwareConfiguration || { basic: [], advanced: [] }
      
      const updatedBasic = isAdvanced ? (currentConfig.basic || []) : newConfigs
      const updatedAdvanced = isAdvanced ? newConfigs : (currentConfig.advanced || [])
      
      const updatedConfig = {
        basic: updatedBasic,
        advanced: updatedAdvanced,
        lastUpdated: new Date().toISOString(),
        summary: {
          totalDefines: updatedBasic.length + updatedAdvanced.length,
          enabledDefines: updatedBasic.filter(c => c.enabled).length + updatedAdvanced.filter(c => c.enabled).length,
          basicFile: isAdvanced ? (currentConfig.summary?.basicFile || null) : file.name,
          advancedFile: isAdvanced ? file.name : (currentConfig.summary?.advancedFile || null)
        },
        changeHistory: changeHistory,
        marlinRepoPath: marlinRepoPath
      }

      updatePrinter(activePrinter.id, {
        firmwareConfiguration: updatedConfig
      })

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
      
      setShowAutoSaveMessage(true)
      setTimeout(() => setShowAutoSaveMessage(false), 3000)
    } catch (error) {
      console.error('Error auto-saving configuration:', error)
      alert('Error saving configuration automatically. Please try saving manually.')
    }
  }

  const handleFolderSelect = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click()
    }
  }

  const handleFolderChange = (event) => {
    const folderPath = event.target.files[0]?.path || ''
    if (folderPath) {
      setMarlinRepoPath(folderPath)
      
      // Save to store
      if (activePrinter) {
        updatePrinter(activePrinter.id, {
          firmwareConfiguration: {
            ...activePrinter.firmwareConfiguration,
            marlinRepoPath: folderPath
          }
        })
      }
      
      addToChangeHistory({
        type: 'folder_selected',
        path: folderPath,
        timestamp: new Date().toISOString()
      })
    }
  }

  const generateModifiedFileContent = () => {
    const modified = { ...originalFileContent }
    
    // Apply changes to basic config
    if (basicConfigs.length > 0 && originalFileContent.basic) {
      let content = originalFileContent.basic
      
      basicConfigs.forEach(config => {
        const regex = new RegExp(`^(\\s*)(#define\\s+${config.name}\\s+)(.*)$`, 'gm')
        if (config.enabled) {
          content = content.replace(regex, `$1$2${config.value}`)
        } else {
          content = content.replace(regex, `$1// $2${config.value}`)
        }
      })
      
      modified.basic = content
    }
    
    // Apply changes to advanced config
    if (advancedConfigs.length > 0 && originalFileContent.advanced) {
      let content = originalFileContent.advanced
      
      advancedConfigs.forEach(config => {
        const regex = new RegExp(`^(\\s*)(#define\\s+${config.name}\\s+)(.*)$`, 'gm')
        if (config.enabled) {
          content = content.replace(regex, `$1$2${config.value}`)
        } else {
          content = content.replace(regex, `$1// $2${config.value}`)
        }
      })
      
      modified.advanced = content
    }
    
    setModifiedFileContent(modified)
    return modified
  }

  const generateDiff = () => {
    const modified = generateModifiedFileContent()
    const diffs = {}
    
    Object.keys(modified).forEach(fileType => {
      if (originalFileContent[fileType] && modified[fileType]) {
        const originalLines = originalFileContent[fileType].split('\n')
        const modifiedLines = modified[fileType].split('\n')
        
        diffs[fileType] = {
          original: originalLines,
          modified: modifiedLines,
          changes: []
        }
        
        // Simple diff algorithm
        const maxLines = Math.max(originalLines.length, modifiedLines.length)
        for (let i = 0; i < maxLines; i++) {
          const original = originalLines[i] || ''
          const modified = modifiedLines[i] || ''
          
          if (original !== modified) {
            diffs[fileType].changes.push({
              line: i + 1,
              type: original === '' ? 'added' : modified === '' ? 'removed' : 'modified',
              original,
              modified
            })
          }
        }
      }
    })
    
    return diffs
  }

  const handleSaveAndBuild = () => {
    if (!marlinRepoPath) {
      setShowFolderDialog(true)
      return
    }
    
    const diffs = generateDiff()
    setPreviewChanges(diffs)
    setShowPreviewDialog(true)
  }

  const handleConfirmSave = async () => {
    try {
      setIsProcessing(true)
      setBuildStatus('building')
      setBuildOutput('')
      
      // Check build environment
      setBuildOutput('Checking build environment...\n')
      const env = await getBuildEnvironment(marlinRepoPath)
      
      if (!env.ready) {
        throw new Error(`Build environment not ready: ${JSON.stringify(env)}`)
      }
      
      setBuildOutput(prev => prev + 'Environment check passed.\n')
      
      // Apply configuration changes
      const allConfigs = [...basicConfigs, ...advancedConfigs]
      const modified = applyConfigChanges(originalFileContent, allConfigs)
      
      // Write files
      setBuildOutput(prev => prev + 'Writing configuration files...\n')
      const writeResults = await writeConfigFiles(marlinRepoPath, modified)
      
      const failedWrites = writeResults.filter(r => !r.success)
      if (failedWrites.length > 0) {
        throw new Error(`Failed to write files: ${failedWrites.map(f => f.error).join(', ')}`)
      }
      
      setBuildOutput(prev => prev + 'Configuration files written successfully.\n')
      
      // Build firmware
      setBuildOutput(prev => prev + 'Starting PlatformIO build...\n')
      const buildResult = await buildMarlinFirmware(marlinRepoPath, (progress) => {
        setBuildOutput(prev => prev + progress)
      })
      
      if (buildResult.success) {
        setBuildOutput(prev => prev + '\nBuild completed successfully!\n')
        setBuildOutput(prev => prev + `Firmware: ${buildResult.firmwarePath}\n`)
        setBuildStatus('success')
        
        // Save change history
        const changeSummary = createChangeSummary(previewChanges, allConfigs)
        await saveChangeHistory(marlinRepoPath, [changeSummary, ...changeHistory])
        
        // Add to change history
        addToChangeHistory({
          type: 'build_completed',
          timestamp: new Date().toISOString(),
          status: 'success',
          changes: Object.keys(modified).length,
          firmwarePath: buildResult.firmwarePath
        })
      } else {
        throw new Error(buildResult.error)
      }
      
    } catch (error) {
      console.error('Build error:', error)
      setBuildStatus('error')
      setBuildOutput(prev => prev + `\nError: ${error.message}\n`)
      
      addToChangeHistory({
        type: 'build_failed',
        timestamp: new Date().toISOString(),
        status: 'error',
        error: error.message
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleToggleSetting = (settingName) => {
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

    // Add to change history
    const setting = [...basicConfigs, ...advancedConfigs].find(s => s.name === settingName)
    addToChangeHistory({
      type: 'setting_toggle',
      setting: settingName,
      enabled: !setting.enabled,
      timestamp: new Date().toISOString()
    })
  }

  const handleEditSave = (settingName) => {
    const newValue = editValues[settingName]
    const settingInfo = getSettingInfo(settingName)
    
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
      convertedValue = parseFloat(newValue)
    }
    
    const validation = validateMarlinSetting(settingName, convertedValue)
    
    if (!validation.isValid) {
      setValidationErrors(prev => ({ ...prev, [settingName]: validation.error }))
      return
    }

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

    // Add to change history
    const oldSetting = [...basicConfigs, ...advancedConfigs].find(s => s.name === settingName)
    addToChangeHistory({
      type: 'setting_edit',
      setting: settingName,
      oldValue: oldSetting.value,
      newValue: convertedValue,
      timestamp: new Date().toISOString()
    })

    handleEditCancel(settingName)
  }

  const renderDiffView = () => {
    const diffs = generateDiff()
    
    return (
      <div className="space-y-6">
        {Object.entries(diffs).map(([fileType, diff]) => (
          <div key={fileType} className="border border-gray-200 rounded-lg">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">
                {fileType === 'basic' ? 'Configuration.h' : 'Configuration_adv.h'}
              </h4>
              <p className="text-sm text-gray-600">{diff.changes.length} changes</p>
            </div>
            
            <div className="p-4">
              {diff.changes.length === 0 ? (
                <p className="text-gray-500 text-sm">No changes detected</p>
              ) : (
                <div className="space-y-2">
                  {diff.changes.slice(0, 10).map((change, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-gray-500 w-8 flex-shrink-0">{change.line}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        change.type === 'added' ? 'bg-green-100 text-green-800' :
                        change.type === 'removed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {change.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        {change.type === 'removed' && (
                          <div className="text-red-600 font-mono text-xs">
                            - {change.original}
                          </div>
                        )}
                        {change.type === 'added' && (
                          <div className="text-green-600 font-mono text-xs">
                            + {change.modified}
                          </div>
                        )}
                        {change.type === 'modified' && (
                          <div className="space-y-1">
                            <div className="text-red-600 font-mono text-xs">
                              - {change.original}
                            </div>
                            <div className="text-green-600 font-mono text-xs">
                              + {change.modified}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {diff.changes.length > 10 && (
                    <p className="text-gray-500 text-xs">
                      ... and {diff.changes.length - 10} more changes
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderChangeHistory = () => {
    return (
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {changeHistory.length === 0 ? (
          <p className="text-gray-500 text-sm">No changes recorded</p>
        ) : (
          changeHistory.map((change, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded text-sm">
              <div className="flex-shrink-0">
                {change.type === 'file_upload' && <Upload className="h-4 w-4 text-blue-600" />}
                {change.type === 'setting_toggle' && <Toggle className="h-4 w-4 text-green-600" />}
                {change.type === 'setting_edit' && <Edit className="h-4 w-4 text-yellow-600" />}
                {change.type === 'folder_selected' && <FolderOpen className="h-4 w-4 text-purple-600" />}
                {change.type === 'build_completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                {change.type === 'build_failed' && <XCircle className="h-4 w-4 text-red-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900">
                  {change.type === 'file_upload' && `Uploaded ${change.file} (${change.changes} settings)`}
                  {change.type === 'setting_toggle' && `Toggled ${change.setting} to ${change.enabled ? 'enabled' : 'disabled'}`}
                  {change.type === 'setting_edit' && `Changed ${change.setting} from ${change.oldValue} to ${change.newValue}`}
                  {change.type === 'folder_selected' && `Selected Marlin repo: ${change.path}`}
                  {change.type === 'build_completed' && `Build completed successfully`}
                  {change.type === 'build_failed' && `Build failed: ${change.error}`}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(change.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    )
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
                onClick={() => setShowSettingInfo(prev => ({ ...prev, [config.name]: !prev[config.name] }))}
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
                  onClick={() => {
                    setEditingSettings(prev => {
                      const newSet = new Set(prev)
                      newSet.delete(config.name)
                      return newSet
                    })
                    setEditValues(prev => {
                      const newValues = { ...prev }
                      delete newValues[config.name]
                      return newValues
                    })
                    setValidationErrors(prev => {
                      const newErrors = { ...prev }
                      delete newErrors[config.name]
                      return newErrors
                    })
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Cancel"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  const setting = [...basicConfigs, ...advancedConfigs].find(s => s.name === config.name)
                  if (setting) {
                    setEditingSettings(prev => new Set([...prev, config.name]))
                    setEditValues(prev => ({ ...prev, [config.name]: setting.value }))
                  }
                }}
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
                onClick={() => {
                  setExpandedCategories(prev => {
                    const newSet = new Set(prev)
                    if (newSet.has(category)) {
                      newSet.delete(category)
                    } else {
                      newSet.add(category)
                    }
                    return newSet
                  })
                }}
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

  const totalConfigs = basicConfigs.length + advancedConfigs.length
  const enabledConfigs = basicConfigs.filter(c => c.enabled).length + advancedConfigs.filter(c => c.enabled).length

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Enhanced Firmware Configuration</h2>
        <p className="text-gray-600 mt-1">
          Upload, edit, and build Marlin firmware with advanced diff tracking and build integration
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

      {/* Marlin Repository Path */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Marlin Repository</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marlin Source Folder
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={marlinRepoPath}
                onChange={(e) => setMarlinRepoPath(e.target.value)}
                placeholder="Select or enter path to Marlin repository..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleFolderSelect}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FolderOpen className="h-4 w-4" />
                <span>Browse</span>
              </button>
            </div>
            <input
              type="file"
              webkitdirectory="true"
              directory="true"
              onChange={handleFolderChange}
              className="hidden"
              ref={folderInputRef}
            />
          </div>
        </div>
        
        {marlinRepoPath && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-sm text-green-800">
                Marlin repository path set: {marlinRepoPath}
              </p>
            </div>
          </div>
        )}
      </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
                  onClick={() => {
                    const allConfigs = [...basicConfigs, ...advancedConfigs]
                    const updatedConfigs = applyPreset(allConfigs, selectedPreset)
                    const updatedBasic = updatedConfigs.filter(c => c.fileType === 'basic')
                    const updatedAdvanced = updatedConfigs.filter(c => c.fileType === 'advanced')
                    setBasicConfigs(updatedBasic)
                    setAdvancedConfigs(updatedAdvanced)
                    setSelectedPreset('')
                  }}
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
                  onClick={handleSaveAndBuild}
                  disabled={!marlinRepoPath || isProcessing}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Hammer className="h-4 w-4" />
                  <span>Save & Build</span>
                </button>
              </div>

              {/* Change History Toggle */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowChangeHistory(!showChangeHistory)}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm"
                >
                  <History className="h-4 w-4" />
                  <span>History</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change History Panel */}
      {showChangeHistory && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change History</h3>
          {renderChangeHistory()}
        </div>
      )}

      {/* Diff View */}
      {showDiffView && totalConfigs > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Changes</h3>
          {renderDiffView()}
        </div>
      )}

      {/* Build Status Dialog */}
      {showBuildDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Status</h3>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                {buildStatus === 'building' && <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />}
                {buildStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {buildStatus === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
                <span className="font-medium">
                  {buildStatus === 'building' && 'Building firmware...'}
                  {buildStatus === 'success' && 'Build completed successfully!'}
                  {buildStatus === 'error' && 'Build failed'}
                </span>
              </div>
            </div>
            
            {buildOutput && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm max-h-64 overflow-y-auto mb-4">
                <pre>{buildOutput}</pre>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowBuildDialog(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Dialog */}
      {showPreviewDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Changes</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                The following changes will be applied to your Marlin configuration files:
              </p>
              {renderDiffView()}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPreviewDialog(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPreviewDialog(false)
                  setShowBuildDialog(true)
                  handleConfirmSave()
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Confirm & Build</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
            To analyze and build your printer's firmware configuration:
          </p>
          <ol className="list-decimal list-inside text-blue-800 space-y-2">
            <li>Select your Marlin repository folder</li>
            <li>Upload your <code className="bg-blue-100 px-1 rounded">Configuration.h</code> file</li>
            <li>Optionally upload your <code className="bg-blue-100 px-1 rounded">Configuration_adv.h</code> file</li>
            <li>Review and edit the parsed configuration items</li>
            <li>Use "Save & Build" to apply changes and compile firmware</li>
          </ol>
          <p className="text-blue-800 mt-4 text-sm">
            <strong>Note:</strong> This will modify your source files and attempt to build the firmware using PlatformIO.
          </p>
        </div>
      )}
    </div>
  )
}

export default EnhancedFirmwareConfig
