// Constants for G-code analysis
const MOVE_COMMANDS = ['G0', 'G1']
const EXTRUDE_COMMANDS = ['G1']
const LAYER_CHANGE_INDICATORS = [';LAYER:', '; layer', ';Layer']
const SLICER_COMMENTS = {
  CURA: {
    LAYER_HEIGHT: ';Layer height: ',
    INFILL: ';Infill Density: ',
    PRINT_TIME: ';TIME:',
    FILAMENT_LENGTH: ';Filament used: ',
    MATERIAL_TYPE: ';MATERIAL:'
  },
  PRUSASLICER: {
    LAYER_HEIGHT: '; layer_height = ',
    INFILL: '; fill_density = ',
    PRINT_TIME: '; estimated printing time',
    FILAMENT_LENGTH: '; filament used [mm] = ',
    MATERIAL_TYPE: '; filament_type = '
  }
}

class GcodeParser {
  constructor(printerConfig = {}) {
    this.printerConfig = {
      maxBedTemp: 120,
      maxHotendTemp: 260,
      bedSize: { x: 220, y: 220, z: 250 },
      maxFeedrate: { x: 500, y: 500, z: 10, e: 25 },
      ...printerConfig
    }
  }

  async parse(content) {
    const lines = content.split('\n')
    const metadata = {
      layerHeight: null,
      infillDensity: null,
      estimatedPrintTime: null,
      filamentLength: null,
      materialType: null,
      layerCount: 0,
      dimensions: { x: 0, y: 0, z: 0 },
      temperatures: { bed: 0, hotend: 0 },
      warnings: [],
      stats: {
        moveCount: 0,
        extrudeCount: 0,
        retractionCount: 0,
        totalDistance: 0,
        totalExtrusion: 0
      }
    }

    let currentPosition = { x: 0, y: 0, z: 0, e: 0 }
    let maxPosition = { x: 0, y: 0, z: 0 }
    let minPosition = { x: Infinity, y: Infinity, z: Infinity }
    let lastExtrusion = 0
    let inComment = false

    // First pass: Extract metadata from slicer comments
    for (const line of lines) {
      // Check for slicer-specific metadata
      for (const slicer of Object.values(SLICER_COMMENTS)) {
        if (line.includes(slicer.LAYER_HEIGHT)) {
          metadata.layerHeight = this.extractNumericValue(line)
        }
        if (line.includes(slicer.INFILL)) {
          metadata.infillDensity = this.extractNumericValue(line)
        }
        if (line.includes(slicer.PRINT_TIME)) {
          metadata.estimatedPrintTime = this.extractPrintTime(line)
        }
        if (line.includes(slicer.FILAMENT_LENGTH)) {
          metadata.filamentLength = this.extractNumericValue(line)
        }
        if (line.includes(slicer.MATERIAL_TYPE)) {
          metadata.materialType = this.extractMaterialType(line)
        }
      }

      // Count layers
      if (LAYER_CHANGE_INDICATORS.some(indicator => line.includes(indicator))) {
        metadata.layerCount++
      }
    }

    // Second pass: Analyze G-code commands
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith(';')) continue

      // Parse command
      const parts = trimmedLine.split(' ')
      const command = parts[0]

      // Handle movement commands
      if (MOVE_COMMANDS.includes(command)) {
        metadata.stats.moveCount++
        
        // Parse coordinates
        const coords = this.parseCoordinates(parts)
        if (coords.x !== undefined) currentPosition.x = coords.x
        if (coords.y !== undefined) currentPosition.y = coords.y
        if (coords.z !== undefined) currentPosition.z = coords.z
        if (coords.e !== undefined) {
          if (coords.e > lastExtrusion) {
            metadata.stats.extrudeCount++
            metadata.stats.totalExtrusion += (coords.e - lastExtrusion)
          } else if (coords.e < lastExtrusion) {
            metadata.stats.retractionCount++
          }
          lastExtrusion = coords.e
        }

        // Update min/max positions
        maxPosition.x = Math.max(maxPosition.x, currentPosition.x)
        maxPosition.y = Math.max(maxPosition.y, currentPosition.y)
        maxPosition.z = Math.max(maxPosition.z, currentPosition.z)
        minPosition.x = Math.min(minPosition.x, currentPosition.x)
        minPosition.y = Math.min(minPosition.y, currentPosition.y)
        minPosition.z = Math.min(minPosition.z, currentPosition.z)

        // Calculate move distance
        if (coords.x !== undefined || coords.y !== undefined || coords.z !== undefined) {
          const distance = this.calculateDistance(currentPosition, coords)
          metadata.stats.totalDistance += distance
        }
      }

