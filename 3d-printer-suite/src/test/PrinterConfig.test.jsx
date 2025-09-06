import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import PrinterConfig from '../components/PrinterConfig'

// Mock the stores to prevent infinite loops
const mockUsePrintersStore = {
  printers: [{
    id: 'test-printer',
    name: 'Test Printer',
    model: 'Ender 3',
    firmware: 'Marlin 2.0.x',
    bedSize: { x: 220, y: 220, z: 250 },
    firmwareConfiguration: {
      maxHotendTemp: 300,
      maxBedTemp: 100,
      stepsPerMm: { x: 80, y: 80, z: 400, e: 93 }
    },
    calibrationSteps: {},
    lastUpdated: new Date().toISOString()
  }],
  activePrinterId: 'test-printer',
  updatePrinter: () => {}
}

const mockUseSerialStore = {
  status: 'disconnected',
  bedMesh: { data: [], gridSize: { x: 5, y: 5 }, min: 0, max: 0, range: 0 },
  fetchBedLevel: () => {},
  runBedLeveling: () => {},
  processCollectedBedMeshData: () => {}
}

// Mock the store hooks
vi.mock('../stores/printersStore', () => ({
  __esModule: true,
  default: () => mockUsePrintersStore
}))

vi.mock('../stores/serialStore', () => ({
  __esModule: true,
  default: () => mockUseSerialStore
}))

describe('PrinterConfig', () => {
  it('can be imported without errors', () => {
    // Simple test to ensure the component can be imported
    expect(PrinterConfig).toBeDefined()
    expect(typeof PrinterConfig).toBe('function')
  })
})
