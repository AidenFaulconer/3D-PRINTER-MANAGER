/**
 * Calibration Steps based on Teaching Tech's 3D Printer Calibration Guide
 * Each step includes inputs, G-code generation, and completion tracking
 */

export const calibrationSteps = [
  {
    id: 'pid-autotune',
    title: 'PID Autotune',
    description: 'Calibrate the PID values for your hotend and bed to achieve stable temperatures',
    category: 'Temperature',
    inputs: [
      {
        type: 'number',
        label: 'Hotend Temperature (°C)',
        key: 'hotendTemp',
        defaultValue: 200,
        min: 150,
        max: 280,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Bed Temperature (°C)',
        key: 'bedTemp',
        defaultValue: 60,
        min: 0,
        max: 120,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Number of Cycles',
        key: 'cycles',
        defaultValue: 8,
        min: 3,
        max: 20,
        step: 1,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Include Bed PID Tune',
        key: 'includeBed',
        defaultValue: true
      }
    ],
    gcode: (inputValues) => {
      const { hotendTemp, bedTemp, cycles, includeBed } = inputValues
      let gcode = `; PID Autotune for ${hotendTemp}°C hotend, ${bedTemp}°C bed, ${cycles} cycles\n`
      
      // Hotend PID tune
      gcode += `M303 E0 S${hotendTemp} C${cycles}\n`
      
      // Bed PID tune (if enabled)
      if (includeBed) {
        gcode += `M303 E-1 S${bedTemp} C${cycles}\n`
      }
      
      gcode += `; After completion, save the new PID values with M500`
      return gcode
    }
  },
  
  {
    id: 'extruder-esteps',
    title: 'Extruder E-Steps Calibration',
    description: 'Calibrate the extruder steps per mm to ensure accurate filament extrusion',
    category: 'Movement',
    inputs: [
      {
        type: 'number',
        label: 'Current E-Steps/mm',
        key: 'currentEsteps',
        defaultValue: 93,
        min: 50,
        max: 200,
        step: 0.1,
        required: true
      },
      {
        type: 'number',
        label: 'Distance to Extrude (mm)',
        key: 'extrudeDistance',
        defaultValue: 100,
        min: 50,
        max: 200,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Filament Diameter (mm)',
        key: 'filamentDiameter',
        defaultValue: 1.75,
        min: 1.0,
        max: 3.0,
        step: 0.01,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Use Filament Diameter',
        key: 'useFilamentDiameter',
        defaultValue: true
      }
    ],
    gcode: (inputValues) => {
      const { currentEsteps, extrudeDistance, filamentDiameter, useFilamentDiameter } = inputValues
      let gcode = `; E-Steps Calibration\n`
      gcode += `; Current E-steps: ${currentEsteps}\n`
      gcode += `; Extrude distance: ${extrudeDistance}mm\n`
      
      if (useFilamentDiameter) {
        gcode += `; Filament diameter: ${filamentDiameter}mm\n`
        gcode += `M92 E${currentEsteps}\n`
        gcode += `M500\n`
        gcode += `; Heat hotend to 200°C first\n`
        gcode += `M104 S200\n`
        gcode += `M190 S60\n`
        gcode += `; Extrude filament\n`
        gcode += `G92 E0\n`
        gcode += `G1 E${extrudeDistance} F100\n`
        gcode += `; Measure actual extrusion and calculate new E-steps\n`
        gcode += `; New E-steps = (Current E-steps × Requested distance) ÷ Actual distance`
      } else {
        gcode += `M92 E${currentEsteps}\n`
        gcode += `M500\n`
        gcode += `; Heat hotend to 200°C first\n`
        gcode += `M104 S200\n`
        gcode += `M190 S60\n`
        gcode += `; Extrude filament\n`
        gcode += `G92 E0\n`
        gcode += `G1 E${extrudeDistance} F100\n`
        gcode += `; Measure actual extrusion and calculate new E-steps\n`
        gcode += `; New E-steps = (Current E-steps × Requested distance) ÷ Actual distance`
      }
      
      return gcode
    }
  },
  
  {
    id: 'retraction-tuning',
    title: 'Retraction Tuning',
    description: 'Optimize retraction settings to eliminate stringing and oozing',
    category: 'Quality',
    inputs: [
      {
        type: 'number',
        label: 'Starting Retraction Distance (mm)',
        key: 'startRetraction',
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 0.5,
        required: true
      },
      {
        type: 'number',
        label: 'Retraction Speed (mm/s)',
        key: 'retractionSpeed',
        defaultValue: 45,
        min: 10,
        max: 100,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Z-Hop Height (mm)',
        key: 'zHop',
        defaultValue: 0.2,
        min: 0,
        max: 1,
        step: 0.1,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Enable Z-Hop',
        key: 'enableZHop',
        defaultValue: true
      },
      {
        type: 'number',
        label: 'Test Distance (mm)',
        key: 'testDistance',
        defaultValue: 50,
        min: 20,
        max: 100,
        step: 5,
        required: true
      }
    ],
    gcode: (inputValues) => {
      const { startRetraction, retractionSpeed, zHop, enableZHop, testDistance } = inputValues
      let gcode = `; Retraction Tuning Test\n`
      gcode += `; Retraction: ${startRetraction}mm at ${retractionSpeed}mm/s\n`
      
      if (enableZHop) {
        gcode += `; Z-Hop: ${zHop}mm\n`
        gcode += `M207 S${startRetraction} F${retractionSpeed * 60} Z${zHop}\n`
      } else {
        gcode += `; Z-Hop: Disabled\n`
        gcode += `M207 S${startRetraction} F${retractionSpeed * 60}\n`
      }
      
      gcode += `M500\n`
      gcode += `; Heat hotend to 200°C\n`
      gcode += `M104 S200\n`
      gcode += `M190 S60\n`
      gcode += `; Move to test position\n`
      gcode += `G28\n`
      gcode += `G1 Z10 F300\n`
      gcode += `G1 X0 Y0 F3000\n`
      gcode += `; Extrude test line\n`
      gcode += `G1 E20 F100\n`
      gcode += `; Move to test distance\n`
      gcode += `G1 X${testDistance} F3000\n`
      gcode += `; Retract and return\n`
      gcode += `G1 E-${startRetraction} F${retractionSpeed * 60}\n`
      gcode += `G1 X0 F3000\n`
      gcode += `G1 E${startRetraction} F${retractionSpeed * 60}\n`
      gcode += `; Repeat for testing different values`
      
      return gcode
    }
  },
  
  {
    id: 'first-layer',
    title: 'First Layer Calibration',
    description: 'Calibrate the first layer height and bed leveling for perfect adhesion',
    category: 'Quality',
    inputs: [
      {
        type: 'number',
        label: 'Layer Height (mm)',
        key: 'layerHeight',
        defaultValue: 0.2,
        min: 0.1,
        max: 0.4,
        step: 0.05,
        required: true
      },
      {
        type: 'number',
        label: 'First Layer Height (mm)',
        key: 'firstLayerHeight',
        defaultValue: 0.2,
        min: 0.1,
        max: 0.4,
        step: 0.05,
        required: true
      },
      {
        type: 'number',
        label: 'Bed Temperature (°C)',
        key: 'bedTemp',
        defaultValue: 60,
        min: 0,
        max: 120,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Hotend Temperature (°C)',
        key: 'hotendTemp',
        defaultValue: 200,
        min: 150,
        max: 280,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Print Speed (mm/s)',
        key: 'printSpeed',
        defaultValue: 20,
        min: 10,
        max: 60,
        step: 5,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Enable Bed Leveling',
        key: 'enableBedLeveling',
        defaultValue: true
      }
    ],
    gcode: (inputValues) => {
      const { layerHeight, firstLayerHeight, bedTemp, hotendTemp, printSpeed, enableBedLeveling } = inputValues
      let gcode = `; First Layer Calibration\n`
      gcode += `; Layer height: ${layerHeight}mm, First layer: ${firstLayerHeight}mm\n`
      gcode += `; Bed: ${bedTemp}°C, Hotend: ${hotendTemp}°C, Speed: ${printSpeed}mm/s\n`
      
      if (enableBedLeveling) {
        gcode += `; Bed leveling enabled\n`
        gcode += `G28\n`
        gcode += `G29\n`
      } else {
        gcode += `; Bed leveling disabled\n`
        gcode += `G28\n`
      }
      
      gcode += `; Heat bed and hotend\n`
      gcode += `M190 S${bedTemp}\n`
      gcode += `M104 S${hotendTemp}\n`
      gcode += `; Wait for temperatures\n`
      gcode += `M109 S${hotendTemp}\n`
      gcode += `; Set first layer height\n`
      gcode += `G0 Z${firstLayerHeight}\n`
      gcode += `; Print first layer test pattern\n`
      gcode += `; Adjust Z-offset during printing if needed\n`
      gcode += `; Use M851 Z<value> to set Z-offset\n`
      gcode += `; Use M500 to save settings`
      
      return gcode
    }
  },
  
  {
    id: 'flow-rate',
    title: 'Flow Rate Calibration',
    description: 'Calibrate the flow rate to achieve accurate wall thickness and dimensions',
    category: 'Quality',
    inputs: [
      {
        type: 'number',
        label: 'Current Flow Rate (%)',
        key: 'currentFlow',
        defaultValue: 100,
        min: 50,
        max: 150,
        step: 1,
        required: true
      },
      {
        type: 'number',
        label: 'Wall Thickness (mm)',
        key: 'wallThickness',
        defaultValue: 0.4,
        min: 0.2,
        max: 1.0,
        step: 0.1,
        required: true
      },
      {
        type: 'number',
        label: 'Nozzle Diameter (mm)',
        key: 'nozzleDiameter',
        defaultValue: 0.4,
        min: 0.2,
        max: 1.0,
        step: 0.1,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Print Test Cube',
        key: 'printTestCube',
        defaultValue: true
      }
    ],
    gcode: (inputValues) => {
      const { currentFlow, wallThickness, nozzleDiameter, printTestCube } = inputValues
      let gcode = `; Flow Rate Calibration\n`
      gcode += `; Current flow: ${currentFlow}%, Wall thickness: ${wallThickness}mm\n`
      gcode += `; Nozzle: ${nozzleDiameter}mm\n`
      
      gcode += `; Set flow rate\n`
      gcode += `M221 S${currentFlow}\n`
      gcode += `M500\n`
      
      if (printTestCube) {
        gcode += `; Print 20x20x20mm test cube\n`
        gcode += `; Measure wall thickness with calipers\n`
        gcode += `; Calculate new flow rate:\n`
        gcode += `; New Flow = (Expected thickness × Current flow) ÷ Actual thickness\n`
        gcode += `; Use M221 S<value> to set new flow rate\n`
        gcode += `; Use M500 to save`
      } else {
        gcode += `; Flow rate set to ${currentFlow}%\n`
        gcode += `; Test with a simple print and measure dimensions`
      }
      
      return gcode
    }
  },
  
  {
    id: 'temperature-tower',
    title: 'Temperature Tower',
    description: 'Find the optimal printing temperature for your filament',
    category: 'Temperature',
    inputs: [
      {
        type: 'number',
        label: 'Start Temperature (°C)',
        key: 'startTemp',
        defaultValue: 220,
        min: 180,
        max: 280,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'End Temperature (°C)',
        key: 'endTemp',
        defaultValue: 180,
        min: 150,
        max: 250,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Temperature Step (°C)',
        key: 'tempStep',
        defaultValue: 10,
        min: 5,
        max: 20,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Bed Temperature (°C)',
        key: 'bedTemp',
        defaultValue: 60,
        min: 0,
        max: 120,
        step: 5,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Include Bed Temperature',
        key: 'includeBed',
        defaultValue: true
      }
    ],
    gcode: (inputValues) => {
      const { startTemp, endTemp, tempStep, bedTemp, includeBed } = inputValues
      let gcode = `; Temperature Tower\n`
      gcode += `; Temperature range: ${startTemp}°C to ${endTemp}°C, Step: ${tempStep}°C\n`
      
      if (includeBed) {
        gcode += `; Bed temperature: ${bedTemp}°C\n`
        gcode += `M190 S${bedTemp}\n`
      }
      
      gcode += `; Heat hotend to starting temperature\n`
      gcode += `M104 S${startTemp}\n`
      gcode += `M109 S${startTemp}\n`
      gcode += `; Home and start print\n`
      gcode += `G28\n`
      gcode += `; Temperature changes will be handled by slicer\n`
      gcode += `; Use M104 S<temp> to change temperature during print\n`
      gcode += `; Example: M104 S${startTemp - tempStep} (after first section)\n`
      gcode += `; Print temperature tower and evaluate surface quality`
      
      return gcode
    }
  }
]

/**
 * Get calibration step by ID
 */
export const getCalibrationStep = (id) => {
  return calibrationSteps.find(step => step.id === id)
}

/**
 * Get all calibration steps for a category
 */
export const getCalibrationStepsByCategory = (category) => {
  return calibrationSteps.filter(step => step.category === category)
}

/**
 * Get all available categories
 */
export const getCalibrationCategories = () => {
  return [...new Set(calibrationSteps.map(step => step.category))]
}
