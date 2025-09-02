import { useCallback, useEffect, useRef } from 'react'
import usePrintersStore from '../stores/printersStore'

const DEFAULT_BAUDS = [115200, 250000, 57600, 38400, 9600] // Prioritize 115200 for Ender 3

export default function useSerialConnection() {
  const {
    serialPort: port,
    serialStatus: status,
    serialBaudRate: baudRate,
    serialAutoDetect: autoDetect,
    serialError: error,
    serialLog: log,
    setSerialPort,
    setSerialStatus,
    setSerialBaudRate,
    setSerialAutoDetect,
    setSerialError,
    appendSerialLog,
    clearSerialLog
  } = usePrintersStore()

  // Refs for managing port resources
  const readerRef = useRef(null)
  const readLoopAbortRef = useRef(null)
  const textDecoderRef = useRef(null)
  const encoderRef = useRef(new TextEncoder())
  const cleanupTimeoutRef = useRef(null)
  const isConnectingRef = useRef(false) // Prevent cleanup during connection
  const isUnmountingRef = useRef(false) // Track unmounting state
  const tempMonitorRef = useRef(null) // For temperature monitoring interval
  
  // Get temperature state from store
  const { temperatures, setTemperatures } = usePrintersStore()

  // Alias the store actions to match the old hook interface
  const setPort = useCallback((newPort) => {
    // Clear any pending cleanup
    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current)
      cleanupTimeoutRef.current = null
    }
    setSerialPort(newPort)
  }, [setSerialPort])

  const setError = setSerialError

  const clearLog = clearSerialLog // Use store's clearSerialLog directly

  const closeReader = useCallback(async () => {
    try {
      // First abort any ongoing read operations
      if (readLoopAbortRef.current) {
        readLoopAbortRef.current.abort()
        readLoopAbortRef.current = null
      }

      // Then try to close the reader
      if (readerRef.current) {
        try {
          await readerRef.current.cancel()
        } catch (e) {
          // Ignore cancel errors on locked streams
          if (!e.message?.includes('locked')) {
            throw e
          }
        }
        try {
          await readerRef.current.releaseLock()
        } catch (_) {}
      }
    } catch (e) {
      appendSerialLog(`Warning: Error closing reader: ${e.message}`, 'sys')
    } finally {
      readerRef.current = null
    }
  }, [appendSerialLog])

  const teardownStreams = useCallback(async () => {
    try { await closeReader() } catch (_) {}
    try { if (textDecoderRef.current) textDecoderRef.current.readable?.cancel() } catch (_) {}
    textDecoderRef.current = null
  }, [closeReader])



  // Parse temperature response (e.g., "ok T:25.3 /200.0 B:60.1 /60.0")
  const parseTemperatures = useCallback((line) => {
    const temps = {
      hotend: { current: 0, target: 0 },
      bed: { current: 0, target: 0 },
      timestamp: Date.now()
    }

    // Extract hotend temp
    const tMatch = line.match(/T:(\d+\.?\d*)\s*\/(\d+\.?\d*)/)
    if (tMatch) {
      temps.hotend.current = parseFloat(tMatch[1])
      temps.hotend.target = parseFloat(tMatch[2])
    }

    // Extract bed temp
    const bMatch = line.match(/B:(\d+\.?\d*)\s*\/(\d+\.?\d*)/)
    if (bMatch) {
      temps.bed.current = parseFloat(bMatch[1])
      temps.bed.target = parseFloat(bMatch[2])
    }

    return temps
  }, [])

  const startReadLoop = useCallback(async (activePort) => {
    try {
      // Clean up any existing read loop
      if (readLoopAbortRef.current) {
        readLoopAbortRef.current.abort()
        readLoopAbortRef.current = null
      }
      
      // Create new abort controller
      readLoopAbortRef.current = new AbortController()
      
      // Set up text decoder stream
      textDecoderRef.current = new TextDecoderStream()
      
      // Start the read loop
      try {
        const readableStreamClosed = activePort.readable.pipeTo(textDecoderRef.current.writable)
        const reader = textDecoderRef.current.readable.getReader()
        readerRef.current = reader

        let carry = ''
        while (true) {
          if (readLoopAbortRef.current?.signal.aborted) {
            break
          }

          const { value, done } = await reader.read()
          if (done) break

          if (value) {
            carry += value
            let idx
            while ((idx = carry.indexOf('\n')) >= 0) {
              const line = carry.slice(0, idx).replace(/\r$/, '')
              carry = carry.slice(idx + 1)
              if (line.trim().length > 0) {
                appendSerialLog(line, 'rx')
                
                // Check for temperature response
                if (line.includes('T:') && line.includes('B:')) {
                  const temps = parseTemperatures(line)
                  setTemperatures(temps)
                }
              }
            }
          }
        }

        await readableStreamClosed.catch(() => {})
      } catch (e) {
        if (e?.name !== 'AbortError') {
          appendSerialLog(`Read loop error: ${e?.message || e}`, 'err')
          throw e // Propagate non-abort errors
        }
      }
    } catch (e) {
      appendSerialLog(`Failed to start read loop: ${e?.message || e}`, 'err')
      throw e
    }
  }, [appendSerialLog, parseTemperatures])

  const tryOpenWithBaud = useCallback(async (portToOpen, candidateBaud) => {
    if (!portToOpen) {
      throw new Error('No port provided')
    }

    appendSerialLog(`Opening port @ ${candidateBaud}…`, 'sys')
    
    try {
      // Make sure any existing connections are fully cleaned up
      try {
        // First try to cancel any ongoing reads
        if (readLoopAbortRef.current) {
          readLoopAbortRef.current.abort()
          readLoopAbortRef.current = null
        }

        // Clean up any existing streams
        await teardownStreams()

        // If the port is still open, close it
        if (portToOpen.readable || portToOpen.writable) {
          await portToOpen.close()
        }

        // Add a delay to let the system release the port
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (closeError) {
        appendSerialLog(`Warning: Error while closing port: ${closeError.message}`, 'sys')
        // Even if there's an error, continue with the delay
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Try to open with a timeout
      const openTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Port open timeout')), 3000)
      )
      
      // Prepare port configuration
      const portConfig = {
        baudRate: candidateBaud,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        bufferSize: 255,
        flowControl: "none",
        rtscts: false,
        xon: false,
        xoff: false
      }

      appendSerialLog(`Configuring port with baud ${candidateBaud}`, 'sys')
      
      try {
        // Open port with timeout
        await Promise.race([
          portToOpen.open(portConfig),
          openTimeout
        ])
        
        appendSerialLog('Port opened successfully', 'sys')
        
        // Store port reference in state immediately after successful open
        setPort(portToOpen)
        
        // Wait for port to stabilize
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Verify port is still open
        if (!portToOpen.readable || !portToOpen.writable) {
          throw new Error('Port closed unexpectedly after opening')
        }
      
      await startReadLoop(portToOpen)

      // Send firmware probe and reset commands
      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait for port to stabilize
      await sendCommandInternal('M115') // Firmware info
      await sendCommandInternal('M503') // Report settings
      await sendCommandInternal('M119') // Endstop states

    // Wait for Marlin response
    const waitMs = 2000
    const startLogLength = log.length
    await new Promise((res) => setTimeout(res, waitMs))

    // Check for valid Marlin responses
    const newMessages = log.slice(startLogLength)
    const hasMarlinResponse = newMessages.some(entry => 
      entry.direction === 'rx' && (
        entry.message.includes('FIRMWARE_NAME:') || // M115 response
        entry.message.includes('Steps per unit:') || // M503 response
        entry.message.includes('Reporting endstop') // M119 response
      )
    )

    if (!hasMarlinResponse) {
      throw new Error('No valid Marlin response received')
    }

    appendSerialLog('Marlin firmware detected', 'sys')
    return true
  } catch (error) {
    appendSerialLog(`Failed to open port @ ${candidateBaud}: ${error.message}`, 'err')
    throw error
  }}catch(e){throw new Error(`error: ${e}`)}}, [appendSerialLog, log, port, setPort, teardownStreams]);

  const disconnect = useCallback(async (force = false) => {
    try {
      // Only proceed if we're actually connected/connecting or forcing disconnect
      if (!force && status === 'disconnected') {
        return;
      }

      // Log only if we're actually connected/connecting
      if (status === 'connected' || status === 'connecting') {
        appendSerialLog('Disconnecting...', 'sys')
      }
      
      // Store current port reference
      const currentPort = port;
      
      // Update state first - use store setState to batch updates
      usePrintersStore.setState((state) => ({
        ...state,
        serialPort: null,
        serialStatus: 'disconnected'
      }))
      
      // Then clean up resources
      try {
        // Stop temperature monitoring
        if (tempMonitorRef.current) {
          clearInterval(tempMonitorRef.current)
          tempMonitorRef.current = null
        }

        if (readLoopAbortRef.current) {
          readLoopAbortRef.current.abort()
          readLoopAbortRef.current = null
        }
        
        await teardownStreams()
        
        if (currentPort && (currentPort.readable || currentPort.writable)) {
          await currentPort.close()
          appendSerialLog('Port closed', 'sys')
        }
      } catch (e) {
        appendSerialLog(`Warning during cleanup: ${e.message}`, 'sys')
      }
    } catch (e) {
      appendSerialLog(`Error during disconnect: ${e.message}`, 'err')
    }
  }, [appendSerialLog, port, status, teardownStreams])
  
  const connect = useCallback(async (opts = {}) => {
    try {
      setError(null)
      
      // Check browser support
      if (!('serial' in navigator)) {
        throw new Error('Web Serial API not supported in this browser')
      }

      // Check if we're already connected or connecting
      if (status === 'connected') {
        return // Already connected, no need to reconnect
      }
      if (status === 'connecting') {
        throw new Error('Connection already in progress')
      }

      // Set connecting flag to prevent cleanup
      isConnectingRef.current = true

      // Force cleanup of any existing connection
      await disconnect(true)

      // Reset state and set connecting status
      setPort(null)
      setSerialStatus('connecting')
      
      // Wait a moment for any browser cleanup
      await new Promise(resolve => setTimeout(resolve, 500))

    // Clean up any existing ports
    try {
      const ports = await navigator.serial.getPorts()
      appendSerialLog(`Cleaning up ${ports.length} existing ports...`, 'sys')
      
      for (const p of ports) {
        try {
          // Try to get port info for logging
          const info = p.getInfo()
          appendSerialLog(`Closing port VID: 0x${info.usbVendorId?.toString(16) || 'none'}, ` +
                   `PID: 0x${info.usbProductId?.toString(16) || 'none'}`, 'sys')
          
          // Clean up the port
          if (p.readable || p.writable) {
            await p.close()
          }
        } catch (e) {
          appendSerialLog(`Warning: Error closing port: ${e.message}`, 'sys')
        }
      }
      
      // Add a delay after cleanup
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (e) {
      appendSerialLog(`Warning: Error during port cleanup: ${e.message}`, 'sys')
    }

    setSerialStatus('connecting') // Use store action directly
    try {
      // Add USB vendor ID for CH340 (0x1a86)
      // Try to get the CH340/CH341 port first
      let selectedPort
      try {
        // Request all available ports first
        const ports = await navigator.serial.getPorts();
        appendSerialLog(`Found ${ports.length} previously authorized ports`, 'sys');
        
        // Try to find our COM3 port in previously authorized ports
        for (const port of ports) {
          const info = port.getInfo();
          appendSerialLog(`Port: VID: 0x${info.usbVendorId?.toString(16) || 'none'}, ` +
                   `PID: 0x${info.usbProductId?.toString(16) || 'none'}`, 'sys');
          
          // If this is a WCH CH340 device, use it
          if (info.usbVendorId === 0x1a86) {
            appendSerialLog('Found previously authorized CH340 device', 'sys');
            selectedPort = port;
            break;
          }
        }
        
        // If we didn't find it in existing ports, request new port
        if (!selectedPort) {
          appendSerialLog('Requesting port selection...', 'sys');
          selectedPort = await navigator.serial.requestPort({
            filters: [
              // WCH CH340 variants (0x1a86 is WCH vendor ID)
              { usbVendorId: 0x1a86, usbProductId: 0x7523 }, // CH340
              { usbVendorId: 0x1a86, usbProductId: 0x5523 }, // CH341
              { usbVendorId: 0x1a86, usbProductId: 0x7522 }, // CH340K
              { usbVendorId: 0x1a86, usbProductId: 0x5512 }, // CH341A
              { usbVendorId: 0x1a86 }  // Any WCH product
            ]
          });
          appendSerialLog('New CH340 device selected', 'sys');
        }
        appendSerialLog('CH340 USB-Serial adapter detected', 'sys')
      } catch (e) {
        // If no CH340 found, try any available port
        appendSerialLog('No CH340 device found, trying any available port...', 'sys')
        selectedPort = await navigator.serial.requestPort({ filters: [] })
      }
      setPort(selectedPort)

      if (!selectedPort) {
        throw new Error('No port selected')
      }

      // Store port reference and update state
      const activePort = selectedPort;
      setPort(activePort); // Set port immediately so it's available for commands
      setSerialStatus('connected')
      
      
      // Track connection state
      let opened = false;
      let openedBaud = null;

      // Try each baud rate
      const candidateBauds = opts.autoDetect ?? autoDetect ? DEFAULT_BAUDS : [opts.baudRate || baudRate];
      
      for (const b of candidateBauds) {
        try {
          // Try to open with this baud rate
          await tryOpenWithBaud(activePort, b);
          
          // If we get here, the port opened successfully
          opened = true;
          openedBaud = b;
          setBaudRate(b);
          break;
        } catch (e) {
          appendSerialLog(`Failed @ ${b}: ${e?.message || e}`, 'err');
          try {
            if (activePort.readable || activePort.writable) {
              await activePort.close();
            }
          } catch (_) {}
          
          // Don't clear port reference on individual baud rate failures
          // We'll keep trying other baud rates with the same port
        }
      }

      if (!opened) {
        throw new Error('Unable to establish serial communication at common baud rates')
      }

      // Verify port is still valid
      if (!activePort || !activePort.readable || !activePort.writable) {
        throw new Error('Port validation failed after opening')
      }

      // Update status and store the successful configuration
      setSerialStatus('connected') // Use store action directly
      setSerialBaudRate(openedBaud) // Use store action directly
      appendSerialLog(`Connected @ ${openedBaud}`, 'sys')

      // Add disconnect listener
      const handleDisconnect = () => {
        appendSerialLog('Device disconnected', 'err')
        disconnect(true) // Force cleanup on disconnect
      }

      // Remove any existing listeners first
      try {
        activePort.removeEventListener('disconnect', handleDisconnect)
      } catch (_) {}
      
      // Add new disconnect listener
      activePort.addEventListener('disconnect', handleDisconnect, { once: true })

      // Mark as connected immediately
      setSerialStatus('connected') // Use store action directly
      appendSerialLog('Port connected successfully', 'sys')
      
      // Send initial M115 to get firmware info, but don't wait for response
      try {
        sendCommandInternal('M115', activePort).catch(() => {})
      } catch (e) {
        // Ignore any errors, we don't want to block on this
      }

      // Start temperature monitoring
      if (tempMonitorRef.current) {
        clearInterval(tempMonitorRef.current)
      }
      tempMonitorRef.current = setInterval(() => {
        try {
          sendCommandInternal('M105', activePort).catch(() => {})
        } catch (e) {
          // Ignore errors during temperature polling
        }
      }, 2000) // Poll every 2 seconds
      } catch (e) {
        appendSerialLog(`Communication check failed: ${e.message}`, 'err')
        await disconnect(true)
        throw new Error(`Failed to verify communication: ${e.message}`)
      }
    } catch (e) {
      setSerialStatus('disconnected') // Use store action directly
      let msg = e?.message || String(e)
      
      // Provide more helpful error messages for common issues
      if (msg.includes('Could not establish connection') || msg.includes('Receiving end does not exist')) {
        msg = 'Browser connection error. Please try:\n' +
              '1. Refresh the page\n' +
              '2. Close and reopen browser\n' +
              '3. Disable browser extensions\n' +
              '4. Try a different browser (Chrome recommended)'
      } else if (msg.includes('Connection already in progress')) {
        msg = 'Already trying to connect. Please wait...'
      } else if (msg.includes('Still verifying connection')) {
        msg = 'Please wait - verifying connection to printer...'
      } else if (msg.includes('No response from printer')) {
        msg = 'No response from printer. Please check:\n' +
              '1. Printer is powered on and not in a menu\n' +
              '2. Correct baud rate (115200 for Ender 3)\n' +
              '3. USB cable is firmly connected\n' +
              '4. Try unplugging and reconnecting USB cable'
      } else if (msg.includes('Port open timeout')) {
        msg = 'Port open timed out. The port might be locked. Please try:\n' +
              '1. Close ALL applications that might use COM3:\n' +
              '   - Pronterface\n' +
              '   - Cura\n' +
              '   - PuTTY\n' +
              '   - Arduino IDE\n' +
              '2. Open Task Manager and end these processes if found:\n' +
              '   - Pronterface.exe\n' +
              '   - python.exe (if running Pronterface)\n' +
              '   - Cura.exe\n' +
              '3. Open Device Manager:\n' +
              '   - Find "USB-SERIAL CH340 (COM3)"\n' +
              '   - Right-click -> Disable\n' +
              '   - Wait 5 seconds\n' +
              '   - Right-click -> Enable'
      } else if (msg.includes('NetworkError') || msg.includes('Failed to execute "open"')) {
        msg = 'Could not open serial port. Please check:\n' +
              '1. In Device Manager, verify:\n' +
              '   - "USB-SERIAL CH340 (COM3)" is present\n' +
              '   - Driver provider is wch.cn\n' +
              '   - Driver version is 3.9.2024.9\n' +
              '2. Try these steps in order:\n' +
              '   a. Unplug USB cable\n' +
              '   b. Wait 10 seconds\n' +
              '   c. Open Device Manager\n' +
              '   d. Plug in USB cable\n' +
              '   e. Watch Device Manager - should show COM3\n' +
              '   f. If COM3 doesn\'t appear, uninstall driver and reinstall\n' +
              '3. If still failing:\n' +
              '   - Try a different USB port\n' +
              '   - Try a different USB cable\n' +
              '   - Check if printer powers on via USB'
      } else if (msg.includes('No valid Marlin response')) {
        msg = 'No response from printer. Please check:\n' +
              '1. The correct baud rate is selected (usually 115200)\n' +
              '2. The printer is not in a boot/flash mode\n' +
              '3. The USB-Serial adapter is working properly'
      }
      
      setError(msg)
      appendSerialLog(`Connection error: ${msg}`, 'err')
      try { await port?.close?.() } catch (_) {}
      setPort(null)
    } finally {
      // Reset connecting flag
      isConnectingRef.current = false
    }}, [appendSerialLog, autoDetect, baudRate, disconnect, port, tryOpenWithBaud])

  const sendCommandInternal = useCallback(async (gcode, targetPort = port) => {
    // Validate connection state and port
    if (!targetPort) {
      throw new Error('No port available')
    }
    if (!targetPort.writable) {
      throw new Error('Port is not writable')
    }
    if (status === 'disconnected') {
      throw new Error('Not connected to printer')
    }
    
    // No verification check needed anymore

    let writer = null
    try {
      // Get writer with timeout
      const getWriter = async () => {
        try {
          return await targetPort.writable.getWriter()
        } catch (e) {
          throw new Error(`Failed to get writer: ${e.message}`)
        }
      }

      const writerPromise = getWriter()
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Get writer timeout')), 2000)
      )
      
      writer = await Promise.race([writerPromise, timeoutPromise])
      
      // Prepare command
      const payload = gcode.endsWith('\n') ? gcode : `${gcode}\n`
      const data = encoderRef.current.encode(payload)
      
      // Send with timeout
      const writePromise = writer.write(data)
      const writeTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Write timeout')), 2000)
      )
      
      await Promise.race([writePromise, writeTimeout])
      appendSerialLog(gcode, 'tx')
    } catch (e) {
      appendSerialLog(`Send error: ${e.message}`, 'err')
      throw new Error(`Failed to send command: ${e.message}`)
    } finally {
      if (writer) {
        try {
          writer.releaseLock()
        } catch (e) {
          appendSerialLog(`Warning: Failed to release writer: ${e.message}`, 'sys')
        }
      }
    }
  }, [appendSerialLog, port, status])

  const sendCommand = useCallback(async (gcode) => {
    try {
      await sendCommandInternal(gcode)
    } catch (e) {
      appendSerialLog(`Send error: ${e?.message || e}`, 'err')
    }
  }, [appendSerialLog, sendCommandInternal])

  const sendCommands = useCallback(async (gcodeArray, delayMs = 50) => {
    for (const line of gcodeArray) {
      // Skip empty/comment lines
      if (!line || /^\s*(;|#)/.test(line)) continue
      await sendCommand(line)
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs))
    }
  }, [sendCommand])

  // Handle cleanup and browser events
  useEffect(() => {
    const cleanup = async () => {
      // Skip cleanup if we're in the process of connecting
      if (isConnectingRef.current) {
        return;
      }

      try {
        // Cancel any pending operations
        if (readLoopAbortRef.current) {
          readLoopAbortRef.current.abort()
          readLoopAbortRef.current = null
        }

        // Clean up streams
        await teardownStreams()

        // Close port if it exists and we're not already disconnected
        if (port && status !== 'disconnected' && (port.readable || port.writable)) {
          await port.close()
          // Only update state if we're not unmounting and not already disconnected
          if (!isUnmountingRef.current && status !== 'disconnected') {
            // Update state in a single batch to avoid re-renders
            usePrintersStore.setState((state) => ({
              ...state,
              serialPort: null,
              serialStatus: 'disconnected'
            }))
            // Log after state update to avoid triggering re-renders
            if (!isUnmountingRef.current) {
              appendSerialLog('Port closed during cleanup', 'sys')
            }
          }
        }
      } catch (e) {
        // Only log if we're not unmounting
        if (!isUnmountingRef.current) {
          appendSerialLog(`Cleanup error: ${e.message}`, 'err')
        }
      }
    }

    const handleUnload = () => {
      cleanup()
    }

    const handleVisibilityChange = () => {
      if (document.hidden && port) {
        // Schedule cleanup if page is hidden
        cleanupTimeoutRef.current = setTimeout(() => {
          if (document.hidden) {
            cleanup()
          }
        }, 5000) // Give 5 seconds before cleanup
      } else if (!document.hidden && cleanupTimeoutRef.current) {
        // Cancel cleanup if page becomes visible again
        clearTimeout(cleanupTimeoutRef.current)
        cleanupTimeoutRef.current = null
      }
    }
    
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('unload', handleUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('unload', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current)
      }
      
      // Mark as unmounting to prevent state updates during cleanup
      isUnmountingRef.current = true
      cleanup()
      isUnmountingRef.current = false
    }
  }, [port, setSerialPort, setSerialStatus, appendSerialLog, teardownStreams])

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && status === 'connected') {
        appendSerialLog('Tab hidden - maintaining connection...', 'sys')
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [appendSerialLog, status])

  return {
    status,
    baudRate,
    setBaudRate: setSerialBaudRate,
    autoDetect,
    setAutoDetect: setSerialAutoDetect,
    port,
    log,
    error,
    connect,
    disconnect,
    sendCommand,
    sendCommands,
    clearLog,
    temperatures // Add temperature state to the return value
  }
}
