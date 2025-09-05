# Store Selector Hooks

This directory contains optimized selector hooks for all Zustand stores in the 3D Printer Suite application. These hooks prevent unnecessary re-renders by only subscribing to specific parts of the store state.

## Why Use Selector Hooks?

Instead of destructuring the entire store state:
```javascript
// ❌ BAD - Causes re-renders on any store change
const { printers, addPrinter, deletePrinter, setActivePrinter, resetStore } = usePrintersStore()
```

Use specific selector hooks:
```javascript
// ✅ GOOD - Only re-renders when specific data changes
const printers = usePrinters()
const { addPrinter, deletePrinter, setActivePrinter, resetStore } = usePrinterActions()
```

## Available Selector Hooks

### Printers Store (`usePrintersSelectors.js`)

**Data Selectors:**
- `usePrinters()` - Get all printers
- `useActivePrinterId()` - Get active printer ID
- `useActivePrinter()` - Get active printer object
- `usePrinterSettings(printerId)` - Get printer settings for specific printer
- `useCalibrationSteps(printerId)` - Get calibration steps for specific printer
- `useIssues(printerId)` - Get issues for specific printer
- `useProfiles(printerId)` - Get profiles for specific printer
- `useMaterials(printerId)` - Get materials for specific printer
- `useMacros(printerId)` - Get macros for specific printer

**Action Selectors:**
- `usePrinterActions()` - Get printer management actions
- `useProfileActions()` - Get profile management actions
- `useMaterialActions()` - Get material management actions
- `useMacroActions()` - Get macro management actions
- `useIssueActions()` - Get issue management actions
- `useConfigurationActions()` - Get configuration management actions

### Serial Store (`useSerialSelectors.js`)

**Data Selectors:**
- `useSerialStatus()` - Get connection status
- `useIsConnected()` - Check if connected
- `useConnectionInfo()` - Get connection details
- `useTemperatureData()` - Get temperature readings
- `useMovementData()` - Get movement state
- `useFanData()` - Get fan speeds
- `useExtrusionData()` - Get extrusion state
- `useFirmwareInfo()` - Get firmware information
- `usePrintJobData()` - Get print job state
- `useSettings()` - Get printer settings
- `useBedLevelingData()` - Get bed leveling state

**Action Selectors:**
- `useSerialActions()` - Get serial communication actions
- `useTemperatureActions()` - Get temperature control actions
- `useMovementActions()` - Get movement control actions
- `useFanActions()` - Get fan control actions
- `useExtrusionActions()` - Get extrusion control actions
- `usePrintJobActions()` - Get print job control actions
- `useSettingsActions()` - Get settings management actions
- `useBedLevelingActions()` - Get bed leveling actions

### Gcode Files Store (`useGcodeFilesSelectors.js`)

**Data Selectors:**
- `useGcodeFiles()` - Get all G-code files
- `usePrintQueue()` - Get print queue
- `usePrintQueueCount()` - Get print queue count
- `useActivePrint()` - Get active print job
- `useIsPrinting()` - Check if currently printing
- `usePrintProgress()` - Get print progress percentage
- `useFileStatistics()` - Get file statistics

**Action Selectors:**
- `useFileActions()` - Get file management actions
- `useQueueActions()` - Get queue management actions
- `usePrintActions()` - Get print control actions

### Calibration Store (`useCalibrationSelectors.js`)

**Data Selectors:**
- `useCalibrationFiles()` - Get calibration files
- `useCalibrationResults()` - Get calibration results
- `useCalibrationWorkflows()` - Get calibration workflows
- `useActiveWorkflow()` - Get active workflow
- `useCalibrationStatistics()` - Get calibration statistics

**Action Selectors:**
- `useCalibrationFileActions()` - Get file management actions
- `useCalibrationResultActions()` - Get result management actions
- `useWorkflowActions()` - Get workflow management actions
- `useAnalysisActions()` - Get analysis actions

### Print History Store (`usePrintHistorySelectors.js`)

