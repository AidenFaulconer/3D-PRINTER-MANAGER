import React, { useEffect, useMemo, useState } from 'react'
import { useSerial } from '../context/SerialConnectionContext'
import SerialConnectionStatus from './SerialConnectionStatus'
import MovementControl from './controls/MovementControl'
import TemperatureControl from './controls/TemperatureControl'
import ExtrusionControl from './controls/ExtrusionControl'
import FanControl from './controls/FanControl'
import UtilitiesControl from './controls/UtilitiesControl'

export default function PrinterControlPanel() {
  const serial = useSerial()
  const [position, setPosition] = useState(null)
  const [temps, setTemps] = useState(null)

  // Parse incoming lines
  useEffect(() => {
    const last = serial.log[serial.log.length - 1]
    if (!last || last.direction !== 'rx') return
    const line = last.message

    // Position: M114 typical: X:0.00 Y:0.00 Z:0.00 E:0.00
    if (/\bX:\s*[-\d.]+/.test(line) && /\bY:\s*[-\d.]+/.test(line) && /\bZ:\s*[-\d.]+/.test(line)) {
      const m = {
        x: parseFloat((line.match(/X:\s*([-\d.]+)/) || [])[1] || 0),
        y: parseFloat((line.match(/Y:\s*([-\d.]+)/) || [])[1] || 0),
        z: parseFloat((line.match(/Z:\s*([-\d.]+)/) || [])[1] || 0),
        e: parseFloat((line.match(/E:\s*([-\d.]+)/) || [])[1] || 0)
      }
      if (!Number.isNaN(m.x)) setPosition(m)
    }

    // Temps: M105 example: ok T:205.0 /210.0 B:60.0 /60.0
    if (/\bT:\s*[-\d.]+/.test(line) && /\bB:\s*[-\d.]+/.test(line)) {
      const hot = parseFloat((line.match(/T:\s*([-\d.]+)/) || [])[1] || 0)
      const bed = parseFloat((line.match(/B:\s*([-\d.]+)/) || [])[1] || 0)
      setTemps({ hotend: hot, bed })
    }
  }, [serial.log])

  const requestPosition = () => serial.sendCommand('M114')
  const requestTemps = () => serial.sendCommand('M105')

  const send = (g) => serial.sendCommand(g)

  const preheat = (mat) => {
    if (mat === 'PLA') { send('M104 S205'); send('M140 S60') }
    if (mat === 'PETG') { send('M104 S235'); send('M140 S80') }
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MovementControl send={send} requestPosition={requestPosition} lastPosition={position} />
        <TemperatureControl send={send} requestTemps={requestTemps} lastTemps={temps} />
        <ExtrusionControl send={send} preheat={preheat} />
        <FanControl send={send} />
        <UtilitiesControl send={send} />
      </div>
    </div>
  )
}
