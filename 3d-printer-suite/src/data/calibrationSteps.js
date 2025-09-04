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
    description: 'Calibrate the extruder steps per mm to ensure accurate filament extrusion',
    category: 'Movement',
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
    description: 'Optimize retraction settings to eliminate stringing and oozing',
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
    gcode: (inputValues) => {
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

      const feedRetract = Math.round(retractionSpeed * 60)
      const towers = Math.max(2, Math.min(20, retractionSteps))
      const start = Math.max(0, startRetraction)
      const end = Math.max(0, endRetraction)
      const step = towers > 1 ? (end - start) / (towers - 1) : 0

      // Bed size if available
      const bed = (typeof window !== 'undefined' && window.__PRINTER_BED__) || { x: 220, y: 220 }
      const margin = 20
      const baseY = Math.min(bed.y - margin, Math.max(margin, 40))
      const spacing = Math.max(18, Math.min(40, (bed.x - margin * 2) / Math.max(2, towers - 1)))
      const baseX = Math.max(margin, Math.min(bed.x - margin - spacing * (towers - 1), margin))

      let gcode = ''
      gcode += `; Retraction Tuning Towers (TeachingTech-style)\n+; Start S=${start.toFixed(2)}mm End S=${end.toFixed(2)}mm Steps=${towers} Speed=${retractionSpeed}mm/s\n`
      gcode += `G90\nM82\nM106 S0\n`
      gcode += `M140 S${bedTemp}\nM190 S${bedTemp}\n`
      gcode += `M104 S${hotendTemp}\nM109 S${hotendTemp}\n`
      gcode += `G28\nG1 Z5 F1200\n`
      if (enableZHop) {
        gcode += `M207 S${start.toFixed(2)} F${feedRetract} Z${zHop}\n`
      } else {
        gcode += `M207 S${start.toFixed(2)} F${feedRetract}\n`
      }
      gcode += `G92 E0\n`

      const travelF = 9000
      const drawF = 1800
      const zFirst = 0.28
      const zHopF = 1200

      // Prime
      gcode += `G1 X${(margin).toFixed(2)} Y${(margin).toFixed(2)} F${travelF}\n`
      gcode += `G1 Z${zFirst.toFixed(2)} F${zHopF}\nG1 E2 F1500\nG92 E0\n`
      gcode += `G1 Y${Math.min(bed.y - margin, margin + 60).toFixed(2)} E6 F${drawF}\nG92 E0\n`

      // Create towers left->right, each with a different S
      for (let i = 0; i < towers; i++) {
        const x = baseX + i * spacing
        const S = (start + step * i)
        gcode += `\n; Tower ${i + 1} — Retraction S=${S.toFixed(2)}mm\n`
        gcode += `M207 S${S.toFixed(2)} F${feedRetract}${enableZHop ? ` Z${zHop}` : ''}\n`
        // Simple two-post path between two close points to force retractions
        const dx = 6
        const y0 = baseY
        const y1 = baseY + Math.max(20, testDistance)
        gcode += `G1 Z${zFirst.toFixed(2)} F${zHopF}\n`
        gcode += `G1 X${x.toFixed(2)} Y${y0.toFixed(2)} F${travelF}\nG92 E0\n`
        for (let r = 0; r < 8; r++) {
          const yA = y0 + r * ((y1 - y0) / 8)
          const yB = yA + ((y1 - y0) / 8)
          gcode += `G1 X${(x + dx).toFixed(2)} Y${yA.toFixed(2)} F${travelF}\n`
          gcode += `G1 X${(x + dx).toFixed(2)} Y${yB.toFixed(2)} E0.8 F${drawF}\n`
          gcode += `G1 X${x.toFixed(2)} Y${yB.toFixed(2)} F${travelF}\n`
        }
        // small wipe and retract sequence
        gcode += `G1 E-0.4 F${feedRetract}\nG1 X${(x + dx + 2).toFixed(2)} F${travelF}\nG92 E0\n`
      }

      // Restore and cool down
      gcode += `\nM106 S0\nM104 S0\nM140 S0\nG1 Z10 F${zHopF}\nM84\n`

      return gcode
    }
  },
  
  {
    id: 'first-layer',
    title: 'First Layer Calibration',
    description: 'Calibrate the first layer height and bed leveling for perfect adhesion',
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
    gcode: (inputValues) => {
      const { layerHeight, firstLayerHeight, bedTemp, hotendTemp, printSpeed, enableBedLeveling } = inputValues
      const primingRetract = 6
      const travelF = 11000
      const zHopF = 1200
      const perimF = Math.max(1200, Math.round((printSpeed * 60)))

      // Determine bed size (fallback 220x220); allow app to set window.__PRINTER_BED__ = { x, y }
      const bed = (typeof window !== 'undefined' && window.__PRINTER_BED__) || { x: 220, y: 220 }
      const margin = 10
      const minX = margin
      const minY = margin
      const maxX = Math.max(margin + 40, bed.x - margin)
      const maxY = Math.max(margin + 40, bed.y - margin)
      const spanX = Math.max(40, maxX - minX)
      const spanY = Math.max(40, maxY - minY)
      const stepX = spanX / 3
      const stepY = spanY / 3

      const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

      const pos = [
        // 2x2 grid near corners within margins
        { x: clamp(minX + stepX * 0.5, margin, bed.x - margin), y: clamp(minY + stepY * 0.5, margin, bed.y - margin) },
        { x: clamp(minX + stepX * 0.5, margin, bed.x - margin), y: clamp(minY + stepY * 2.5, margin, bed.y - margin) },
        { x: clamp(minX + stepX * 2.5, margin, bed.x - margin), y: clamp(minY + stepY * 1.5, margin, bed.y - margin) },
        { x: clamp(minX + stepX * 1.5, margin, bed.x - margin), y: clamp(minY + stepY * 0.5, margin, bed.y - margin) }
      ]

      let gcode = ''
      gcode += `; First Layer Calibration (auto-sized)\n`
      gcode += `; Bed ${bed.x}x${bed.y} | Layer: ${layerHeight} | First: ${firstLayerHeight} | Bed ${bedTemp}°C | Hotend ${hotendTemp}°C | Speed ${printSpeed}mm/s\n`
      gcode += `G90\nM82\nM106 S0\n`
      gcode += `M140 S${bedTemp}\nM190 S${bedTemp}\n`
      gcode += `M104 S${Math.max(0, hotendTemp - 50)} T0\n`
      gcode += `G28 ; home all axes\n`
      if (enableBedLeveling) {
        gcode += `M420 S1 ; restore ABL mesh\n`
      } else {
        gcode += `M420 S0\n`
      }
      gcode += `M109 S${hotendTemp} T0\n`
      gcode += `G0 Z3 F${zHopF}\n`

      // Prime line along left edge within margins
      const primeX = clamp(minX, margin, bed.x - margin)
      const primeY0 = clamp(minY, margin, bed.y - margin)
      const primeY1 = clamp(minY + Math.min(60, spanY * 0.6), margin, bed.y - margin)
      gcode += `G92 E0\nG1 X${primeX.toFixed(2)} Y${primeY0.toFixed(2)} F${travelF}\n`
      gcode += `G1 Z${firstLayerHeight.toFixed(3)} F${zHopF}\n`
      gcode += `G1 E2 F1200\nG92 E0\n`
      gcode += `G1 Y${primeY1.toFixed(2)} E6 F${perimF}\n`
      gcode += `G1 E${(6 - primingRetract).toFixed(2)} F2400\nG92 E0\n`

      const square = (cx, cy, size) => {
        const half = size / 2
        const x0 = clamp(cx - half, margin, bed.x - margin)
        const y0 = clamp(cy - half, margin, bed.y - margin)
        const x1 = clamp(cx + half, margin, bed.x - margin)
        const y1 = clamp(cy + half, margin, bed.y - margin)
        let s = ''
        s += `; square at ${cx.toFixed(2)},${cy.toFixed(2)} size ${size.toFixed(2)}\n`
        s += `G92 E0\nG1 E-${primingRetract} F2400\n`
        s += `G1 Z${firstLayerHeight.toFixed(3)} F${zHopF}\n`
        s += `G1 X${x0.toFixed(2)} Y${y0.toFixed(2)} F${travelF}\n`
        s += `G1 E0 F2400\nG92 E0\n`
        s += `G1 X${x1.toFixed(2)} Y${y0.toFixed(2)} E0.8 F${perimF}\n`
        s += `G1 X${x1.toFixed(2)} Y${y1.toFixed(2)} E1.6\n`
        s += `G1 X${x0.toFixed(2)} Y${y1.toFixed(2)} E2.4\n`
        s += `G1 X${x0.toFixed(2)} Y${y0.toFixed(2)} E3.2\n`
        s += `G1 E-${primingRetract} F2400\n`
        return s
      }

      const sqSize = Math.min(spanX, spanY) / 3
      pos.forEach(p => { gcode += square(p.x, p.y, sqSize) })

      gcode += `G28 X0\nM106 S0\nM104 S0\nM140 S0\nM84\n`
      return gcode
    }
  },
  
  {
    id: 'flow-rate',
    title: 'Flow Rate Calibration',
    description: 'Calibrate the flow rate to achieve accurate wall thickness and dimensions',
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
    gcode: (inputValues) => {
      const { startTemp, endTemp, tempStep, bedTemp, includeBed } = inputValues

      // Geometry and motion defaults (kept simple and robust)
      const layerHeight = 0.28
      const segmentLayers = 20 // ~5.6 mm per segment at 0.28 mm layers
      const travelF = 9000
      const perimF = 1800
      const primeF = 1500
      const retractF = 2400
      const zF = 1200
      const towerSize = 40 // mm square
      const wallExtrusionPerSide = 0.8 // approx extrusion per 40 mm side with 0.4 nozzle

      // Bed bounds (if provided by app)
      const bed = (typeof window !== 'undefined' && window.__PRINTER_BED__) || { x: 220, y: 220 }
      const margin = 20
      const centerX = Math.max(margin + towerSize / 2, Math.min(bed.x - margin - towerSize / 2, bed.x / 2))
      const centerY = Math.max(margin + towerSize / 2, Math.min(bed.y - margin - towerSize / 2, bed.y / 2))
      const x0 = (centerX - towerSize / 2).toFixed(3)
      const x1 = (centerX + towerSize / 2).toFixed(3)
      const y0 = (centerY - towerSize / 2).toFixed(3)
      const y1 = (centerY + towerSize / 2).toFixed(3)

      // Temperature sequence
      const dir = startTemp <= endTemp ? 1 : -1
      const stepAbs = Math.max(1, Math.abs(tempStep))
      const temps = []
      for (let t = startTemp; dir > 0 ? t <= endTemp : t >= endTemp; t += dir * stepAbs) {
        temps.push(Math.round(t))
      }
      if (temps.length === 0) temps.push(Math.round(startTemp))

      let gcode = ''
      gcode += `; Temperature Tower — auto-generated\n`
      gcode += `; Range: ${startTemp} -> ${endTemp} (step ${dir * stepAbs}) | Layer ${layerHeight} | Segment layers ${segmentLayers}\n`
      gcode += `G90\nM82\nM106 S0\n`
      if (includeBed) {
        gcode += `M140 S${bedTemp}\nM190 S${bedTemp}\n`
      }
      // Preheat near starting temp, home, then set exact start
      gcode += `M104 S${Math.max(0, temps[0] - 50)}\n`
      gcode += `G28 ; home all axes\n`
      gcode += `M109 S${temps[0]}\n`
      gcode += `G92 E0\nG1 Z3 F${zF}\n`

      // Prime line at left margin
      const primeY0 = Math.max(margin, Math.min(bed.y - margin, centerY - 30)).toFixed(2)
      const primeY1 = Math.max(margin, Math.min(bed.y - margin, centerY + 30)).toFixed(2)
      const primeX = Math.max(margin, Math.min(bed.x - margin, centerX - towerSize)).toFixed(2)
      gcode += `G1 X${primeX} Y${primeY0} F${travelF}\n`
      gcode += `G1 Z${layerHeight.toFixed(2)} F${zF}\n`
      gcode += `G1 E2 F${primeF}\nG92 E0\n`
      gcode += `G1 Y${primeY1} E6 F${perimF}\nG92 E0\n`

      // Move to tower start
      gcode += `G1 X${x0} Y${y0} F${travelF}\n`

      let currentZ = layerHeight
      let currentTempIndex = 0
      const totalLayers = temps.length * segmentLayers
      for (let layer = 0; layer < totalLayers; layer++) {
        // Temperature change at the start of each segment
        if (layer % segmentLayers === 0) {
          currentTempIndex = Math.floor(layer / segmentLayers)
          const t = temps[currentTempIndex]
          gcode += `\n; ===== Segment ${currentTempIndex + 1}/${temps.length} — ${t}°C =====\n`
          // Blocking wait to reach new temp for top-of-segment clarity
          gcode += `M109 S${t}\n`
        }

        // Set Z for this layer
        gcode += `G1 Z${currentZ.toFixed(3)} F${zF}\n`

        // Single-outline perimeter square
        gcode += `G92 E0\n`
        gcode += `G1 X${x1} Y${y0} E${wallExtrusionPerSide.toFixed(3)} F${perimF}\n`
        gcode += `G1 X${x1} Y${y1} E${(wallExtrusionPerSide * 2).toFixed(3)}\n`
        gcode += `G1 X${x0} Y${y1} E${(wallExtrusionPerSide * 3).toFixed(3)}\n`
        gcode += `G1 X${x0} Y${y0} E${(wallExtrusionPerSide * 4).toFixed(3)}\n`
        gcode += `G1 E-0.6 F${retractF}\n`

        // Small Z hop travel to decorrelate seams
        gcode += `G1 Z${(currentZ + 0.2).toFixed(3)} F${zF}\n`
        gcode += `G1 X${x0} Y${y0} F${travelF}\n`
        gcode += `G1 Z${(currentZ + layerHeight).toFixed(3)} F${zF}\n`

        currentZ += layerHeight
      }

      // Finish and cool
      gcode += `\nM106 S0\nM104 S0\nM140 S0\nG1 Z${(currentZ + 5).toFixed(2)} F${zF}\nM84\n`
      return gcode
    }
  }
]

// Additional steps appended at the end to preserve previous ordering: Calibration Cube and Speed Calibration
calibrationSteps.push(
  {
    id: 'calibration-cube',
    title: 'Calibration Cube',
    description: 'Print a 20 mm calibration cube to verify dimensional accuracy and general print health',
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
    description: 'Print progressive speed lines to find the fastest reliable print speed without artifacts',
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
    gcode: (v) => {
      const bed = (typeof window !== 'undefined' && window.__PRINTER_BED__) || { x: 220, y: 220 }
      const start = Math.max(5, v.startSpeed || 40)
      const end = Math.max(start + 5, v.endSpeed || 120)
      const step = Math.max(1, v.stepSpeed || 10)
      const length = Math.min(bed.x - 40, Math.max(60, v.lineLength || 160))
      const hot = Math.max(0, v.hotendTemp || 210)
      const bedT = Math.max(0, v.bedTemp || 60)

      // Build speeds array
      const speeds = []
      for (let s = start; s <= end; s += step) speeds.push(Math.round(s))
      if (speeds.length === 0) speeds.push(Math.round(start))

      const margin = 20
      const xStart = Math.max(margin, (bed.x - length) / 2).toFixed(2)
      const xEnd = (parseFloat(xStart) + length).toFixed(2)
      const yBase = Math.max(margin, bed.y * 0.2)

      let g = ''
      g += `; Speed Calibration Lines\nG90\nM82\nM106 S0\n`
      g += `M140 S${bedT}\nM190 S${bedT}\n`
      g += `M104 S${hot}\nM109 S${hot}\n`
      g += `G28\nG1 Z0.28 F1200\nG92 E0\n`

      // Prime
      g += `G1 X${xStart} Y${(yBase - 10).toFixed(2)} F9000\nG1 E2 F1500\nG92 E0\n`

      speeds.forEach((s, idx) => {
        const F = Math.round(s * 60)
        const y = (yBase + idx * 4).toFixed(2)
        g += `; Speed ${s} mm/s\n`
        // Forward line
        g += `G1 X${xStart} Y${y} F9000\nG92 E0\n`
        g += `G1 X${xEnd} Y${y} E${(length * 0.04).toFixed(3)} F${F}\n`
        // Return line slightly above
        const y2 = (parseFloat(y) + 1.2).toFixed(2)
        g += `G1 X${xEnd} Y${y2} F9000\nG92 E0\n`
        g += `G1 X${xStart} Y${y2} E${(length * 0.04).toFixed(3)} F${F}\n`
      })

      g += `M106 S0\nM104 S0\nM140 S0\nG1 Z5 F1200\nM84\n`
      return g
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
