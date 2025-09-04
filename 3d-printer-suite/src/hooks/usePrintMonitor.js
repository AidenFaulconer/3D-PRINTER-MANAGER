import { useCallback, useEffect, useRef, useState } from 'react'
import useSerialConnection from './useSerialConnection'
import useGcodeFilesStore from '../stores/gcodeFilesStore'

// Constants for printer communication
const BUFFER_SIZE = 128 // Typical Marlin buffer size
const MIN_BUFFER_SPACE = 32 // Minimum space required to send next command
const MAX_RETRIES = 3 // Maximum retries for failed commands
const COMMAND_TIMEOUT = 10000 // 10 seconds timeout for commands

export default function usePrintMonitor() {
  const {
    sendCommand,
    status: connectionStatus,
    temperatures,
    log
  } = useSerialConnection()

  const {
    activePrint,
    updatePrintProgress,
    pausePrint,
    resumePrint,
    completePrint,
    stopPrint,
    getFile
  } = useGcodeFilesStore()

  // State for print monitoring
  const [printerState, setPrinterState] = useState({
    position: { x: 0, y: 0, z: 0, e: 0 },
    bufferSpace: BUFFER_SIZE,
    isPrinting: false,
    isPaused: false,
    isEmergencyStopped: false,
    currentLine: 0,
    lastResponse: '',
    retryCount: 0,
    lastError: null
  })

  // Refs for managing print state
  const printQueueRef = useRef([])
  const commandTimeoutRef = useRef(null)
  const parkPositionRef = useRef(null)

  // Parse M114 position response
  const parsePosition = useCallback((response) => {
    const match = response.match(/X:(-?\d+\.?\d*) Y:(-?\d+\.?\d*) Z:(-?\d+\.?\d*) E:(-?\d+\.?\d*)/)
    if (match) {
      return {
        x: parseFloat(match[1]),
        y: parseFloat(match[2]),
        z: parseFloat(match[3]),
        e: parseFloat(match[4])
      }
    }
    return null
  }, [])

  // Handle printer responses
  const handlePrinterResponse = useCallback((response) => {
    // Clear command timeout
    if (commandTimeoutRef.current) {
      clearTimeout(commandTimeoutRef.current)
      commandTimeoutRef.current = null
    }

    // Update printer state based on response
    if (response.includes('ok')) {
      setPrinterState(prev => ({
        ...prev,
        bufferSpace: prev.bufferSpace + MIN_BUFFER_SPACE,
        lastResponse: response,
        retryCount: 0,
        lastError: null
      }))

      // Process next command in queue
      processNextCommand()
    } else if (response.includes('Error')) {
      handleCommandError(response)
    }

    // Parse position updates
    if (response.includes('X:')) {
      const position = parsePosition(response)
      if (position) {
        setPrinterState(prev => ({
          ...prev,
          position
        }))
      }
    }
  }, [parsePosition])

  // Handle command errors
  const handleCommandError = useCallback((error) => {
    setPrinterState(prev => {
      const newRetryCount = prev.retryCount + 1
      if (newRetryCount >= MAX_RETRIES) {
        // Critical error - stop print
        emergencyStop(`Max retries exceeded: ${error}`)
        return {
          ...prev,
          lastError: error,
          isPrinting: false,
          retryCount: 0
        }
      }
      return {
        ...prev,
        lastError: error,
        retryCount: newRetryCount,
        bufferSpace: prev.bufferSpace + MIN_BUFFER_SPACE
      }
    })
  }, [])

  // Process next command in queue
  const processNextCommand = useCallback(async () => {
    if (!printerState.isPrinting || printerState.isPaused || printerState.isEmergencyStopped) {
      return
    }

    if (printQueueRef.current.length === 0) {
      // Print completed successfully
      completePrint()
      setPrinterState(prev => ({
        ...prev,
        isPrinting: false,
        currentLine: 0
      }))
      return
    }

    if (printerState.bufferSpace < MIN_BUFFER_SPACE) {
      // Wait for more buffer space
      return
    }

    try {
      const command = printQueueRef.current[0]
      await sendCommand(command)

      // Set command timeout
      commandTimeoutRef.current = setTimeout(() => {
        handleCommandError('Command timeout')
      }, COMMAND_TIMEOUT)

      // Update state
      setPrinterState(prev => ({
        ...prev,
        bufferSpace: prev.bufferSpace - MIN_BUFFER_SPACE,
        currentLine: prev.currentLine + 1
      }))

      // Remove sent command from queue
      printQueueRef.current.shift()

      // Update progress
      if (activePrint) {
        const progress = (printerState.currentLine / printQueueRef.current.length) * 100
        updatePrintProgress(progress)
      }
    } catch (error) {
      handleCommandError(error.message)
    }
  }, [activePrint, printerState.bufferSpace, printerState.currentLine, printerState.isEmergencyStopped, printerState.isPaused, printerState.isPrinting, sendCommand, updatePrintProgress, completePrint])

  // Start print
  const startPrint = useCallback(async (fileId) => {
    const file = getFile(fileId)
    if (!file) return

    try {
      // Initialize printer
      await sendCommand('M110 N0') // Reset line numbers
      await sendCommand('M155 S1') // Start temperature auto-reporting
      await sendCommand('M114') // Get current position

      // Parse G-code into commands
      const commands = file.content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith(';'))

      // Set up print queue
      printQueueRef.current = commands

      // Update state
      setPrinterState(prev => ({
        ...prev,
        isPrinting: true,
        isPaused: false,
        isEmergencyStopped: false,
        currentLine: 0,
        bufferSpace: BUFFER_SIZE,
        lastError: null,
        retryCount: 0
      }))

      // Start processing commands
      processNextCommand()
    } catch (error) {
      console.error('Error starting print:', error)
      setPrinterState(prev => ({
        ...prev,
        lastError: error.message
      }))
    }
  }, [getFile, processNextCommand, sendCommand])

  // Pause print
  const handlePausePrint = useCallback(async () => {
    try {
      // Store current position
      const response = await sendCommand('M114')
      const position = parsePosition(response)
      if (position) {
        parkPositionRef.current = position
      }

      // Retract filament
      await sendCommand('G91') // Relative positioning
      await sendCommand('G1 E-3 F1800') // Retract 3mm
      await sendCommand('G90') // Absolute positioning

      // Move to park position
      await sendCommand('G1 Z5 F300') // Lift Z
      await sendCommand('G1 X0 Y0 F3000') // Park XY

      // Update state
      setPrinterState(prev => ({
        ...prev,
        isPaused: true
      }))
      pausePrint()
    } catch (error) {
      console.error('Error pausing print:', error)
    }
  }, [pausePrint, parsePosition, sendCommand])

  // Resume print
  const handleResumePrint = useCallback(async () => {
    if (!parkPositionRef.current) return

    try {
      // Return to print position
      await sendCommand('G90') // Absolute positioning
      await sendCommand(`G1 Z${parkPositionRef.current.z + 5} F300`) // Move Z above park position
      await sendCommand(`G1 X${parkPositionRef.current.x} Y${parkPositionRef.current.y} F3000`) // Move XY
      await sendCommand(`G1 Z${parkPositionRef.current.z} F300`) // Lower Z
      await sendCommand('G91') // Relative positioning
      await sendCommand('G1 E3 F1800') // Unretract
      await sendCommand('G90') // Absolute positioning

      // Update state
      setPrinterState(prev => ({
        ...prev,
        isPaused: false
      }))
      resumePrint()

      // Resume command processing
      processNextCommand()
    } catch (error) {
      console.error('Error resuming print:', error)
    }
  }, [processNextCommand, resumePrint, sendCommand])

  // Emergency stop
  const emergencyStop = useCallback(async (reason = 'Emergency stop triggered') => {
    try {
      // Send emergency stop commands
      await sendCommand('M410') // Quick stop
      await sendCommand('M112') // Emergency stop
      await sendCommand('M108') // Cancel heating

      // Clear command queue
      printQueueRef.current = []

      // Update state
      setPrinterState(prev => ({
        ...prev,
        isPrinting: false,
        isPaused: false,
        isEmergencyStopped: true,
        lastError: reason
      }))
      stopPrint()
    } catch (error) {
      console.error('Error during emergency stop:', error)
    }
  }, [stopPrint, sendCommand])

  // Babystep Z adjustment
  const adjustZOffset = useCallback(async (amount) => {
    try {
      await sendCommand(`M290 Z${amount}`) // Adjust Z offset
      await sendCommand('M114') // Get updated position
    } catch (error) {
      console.error('Error adjusting Z offset:', error)
    }
  }, [sendCommand])

  // Monitor printer responses
  useEffect(() => {
    if (log && log.length > 0) {
      const lastLogEntry = log[log.length - 1]
      if (lastLogEntry?.type === 'rx') {
        handlePrinterResponse(lastLogEntry.message)
      }
    }
  }, [log, handlePrinterResponse])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current)
      }
    }
  }, [])

  return {
    printerState,
    startPrint,
    pausePrint: handlePausePrint,
    resumePrint: handleResumePrint,
    emergencyStop,
    adjustZOffset,
    temperatures
  }
}
