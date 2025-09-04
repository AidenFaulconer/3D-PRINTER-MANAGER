import { useCallback } from 'react'
import useSerialStore from '../stores/serialStore'

export default function useSerialConnection() {
  // Use selective subscriptions to prevent unnecessary re-renders
  const status = useSerialStore(state => state.status)
  const baudRate = useSerialStore(state => state.baudRate)
  const autoDetect = useSerialStore(state => state.autoDetect)
  const error = useSerialStore(state => state.error)
  const port = useSerialStore(state => state.port)
  const connect = useSerialStore(state => state.connect)
  const disconnect = useSerialStore(state => state.disconnect)
  const sendCommand = useSerialStore(state => state.sendCommand)
  const sendCommands = useSerialStore(state => state.sendCommands)
  const clearLogs = useSerialStore(state => state.clearLogs)
  const setBaudRate = useSerialStore(state => state.setBaudRate)
  const setAutoDetect = useSerialStore(state => state.setAutoDetect)

  return {
    status,
    baudRate,
    setBaudRate,
    autoDetect,
    setAutoDetect,
    port,
    error,
    connect,
    disconnect,
    sendCommand,
    sendCommands,
    clearLogs
  }
}