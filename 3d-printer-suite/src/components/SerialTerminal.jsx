import React, { useEffect, useMemo, useRef, useState } from 'react'
import { HelpCircle } from 'lucide-react'
import GcodeHelperPanel from './GcodeHelperPanel'
import { useSerial } from '../context/SerialConnectionContext'

const Line = ({ entry }) => {
  const color = entry.direction === 'tx' ? 'text-blue-700' : entry.direction === 'rx' ? 'text-green-700' : entry.direction === 'err' ? 'text-red-700' : 'text-gray-600'
  const badge = entry.direction.toUpperCase()
  return (
    <div className="text-xs leading-5">
      <span className="text-gray-400 mr-2">{new Date(entry.timestamp).toLocaleTimeString()}</span>
      <span className={`px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 mr-2`}>{badge}</span>
      <span className={color}>{entry.message}</span>
    </div>
  )
}

const SerialTerminal = ({ log, onSend, onSendMany, onClear }) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef(null)
  const [showHelper, setShowHelper] = useState(false)
  const serial = useSerial()

  const handleSend = () => {
    const line = input.trim()
    if (!line) return
    onSend(line)
    setHistory((prev) => [...prev, line].slice(-100))
    setHistoryIndex(-1)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIdx = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIdx)
      setInput(history[nextIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIdx = historyIndex >= history.length - 1 ? -1 : historyIndex + 1
      setHistoryIndex(nextIdx)
      setInput(nextIdx === -1 ? '' : (history[nextIdx] || ''))
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [log])

  const exportLog = () => {
    const text = log.map(l => `${l.timestamp}\t${l.direction}\t${l.message}`).join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'serial_log.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const insertFromHelper = (text) => {
    setInput((prev) => (prev ? prev + '\n' : '') + text)
    setShowHelper(false)
  }

  const paramHint = useMemo(() => {
    const head = input.trim().split(/\s+/)[0] || ''
    if (!head) return ''
    const upper = head.toUpperCase()
    // simple mapping for hints
    if (upper === 'G1' || upper === 'G0') return 'Syntax: G1 X<pos> Y<pos> Z<pos> E<len> F<feed>'
    if (upper === 'G28') return 'Syntax: G28 [X] [Y] [Z]'
    if (upper === 'M104') return 'Syntax: M104 S<temp> [T<tool>]'
    if (upper === 'M109') return 'Syntax: M109 S<temp> [T<tool>] (wait)'
    if (upper === 'M140') return 'Syntax: M140 S<temp>'
    if (upper === 'M190') return 'Syntax: M190 S<temp> (wait)'
    if (upper === 'M106') return 'Syntax: M106 S<0-255>'
    if (upper === 'M303') return 'Syntax: M303 E<hotend> S<temp> C<cycles>'
    return ''
  }, [input])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Terminal</div>
        <div className="space-x-2">
          <button onClick={()=>setShowHelper(true)} className="px-2 py-1 text-sm bg-gray-100 rounded inline-flex items-center"><HelpCircle className="h-4 w-4 mr-1"/> Help</button>
          <button onClick={onClear} className="px-2 py-1 text-sm bg-gray-100 rounded">Clear</button>
          <button onClick={exportLog} className="px-2 py-1 text-sm bg-gray-100 rounded">Export</button>
        </div>
      </div>

      <div ref={scrollRef} className="h-64 overflow-auto bg-gray-50 border border-gray-200 rounded p-2">
        {log.length === 0 ? (
          <div className="text-xs text-gray-400">No messages yet</div>
        ) : (
          <div className="space-y-1">
            {log.map((entry, idx) => (
              <Line key={idx} entry={entry} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter G-code (e.g., M114)"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button onClick={handleSend} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send</button>
        <button onClick={()=>serial.sendCommand('M112')} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700" title="Emergency Stop">E-Stop</button>
      </div>

      <div className="text-xs text-gray-500 flex items-center justify-between">
        <span>Tip: Use Up/Down arrows to navigate command history</span>
        {paramHint && <span className="text-indigo-700">{paramHint}</span>}
      </div>

      {showHelper && (
        <GcodeHelperPanel onInsert={insertFromHelper} onClose={()=>setShowHelper(false)} />
      )}
    </div>
  )
}

export default SerialTerminal
