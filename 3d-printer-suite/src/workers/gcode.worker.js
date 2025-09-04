/* eslint-env worker */
import * as Comlink from 'comlink'

class GcodeGeometryWorker {
  constructor() {
    this.currentPosition = { x: 0, y: 0, z: 0, e: 0 }
    this.lastPosition = { x: 0, y: 0, z: 0, e: 0 }
    this.layers = new Map()
    this.bounds = {
      min: { x: Infinity, y: Infinity, z: Infinity },
      max: { x: -Infinity, y: -Infinity, z: -Infinity }
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

  updateBounds(position) {
    this.bounds.min.x = Math.min(this.bounds.min.x, position.x)
    this.bounds.min.y = Math.min(this.bounds.min.y, position.y)
    this.bounds.min.z = Math.min(this.bounds.min.z, position.z)
    this.bounds.max.x = Math.max(this.bounds.max.x, position.x)
    this.bounds.max.y = Math.max(this.bounds.max.y, position.y)
    this.bounds.max.z = Math.max(this.bounds.max.z, position.z)
  }

  async convertToGeometry(gcode, options = {}) {
    const {
      sampleRate = 1,
      simplifyThreshold = 0.1,
      maxPoints = 1000000
    } = options

    const lines = gcode.split('\n')
    let pointCount = 0
    let currentLayer = 0
    let lineCount = 0

    // Reset state
    this.currentPosition = { x: 0, y: 0, z: 0, e: 0 }
    this.lastPosition = { x: 0, y: 0, z: 0, e: 0 }
    this.layers.clear()
    this.bounds = {
      min: { x: Infinity, y: Infinity, z: Infinity },
      max: { x: -Infinity, y: -Infinity, z: -Infinity }
    }

    for (const line of lines) {
      lineCount++
      if (lineCount % sampleRate !== 0) continue

      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith(';')) continue

      const parts = trimmedLine.split(' ')
      const command = parts[0]

      if (command === 'G0' || command === 'G1') {
        const coords = this.parseCoordinates(parts)
        
        if (coords.x !== undefined) this.currentPosition.x = coords.x
        if (coords.y !== undefined) this.currentPosition.y = coords.y
        if (coords.z !== undefined) {
          if (this.currentPosition.z !== coords.z) {
            currentLayer = coords.z
          }
          this.currentPosition.z = coords.z
        }
        if (coords.e !== undefined) this.currentPosition.e = coords.e

        const distance = this.calculateDistance(this.lastPosition, this.currentPosition)
        if (distance > simplifyThreshold) {
          const isExtrusion = this.currentPosition.e > this.lastPosition.e
          const moveType = isExtrusion ? 'extrude' : 'travel'

          if (!this.layers.has(currentLayer)) {
            this.layers.set(currentLayer, {
              points: [],
              lines: [],
              moveTypes: []
            })
          }
          
          const layerData = this.layers.get(currentLayer)
          
          layerData.points.push(
            this.lastPosition.x, this.lastPosition.y, this.lastPosition.z,
            this.currentPosition.x, this.currentPosition.y, this.currentPosition.z
          )
          
          const baseIndex = layerData.points.length / 3 - 2
          layerData.lines.push(baseIndex, baseIndex + 1)
          layerData.moveTypes.push(moveType)

          this.updateBounds(this.currentPosition)
          this.lastPosition = { ...this.currentPosition }
          pointCount++

          if (pointCount >= maxPoints) break
        }
      }
    }

    const sortedLayers = Array.from(this.layers.entries())
      .sort(([z1], [z2]) => z1 - z2)
      .map(([z, data]) => ({
        z,
        ...data
      }))

    return {
      layers: sortedLayers,
      bounds: this.bounds,
      stats: {
        totalLayers: sortedLayers.length,
        totalPoints: pointCount
      }
    }
  }
}

Comlink.expose(new GcodeGeometryWorker())