      // Check temperatures
      if (command === 'M104' || command === 'M109') { // Hotend temp
        const temp = this.extractTemperature(parts)
        metadata.temperatures.hotend = Math.max(metadata.temperatures.hotend, temp)
      }
      if (command === 'M140' || command === 'M190') { // Bed temp
        const temp = this.extractTemperature(parts)
        metadata.temperatures.bed = Math.max(metadata.temperatures.bed, temp)
      }
    }

    // Calculate dimensions
    metadata.dimensions = {
      x: Math.abs(maxPosition.x - minPosition.x),
      y: Math.abs(maxPosition.y - minPosition.y),
      z: Math.abs(maxPosition.z - minPosition.z)
    }

    // If no estimated time from slicer, calculate based on movements
    if (!metadata.estimatedPrintTime) {
      metadata.estimatedPrintTime = this.calculateEstimatedTime(metadata.stats)
    }

    // Generate warnings
    this.validateMetadata(metadata)

    return metadata
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

  calculateDistance(pos1, pos2) {
    let dx = (pos2.x !== undefined) ? pos2.x - pos1.x : 0
    let dy = (pos2.y !== undefined) ? pos2.y - pos1.y : 0
    let dz = (pos2.z !== undefined) ? pos2.z - pos1.z : 0
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  extractNumericValue(line) {
    const match = line.match(/[-+]?\d*\.?\d+/)
    return match ? parseFloat(match[0]) : null
  }

  extractPrintTime(line) {
    // Handle different slicer time formats
    if (line.includes('TIME:')) {
      // Cura format (seconds)
      return this.extractNumericValue(line)
    } else {
      // PrusaSlicer format (HH:MM:SS)
      const match = line.match(/(\d+h)?(\d+m)?(\d+s)?/)
      if (match) {
        let seconds = 0
        match.forEach(part => {
          if (part?.includes('h')) seconds += parseInt(part) * 3600
          if (part?.includes('m')) seconds += parseInt(part) * 60
          if (part?.includes('s')) seconds += parseInt(part)
        })
        return seconds
      }
    }
    return null
  }

  extractMaterialType(line) {
    // Extract material type from slicer comments
    const materials = ['PLA', 'PETG', 'ABS', 'TPU', 'NYLON']
    for (const material of materials) {
      if (line.toUpperCase().includes(material)) {
        return material
      }
    }
    return 'Unknown'
  }

  extractTemperature(parts) {
    for (const part of parts) {
      if (part.startsWith('S')) {
        return parseFloat(part.slice(1))
      }
    }
    return 0
  }

  calculateEstimatedTime(stats) {
    // Basic time estimation based on movements and extrusions
    const avgSpeed = 60 // mm/s
    const avgRetractTime = 1 // second
    const layerChangeTime = 2 // seconds

    const moveTime = stats.totalDistance / avgSpeed
    const retractTime = stats.retractionCount * avgRetractTime
    const layerTime = metadata.layerCount * layerChangeTime

    return Math.ceil(moveTime + retractTime + layerTime)
  }

  validateMetadata(metadata) {
    // Check bed size
    if (metadata.dimensions.x > this.printerConfig.bedSize.x ||
        metadata.dimensions.y > this.printerConfig.bedSize.y ||
        metadata.dimensions.z > this.printerConfig.bedSize.z) {
      metadata.warnings.push('Model exceeds printer build volume')
    }

    // Check temperatures
    if (metadata.temperatures.hotend > this.printerConfig.maxHotendTemp) {
      metadata.warnings.push('Hotend temperature exceeds printer maximum')
    }
    if (metadata.temperatures.bed > this.printerConfig.maxBedTemp) {
      metadata.warnings.push('Bed temperature exceeds printer maximum')
    }

    // Check layer height
    if (metadata.layerHeight > 0.32) { // Common max layer height for 0.4mm nozzle
      metadata.warnings.push('Layer height may be too large for standard nozzle')
    }

    // Check for potential issues
    if (metadata.stats.retractionCount > metadata.stats.moveCount * 0.2) {
      metadata.warnings.push('High number of retractions - may cause filament grinding')
    }

    return metadata.warnings
  }
}

export default GcodeParser
