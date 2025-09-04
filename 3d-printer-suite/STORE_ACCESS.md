# Global Store Access for Browser Extensions

This document explains how browser extensions (like Zukeeper) can access the 3D Printer Suite application stores.

## Global Store Access

All Zustand stores are exposed globally on the `window` object for easy access by browser extensions.

### Main Access Point

```javascript
// Access the main store registry
window.__3D_PRINTER_SUITE_STORES__
```

### Available Stores

The following stores are available:

1. **printers** - Printer configuration and management
2. **serial** - Serial communication and connection state
3. **gcodeFiles** - G-code file management and print queue
4. **calibration** - Calibration workflows and results
5. **printHistory** - Print history and statistics
6. **advancedQueue** - Advanced queue management with scheduling

### Individual Store Access

Each store is also available individually:

```javascript
// Individual store access
window.__PRINTERS_STORE__
window.__SERIAL_STORE__
window.__GCODEFILES_STORE__
window.__CALIBRATION_STORE__
window.__PRINTHISTORY_STORE__
window.__ADVANCEDQUEUE_STORE__
```

## Usage Examples

### Get All Store States

```javascript
// Get all store states at once
const allStates = window.__3D_PRINTER_SUITE_STORES__.getAllStates()
console.log(allStates)
```

### Get Specific Store State

```javascript
// Get printers store state
const printersState = window.__3D_PRINTER_SUITE_STORES__.getStoreState('printers')
console.log(printersState)
```

### Subscribe to Store Changes

```javascript
// Subscribe to printers store changes
const unsubscribe = window.__3D_PRINTER_SUITE_STORES__.subscribeToStore('printers', (state) => {
  console.log('Printers state changed:', state)
})

// Unsubscribe when done
unsubscribe()
```

### Get Store Information

```javascript
// Get metadata about all stores
const storeInfo = window.__3D_PRINTER_SUITE_STORES__.getStoreInfo()
console.log(storeInfo)
```

### Direct Store Access

```javascript
// Access store directly for more advanced operations
const printersStore = window.__3D_PRINTER_SUITE_STORES__.stores.printers

// Get current state
const currentState = printersStore.getState()

// Subscribe to changes
const unsubscribe = printersStore.subscribe((state) => {
  console.log('State changed:', state)
})

// Call store actions (be careful with this!)
// printersStore.getState().addPrinter({ name: 'New Printer' })
```

## Store Structure Examples

### Printers Store State

```javascript
{
  printers: [
    {
      id: "uuid",
      name: "Ender 3",
      model: "Creality Ender 3",
      firmware: "Marlin",
      bedSize: { x: 220, y: 220, z: 250 },
      calibrationSteps: {},
      firmwareConfiguration: {},
      slicerProfiles: {
        curaPath: "",
        profiles: [],
        materials: []
      },
      macros: [],
      calibrationHistory: [],
      issues: []
    }
  ],
  activePrinterId: "uuid"
}
```

### Serial Store State

```javascript
{
  port: null,
  status: "disconnected", // "disconnected", "connecting", "connected"
  baudRate: 115200,
  autoDetect: true,
  isConnecting: false,
  error: null,
  serialLogs: [],
  temperatures: {
    hotend: { current: 0, target: 0 },
    bed: { current: 0, target: 0 },
    timestamp: Date.now(),
    lastPoll: Date.now()
  },
  bedMesh: {
    data: [],
    gridSize: { x: 0, y: 0 },
    min: 0,
    max: 0,
    range: 0,
    timestamp: null,
    rawData: []
  }
}
```

## Development Tools

All stores are configured with Redux DevTools support when running in development mode. You can use the Redux DevTools browser extension to inspect and debug store state changes.

## Security Considerations

- Store access is read-only by default for extensions
- Be careful when calling store actions directly as they can modify application state
- Always check if stores are available before accessing them
- Consider using the provided helper methods for safer access

## Error Handling

```javascript
try {
  const state = window.__3D_PRINTER_SUITE_STORES__.getStoreState('printers')
  console.log(state)
} catch (error) {
  console.error('Store access error:', error.message)
}
```

## Browser Compatibility

This global store access is designed to work with modern browsers that support:
- ES6 modules
- Proxy objects (for Zustand)
- Web Serial API (for serial communication)

## Troubleshooting

1. **Stores not available**: Make sure the application has fully loaded
2. **Store not found**: Check the store name spelling and availability
3. **Permission errors**: Some browsers may restrict access to window objects from extensions

For more information, check the browser's extension development documentation.
