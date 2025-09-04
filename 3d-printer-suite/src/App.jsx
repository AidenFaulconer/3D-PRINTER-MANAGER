import { useState, useEffect } from 'react'
import usePrintersStore from './stores/printersStore'
import storeRegistry from './stores/storeRegistry'
import PrinterDashboard from './components/PrinterDashboard'
import PrinterLayout from './components/PrinterLayout'
import PrinterControlPage from './pages/PrinterControlPage'

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
  const { activePrinterId, setActivePrinter } = usePrintersStore()

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

  switch (page) {
    case 'printer':
      if (id) {
        return <PrinterLayout onBackToDashboard={handleBackToDashboard} />
      }
      break

    case 'control':
      return <PrinterControlPage />

    default:
      return <PrinterDashboard onPrinterSelect={handlePrinterSelect} />
  }
}

export default App
