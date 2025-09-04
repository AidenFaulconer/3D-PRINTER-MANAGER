import { useCallback, useRef } from 'react'
import useSerialConnection from './useSerialConnection'
import useGcodeFilesStore from '../stores/gcodeFilesStore'

export default function useGcodeStreaming() {
  const { sendCommand } = useSerialConnection()
  const { updatePrintProgress } = useGcodeFilesStore()

  // Streaming state
  const streamingRef = useRef({
    active: false,
    paused: false,
    linesSent: 0,
    totalLines: 0,
    buffer: [],
    waitingForResponse: false,
    currentFileId: null
  })

  const processNextLine = useCallback(async () => {
    const streaming = streamingRef.current

    if (!streaming.active || streaming.paused || streaming.waitingForResponse) {
      return
    }

    try {
      if (streaming.buffer.length === 0) {
        // Streaming complete
        updatePrintProgress(100)
        resetStreaming()
        return
      }

      const line = streaming.buffer.shift()
      streaming.waitingForResponse = true
      await sendCommand(line)

      streaming.linesSent++
      const progress = (streaming.linesSent / streaming.totalLines) * 100
      updatePrintProgress(progress)

      // Process next line after a small delay
      setTimeout(() => {
        streaming.waitingForResponse = false
        processNextLine()
      }, 50)
    } catch (error) {
      console.error('Error streaming G-code:', error)
      resetStreaming()
      throw error
    }
  }, [sendCommand, updatePrintProgress])

  const streamGcode = useCallback(async (fileId, content) => {
    if (streamingRef.current.active) {
      throw new Error('Already streaming G-code')
    }

    try {
      // Initialize streaming state
      const lines = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith(';'))

      streamingRef.current = {
        active: true,
        paused: false,
        linesSent: 0,
        totalLines: lines.length,
        buffer: lines,
        waitingForResponse: false,
        currentFileId: fileId
      }

      // Start streaming
      await processNextLine()
    } catch (error) {
      resetStreaming()
      throw error
    }
  }, [processNextLine])

  const pauseStreaming = useCallback(() => {
    if (streamingRef.current.active) {
      streamingRef.current.paused = true
    }
  }, [])

  const resumeStreaming = useCallback(() => {
    if (streamingRef.current.active) {
      streamingRef.current.paused = false
      processNextLine()
    }
  }, [processNextLine])

  const stopStreaming = useCallback(() => {
    if (streamingRef.current.active) {
      resetStreaming()
    }
  }, [])

  const resetStreaming = useCallback(() => {
    streamingRef.current = {
      active: false,
      paused: false,
      linesSent: 0,
      totalLines: 0,
      buffer: [],
      waitingForResponse: false,
      currentFileId: null
    }
  }, [])

  const getStreamingStatus = useCallback(() => {
    const { active, paused, linesSent, totalLines, currentFileId } = streamingRef.current
    return {
      active,
      paused,
      progress: totalLines ? (linesSent / totalLines) * 100 : 0,
      currentFileId
    }
  }, [])

  return {
    streamGcode,
    pauseStreaming,
    resumeStreaming,
    stopStreaming,
    getStreamingStatus
  }
}
