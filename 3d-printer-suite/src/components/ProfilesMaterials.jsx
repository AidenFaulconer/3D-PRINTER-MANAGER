import React, { useState } from 'react'
import { FileText, FlaskConical } from 'lucide-react'
import ProfileManagement from './ProfileManagement'
import MaterialManagement from './MaterialManagement'

const ProfilesMaterials = () => {
  const [activeTab, setActiveTab] = useState('profiles') // 'profiles' | 'materials'

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profiles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Profiles
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'materials' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FlaskConical className="h-4 w-4 inline mr-2" />
            Materials
          </button>
        </nav>
      </div>

      {activeTab === 'profiles' ? (
        <ProfileManagement />
      ) : (
        <MaterialManagement />
      )}
    </div>
  )
}

export default ProfilesMaterials
