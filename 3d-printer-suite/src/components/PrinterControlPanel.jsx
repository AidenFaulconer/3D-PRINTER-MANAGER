import React, { useEffect, useMemo, useState } from 'react'
import useSerialStore from '../stores/serialStore'
import SerialConnectionStatus from './SerialConnectionStatus'
import MovementControl from './controls/MovementControl'
import TemperatureControl from './controls/TemperatureControl'
import ExtrusionControl from './controls/ExtrusionControl'
import FanControl from './controls/FanControl'
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

  const [position, setPosition] = useState(null)

  // Subscribe to all logs and filter with useMemo to prevent infinite re-renders
  const allLogs = useSerialStore(state => state.serialLogs)
  const positionLogs = useMemo(() => 
    allLogs.filter(log => 
      log.type === 'rx' && 
      /\bX:\s*[-\d.]+/.test(log.message) && 
      /\bY:\s*[-\d.]+/.test(log.message) && 
      /\bZ:\s*[-\d.]+/.test(log.message)
    ), [allLogs]
  )

  // Parse position updates only when position logs change
  useEffect(() => {
    if (positionLogs.length === 0) return
    
    const latestPositionLog = positionLogs[positionLogs.length - 1]
    const line = latestPositionLog.message

    // Position: M114 typical: X:0.00 Y:0.00 Z:0.00 E:0.00
    const newPosition = {
      x: parseFloat((line.match(/X:\s*([-\d.]+)/) || [])[1] || 0),
      y: parseFloat((line.match(/Y:\s*([-\d.]+)/) || [])[1] || 0),
      z: parseFloat((line.match(/Z:\s*([-\d.]+)/) || [])[1] || 0),
      e: parseFloat((line.match(/E:\s*([-\d.]+)/) || [])[1] || 0)
    }
    
    // Only update if position actually changed
    if (!Number.isNaN(newPosition.x)) {
      setPosition(prev => {
        if (!prev || prev.x !== newPosition.x || prev.y !== newPosition.y || prev.z !== newPosition.z || prev.e !== newPosition.e) {
          return newPosition
        }
        return prev
      })
    }
  }, [positionLogs])

  const requestPosition = () => sendCommand('M114')
  const requestTemps = () => sendCommand('M105')

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
        <TemperatureControl send={send} requestTemps={requestTemps} />
        <ExtrusionControl send={send} preheat={preheat} />
        <FanControl send={send} />
        <UtilitiesControl send={send} />
      </div>

      {/* Bed Leveling Visualization */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Bed Leveling</h3>
        <BedMeshVisualization />
      </div>

      {/* Printer Settings */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Printer Settings</h3>
        <PrinterSettingsDisplay />
      </div>
    </div>
  )
})

export default PrinterControlPanel