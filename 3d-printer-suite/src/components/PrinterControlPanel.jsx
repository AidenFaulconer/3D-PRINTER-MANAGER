import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useSerialStore from '../stores/serialStore'
import SerialConnectionStatus from './SerialConnectionStatus'
import MovementControl from './controls/MovementControl'
import TemperatureControl from './controls/TemperatureControl'
import ExtrusionControl from './controls/ExtrusionControl'
import FanControl from './controls/FanControl'
import BabyStepControl from './controls/BabyStepControl'
import UtilitiesControl from './controls/UtilitiesControl'
import BedMeshVisualization from './BedMeshVisualization'
import PrinterSettingsDisplay from './PrinterSettingsDisplay'

const PrinterControlPanel = React.memo(() => {
  // Use selective subscriptions for better performance
  const status = useSerialStore(state => state.status)
  const baudRate = useSerialStore(state => state.baudRate)
  const setBaudRate = useSerialStore(state => state.setBaudRate)
  const autoDetect = useSerialStore(state => state.autoDetect)
  const setAutoDetect = useSerialStore(state => state.setAutoDetect)
  const error = useSerialStore(state => state.error)
  const connect = useSerialStore(state => state.connect)
  const disconnect = useSerialStore(state => state.disconnect)
  const sendCommand = useSerialStore(state => state.sendCommand)

  // Use a ref to track the last processed log count to avoid unnecessary updates
  const lastLogCountRef = useRef(0)
  const [position, setPosition] = useState(null)
  
  // Only process position logs when we actually need to update position
  // This prevents the memory leak and excessive re-renders
  const processPositionLogs = useCallback(() => {
    const allLogs = useSerialStore.getState().serialLogs || []
    const currentLogCount = allLogs.length
    
    // Only process if there are new logs
    if (currentLogCount <= lastLogCountRef.current) return
    
    // Find the latest position log
    const positionLogs = allLogs
      .slice(lastLogCountRef.current) // Only process new logs
      .filter(log => 
        log.type === 'rx' && 
        /\bX:\s*[-\d.]+/.test(log.message) && 
        /\bY:\s*[-\d.]+/.test(log.message) && 
        /\bZ:\s*[-\d.]+/.test(log.message)
      )
    
    if (positionLogs.length > 0) {
      const latestLog = positionLogs[positionLogs.length - 1]
      const line = latestLog.message
      
      const newPosition = {
        x: parseFloat((line.match(/X:\s*([-\d.]+)/) || [])[1] || 0),
        y: parseFloat((line.match(/Y:\s*([-\d.]+)/) || [])[1] || 0),
        z: parseFloat((line.match(/Z:\s*([-\d.]+)/) || [])[1] || 0),
        e: parseFloat((line.match(/E:\s*([-\d.]+)/) || [])[1] || 0)
      }
      
      if (!Number.isNaN(newPosition.x)) {
        setPosition(prev => {
          if (!prev || prev.x !== newPosition.x || prev.y !== newPosition.y || prev.z !== newPosition.z || prev.e !== newPosition.e) {
            return newPosition
          }
          return prev
        })
      }
    }
    
    lastLogCountRef.current = currentLogCount
  }, [])
  
  // Use a timer to periodically check for new position logs instead of subscribing to every log change
  useEffect(() => {
    const interval = setInterval(processPositionLogs, 1000) // Check every second
    return () => clearInterval(interval)
  }, [processPositionLogs])


  const requestPosition = () => sendCommand('M114')

  const send = (g) => sendCommand(g)
  

  const preheat = (mat) => {
    if (mat === 'PLA') { send('M104 S205'); send('M140 S60') }
    if (mat === 'PETG') { send('M104 S235'); send('M140 S80') }
  }

  return (
    <div className="space-y-4">
      <SerialConnectionStatus
        status={status}
        baudRate={baudRate}
        setBaudRate={setBaudRate}
        autoDetect={autoDetect}
        setAutoDetect={setAutoDetect}
        error={error}
        onConnect={connect}
        onDisconnect={disconnect}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MovementControl send={send} requestPosition={requestPosition} lastPosition={position} />
        <TemperatureControl send={send} isConnected={status === 'connected'} />
        <ExtrusionControl send={send} preheat={preheat} />
        <FanControl send={send} />
        <BabyStepControl send={send} isConnected={status === 'connected'} />
        <UtilitiesControl send={send} />
      </div>

      {/* Bed Leveling Visualization (condensed: no status/actions) */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Bed Leveling</h3>
        <BedMeshVisualization showStatus={false} showActions={false} />
      </div>

      {/* Printer Settings */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Printer Settings</h3>
        <PrinterSettingsDisplay />
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  // Since this component has no props, it should only re-render when internal state changes
  return true // Always return true to prevent re-renders based on props
})

export default PrinterControlPanel