**Data Selectors:**
- `usePrintHistory()` - Get print history
- `usePrintStatistics()` - Get print statistics
- `useSuccessRate()` - Get success rate percentage
- `useCompletedPrints()` - Get completed prints
- `useFailedPrintRecords()` - Get failed print records
- `useRecentPrints(days)` - Get recent prints by days

**Action Selectors:**
- `usePrintHistoryActions()` - Get history management actions

### Advanced Queue Store (`useAdvancedQueueSelectors.js`)

**Data Selectors:**
- `useQueueItems()` - Get queue items
- `useTemplates()` - Get print templates
- `useFolders()` - Get file folders
- `useNotifications()` - Get notifications
- `useUnreadNotifications()` - Get unread notifications
- `useQueueStatistics()` - Get queue statistics

**Action Selectors:**
- `useQueueActions()` - Get queue management actions
- `useTemplateActions()` - Get template management actions
- `useFolderActions()` - Get folder management actions
- `useNotificationActions()` - Get notification management actions
- `useBulkActions()` - Get bulk operation actions

## Usage Examples

### Basic Component
```javascript
import React from 'react'
import { usePrinters, usePrinterActions } from '../hooks/useStoreSelectors'

const PrinterList = () => {
  const printers = usePrinters()
  const { addPrinter, deletePrinter } = usePrinterActions()
  
  return (
    <div>
      {printers.map(printer => (
        <div key={printer.id}>
          {printer.name}
          <button onClick={() => deletePrinter(printer.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Component with Multiple Stores
```javascript
import React from 'react'
import { 
  useActivePrinter, 
  useSerialStatus, 
  useTemperatureData,
  usePrintActions 
} from '../hooks/useStoreSelectors'

const PrinterStatus = () => {
  const printer = useActivePrinter()
  const status = useSerialStatus()
  const { hotendTemp, bedTemp } = useTemperatureData()
  const { pausePrint, resumePrint } = usePrintActions()
  
  return (
    <div>
      <h2>{printer?.name}</h2>
      <p>Status: {status}</p>
      <p>Hotend: {hotendTemp}°C</p>
      <p>Bed: {bedTemp}°C</p>
      <button onClick={pausePrint}>Pause</button>
    </div>
  )
}
```

### Component with Conditional Data
```javascript
import React from 'react'
import { useActivePrinter, useProfiles } from '../hooks/useStoreSelectors'

const ProfileSelector = () => {
  const printer = useActivePrinter()
  const profiles = useProfiles(printer?.id)
  
  if (!printer) return <div>No printer selected</div>
  
  return (
    <select>
      {profiles.map(profile => (
        <option key={profile.id} value={profile.id}>
          {profile.name}
        </option>
      ))}
    </select>
  )
}
```

## Migration Guide

### Before (Destructuring entire store)
```javascript
// ❌ Old way - causes unnecessary re-renders
const { 
  printers, 
  activePrinterId, 
  addPrinter, 
  deletePrinter, 
  setActivePrinter 
} = usePrintersStore()
```

### After (Using selector hooks)
```javascript
// ✅ New way - only re-renders when specific data changes
const printers = usePrinters()
const activePrinterId = useActivePrinterId()
const { addPrinter, deletePrinter, setActivePrinter } = usePrinterActions()
```

## Performance Benefits

1. **Reduced Re-renders**: Components only re-render when their specific data changes
2. **Better Performance**: Prevents cascading re-renders throughout the component tree
3. **Cleaner Code**: More explicit about what data each component needs
4. **Better Debugging**: Easier to track which data changes cause re-renders

## Best Practices

1. **Use specific selectors**: Only subscribe to the data you actually need
2. **Group related actions**: Use action selectors to get related functions together
3. **Avoid destructuring stores**: Always use the provided selector hooks
4. **Use conditional selectors**: For data that depends on other state (like printer-specific data)
5. **Memoize expensive computations**: Use `useMemo` for derived data that requires computation

## Import All Selectors

```javascript
// Import all selectors from one place
import { 
  usePrinters, 
  usePrinterActions,
  useSerialStatus,
  useTemperatureData,
  useGcodeFiles,
  // ... all other selectors
} from '../hooks/useStoreSelectors'
```
