class GcodeLodManager {
  constructor(geometryData) {
    this.originalData = geometryData
    this.lodLevels = new Map()
    this.generateLodLevels()
  }

  generateLodLevels() {
    // Generate LOD levels with different sampling rates
    const lodConfigs = [
      { level: 0, sampleRate: 1 },    // Full detail
      { level: 1, sampleRate: 2 },    // Half detail
      { level: 2, sampleRate: 4 },    // Quarter detail
      { level: 3, sampleRate: 8 },    // Eighth detail
      { level: 4, sampleRate: 16 }    // Sixteenth detail
    ]

    for (const config of lodConfigs) {
      this.lodLevels.set(config.level, this.generateLodLevel(config.sampleRate))
    }
  }

  generateLodLevel(sampleRate) {
    const lodData = {
      layers: this.originalData.layers.map(layer => {
        const sampledPoints = []
        const sampledLines = []
        const sampledMoveTypes = []

        // Sample points at the specified rate
        for (let i = 0; i < layer.points.length; i += 6 * sampleRate) {
          // Add start point
          sampledPoints.push(
            layer.points[i],
            layer.points[i + 1],
            layer.points[i + 2]
          )

          // Add end point
          if (i + 3 < layer.points.length) {
            sampledPoints.push(
              layer.points[i + 3],
              layer.points[i + 4],
              layer.points[i + 5]
            )
          }

          // Add line indices
          const baseIndex = sampledPoints.length / 3 - 2
          if (baseIndex >= 0) {
            sampledLines.push(baseIndex, baseIndex + 1)
          }

          // Add move type
          sampledMoveTypes.push(layer.moveTypes[Math.floor(i / 6)])
        }

        return {
          ...layer,
          points: sampledPoints,
          lines: sampledLines,
          moveTypes: sampledMoveTypes
        }
      }),
      bounds: this.originalData.bounds,
      stats: {
        ...this.originalData.stats,
        totalPoints: Math.ceil(this.originalData.stats.totalPoints / sampleRate)
      }
    }

    return lodData
  }

  getLodLevel(distance, viewportSize) {
    // Calculate appropriate LOD level based on distance and viewport size
    const pointDensity = this.originalData.stats.totalPoints / viewportSize
    const apparentSize = viewportSize / distance

    if (apparentSize > 2) return 0        // Very close - full detail
    if (apparentSize > 1) return 1        // Close - half detail
    if (apparentSize > 0.5) return 2      // Medium - quarter detail
    if (apparentSize > 0.25) return 3     // Far - eighth detail
    return 4                              // Very far - lowest detail
  }

  getGeometryForDistance(distance, viewportSize) {
    const level = this.getLodLevel(distance, viewportSize)
    return this.lodLevels.get(level) || this.originalData
  }
}

export default GcodeLodManager