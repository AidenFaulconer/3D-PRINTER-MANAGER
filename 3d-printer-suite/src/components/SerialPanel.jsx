import React from 'react'
import { useSerial } from '../context/SerialConnectionContext'
import SerialConnectionStatus from './SerialConnectionStatus'
import SerialTerminal from './SerialTerminal'

const SerialPanel = () => {
  const serial = useSerial()

  return (
    <div className="space-y-4">
      <SerialConnectionStatus
        status={serial.status}
        baudRate={serial.baudRate}
        setBaudRate={serial.setBaudRate}
        autoDetect={serial.autoDetect}
        setAutoDetect={serial.setAutoDetect}
        error={serial.error}
        onConnect={serial.connect}
        onDisconnect={serial.disconnect}
      />

      <SerialTerminal
        log={serial.log}
        onSend={serial.sendCommand}
        onSendMany={serial.sendCommands}
        onClear={serial.clearLog}
      />
    </div>
  )
}

export default SerialPanel
