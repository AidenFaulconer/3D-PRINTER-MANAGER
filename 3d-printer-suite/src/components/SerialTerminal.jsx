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
  // Use selective subscription to prevent app-wide re-renders
  const logCount = useSerialStore(state => state.serialLogs?.length || 0)
  const [logs, setLogs] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [hasNewLogs, setHasNewLogs] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  
  useEffect(() => {
    // Only fetch logs when log count changes
    const allLogs = useSerialStore.getState().serialLogs || []
    setLogs(allLogs)
    
    // Mark as having new logs if not at bottom
    if (scrollRef.current && !isUserScrolling) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10
      setHasNewLogs(!isAtBottom)
    }
  }, [logCount, isUserScrolling])

  // Auto-scroll to bottom when component becomes visible or logs change
  useEffect(() => {
    if (isVisible && scrollRef.current && !isUserScrolling) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setHasNewLogs(false)
    }
  }, [isVisible, logs, isUserScrolling])

  // Track when component is visible using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current)
      }
    }
  }, [])
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

  // Handle scroll events to detect user scrolling
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10
      setIsUserScrolling(!isAtBottom)
      setHasNewLogs(!isAtBottom)
    }
  }

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setIsUserScrolling(false)
      setHasNewLogs(false)
    }
  }

  const exportLog = () => {
    const text = logs.map(l => `${l.timestamp}\t${l.type}\t${l.message}`).join('\n')
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 h-full flex flex-col max-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-lg font-semibold text-gray-900">Serial Terminal</div>
          {hasNewLogs && (
            <div className="flex items-center space-x-1 text-sm text-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span>New logs</span>
            </div>
          )}
        </div>
        <div className="space-x-2">
          <button onClick={()=>setShowHelper(true)} className="px-3 py-1 text-sm bg-gray-100 rounded inline-flex items-center hover:bg-gray-200"><HelpCircle className="h-4 w-4 mr-1"/> Help</button>
          <button onClick={onClear} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Clear</button>
          <button onClick={exportLog} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Export</button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <div 
          ref={scrollRef} 
          onScroll={handleScroll}
          className="h-full overflow-auto bg-gray-900 border border-gray-300 rounded p-3 font-mono text-sm"
          style={{ 
            maxHeight: 'calc(100vh - 300px)', // Ensure it doesn't exceed screen height
            minHeight: '200px' // Minimum height for usability
          }}
        >
          {logs.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-8">No messages yet. Connect to your printer to see serial communication.</div>
          ) : (
            <div className="space-y-1">
              {logs.map((entry, idx) => (
                <Line key={idx} entry={entry} />
              ))}
            </div>
          )}
        </div>
        
        {/* Scroll to bottom button */}
        {hasNewLogs && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-200"
          >
            ↓ New logs
          </button>
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