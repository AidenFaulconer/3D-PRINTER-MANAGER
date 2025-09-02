import { useState } from 'react'
import usePrintersStore from './stores/printersStore'
import PrinterDashboard from './components/PrinterDashboard'
import PrinterLayout from './components/PrinterLayout'
import { SerialConnectionProvider } from './context/SerialConnectionContext'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedPrinterId, setSelectedPrinterId] = useState(null)
  const { activePrinterId, setActivePrinter } = usePrintersStore()

  const handlePrinterSelect = (printerId) => {
    setActivePrinter(printerId)
    setSelectedPrinterId(printerId)
    setCurrentView('printer')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedPrinterId(null)
  }

  // If we have an active printer and we're not on the dashboard, show printer layout
  if (currentView === 'printer' && selectedPrinterId) {
    return (
      <SerialConnectionProvider>
        <PrinterLayout onBackToDashboard={handleBackToDashboard} />
      </SerialConnectionProvider>
    )
  }

  // Otherwise show the dashboard
  return <PrinterDashboard onPrinterSelect={handlePrinterSelect} />
}

export default App
