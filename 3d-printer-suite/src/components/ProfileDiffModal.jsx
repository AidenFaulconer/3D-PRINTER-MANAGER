import React, { useMemo, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

function diffProfiles(a, b) {
  const keys = Array.from(new Set([...Object.keys(a.settings||{}), ...Object.keys(b.settings||{})]))
  const diffs = []
  for (const k of keys) {
    const av = a.settings?.[k]
    const bv = b.settings?.[k]
    if (JSON.stringify(av) !== JSON.stringify(bv)) diffs.push({ key: k, from: av, to: bv })
  }
  return diffs
}

const ProfileDiffModal = ({ isOpen, onClose, leftProfile, rightProfile, onMerge }) => {
  const diffs = useMemo(() => diffProfiles(leftProfile, rightProfile), [leftProfile, rightProfile])
  const [selected, setSelected] = useState({})

  if (!isOpen) return null

  const toggle = (k) => setSelected(prev => ({ ...prev, [k]: !prev[k] }))
  const doMerge = () => {
    const updates = {}
    diffs.forEach(d => { if (selected[d.key]) updates[d.key] = d.to })
    onMerge(updates)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="font-semibold">Compare Profiles</div>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-12 text-sm font-medium text-gray-700 mb-2">
            <div className="col-span-5">{leftProfile?.name}</div>
            <div className="col-span-2 text-center"></div>
            <div className="col-span-5 text-right">{rightProfile?.name}</div>
          </div>
          <div className="max-h-80 overflow-auto divide-y">
            {diffs.map(d => (
              <label key={d.key} className="grid grid-cols-12 items-center py-2 gap-2">
                <input type="checkbox" checked={!!selected[d.key]} onChange={()=>toggle(d.key)} />
                <div className="col-span-4 truncate" title={d.key}>{d.key}</div>
                <div className="col-span-3 truncate text-gray-600" title={String(d.from)}>{String(d.from)}</div>
                <div className="col-span-1 flex justify-center"><ArrowRight className="h-4 w-4" /></div>
                <div className="col-span-3 truncate text-gray-800" title={String(d.to)}>{String(d.to)}</div>
              </label>
            ))}
            {diffs.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No differences</div>
            )}
          </div>
        </div>
        <div className="px-4 py-2 border-t flex items-center justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1.5 bg-gray-100 rounded">Close</button>
          <button onClick={doMerge} className="px-3 py-1.5 bg-blue-600 text-white rounded" disabled={Object.keys(selected).length===0}>Merge selected →</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDiffModal
