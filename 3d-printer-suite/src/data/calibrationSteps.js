/**
 * Calibration Steps based on Teaching Tech's 3D Printer Calibration Guide
 * Each step includes inputs, G-code generation, and completion tracking
 */

import { generateParameterizedGcode, getStepParameters } from '../utils/GcodeParameterizer'

export const calibrationSteps = [
  {
    id: 'bed-leveling',
    title: 'Bed Leveling',
    name: 'Bed Leveling',
    description: 'Probe the bed surface and analyze flatness to ensure proper first layer adhesion',
    category: 'Movement',
    requiresSave: true,
    videoUrl: 'https://www.youtube.com/watch?v=Kj4x1P1R3sE',
    instructions: [
      'Ensure your printer has a bed leveling probe (BLTouch, inductive sensor, etc.)',
      'Clear the bed surface of any debris or residue',
      'Make sure the bed is at room temperature',
      'Run the bed leveling sequence (G29)',
      'Analyze the mesh data for flatness and variation',
      'Adjust bed screws or probe offset if needed'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Bed not flat enough', solution: 'Adjust bed screws, check for warped bed, or use manual leveling first' },
      { issue: 'Probe not triggering', solution: 'Check probe wiring, adjust trigger distance, or clean probe tip' },
      { issue: 'Inconsistent readings', solution: 'Check probe mounting, ensure stable bed temperature, clean bed surface' }
    ],
    expectedOutcomes: 'Bed flatness within ±0.1mm variation across the entire surface',
    checklist: [
      'Bed leveling probe installed and calibrated',
      'Bed surface clean and free of debris',
      'Bed at room temperature',
      'Probe trigger distance properly set',
      'No obstructions in probe path'
    ],
    inputs: [
      {
        type: 'number',
        label: 'Probe Speed (mm/min)',
        key: 'probeSpeed',
        defaultValue: 300,
        min: 100,
        max: 1000,
        step: 50,
        required: true
      },
      {
        type: 'number',
        label: 'Probe Grid Size',
        key: 'gridSize',
        defaultValue: 5,
        min: 3,
        max: 9,
        step: 1,
        required: true
      },
      {
        type: 'number',
        label: 'Probe Z-Offset (mm)',
        key: 'probeZOffset',
        defaultValue: 0,
        min: -5,
        max: 5,
        step: 0.01,
        required: true
      },
      {
        type: 'checkbox',
        label: 'Enable Bed Heating',
        key: 'enableBedHeating',
        defaultValue: true
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
      }
    ],
    gcode: (inputValues) => {
      const { probeSpeed, gridSize, probeZOffset, enableBedHeating, bedTemp } = inputValues
      let gcode = `; Bed Leveling Calibration\n`
      gcode += `; Grid size: ${gridSize}x${gridSize}, Probe speed: ${probeSpeed}mm/min\n`
      gcode += `; Z-offset: ${probeZOffset}mm\n`
      gcode += `G90\n`
      gcode += `M82\n`
      gcode += `; Home all axes\n`
      gcode += `G28\n`
      
      if (enableBedHeating) {
        gcode += `; Heat bed to ${bedTemp}°C for consistent probing\n`
        gcode += `M140 S${bedTemp}\n`
        gcode += `M190 S${bedTemp}\n`
      }
      
      gcode += `; Set probe speed\n`
      gcode += `M203 Z${probeSpeed}\n`
      gcode += `; Set probe Z-offset\n`
      gcode += `M851 Z${probeZOffset}\n`
      gcode += `; Save probe settings\n`
      gcode += `M500\n`
      gcode += `; Enable bed leveling\n`
      gcode += `M420 S1\n`
      gcode += `; Run bed leveling (G29)\n`
      gcode += `G29\n`
      gcode += `; Get mesh data\n`
      gcode += `M420 V\n`
      gcode += `; Move to center for inspection\n`
      gcode += `G0 X110 Y110 Z5\n`
      gcode += `; Move up for safety\n`
      gcode += `G0 Z20\n`
      
      if (enableBedHeating) {
        gcode += `; Turn off bed heater\n`
        gcode += `M140 S0\n`
      }
      
      gcode += `M84\n`
      
      return gcode
    }
  },
  {
    id: 'pid-autotune',
    title: 'PID Autotune',
    name: 'PID Autotune',
    description: 'Calibrate the PID values for your hotend and bed to achieve stable temperatures',
    category: 'Temperature',
    requiresSave: true,
    videoUrl: 'https://www.youtube.com/watch?v=APzJfYAgFkQ',
    instructions: [
      'Preheat the hotend and bed to approximate target temperatures.',
      'Ensure no filament is loaded or disable extrusion during tuning.',
      'Run PID autotune for the hotend and bed (if supported).',
      'Save the tuned PID values to EEPROM with M500.',
      'Test stability during a small print.'
    ],
    visualAids: [
      // { imageUrl: '/images/pid_graph.png', caption: 'Stable temperature curve after tuning' }
    ],
    commonIssues: [
      { issue: 'Temperature oscillates after tuning', solution: 'Increase cycles or re-run autotune closer to operating temp.' },
      { issue: 'Heater fault during tuning', solution: 'Lower target temperature, ensure thermistor contact, check wiring.' }
    ],
    expectedOutcomes: 'Stable temperature traces with minimal overshoot (≤2°C) and fast settling time.',
    checklist: [
      'Printer powered and idle',
      'Thermistors connected and reading correctly',
      'Nozzle clear and safe (no filament required)'
    ],
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
    name: 'Extruder E-Steps Calibration',
    description: 'Calibrate the extruder steps per mm to ensure accurate filament extrusion',
    category: 'Movement',
    requiresSave: true,
    videoUrl: 'https://www.youtube.com/watch?v=7tCxO17XZtw',
    instructions: [
      'Heat the hotend to printing temperature (e.g., 200°C).',
      'Mark filament at 120mm from the extruder entry.',
      'Extrude 100mm of filament using controlled feed.',
      'Measure remaining distance to entry to find actual extruded amount.',
      'Compute new E-steps = (Current E-steps × Requested) ÷ Actual.'
    ],
    visualAids: [
      // { imageUrl: '/images/esteps_mark.jpg', caption: 'Mark filament at 120mm for measurement' }
    ],
    commonIssues: [
      { issue: 'Under-extrusion', solution: 'Increase E-steps using measured actual extrusion.' },
      { issue: 'Slipping', solution: 'Increase idler tension, clean drive gear, slow extrusion speed.' }
    ],
    expectedOutcomes: 'Extrusion distances match requested within ±1mm over 100mm.',
    checklist: [
      'Hotend heated to target temperature',
      'Filament loaded and feeding',
      'Extruder gear clean and tension set'
    ],
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
    name: 'Retraction Tuning',
    description: 'Optimize retraction settings to eliminate stringing and oozing',
    requiresSave: true,
    category: 'Quality',
    videoUrl: 'https://www.youtube.com/watch?v=Z2hZKx9F9_s',
    instructions: [
      'Load a stringing test model or use generated test moves.',
      'Start with moderate retraction and speed.',
      'Observe stringing between towers and adjust values.',
      'Repeat until stringing is minimized without causing jams.'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Stringing persists', solution: 'Increase retraction distance and/or temperature tuning; enable coasting.' },
      { issue: 'Grinding/jams', solution: 'Reduce retraction speed and distance; check path and PTFE.' }
    ],
    expectedOutcomes: 'Minimal or no stringing; clean travel moves; no filament grinding.',
    checklist: [
      'Hotend clean and free of debris',
      'Filament dry and within spec',
      'Nozzle temperature verified'
    ],
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
        label: 'Ending Retraction Distance (mm)',
        key: 'endRetraction',
        defaultValue: 1.5,
        min: 0,
        max: 20,
        step: 0.5,
        required: true
      },
      {
        type: 'number',
        label: 'Retraction Steps',
        key: 'retractionSteps',
        defaultValue: 5,
        min: 2,
        max: 10,
        step: 1,
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
        label: 'Test Distance (mm)',
        key: 'testDistance',
        defaultValue: 50,
        min: 20,
        max: 100,
        step: 5,
        required: true
      }
    ],
    gcode: async (inputValues) => {
      const {
        startRetraction,
        endRetraction,
        retractionSteps,
        retractionSpeed,
        zHop,
        enableZHop,
        testDistance,
        hotendTemp,
        bedTemp
      } = inputValues
      
      // Convert input values to parameterized format
      const parameters = {
        bedTemp: bedTemp,
        hotendTemp: hotendTemp - 50, // Initial temp (50°C below target)
        finalHotendTemp: hotendTemp,
        layerHeight: 0.28,
        retractionDistance: startRetraction,
        retractionSpeed: retractionSpeed * 60, // Convert mm/s to mm/min
        printSpeed: 3300,
        travelSpeed: 11000,
        enableABL: false,
        restoreABL: true
      }
      
      try {
        const result = await generateParameterizedGcode('retraction-tuning', parameters)
        return result.gcode
      } catch (error) {
        console.error('Error generating parameterized G-code:', error)
        // Fallback to simple G-code
        return `; Retraction Tuning\nG90\nM82\nM140 S${bedTemp}\nM190 S${bedTemp}\nM104 S${hotendTemp}\nM109 S${hotendTemp}\nG28\nG0 Z3\n; Add your retraction test pattern here`
      }
    }
  },
  
  {
    id: 'first-layer',
    title: 'First Layer Calibration',
    name: 'First Layer Calibration',
    description: 'Calibrate the first layer height and bed leveling for perfect adhesion',
    requiresSave: false,
    category: 'Quality',
    videoUrl: 'https://www.youtube.com/watch?v=Kj4x1P1R3sE',
    instructions: [
      'Clean the build surface and remove residue.',
      'Home all axes and level bed using ABL or manual paper method.',
      'Adjust Z-offset while printing a first-layer test.',
      'Inspect line width, squish, and adhesion; adjust as needed.'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Poor adhesion', solution: 'Increase bed temp, clean surface, adjust Z-offset lower (closer).' },
      { issue: 'Elephant foot', solution: 'Lower bed temp slightly, raise first layer Z-offset, add chamfer.' }
    ],
    expectedOutcomes: 'Uniform, slightly squished lines with consistent width and strong adhesion.',
    checklist: [
      'Bed is clean and free of oils',
      'Nozzle is clean',
      'Bed leveling completed'
    ],
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
    gcode: async (inputValues) => {
      const { layerHeight, firstLayerHeight, bedTemp, hotendTemp, printSpeed, enableBedLeveling } = inputValues
      
      // Convert input values to parameterized format
      const parameters = {
        bedTemp: bedTemp,
        hotendTemp: hotendTemp - 50, // Initial temp (50°C below target)
        finalHotendTemp: hotendTemp,
        layerHeight: firstLayerHeight,
        retractionDistance: 6,
        retractionSpeed: 2400,
        printSpeed: printSpeed * 60, // Convert mm/s to mm/min
        travelSpeed: 11000,
        enableABL: enableBedLeveling,
        restoreABL: enableBedLeveling
      }
      
      try {
        const result = await generateParameterizedGcode('first-layer', parameters)
        return result.gcode
      } catch (error) {
        console.error('Error generating parameterized G-code:', error)
        // Fallback to simple G-code
        return `; First Layer Calibration\nG90\nM82\nM140 S${bedTemp}\nM190 S${bedTemp}\nM104 S${hotendTemp}\nG28\nM109 S${hotendTemp}\nG0 Z3\n; Add your first layer test pattern here`
      }
    }
  },
  
  {
    id: 'flow-rate',
    title: 'Flow Rate Calibration',
    name: 'Flow Rate Calibration',
    description: 'Calibrate the flow rate to achieve accurate wall thickness and dimensions',
    requiresSave: true,
    category: 'Quality',
    videoUrl: 'https://www.youtube.com/watch?v=3-p7u0qv2bM',
    instructions: [
      'Print a single-wall cube or use a generated line.',
      'Measure wall thickness accurately with calipers.',
      'Compute new flow = expected × current ÷ actual.',
      'Apply new flow and re-test.'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Walls too thin', solution: 'Increase flow rate or check extrusion path for leaks.' },
      { issue: 'Walls too thick', solution: 'Decrease flow rate; verify nozzle diameter and slicer settings.' }
    ],
    expectedOutcomes: 'Measured wall thickness within ±0.02 mm of expected for single-wall test.',
    checklist: [
      'Calipers available and zeroed',
      'Nozzle diameter known and configured',
      'Single-wall model sliced with correct width'
    ],
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
      },
      {
        type: 'number',
        label: 'Hotend Temperature (°C)',
        key: 'hotendTemp',
        defaultValue: 235,
        min: 180,
        max: 280,
        step: 5,
        required: true
      },
      {
        type: 'number',
        label: 'Bed Temperature (°C)',
        key: 'bedTemp',
        defaultValue: 80,
        min: 0,
        max: 120,
        step: 5,
        required: true
      }
    ],
    gcode: async (inputValues) => {
      const { currentFlow, wallThickness, nozzleDiameter, printTestCube, hotendTemp, bedTemp } = inputValues
      
      // Convert input values to parameterized format
      const parameters = {
        bedTemp: bedTemp || 80,
        hotendTemp: (hotendTemp || 235) - 50, // Initial temp (50°C below target)
        finalHotendTemp: hotendTemp || 235,
        layerHeight: 0.4, // Flow rate test typically uses 0.4mm layer height
        retractionDistance: 3.2,
        retractionSpeed: 2700,
        printSpeed: 3300,
        travelSpeed: 11000,
        enableABL: false,
        restoreABL: false
      }
      
      try {
        const result = await generateParameterizedGcode('flow-rate', parameters)
        
        // Add flow rate setting and instructions at the beginning
        let gcode = `; Flow Rate Calibration\n`
        gcode += `; Current flow: ${currentFlow}%, Wall thickness: ${wallThickness}mm\n`
        gcode += `; Nozzle: ${nozzleDiameter}mm\n`
        gcode += `; Set flow rate\n`
        gcode += `M221 S${currentFlow}\n`
        gcode += `M500\n\n`
        
        if (printTestCube) {
          gcode += `; Print flow rate test cube\n`
          gcode += `; Measure wall thickness with calipers\n`
          gcode += `; Calculate new flow rate:\n`
          gcode += `; New Flow = (Expected thickness × Current flow) ÷ Actual thickness\n`
          gcode += `; Use M221 S<value> to set new flow rate\n`
          gcode += `; Use M500 to save\n\n`
        }
        
        // Add the parameterized G-code
        gcode += result.gcode
        
        return gcode
      } catch (error) {
        console.error('Error generating parameterized G-code:', error)
        // Fallback to simple G-code
        return `; Flow Rate Calibration\n; Current flow: ${currentFlow}%, Wall thickness: ${wallThickness}mm\n; Nozzle: ${nozzleDiameter}mm\n; Set flow rate\nM221 S${currentFlow}\nM500\n; Print test cube and measure wall thickness`
      }
    }
  },
  
  {
    id: 'temperature-tower',
    title: 'Temperature Tower',
    name: 'Temperature Tower',
    description: 'Find the optimal printing temperature for your filament',
    requiresSave: false,
    category: 'Temperature',
    videoUrl: 'https://www.youtube.com/watch?v=0Y2YxYf-7xU',
    instructions: [
      'Slice a temperature tower with scripted temperature changes.',
      'Print the model and note artifacts at each temperature.',
      'Select the range with best surface quality and bridging.'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Poor bridging in all segments', solution: 'Increase cooling, reduce speed, and adjust temperature lower.' }
    ],
    expectedOutcomes: 'A selected temperature range with crisp details, minimal stringing, and strong layer adhesion.',
    checklist: [
      'Cooling fan functional',
      'Stable filament feed',
      'Bed adhesion consistent'
    ],
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
    gcode: async (inputValues) => {
      const { startTemp, endTemp, tempStep, bedTemp, includeBed } = inputValues
      
      // Convert input values to parameterized format
      const parameters = {
        bedTemp: includeBed ? bedTemp : 0,
        hotendTemp: startTemp - 50, // Initial temp (50°C below start)
        finalHotendTemp: startTemp,
        layerHeight: 0.28,
        retractionDistance: 6,
        retractionSpeed: 2400,
        printSpeed: 3300,
        travelSpeed: 11000,
        enableABL: true,
        restoreABL: false
      }
      
      try {
        const result = await generateParameterizedGcode('temperature-tower', parameters)
        return result.gcode
      } catch (error) {
        console.error('Error generating parameterized G-code:', error)
        // Fallback to simple G-code
        return `; Temperature Tower\nG90\nM82\nM140 S${bedTemp}\nM190 S${bedTemp}\nM104 S${startTemp}\nG28\nM109 S${startTemp}\nG0 Z3\n; Add your temperature tower pattern here`
      }
    }
  }
]

// Additional steps appended at the end to preserve previous ordering: Calibration Cube and Speed Calibration
calibrationSteps.push(
  {
    id: 'calibration-cube',
    title: 'Calibration Cube',
    name: 'Calibration Cube',
    description: 'Print a 20 mm calibration cube to verify dimensional accuracy and general print health',
    requiresSave: false,
    category: 'Quality',
    videoUrl: 'https://www.youtube-nocookie.com/embed/2RPO4mDFN70',
    instructions: [
      'Use this cube to validate X/Y/Z dimensions, first-layer adhesion, and general motion.',
      'Measure each axis with calipers after printing and compare against 20 mm.',
      'Adjust steps/mm or flow if dimensional errors are consistent.'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Elephant foot', solution: 'Lower bed temp slightly or add chamfer; adjust first-layer Z-offset.' },
      { issue: 'Over/under extrusion', solution: 'Tune flow rate and retraction settings.' },
      { issue: 'Ringing/ghosting', solution: 'Reduce acceleration/jerk and speed.' }
    ],
    expectedOutcomes: 'Cube measures close to 20.00 mm on X/Y/Z with clean walls and corners.',
    checklist: [
      'Bed clean and leveled',
      'Filament dry and consistent diameter',
      'Temperatures appropriate for filament'
    ],
    inputs: [
      { type: 'number', label: 'Cube Size (mm)', key: 'cubeSize', defaultValue: 20, min: 10, max: 40, step: 1, required: true },
      { type: 'number', label: 'Layer Height (mm)', key: 'layerHeight', defaultValue: 0.2, min: 0.08, max: 0.36, step: 0.02, required: true },
      { type: 'number', label: 'Perimeters', key: 'perimeters', defaultValue: 2, min: 1, max: 5, step: 1, required: true },
      { type: 'number', label: 'Top/Bottom Layers', key: 'solidLayers', defaultValue: 4, min: 2, max: 10, step: 1, required: true },
      { type: 'number', label: 'Infill (%)', key: 'infill', defaultValue: 15, min: 0, max: 40, step: 5, required: true },
      { type: 'number', label: 'Print Speed (mm/s)', key: 'printSpeed', defaultValue: 50, min: 20, max: 120, step: 5, required: true },
      { type: 'number', label: 'Hotend Temp (°C)', key: 'hotendTemp', defaultValue: 205, min: 170, max: 280, step: 5, required: true },
      { type: 'number', label: 'Bed Temp (°C)', key: 'bedTemp', defaultValue: 60, min: 0, max: 120, step: 5, required: true }
    ],
    gcode: (v) => {
      const bed = (typeof window !== 'undefined' && window.__PRINTER_BED__) || { x: 220, y: 220 }
      const size = Math.max(10, Math.min(60, v.cubeSize || 20))
      const lh = Math.max(0.08, Math.min(0.4, v.layerHeight || 0.2))
      const perims = Math.max(1, Math.min(5, v.perimeters || 2))
      const solids = Math.max(2, Math.min(10, v.solidLayers || 4))
      const infill = Math.max(0, Math.min(100, v.infill || 15))
      const speed = Math.max(10, Math.min(150, v.printSpeed || 50))
      const F = Math.round(speed * 60)
      const hot = Math.max(0, v.hotendTemp || 205)
      const bedT = Math.max(0, v.bedTemp || 60)

      // Centered on bed with margin
      const margin = 20
      const cx = Math.min(Math.max(margin + size / 2, bed.x / 2), bed.x - margin - size / 2)
      const cy = Math.min(Math.max(margin + size / 2, bed.y / 2), bed.y - margin - size / 2)
      const x0 = (cx - size / 2).toFixed(3)
      const x1 = (cx + size / 2).toFixed(3)
      const y0 = (cy - size / 2).toFixed(3)
      const y1 = (cy + size / 2).toFixed(3)

      let g = ''
      g += `; Calibration Cube ${size}mm\nG90\nM82\nM106 S0\n`
      g += `M140 S${bedT}\nM190 S${bedT}\n`
      g += `M104 S${hot}\nM109 S${hot}\n`
      g += `G28\nG1 Z3 F1200\nG92 E0\n`

      // Prime line
      const primeX = Math.max(margin, cx - size).toFixed(2)
      const primeY0 = Math.max(margin, cy - 30).toFixed(2)
      const primeY1 = Math.min(bed.y - margin, cy + 30).toFixed(2)
      g += `G1 X${primeX} Y${primeY0} F9000\nG1 Z${lh.toFixed(3)} F1200\nG1 E2 F1500\nG92 E0\n`
      g += `G1 Y${primeY1} E6 F${F}\nG92 E0\n`

      // Layers
      const height = size
      const layers = Math.max(1, Math.round(height / lh))
      const wallE = 0.8 // approx extrusion per side per wall
      let z = lh
      for (let L = 0; L < layers; L++) {
        g += `; Layer ${L + 1}/${layers}\n`
        g += `G1 Z${z.toFixed(3)} F1200\n`
        // Perimeters
        for (let p = 0; p < perims; p++) {
          const inset = p * 0.4
          const xa0 = (parseFloat(x0) + inset).toFixed(3)
          const xa1 = (parseFloat(x1) - inset).toFixed(3)
          const ya0 = (parseFloat(y0) + inset).toFixed(3)
          const ya1 = (parseFloat(y1) - inset).toFixed(3)
          g += `G92 E0\nG1 X${xa0} Y${ya0} F9000\n`
          g += `G1 X${xa1} Y${ya0} E${wallE.toFixed(3)} F${F}\n`
          g += `G1 X${xa1} Y${ya1} E${(wallE * 2).toFixed(3)}\n`
          g += `G1 X${xa0} Y${ya1} E${(wallE * 3).toFixed(3)}\n`
          g += `G1 X${xa0} Y${ya0} E${(wallE * 4).toFixed(3)}\n`
        }
        // Infill (simple lines) except solid top/bottom regions
        const isSolid = L < solids || L >= layers - solids
        if (!isSolid && infill > 0) {
          const lines = Math.max(2, Math.floor(size / 2))
          for (let i = 0; i < lines; i++) {
            const t = i / (lines - 1)
            const y = (parseFloat(y0) + 0.6 + t * (size - 1.2)).toFixed(3)
            const dir = i % 2 === 0
            const xs = dir ? x0 : x1
            const xe = dir ? x1 : x0
            g += `G1 X${xs} Y${y} F9000\nG92 E0\n`
            g += `G1 X${xe} Y${y} E${(size * 0.04 * (infill / 100)).toFixed(3)} F${F}\n`
          }
        }
        z += lh
      }

      g += `M106 S0\nM104 S0\nM140 S0\nG1 Z${(z + 5).toFixed(2)} F1200\nM84\n`
      return g
    }
  },
  {
    id: 'speed-calibration',
    title: 'Speed Calibration',
    name: 'Speed Calibration',
    description: 'Print progressive speed lines to find the fastest reliable print speed without artifacts',
    requiresSave: false,
    category: 'Speed',
    videoUrl: 'https://www.youtube-nocookie.com/embed/U9B6hVZ7S9U',
    instructions: [
      'This test draws multiple line passes at increasing speeds across the bed.',
      'Inspect for under-extrusion, ringing, or missed steps as speed increases.',
      'Choose the highest speed with acceptable quality and no skipped steps.'
    ],
    visualAids: [],
    commonIssues: [
      { issue: 'Ringing/ghosting', solution: 'Lower acceleration/jerk and top speed, improve frame rigidity.' },
      { issue: 'Under-extrusion at high speed', solution: 'Increase temperature slightly or reduce speed.' },
      { issue: 'Layer shifts', solution: 'Reduce speed or acceleration; check belt tension and stepper current.' }
    ],
    expectedOutcomes: 'Clear determination of maximum usable speed without major artifacts.',
    checklist: [
      'Belts tensioned and pulleys tight',
      'Nozzle and extruder in good condition',
      'Filament dry and consistent'
    ],
    inputs: [
      { type: 'number', label: 'Start Speed (mm/s)', key: 'startSpeed', defaultValue: 40, min: 10, max: 150, step: 5, required: true },
      { type: 'number', label: 'End Speed (mm/s)', key: 'endSpeed', defaultValue: 120, min: 20, max: 300, step: 5, required: true },
      { type: 'number', label: 'Speed Step (mm/s)', key: 'stepSpeed', defaultValue: 10, min: 5, max: 50, step: 5, required: true },
      { type: 'number', label: 'Line Length (mm)', key: 'lineLength', defaultValue: 160, min: 60, max: 220, step: 10, required: true },
      { type: 'number', label: 'Hotend Temp (°C)', key: 'hotendTemp', defaultValue: 210, min: 170, max: 280, step: 5, required: true },
      { type: 'number', label: 'Bed Temp (°C)', key: 'bedTemp', defaultValue: 60, min: 0, max: 120, step: 5, required: true }
    ],
    gcode: async (inputValues) => {
      const { startSpeed, endSpeed, stepSpeed, lineLength, hotendTemp, bedTemp } = inputValues
      
      // Convert input values to parameterized format
      const parameters = {
        bedTemp: bedTemp || 50,
        hotendTemp: hotendTemp || 240,
        finalHotendTemp: hotendTemp || 240,
        layerHeight: 0.28,
        retractionDistance: 6,
        retractionSpeed: 2700,
        printSpeed: 1500,
        travelSpeed: 7500,
        enableABL: false,
        restoreABL: false
      }
      
      try {
        const result = await generateParameterizedGcode('speed-calibration', parameters)
        
        // Add speed calibration instructions at the beginning
        let gcode = `; Speed Calibration\n`
        gcode += `; Speed range: ${startSpeed || 40} to ${endSpeed || 120} mm/s (step: ${stepSpeed || 10} mm/s)\n`
        gcode += `; Line length: ${lineLength || 160} mm\n`
        gcode += `; Hotend: ${hotendTemp || 240}°C, Bed: ${bedTemp || 50}°C\n\n`
        gcode += `; This test prints progressive speed lines to find maximum reliable speed\n`
        gcode += `; Inspect for under-extrusion, ringing, or missed steps as speed increases\n`
        gcode += `; Choose the highest speed with acceptable quality and no skipped steps\n\n`
        
        // Add the parameterized G-code
        gcode += result.gcode
        
        return gcode
      } catch (error) {
        console.error('Error generating parameterized G-code:', error)
        // Fallback to simple G-code
        return `; Speed Calibration\n; Speed range: ${startSpeed || 40} to ${endSpeed || 120} mm/s\n; Line length: ${lineLength || 160} mm\n; Hotend: ${hotendTemp || 240}°C, Bed: ${bedTemp || 50}°C\n; Print speed test lines and inspect for quality issues`
      }
    }
  }
)

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
