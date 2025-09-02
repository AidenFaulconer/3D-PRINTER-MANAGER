import React, { createContext, useContext, useMemo } from 'react'
import useSerialConnection from '../hooks/useSerialConnection'

const SerialConnectionContext = createContext(null)

export const SerialConnectionProvider = ({ children }) => {
  const serial = useSerialConnection()
  const value = useMemo(() => serial, [serial])
  return (
    <SerialConnectionContext.Provider value={value}>
      {children}
    </SerialConnectionContext.Provider>
  )
}

export const useSerial = () => {
  const ctx = useContext(SerialConnectionContext)
  if (!ctx) {
    throw new Error('useSerial must be used within SerialConnectionProvider')
  }
  return ctx
}

export default SerialConnectionContext
