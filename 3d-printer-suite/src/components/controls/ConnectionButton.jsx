import React from 'react'
import { Usb, Cable } from 'lucide-react'
import usePrintersStore from '../../stores/printersStore'

const ConnectionButton = React.memo(function ConnectionButton({ onConnect, onDisconnect, className = '' }) {
  const { serialStatus } = usePrintersStore(state => ({
    serialStatus: state.serialStatus
  }))

  const isConnected = serialStatus === 'connected'
  const isConnecting = serialStatus === 'connecting'

  const handleClick = () => {
    if (isConnected) {
      onDisconnect?.()
    } else if (!isConnecting) {
      onConnect?.()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        ${isConnected 
          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
          : isConnecting
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        } ${className}`}
    >
      {isConnected ? (
        <>
          <Usb size={16} />
          Connected
        </>
      ) : isConnecting ? (
        <>
          <Usb size={16} className="animate-pulse" />
          Connecting...
        </>
      ) : (
        <>
          <Cable size={16} />
          Connect
        </>
      )}
    </button>
  )
})

export default ConnectionButton
