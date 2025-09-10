import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import usePrintersStore from './printersStore'

const DEFAULT_BAUDS = [115200, 250000, 57600, 38400, 9600] // Prioritize 115200 for Ender 3

const useSerialStore = create(
  devtools(
    subscribeWithSelector((set, get) => {
      // Refs for managing port resources
      let readerRef = null
      let readLoopAbortRef = null
      let textDecoderRef = null
      let encoderRef = new TextEncoder()
      let cleanupTimeoutRef = null
      let isConnectingRef = false
      let tempMonitorRef = null
      let currentExecutionAbortController = null

      const appendSerialLog = (message, type = 'sys') => {
        const timestamp = new Date().toLocaleTimeString()
        const now = Date.now()
        
        set((state) => {
          const newLogs = [...state.serialLogs, { timestamp, message, type, timestampMs: now }]
          
          // Log rotation: keep max 1000 entries and remove logs older than 1 hour
          const maxLogs = 1000
          const maxAge = 60 * 60 * 1000 // 1 hour in milliseconds
          
          let filteredLogs = newLogs
          
          // Remove old logs first
          if (newLogs.length > maxLogs / 2) {
            filteredLogs = newLogs.filter(log => {
              const logAge = now - (log.timestampMs || 0)
              return logAge < maxAge
            })
          }
          
          // Then limit by count if still too many
          if (filteredLogs.length > maxLogs) {
            filteredLogs = filteredLogs.slice(-maxLogs)
          }
          
          return {
            serialLogs: filteredLogs
          }
        }, false, 'appendSerialLog')
      }

      // M503 Parser Function
      const parseM503Output = (outputText) => {
        const settings = {
          units: { linear: 'mm', temperature: 'C' },
          filament: { diameter: 1.75, type: 'PLA' },
          stepsPerUnit: { x: 80, y: 80, z: 400, e: 93 },
          feedrates: { x: 500, y: 500, z: 5, e: 25 },
          acceleration: { max: 1000, print: 1000, retract: 1000, travel: 1000, jerk: { x: 0, y: 0, z: 0, e: 0 } },
          homeOffset: { x: 0, y: 0, z: 0 },
          bedLeveling: { enabled: false, mesh: [], fadeHeight: 10 },
          materialHeating: { pla: { hotend: 200, bed: 60 }, abs: { hotend: 240, bed: 100 }, petg: { hotend: 230, bed: 80 } },
          pid: { hotend: { p: 21.73, i: 1.54, d: 73.76 }, bed: { p: 301.25, i: 24.20, d: 73.76 } },
          powerLossRecovery: true,
          zProbeOffset: { x: 0, y: 0, z: 0 },
          linearAdvance: 0,
          filamentLoadUnload: { loadLength: 0, unloadLength: 0 },
          lastUpdated: new Date().toISOString()
        }

        const lines = outputText.split('\n').map(line => line.trim()).filter(line => line.length > 0)
        
        for (const line of lines) {
          try {
            // M92 - Steps per unit
            const m92Match = line.match(/M92\s+X(\d+(?:\.\d+)?)\s+Y(\d+(?:\.\d+)?)\s+Z(\d+(?:\.\d+)?)\s+E(\d+(?:\.\d+)?)/i)
            if (m92Match) {
              settings.stepsPerUnit = {
                x: parseFloat(m92Match[1]),
                y: parseFloat(m92Match[2]),
                z: parseFloat(m92Match[3]),
                e: parseFloat(m92Match[4])
              }
              continue
            }

            // M203 - Feedrates
            const m203Match = line.match(/M203\s+X(\d+(?:\.\d+)?)\s+Y(\d+(?:\.\d+)?)\s+Z(\d+(?:\.\d+)?)\s+E(\d+(?:\.\d+)?)/i)
            if (m203Match) {
              settings.feedrates = {
                x: parseFloat(m203Match[1]),
                y: parseFloat(m203Match[2]),
                z: parseFloat(m203Match[3]),
                e: parseFloat(m203Match[4])
              }
              continue
            }

            // M201 - Acceleration
            const m201Match = line.match(/M201\s+X(\d+(?:\.\d+)?)\s+Y(\d+(?:\.\d+)?)\s+Z(\d+(?:\.\d+)?)\s+E(\d+(?:\.\d+)?)/i)
            if (m201Match) {
              settings.acceleration.max = Math.max(
                parseFloat(m201Match[1]),
                parseFloat(m201Match[2]),
                parseFloat(m201Match[3]),
                parseFloat(m201Match[4])
              )
              continue
            }

            // M204 - Print/Retract/Travel acceleration
            const m204Match = line.match(/M204\s+P(\d+(?:\.\d+)?)\s+R(\d+(?:\.\d+)?)\s+T(\d+(?:\.\d+)?)/i)
            if (m204Match) {
              settings.acceleration.print = parseFloat(m204Match[1])
              settings.acceleration.retract = parseFloat(m204Match[2])
              settings.acceleration.travel = parseFloat(m204Match[3])
              continue
            }

            // M205 - Jerk settings
            const m205Match = line.match(/M205\s+X(\d+(?:\.\d+)?)\s+Y(\d+(?:\.\d+)?)\s+Z(\d+(?:\.\d+)?)\s+E(\d+(?:\.\d+)?)/i)
            if (m205Match) {
              settings.acceleration.jerk = {
                x: parseFloat(m205Match[1]),
                y: parseFloat(m205Match[2]),
                z: parseFloat(m205Match[3]),
                e: parseFloat(m205Match[4])
              }
              continue
            }

            // M206 - Home offset
            const m206Match = line.match(/M206\s+X(-?\d+(?:\.\d+)?)\s+Y(-?\d+(?:\.\d+)?)\s+Z(-?\d+(?:\.\d+)?)/i)
            if (m206Match) {
              settings.homeOffset = {
                x: parseFloat(m206Match[1]),
                y: parseFloat(m206Match[2]),
                z: parseFloat(m206Match[3])
              }
              continue
            }

            // M420 - Bed leveling
            const m420Match = line.match(/M420\s+S(\d+)\s+Z(\d+(?:\.\d+)?)/i)
            if (m420Match) {
              settings.bedLeveling.enabled = parseInt(m420Match[1]) === 1
              settings.bedLeveling.fadeHeight = parseFloat(m420Match[2])
              continue
            }

            // G29 W - Bed mesh data
            const g29wMatch = line.match(/G29\s+W\s+(\d+)\s+(\d+)\s+(-?\d+(?:\.\d+)?)/i)
            if (g29wMatch) {
              if (!settings.bedLeveling.mesh) settings.bedLeveling.mesh = []
              settings.bedLeveling.mesh.push({
                i: parseInt(g29wMatch[1]),
                j: parseInt(g29wMatch[2]),
                z: parseFloat(g29wMatch[3])
              })
              continue
            }

            // M145 - Material heating
            const m145Match = line.match(/M145\s+S(\d+)\s+B(\d+)\s+H(\d+)\s+F(\d+)/i)
            if (m145Match) {
              const material = parseInt(m145Match[1]) === 0 ? 'pla' : parseInt(m145Match[1]) === 1 ? 'abs' : 'petg'
              settings.materialHeating[material] = {
                hotend: parseInt(m145Match[2]),
                bed: parseInt(m145Match[3])
              }
              continue
            }

            // M301 - PID Hotend
            const m301Match = line.match(/M301\s+P(\d+(?:\.\d+)?)\s+I(\d+(?:\.\d+)?)\s+D(\d+(?:\.\d+)?)/i)
            if (m301Match) {
              settings.pid.hotend = {
                p: parseFloat(m301Match[1]),
                i: parseFloat(m301Match[2]),
                d: parseFloat(m301Match[3])
              }
              continue
            }

            // M304 - PID Bed
            const m304Match = line.match(/M304\s+P(\d+(?:\.\d+)?)\s+I(\d+(?:\.\d+)?)\s+D(\d+(?:\.\d+)?)/i)
            if (m304Match) {
              settings.pid.bed = {
                p: parseFloat(m304Match[1]),
                i: parseFloat(m304Match[2]),
                d: parseFloat(m304Match[3])
              }
              continue
            }

            // M413 - Power loss recovery
            const m413Match = line.match(/M413\s+S(\d+)/i)
            if (m413Match) {
              settings.powerLossRecovery = parseInt(m413Match[1]) === 1
              continue
            }

            // M851 - Z probe offset
            const m851Match = line.match(/M851\s+X(-?\d+(?:\.\d+)?)\s+Y(-?\d+(?:\.\d+)?)\s+Z(-?\d+(?:\.\d+)?)/i)
            if (m851Match) {
              settings.zProbeOffset = {
                x: parseFloat(m851Match[1]),
                y: parseFloat(m851Match[2]),
                z: parseFloat(m851Match[3])
              }
              continue
            }

            // M900 - Linear advance
            const m900Match = line.match(/M900\s+K(\d+(?:\.\d+)?)/i)
            if (m900Match) {
              settings.linearAdvance = parseFloat(m900Match[1])
              continue
            }

            // M603 - Filament load/unload
            const m603Match = line.match(/M603\s+T(\d+(?:\.\d+)?)\s+L(\d+(?:\.\d+)?)\s+U(\d+(?:\.\d+)?)/i)
            if (m603Match) {
              settings.filamentLoadUnload = {
                loadLength: parseFloat(m603Match[2]),
                unloadLength: parseFloat(m603Match[3])
              }
              continue
            }

          } catch (error) {
            console.warn('Error parsing M503 line:', line, error)
          }
        }

        return settings
      }

      const parseBedMeshData = (message) => {
        try {
          // Enhanced logging for M503 responses - capture ALL responses
          if (message.includes('echo:') || message.includes('Bed') || message.includes('Mesh') || message.includes('[') || message.includes('X:') || message.includes('Y:') || message.includes('Z:') || message.includes('eeprom:') || message.includes('ok') || message.includes('M503')) {
            console.log('M503 Response:', message)
          }
          
          // Log ALL responses that might contain bed leveling data
          if (message.trim() && !message.includes('ok') && !message.includes('echo:busy')) {
            console.log('Potential bed mesh data:', message)
          }
          
          // Look for bed leveling grid data
          if (message.includes('Bed Leveling Grid:') || message.includes('Bilinear Leveling Grid:') || message.includes('Mesh Bed Leveling') || message.includes('Bilinear Leveling')) {
            // Extract grid size
            const sizeMatch = message.match(/Size (\d+)x(\d+)/)
            if (sizeMatch) {
              const gridSize = { x: parseInt(sizeMatch[1]), y: parseInt(sizeMatch[2]) }
              return { type: 'grid_size', gridSize }
            }
          }

          // Look for M420 response (bed leveling status)
          if (message.includes('Bed Leveling:') || message.includes('Bilinear Leveling:') || message.includes('Mesh Bed Leveling:')) {
            return { type: 'bed_leveling_status', message }
          }

          // Look for G29 W mesh data format: "G29 W I0 J0 Z-0.07600"
          const g29wMatch = message.match(/G29\s+W\s+I(\d+)\s+J(\d+)\s+Z(-?\d+(?:\.\d+)?)/i)
          if (g29wMatch) {
            const i = parseInt(g29wMatch[1])
            const j = parseInt(g29wMatch[2])
            const z = parseFloat(g29wMatch[3])
            return { type: 'mesh_point', i, j, z }
          }

          // Look for mesh data in various formats
          // Format: "echo: 0.000 0.000 0.000 0.000 0.000"
          if (message.includes('echo:') && message.includes('0.000')) {
            const values = message
              .replace('echo:', '')
              .trim()
              .split(/\s+/)
              .map(Number)
              .filter(n => !isNaN(n))
            
            if (values.length > 0) {
              return { type: 'mesh_row', values }
            }
          }

          // Look for G29 completion messages
          if (message.includes('Bed leveling done') || message.includes('G29 finished') || message.includes('Bilinear Leveling Grid:')) {
            return { type: 'leveling_complete' }
          }

          // Look for "no bed leveling data" messages
          if (message.includes('No bed leveling data') || message.includes('Bed leveling not active') || message.includes('Bed leveling OFF')) {
            return { type: 'no_bed_data' }
          }

          // Look for eeprom responses
          if (message.includes('eeprom:')) {
            return { type: 'eeprom_response', message }
          }

          // Look for any line that contains numbers (potential mesh data)
          if (message.trim().match(/^[-+]?\d*\.?\d+(\s+[-+]?\d*\.?\d+)*$/)) {
            const values = message.trim().split(/\s+/).map(Number).filter(n => !isNaN(n))
            if (values.length >= 3) {
              return { type: 'mesh_row', values }
            }
          }

          // Look for any line that starts with numbers or contains multiple decimal numbers
          if (message.trim().match(/^\s*[-+]?\d*\.?\d+/) && message.includes('.')) {
            const values = message.trim().split(/\s+/).map(Number).filter(n => !isNaN(n))
            if (values.length >= 3) {
              return { type: 'mesh_row', values }
            }
          }

          // Look for mesh point data in format [x.xx, y.yy, z.zz]
          if (message.trim().startsWith('[') && message.includes(',')) {
            const points = message
              .trim()
              .replace(/[\[\]]/g, '')
              .split(',')
              .map(p => parseFloat(p.trim()))
              .filter(p => !isNaN(p))
            
            if (points.length >= 3) {
              return { type: 'mesh_point', x: points[0], y: points[1], z: points[2] }
            }
          }

          // Look for mesh row data (most common format)
          if (message.trim().startsWith('[') && !message.includes(',')) {
            const values = message
              .trim()
              .replace(/[\[\]]/g, '')
              .split(/\s+/)
              .filter(Boolean)
              .map(Number)
              .filter(n => !isNaN(n))
            
            if (values.length > 0) {
              return { type: 'mesh_row', values }
            }
          }

          // Look for mesh data in format: " 0.000  0.000  0.000  0.000  0.000"
          if (message.trim().match(/^\s*[-+]?\d*\.?\d+\s+[-+]?\d*\.?\d+\s+[-+]?\d*\.?\d+/)) {
            const values = message
              .trim()
              .split(/\s+/)
              .map(Number)
              .filter(n => !isNaN(n))
            
            if (values.length >= 3) {
              return { type: 'mesh_row', values }
            }
          }

          // Look for individual mesh values
          if (message.includes('Bed X:') && message.includes('Y:') && message.includes('Z:')) {
            const xMatch = message.match(/X:\s*([-\d.]+)/)
            const yMatch = message.match(/Y:\s*([-\d.]+)/)
            const zMatch = message.match(/Z:\s*([-\d.]+)/)
            
            if (xMatch && yMatch && zMatch) {
              return { 
                type: 'mesh_point', 
                x: parseFloat(xMatch[1]), 
                y: parseFloat(yMatch[1]), 
                z: parseFloat(zMatch[1]) 
              }
            }
          }

          return null
        } catch (e) {
          console.warn('Error parsing bed mesh data:', e)
          return null
        }
      }

      const updateBedMesh = (meshData) => {
        if (!meshData || !meshData.data.length) return

        const values = meshData.data.flat()
        const min = Math.min(...values)
        const max = Math.max(...values)
        const range = max - min

        set((state) => ({
          bedMesh: {
            data: meshData.data,
            gridSize: meshData.gridSize,
            min,
            max,
            range,
            timestamp: Date.now(),
            rawData: state.bedMesh.rawData
          }
        }), false, 'updateBedMesh')
      }

      const processBedMeshData = () => {
        const state = get()
        const rawData = state.bedMesh.rawData || []
        
        if (rawData.length === 0) return

        let gridSize = { x: 0, y: 0 }
        const meshRows = []
        const meshPoints = []
        let hasLevelingComplete = false
        let hasNoBedData = false

        console.log('Processing bed mesh data:', rawData)

        // Process raw data
        for (const item of rawData) {
          if (item.type === 'grid_size') {
            gridSize = item.gridSize
            console.log('Found grid size:', gridSize)
          } else if (item.type === 'mesh_row') {
            meshRows.push(item.values)
            console.log('Found mesh row:', item.values)
          } else if (item.type === 'mesh_point') {
            meshPoints.push({ i: item.i, j: item.j, z: item.z })
            console.log('Found mesh point:', { i: item.i, j: item.j, z: item.z })
          } else if (item.type === 'leveling_complete') {
            hasLevelingComplete = true
            console.log('Found leveling complete signal')
          } else if (item.type === 'no_bed_data') {
            hasNoBedData = true
            console.log('Found no bed data signal')
          } else if (item.type === 'bed_leveling_status') {
            console.log('Found bed leveling status:', item.message)
          } else if (item.type === 'eeprom_response') {
            console.log('Found eeprom response:', item.message)
          }
        }

        // Handle "no bed data" case
        if (hasNoBedData) {
          appendSerialLog('No bed leveling data found on printer. Run G29 to create bed leveling mesh.', 'sys')
          // Clear raw data
          set((state) => ({
            bedMesh: {
              ...state.bedMesh,
              rawData: []
            }
          }), false, 'clearBedMeshRawData')
          return
        }

        // If we have leveling complete signal or enough mesh data, process it
        if (hasLevelingComplete || (gridSize.x > 0 && gridSize.y > 0 && meshRows.length > 0) || meshRows.length >= 3 || meshPoints.length > 0) {
          if (meshPoints.length > 0) {
            // Process G29 W mesh points
            // If we don't have grid size, try to infer it from mesh points
            if (gridSize.x === 0 || gridSize.y === 0) {
              const maxI = Math.max(...meshPoints.map(p => p.i))
              const maxJ = Math.max(...meshPoints.map(p => p.j))
              gridSize = { x: maxI + 1, y: maxJ + 1 }
            }
            
            console.log('Processing G29 W mesh points with grid size:', gridSize, 'and', meshPoints.length, 'points')
            updateBedMesh({ data: meshPoints, gridSize })
            appendSerialLog(`Bed leveling data loaded: ${gridSize.x}x${gridSize.y} grid with ${meshPoints.length} points`, 'sys')
          } else if (meshRows.length > 0) {
            // Process traditional mesh rows
            // If we don't have grid size, try to infer it from mesh data
            if (gridSize.x === 0 || gridSize.y === 0) {
              // Common grid sizes: 3x3, 4x4, 5x5, 7x7
              const totalPoints = meshRows.length
              if (totalPoints === 9) gridSize = { x: 3, y: 3 }
              else if (totalPoints === 16) gridSize = { x: 4, y: 4 }
              else if (totalPoints === 25) gridSize = { x: 5, y: 5 }
              else if (totalPoints === 49) gridSize = { x: 7, y: 7 }
              else {
                // Try to infer from first row length
                const firstRowLength = meshRows[0]?.length || 0
                if (firstRowLength > 0) {
                  gridSize = { x: firstRowLength, y: Math.ceil(totalPoints / firstRowLength) }
                }
              }
            }
            
            console.log('Processing mesh with grid size:', gridSize, 'and', meshRows.length, 'rows')
            updateBedMesh({ data: meshRows, gridSize })
            appendSerialLog(`Bed leveling data loaded: ${gridSize.x}x${gridSize.y} grid with ${meshRows.length} points`, 'sys')
          }
          
          // Clear raw data after processing
          set((state) => ({
            bedMesh: {
              ...state.bedMesh,
              rawData: []
            }
          }), false, 'clearBedMeshRawData')
          
          if (hasLevelingComplete) {
            appendSerialLog('Bed leveling procedure completed successfully', 'sys')
          }
        } else if (rawData.length > 0) {
          console.log('Insufficient bed mesh data to process:', { gridSize, meshRows: meshRows.length, meshPoints: meshPoints.length, hasLevelingComplete })
        }
      }

      const fetchBedLevel = async () => {
        const state = get()
        if (state.status === 'connected' && state.port?.writable) {
          try {
            appendSerialLog('Processing collected bed level data...', 'sys')
            // Don't send M503 again - just process existing data
            processBedMeshData()
          } catch (e) {
            appendSerialLog(`Failed to process bed level data: ${e.message}`, 'err')
          }
        }
      }

      const runBedLeveling = async () => {
        const state = get()
        if (state.status === 'connected' && state.port?.writable) {
          try {
            appendSerialLog('Starting automatic bed leveling procedure...', 'sys')
            appendSerialLog('This will take several minutes. Do not interrupt the process.', 'sys')
            
            // Clear any existing bed mesh data
            set((state) => ({
              bedMesh: {
                data: [],
                gridSize: { x: 0, y: 0 },
                min: 0,
                max: 0,
                range: 0,
                timestamp: null,
                rawData: []
              }
            }), false, 'clearBedMesh')
            
            // Run G29 (automatic bed leveling)
            await sendCommand('G29')
            
            // Wait longer for G29 to complete, then process the data
            setTimeout(() => {
              processBedMeshData()
            }, 30000) // 30 seconds for G29 to complete
            
          } catch (e) {
            appendSerialLog(`Failed to run bed leveling: ${e.message}`, 'err')
          }
        }
      }

      const cleanupOldLogs = () => {
        const now = Date.now()
        const maxAge = 60 * 60 * 1000 // 1 hour in milliseconds
        
        set((state) => ({
          serialLogs: state.serialLogs.filter(log => {
            const logAge = now - (log.timestampMs || 0)
            return logAge < maxAge
          })
        }), false, 'cleanupOldLogs')
      }

      const closeReader = async () => {
        try {
          if (readLoopAbortRef) {
            readLoopAbortRef.abort()
            readLoopAbortRef = null
          }

          if (readerRef) {
            try {
              await readerRef.cancel()
            } catch (e) {
              if (!e.message?.includes('locked')) {
                throw e
              }
            }
            try {
              await readerRef.releaseLock()
            } catch (_) {}
          }
        } catch (e) {
          appendSerialLog(`Warning: Error closing reader: ${e.message}`, 'sys')
        } finally {
          readerRef = null
        }
      }

      const teardownStreams = async () => {
        try { await closeReader() } catch (_) {}
        try { if (textDecoderRef) textDecoderRef.readable?.cancel() } catch (_) {}
        textDecoderRef = null
      }

      const parseTemperatures = (line) => {
        const temps = {}
        
        // Try multiple temperature formats
        // Format 1: T:25.0 /0.0 B:25.0 /0.0
        let tMatch = line.match(/T:(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/)
        if (tMatch) {
          temps.hotend = {
            current: parseFloat(tMatch[1]),
            target: parseFloat(tMatch[2])
          }
        }
        
        // Format 2: T:25.0/0.0 (no spaces)
        if (!temps.hotend) {
          tMatch = line.match(/T:(\d+\.?\d*)\/(\d+\.?\d*)/)
          if (tMatch) {
            temps.hotend = {
              current: parseFloat(tMatch[1]),
              target: parseFloat(tMatch[2])
            }
          }
        }
        
        // Format 3: ok T:25.0 /0.0 B:25.0 /0.0
        if (!temps.hotend) {
          tMatch = line.match(/ok\s+T:(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/)
          if (tMatch) {
            temps.hotend = {
              current: parseFloat(tMatch[1]),
              target: parseFloat(tMatch[2])
            }
          }
        }
        
        // Bed temperature parsing
        let bMatch = line.match(/B:(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/)
        if (bMatch) {
          temps.bed = {
            current: parseFloat(bMatch[1]),
            target: parseFloat(bMatch[2])
          }
        }
        
        // Format 2 for bed: B:25.0/0.0 (no spaces)
        if (!temps.bed) {
          bMatch = line.match(/B:(\d+\.?\d*)\/(\d+\.?\d*)/)
          if (bMatch) {
            temps.bed = {
              current: parseFloat(bMatch[1]),
              target: parseFloat(bMatch[2])
            }
          }
        }
        
        return temps
      }

      const startReadLoop = async (activePort) => {
        try {
          if (readLoopAbortRef) {
            readLoopAbortRef.abort()
            readLoopAbortRef = null
          }
          
          readLoopAbortRef = new AbortController()
          textDecoderRef = new TextDecoderStream()
          
          try {
            // Set up the read pipeline
            const readableStreamClosed = activePort.readable.pipeTo(textDecoderRef.writable)
            const reader = textDecoderRef.readable.getReader()
            readerRef = reader

            let carry = ''
            let lastLineTime = Date.now()
            
            while (true) {
              if (readLoopAbortRef?.signal.aborted) break

              try {
                const { value, done } = await reader.read()
                if (done) {
                  appendSerialLog('Read stream closed', 'sys')
                  break
                }

                if (value) {
                  carry += value
                  let idx
                  while ((idx = carry.indexOf('\n')) >= 0) {
                    const line = carry.slice(0, idx).replace(/\r$/, '')
                    carry = carry.slice(idx + 1)
                    
                    if (line.trim().length > 0) {
                      // Update last line time
                      lastLineTime = Date.now()
                      
                      // Log the received line
                      appendSerialLog(line, 'rx')
                      
                      // Handle temperature updates - check for any temperature format
                      if (line.includes('T:') || line.includes('B:')) {
                        const temps = parseTemperatures(line)
                        if (temps.hotend || temps.bed) {
                          set((state) => ({
                            temperatures: {
                              ...state.temperatures,
                              ...temps,
                              timestamp: Date.now()
                            }
                          }), false, 'updateTemperatures')
                        } else {
                        }
                      }
                      
                      // Handle bed mesh data
                      const bedMeshData = parseBedMeshData(line)
                      if (bedMeshData) {
                        // Store bed mesh data for later processing
                        set((state) => ({
                          bedMesh: {
                            ...state.bedMesh,
                            rawData: [...(state.bedMesh.rawData || []), bedMeshData]
                          }
                        }), false, 'addBedMeshRawData')
                      }

                      // Handle M503 responses - collect all lines for parsing
                      if (line.includes('M92') || line.includes('M203') || line.includes('M201') || 
                          line.includes('M204') || line.includes('M205') || line.includes('M206') ||
                          line.includes('M420') || line.includes('G29 W') || line.includes('M145') ||
                          line.includes('M301') || line.includes('M304') || line.includes('M413') ||
                          line.includes('M851') || line.includes('M900') || line.includes('M603')) {
                        
                        // Store M503 response lines for parsing
                        set((state) => ({
                          m503Response: [...(state.m503Response || []), line]
                        }), false, 'addM503Response')
                      }
                      
                      // Handle common responses
                      if (line.toLowerCase().includes('error')) {
                        appendSerialLog(`Printer error: ${line}`, 'err')
                      } else if (line.toLowerCase() === 'ok') {
                        // Command acknowledged
                        continue
                      }
                    }
                  }
                }
                
                // Check for communication timeout
                if (Date.now() - lastLineTime > 10000) {
                  appendSerialLog('Warning: No response from printer for 10 seconds', 'sys')
                  lastLineTime = Date.now() // Reset timer
                }
              } catch (readError) {
                if (readError?.name !== 'AbortError') {
                  appendSerialLog(`Read error: ${readError.message}`, 'err')
                  throw readError
                }
                break
              }
            }

            await readableStreamClosed.catch((e) => {
              if (e?.name !== 'AbortError') {
                appendSerialLog(`Stream closed with error: ${e.message}`, 'err')
              }
            })
          } catch (e) {
            if (e?.name !== 'AbortError') {
              appendSerialLog(`Read loop error: ${e?.message || e}`, 'err')
              throw e
            }
          }
        } catch (e) {
          appendSerialLog(`Failed to start read loop: ${e?.message || e}`, 'err')
          throw e
        }
      }

      const tryOpenWithBaud = async (portToOpen, candidateBaud) => {
        if (!portToOpen) {
          throw new Error('No port provided')
        }

        appendSerialLog(`Opening port @ ${candidateBaud}…`, 'sys')
        
        try {
          // Make sure any existing connections are fully cleaned up
          try {
            if (readLoopAbortRef) {
              readLoopAbortRef.abort()
              readLoopAbortRef = null
            }

            await teardownStreams()

            if (portToOpen.readable || portToOpen.writable) {
              await portToOpen.close()
            }

            await new Promise(resolve => setTimeout(resolve, 1000))
          } catch (closeError) {
            appendSerialLog(`Warning: Error while closing port: ${closeError.message}`, 'sys')
            await new Promise(resolve => setTimeout(resolve, 1000))
          }

          const portConfig = {
            baudRate: candidateBaud,
            dataBits: 8,
            stopBits: 1,
            parity: "none",
            bufferSize: 255,
            flowControl: "none"
          }

          appendSerialLog(`Configuring port with baud ${candidateBaud}`, 'sys')
          
          await portToOpen.open(portConfig)
          appendSerialLog('Port opened successfully', 'sys')
          set({ 
            port: portToOpen,
            status: 'connected'
          }, false, 'setPort')
          
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Automatically fetch printer configuration and bed level data when connected (only once)
          setTimeout(async () => {
            const currentState = get()
            if (!currentState.m503SentOnConnection) {
              try {
                // Fetch all printer settings (M503) first
                await get().fetchAllPrinterSettings()
                
                // Mark as sent to prevent duplicate calls
                set({ m503SentOnConnection: true }, false, 'markM503Sent')
                
                // Then fetch bed level data
                await get().fetchBedLevel()
                
                appendSerialLog('Printer configuration and bed level data fetched automatically', 'sys')
              } catch (error) {
                appendSerialLog(`Error fetching printer data: ${error.message}`, 'err')
              }
              
              // If no data is found after 5 seconds, suggest running bed leveling
              setTimeout(() => {
                const state = get()
                if (state.bedMesh.data.length === 0) {
                  appendSerialLog('No existing bed leveling data found. Consider running G29 for automatic bed leveling.', 'sys')
                }
              }, 5000)
            } else {
              appendSerialLog('Printer configuration already fetched on connection', 'sys')
            }
          }, 1000)
          
          // Set up automatic log cleanup every 10 minutes
          const cleanupInterval = setInterval(() => {
            cleanupOldLogs()
          }, 10 * 60 * 1000) // 10 minutes
          
          // Store cleanup interval reference for later cleanup
          set((state) => ({
            ...state,
            logCleanupInterval: cleanupInterval
          }), false, 'setLogCleanupInterval')
          
          if (!portToOpen.readable || !portToOpen.writable) {
            throw new Error('Port closed unexpectedly after opening')
          }
        
          await startReadLoop(portToOpen)
          return true
        } catch (error) {
          appendSerialLog(`Failed to open port @ ${candidateBaud}: ${error.message}`, 'err')
          throw error
        }
      }

      const disconnect = async (force = false) => {
        const state = get()
        try {
          if (!force && state.status === 'disconnected') {
            return
          }

          if (state.status === 'connected' || state.status === 'connecting') {
            appendSerialLog('Disconnecting...', 'sys')
          }
          
          const currentPort = state.port
          
          set({ port: null, status: 'disconnected', m503SentOnConnection: false }, false, 'disconnect')
          
          try {
            // Temperature monitoring is handled by individual components

            if (readLoopAbortRef) {
              readLoopAbortRef.abort()
              readLoopAbortRef = null
            }
            
            // Clear log cleanup interval
            const state = get()
            if (state.logCleanupInterval) {
              clearInterval(state.logCleanupInterval)
              set({ logCleanupInterval: null }, false, 'clearLogCleanupInterval')
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
      }

      const connect = async (opts = {}) => {
        const state = get()
        try {
          set({ error: null }, false, 'connect/clearError')
          
          if (!('serial' in navigator)) {
            throw new Error('Web Serial API not supported in this browser')
          }

          if (state.status === 'connected') {
            return
          }
          if (state.status === 'connecting') {
            throw new Error('Connection already in progress')
          }

          isConnectingRef = true
          await disconnect(true)
          set({ port: null, status: 'connecting' }, false, 'connect/setConnecting')
          
          await new Promise(resolve => setTimeout(resolve, 500))

          try {
            const ports = await navigator.serial.getPorts()
            appendSerialLog(`Cleaning up ${ports.length} existing ports...`, 'sys')
            
            for (const p of ports) {
              try {
                const info = p.getInfo()
                appendSerialLog(`Closing port VID: 0x${info.usbVendorId?.toString(16) || 'none'}, ` +
                         `PID: 0x${info.usbProductId?.toString(16) || 'none'}`, 'sys')
                
                if (p.readable || p.writable) {
                  await p.close()
                }
              } catch (e) {
                appendSerialLog(`Warning: Error closing port: ${e.message}`, 'sys')
              }
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000))
          } catch (e) {
            appendSerialLog(`Warning: Error during port cleanup: ${e.message}`, 'sys')
          }

          try {
            let selectedPort
            try {
              const ports = await navigator.serial.getPorts()
              appendSerialLog(`Found ${ports.length} previously authorized ports`, 'sys')
              
              for (const port of ports) {
                const info = port.getInfo()
                appendSerialLog(`Port: VID: 0x${info.usbVendorId?.toString(16) || 'none'}, ` +
                         `PID: 0x${info.usbProductId?.toString(16) || 'none'}`, 'sys')
                
                if (info.usbVendorId === 0x1a86) {
                  appendSerialLog('Found previously authorized CH340 device', 'sys')
                  selectedPort = port
                  break
                }
              }
              
              if (!selectedPort) {
                appendSerialLog('Requesting port selection...', 'sys')
                selectedPort = await navigator.serial.requestPort({
                  filters: [
                    { usbVendorId: 0x1a86, usbProductId: 0x7523 }, // CH340
                    { usbVendorId: 0x1a86, usbProductId: 0x5523 }, // CH341
                    { usbVendorId: 0x1a86, usbProductId: 0x7522 }, // CH340K
                    { usbVendorId: 0x1a86, usbProductId: 0x5512 }, // CH341A
                    { usbVendorId: 0x1a86 }  // Any WCH product
                  ]
                })
                appendSerialLog('New CH340 device selected', 'sys')
              }
              appendSerialLog('CH340 USB-Serial adapter detected', 'sys')
            } catch (e) {
              appendSerialLog('No CH340 device found, trying any available port...', 'sys')
              selectedPort = await navigator.serial.requestPort({ filters: [] })
            }

            if (!selectedPort) {
              throw new Error('No port selected')
            }

            let opened = false
            let openedBaud = null

            const candidateBauds = opts.autoDetect ?? state.autoDetect ? DEFAULT_BAUDS : [opts.baudRate || state.baudRate]
            
            for (const b of candidateBauds) {
              try {
                await tryOpenWithBaud(selectedPort, b)
                opened = true
                openedBaud = b
                set({ baudRate: b }, false, 'connect/setBaud')
                break
              } catch (e) {
                appendSerialLog(`Failed @ ${b}: ${e?.message || e}`, 'err')
                try {
                  if (selectedPort.readable || selectedPort.writable) {
                    await selectedPort.close()
                  }
                } catch (_) {}
              }
            }

            if (!opened) {
              throw new Error('Unable to establish serial communication at common baud rates')
            }

            if (!selectedPort || !selectedPort.readable || !selectedPort.writable) {
              throw new Error('Port validation failed after opening')
            }

            // Status is already set to 'connected' in tryOpenWithBaud
            appendSerialLog(`Connected @ ${openedBaud}`, 'sys')

            // Temperature monitoring is now handled by individual components
            // No global polling to prevent app-wide re-renders

          } catch (e) {
            appendSerialLog(`Communication check failed: ${e.message}`, 'err')
            await disconnect(true)
            throw new Error(`Failed to verify communication: ${e.message}`)
          }
        } catch (e) {
          set({ status: 'disconnected' }, false, 'connect/error')
          let msg = e?.message || String(e)
          
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
          
          set({ error: msg }, false, 'connect/setError')
          appendSerialLog(`Connection error: ${msg}`, 'err')
          try { await state.port?.close?.() } catch (_) {}
          set({ port: null }, false, 'connect/clearPort')
        } finally {
          isConnectingRef = false
        }
      }

      let writerLockPromise = null;
      let writerLockResolve = null;

      const acquireWriterLock = async () => {
        if (writerLockPromise) {
          await writerLockPromise;
        }
        writerLockPromise = new Promise(resolve => {
          writerLockResolve = resolve;
        });
      };

      const releaseWriterLock = () => {
        if (writerLockResolve) {
          writerLockResolve();
          writerLockPromise = null;
          writerLockResolve = null;
        }
      };

      const sendCommand = async (gcode) => {
        const state = get()
        if (!state.port || !state.port.writable || state.status !== 'connected') {
          appendSerialLog(`Cannot send command - not connected. Status: ${state.status}`, 'err')
          return
        }

        if (!gcode || gcode.trim().length === 0) {
          return
        }

        await acquireWriterLock();
        let writer = null;

        const isConnectionError = (e) => {
          const msg = String(e && e.message ? e.message : e).toLowerCase()
          return /receiving end does not exist|disconnected|device has been lost|invalidstateerror|failed to write|port.*closed|not connected/.test(msg)
        }

        try {
          // Get writer
          // Avoid nested getWriter when stream is locked
          try {
            writer = state.port.writable.getWriter();
          } catch (e) {
            releaseWriterLock();
            appendSerialLog('Writer was locked, retrying shortly…', 'sys')
            await new Promise(r => setTimeout(r, 50))
            await acquireWriterLock();
            writer = state.port.writable.getWriter();
          }
          
          // Prepare and log command
          const command = gcode.trim().toUpperCase();
          appendSerialLog(command, 'tx');
          
          // Send command with proper line ending - ensure clean encoding
          const commandText = `${command}\r\n`;
          
          // Ensure encoder is properly initialized
          if (!encoderRef) {
            encoderRef = new TextEncoder();
          }
          
          const data = encoderRef.encode(commandText);
          console.log('Sending command:', command, 'Command text:', commandText, 'Encoded data:', data);
          
          // Verify the data is clean before sending
          const decoded = new TextDecoder().decode(data);
          if (decoded !== commandText) {
            console.error('Data corruption detected! Original:', commandText, 'Decoded:', decoded);
            throw new Error('Data corruption detected in command encoding');
          }
          
          await writer.write(data);
          
          // Wait for command processing, but if a program stream is active, shorten to keep throughput
          const st2 = get()
          const waitMs = st2.isStreamingProgram ? 5 : 50
          await new Promise(resolve => setTimeout(resolve, waitMs));
          
        } catch (e) {
          appendSerialLog(`Send error: ${e.message}`, 'err');
          if (isConnectionError(e)) {
            try {
              const st = get()
              if (st.isStreamingProgram) {
                set({ isStreamingProgram: false }, false, 'connectionLostStopStream')
                if (st.currentExecution) {
                  get().cancelExecution?.()
                }
              }
              set(({ temperatures }) => ({
                status: 'disconnected',
                port: null,
                error: 'Serial connection lost',
                temperatures
              }), false, 'connectionLost')
              appendSerialLog('Serial connection lost. Please reconnect the printer.', 'err')
            } catch {}
            throw new Error('Serial connection lost')
          }
          throw e;
        } finally {
          if (writer) {
            try {
              writer.releaseLock();
            } catch (e) {
              appendSerialLog(`Warning: Error releasing writer: ${e.message}`, 'err');
            }
          }
          releaseWriterLock();
        }
      }

      const sendCommands = async (gcodeArray, delayMs = 50) => {
        for (const line of gcodeArray) {
          if (!line || /^\s*(;|#)/.test(line)) continue
          await sendCommand(line)
          if (delayMs) await new Promise((r) => setTimeout(r, delayMs))
        }
      }

      // Send multiple commands with proper busy handling
      const sendCommandsWithWait = async (gcodeArray, options = {}) => {
        const { delayMs = 0, waitForReady = true } = options
        
        for (const line of gcodeArray) {
          if (!line || /^\s*(;|#)/.test(line)) continue
          await sendCommandWithWait(line, { waitForReady })
          if (delayMs) await new Promise((r) => setTimeout(r, delayMs))
        }
      }

      // Wait for printer to be ready (not busy) - wait indefinitely until ready
      const waitForPrinterReady = async (maxWaitMs = 900000) => { // 15 minutes max
        const startTime = Date.now()
        let lastLogTime = startTime
        
        while (true) {
          const state = get()
          if (state.status !== 'connected' || !state.port) {
            throw new Error('Not connected')
          }
          const recentLogs = state.serialLogs.slice(-10) // Check last 10 logs
          
          // Check if printer is busy
          const isBusy = recentLogs.some(log => 
            log.type === 'rx' && /busy: processing/i.test(String(log.message))
          )
          // Check if printer is explicitly waiting for user interaction
          const isWaitingForUser = recentLogs.some(log => 
            log.type === 'rx' && /(wait for user|paused for user|click to resume|waiting for user input)/i.test(String(log.message))
          )
          
          if (!isBusy && !isWaitingForUser) {
            return true // Printer is ready
          }
          
          // Check for maximum wait time (safety net)
          const now = Date.now()
          if (now - startTime > maxWaitMs) {
            appendSerialLog(`Printer busy for too long (${Math.round(maxWaitMs/1000)}s) - aborting execution`, 'err')
            throw new Error('Printer busy timeout - execution aborted')
          }
          
          // Log progress every 5 seconds to show we're waiting
          if (now - lastLogTime > 5000) {
            const waitTime = Math.round((now - startTime) / 1000)
            if (isWaitingForUser) {
              appendSerialLog(`Waiting for user to resume on printer... (${waitTime}s)`, 'info')
            } else {
              appendSerialLog(`Waiting for printer to be ready... (${waitTime}s)`, 'info')
            }
            lastLogTime = now
          }
          
          // Wait a bit before checking again
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      // Send command and wait for printer to be ready - NEVER skip commands
      const sendCommandWithWait = async (gcode, options = {}) => {
        const { waitForReady = true, maxRetries = 3, retryDelay = 1000, postSendDelayMs } = options
        
        if (!gcode || gcode.trim().length === 0) {
          return
        }

        const state = get()
        if (!state.port || !state.port.writable || state.status !== 'connected') {
          appendSerialLog(`Cannot send command - not connected. Status: ${state.status}`, 'err')
          return
        }

        // Wait for printer to be ready if requested - wait indefinitely
        if (waitForReady) {
          await waitForPrinterReady() // This will wait indefinitely until ready
        }

        // Send the command - this will only execute when printer is ready
        await sendCommand(gcode)
        
        // Optional tiny delay after send; default 0ms during streaming
        const stAfter = get()
        const delay = (typeof postSendDelayMs === 'number') ? postSendDelayMs : (stAfter.isStreamingProgram ? 0 : 20)
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }

      // Stream a full G-code program with proper busy handling
      const sendGcodeProgram = async (programText, options = {}) => {
        const {
          delayMs = 0,
          waitForReady = true,
          // Whether to wait for explicit 'ok' responses after each command
          waitForOk = true,
          // Max time to wait for an 'ok' before proceeding (ms)
          okTimeoutMs = 60000,
          onProgress,
          executionData = {} // { stepName, stepId, etc. }
        } = options

        const state = get()
        if (!state.port || !state.port.writable || state.status !== 'connected') {
          appendSerialLog(`Cannot start program - not connected. Status: ${state.status}`, 'err')
          throw new Error('Not connected')
        }

        const lines = String(programText)
          .split(/\r?\n/)
          .map(l => l.trim())
          .filter(l => l.length > 0 && !l.startsWith(';') && !l.startsWith('#'))

        let sent = 0

        // Create abort controller for this execution
        currentExecutionAbortController = new AbortController()

        // Start execution tracking
        if (executionData.stepName) {
          get().startExecution({
            ...executionData,
            totalCommands: lines.length
          })
        }

        const awaitOk = () => new Promise((resolve, reject) => {
          if (!waitForOk) {
            // If not waiting for OK, just wait a short time for command processing
            setTimeout(resolve, 50)
            return
          }
          let resolved = false
          const start = Date.now()
          const unsub = useSerialStore.subscribe(
            s => (s.serialLogs.length),
            () => {
              const stNow = get()
              if (stNow.status !== 'connected' || !stNow.port) {
                resolved = true
                unsub()
                return reject(new Error('Not connected'))
              }
              const recent = stNow.serialLogs.slice(-10)
              const hasOk = recent.some(l => (l.type === 'rx') && /^ok\b/i.test(String(l.message).trim()))
              const hasBusy = recent.some(l => (l.type === 'rx') && /busy: processing/i.test(String(l.message).trim()))
              const isWaitingForUser = recent.some(l => (l.type === 'rx') && /(wait for user|paused for user|click to resume|waiting for user input)/i.test(String(l.message).trim()))
              const hasErr = recent.some(l => (l.type === 'rx') && /error|unknown|invalid/i.test(l.message))
              
              // Debug logging
              if (Date.now() - start > 1000 && !resolved) { // Log after 1 second
                console.log('Awaiting OK - Recent logs:', recent.map(l => `${l.type}: ${l.message}`).slice(-3))
                console.log('hasOk:', hasOk, 'hasBusy:', hasBusy, 'isWaitingForUser:', isWaitingForUser, 'hasErr:', hasErr)
              }
              
              // Only resolve on explicit 'ok'. Busy or waiting-for-user must NOT advance the stream.
              if (hasOk && !resolved) {
                resolved = true
                unsub()
                resolve()
              } else if (hasErr && !resolved) {
                resolved = true
                unsub()
                reject(new Error('Printer error reported'))
              } else if (Date.now() - start > okTimeoutMs && !resolved) {
                // If timed out but printer indicates waiting for user, keep waiting
                if (isWaitingForUser || hasBusy) {
                  return
                }
                // Otherwise, be lenient if ok not echoed
                resolved = true
                unsub()
                resolve()
              }
            }
          )
        })

        set({ isStreamingProgram: true }, false, 'startProgramStream')
        try {
          for (let i = 0; i < lines.length; i++) {
            // Check if execution was aborted
            if (currentExecutionAbortController?.signal.aborted) {
              appendSerialLog('G-code execution aborted by user', 'warn')
              throw new Error('Execution aborted by user')
            }

            try {
              // Use sendCommandWithWait to respect printer busy state - this will wait indefinitely
              await sendCommandWithWait(lines[i], { waitForReady: waitForReady, postSendDelayMs: 0 })
              if (delayMs) await new Promise(r => setTimeout(r, delayMs))
              
              try { 
                await awaitOk() 
                console.log(`G-code line ${i + 1}/${lines.length} acknowledged: ${lines[i]}`)
              } catch (e) {
                console.warn(`G-code line ${i + 1}/${lines.length} timeout/error: ${lines[i]}`, e.message)
              }
            } catch (waitError) {
              // If waiting for printer ready failed (timeout), abort entire execution
              if (waitError.message.includes('Printer busy timeout')) {
                appendSerialLog(`G-code execution aborted - printer busy timeout at line ${i + 1}/${lines.length}`, 'err')
                throw waitError
              }
              throw waitError
            }
            
            sent = i + 1
            
            // Update global execution progress
            if (executionData.stepName) {
              get().updateExecutionProgress({ sent, total: lines.length })
            }
            
            if (typeof onProgress === 'function') onProgress(sent, lines.length)
          }
          const result = { sent, total: lines.length }
          
          // Complete execution tracking
          if (executionData.stepName) {
            get().completeExecution(result)
          }
          
          return result
        } catch (error) {
          // Cancel execution tracking on error
          if (executionData.stepName) {
            get().cancelExecution()
          }
          if (/serial connection lost|not connected/i.test(String(error.message))) {
            appendSerialLog('Program stopped: serial connection lost. Reconnect and retry.', 'err')
          } else {
            appendSerialLog(`Program error: ${error.message}`, 'err')
          }
          throw error
        } finally {
          set({ isStreamingProgram: false }, false, 'endProgramStream')
          currentExecutionAbortController = null
        }
      }

      // Enhanced bulk configuration sending with retry logic
      const sendBulkConfiguration = async (commands, options = {}) => {
        const {
          delayMs = 100,
          maxRetries = 3,
          retryDelayMs = 500,
          onProgress = null,
          onError = null
        } = options

        const results = []
        let successCount = 0
        let failureCount = 0

        for (let i = 0; i < commands.length; i++) {
          const command = commands[i]
          let retryCount = 0
          let success = false

          while (retryCount < maxRetries && !success) {
            try {
              appendSerialLog(`Sending command ${i + 1}/${commands.length}: ${command}`, 'sys')
              
              await sendCommand(command)
              
              // Wait for response and verify success
              await new Promise(resolve => setTimeout(resolve, delayMs))
              
              // Check for error responses in recent logs
              const recentLogs = get().serialLogs.slice(-5)
              const hasError = recentLogs.some(log => 
                log.message.toLowerCase().includes('error') || 
                log.message.toLowerCase().includes('invalid') ||
                log.message.toLowerCase().includes('unknown')
              )
              
              if (hasError) {
                throw new Error('Command failed - error response detected')
              }
              
              success = true
              successCount++
              results.push({ command, success: true, attempts: retryCount + 1 })
              
              if (onProgress) {
                onProgress(i + 1, commands.length, command, true)
              }
              
            } catch (error) {
              retryCount++
              appendSerialLog(`Command failed (attempt ${retryCount}/${maxRetries}): ${command} - ${error.message}`, 'err')
              
              if (retryCount < maxRetries) {
                appendSerialLog(`Retrying in ${retryDelayMs}ms...`, 'sys')
                await new Promise(resolve => setTimeout(resolve, retryDelayMs))
              } else {
                failureCount++
                results.push({ command, success: false, attempts: retryCount, error: error.message })
                
                if (onError) {
                  onError(command, error, i + 1, commands.length)
                }
              }
            }
          }
          
          // Delay between commands
          if (i < commands.length - 1) {
            await new Promise(resolve => setTimeout(resolve, delayMs))
          }
        }

        appendSerialLog(`Bulk configuration complete: ${successCount} successful, ${failureCount} failed`, 'sys')
        return { results, successCount, failureCount, total: commands.length }
      }

      // Enhanced response parsing for configuration commands
      const parseConfigurationResponse = (command, response) => {
        const responses = Array.isArray(response) ? response : [response]
        
        for (const resp of responses) {
          const message = resp.message || resp
          
          // Check for success indicators
          if (message.toLowerCase().includes('ok')) {
            return { success: true, message: 'Command acknowledged' }
          }
          
          // Check for error indicators
          if (message.toLowerCase().includes('error') || 
              message.toLowerCase().includes('invalid') ||
              message.toLowerCase().includes('unknown')) {
            return { success: false, error: message }
          }
          
          // Parse specific command responses
          if (command.startsWith('M92')) {
            const match = message.match(/echo:Steps per unit:\s*X:(\d+(?:\.\d+)?)\s*Y:(\d+(?:\.\d+)?)\s*Z:(\d+(?:\.\d+)?)\s*E:(\d+(?:\.\d+)?)/i)
            if (match) {
              return { 
                success: true, 
                data: {
                  x: parseFloat(match[1]),
                  y: parseFloat(match[2]),
                  z: parseFloat(match[3]),
                  e: parseFloat(match[4])
                }
              }
            }
          }
          
          if (command.startsWith('M203')) {
            const match = message.match(/echo:Maximum feedrates:\s*X:(\d+(?:\.\d+)?)\s*Y:(\d+(?:\.\d+)?)\s*Z:(\d+(?:\.\d+)?)\s*E:(\d+(?:\.\d+)?)/i)
            if (match) {
              return { 
                success: true, 
                data: {
                  x: parseFloat(match[1]),
                  y: parseFloat(match[2]),
                  z: parseFloat(match[3]),
                  e: parseFloat(match[4])
                }
              }
            }
          }
          
          if (command.startsWith('M301')) {
            const match = message.match(/echo:Hotend PID:\s*P:(\d+(?:\.\d+)?)\s*I:(\d+(?:\.\d+)?)\s*D:(\d+(?:\.\d+)?)/i)
            if (match) {
              return { 
                success: true, 
                data: {
                  p: parseFloat(match[1]),
                  i: parseFloat(match[2]),
                  d: parseFloat(match[3])
                }
              }
            }
          }
          
          if (command.startsWith('M304')) {
            const match = message.match(/echo:Bed PID:\s*P:(\d+(?:\.\d+)?)\s*I:(\d+(?:\.\d+)?)\s*D:(\d+(?:\.\d+)?)/i)
            if (match) {
              return { 
                success: true, 
                data: {
                  p: parseFloat(match[1]),
                  i: parseFloat(match[2]),
                  d: parseFloat(match[3])
                }
              }
            }
          }
        }
        
        return { success: true, message: 'Command sent' }
      }

      // Emergency stop functionality
      const emergencyStop = async () => {
        try {
          appendSerialLog('EMERGENCY STOP ACTIVATED', 'err')
          
          // Send emergency stop commands
          const emergencyCommands = ['M112', 'M410', 'M84']
          
          for (const cmd of emergencyCommands) {
            try {
              await sendCommand(cmd)
              await new Promise(resolve => setTimeout(resolve, 100))
            } catch (error) {
              appendSerialLog(`Emergency command ${cmd} failed: ${error.message}`, 'err')
            }
          }
          
          appendSerialLog('Emergency stop sequence completed', 'sys')
          return true
        } catch (error) {
          appendSerialLog(`Emergency stop failed: ${error.message}`, 'err')
          return false
        }
      }

      return {
        // State
        port: null,
        status: 'disconnected',
        baudRate: 115200,
        autoDetect: true,
        isConnecting: false,
        error: null,
        serialLogs: [],
        
        // Temperature state
        temperatures: {
          hotend: { current: 0, target: 0 },
          bed: { current: 0, target: 0 },
          timestamp: Date.now(),
          lastPoll: Date.now()
        },
        
        // Bed mesh state
        bedMesh: {
          data: [],
          gridSize: { x: 0, y: 0 },
          min: 0,
          max: 0,
          range: 0,
          timestamp: null,
          rawData: []
        },
        
        // M503 response state
        m503Response: [],
        m503SentOnConnection: false,
        
        // Writer state
        writerLock: null,
        writerPromise: null,
        
        // Log cleanup
        logCleanupInterval: null,
        isStreamingProgram: false,
        
        // Global execution tracking for calibration workflow
        activeExecution: null, // { id, type, stepName, progress: { sent, total }, startTime, status }
        executionHistory: [], // Array of completed executions

        // Actions
        setPort: (port) => set({ port }, false, 'setPort'),
        setStatus: (status) => set({ status }, false, 'setStatus'),
        setBaudRate: (baudRate) => set({ baudRate }, false, 'setBaudRate'),
        setAutoDetect: (autoDetect) => set({ autoDetect }, false, 'setAutoDetect'),
        setIsConnecting: (isConnecting) => set({ isConnecting }, false, 'setIsConnecting'),
        setError: (error) => set({ error }, false, 'setError'),
        appendSerialLog,
        updateTemperatures: (temps) => 
          set((state) => ({
            temperatures: {
              ...state.temperatures,
              ...temps,
              timestamp: Date.now()
            }
          }), false, 'updateTemperatures'),
        
        setWriterLock: (lock) => set({ writerLock: lock }, false, 'setWriterLock'),
        setWriterPromise: (promise) => set({ writerPromise: promise }, false, 'setWriterPromise'),
        clearLogs: () => set({ serialLogs: [] }, false, 'clearLogs'),
        reset: () => set({
          port: null,
          status: 'disconnected',
          baudRate: 115200,
          autoDetect: true,
          isConnecting: false,
          error: null,
          serialLogs: [],
          temperatures: {
            hotend: { current: 0, target: 0 },
            bed: { current: 0, target: 0 },
            timestamp: Date.now()
          },
          bedMesh: {
            data: [],
            gridSize: { x: 0, y: 0 },
            min: 0,
            max: 0,
            range: 0,
            timestamp: null,
            rawData: []
          },
          writerLock: null,
          writerPromise: null,
          logCleanupInterval: null
        }, false, 'reset'),
        connect,
        disconnect,
        sendCommand,
        sendCommands,
        sendCommandWithWait,
        sendCommandsWithWait,
        emergencyStop,
        waitForPrinterReady,
        sendGcodeProgram,
        fetchBedLevel,
        runBedLeveling,
        processBedMeshData,
        updateBedMesh,
        cleanupOldLogs,
        // Manual trigger to process any collected bed mesh data
        processCollectedBedMeshData: () => {
          const state = get()
          if (state.bedMesh.rawData && state.bedMesh.rawData.length > 0) {
            appendSerialLog('Manually processing collected bed mesh data...', 'sys')
            processBedMeshData()
          } else {
            appendSerialLog('No bed mesh data collected to process. Try fetching bed level data first.', 'sys')
          }
        },
        
        // Process M503 response and update printer settings
        processM503Response: () => {
          const state = get()
          const responseLines = state.m503Response || []
          
          if (responseLines.length === 0) {
            appendSerialLog('No M503 response data to process', 'sys')
            return null
          }
          
          try {
            const outputText = responseLines.join('\n')
            const parsedSettings = parseM503Output(outputText)
            
            appendSerialLog(`Successfully parsed M503 response with ${responseLines.length} lines`, 'sys')
            appendSerialLog(`Parsed settings: ${Object.keys(parsedSettings).join(', ')}`, 'sys')
            
            // Clear the response data after processing
            set({ m503Response: [] }, false, 'clearM503Response')
            
            return parsedSettings
          } catch (error) {
            appendSerialLog(`Error processing M503 response: ${error.message}`, 'err')
            return null
          }
        },
        
        // Clear M503 response data
        clearM503Response: () => set({ m503Response: [] }, false, 'clearM503Response'),
        
        // Enhanced M503 command that captures all responses
        fetchAllPrinterSettings: async () => {
          const state = get()
          if (state.status === 'connected' && state.port?.writable) {
            try {
              appendSerialLog('Fetching all printer settings (M503)...', 'sys')
              appendSerialLog('This will capture all current settings including bed leveling data', 'sys')
              
              // Clear any existing raw data
              set((state) => ({
                bedMesh: {
                  ...state.bedMesh,
                  rawData: []
                },
                m503Response: []
              }), false, 'clearRawData')
              
              // Add a small delay to ensure port is stable
              await new Promise(resolve => setTimeout(resolve, 100));
              await sendCommand('M503')
              
              // Wait longer to capture all responses
              setTimeout(() => {
                const currentState = get()
                const rawData = currentState.bedMesh.rawData || []
                const m503Lines = currentState.m503Response || []
                
                appendSerialLog(`Captured ${rawData.length} bed mesh items and ${m503Lines.length} M503 lines`, 'sys')
                
                // Process M503 settings
                if (m503Lines.length > 0) {
                  const parsedSettings = parseM503Output(m503Lines.join('\n'))
                  appendSerialLog(`Parsed M503 settings: ${Object.keys(parsedSettings).join(', ')}`, 'sys')
                  
                  // Store settings in printer store for persistence
                  try {
                    const printersStateObj = usePrintersStore.getState()
                    let activePrinterId = printersStateObj.activePrinterId
                    
                    console.log('SerialStore: Storing M503 settings')
                    console.log('SerialStore: activePrinterId:', activePrinterId)
                    console.log('SerialStore: parsedSettings:', parsedSettings)
                    console.log('SerialStore: printersState:', printersStateObj)
                    
                    // If no active printer, create a default one
                    if (!activePrinterId) {
                      const defaultPrinter = {
                        name: 'Connected Printer',
                        model: 'Unknown',
                        firmware: 'Unknown',
                        bedSize: { x: 220, y: 220, z: 250 },
                        firmwareConfiguration: {},
                        calibrationSteps: [],
                        lastUpdated: new Date().toISOString()
                      }
                      usePrintersStore.getState().addPrinter(defaultPrinter)
                      activePrinterId = usePrintersStore.getState().activePrinterId
                      console.log('SerialStore: Created default printer with ID:', activePrinterId)
                      appendSerialLog(`Created default printer with ID: ${activePrinterId}`, 'sys')
                    }
                    
                    if (activePrinterId && parsedSettings) {
                      usePrintersStore.getState().updatePrinterSettings(activePrinterId, parsedSettings)
                      appendSerialLog(`Printer settings stored for printer ${activePrinterId}`, 'sys')
                    } else {
                      console.log('SerialStore: Cannot store settings - activePrinterId:', activePrinterId, 'parsedSettings:', parsedSettings)
                      appendSerialLog(`Cannot store settings - activePrinterId: ${activePrinterId}, parsedSettings: ${!!parsedSettings}`, 'err')
                    }
                  } catch (error) {
                    console.log('SerialStore: Error storing printer settings:', error)
                    appendSerialLog(`Error storing printer settings: ${error.message}`, 'err')
                  }
                  
                  // Clear M503 response after processing
                  set({ m503Response: [] }, false, 'clearM503Response')
                }
                
                // Try to process bed mesh data
                processBedMeshData()
              }, 5000) // Wait 5 seconds for all responses
              
            } catch (e) {
              appendSerialLog(`Failed to fetch printer settings: ${e.message}`, 'err')
            }
          }
        },
        
        // Enhanced configuration functions are available as store methods
        sendBulkConfiguration,
        parseConfigurationResponse,
        
        // Execution tracking actions
        startExecution: (executionData) => set({ 
          activeExecution: {
            id: Date.now().toString(),
            type: 'calibration',
            stepName: executionData.stepName,
            progress: { sent: 0, total: executionData.totalCommands },
            startTime: Date.now(),
            status: 'running',
            ...executionData
          }
        }, false, 'startExecution'),
        
        updateExecutionProgress: (progress) => set((state) => ({
          activeExecution: state.activeExecution ? {
            ...state.activeExecution,
            progress: { ...state.activeExecution.progress, ...progress }
          } : null
        }), false, 'updateExecutionProgress'),
        
        completeExecution: (result) => set((state) => {
          const completedExecution = state.activeExecution ? {
            ...state.activeExecution,
            status: 'completed',
            endTime: Date.now(),
            result
          } : null
          
          return {
            activeExecution: null,
            executionHistory: completedExecution ? 
              [...state.executionHistory, completedExecution].slice(-10) : // Keep last 10 executions
              state.executionHistory
          }
        }, false, 'completeExecution'),
        
        abortExecution: async () => {
          console.log('Aborting execution...')
          
          // Abort the current execution controller
          if (currentExecutionAbortController) {
            currentExecutionAbortController.abort()
            currentExecutionAbortController = null
          }
          
          // Stop any ongoing G-code streaming
          set({ isStreamingProgram: false }, false, 'stopProgramStream')
          
          // Send emergency stop to printer
          try {
            await get().emergencyStop()
            appendSerialLog('Execution aborted by user', 'warn')
          } catch (error) {
            console.error('Failed to send emergency stop:', error)
            appendSerialLog(`Failed to send emergency stop: ${error.message}`, 'err')
          }
          
          // Cancel execution tracking
          const state = get()
          const cancelledExecution = state.activeExecution ? {
            ...state.activeExecution,
            status: 'cancelled',
            endTime: Date.now()
          } : null
          
          set({
            activeExecution: null,
            executionHistory: cancelledExecution ? 
              [...state.executionHistory, cancelledExecution].slice(-10) :
              state.executionHistory
          }, false, 'abortExecution')
          
          console.log('Execution aborted successfully')
        },
        
        cancelExecution: () => set((state) => {
          const cancelledExecution = state.activeExecution ? {
            ...state.activeExecution,
            status: 'cancelled',
            endTime: Date.now()
          } : null
          
          return {
            activeExecution: null,
            executionHistory: cancelledExecution ? 
              [...state.executionHistory, cancelledExecution].slice(-10) :
              state.executionHistory
          }
        }, false, 'cancelExecution'),
        
        clearExecutionHistory: () => set({ executionHistory: [] }, false, 'clearExecutionHistory')
      }
    })), 
    {
      name: 'SerialStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )


export default useSerialStore