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
    },
    issues: [
      {
        id: 'issue_1704110400000_abc123',
        timestamp: '2024-01-01T12:00:00Z',
        category: 'mechanical',
        title: 'Under-extrusion on first layer',
        description: 'The printer is not extruding enough material during the first layer, causing poor bed adhesion and gaps between lines. This seems to happen mostly in the center of the bed.',
        status: 'open',
        resolvedTimestamp: null,
        followUpActions: [
          {
            id: 'action_1704110460000_def456',
            description: 'Check extruder tension and ensure proper grip on filament',
            completed: true,
            timestamp: '2024-01-01T12:01:00Z'
          },
          {
            id: 'action_1704110520000_ghi789',
            description: 'Calibrate E-Steps to ensure accurate extrusion amounts',
            completed: false,
            timestamp: '2024-01-01T12:02:00Z'
          }
        ]
      },
      {
        id: 'issue_1704196800000_jkl012',
        timestamp: '2024-01-02T12:00:00Z',
        category: 'electrical',
        title: 'Temperature fluctuations during printing',
        description: 'The hotend temperature keeps fluctuating ±3°C during prints, causing inconsistent extrusion and layer quality.',
        status: 'resolved',
        resolvedTimestamp: '2024-01-03T15:30:00Z',
        followUpActions: [
          {
            id: 'action_1704196860000_mno345',
            description: 'Run PID autotune for hotend and bed',
            completed: true,
            timestamp: '2024-01-02T12:01:00Z'
          },
          {
            id: 'action_1704196920000_pqr678',
            description: 'Check thermistor connections',
            completed: true,
            timestamp: '2024-01-02T12:02:00Z'
          }
        ]
      },
      {
        id: 'issue_1704283200000_stu901',
        timestamp: '2024-01-03T12:00:00Z',
        category: 'firmware',
        title: 'Stringing between towers',
        description: 'Getting significant stringing when printing multiple objects or tower tests. Retraction settings may need adjustment.',
        status: 'in-progress',
        resolvedTimestamp: null,
        followUpActions: [
          {
            id: 'action_1704283260000_vwx234',
            description: 'Increase retraction distance (try 0.5-1mm more)',
            completed: true,
            timestamp: '2024-01-03T12:01:00Z'
          },
          {
            id: 'action_1704283320000_yza567',
            description: 'Lower nozzle temperature by 5-10°C',
            completed: false,
            timestamp: '2024-01-03T12:02:00Z'
          }
        ]
      }
    ]
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
    },
    issues: []
  }
]
