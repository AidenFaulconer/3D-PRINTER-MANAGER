// Sample printer data for testing and development
export const samplePrinters = [
  {
    name: 'Ender 3 Pro',
    model: 'Ender 3 Pro',
    firmware: 'Marlin 2.1.2',
    bedSize: { x: 235, y: 235, z: 250 },
    calibrationSteps: {
      pidAutotune: { completed: false, lastUpdated: null },
      extruderEsteps: { completed: false, lastUpdated: null },
      retractionTuning: { completed: false, lastUpdated: null },
      firstLayer: { completed: false, lastUpdated: null },
      flowRate: { completed: false, lastUpdated: null },
      temperatureTower: { completed: false, lastUpdated: null },
      firmwareConfig: { completed: false, lastUpdated: null }
    },
    firmwareConfiguration: {
      maxTemp: 250,
      maxBedTemp: 100,
      stepsPerMm: { x: 80, y: 80, z: 400, e: 93 }
    }
  },
  {
    name: 'Prusa i3 MK3S+',
    model: 'Prusa i3 MK3S+',
    firmware: 'Prusa Firmware 3.12.1',
    bedSize: { x: 250, y: 210, z: 200 },
    calibrationSteps: {
      pidAutotune: { completed: true, lastUpdated: '2024-01-15T10:30:00Z' },
      extruderEsteps: { completed: true, lastUpdated: '2024-01-15T10:35:00Z' },
      retractionTuning: { completed: false, lastUpdated: null },
      firstLayer: { completed: true, lastUpdated: '2024-01-15T10:40:00Z' },
      flowRate: { completed: false, lastUpdated: null },
      temperatureTower: { completed: false, lastUpdated: null },
      firmwareConfig: { completed: false, lastUpdated: null }
    },
    firmwareConfiguration: {
      maxTemp: 300,
      maxBedTemp: 120,
      stepsPerMm: { x: 100, y: 100, z: 400, e: 280 }
    }
  }
]
