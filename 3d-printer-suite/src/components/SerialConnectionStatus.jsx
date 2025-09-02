import React from 'react'

const StatusDot = ({ status }) => {
  const color = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500' : 'bg-gray-400'
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
}

const SerialConnectionStatus = ({
  status,
  baudRate,
  setBaudRate,
  autoDetect,
  setAutoDetect,
  error,
  onConnect,
  onDisconnect
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <StatusDot status={status} />
          <div className="font-medium text-gray-900 capitalize">{status}</div>
        </div>
        <div className="text-sm text-gray-500">Web Serial</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block text-sm">
          <span className="text-gray-700">Baud Rate</span>
          <select
            value={baudRate}
            onChange={(e) => setBaudRate(parseInt(e.target.value, 10))}
            disabled={autoDetect || status !== 'disconnected'}
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
          >
            {[250000, 230400, 115200, 57600, 38400, 9600].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center space-x-2 text-sm mt-6 md:mt-0">
          <input type="checkbox" checked={autoDetect} onChange={(e) => setAutoDetect(e.target.checked)} disabled={status !== 'disconnected'} />
          <span className="text-gray-700">Auto-detect baud</span>
        </label>

        <div className="flex items-center justify-end space-x-2">
          {status !== 'connected' ? (
            <button
              onClick={onConnect}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Connect
            </button>
          ) : (
            <button
              onClick={onDisconnect}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </div>
  )
}

export default SerialConnectionStatus
