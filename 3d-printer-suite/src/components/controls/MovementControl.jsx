import React, { useEffect, useMemo, useRef, useState } from 'react'
import useSerialStore from '../../stores/serialStore'

const steps = [1, 10, 100]

export default function MovementControl({ send, requestPosition, lastPosition }) {
  const [selectedStep, setSelectedStep] = useState(10)
  const [goto, setGoto] = useState({ x: '', y: '', z: '' })

  const jog = (axis, dir) => {
    send(`G91`)
    send(`G0 ${axis}${dir * selectedStep} F6000`)
    send(`G90`)
  }

  const home = (axes) => {
    send(`G28 ${axes || ''}`.trim())
  }

  const goTo = () => {
    const parts = []
    if (goto.x !== '') parts.push(`X${goto.x}`)
    if (goto.y !== '') parts.push(`Y${goto.y}`)
    if (goto.z !== '') parts.push(`Z${goto.z}`)
    if (parts.length === 0) return
    send(`G90`)
    send(`G0 ${parts.join(' ')} F6000`)
  }

  useEffect(() => {
    const id = setInterval(() => {
      const st = useSerialStore.getState()
      if (st.isStreamingProgram || st.status !== 'connected') return
      requestPosition && requestPosition()
    }, 1500)
    return () => clearInterval(id)
  }, [requestPosition])

  const pos = lastPosition || { x: 0, y: 0, z: 0, e: 0 }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Movement</h3>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Step:</span>
          <div className="flex">
            {steps.map(s => (
              <button
                key={s}
                onClick={() => setSelectedStep(s)}
                className={`px-2 py-1 border text-xs ${selectedStep === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} first:rounded-l last:rounded-r -ml-px`}
              >
                ±{s}mm
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* X */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">X Axis</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => jog('X', -1)}>−X</button>
            <div className="text-sm text-gray-600">{pos.x.toFixed?.(2) ?? pos.x}</div>
            <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => jog('X', 1)}>+X</button>
          </div>
        </div>
        {/* Y */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">Y Axis</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => jog('Y', -1)}>−Y</button>
            <div className="text-sm text-gray-600">{pos.y.toFixed?.(2) ?? pos.y}</div>
            <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => jog('Y', 1)}>+Y</button>
          </div>
        </div>
        {/* Z */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">Z Axis</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => jog('Z', -1)}>−Z</button>
            <div className="text-sm text-gray-600">{pos.z.toFixed?.(2) ?? pos.z}</div>
            <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => jog('Z', 1)}>+Z</button>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => home('')}>Home All</button>
        <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => home('X')}>Home X</button>
        <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => home('Y')}>Home Y</button>
        <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => home('Z')}>Home Z</button>
      </div>

      <div className="grid grid-cols-4 gap-2 items-end">
        <label className="text-sm">
          <span className="text-gray-700">X</span>
          <input className="w-full border border-gray-300 rounded px-2 py-1" value={goto.x} onChange={(e) => setGoto({ ...goto, x: e.target.value })} />
        </label>
        <label className="text-sm">
          <span className="text-gray-700">Y</span>
          <input className="w-full border border-gray-300 rounded px-2 py-1" value={goto.y} onChange={(e) => setGoto({ ...goto, y: e.target.value })} />
        </label>
        <label className="text-sm">
          <span className="text-gray-700">Z</span>
          <input className="w-full border border-gray-300 rounded px-2 py-1" value={goto.z} onChange={(e) => setGoto({ ...goto, z: e.target.value })} />
        </label>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={goTo}>Go To</button>
      </div>
    </div>
  )
}
