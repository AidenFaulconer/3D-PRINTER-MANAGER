import React, { useMemo, useState } from 'react'
import { GCODES, GCODES_BY_CATEGORY } from '../data/gcodeReference'
import usePrintersStore from '../stores/printersStore'
import { Plus, Star, StarOff, FolderPlus, Save } from 'lucide-react'

const GcodeHelperPanel = ({ onInsert, onClose }) => {
  const { getActivePrinter, addMacro, updateMacro } = usePrintersStore()
  const printer = getActivePrinter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [newMacro, setNewMacro] = useState({ name: '', description: '', commands: '' })

  const categories = ['All', ...Object.keys(GCODES_BY_CATEGORY)]

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GCODES.filter(g => {
      const matchesQuery = !q ||
        g.code.toLowerCase().includes(q) ||
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || g.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  const insertCmd = (g) => {
    onInsert(g.examples?.[0] || g.code)
  }

  const saveMacro = () => {
    if (!newMacro.name.trim() || !newMacro.commands.trim()) return
    const commands = newMacro.commands.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    addMacro(printer.id, { name: newMacro.name.trim(), description: newMacro.description.trim(), commands })
    setNewMacro({ name: '', description: '', commands: '' })
  }

  const toggleFavorite = (m) => {
    updateMacro(printer.id, m.id, { isFavorite: !m.isFavorite })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-3xl rounded-t-lg md:rounded-lg overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
          <div className="font-semibold text-gray-900">G-code Reference</div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search / Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              placeholder="Search commands…"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="text-sm text-gray-600 flex items-center">{results.length} results</div>
          </div>

          {/* Results */}
          <div className="max-h-64 overflow-auto border border-gray-200 rounded divide-y">
            {results.map(g => (
              <div key={g.code + g.name} className="p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{g.code} — {g.name}</div>
                  <button onClick={()=>insertCmd(g)} className="text-blue-600 text-sm">Insert</button>
                </div>
                <div className="text-xs text-gray-500">{g.category}</div>
                <div className="text-sm text-gray-700 mt-1">{g.description}</div>
                {g.params && g.params.length > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-medium">Params:</span>{' '}
                    {g.params.map(p => `${p.key} (${p.desc})`).join(', ')}
                  </div>
                )}
                {g.examples && g.examples.length > 0 && (
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500">Examples:</span>{' '}
                    {g.examples.map((ex, i) => (
                      <button key={i} onClick={()=>onInsert(ex)} className="text-indigo-600 hover:underline ml-2">{ex}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {results.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No commands match your search.</div>
            )}
          </div>

          {/* Macros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium text-gray-900 mb-2">Macros</div>
              <div className="border border-gray-200 rounded divide-y max-h-48 overflow-auto">
                {(printer.macros || []).map(m => (
                  <div key={m.id} className="p-3 flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {m.name}
                        <button onClick={()=>toggleFavorite(m)} className="text-yellow-600">
                          {m.isFavorite ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                        </button>
                      </div>
                      {m.description && <div className="text-xs text-gray-600">{m.description}</div>}
                      {m.commands?.length > 0 && (
                        <div className="mt-2 text-xs text-gray-700">
                          {m.commands.slice(0,3).map((c,i) => <div key={i} className="font-mono">{c}</div>)}
                          {m.commands.length > 3 && <div className="text-gray-400">+{m.commands.length-3} more…</div>}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 text-sm" onClick={()=>m.commands.forEach(c => onInsert(c))}>Insert</button>
                    </div>
                  </div>
                ))}
                {(printer.macros || []).length === 0 && (
                  <div className="p-4 text-sm text-gray-500">No macros saved yet.</div>
                )}
              </div>
            </div>

            <div>
              <div className="font-medium text-gray-900 mb-2">Create Macro</div>
              <div className="space-y-2">
                <input
                  placeholder="Macro name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newMacro.name}
                  onChange={(e)=>setNewMacro({...newMacro, name: e.target.value})}
                />
                <input
                  placeholder="Description (optional)"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newMacro.description}
                  onChange={(e)=>setNewMacro({...newMacro, description: e.target.value})}
                />
                <textarea
                  placeholder={"Commands (one per line)\nExample:\nG28\nM104 S200\nM109 S200"}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-28 font-mono text-sm"
                  value={newMacro.commands}
                  onChange={(e)=>setNewMacro({...newMacro, commands: e.target.value})}
                />
                <div className="flex items-center justify-end">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={saveMacro}><Save className="h-4 w-4 inline mr-1"/> Save Macro</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GcodeHelperPanel
