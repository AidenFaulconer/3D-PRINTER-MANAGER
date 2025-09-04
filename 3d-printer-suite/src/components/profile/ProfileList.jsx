import React, { useState, useCallback } from 'react'
import { 
  Plus, 
  FolderUp, 
  Trash2, 
  Copy, 
  Check, 
  Star,
  Download,
  Upload,
  Settings
} from 'lucide-react'
import usePrintersStore from '../../stores/printersStore'
import ProfileDialog from './ProfileDialog'

const ProfileList = React.memo(function ProfileList() {
  const [showDialog, setShowDialog] = useState(false)
  const [editingProfile, setEditingProfile] = useState(null)
  const [selectedProfiles, setSelectedProfiles] = useState(new Set())
  
  const { profiles, addProfile, updateProfile, deleteProfile, importProfiles } = usePrintersStore(state => ({
    profiles: state.profiles,
    addProfile: state.addProfile,
    updateProfile: state.updateProfile,
    deleteProfile: state.deleteProfile,
    importProfiles: state.importProfiles
  }))

  const handleImportFromFolder = async () => {
    try {
      // Open folder picker
      const dirHandle = await window.showDirectoryPicker({
        mode: 'read'
      })

      const newProfiles = []
      
      // Recursively process files
      async function processDirectory(handle) {
        for await (const entry of handle.values()) {
          if (entry.kind === 'file') {
            if (entry.name.endsWith('.json') || entry.name.endsWith('.cfg')) {
              const file = await entry.getFile()
              const content = await file.text()
              
              try {
                // Try parsing as JSON first
                let profile = JSON.parse(content)
                
                // Basic validation
                if (profile.name && profile.settings) {
                  newProfiles.push({
                    ...profile,
                    id: crypto.randomUUID(),
                    importedFrom: file.name,
                    importedAt: new Date().toISOString()
                  })
                }
              } catch (e) {
                // If JSON parse fails, try parsing as Cura config
                try {
                  const profile = parseCuraConfig(content)
                  if (profile) {
                    newProfiles.push({
                      id: crypto.randomUUID(),
                      name: entry.name.replace(/\.[^/.]+$/, ""),
                      settings: profile,
                      importedFrom: file.name,
                      importedAt: new Date().toISOString()
                    })
                  }
                } catch (e) {
                  console.warn(`Failed to parse ${file.name}:`, e)
                }
              }
            }
          } else if (entry.kind === 'directory') {
            await processDirectory(entry)
          }
        }
      }

      await processDirectory(dirHandle)
      
      if (newProfiles.length > 0) {
        importProfiles(newProfiles)
      }
    } catch (e) {
      console.error('Import failed:', e)
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProfiles(new Set(profiles.map(p => p.id)))
    } else {
      setSelectedProfiles(new Set())
    }
  }

  const handleSelectProfile = (profileId) => {
    setSelectedProfiles(prev => {
      const next = new Set(prev)
      if (next.has(profileId)) {
        next.delete(profileId)
      } else {
        next.add(profileId)
      }
      return next
    })
  }

  const handleDeleteSelected = () => {
    if (confirm(`Delete ${selectedProfiles.size} selected profiles?`)) {
      selectedProfiles.forEach(id => deleteProfile(id))
      setSelectedProfiles(new Set())
    }
  }

  const handleDuplicateSelected = () => {
    selectedProfiles.forEach(id => {
      const profile = profiles.find(p => p.id === id)
      if (profile) {
        addProfile({
          ...profile,
          id: crypto.randomUUID(),
          name: `${profile.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
    })
    setSelectedProfiles(new Set())
  }

  const handleExportSelected = () => {
    const selectedProfileData = profiles
      .filter(p => selectedProfiles.has(p.id))
      .map(p => ({
        name: p.name,
        settings: p.settings,
        type: p.type,
        materialId: p.materialId,
        exportedAt: new Date().toISOString()
      }))

    const blob = new Blob([JSON.stringify(selectedProfileData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'profiles.json'
    a.click()
    URL.revokeObjectURL(url)
    setSelectedProfiles(new Set())
  }

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingProfile(null)
              setShowDialog(true)
            }}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Profile
          </button>
          <button
            onClick={handleImportFromFolder}
            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <FolderUp size={16} />
            Import from Folder
          </button>
        </div>

        {selectedProfiles.size > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDuplicateSelected}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Copy size={16} />
              Duplicate
            </button>
            <button
              onClick={handleExportSelected}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-100 text-red-700 px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Profiles Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedProfiles.size === profiles.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProfiles.has(profile.id)}
                      onChange={() => handleSelectProfile(profile.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex items-center gap-2">
                      {profile.isActive && (
                        <Star size={16} className="text-yellow-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {profile.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{profile.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {profile.materialId ? 'Material Name' : 'None'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingProfile(profile)
                        setShowDialog(true)
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Settings size={16} />
                    </button>
                    <button
                      onClick={() => {
                        const newProfile = {
                          ...profile,
                          id: crypto.randomUUID(),
                          name: `${profile.name} (Copy)`,
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString()
                        }
                        addProfile(newProfile)
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this profile?')) {
                          deleteProfile(profile.id)
                        }
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Dialog */}
      <ProfileDialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false)
          setEditingProfile(null)
        }}
        initialData={editingProfile}
      />
    </div>
  )
})

export default ProfileList
