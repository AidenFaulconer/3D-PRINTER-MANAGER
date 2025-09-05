import React, { useState, useEffect, useMemo } from 'react'
import useSerialStore from '../../stores/serialStore'

const FirmwareInfoDisplay = React.memo(() => {
  const [firmwareData, setFirmwareData] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Use selective subscription to prevent app-wide re-renders
  const logCount = useSerialStore(state => state.serialLogs?.length || 0)
  const [m115Logs, setM115Logs] = useState([])
  
  useEffect(() => {
    // Only fetch logs when log count changes
    const allLogs = useSerialStore.getState().serialLogs || []
    const newM115Logs = allLogs.filter(log => 
      log.type === 'rx' && 
      (log.message.includes('FIRMWARE_NAME:') || 
       log.message.includes('SOURCE_CODE_URL:') || 
       log.message.includes('PROTOCOL_VERSION:') || 
       log.message.includes('MACHINE_TYPE:') || 
       log.message.includes('EXTRUDER_COUNT:') || 
       log.message.includes('Cap:'))
    )
    setM115Logs(newM115Logs)
  }, [logCount])
  const sendCommand = useSerialStore(state => state.sendCommand)
  const serialStatus = useSerialStore(state => state.status)

  // Parse M115 responses only when M115 logs change
  useEffect(() => {
    if (m115Logs.length === 0) return
    
    const latestM115Log = m115Logs[m115Logs.length - 1]
    const message = latestM115Log.message
    
    // Look for M115 responses - Marlin format
    if (message.includes('FIRMWARE_NAME:') || message.includes('SOURCE_CODE_URL:') || message.includes('PROTOCOL_VERSION:') || message.includes('MACHINE_TYPE:') || message.includes('EXTRUDER_COUNT:') || message.includes('Cap:')) {
      setIsLoading(false)
      
      // Parse firmware information
      const firmwareInfo = {
        firmwareName: extractValue(message, 'FIRMWARE_NAME:'),
        sourceCodeUrl: extractValue(message, 'SOURCE_CODE_URL:'),
        protocolVersion: extractValue(message, 'PROTOCOL_VERSION:'),
        machineType: extractValue(message, 'MACHINE_TYPE:'),
        extruderCount: extractValue(message, 'EXTRUDER_COUNT:'),
        uuid: extractValue(message, 'UUID:'),
        kinematics: extractValue(message, 'KINEMATICS:'),
        capabilities: extractCapabilities(message),
        rawMessage: message
      }
      
      setFirmwareData(firmwareInfo)
      setIsVisible(true)
    }
  }, [m115Logs])

  const extractValue = (message, key) => {
    // Handle different formats - some values might have spaces
    const regex = new RegExp(`${key}\\s*([^\\s]+(?:\\s+[^\\s]+)*?)(?=\\s+[A-Z_]+:|$)`)
    const match = message.match(regex)
    return match ? match[1].trim() : null
  }

  const extractCapabilities = (message) => {
    const capabilities = []
    // Handle both "Cap:" and "CAP:" formats
    const capRegex = /Cap:([A-Z_]+):(\d+)/g
    let match
    while ((match = capRegex.exec(message)) !== null) {
      const capName = match[1]
      const capValue = match[2]
      capabilities.push({
        name: capName,
        enabled: capValue === '1'
      })
    }
    return capabilities
  }

  const handleGetFirmwareInfo = async () => {
    if (serialStatus !== 'connected') return
    
    setIsLoading(true)
    setFirmwareData(null)
    setIsVisible(true)
    
    try {
      await sendCommand('M115')
    } catch (error) {
      console.error('Failed to get firmware info:', error)
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setFirmwareData(null)
  }

  if (!isVisible) {
    return (
      <button 
        onClick={handleGetFirmwareInfo}
        disabled={serialStatus !== 'connected'}
        className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Firmware Info
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Firmware Information</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Requesting firmware information...</p>
          </div>
        ) : firmwareData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {firmwareData.firmwareName && (
                <div className="bg-gray-50 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700">Firmware Name</label>
                  <p className="text-sm text-gray-900">{firmwareData.firmwareName}</p>
                </div>
              )}
              
              {firmwareData.protocolVersion && (
                <div className="bg-gray-50 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700">Protocol Version</label>
                  <p className="text-sm text-gray-900">{firmwareData.protocolVersion}</p>
                </div>
              )}
              
              {firmwareData.machineType && (
                <div className="bg-gray-50 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700">Machine Type</label>
                  <p className="text-sm text-gray-900">{firmwareData.machineType}</p>
                </div>
              )}
              
              {firmwareData.extruderCount && (
                <div className="bg-gray-50 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700">Extruder Count</label>
                  <p className="text-sm text-gray-900">{firmwareData.extruderCount}</p>
                </div>
              )}
              
              {firmwareData.kinematics && (
                <div className="bg-gray-50 p-3 rounded">
                  <label className="text-sm font-medium text-gray-700">Kinematics</label>
                  <p className="text-sm text-gray-900">{firmwareData.kinematics}</p>
                </div>
              )}
              
              {firmwareData.uuid && (
                <div className="bg-gray-50 p-3 rounded md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">UUID</label>
                  <p className="text-sm text-gray-900 font-mono break-all">{firmwareData.uuid}</p>
                </div>
              )}
            </div>

            {firmwareData.sourceCodeUrl && (
              <div className="bg-gray-50 p-3 rounded">
                <label className="text-sm font-medium text-gray-700">Source Code URL</label>
                <a 
                  href={firmwareData.sourceCodeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 break-all"
                >
                  {firmwareData.sourceCodeUrl}
                </a>
              </div>
            )}

            {firmwareData.capabilities && firmwareData.capabilities.length > 0 && (
              <div className="bg-gray-50 p-3 rounded">
                <label className="text-sm font-medium text-gray-700">Capabilities</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {firmwareData.capabilities.map((cap, index) => (
                    <div 
                      key={index}
                      className={`px-2 py-1 text-xs rounded flex items-center justify-between ${
                        cap.enabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span>{cap.name}</span>
                      <span className="text-xs">
                        {cap.enabled ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-3 rounded">
              <label className="text-sm font-medium text-gray-700">Raw Response</label>
              <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{firmwareData.rawMessage}</pre>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No firmware information received. Make sure your printer is connected and supports M115.</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
})

export default FirmwareInfoDisplay
