import useSerialStore from '../stores/serialStore'

// Selector hooks for useSerialStore to prevent unnecessary re-renders
// Each hook only subscribes to the specific state it needs

// Connection status selectors
export const useSerialStatus = () => useSerialStore(state => state.status)
export const useIsConnected = () => useSerialStore(state => state.status === 'connected')
export const useIsConnecting = () => useSerialStore(state => state.status === 'connecting')
export const useIsDisconnected = () => useSerialStore(state => state.status === 'disconnected')

// Connection info selectors
export const useConnectionInfo = () => useSerialStore(state => ({
  port: state.port,
  baudRate: state.baudRate,
  status: state.status,
  lastConnected: state.lastConnected
}))

// Serial communication selectors
export const useSerialLogs = () => useSerialStore(state => state.serialLogs)
export const useSerialActions = () => useSerialStore(state => ({
  sendCommand: state.sendCommand,
  connect: state.connect,
  disconnect: state.disconnect,
  clearLogs: state.clearLogs
}))

// Temperature monitoring selectors
export const useTemperatureData = () => useSerialStore(state => ({
  hotendTemp: state.hotendTemp,
  bedTemp: state.bedTemp,
  targetHotendTemp: state.targetHotendTemp,
  targetBedTemp: state.targetBedTemp,
  isHeating: state.isHeating
}))

export const useTemperatureActions = () => useSerialStore(state => ({
  setHotendTemp: state.setHotendTemp,
  setBedTemp: state.setBedTemp,
  startHeating: state.startHeating,
  stopHeating: state.stopHeating
}))

// Movement control selectors
export const useMovementData = () => useSerialStore(state => ({
  currentPosition: state.currentPosition,
  isHomed: state.isHomed,
  isMoving: state.isMoving
}))

export const useMovementActions = () => useSerialStore(state => ({
  moveAxis: state.moveAxis,
  homeAxis: state.homeAxis,
  homeAll: state.homeAll,
  setPosition: state.setPosition,
  emergencyStop: state.emergencyStop
}))

// Fan control selectors
export const useFanData = () => useSerialStore(state => ({
  fanSpeed: state.fanSpeed,
  partCoolingFanSpeed: state.partCoolingFanSpeed
}))

export const useFanActions = () => useSerialStore(state => ({
  setFanSpeed: state.setFanSpeed,
  setPartCoolingFanSpeed: state.setPartCoolingFanSpeed
}))

// Extrusion control selectors
export const useExtrusionData = () => useSerialStore(state => ({
  extruderPosition: state.extruderPosition,
  isExtruding: state.isExtruding
}))

export const useExtrusionActions = () => useSerialStore(state => ({
  extrude: state.extrude,
  retract: state.retract,
  setExtruderPosition: state.setExtruderPosition
}))

// Firmware info selectors
export const useFirmwareInfo = () => useSerialStore(state => ({
  firmwareName: state.firmwareName,
  firmwareVersion: state.firmwareVersion,
  machineType: state.machineType,
  extruderCount: state.extruderCount,
  uuid: state.uuid,
  capabilities: state.capabilities
}))

// Print job selectors
export const usePrintJobData = () => useSerialStore(state => ({
  isPrinting: state.isPrinting,
  printProgress: state.printProgress,
  printTime: state.printTime,
  printTimeLeft: state.printTimeLeft,
  layer: state.layer,
  totalLayers: state.totalLayers,
  currentFile: state.currentFile
}))

export const usePrintJobActions = () => useSerialStore(state => ({
  startPrint: state.startPrint,
  pausePrint: state.pausePrint,
  resumePrint: state.resumePrint,
  stopPrint: state.stopPrint,
  setPrintProgress: state.setPrintProgress
}))

// Settings selectors
export const useSettings = () => useSerialStore(state => ({
  units: state.units,
  feedrate: state.feedrate,
  acceleration: state.acceleration,
  jerk: state.jerk,
  stepsPerUnit: state.stepsPerUnit,
  maxFeedrate: state.maxFeedrate,
  maxAcceleration: state.maxAcceleration,
  maxJerk: state.maxJerk
}))

export const useSettingsActions = () => useSerialStore(state => ({
  updateSettings: state.updateSettings,
  resetSettings: state.resetSettings,
  saveSettings: state.saveSettings
}))

// Bed leveling selectors
export const useBedLevelingData = () => useSerialStore(state => ({
  bedLevelingEnabled: state.bedLevelingEnabled,
  bedLevelingMesh: state.bedLevelingMesh,
  bedLevelingFadeHeight: state.bedLevelingFadeHeight,
  zProbeOffset: state.zProbeOffset
}))

export const useBedLevelingActions = () => useSerialStore(state => ({
  enableBedLeveling: state.enableBedLeveling,
  disableBedLeveling: state.disableBedLeveling,
  setBedLevelingMesh: state.setBedLevelingMesh,
  setZProbeOffset: state.setZProbeOffset,
  startBedLeveling: state.startBedLeveling
}))

// Utility selectors
export const useSerialError = () => useSerialStore(state => state.error)
export const useSerialWarning = () => useSerialStore(state => state.warning)
export const useIsReady = () => useSerialStore(state => state.isReady)
