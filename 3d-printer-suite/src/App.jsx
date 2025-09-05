import { useState, useEffect } from 'react'
import { useActivePrinterId, useSetActivePrinter } from './hooks/useStoreSelectors'
import storeRegistry from './stores/storeRegistry'
import PrinterDashboard from './components/PrinterDashboard'
import PrinterLayout from './components/PrinterLayout'
import PrinterControlPage from './pages/PrinterControlPage'
import CalibrationWorkflow from './components/CalibrationWorkflow'
import { ThemeProvider } from './context/ThemeContext'

// Simple router
const useRouter = () => {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/')
  
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (path) => {
    window.location.hash = path
  }

  return { route, navigate }
}
// import { SerialConnectionProvider } from './context/SerialConnectionContext'

function App() {
  const { route, navigate } = useRouter()
  const activePrinterId = useActivePrinterId()
  const setActivePrinter = useSetActivePrinter()

  // Initialize store registry for global access (Zukeeper extension)
  useEffect(() => {
    // Store registry is automatically initialized when imported
    // This ensures stores are available globally for browser extensions
    console.log('🚀 3D Printer Suite App initialized with global store access')
  }, [])

  const handlePrinterSelect = (printerId) => {
    setActivePrinter(printerId)
    navigate(`/printer/${printerId}`)
  }

  const handleBackToDashboard = () => {
    setActivePrinter(null)
    navigate('/')
  }

  // Parse route
  const [_, page, id] = route.split('/')

  const renderContent = () => {
    switch (page) {
      case 'printer':
        if (id) {
          return <PrinterLayout onBackToDashboard={handleBackToDashboard} />
        }
        break

      case 'control':
        return <PrinterControlPage />

      case 'calibration':
        return <CalibrationWorkflow />

      default:
        return <PrinterDashboard onPrinterSelect={handlePrinterSelect} />
    }
  }

  return (
    <ThemeProvider>
      {renderContent()}
    </ThemeProvider>
  )
}

export default App
