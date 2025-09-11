/**
 * Help text for calibration parameters
 * Provides detailed explanations for each parameter in context of its calibration step
 */

export const parameterHelpText = {
  // Bed Leveling Parameters
  'probeSpeed': 'Speed at which the probe moves during bed leveling. Slower speeds (200-400 mm/min) provide more accurate readings but take longer. Faster speeds (500-800 mm/min) are quicker but may be less accurate.',
  
  'bedLevelGridX': 'Number of probe points along the X-axis (left to right). More points provide better bed mapping but take longer. 3-5 points are usually sufficient for most beds. Maximum of 30 points supported.',
  
  'bedLevelGridY': 'Number of probe points along the Y-axis (front to back). More points provide better bed mapping but take longer. 3-5 points are usually sufficient for most beds. Maximum of 30 points supported.',
  
  'probeZOffset': 'Distance between the probe trigger point and the actual nozzle tip. This compensates for the physical offset between your probe and nozzle. Positive values move the nozzle closer to the bed.',
  
  'enableBedHeating': 'Whether to heat the bed during leveling. Heating helps ensure consistent readings as the bed expands slightly when heated. Recommended for most materials.',
  
  'bedTemp': 'Target bed temperature during leveling. Use the same temperature you plan to print at. Common values: PLA (60°C), PETG (70-80°C), ABS (80-100°C).',

  // PID Tune Parameters
  'hotendTemp': 'Target temperature for the hotend during PID tuning. Use your typical printing temperature. The PID controller will learn to maintain this temperature efficiently.',
  
  'pidCycles': 'Number of heating/cooling cycles for PID tuning. More cycles (8-12) provide better tuning but take longer. Fewer cycles (4-6) are faster but may be less accurate.',
  
  'pidTuneSpeed': 'Fan speed during PID tuning. Higher speeds help cool the hotend faster between cycles. Use 100% for most printers, or lower if your fan is very powerful.',

  // Extruder E-Steps Parameters
  'currentEsteps': 'Current E-steps per millimeter setting from your printer. This is used as a starting point for the calibration. Found in your printer\'s firmware settings (usually M92 E command).',
  
  'extrudeLength': 'Length of filament to extrude during the test. 100mm is standard and provides good accuracy. Make sure you have enough filament loaded.',
  
  'extrudeSpeed': 'Speed at which to extrude filament during the test. Slower speeds (50-100 mm/min) are more accurate. Faster speeds may cause under-extrusion and inaccurate results.',
  
  'measurementLength': 'Actual length of filament extruded, measured with calipers. This is what you measure after the test, not what you input beforehand.',

  // Retraction Tuning Parameters
  'retractionDistance': 'How far the filament is pulled back during retraction. Start with 2-3mm for Bowden setups, 0.5-1mm for direct drive. Higher values reduce stringing but may cause under-extrusion.',
  
  'retractionSpeed': 'Speed at which the filament is retracted and primed. 25-45 mm/s is typical. Too fast can cause grinding, too slow can cause stringing.',
  
  'primeSpeed': 'Speed at which the filament is pushed back after retraction. Usually the same as retraction speed. This refills the nozzle after retraction.',
  
  'retractionTests': 'Number of retraction tests to perform. Each test uses different distance/speed combinations. More tests provide better data but take longer to print.',

  // First Layer Parameters
  'firstLayerHeight': 'Height of the first layer in millimeters. Should be 75-90% of your nozzle diameter. 0.2mm for 0.4mm nozzle, 0.15mm for 0.3mm nozzle.',
  
  'firstLayerSpeed': 'Speed for the first layer in mm/s. Slower speeds (10-20 mm/s) improve bed adhesion. This is separate from your normal print speed.',
  
  'firstLayerWidth': 'Width of the first layer lines. Usually 100-120% of nozzle diameter. Wider lines improve bed adhesion but may cause over-extrusion.',
  
  'enableABL': 'Whether to use Auto Bed Leveling (ABL) for the first layer. If enabled, the printer will use the stored bed mesh to compensate for bed unevenness.',

  // Temperature Tower Parameters
  'startTemp': 'Starting temperature for the temperature tower. Usually 20-30°C above your material\'s recommended range. The tower will test temperatures down to the minimum.',
  
  'endTemp': 'Ending temperature for the temperature tower. Usually 20-30°C below your material\'s recommended range. This defines the lowest temperature to test.',
  
  'tempStep': 'Temperature change between each section of the tower. 5°C steps are common for most materials. Smaller steps (2-3°C) provide more detailed results.',
  
  'towerHeight': 'Height of each temperature section in millimeters. 10-15mm per section is typical. Taller sections make it easier to see differences in print quality.',

  // Flow Rate Parameters
  'flowRate': 'Extrusion multiplier as a percentage. 100% means normal flow. Higher values increase extrusion, lower values decrease it. This compensates for over/under-extrusion.',
  
  'wallThickness': 'Target thickness of the printed walls in millimeters. Usually 2-4 times your nozzle diameter. 0.8mm for 0.4mm nozzle, 1.2mm for 0.6mm nozzle.',
  
  'flowTests': 'Number of flow rate tests to perform. Each test uses a different flow rate percentage. More tests provide better data but take longer to print.',

  // Calibration Cube Parameters
  'cubeSize': 'Size of the calibration cube in millimeters. 20mm is standard and easy to measure. Larger cubes are easier to measure but use more filament.',
  
  'printSpeed': 'Print speed in mm/s for the calibration cube. Use your typical print speed. This tests dimensional accuracy at your normal printing speed.',
  
  'layerHeight': 'Height of each layer in millimeters. 0.2mm is common for 0.4mm nozzles. Smaller layers (0.1-0.15mm) provide better detail but take longer.',
  
  'infillPercent': 'Percentage of infill for the cube. 20-30% is typical for calibration cubes. Higher infill makes the cube stronger but uses more filament.',

  // Speed Calibration Parameters
  'minSpeed': 'Minimum speed to test in mm/s. Start with 20-30 mm/s. This is the slowest speed that still produces good quality.',
  
  'maxSpeed': 'Maximum speed to test in mm/s. End with 100-150 mm/s for most printers. This is the fastest speed before quality degrades significantly.',
  
  'speedStep': 'Speed increment between tests in mm/s. 10-20 mm/s steps are common. Smaller steps provide more detailed results but take longer to print.',
  
  'acceleration': 'Acceleration setting in mm/s². Higher values allow faster speed changes but may cause ringing. Start with your printer\'s default setting.',

  // Global Parameters
  'nozzleDiameter': 'Diameter of your printer\'s nozzle in millimeters. Common sizes: 0.4mm (most common), 0.3mm (fine detail), 0.6mm (faster printing).',
  
  'filamentDiameter': 'Actual diameter of your filament in millimeters. Most filament is 1.75mm, but measure with calipers as it can vary. This affects extrusion calculations.',
  
  'printSpeed': 'Your typical print speed in mm/s. This is used as a baseline for various calibration tests. 50-80 mm/s is common for most printers.',
  
  'hotendTemp': 'Your typical hotend temperature in °C. This varies by material: PLA (190-220°C), PETG (220-250°C), ABS (240-260°C).',
  
  'bedTemp': 'Your typical bed temperature in °C. This varies by material: PLA (50-70°C), PETG (70-80°C), ABS (80-100°C).',
  
  'retractionDistance': 'How far to retract filament in millimeters. 2-3mm for Bowden setups, 0.5-1mm for direct drive. This prevents stringing between printed parts.',
  
  'retractionSpeed': 'Speed of retraction in mm/s. 25-45 mm/s is typical. This should be fast enough to prevent stringing but not so fast as to cause grinding.',
  
  'primeSpeed': 'Speed of priming after retraction in mm/s. Usually the same as retraction speed. This refills the nozzle after retraction.',
  
  'flowRate': 'Extrusion multiplier as a percentage. 100% is normal flow. Adjust this to compensate for over/under-extrusion in your prints.',
  
  'wallThickness': 'Target wall thickness in millimeters. Usually 2-4 times your nozzle diameter. This affects the strength and appearance of your prints.',
  
  'enableABL': 'Whether to use Auto Bed Leveling. If enabled, the printer compensates for bed unevenness using a stored mesh. Recommended for most printers.',
  
  'firstLayerSpeed': 'Speed for the first layer in mm/s. Slower speeds (10-20 mm/s) improve bed adhesion. This is separate from your normal print speed.',
  
  'probeZOffset': 'Distance between probe trigger point and nozzle tip in millimeters. This compensates for the physical offset between your probe and nozzle.',
  
  'bedLevelGridX': 'Number of probe points along the X-axis for bed leveling. More points provide better mapping but take longer.',
  
  'bedLevelGridY': 'Number of probe points along the Y-axis for bed leveling. More points provide better mapping but take longer.',
  
  'currentEsteps': 'Current E-steps per millimeter from your printer\'s firmware. This is used as a starting point for E-steps calibration.'
}

/**
 * Get help text for a parameter
 * @param {string} parameterKey - The parameter key
 * @param {string} stepId - The calibration step ID (optional, for step-specific help)
 * @returns {string} Help text for the parameter
 */
export const getParameterHelpText = (parameterKey, stepId = null) => {
  return parameterHelpText[parameterKey] || 'No help text available for this parameter.'
}

export default parameterHelpText
