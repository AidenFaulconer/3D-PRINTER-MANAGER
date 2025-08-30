# 3D Printer Suite

A comprehensive 3D printer calibration and management tool built with React, Vite, and Zustand.

## Features

- **Printer Management**: Add, edit, and delete 3D printers
- **Calibration Tracking**: Monitor completion status of various calibration steps
- **Firmware Configuration**: Parse and analyze Marlin firmware configuration files
- **Calibration Steps**: Interactive calibration guides with G-code generation
- **Persistent Storage**: State persists across browser sessions using Zustand persistence
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with Vite
- **State Management**: Zustand with persistence middleware
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM (configured for future use)

## Project Structure

```
src/
├── stores/
│   └── printersStore.js      # Zustand store for printer management
├── components/
│   ├── PrinterDashboard.jsx  # Main dashboard for printer overview
│   ├── PrinterLayout.jsx     # Layout with sidebar navigation
│   ├── PrinterConfig.jsx     # Printer configuration editor
│   ├── FirmwareConfig.jsx    # Marlin firmware parser and analyzer
│   └── CalibrationStep.jsx   # Generic calibration step component
├── utils/
│   └── marlinConfigParser.js # Utilities for parsing Marlin config files
├── data/
│   ├── samplePrinters.js     # Sample printer data for testing
│   ├── calibrationSteps.js   # Calibration steps definitions
│   ├── sampleConfiguration.h # Sample Marlin Configuration.h
│   └── sampleConfiguration_adv.h # Sample Marlin Configuration_adv.h
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Tailwind CSS imports
```

## Store Structure

The `printersStore` manages:

- **printers**: Array of printer objects
- **activePrinterId**: Currently selected printer ID

Each printer object contains:
- `id`: Unique identifier
- `name`: Printer name
- `model`: Printer model
- `firmware`: Firmware version
- `bedSize`: Object with x, y, z dimensions
- `calibrationSteps`: Calibration completion status
- `firmwareConfiguration`: Parsed Marlin firmware settings

## Available Actions

- `addPrinter(printerData)`: Add a new printer
- `updatePrinter(id, updates)`: Update printer information
- `deletePrinter(id)`: Remove a printer
- `setActivePrinter(id)`: Set the active printer
- `updateCalibrationStep(printerId, stepName, data)`: Update calibration status
- `getActivePrinter()`: Get currently active printer
- `getPrinterById(id)`: Get printer by ID
- `resetStore()`: Clear all data

## Calibration Steps System

The application includes a comprehensive calibration system based on Teaching Tech's 3D Printer Calibration Guide:

### **Available Calibration Steps**

#### **Temperature Calibration**
- **PID Autotune**: Calibrate PID values for hotend and bed temperature stability
  - Configurable hotend and bed temperatures
  - Adjustable number of tuning cycles
  - Optional bed PID tuning

#### **Movement Calibration**
- **Extruder E-Steps**: Calibrate extruder steps per mm for accurate extrusion
  - Current E-steps configuration
  - Extrusion distance testing
  - Filament diameter compensation

#### **Quality Calibration**
- **Retraction Tuning**: Optimize retraction settings to eliminate stringing
  - Retraction distance and speed
  - Z-hop configuration
  - Test distance parameters

- **First Layer Calibration**: Perfect first layer adhesion and height
  - Layer height configuration
  - Bed and hotend temperatures
  - Print speed settings
  - Bed leveling integration

- **Flow Rate Calibration**: Achieve accurate wall thickness and dimensions
  - Current flow rate percentage
  - Wall thickness measurement
  - Nozzle diameter configuration

- **Temperature Tower**: Find optimal printing temperature for filament
  - Temperature range testing
  - Bed temperature configuration
  - Step-by-step temperature changes

### **Calibration Step Features**

- **Dynamic Input Forms**: Automatically generated based on step requirements
- **G-code Generation**: Automatic G-code creation with user parameters
- **Progress Tracking**: Save and track completion status
- **Category Organization**: Grouped by Temperature, Movement, and Quality
- **Copy to Clipboard**: Easy G-code copying for printer use
- **Input Validation**: Range checking and required field validation

### **Input Types Supported**

- **Number Inputs**: With min/max/step validation
- **Checkbox Inputs**: For boolean options
- **Text Inputs**: For string values
- **Required Field Marking**: Visual indicators for mandatory parameters

## Firmware Configuration Parser

The application includes a powerful Marlin firmware configuration parser that can:

### **Parse Configuration Files**
- **Configuration.h**: Basic printer configuration
- **Configuration_adv.h**: Advanced configuration options

### **Extract Information**
- `#define` directives with values and descriptions
- Commented-out defines (disabled features)
- Line numbers and file types
- Automatic categorization by feature type

### **Analysis Features**
- **Search & Filter**: Find specific configuration items
- **Sorting**: Sort by name, enabled status, or value
- **Grouping**: Organize by categories (Movement, Temperature, etc.)
- **Export**: Download configuration as CSV
- **Storage**: Save parsed configuration to printer profile

### **Supported Value Types**
- Boolean values (`true`/`false`, `1`/`0`)
- Numeric values (integers, decimals, negative numbers)
- String values (quoted text)
- Character values (single quotes)
- Expressions and constants

### **Categories**
- Machine Configuration
- Driver Settings
- Endstops
- Movement
- Temperature
- Filament
- LCD & UI
- Advanced Features

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd 3d-printer-suite
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Development

### Adding Sample Data

Click the "Load Sample Data" button to populate the store with sample printers for testing.

### Testing Calibration Steps

1. Navigate to a printer's configuration
2. Select any calibration step from the sidebar
3. Configure the parameters for your printer
4. Generate and copy the G-code
5. Run the calibration on your printer
6. Save the configuration to mark the step as complete

### Testing Firmware Parser

1. Navigate to a printer's configuration
2. Select "Firmware Configuration" from the sidebar
3. Upload sample configuration files:
   - `src/data/sampleConfiguration.h`
   - `src/data/sampleConfiguration_adv.h`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Future Enhancements

- **Routing**: Implement React Router for navigation between different views
- **Calibration Wizards**: Step-by-step calibration guides with progress tracking
- **G-code Integration**: Direct printer communication via USB/Serial
- **Print History**: Track print jobs and results
- **Export/Import**: Backup and restore printer configurations
- **Firmware Comparison**: Compare configurations between printers
- **Configuration Templates**: Pre-built configurations for popular printers
- **Calibration Results**: Store and analyze calibration test results
- **Multi-Printer Support**: Manage multiple printers simultaneously

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
