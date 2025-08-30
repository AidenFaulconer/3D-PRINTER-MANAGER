import { useState, useRef } from 'react'
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
  EyeOff
} from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import { 
  parseMarlinConfig, 
  groupConfigsByCategory, 
  filterConfigs, 
  sortConfigs 
} from '../utils/marlinConfigParser'

const FirmwareConfig = () => {
  const [basicConfigFile, setBasicConfigFile] = useState(null)
  const [advancedConfigFile, setAdvancedConfigFile] = useState(null)
  const [basicConfigs, setBasicConfigs] = useState([])
  const [advancedConfigs, setAdvancedConfigs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [groupByCategory, setGroupByCategory] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const fileInputRef = useRef(null)
  const { getActivePrinter, updatePrinter } = usePrintersStore()
  
  const activePrinter = getActivePrinter()

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
      const text = await file.text()
      const configs = parseMarlinConfig(text, isAdvanced)
      
      if (isAdvanced) {
        setAdvancedConfigs(configs)
        setAdvancedConfigFile(file)
      } else {
        setBasicConfigs(configs)
        setBasicConfigFile(file)
      }
    } catch (error) {
      console.error('Error reading file:', error)
      alert('Error reading file. Please make sure it\'s a valid text file.')
    }
  }

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
    
    let filtered = filterConfigs(configs, searchTerm)
    return sortConfigs(filtered, sortBy, sortOrder)
  }

  const renderConfigTable = (configs) => {
    if (configs.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No configuration items found matching your search criteria.
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => setSortBy('name')}>
                <div className="flex items-center space-x-1">
                  <span>Feature Name</span>
                  {sortBy === 'name' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => setSortBy('enabled')}>
                <div className="flex items-center space-x-1">
                  <span>Enabled</span>
                  {sortBy === 'enabled' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => setSortBy('value')}>
                <div className="flex items-center space-x-1">
                  <span>Value</span>
                  {sortBy === 'value' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {configs.map((config, index) => (
              <tr key={`${config.fileType}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">{config.name}</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {config.enabled ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {String(config.value)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  <div className="truncate" title={config.description}>
                    {config.description || 'No description'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    config.fileType === 'basic' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {config.fileType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        {renderConfigTable(categoryConfigs)}
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>Total Defines: <strong className="text-gray-900">{totalConfigs}</strong></span>
                <span>Enabled: <strong className="text-green-600">{enabledConfigs}</strong></span>
                <span>Disabled: <strong className="text-red-600">{totalConfigs - enabledConfigs}</strong></span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleExportConfig}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={handleSaveToStore}
                  disabled={isProcessing}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isProcessing ? 'Saving...' : 'Save to Printer'}</span>
                </button>
              </div>
            </div>
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

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Configuration Table */}
          <div className="overflow-hidden">
            {groupByCategory 
              ? renderGroupedConfigs(getFilteredAndSortedConfigs())
              : renderConfigTable(getFilteredAndSortedConfigs())
            }
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
