import React, { useState } from 'react'
import { 
  Plus, 
  Download, 
  Upload, 
  Copy, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Circle,
  Settings,
  FileText,
  Palette,
  GitCompare,
  Star,
  Zap,
  Clock,
  Wand2
} from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import ImportProfilesModal from './ImportProfilesModal'
import ProfileEditor from './ProfileEditor'
import ProfileDiffModal from './ProfileDiffModal'
import TemplateModal from './TemplateModal'
import QuickPresets from './QuickPresets'
import OptimizationWizard from './OptimizationWizard'
import ProfileHistory from './ProfileHistory'
import { exportProfilesToDownloads, buildCuraCfg } from '../utils/curaExporter'
import { applyTemplate } from '../data/profileTemplates'

const ProfileManagement = () => {
  const { 
    getActivePrinter, 
    addProfile, 
    updateProfile, 
    deleteProfile, 
    duplicateProfile, 
    setActiveProfile,
    updateCuraPath 
  } = usePrintersStore()

  const activePrinter = getActivePrinter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [showDiff, setShowDiff] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [wizardType, setWizardType] = useState(null)
  const [historyProfile, setHistoryProfile] = useState(null)
  const [diffLeft, setDiffLeft] = useState(null)
  const [diffRight, setDiffRight] = useState(null)
  const [editingProfile, setEditingProfile] = useState(null)
  const [editorProfile, setEditorProfile] = useState(null)
  const [newProfile, setNewProfile] = useState({
    name: '',
    type: 'quality',
    settings: {}
  })

  if (!activePrinter) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No printer selected</p>
      </div>
    )
  }

  const profiles = activePrinter.slicerProfiles?.profiles || []
  const activeProfile = profiles.find(p => p.isActive)

  const handleCreateProfile = () => {
    if (!newProfile.name.trim()) {
      alert('Profile name is required')
      return
    }

    const existingProfile = profiles.find(p => p.name.toLowerCase() === newProfile.name.toLowerCase())
    if (existingProfile) {
      alert('A profile with this name already exists')
      return
    }

    addProfile(activePrinter.id, newProfile)
    setNewProfile({ name: '', type: 'quality', settings: {} })
    setShowCreateModal(false)
  }

  const handleEditProfile = () => {
    if (!editingProfile.name.trim()) {
      alert('Profile name is required')
      return
    }

    const existingProfile = profiles.find(p => 
      p.name.toLowerCase() === editingProfile.name.toLowerCase() && 
      p.id !== editingProfile.id
    )
    if (existingProfile) {
      alert('A profile with this name already exists')
      return
    }

    updateProfile(activePrinter.id, editingProfile.id, editingProfile)
    setEditingProfile(null)
    setShowEditModal(false)
  }

  const handleDeleteProfile = (profileId) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(activePrinter.id, profileId)
    }
  }

  const handleDuplicateProfile = (profileId) => {
    duplicateProfile(activePrinter.id, profileId)
  }

  const handleSetActiveProfile = (profileId) => {
    setActiveProfile(activePrinter.id, profileId)
  }

  const openEditor = (profile) => {
    setEditorProfile(profile)
    setShowEditor(true)
  }

  const exportAll = () => {
    exportProfilesToDownloads(profiles)
  }

  const exportSingle = (profile) => {
    exportProfilesToDownloads([profile])
  }

  const openDiff = (left, right) => {
    setDiffLeft(left)
    setDiffRight(right)
    setShowDiff(true)
  }

  const mergeDiff = (updates) => {
    if (!diffLeft || !diffRight) return
    updateProfile(activePrinter.id, diffLeft.id, { settings: { ...diffLeft.settings, ...updates }, source: 'merge' })
    setShowDiff(false)
  }

  const handleApplyTemplate = (templateId, template) => {
    if (!activeProfile) {
      alert('Please select an active profile first')
      return
    }
    const newSettings = applyTemplate(templateId, activeProfile.settings)
    updateProfile(activePrinter.id, activeProfile.id, { settings: newSettings, source: 'template' })
    setShowTemplate(false)
  }

  const handlePresetApply = (newSettings, presetId) => {
    if (!activeProfile) {
      alert('Please select an active profile first')
      return
    }
    updateProfile(activePrinter.id, activeProfile.id, { settings: newSettings, source: 'preset' })
  }

  const handleWizardApply = (newSettings) => {
    if (!activeProfile) {
      alert('Please select an active profile first')
      return
    }
    updateProfile(activePrinter.id, activeProfile.id, { settings: newSettings, source: 'wizard' })
    setShowWizard(false)
  }

  const openHistory = (profile) => {
    setHistoryProfile(profile)
    setShowHistory(true)
  }

  const openWizard = (type) => {
    if (!activeProfile) {
      alert('Please select an active profile first')
      return
    }
    setWizardType(type)
    setShowWizard(true)
  }

  const syncFromFolder = async (e) => {
    // Simple folder pick compares .cfg names to profiles by filename
    const files = Array.from(e.target.files || [])
    const cfgFiles = files.filter(f => /\.cfg$/i.test(f.name))
    const imported = []
    for (const f of cfgFiles) {
      const text = await f.text()
      // naive find matching profile by name
      const name = f.name.replace(/\.cfg$/i, '')
      const existing = profiles.find(p => p.name.toLowerCase() === name.toLowerCase())
      if (existing) {
        // Offer diff
        const parsed = { ...existing, name, settings: parseCfgValues(text) }
        openDiff(existing, parsed)
        imported.push({ name, action: 'diff' })
      }
    }
  }

  function parseCfgValues(content) {
    const result = {}
    const lines = content.split(/\r?\n/)
    let inValues = false
    for (const line of lines) {
      const t = line.trim()
      if (t === '[values]') { inValues = true; continue }
      if (/^\[/.test(t)) { inValues = false; continue }
      if (!inValues) continue
      const m = t.match(/^(.*?)=(.*)$/)
      if (m) {
        const key = m[1].trim()
        const value = m[2].trim()
        result[key] = coerce(value)
      }
    }
    return result
  }

  function coerce(v) {
    if (/^(true|false)$/i.test(v)) return /^true$/i.test(v)
    if (/^[+-]?\d+(\.\d+)?$/.test(v)) return Number(v)
    if (v.includes(',') && !v.includes(' ')) return v.split(',').map(s=>s.trim())
    return v
  }

  const getProfileTypeIcon = (type) => {
    switch (type) {
      case 'quality':
        return <Settings className="h-4 w-4" />
      case 'material':
        return <Palette className="h-4 w-4" />
      case 'print':
        return <FileText className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getProfileTypeColor = (type) => {
    switch (type) {
      case 'quality':
        return 'bg-blue-100 text-blue-800'
      case 'material':
        return 'bg-green-100 text-green-800'
      case 'print':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>
          <p className="text-gray-600">Manage slicer profiles for {activePrinter.name}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create New</span>
          </button>
          
          <button
            onClick={() => setShowTemplate(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Star className="h-4 w-4" />
            <span>From Template</span>
          </button>
          
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </button>
          
          <button
            onClick={exportAll}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
          
          <input type="file" id="sync-folder" className="hidden" webkitdirectory="true" directory="true" multiple onChange={syncFromFolder} />
          <label htmlFor="sync-folder" className="px-3 py-2 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200 transition-colors">Sync Folder</label>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <ImportProfilesModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImported={() => setShowImportModal(false)}
        />
      )}

      {/* Template Modal */}
      {showTemplate && (
        <TemplateModal
          isOpen={showTemplate}
          onClose={() => setShowTemplate(false)}
          onApplyTemplate={handleApplyTemplate}
        />
      )}

      {/* Optimization Wizard */}
      {showWizard && wizardType && (
        <OptimizationWizard
          isOpen={showWizard}
          onClose={() => setShowWizard(false)}
          wizardId={`optimize-${wizardType}`}
          currentSettings={activeProfile?.settings || {}}
          onApplyChanges={handleWizardApply}
        />
      )}

      {/* Profile History */}
      {showHistory && historyProfile && (
        <ProfileHistory
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          profile={{ ...historyProfile, printerId: activePrinter.id }}
        />
      )}

      {/* Diff Modal */}
      {showDiff && diffLeft && diffRight && (
        <ProfileDiffModal
          isOpen={showDiff}
          onClose={() => setShowDiff(false)}
          leftProfile={diffLeft}
          rightProfile={diffRight}
          onMerge={mergeDiff}
        />
      )}

      {/* Quick Actions Section */}
      {activeProfile && (
        <div className="space-y-4">
          {/* Active Profile Indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Active Profile</h3>
                  <p className="text-green-700">{activeProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openHistory(activeProfile)} 
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                >
                  <Clock className="h-4 w-4" />
                  <span>History</span>
                </button>
                <button 
                  onClick={() => exportSingle(activeProfile)} 
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Optimization Wizards */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Optimization Wizards</h3>
              <Wand2 className="h-4 w-4 text-purple-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => openWizard('strength')}
                className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors"
              >
                <span>💪</span>
                <span className="text-sm font-medium">Strength</span>
              </button>
              <button
                onClick={() => openWizard('speed')}
                className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100 transition-colors"
              >
                <span>⚡</span>
                <span className="text-sm font-medium">Speed</span>
              </button>
              <button
                onClick={() => openWizard('quality')}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
              >
                <span>✨</span>
                <span className="text-sm font-medium">Quality</span>
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <QuickPresets 
            currentSettings={activeProfile.settings || {}}
            onApplyPreset={handlePresetApply}
          />
        </div>
      )}

      {/* Profiles List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Profiles ({profiles.length})</h3>
        </div>
        
        {profiles.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No profiles created yet</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Profile
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {profiles.map((profile) => (
              <div key={profile.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {profile.isActive ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProfileTypeColor(profile.type)}`}>
                        {getProfileTypeIcon(profile.type)}
                        <span className="ml-1">{profile.type}</span>
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{profile.name}</h4>
                      <p className="text-sm text-gray-500">
                        Last modified: {formatDate(profile.updatedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openHistory(profile)} className="text-gray-700 p-2" title="View History"><Clock className="h-4 w-4" /></button>
                    <button onClick={()=>exportSingle(profile)} className="text-gray-700 p-2" title="Export"><Download className="h-4 w-4" /></button>
                    <button
                      onClick={() => openDiff(activeProfile || profiles[0], profile)}
                      className="text-indigo-600 p-2"
                      title="Compare"
                    >
                      <GitCompare className="h-4 w-4" />
                    </button>
                    {!profile.isActive && (
                      <button
                        onClick={() => handleSetActiveProfile(profile.id)}
                        className="text-green-600 hover:text-green-700 p-2"
                        title="Set as active"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDuplicateProfile(profile.id)}
                      className="text-blue-600 hover:text-blue-700 p-2"
                      title="Duplicate profile"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => openEditor(profile)}
                      className="text-indigo-600 hover:text-indigo-700 p-2"
                      title="Open editor"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete profile"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showEditor && editorProfile && (
        <ProfileEditor
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          profile={editorProfile}
          onSave={() => setShowEditor(false)}
        />
      )}

      {/* Diff Modal */}
      {showDiff && diffLeft && diffRight && (
        <ProfileDiffModal
          isOpen={showDiff}
          onClose={() => setShowDiff(false)}
          leftProfile={diffLeft}
          rightProfile={diffRight}
          onMerge={mergeDiff}
        />
      )}

      {/* Create Profile Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Name
                </label>
                <input
                  type="text"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter profile name"
                />
              </div>
              
              <div>
                <label className="block text sm font-medium text-gray-700 mb-1">
                  Profile Type
                </label>
                <select
                  value={newProfile.type}
                  onChange={(e) => setNewProfile({ ...newProfile, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="quality">Quality Profile</option>
                  <option value="material">Material Profile</option>
                  <option value="print">Print Profile</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && editingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Name
                </label>
                <input
                  type="text"
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter profile name"
                />
              </div>
              
              <div>
                <label className="block text sm font-medium text-gray-700 mb-1">
                  Profile Type
                </label>
                <select
                  value={editingProfile.type}
                  onChange={(e) => setEditingProfile({ ...editingProfile, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="quality">Quality Profile</option>
                  <option value="material">Material Profile</option>
                  <option value="print">Print Profile</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileManagement
