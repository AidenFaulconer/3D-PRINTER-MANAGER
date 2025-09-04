class GcodeValidator {
  constructor(printerConfig = {}) {
    this.printerConfig = {
      maxBedTemp: 120,
      maxHotendTemp: 260,
      bedSize: { x: 220, y: 220, z: 250 },
      maxFeedrate: { x: 500, y: 500, z: 10, e: 25 },
      maxAcceleration: { x: 3000, y: 3000, z: 100, e: 1000 },
      minTemp: 0,
      maxTemp: 260,
      ...printerConfig
    }
  }

  validate(content) {
    const lines = content.split('\n')
    const issues = []
    let currentPosition = { x: 0, y: 0, z: 0, e: 0 }
    let maxPosition = { x: 0, y: 0, z: 0 }
    let hasStartGcode = false
    let hasEndGcode = false
    let hasBedLeveling = false
    let hasTemperatureCommands = false
    let currentTemp = { bed: 0, hotend: 0 }
    let lineNumber = 0
    let lastExtruderMove = 0
    let retractionCount = 0
    let retractionDistance = 0
    let maxRetractionDistance = 0
    let hasAbsolutePositioning = false
    let hasRelativeExtrusion = false

    // Common start G-code markers
    const startGcodeMarkers = [
      'start gcode',
      'start of gcode',
      'M104', // Set hotend temp
      'M109', // Wait for hotend temp
      'M140', // Set bed temp
      'M190', // Wait for bed temp
      'G28',  // Home
      'M82',  // Absolute extrusion
      'M83'   // Relative extrusion
    ]

    // Common end G-code markers
    const endGcodeMarkers = [
      'end gcode',
      'end of gcode',
      'M104 S0', // Turn off hotend
      'M140 S0', // Turn off bed
      'G91',     // Relative positioning
      'G1 Z',    // Raise Z
      'M84'      // Disable motors
    ]

    for (const line of lines) {
      lineNumber++
      const trimmedLine = line.trim().toUpperCase()
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith(';')) {
        // Check comments for start/end G-code markers
        if (trimmedLine.startsWith(';')) {
          if (startGcodeMarkers.some(marker => 
            trimmedLine.toLowerCase().includes(marker.toLowerCase())
          )) {
            hasStartGcode = true
          }
          if (endGcodeMarkers.some(marker => 
            trimmedLine.toLowerCase().includes(marker.toLowerCase())
          )) {
            hasEndGcode = true
          }
        }
        continue
      }

      const parts = trimmedLine.split(' ')
      const command = parts[0]

      // Check positioning mode
      if (command === 'G90') hasAbsolutePositioning = true
      if (command === 'G91') hasAbsolutePositioning = false
      if (command === 'M82') hasRelativeExtrusion = false
      if (command === 'M83') hasRelativeExtrusion = true

      // Check bed leveling
      if (command === 'G29' || command === 'M420') {
        hasBedLeveling = true
      }

      // Check temperature commands
      if (command === 'M104' || command === 'M109' || 
          command === 'M140' || command === 'M190') {
        hasTemperatureCommands = true
        
        // Extract temperature value
        const tempValue = parts.find(p => p.startsWith('S'))?.slice(1)
        if (tempValue) {
          const temp = parseFloat(tempValue)
          
          // Update current temperature tracking
          if (command === 'M104' || command === 'M109') {
            currentTemp.hotend = temp
            
            // Validate hotend temperature
            if (temp > this.printerConfig.maxTemp) {
              issues.push({
                type: 'error',
                line: lineNumber,
                message: `Hotend temperature ${temp}°C exceeds maximum ${this.printerConfig.maxTemp}°C`,
                command: line
              })
            }
          } else {
            currentTemp.bed = temp
            
            // Validate bed temperature
            if (temp > this.printerConfig.maxBedTemp) {
              issues.push({
                type: 'error',
                line: lineNumber,
                message: `Bed temperature ${temp}°C exceeds maximum ${this.printerConfig.maxBedTemp}°C`,
                command: line
              })
            }
          }
        }
      }

      // Check movement commands
      if (command === 'G0' || command === 'G1') {
        const coords = this.parseCoordinates(parts)
        
        // Update position tracking
        if (hasAbsolutePositioning) {
          if (coords.x !== undefined) currentPosition.x = coords.x
          if (coords.y !== undefined) currentPosition.y = coords.y
          if (coords.z !== undefined) currentPosition.z = coords.z
        } else {
          if (coords.x !== undefined) currentPosition.x += coords.x
          if (coords.y !== undefined) currentPosition.y += coords.y
          if (coords.z !== undefined) currentPosition.z += coords.z
        }

        // Track maximum positions
        maxPosition.x = Math.max(maxPosition.x, Math.abs(currentPosition.x))
        maxPosition.y = Math.max(maxPosition.y, Math.abs(currentPosition.y))
        maxPosition.z = Math.max(maxPosition.z, Math.abs(currentPosition.z))

        // Check bed size limits
        if (maxPosition.x > this.printerConfig.bedSize.x ||
            maxPosition.y > this.printerConfig.bedSize.y ||
            maxPosition.z > this.printerConfig.bedSize.z) {
          issues.push({
            type: 'error',
            line: lineNumber,
            message: 'Model exceeds printer build volume',
            command: line
          })
        }

        // Check feedrate
        const feedrate = parts.find(p => p.startsWith('F'))?.slice(1)
        if (feedrate) {
          const f = parseFloat(feedrate)
          if (f > this.printerConfig.maxFeedrate.x) {
            issues.push({
              type: 'warning',
              line: lineNumber,
              message: `Feedrate ${f} exceeds maximum ${this.printerConfig.maxFeedrate.x}`,
              command: line
            })
          }
        }

        // Track extrusion
        if (coords.e !== undefined) {
          if (hasRelativeExtrusion) {
            if (coords.e < 0) {
              // Retraction
              retractionCount++
              retractionDistance = Math.abs(coords.e)
              maxRetractionDistance = Math.max(maxRetractionDistance, retractionDistance)
            }
            lastExtruderMove = coords.e
          } else {
            if (coords.e < lastExtruderMove) {
              // Retraction in absolute mode
              retractionCount++
              retractionDistance = Math.abs(coords.e - lastExtruderMove)
              maxRetractionDistance = Math.max(maxRetractionDistance, retractionDistance)
            }
            lastExtruderMove = coords.e
          }
        }
      }
    }

    // Post-processing checks
    if (!hasStartGcode) {
      issues.push({
        type: 'error',
        line: 1,
        message: 'Missing start G-code',
        command: ''
      })
    }

    if (!hasEndGcode) {
      issues.push({
        type: 'error',
        line: lines.length,
        message: 'Missing end G-code',
        command: ''
      })
    }

    if (!hasBedLeveling) {
      issues.push({
        type: 'warning',
        line: 1,
        message: 'No bed leveling command found',
        command: ''
      })
    }

    if (!hasTemperatureCommands) {
      issues.push({
        type: 'error',
        line: 1,
        message: 'No temperature commands found',
        command: ''
      })
    }

    // Check retraction settings
    if (retractionCount > 0) {
      if (maxRetractionDistance > 5) {
        issues.push({
          type: 'warning',
          line: 1,
          message: `High retraction distance (${maxRetractionDistance.toFixed(2)}mm)`,
          command: ''
        })
      }
      
      const retractionFrequency = retractionCount / lines.length
      if (retractionFrequency > 0.1) {
        issues.push({
          type: 'warning',
          line: 1,
          message: 'High frequency of retractions may cause filament grinding',
          command: ''
        })
      }
    }

    return {
      isValid: issues.filter(i => i.type === 'error').length === 0,
      issues: issues.sort((a, b) => a.line - b.line)
    }
  }

  parseCoordinates(parts) {
    const coords = {}
    for (const part of parts) {
      const axis = part.charAt(0).toLowerCase()
      if ('xyzef'.includes(axis)) {
        coords[axis] = parseFloat(part.slice(1))
      }
    }
    return coords
  }
}

export default GcodeValidator
