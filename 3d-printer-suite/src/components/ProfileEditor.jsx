import React, { useMemo, useState, useEffect } from 'react'
import { X, Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import { CURA_SETTINGS_SCHEMA, settingMeta } from '../utils/curaSchema'
import { validateAndAnalyze } from '../utils/profileValidation'

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
  </button>
)

const ProfileEditor = ({ isOpen, onClose, profile, onSave }) => {
  const { getActivePrinter, updateProfile } = usePrintersStore()
  const activePrinter = getActivePrinter()

  const [localSettings, setLocalSettings] = useState(profile?.settings || {})
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all') // all|number|boolean|enum|string
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [validation, setValidation] = useState({ errors: {}, conflicts: [], strength: [], speed: { estimates: {}, hints: [] } })

  useEffect(() => {
    setLocalSettings(profile?.settings || {})
  }, [profile])

  useEffect(() => {
    const capabilities = activePrinter?.printerCapabilities || {}
    setValidation(validateAndAnalyze(localSettings, capabilities))
  }, [localSettings, activePrinter])

  const categories = useMemo(() => Object.keys(CURA_SETTINGS_SCHEMA), [])

  const filteredEntries = useMemo(() => {
    const q = query.toLowerCase()
    const match = (k, meta) => {
      if (!q) return true
      return k.toLowerCase().includes(q) || (meta.label || '').toLowerCase().includes(q) || (meta.description || '').toLowerCase().includes(q)
    }

    const typeOk = (meta) => typeFilter === 'all' || meta.type === typeFilter

    const byCategory = {}
    for (const [cat, settings] of Object.entries(CURA_SETTINGS_SCHEMA)) {
      if (categoryFilter !== 'all' && categoryFilter !== cat) continue
      const items = Object.entries(settings)
        .filter(([key, meta]) => match(key, meta) && typeOk(meta))
      if (items.length) byCategory[cat] = items
    }
    return byCategory
  }, [query, typeFilter, categoryFilter])

  if (!isOpen) return null

  const handleValueChange = (key, meta, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }))
  }

  const renderInput = (key, meta) => {
    const val = localSettings[key]
    const error = validation.errors[key]
    switch (meta.type) {
      case 'boolean':
        return (
          <Toggle checked={!!val} onChange={(v) => handleValueChange(key, meta, v)} />
        )
      case 'enum':
        return (
          <select
            value={val ?? ''}
            onChange={(e) => handleValueChange(key, meta, e.target.value)}
            className={`w-full px-2 py-1 border rounded text-sm ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
          >
            <option value="">Select…</option>
            {(meta.options || []).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )
      case 'number':
        return (
          <div>
            <input
              type="number"
              step={meta.step ?? 'any'}
              min={meta.min}
              max={meta.max}
              value={val ?? ''}
              onChange={(e) => handleValueChange(key, meta, e.target.value === '' ? '' : Number(e.target.value))}
              className={`w-full px-2 py-1 border rounded text-sm ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            />
            {error && (
              <div className="mt-1 text-[11px] text-red-600 flex items-center"><AlertTriangle className="h-3 w-3 mr-1" /> {error}</div>
            )}
          </div>
        )
      default:
        return (
          <input
            type="text"
            value={val ?? ''}
            onChange={(e) => handleValueChange(key, meta, e.target.value)}
            className={`w-full px-2 py-1 border rounded text-sm ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
          />
        )
    }
  }

  const hasBlockingErrors = Object.keys(validation.errors).length > 0

  const saveProfile = () => {
    if (!profile) return
    if (hasBlockingErrors) return
    const updates = { settings: localSettings }
    updateProfile(activePrinter.id, profile.id, updates)
    if (onSave) onSave(updates)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white w-full h-full md:rounded-none overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">Edit Profile: {profile?.name}</h2>
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-2 top-2" />
                <input
                  className="pl-7 pr-2 py-1 border rounded text-sm w-64"
                  placeholder="Search settings…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border rounded text-sm px-2 py-1">
                <option value="all">All Categories</option>
                {Object.keys(CURA_SETTINGS_SCHEMA).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border rounded text-sm px-2 py-1">
                <option value="all">All Types</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="enum">Enum</option>
                <option value="string">String</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-xs text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Est factor: {validation.speed.estimates.estTimeFactor?.toFixed(2) ?? '-'}
            </div>
            <button onClick={onClose} className="px-3 py-1.5 bg-gray-100 rounded text-gray-700">Cancel</button>
            <button onClick={saveProfile} disabled={hasBlockingErrors} className={`px-3 py-1.5 rounded ${hasBlockingErrors ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}>Save</button>
          </div>
        </div>

        {/* Issue banners */}
        <div className="px-4 pt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Conflicts */}
          <div className="border rounded p-3">
            <div className="text-sm font-medium mb-2">Conflicts</div>
            {validation.conflicts.length === 0 ? (
              <div className="text-xs text-gray-500">No conflicts detected.</div>
            ) : (
              <ul className="space-y-1 text-xs">
                {validation.conflicts.map((c, i) => (
                  <li key={i} className="flex items-start"><AlertTriangle className="h-3 w-3 text-yellow-600 mr-1 mt-0.5" /> <span><strong>{c.key}</strong>: {c.message} {c.suggestion && (<em className="text-gray-600">({c.suggestion})</em>)}</span></li>
                ))}
              </ul>
            )}
          </div>
          {/* Strength */}
          <div className="border rounded p-3">
            <div className="text-sm font-medium mb-2">Strength Checks</div>
            {validation.strength.length === 0 ? (
              <div className="text-xs text-gray-500">No strength issues.</div>
            ) : (
              <ul className="space-y-1 text-xs">
                {validation.strength.map((s, i) => (
                  <li key={i} className="flex items-start"><AlertTriangle className="h-3 w-3 text-orange-600 mr-1 mt-0.5" /> <span><strong>{s.key}</strong>: {s.message} <em className="text-gray-600">({s.suggestion})</em></span></li>
                ))}
              </ul>
            )}
          </div>
          {/* Speed */}
          <div className="border rounded p-3">
            <div className="text-sm font-medium mb-2">Speed Hints</div>
            {validation.speed.hints.length === 0 ? (
              <div className="text-xs text-gray-500">No speed hints.</div>
            ) : (
              <ul className="space-y-1 text-xs">
                {validation.speed.hints.map((h, i) => (
                  <li key={i} className="flex items-start"><AlertTriangle className="h-3 w-3 text-blue-600 mr-1 mt-0.5" /> <span><strong>{h.key}</strong>: {h.message} <em className="text-gray-600">({h.suggestion})</em></span></li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-[calc(100%-200px)] overflow-auto">
          {Object.entries(filteredEntries).length === 0 ? (
            <div className="text-center text-gray-500">No settings match your filters.</div>
          ) : (
            Object.entries(filteredEntries).map(([cat, items]) => (
              <div key={cat} className="mb-6">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{cat}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map(([key, meta]) => (
                    <div key={key} className={`border rounded p-3 hover:shadow-sm transition ${validation.errors[key] ? 'border-red-300' : 'border-gray-200'}`}>
                      <div className="flex items-start justify-between">
                        <div className="mr-2">
                          <div className="text-sm font-medium text-gray-900">{meta.label || key}</div>
                          {meta.description && (
                            <div className="text-xs text-gray-600 mt-0.5">{meta.description}</div>
                          )}
                          {meta.recommend && (
                            <div className="text-[11px] text-gray-500 mt-1">
                              {Object.entries(meta.recommend).map(([k,v]) => (
                                <span key={k} className="mr-2">{k}: <span className="text-gray-800">{String(v)}</span></span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        {renderInput(key, meta)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileEditor
