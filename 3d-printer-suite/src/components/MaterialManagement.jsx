import React, { useMemo, useState } from 'react'
import { Plus, Edit, Trash2, Upload, Download, Link2, CheckCircle } from 'lucide-react'
import { useGetActivePrinter, useMaterialActions, useProfileActions } from '../hooks/useStoreSelectors'
import { MATERIAL_TEMPLATES, parseCuraMaterial } from '../utils/materialsDB'

const MaterialManagement = () => {
  const getActivePrinter = useGetActivePrinter()
  const { addMaterial, updateMaterial, deleteMaterial } = useMaterialActions()
  const { updateProfile, setProfileMaterial } = useProfileActions()
  const activePrinter = getActivePrinter()

  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', type: 'PLA', properties: {}, recommendedSettings: {} })
  const [importResult, setImportResult] = useState(null)

  if (!activePrinter) return <div className="p-6 text-gray-500">No printer selected</div>

  const materials = activePrinter.slicerProfiles?.materials || []
  const profiles = activePrinter.slicerProfiles?.profiles || []
  const activeProfile = profiles.find(p => p.isActive)

  const startFromTemplate = (tpl) => {
    setForm({ name: tpl.name, type: tpl.type, properties: { ...tpl.properties }, recommendedSettings: { ...tpl.recommendedSettings } })
    setShowCreate(true)
  }

  const saveMaterial = () => {
    if (!form.name.trim()) return alert('Name is required')
    if (editing) {
      updateMaterial(activePrinter.id, editing.id, form)
      setEditing(null)
    } else {
      addMaterial(activePrinter.id, form)
    }
    setShowCreate(false)
    setForm({ name: '', type: 'PLA', properties: {}, recommendedSettings: {} })
  }

  const handleImport = async (e) => {
    const files = Array.from(e.target.files || [])
    const results = { total: files.length, success: 0, failed: 0 }
    for (const f of files) {
      try {
        const text = await f.text()
        const mat = parseCuraMaterial(text, f.name)
        if (mat) {
          addMaterial(activePrinter.id, mat)
          results.success += 1
        } else {
          results.failed += 1
        }
      } catch (err) {
        results.failed += 1
      }
    }
    setImportResult(results)
  }

  const exportMaterial = (mat) => {
    const data = JSON.stringify(mat, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mat.name.replace(/\s+/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const linkToActiveProfile = (materialId) => {
    if (!activeProfile) return alert('No active profile to link')
    setProfileMaterial(activePrinter.id, activeProfile.id, materialId, true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Materials</h2>
          <p className="text-gray-600 text-sm">Manage filament materials and link to profiles</p>
        </div>
        <div className="flex items-center space-x-2">
          <input type="file" accept=".json" multiple className="hidden" id="mat-import" onChange={handleImport} />
          <label htmlFor="mat-import" className="px-3 py-2 bg-green-600 text-white rounded cursor-pointer flex items-center"><Upload className="h-4 w-4 mr-1" /> Import</label>
          <button onClick={() => startFromTemplate(MATERIAL_TEMPLATES[0])} className="px-3 py-2 bg-blue-600 text-white rounded flex items-center"><Plus className="h-4 w-4 mr-1" /> New</button>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-white border rounded">
        <div className="px-4 py-2 border-b text-sm font-medium text-gray-700">Templates</div>
        <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {MATERIAL_TEMPLATES.map(tpl => (
            <div key={tpl.id} className="border rounded p-3">
              <div className="font-medium">{tpl.name}</div>
              <div className="text-xs text-gray-600">Tg: {tpl.properties.glass_transition}°C • Density: {tpl.properties.density} g/cm³</div>
              <button onClick={() => startFromTemplate(tpl)} className="mt-2 text-blue-600 text-sm">Use Template</button>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="bg-white border rounded overflow-hidden">
        <div className="px-4 py-2 border-b text-sm font-medium text-gray-700">Materials ({materials.length})</div>
        <div className="divide-y">
          {materials.map(mat => (
            <div key={mat.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{mat.name} <span className="ml-2 text-xs text-gray-500">{mat.type}</span></div>
                <div className="text-xs text-gray-600">Print: {mat.recommendedSettings.material_print_temperature}°C • Bed: {mat.recommendedSettings.material_bed_temperature}°C</div>
              </div>
              <div className="flex items-center space-x-2">
                {activeProfile?.materialId === mat.id && (
                  <span className="text-green-700 text-xs inline-flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Linked</span>
                )}
                <button onClick={() => exportMaterial(mat)} className="text-gray-700 px-2 py-1"><Download className="h-4 w-4" /></button>
                <button onClick={() => { setEditing(mat); setForm({ name: mat.name, type: mat.type, properties: { ...mat.properties }, recommendedSettings: { ...mat.recommendedSettings } }); setShowCreate(true) }} className="text-blue-700 px-2 py-1"><Edit className="h-4 w-4" /></button>
                <button onClick={() => linkToActiveProfile(mat.id)} className="text-indigo-700 px-2 py-1"><Link2 className="h-4 w-4" /></button>
                <button onClick={() => deleteMaterial(activePrinter.id, mat.id)} className="text-red-700 px-2 py-1"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-full max-w-lg">
            <div className="text-lg font-medium mb-2">{editing ? 'Edit Material' : 'New Material'}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full px-2 py-1 border rounded" />
              </div>
              <div>
                <label className="text-xs text-gray-600">Type</label>
                <select value={form.type} onChange={(e)=>setForm({...form, type: e.target.value})} className="w-full px-2 py-1 border rounded">
                  <option>PLA</option>
                  <option>PETG</option>
                  <option>ABS</option>
                  <option>TPU</option>
                  <option>Nylon</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Print Temp (°C)</label>
                <input type="number" value={form.recommendedSettings.material_print_temperature ?? ''} onChange={(e)=>setForm({...form, recommendedSettings: {...form.recommendedSettings, material_print_temperature: Number(e.target.value)}})} className="w-full px-2 py-1 border rounded" />
              </div>
              <div>
                <label className="text-xs text-gray-600">Bed Temp (°C)</label>
                <input type="number" value={form.recommendedSettings.material_bed_temperature ?? ''} onChange={(e)=>setForm({...form, recommendedSettings: {...form.recommendedSettings, material_bed_temperature: Number(e.target.value)}})} className="w-full px-2 py-1 border rounded" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Notes</label>
                <textarea value={form.properties.notes || ''} onChange={(e)=>setForm({...form, properties: { ...form.properties, notes: e.target.value}})} className="w-full px-2 py-1 border rounded min-h-[60px]" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={()=>{setShowCreate(false); setEditing(null)}} className="px-3 py-1.5 bg-gray-100 rounded">Cancel</button>
              <button onClick={saveMaterial} className="px-3 py-1.5 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {importResult && (
        <div className="text-xs text-gray-600">Imported {importResult.success}/{importResult.total} (failed {importResult.failed})</div>
      )}
    </div>
  )
}

export default MaterialManagement
