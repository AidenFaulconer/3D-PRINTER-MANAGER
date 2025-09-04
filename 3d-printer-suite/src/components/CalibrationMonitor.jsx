import React, { useEffect, useMemo, useState } from 'react'
import useSerialStore from '../stores/serialStore'
import TemperatureChart from './controls/TemperatureChart'

const MAX_POINTS = 180

const useMonitorState = () => {
  const status = useSerialStore(state => state.status)
  const sendCommand = useSerialStore(state => state.sendCommand)
  
  // Subscribe to connection status first
  const isConnected = useSerialStore(state => state.status === 'connected')
  
  // Only subscribe to temperature data when connected to prevent unnecessary state changes
  const temperatureData = useSerialStore(state => {
    // Return null when not connected to prevent any subscription updates
    if (state.status !== 'connected') return null
    return state.temperatures
  })
  
  // Extract temperature values with defaults
  const hotendCurrent = temperatureData?.hotend?.current || 0
  const hotendTarget = temperatureData?.hotend?.target || 0
  const bedCurrent = temperatureData?.bed?.current || 0
  const bedTarget = temperatureData?.bed?.target || 0
  
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
  
  const okLogs = useMemo(() => 
    allLogs.filter(log => 
      log.type === 'rx' && /\bok\b/i.test(log.message)
    ), [allLogs]
  )
  
  const errorLogs = useMemo(() => 
    allLogs.filter(log => 
      log.type === 'rx' && /error[:\s]/i.test(log.message)
    ), [allLogs]
  )
  
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [okCount, setOkCount] = useState(0)
  const [errCount, setErrCount] = useState(0)
  const [series, setSeries] = useState([])

  // Update temperature history when temperature values change
  useEffect(() => {
    setSeries(prev => {
      const newPoint = {
        hotend: hotendCurrent,
        bed: bedCurrent,
        targetHotend: hotendTarget,
        targetBed: bedTarget,
        timestamp: Date.now()
      }
      const newSeries = [...prev, newPoint]
      if (newSeries.length > MAX_POINTS) {
        return newSeries.slice(-MAX_POINTS)
      }
      return newSeries
    })
  }, [hotendCurrent, hotendTarget, bedCurrent, bedTarget])

  // Update position only when position logs change
  useEffect(() => {
    if (positionLogs.length === 0) return
    
    const latestPositionLog = positionLogs[positionLogs.length - 1]
    const line = latestPositionLog.message

    const newPosition = {
      x: parseFloat((line.match(/X:\s*([-\d.]+)/) || [])[1] || 0),
      y: parseFloat((line.match(/Y:\s*([-\d.]+)/) || [])[1] || 0),
      z: parseFloat((line.match(/Z:\s*([-\d.]+)/) || [])[1] || 0)
    }
    
    setPosition(prev => {
      if (prev.x !== newPosition.x || prev.y !== newPosition.y || prev.z !== newPosition.z) {
        return newPosition
      }
      return prev
    })
  }, [positionLogs])

  // Update ok count only when ok logs change
  useEffect(() => {
    setOkCount(okLogs.length)
  }, [okLogs])

  // Update error count only when error logs change
  useEffect(() => {
    setErrCount(errorLogs.length)
  }, [errorLogs])

  // Temperature polling is handled by serialStore automatically
  // No need to poll here to avoid duplicate M105 commands

  return { 
    temps: {
      hotend: { current: hotendCurrent, target: hotendTarget },
      bed: { current: bedCurrent, target: bedTarget }
    },
    series,
    position,
    okCount,
    errCount,
    status 
  }
}

// Memoize the status display to prevent re-renders when only temperatures change
const StatusDisplay = React.memo(({ temps, position, okCount, errCount }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-4">
      <div>
        Hotend: <span className="font-medium">{temps?.hotend?.current ?? 0}°C</span>
        {temps?.hotend?.target > 0 && <span className="text-gray-500"> → {temps.hotend.target}°C</span>}
      </div>
      <div>
        Bed: <span className="font-medium">{temps?.bed?.current ?? 0}°C</span>
        {temps?.bed?.target > 0 && <span className="text-gray-500"> → {temps.bed.target}°C</span>}
      </div>
      <div>Pos: <span className="font-mono">X{position.x.toFixed?.(2) ?? position.x} Y{position.y.toFixed?.(2) ?? position.y} Z{position.z.toFixed?.(2) ?? position.z}</span></div>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-green-700">ok: {okCount}</span>
      <span className="text-red-700">err: {errCount}</span>
    </div>
  </div>
))

const CalibrationMonitor = React.memo(() => {
  const { temps, series, position, okCount, errCount } = useMonitorState()

  return (
    <div className="bg-white border border-gray-200 rounded p-3 space-y-3">
      <StatusDisplay
        temps={temps}
        position={position}
        okCount={okCount}
        errCount={errCount}
      />
      <TemperatureChart series={series} />
    </div>
  )
})

export default CalibrationMonitor;