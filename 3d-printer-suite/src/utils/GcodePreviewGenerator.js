class GcodePreviewGenerator {
  constructor(content, options = {}) {
    this.content = content
    this.options = {
      sampleRate: 10, // Sample every Nth line for performance
      maxPoints: 10000, // Maximum points to render
      simplifyThreshold: 0.1, // Minimum distance between points
      ...options
    }
  }

  generatePreview() {
    const lines = this.content.split('\n')
    const points = []
    const layers = new Map() // Map of Z heights to points
    let currentPosition = { x: 0, y: 0, z: 0, e: 0 }
    let lastPosition = { ...currentPosition }
    let currentLayer = 0
    let pointCount = 0
    let lineCount = 0

    for (const line of lines) {
      lineCount++
      // Sample lines for performance
      if (lineCount % this.options.sampleRate !== 0) continue

      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith(';')) continue

      const parts = trimmedLine.split(' ')
      const command = parts[0]

      // Only process movement commands
      if (command === 'G0' || command === 'G1') {
        const coords = this.parseCoordinates(parts)
        
        // Update current position
        if (coords.x !== undefined) currentPosition.x = coords.x
        if (coords.y !== undefined) currentPosition.y = coords.y
        if (coords.z !== undefined) {
          // New layer detected
          if (currentPosition.z !== coords.z) {
            currentLayer = coords.z
          }
          currentPosition.z = coords.z
        }
        if (coords.e !== undefined) currentPosition.e = coords.e

        // Only add point if it's a significant move
        const distance = this.calculateDistance(lastPosition, currentPosition)
        if (distance > this.options.simplifyThreshold) {
          // Check if we're extruding
          const isExtrusion = currentPosition.e > lastPosition.e

          // Store point with layer information
          if (!layers.has(currentLayer)) {
            layers.set(currentLayer, [])
          }
          
          layers.get(currentLayer).push({
            x: currentPosition.x,
            y: currentPosition.y,
            z: currentPosition.z,
            extrusion: isExtrusion
          })

          lastPosition = { ...currentPosition }
          pointCount++

          // Check if we've exceeded max points
          if (pointCount >= this.options.maxPoints) break
        }
      }
    }

    // Convert layers map to array and sort by Z height
    const sortedLayers = Array.from(layers.entries())
      .sort(([z1], [z2]) => z1 - z2)
      .map(([z, points]) => ({
        z,
        points
      }))

    return {
      layers: sortedLayers,
      bounds: this.calculateBounds(sortedLayers),
      stats: {
        totalLayers: sortedLayers.length,
        totalPoints: pointCount
      }
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

  calculateDistance(pos1, pos2) {
    const dx = pos2.x - pos1.x
    const dy = pos2.y - pos1.y
    const dz = pos2.z - pos1.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  calculateBounds(layers) {
    let minX = Infinity, minY = Infinity, minZ = Infinity
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

    layers.forEach(layer => {
      layer.points.forEach(point => {
        minX = Math.min(minX, point.x)
        minY = Math.min(minY, point.y)
        minZ = Math.min(minZ, point.z)
        maxX = Math.max(maxX, point.x)
        maxY = Math.max(maxY, point.y)
        maxZ = Math.max(maxZ, point.z)
      })
    })

    return {
      min: { x: minX, y: minY, z: minZ },
      max: { x: maxX, y: maxY, z: maxZ },
      size: {
        x: maxX - minX,
        y: maxY - minY,
        z: maxZ - minZ
      }
    }
  }
}

export default GcodePreviewGenerator
