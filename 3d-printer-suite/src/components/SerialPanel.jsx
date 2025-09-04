import React from 'react'
import useSerialStore from '../stores/serialStore'
import SerialConnectionStatus from './SerialConnectionStatus'
import SerialTerminal from './SerialTerminal'

const SerialPanel = React.memo(() => {
  // Use selective subscriptions for better performance
  const status = useSerialStore(state => state.status)
  const baudRate = useSerialStore(state => state.baudRate)
  const setBaudRate = useSerialStore(state => state.setBaudRate)
  const autoDetect = useSerialStore(state => state.autoDetect)
  const setAutoDetect = useSerialStore(state => state.setAutoDetect)
  const error = useSerialStore(state => state.error)
  const connect = useSerialStore(state => state.connect)
  const disconnect = useSerialStore(state => state.disconnect)
  // SerialTerminal will handle its own log subscription
  const sendCommand = useSerialStore(state => state.sendCommand)
  const sendCommands = useSerialStore(state => state.sendCommands)
  const clearLogs = useSerialStore(state => state.clearLogs)

  return (
    <div className="space-y-4 h-full flex flex-col">
      <SerialConnectionStatus
        status={status}
        baudRate={baudRate}
        setBaudRate={setBaudRate}
        autoDetect={autoDetect}
        setAutoDetect={setAutoDetect}
        error={error}
        onConnect={connect}
        onDisconnect={disconnect}
      />

      <div className="flex-1 min-h-0">
        <SerialTerminal
          onSend={sendCommand}
          onSendMany={sendCommands}
          onClear={clearLogs}
        />
      </div>
    </div>
  )
})

export default SerialPanel