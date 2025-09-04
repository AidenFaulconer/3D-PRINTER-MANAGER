import React, { useEffect, useMemo, useRef, useState } from 'react'
import { HelpCircle } from 'lucide-react'
import GcodeHelperPanel from './GcodeHelperPanel'
import useSerialStore from '../stores/serialStore'

const Line = ({ entry }) => {
  const color = entry.type === 'tx' ? 'text-blue-400' : entry.type === 'rx' ? 'text-green-400' : entry.type === 'err' ? 'text-red-400' : 'text-gray-300'
  const badge = entry.type.toUpperCase()
  const badgeColor = entry.type === 'tx' ? 'bg-blue-600' : entry.type === 'rx' ? 'bg-green-600' : entry.type === 'err' ? 'bg-red-600' : 'bg-gray-600'
  return (
    <div className="text-xs leading-5">
      <span className="text-gray-500 mr-2">{entry.timestamp}</span>
      <span className={`px-1.5 py-0.5 rounded text-white text-xs font-bold mr-2 ${badgeColor}`}>{badge}</span>
      <span className={color}>{entry.message}</span>
    </div>
  )
}

const SerialTerminal = React.memo(({ onSend, onSendMany, onClear }) => {
  // Subscribe to logs directly to minimize re-renders
  const log = useSerialStore(state => state.serialLogs)
  const fetchAllPrinterSettings = useSerialStore(state => state.fetchAllPrinterSettings)
  const serialStatus = useSerialStore(state => state.status)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef(null)
  const [showHelper, setShowHelper] = useState(false)
  const sendCommand = useSerialStore(state => state.sendCommand)

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
    const text = log.map(l => `${l.timestamp}\t${l.type}\t${l.message}`).join('\n')
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-900">Serial Terminal</div>
        <div className="space-x-2">
          <button onClick={()=>setShowHelper(true)} className="px-3 py-1 text-sm bg-gray-100 rounded inline-flex items-center hover:bg-gray-200"><HelpCircle className="h-4 w-4 mr-1"/> Help</button>
          <button onClick={onClear} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Clear</button>
          <button onClick={exportLog} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Export</button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto bg-gray-900 border border-gray-300 rounded p-3 font-mono text-sm">
        {log.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">No messages yet. Connect to your printer to see serial communication.</div>
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
        <button onClick={()=>sendCommand('M112')} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700" title="Emergency Stop">E-Stop</button>
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
}, (prevProps, nextProps) => {
  // Only re-render if the function references change
  return (
    prevProps.onSend === nextProps.onSend &&
    prevProps.onSendMany === nextProps.onSendMany &&
    prevProps.onClear === nextProps.onClear
  )
})

export default SerialTerminal