import { useState, useRef, useCallback } from 'react'

/**
 * Custom hook for serial communication with 3D printers using Web Serial API
 * Manages connection state, serial port communication, and command logging
 */
export const useSerialCommunicator = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [port, setPort] = useState(null)
  const [log, setLog] = useState([])
  const [isConnecting, setIsConnecting] = useState(false)
  
  const readerRef = useRef(null)
  const writerRef = useRef(null)
  const keepReadingRef = useRef(false)

  const addToLog = useCallback((message, direction = 'rx') => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message: message.trim(),
      direction
    }
    setLog(prev => [...prev, logEntry])
  }, [])

  const readFromPort = useCallback(async (port) => {
    const textDecoder = new TextDecoderStream()
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
    const reader = textDecoder.readable.getReader()
    readerRef.current = reader

    try {
      while (keepReadingRef.current) {
        const { value, done } = await reader.read()
        if (done) {
          console.log('Reader done')
          break
        }
        if (value) {
          addToLog(value, 'rx')
        }
      }
    } catch (error) {
      console.error('Error reading from port:', error)
      addToLog(`Error reading: ${error.message}`, 'rx')
    } finally {
      reader.releaseLock()
      await readableStreamClosed.catch(() => {}) // Ignore errors when closing
    }
  }, [addToLog])

  const connect = useCallback(async () => {
    if (!('serial' in navigator)) {
      addToLog('Web Serial API not supported in this browser', 'rx')
      throw new Error('Web Serial API not supported')
    }

    try {
      setIsConnecting(true)
      
      // Request port selection
      const selectedPort = await navigator.serial.requestPort()
      
      // Open the port with appropriate settings for 3D printers
      await selectedPort.open({ 
        baudRate: 115200,  // Standard for most 3D printers
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        flowControl: 'none'
      })

      setPort(selectedPort)
      setIsConnected(true)
      keepReadingRef.current = true

      // Set up writer
      const textEncoder = new TextEncoderStream()
      const writableStreamClosed = textEncoder.readable.pipeTo(selectedPort.writable)
      writerRef.current = textEncoder.writable.getWriter()

      addToLog('Connected to printer', 'tx')

      // Start reading from port
      readFromPort(selectedPort)

      return selectedPort
    } catch (error) {
      console.error('Failed to connect:', error)
      addToLog(`Connection failed: ${error.message}`, 'rx')
      throw error
    } finally {
      setIsConnecting(false)
    }
  }, [addToLog, readFromPort])

  const disconnect = useCallback(async () => {
    try {
      keepReadingRef.current = false

      // Close writer
      if (writerRef.current) {
        await writerRef.current.close()
        writerRef.current = null
      }

      // Close reader
      if (readerRef.current) {
        await readerRef.current.cancel()
        readerRef.current = null
      }

      // Close port
      if (port) {
        await port.close()
      }

      setPort(null)
      setIsConnected(false)
      addToLog('Disconnected from printer', 'tx')
    } catch (error) {
      console.error('Error during disconnect:', error)
      addToLog(`Disconnect error: ${error.message}`, 'rx')
    }
  }, [port, addToLog])

  const sendCommand = useCallback(async (command) => {
    if (!isConnected || !writerRef.current) {
      throw new Error('Not connected to printer')
    }

    try {
      // Ensure command ends with newline
      const commandWithNewline = command.trim() + '\n'
      
      await writerRef.current.write(commandWithNewline)
      addToLog(command.trim(), 'tx')
    } catch (error) {
      console.error('Error sending command:', error)
      addToLog(`Send error: ${error.message}`, 'rx')
      throw error
    }
  }, [isConnected, addToLog])

  const sendGcodeBlock = useCallback(async (gcodeBlock, delay = 100) => {
    if (!isConnected) {
      throw new Error('Not connected to printer')
    }

    const lines = gcodeBlock.split('\n').filter(line => {
      const trimmed = line.trim()
      return trimmed && !trimmed.startsWith(';') // Skip empty lines and comments
    })

    for (const line of lines) {
      await sendCommand(line)
      // Small delay between commands to avoid overwhelming the printer
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }, [isConnected, sendCommand])

  const clearLog = useCallback(() => {
    setLog([])
  }, [])

  const getConnectionStatus = useCallback(() => {
    if (isConnecting) return 'connecting'
    if (isConnected) return 'connected'
    return 'disconnected'
  }, [isConnected, isConnecting])

  return {
    // State
    isConnected,
    isConnecting,
    port,
    log,
    
    // Methods
    connect,
    disconnect,
    sendCommand,
    sendGcodeBlock,
    clearLog,
    getConnectionStatus
  }
}
