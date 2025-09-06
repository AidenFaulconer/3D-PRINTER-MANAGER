import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import PrinterConfig from '../components/PrinterConfig'

// Mock the stores to prevent infinite loops
const mockUsePrintersStore = {
  printers: [],
  activePrinterId: null,
  updatePrinter: () => {}
}

const mockUseSerialStore = {
  status: 'disconnected',
  bedMesh: null,
  fetchBedLevel: () => {},
  runBedLeveling: () => {},
  processCollectedBedMeshData: () => {}
}

// Mock the store hooks
jest.mock('../stores/printersStore', () => ({
  __esModule: true,
  default: () => mockUsePrintersStore
}))

jest.mock('../stores/serialStore', () => ({
  __esModule: true,
  default: () => mockUseSerialStore
}))

describe('PrinterConfig', () => {
  it('renders without infinite loops', () => {
    // This test will fail if there are infinite loops
    expect(() => {
      render(<PrinterConfig />)
    }).not.toThrow()
  })
})
