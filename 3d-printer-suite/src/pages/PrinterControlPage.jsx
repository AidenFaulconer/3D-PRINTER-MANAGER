import React, { useState } from 'react'
import { Tabs, TabList, Tab, TabPanel } from '@reach/tabs'
import PrintQueueManager from '../components/PrintQueueManager'
import FileManager from '../components/FileManager'
import { GcodeViewer3D } from '../components/GcodeViewer3D'
import PrintMonitorDashboard from '../components/PrintMonitorDashboard'
import CalibrationWorkflow from '../components/CalibrationWorkflow'
import PrintTemplates from '../components/PrintTemplates'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'

const PrinterControlPage = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">3D Printer Suite</h1>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs className="space-y-6">
        <TabList className="flex space-x-4 border-b border-gray-200">
          <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300">
            Print Monitor
          </Tab>
          <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300">
            File Management
          </Tab>
          <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300">
            Queue
          </Tab>
          <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300">
            Calibration
          </Tab>
          <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300">
            Templates
          </Tab>
        </TabList>

        {/* Print Monitor Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <PrintMonitorDashboard />
            </div>
            <div className="space-y-6">
              {selectedFile && (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">3D Preview</h3>
                  <GcodeViewer3D
                    content={selectedFile.content}
                    width="100%"
                    height={400}
                  />
                </div>
              )}
            </div>
          </div>
        </TabPanel>

        {/* File Management Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <FileManager onFileSelect={setSelectedFile} />
            </div>
            <div className="space-y-6">
              {selectedFile && (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">File Preview</h3>
                    <GcodeViewer3D
                      content={selectedFile.content}
                      width="100%"
                      height={400}
                    />
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">File Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600"><span className="font-medium">Name:</span> {selectedFile.name}</p>
                      <p className="text-gray-600"><span className="font-medium">Size:</span> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                      <p className="text-gray-600"><span className="font-medium">Uploaded:</span> {new Date(selectedFile.uploadDate).toLocaleString()}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabPanel>

        {/* Queue Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PrintQueueManager />
            <div className="space-y-6">
              {selectedFile && (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Queue Preview</h3>
                  <GcodeViewer3D
                    content={selectedFile.content}
                    width="100%"
                    height={400}
                  />
                </div>
              )}
            </div>
          </div>
        </TabPanel>

        {/* Calibration Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CalibrationWorkflow />
            <div className="space-y-6">
              {selectedFile && (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Calibration Preview</h3>
                  <GcodeViewer3D
                    content={selectedFile.content}
                    width="100%"
                    height={400}
                  />
                </div>
              )}
            </div>
          </div>
        </TabPanel>

        {/* Templates Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PrintTemplates />
            <div className="space-y-6">
              {selectedFile && (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Template Preview</h3>
                  <GcodeViewer3D
                    content={selectedFile.content}
                    width="100%"
                    height={400}
                  />
                </div>
              )}
            </div>
          </div>
        </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default PrinterControlPage
