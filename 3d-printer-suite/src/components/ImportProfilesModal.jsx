import React, { useEffect, useMemo, useState } from 'react'
import { FolderOpen, FileText, AlertTriangle, CheckCircle, X, Loader2 } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import { parseCuraProfile } from '../utils/curaParser'

// Helper to read files from input directory handle (WebKitDirectory or standard file input)
function groupByDirectory(fileList) {
  const files = Array.from(fileList || [])
  const byDir = {}
  files.forEach(f => {
    const path = f.webkitRelativePath || f.name
    const dir = path.includes('/') ? path.split('/').slice(0, -1).join('/') : ''
    if (!byDir[dir]) byDir[dir] = []
    byDir[dir].push(f)
  })
  return byDir
}

const isProfileFile = (name) => /\.(cfg|curaprofile)$/i.test(name)

const ImportProfilesModal = ({ isOpen, onClose, onImported }) => {
  const { getActivePrinter, addProfile } = usePrintersStore()
  const activePrinter = getActivePrinter()

  const [files, setFiles] = useState([])
  const [selectedMap, setSelectedMap] = useState({})
  const [preview, setPreview] = useState(null)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setFiles([])
      setSelectedMap({})
      setPreview(null)
      setLoadingPreview(false)
      setImporting(false)
      setImportResult(null)
      setError('')
    }
  }, [isOpen])

  const selectableFiles = useMemo(() => files.filter(f => isProfileFile(f.name)), [files])
  const selectedFiles = useMemo(() => selectableFiles.filter(f => !!selectedMap[f.name]), [selectableFiles, selectedMap])

  const handleFolderPick = (e) => {
    const picked = Array.from(e.target.files || [])
    setFiles(picked)
  }

  const handleToggle = (file) => {
    setSelectedMap(prev => ({ ...prev, [file.name]: !prev[file.name] }))
  }

  const handlePreview = async (file) => {
    try {
      setLoadingPreview(true)
      const text = await file.text()
      const parsed = parseCuraProfile(text, file.name)
      setPreview({ file, parsed })
    } catch (err) {
      setError('Failed to load preview')
    } finally {
      setLoadingPreview(false)
    }
  }

  const importSelected = async () => {
    if (!activePrinter) return
    if (selectedFiles.length === 0) {
      setError('Select at least one profile to import')
      return
    }

    setError('')
    setImporting(true)
    const results = { total: selectedFiles.length, success: 0, failed: 0, details: [] }

    for (const file of selectedFiles) {
      try {
        const text = await file.text()
        const parsed = parseCuraProfile(text, file.name)

        // Map to internal structure
        const profileData = {
          name: parsed.name,
          type: parsed.type,
          settings: parsed.settings,
          isActive: false
        }

        // Name uniqueness: append suffix if exists
        const existing = activePrinter.slicerProfiles?.profiles || []
        let finalName = profileData.name
        let counter = 1
        while (existing.some(p => p.name.toLowerCase() === finalName.toLowerCase())) {
          finalName = `${profileData.name} (${counter})`
          counter += 1
        }

        await addProfile(activePrinter.id, { ...profileData, name: finalName })
        results.success += 1
        results.details.push({ file: file.name, status: 'ok' })
      } catch (err) {
        results.failed += 1
        results.details.push({ file: file.name, status: 'error', message: String(err?.message || err) })
      }
    }

    setImportResult(results)
    setImporting(false)
    if (onImported) onImported(results)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Import Cura Profiles</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Folder pick and file list */}
          <div className="md:col-span-2">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Cura profiles folder</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  webkitdirectory="true"
                  directory="true"
                  multiple
                  onChange={handleFolderPick}
                  className="hidden"
                  id="cura-folder-input"
                  accept=".cfg,.curaprofile"
                />
                <label
                  htmlFor="cura-folder-input"
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  <FolderOpen className="h-4 w-4 mr-2" /> Browse Folder
                </label>
                <span className="text-xs text-gray-500">Tip: AppData/Roaming/cura/<i>version</i>/quality</span>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 border-b">Found Files ({selectableFiles.length})</div>
              <div className="max-h-64 overflow-auto divide-y">
                {selectableFiles.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">No .cfg or .curaprofile files found</div>
                ) : (
                  selectableFiles.map((file) => (
                    <div key={file.name} className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={!!selectedMap[file.name]}
                          onChange={() => handleToggle(file)}
                        />
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-800">{file.name}</span>
                      </div>
                      <button
                        onClick={() => handlePreview(file)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Preview
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Import Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-500">
                Selected: {selectedFiles.length}
              </div>
              <button
                onClick={importSelected}
                disabled={importing || selectedFiles.length === 0}
                className={`px-4 py-2 rounded-md text-white ${importing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {importing ? (
                  <span className="inline-flex items-center"><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing...</span>
                ) : (
                  'Import Selected'
                )}
              </button>
            </div>

            {/* Import result */}
            {importResult && (
              <div className="mt-3 p-3 border rounded-md bg-gray-50 text-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Imported {importResult.success} of {importResult.total} ({importResult.failed} failed)</span>
                </div>
                <div className="max-h-32 overflow-auto divide-y">
                  {importResult.details.map((r, idx) => (
                    <div key={idx} className="py-1 flex items-center justify-between">
                      <span className="text-gray-800">{r.file}</span>
                      <span className={`text-xs ${r.status === 'ok' ? 'text-green-700' : 'text-red-700'}`}>
                        {r.status === 'ok' ? 'OK' : `Error: ${r.message || 'Malformed'}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-3 p-2 bg-red-50 text-red-700 text-sm rounded border border-red-200 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" /> {error}
              </div>
            )}
          </div>

          {/* Right: Preview */}
          <div className="md:col-span-1">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 border-b flex items-center justify-between">
                <span>Preview</span>
                {loadingPreview && <Loader2 className="h-4 w-4 animate-spin text-gray-500" />}
              </div>
              <div className="max-h-96 overflow-auto p-3 text-xs">
                {!preview ? (
                  <div className="text-gray-500">Select a profile and click Preview.</div>
                ) : (
                  <div>
                    <div className="font-medium text-gray-900 mb-2">{preview.parsed.name} <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{preview.parsed.type}</span></div>
                    <div className="text-gray-600 mb-2">{preview.file.name}</div>
                    <div className="space-y-2">
                      {Object.entries(preview.parsed.settings).slice(0, 50).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-gray-700 mr-2 truncate">{k}</span>
                          <span className="text-gray-500 max-w-[60%] truncate">{String(Array.isArray(v) ? v.join(',') : v)}</span>
                        </div>
                      ))}
                      {Object.keys(preview.parsed.settings).length > 50 && (
                        <div className="text-gray-400">…and more</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Close</button>
        </div>
      </div>
    </div>
  )
}

export default ImportProfilesModal
