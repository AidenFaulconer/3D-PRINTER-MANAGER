import React, { useEffect, useMemo, useState, useRef } from 'react'
import useSerialStore from '../stores/serialStore'

const MAX_POINTS = 180

const useMonitorState = () => {
  const status = useSerialStore(state => state.status)
  const sendCommand = useSerialStore(state => state.sendCommand)
  
  // Temperature monitoring is now handled by TemperatureControl component only
  // No temperature display in CalibrationMonitor to prevent state interference
  
  // Use selective subscriptions to prevent app-wide re-renders
  const logCount = useSerialStore(state => state.serialLogs?.length || 0)
  
  // Get filtered logs only when needed, not on every render
  const [positionLogs, setPositionLogs] = useState([])
  const [okLogs, setOkLogs] = useState([])
  const [errorLogs, setErrorLogs] = useState([])
  
  useEffect(() => {
    // Only fetch logs when log count changes
    const allLogs = useSerialStore.getState().serialLogs || []
    
    const newPositionLogs = allLogs.filter(log => 
      log.type === 'rx' && 
      /\bX:\s*[-\d.]+/.test(log.message) && 
      /\bY:\s*[-\d.]+/.test(log.message) && 
      /\bZ:\s*[-\d.]+/.test(log.message)
    )
    
    const newOkLogs = allLogs.filter(log => 
      log.type === 'rx' && /\bok\b/i.test(log.message)
    )
    
    const newErrorLogs = allLogs.filter(log => 
      log.type === 'rx' && /error[:\s]/i.test(log.message)
    )
    
    setPositionLogs(newPositionLogs)
    setOkLogs(newOkLogs)
    setErrorLogs(newErrorLogs)
  }, [logCount])
  
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [okCount, setOkCount] = useState(0)
  const [errCount, setErrCount] = useState(0)
  

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
    position,
    okCount,
    errCount,
    status 
  }
}

// Memoize the status display to prevent re-renders
const StatusDisplay = React.memo(({ position, okCount, errCount }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-4">
      <div>Pos: <span className="font-mono">X{position.x.toFixed?.(2) ?? position.x} Y{position.y.toFixed?.(2) ?? position.y} Z{position.z.toFixed?.(2) ?? position.z}</span></div>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-green-700">ok: {okCount}</span>
      <span className="text-red-700">err: {errCount}</span>
    </div>
  </div>
))

const CalibrationMonitor = React.memo(() => {
  const { position, okCount, errCount } = useMonitorState()
  
  // Get temperature series from store without subscribing to prevent re-renders
  // Temperature monitoring is now handled by TemperatureControl component only
  // No temperature chart in CalibrationMonitor to prevent state interference

  return (
    <div className="bg-white border border-gray-200 rounded p-3 space-y-3">
      <StatusDisplay
        position={position}
        okCount={okCount}
        errCount={errCount}
      />
    </div>
  )
})

export default CalibrationMonitor;