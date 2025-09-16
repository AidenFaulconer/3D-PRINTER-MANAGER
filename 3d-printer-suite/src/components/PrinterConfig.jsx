import { useState, useCallback, useMemo } from 'react'
import { Edit, Save, X, Printer, Settings, Ruler, Thermometer, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import useSerialStore from '../stores/serialStore'
import { loadGlobalParameters } from '../utils/ParameterTracker'
import BedMeshVisualization from './BedMeshVisualization'
import ConfigurationManagementTab from './ConfigurationManagementTab'
import MarlinDefineCategorizer from './MarlinDefineCategorizer'

// Sample Marlin defines data - in a real implementation, this would come from the printer's configuration
const sampleMarlinDefines = [
  // MMU and Extrusion
  { name: '_MMU_EXTRUDER_HEATBREAK_LENGTH', value: 17.7, unit: 'mm', type: 'advanced', description: 'MMU extruder heatbreak length' },
  { name: '_MMU_EXTRUDER_PTFE_LENGTH', value: 42.3, unit: 'mm', type: 'advanced', description: 'MMU extruder PTFE length' },
  { name: '_MMU3_LOAD_DISTANCE_PAST_GEARS', value: 5, unit: 'mm', type: 'advanced', description: 'MMU3 load distance past gears' },
  { name: '_MMU3_VERIFY_LOAD_TO_NOZZLE_TWEAK', value: -5, unit: 'mm', type: 'advanced', description: 'Amount to adjust the length for verifying load-to-nozzle' },
  
  // Default Values and Constants
  { name: 'DEFAULT_Kc', value: 100, type: 'advanced', description: 'heating power = Kc * e_speed' },
  { name: 'DEFAULT_Kd_LIST', value: '{ 114.00, 114.00 }', type: 'basic', description: 'Default PID D values list' },
  { name: 'DEFAULT_KEEPALIVE_INTERVAL', value: 2, unit: 's', type: 'basic', description: 'Number of seconds between "busy" messages. Set with M113.' },
  { name: 'DEFAULT_Kf', value: 10, type: 'advanced', description: 'A constant value added to the PID-tuner' },
  { name: 'DEFAULT_Ki_LIST', value: '{ 1.08, 1.08 }', type: 'basic', description: 'Default PID I values list' },
  { name: 'DEFAULT_KJERK', value: 0.3, type: 'basic', description: 'Default K axis jerk' },
  { name: 'DEFAULT_Kp_LIST', value: '{ 22.20, 22.20 }', type: 'basic', description: 'Default PID P values list' },
  { name: 'DEFAULT_LEVELING_FADE_HEIGHT', value: 10, unit: 'mm', type: 'basic', description: 'Default fade height.' },
  { name: 'DEFAULT_MEASURED_FILAMENT_DIA', value: 'DEFAULT_NOMINAL_FILAMENT_DIA', type: 'advanced', description: 'Set measured to nominal initially' },
  { name: 'DEFAULT_MINIMUMFEEDRATE', value: 0, unit: 'mm/s', type: 'advanced', description: 'Minimum feedrate. Set with M205 S.' },
  { name: 'DEFAULT_MINSEGMENTTIME', value: 20000, unit: 'µs', type: 'advanced', description: 'Set with M205 B.' },
  { name: 'DEFAULT_MINTRAVELFEEDRATE', value: 0, unit: 'mm/s', type: 'advanced', description: 'Minimum travel feedrate. Set with M205 T.' },
  { name: 'DEFAULT_NOMINAL_FILAMENT_DIA', value: 1.75, unit: 'mm', type: 'basic', description: 'Generally expected filament diameter' },
  { name: 'DEFAULT_SEGMENTS_PER_SECOND', value: 200, type: 'basic', description: 'Move segmentation based on duration' },
  { name: 'DEFAULT_SHARED_VOLUME', value: 'USB_FLASH_DRIVE', type: 'advanced', description: 'Shared volume type' },
  { name: 'DEFAULT_STEPPER_TIMEOUT_SEC', value: 120, unit: 's', type: 'advanced', description: 'Stepper timeout in seconds' },
  { name: 'DEFAULT_TRAVEL_ACCELERATION', value: 1000, unit: 'mm/s²', type: 'basic', description: 'X, Y, Z acceleration for travel moves' },
  { name: 'DEFAULT_UJERK', value: 0.3, type: 'basic', description: 'Default U axis jerk' },
  { name: 'DEFAULT_VJERK', value: 0.3, type: 'basic', description: 'Default V axis jerk' },
  { name: 'DEFAULT_VOLUME', value: 'SD_ONBOARD', type: 'advanced', description: 'Default volume type' },
  { name: 'DEFAULT_VOLUMETRIC_EXTRUDER_LIMIT', value: 0, unit: 'mm³/s', type: 'advanced', description: 'Volumetric extruder limit' },
  { name: 'DEFAULT_WJERK', value: 0.3, type: 'basic', description: 'Default W axis jerk' },
  
  // Probing and Bed Leveling
  { name: 'DELAY_BEFORE_PROBING', value: 200, unit: 'ms', type: 'basic', description: 'To prevent vibrations from triggering piezo sensors' },
  { name: 'DELTA_AUTO_CALIBRATION', type: 'basic', description: 'Enable delta auto calibration' },
  { name: 'DELTA_CALIBRATION_DEFAULT_POINTS', value: 4, type: 'basic', description: 'Default number of probe points : n*n (1 -> 7)' },
  { name: 'DELTA_CALIBRATION_MENU', type: 'basic', description: 'Enable delta calibration menu' },
  { name: 'DELTA_DIAGONAL_ROD_TRIM_TOWER', value: '{ 0.0, 0.0, 0.0 }', unit: 'mm', type: 'basic', description: 'Diagonal rod trim tower values' },
  { name: 'DELTA_HOME_TO_SAFE_ZONE', type: 'basic', description: 'After homing move down to a height where XY movement is unconstrained' },
  { name: 'DELTA_MAX_RADIUS', type: 'basic', description: 'Maximum reachable area' },
  { name: 'DELTA_RADIUS_TRIM_TOWER', value: '{ 0.0, 0.0, 0.0 }', unit: 'mm', type: 'basic', description: 'Radius trim tower values' },
  
  // Display and UI
  { name: 'DGUS_LCD_UI', value: 'ORIGIN', type: 'basic', description: 'DGUS LCD UI type' },
  { name: 'DGUS_ADVANCED_SDCARD', type: 'advanced', description: 'Allow more than 20 files and navigating directories' },
  { name: 'DGUS_AUTOSCROLL_END_CYCLES', value: true, type: 'advanced', description: 'Refresh cycles without scrolling at the end of text strings' },
  { name: 'DGUS_AUTOSCROLL_START_CYCLES', value: true, type: 'advanced', description: 'Refresh cycles without scrolling at the beginning of text strings' },
  { name: 'DGUS_FILAMENT_LOAD_LENGTH_PER_TIME', value: 0.5, unit: 'mm', type: 'advanced', description: 'Adjust in proportion to DGUS_UPDATE_INTERVAL_MS' },
  { name: 'DGUS_FILAMENT_LOADUNLOAD', type: 'advanced', description: 'Enable filament load/unload' },
  { name: 'DGUS_FILAMENT_PURGE_LENGTH', value: 10, unit: 'mm', type: 'advanced', description: 'Filament purge length' },
  { name: 'DGUS_PREHEAT_UI', type: 'advanced', description: 'Display a preheat screen during heatup' },
  { name: 'DGUS_PRINT_FILENAME', type: 'advanced', description: 'Display the filename during printing' },
  { name: 'DGUS_RX_BUFFER_SIZE', value: 128, type: 'advanced', description: 'RX buffer size' },
  { name: 'DGUS_SOFTWARE_AUTOSCROLL', type: 'advanced', description: 'Enable long text software auto-scroll' },
  { name: 'DGUS_TX_BUFFER_SIZE', value: 48, type: 'advanced', description: 'TX buffer size' },
  { name: 'DGUS_UI_MOVE_DIS_OPTION', value: false, type: 'advanced', description: 'Disabled by default for FYSETC and MKS' },
  { name: 'DGUS_UI_WAITING', type: 'advanced', description: 'Show a "waiting" screen between some screens' },
  { name: 'DGUS_UI_WAITING_STATUS', value: 10, type: 'advanced', description: 'Waiting status value' },
  { name: 'DGUS_UI_WAITING_STATUS_PERIOD', value: 8, type: 'advanced', description: 'Increase to slower waiting status looping' },
  { name: 'DGUS_UPDATE_INTERVAL_MS', value: 500, unit: 'ms', type: 'advanced', description: 'Interval between automatic screen updates' },
  { name: 'DGUS_USERCONFIRM', type: 'advanced', description: 'Reuse the SD Card page to show various messages' },
  
  // Stepper Drivers and Motors
  { name: 'DIGIPOT_I2C_ADDRESS_A', value: 0, type: 'advanced', description: 'Unshifted slave address for first DIGIPOT' },
  { name: 'DIGIPOT_I2C_ADDRESS_B', value: 0, type: 'advanced', description: 'Unshifted slave address for second DIGIPOT' },
  { name: 'DIGIPOT_I2C_MOTOR_CURRENTS', value: '{ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0 }', type: 'advanced', description: 'Motor currents for AZTEEG_X3_PRO' },
  { name: 'DIGIPOT_I2C_NUM_CHANNELS', value: 8, type: 'advanced', description: 'Number of channels' },
  { name: 'DIGIPOT_MCP4018', value: false, type: 'advanced', description: 'Requires external library' },
  { name: 'DIGIPOT_MCP4451', type: 'advanced', description: 'Enable MCP4451 digipot' },
  { name: 'DIGIPOT_MOTOR_CURRENT', value: '{ 135,135,135,135,135 }', type: 'advanced', description: 'Values 0-255 (RAMBO 135 = ~0.75A, 185 = ~1A)' },
  { name: 'DIGIPOT_USE_RAW_VALUES', value: false, type: 'advanced', description: 'Use DIGIPOT_MOTOR_CURRENT raw wiper values' },
  
  // Movement and Control
  { name: 'DIRECT_MIXING_IN_G1', value: false, type: 'basic', description: 'Allow ABCDHI mix factors in G1 movement commands' },
  { name: 'DIRECT_PIN_CONTROL', type: 'advanced', description: 'Enable direct pin control' },
  { name: 'DIRECT_STEPPING', type: 'advanced', description: 'Enable direct stepping' },
  { name: 'DISABLE_DRIVER_SAFE_POWER_PROTECT', type: 'advanced', description: 'Disable driver safe power protection' },
  { name: 'DISABLE_DUE_SD_MMC', type: 'advanced', description: 'Disable USB Host access to USB Drive' },
  { name: 'DISABLE_E', value: false, type: 'basic', description: 'Disable the extruder when not stepping' },
  { name: 'DISABLE_I', type: 'basic', description: 'Disable I axis' },
  { name: 'DISABLE_IDLE_E', type: 'advanced', description: 'Shut down all idle extruders' },
  { name: 'DISABLE_IDLE_I', type: 'advanced', description: 'Disable idle I axis' },
  { name: 'DISABLE_IDLE_J', type: 'advanced', description: 'Disable idle J axis' },
  { name: 'DISABLE_IDLE_K', type: 'advanced', description: 'Disable idle K axis' },
  { name: 'DISABLE_IDLE_U', type: 'advanced', description: 'Disable idle U axis' },
  { name: 'DISABLE_IDLE_V', type: 'advanced', description: 'Disable idle V axis' },
  { name: 'DISABLE_IDLE_W', type: 'advanced', description: 'Disable idle W axis' },
  { name: 'DISABLE_IDLE_X', type: 'advanced', description: 'Disable idle X axis' },
  { name: 'DISABLE_IDLE_Y', type: 'advanced', description: 'Disable idle Y axis' },
  { name: 'DISABLE_IDLE_Z', type: 'advanced', description: 'Disable idle Z axis' },
  { name: 'DISABLE_J', type: 'basic', description: 'Disable J axis' },
  { name: 'DISABLE_K', type: 'basic', description: 'Disable K axis' },
  { name: 'DISABLE_M503', value: false, type: 'basic', description: 'Saves ~2700 bytes of flash. Disable for release!' },
  { name: 'DISABLE_OTHER_EXTRUDERS', type: 'basic', description: 'Keep only the active extruder enabled' },
  { name: 'DISABLE_REDUCED_ACCURACY_WARNING', value: false, type: 'basic', description: 'Disable reduced accuracy warning' },
  { name: 'DISABLE_U', type: 'basic', description: 'Disable U axis' },
  { name: 'DISABLE_V', type: 'basic', description: 'Disable V axis' },
  { name: 'DISABLE_W', type: 'basic', description: 'Disable W axis' },
  { name: 'DISABLE_X', type: 'basic', description: 'WARNING: When motors turn off there is a chance of losing position accuracy!' },
  { name: 'DISABLE_Y', type: 'basic', description: 'Disable Y axis' },
  { name: 'DISABLE_Z', type: 'basic', description: 'Disable Z axis' },
  
  // Display Configuration
  { name: 'DISPLAY_CHARSET_HD44780', value: 'JAPANESE', type: 'basic', description: 'HD44780 display charset' },
  { name: 'DISPLAY_SLEEP_MINUTES', value: 2, unit: 'min', type: 'advanced', description: 'Timeout before turning off the screen. Set with M255 S.' },
  { name: 'DISTINCT_E_FACTORS', type: 'basic', description: 'Enable distinct E factors' },
  { name: 'DOGM_SPI_DELAY_US', value: 5, unit: 'µs', type: 'advanced', description: 'Delay after each SPI transfer' },
  { name: 'DOUBLE_LCD_FRAMERATE', value: false, type: 'advanced', description: 'Not recommended for slow boards.' },
  { name: 'DOUBLECLICK_FOR_Z_BABYSTEPPING', type: 'advanced', description: 'Double-click on the Status Screen for Z Babystepping.' },
  { name: 'DOUBLECLICK_MAX_INTERVAL', value: 1250, unit: 'ms', type: 'advanced', description: 'Maximum interval between clicks.' },
  
  // EEPROM and Settings
  { name: 'EEPROM_AUTO_INIT', type: 'basic', description: 'Init EEPROM automatically on any errors.' },
  { name: 'EEPROM_BOOT_SILENT', type: 'basic', description: 'Keep M503 quiet and only give errors during first load' },
  { name: 'EEPROM_CHITCHAT', type: 'basic', description: 'Give feedback on EEPROM commands. Disable to save flash.' },
  { name: 'EEPROM_INIT_NOW', type: 'basic', description: 'Init EEPROM on first boot after a new build.' },
  { name: 'EEPROM_SETTINGS', type: 'basic', description: 'Persistent storage with M500 and M501' },
  
  // Extruder Configuration
  { name: 'E0_AUTO_FAN_PIN', value: -1, type: 'advanced', description: 'E0 auto fan pin' },
  { name: 'E0_CHAIN_POS', value: -1, type: 'advanced', description: 'E0 chain position' },
  { name: 'E0_CS_PIN', value: -1, type: 'advanced', description: 'E0 CS pin' },
  { name: 'E0_CURRENT', value: 650, type: 'advanced', description: 'E0 current' },
  { name: 'E0_FAN_TACHO_PIN', value: -1, type: 'advanced', description: 'E0 fan tacho pin' },
  { name: 'E0_FAN_TACHO_PULLDOWN', type: 'advanced', description: 'E0 fan tacho pulldown' },
  { name: 'E0_FAN_TACHO_PULLUP', type: 'advanced', description: 'E0 fan tacho pullup' },
  { name: 'E0_HOLD_MULTIPLIER', value: 0.5, type: 'advanced', description: 'E0 hold multiplier' },
  { name: 'E0_HYBRID_THRESHOLD', value: 30, type: 'advanced', description: 'E0 hybrid threshold' },
  { name: 'E0_INTERPOLATE', value: true, type: 'advanced', description: 'E0 interpolate' },
  { name: 'E0_MICROSTEPS', value: 16, type: 'advanced', description: 'E0 microsteps' },
  { name: 'E0_SLAVE_ADDRESS', value: false, type: 'advanced', description: 'E0 slave address' },
  
  // Additional E1-E7 extruder configurations (abbreviated for space)
  { name: 'E1_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E1 current (same as E0)' },
  { name: 'E2_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E2 current (same as E0)' },
  { name: 'E3_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E3 current (same as E0)' },
  { name: 'E4_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E4 current (same as E0)' },
  { name: 'E5_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E5 current (same as E0)' },
  { name: 'E6_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E6 current (same as E0)' },
  { name: 'E7_CURRENT', value: 'E0_CURRENT', type: 'advanced', description: 'E7 current (same as E0)' },
  
  // Filament and Runout
  { name: 'FIL_RUNOUT_ENABLED_DEFAULT', value: true, type: 'basic', description: 'Enable the sensor on startup. Override with M412 followed by M500.' },
  { name: 'FIL_RUNOUT_PULLDOWN', value: false, type: 'basic', description: 'Use internal pulldown for filament runout pins.' },
  { name: 'FIL_RUNOUT_PULLUP', type: 'basic', description: 'Use internal pullup for filament runout pins.' },
  { name: 'FIL_RUNOUT_STATE', value: 'LOW', type: 'basic', description: 'Pin state indicating that filament is NOT present.' },
  { name: 'FILAMENT_CHANGE_ALERT_BEEPS', value: 10, type: 'advanced', description: 'Number of alert beeps to play when a response is needed.' },
  { name: 'FILAMENT_CHANGE_FAST_LOAD_ACCEL', value: 25, unit: 'mm/s²', type: 'advanced', description: 'Lower acceleration may allow a faster feedrate.' },
  { name: 'FILAMENT_CHANGE_FAST_LOAD_FEEDRATE', value: 6, unit: 'mm/s', type: 'advanced', description: 'Load filament feedrate. This can be pretty fast.' },
  { name: 'FILAMENT_CHANGE_SLOW_LOAD_FEEDRATE', value: 6, unit: 'mm/s', type: 'advanced', description: 'Slow move when starting load.' },
  { name: 'FILAMENT_CHANGE_UNLOAD_ACCEL', value: 25, unit: 'mm/s²', type: 'advanced', description: 'Lower acceleration may allow a faster feedrate.' },
  { name: 'FILAMENT_CHANGE_UNLOAD_FEEDRATE', value: 10, unit: 'mm/s', type: 'advanced', description: 'Unload filament feedrate. This can be pretty fast.' },
  { name: 'FILAMENT_CHANGE_UNLOAD_LENGTH', value: 100, unit: 'mm', type: 'advanced', description: 'The length of filament for a complete unload.' },
  { name: 'FILAMENT_HEAT_CAPACITY_PERMM', value: '{ 5.6e-3f }', type: 'basic', description: '0.0056 J/K/mm for 1.75mm PLA (0.0149 J/K/mm for 2.85mm PLA).' },
  { name: 'FILAMENT_LCD_DISPLAY', type: 'advanced', description: 'Display filament width on the LCD status line. Status messages will expire after 5 seconds.' },
  { name: 'FILAMENT_LOAD_UNLOAD_GCODES', value: false, type: 'advanced', description: 'Add M701/M702 Load/Unload G-codes, plus Load/Unload in the LCD Prepare menu.' },
  { name: 'FILAMENT_MOTION_SENSOR', type: 'basic', description: 'Enable filament motion sensor' },
  { name: 'FILAMENT_RUNOUT_PIN', value: 'PA4', type: 'basic', description: 'Filament runout pin' },
  { name: 'FILAMENT_SENSOR_EXTRUDER_NUM', value: false, type: 'advanced', description: 'Index of the extruder that has the filament sensor.' },
  { name: 'FILAMENT_SWITCH_AND_MOTION', type: 'basic', description: 'Enable filament switch and motion' },
  { name: 'FILAMENT_UNLOAD_ALL_EXTRUDERS', value: false, type: 'advanced', description: 'Allow M702 to unload all extruders above a minimum target temp' },
  { name: 'FILAMENT_UNLOAD_PURGE_DELAY', value: 5000, unit: 'ms', type: 'advanced', description: 'Delay for the filament to cool after retract.' },
  { name: 'FILAMENT_UNLOAD_PURGE_FEEDRATE', value: 25, unit: 'mm/s', type: 'advanced', description: 'feedrate to purge before unload' },
  { name: 'FILAMENT_UNLOAD_PURGE_LENGTH', value: 8, unit: 'mm', type: 'advanced', description: 'An unretract is done, then this length is purged.' },
  { name: 'FILAMENT_UNLOAD_PURGE_RETRACT', value: 13, unit: 'mm', type: 'advanced', description: 'Unload initial retract length.' },
  { name: 'FILAMENT_WIDTH_SENSOR', type: 'advanced', description: 'Enable filament width sensor' },
  { name: 'FILWIDTH_ERROR_MARGIN', value: 1, unit: 'mm', type: 'advanced', description: 'If a measurement differs too much from nominal width ignore it' },
  
  // Movement and Control
  { name: 'FINE_MANUAL_MOVE', value: 0.025, unit: 'mm', type: 'advanced', description: 'Smallest manual move (< 0.1mm) applying to Z on most machines' },
  { name: 'FLOW_EDIT_MAX', value: 999, unit: '%', type: 'advanced', description: 'Flow percentage edit range maximum' },
  { name: 'FLOW_EDIT_MIN', value: 10, unit: '%', type: 'advanced', description: 'Flow percentage edit range minimum' },
  { name: 'FLOWMETER_INTERVAL', value: 1000, unit: 'ms', type: 'advanced', description: 'Flow rate calculation interval in milliseconds' },
  { name: 'FLOWMETER_MIN_LITERS_PER_MINUTE', value: 1.5, unit: 'l/min', type: 'advanced', description: 'Minimum flow required when enabled' },
  { name: 'FLOWMETER_PIN', value: 20, type: 'advanced', description: 'Requires an external interrupt-enabled pin' },
  { name: 'FLOWMETER_PPL', value: 5880, type: 'advanced', description: 'Flow meter pulses-per-liter on the input pin' },
  { name: 'FLOWMETER_SAFETY', type: 'advanced', description: 'Prevent running the laser without the minimum flow rate set below' },
  
  // G-code and Motion
  { name: 'G0_FEEDRATE', value: 3000, unit: 'mm/min', type: 'basic', description: 'G0 feedrate' },
  { name: 'G26_MESH_VALIDATION', type: 'basic', description: 'Enable G26 mesh validation' },
  { name: 'G26_RETRACT_MULTIPLIER', value: 1, type: 'basic', description: 'G26 Q (retraction) used by default between mesh test elements.' },
  { name: 'G26_XY_FEEDRATE', value: 20, unit: 'mm/s', type: 'basic', description: 'Feedrate for G26 XY moves.' },
  { name: 'G26_XY_FEEDRATE_TRAVEL', value: 100, unit: 'mm/s', type: 'basic', description: 'Feedrate for G26 XY travel moves.' },
  { name: 'G29_FAILURE_COMMANDS', value: 'M117 Bed leveling failed.\\nG0 Z10\\nM300 P25 S880\\nM300 P50 S0\\nM300 P25 S880\\nM300 P50 S0\\nM300 P25 S880\\nM300 P50 S0\\nG4 S1', type: 'advanced', description: 'Commands to run on G29 failure' },
  { name: 'G29_HALT_ON_FAILURE', type: 'advanced', description: 'Halt on G29 failure' },
  { name: 'G29_MAX_RETRIES', value: 3, type: 'advanced', description: 'Maximum G29 retries' },
  { name: 'G29_RECOVER_COMMANDS', value: 'M117 Probe failed. Rewiping.\\nG28\\nG12 P0 S12 T0', type: 'advanced', description: 'Commands to run on G29 recovery' },
  { name: 'G29_RETRY_AND_RECOVER', type: 'advanced', description: 'Enable G29 retry and recover' },
  { name: 'G29_SUCCESS_COMMANDS', value: 'M117 Bed leveling done.', type: 'advanced', description: 'Commands to run on G29 success' },
  { name: 'G29J_MESH_TILT_MARGIN', value: '((CLIP_H) + 1)', type: 'basic', description: 'only used to compute a linear transformation for the mesh itself.' },
  { name: 'G34_MAX_GRADE', value: 5, unit: '%', type: 'advanced', description: 'Maximum incline that G34 will handle' },
  { name: 'G38_MINIMUM_MOVE', value: 0.0275, unit: 'mm', type: 'advanced', description: 'Minimum distance that will produce a move.' },
  { name: 'G38_PROBE_AWAY', value: false, type: 'advanced', description: 'Include G38.4 and G38.5 to probe away from target' },
  { name: 'G38_PROBE_TARGET', type: 'advanced', description: 'Enable G38 probe target' },
  
  // Homing and Movement
  { name: 'HOMING_FEEDRATE_MM_M', value: '{ (50*60), (50*60), (4*60) }', type: 'basic', description: 'Homing speeds (linear=mm/min, rotational=°/min)' },
  { name: 'HOMING_BACKOFF_POST_MM', value: '{ 2, 2, 2 }', unit: 'mm', type: 'advanced', description: 'Backoff from endstops after homing' },
  { name: 'HOMING_BUMP_DIVISOR', value: '{ 2, 2, 4 }', type: 'advanced', description: 'Re-Bump Speed Divisor (Divides the Homing Feedrate)' },
  { name: 'HOMING_BUMP_MM', value: '{ 5, 5, 2 }', unit: 'mm', type: 'advanced', description: 'Backoff from endstops after first bump' },
  { name: 'HOME_AFTER_DEACTIVATE', value: false, type: 'basic', description: 'Require rehoming after steppers are deactivated.' },
  { name: 'HOME_AFTER_G34', type: 'advanced', description: 'Re-homing might be more precise in reproducing the actual G28 Z homing height' },
  { name: 'HOME_BEFORE_FILAMENT_CHANGE', type: 'advanced', description: 'If needed, home before parking for filament change' },
  { name: 'HOME_Y_BEFORE_X', value: false, type: 'advanced', description: 'If G28 contains XY home Y before X' },
  { name: 'HOME_Z_FIRST', value: false, type: 'advanced', description: 'Home Z first. Requires a real endstop (not a probe).' },
  
  // Temperature and Heating
  { name: 'HEATER_1_MAXTEMP', value: 275, unit: '°C', type: 'basic', description: 'Heater 1 maximum temperature' },
  { name: 'HEATER_1_MINTEMP', value: 5, unit: '°C', type: 'basic', description: 'Heater 1 minimum temperature' },
  { name: 'HEATER_BED_INVERTING', value: true, type: 'advanced', description: 'Invert bed heater' },
  { name: 'HEATER_CHAMBER_INVERTING', value: false, type: 'advanced', description: 'Invert chamber heater' },
  { name: 'HEATERS_PARALLEL', type: 'advanced', description: 'Control heater 0 and heater 1 in parallel.' },
  { name: 'HOTEND_IDLE_BED_TARGET', value: false, unit: '°C', type: 'advanced', description: 'Safe temperature for the bed after timeout' },
  { name: 'HOTEND_IDLE_MIN_TRIGGER', value: 180, unit: '°C', type: 'advanced', description: 'Minimum temperature to enable hotend protection' },
  { name: 'HOTEND_IDLE_NOZZLE_TARGET', value: false, unit: '°C', type: 'advanced', description: 'Safe temperature for the nozzle after timeout' },
  { name: 'HOTEND_IDLE_TIMEOUT_SEC', value: '(5*60)', unit: 's', type: 'advanced', description: 'Time without extruder movement to trigger protection' },
  { name: 'HOTEND_OFFSET_X', value: '{ 0.0, 20.00 }', unit: 'mm', type: 'basic', description: 'relative X-offset for each nozzle' },
  { name: 'HOTEND_OFFSET_Y', value: '{ 0.0, 5.00 }', unit: 'mm', type: 'basic', description: 'relative Y-offset for each nozzle' },
  { name: 'HOTEND_OFFSET_Z', value: '{ 0.0, 0.00 }', unit: 'mm', type: 'basic', description: 'relative Z-offset for each nozzle' },
  { name: 'HOTEND_OVERSHOOT', value: 15, unit: '°C', type: 'basic', description: 'Forbid temperatures over MAXTEMP - OVERSHOOT' },
  
  // Magnetic and Special Probes
  { name: 'MAG_MOUNTED_PROBE', type: 'basic', description: 'Enable magnetic mounted probe' },
  { name: 'MAG_MOUNTED_PROBE_SERVO_ANGLES', value: '{ 90, 0 }', type: 'basic', description: 'Servo Angles for Deployed, Stowed' },
  { name: 'MAG_MOUNTED_PROBE_SERVO_NR', value: false, type: 'basic', description: 'Servo Number for this probe' },
  { name: 'MAG_MOUNTED_STOW_1', value: '{ PROBE_STOW_FEEDRATE, { 245, 114, 20 } }', type: 'basic', description: 'Move to dock' },
  { name: 'MAG_MOUNTED_STOW_2', value: '{ PROBE_STOW_FEEDRATE, { 245, 114, 0 } }', type: 'basic', description: 'Place probe beside remover' },
  { name: 'MAG_MOUNTED_STOW_3', value: '{ PROBE_STOW_FEEDRATE, { 230, 114, 0 } }', type: 'basic', description: 'Side move to remove probe' },
  { name: 'MAG_MOUNTED_STOW_4', value: '{ PROBE_STOW_FEEDRATE, { 210, 114, 20 } }', type: 'basic', description: 'Side move to remove probe' },
  { name: 'MAG_MOUNTED_STOW_5', value: '{ PROBE_STOW_FEEDRATE, { 0, 0, 0 } }', type: 'basic', description: 'Extra move if needed' },
  { name: 'MAGLEV_TRIGGER_DELAY', value: 15, type: 'basic', description: 'Changing this risks overheating the coil' },
  { name: 'MAGLEV_TRIGGER_PIN', value: 11, type: 'basic', description: 'Set to the connected digital output' },
  { name: 'MAGLEV4', type: 'basic', description: 'Enable MAGLEV4 support' },
  { name: 'MAGNETIC_PARKING_EXTRUDER', type: 'basic', description: 'Enable magnetic parking extruder' },
  { name: 'MAGNETIC_SWITCHING_TOOLHEAD', type: 'basic', description: 'Enable magnetic switching toolhead' },
  
  // Menu Configuration
  { name: 'MAIN_MENU_ITEM_1_CONFIRM', value: false, type: 'advanced', description: 'Show a confirmation dialog before this action' },
  { name: 'MAIN_MENU_ITEM_1_DESC', value: 'Home & UBL Info', type: 'advanced', description: 'Menu item description' },
  { name: 'MAIN_MENU_ITEM_1_GCODE', value: 'G28\\nG29 W', type: 'advanced', description: 'G-code to execute' },
  { name: 'MAIN_MENU_ITEM_2_DESC', value: '"Preheat for " PREHEAT_1_LABEL', type: 'advanced', description: 'Menu item description' },
  { name: 'MAIN_MENU_ITEM_2_GCODE', value: '"M140 S" STRINGIFY(PREHEAT_1_TEMP_BED) "\\nM104 S" STRINGIFY(PREHEAT_1_TEMP_HOTEND)', type: 'advanced', description: 'G-code to execute' },
  { name: 'MAIN_MENU_ITEM_3_DESC', value: '"Preheat for " PREHEAT_2_LABEL', type: 'advanced', description: 'Menu item description' },
  { name: 'MAIN_MENU_ITEM_3_GCODE', value: '"M140 S" STRINGIFY(PREHEAT_2_TEMP_BED) "\\nM104 S" STRINGIFY(PREHEAT_2_TEMP_HOTEND)', type: 'advanced', description: 'G-code to execute' },
  { name: 'MAIN_MENU_ITEM_4_DESC', value: 'Heat Bed/Home/Level', type: 'advanced', description: 'Menu item description' },
  { name: 'MAIN_MENU_ITEM_4_GCODE', value: 'M140 S" STRINGIFY(PREHEAT_2_TEMP_BED) "\\nG28\\nG29', type: 'advanced', description: 'G-code to execute' },
  { name: 'MAIN_MENU_ITEM_5_DESC', value: 'Home & Info', type: 'advanced', description: 'Menu item description' },
  { name: 'MAIN_MENU_ITEM_5_GCODE', value: 'G28\\nM503', type: 'advanced', description: 'G-code to execute' },
  
  // Display Types
  { name: 'MAKEBOARD_MINI_2_LINE_DISPLAY_1602', type: 'basic', description: 'Makeboard mini 2-line display' },
  { name: 'MAKRPANEL', type: 'basic', description: 'Makrpanel display' },
  { name: 'MALYAN_LCD', type: 'basic', description: 'Malyan LCD display' },
  { name: 'MKS_12864OLED', value: false, type: 'basic', description: 'Uses the SH1106 controller' },
  { name: 'MKS_12864OLED_SSD1306', value: false, type: 'basic', description: 'Uses the SSD1306 controller' },
  { name: 'MKS_LCD12864A', type: 'basic', description: 'MKS LCD 12864A' },
  { name: 'MKS_LCD12864B', type: 'basic', description: 'MKS LCD 12864B' },
  { name: 'MKS_MINI_12864', type: 'basic', description: 'MKS mini 12864' },
  { name: 'MKS_MINI_12864_V3', type: 'basic', description: 'MKS mini 12864 V3' },
  { name: 'MKS_PWC', value: false, type: 'basic', description: 'Using the MKS PWC add-on' },
  { name: 'MKS_ROBIN_TFT_V1_1R', type: 'basic', description: 'MKS Robin TFT V1.1R' },
  { name: 'MKS_ROBIN_TFT24', type: 'basic', description: 'MKS Robin TFT 24' },
  { name: 'MKS_ROBIN_TFT28', type: 'basic', description: 'MKS Robin TFT 28' },
  { name: 'MKS_ROBIN_TFT32', type: 'basic', description: 'MKS Robin TFT 32' },
  { name: 'MKS_ROBIN_TFT35', type: 'basic', description: 'MKS Robin TFT 35' },
  { name: 'MKS_ROBIN_TFT43', type: 'basic', description: 'MKS Robin TFT 43' },
  { name: 'MKS_TS35_V2_0', type: 'basic', description: 'MKS TS35 V2.0' },
  { name: 'MKS_WIFI_MODULE', value: false, type: 'basic', description: 'MKS WiFi module' },
  
  // Manual Control
  { name: 'MANUAL_E_MOVES_RELATIVE', type: 'advanced', description: 'Display extruder move distance rather than "position"' },
  { name: 'MANUAL_FEEDRATE', value: '{ 50*60, 50*60, 4*60, 2*60 }', unit: 'mm/min', type: 'advanced', description: 'Feedrates for manual moves along X, Y, Z, E from panel' },
  { name: 'MANUAL_I_HOME_POS', value: false, type: 'basic', description: 'Manual I home position' },
  { name: 'MANUAL_J_HOME_POS', value: false, type: 'basic', description: 'Manual J home position' },
  { name: 'MANUAL_K_HOME_POS', value: false, type: 'basic', description: 'Manual K home position' },
  { name: 'MANUAL_MOVE_DISTANCE_DEG', value: '90, 45, 22.5, 5, 1', unit: '°', type: 'advanced', description: 'Manual move distance in degrees' },
  { name: 'MANUAL_MOVE_DISTANCE_IN', value: '0.100, 0.010, 0.001', unit: 'in', type: 'advanced', description: 'Manual move distance in inches' },
  { name: 'MANUAL_MOVE_DISTANCE_MM', value: '10, 1.0, 0.1', unit: 'mm', type: 'advanced', description: 'Manual move distance in mm' },
  { name: 'MANUAL_PROBE_START_Z', value: 0.2, unit: 'mm', type: 'basic', description: 'Comment out to use the last-measured height' },
  { name: 'MANUAL_SOLENOID_CONTROL', value: false, type: 'basic', description: 'Manual control of docking solenoids with M380 S / M381' },
  { name: 'MANUAL_U_HOME_POS', value: false, type: 'basic', description: 'Manual U home position' },
  { name: 'MANUAL_V_HOME_POS', value: false, type: 'basic', description: 'Manual V home position' },
  { name: 'MANUAL_W_HOME_POS', value: false, type: 'basic', description: 'Manual W home position' },
  
  // Markforged and Special Kinematics
  { name: 'MARKFORGED_INVERSE', value: false, type: 'basic', description: 'Enable for an inverted Markforged kinematics belt path' },
  { name: 'MARKFORGED_YX', type: 'basic', description: 'Enable Markforged YX kinematics' },
  
  // Marlin Features
  { name: 'MARLIN_BRICKOUT', type: 'advanced', description: 'Frivolous Game Options' },
  { name: 'MARLIN_DEV_MODE', type: 'advanced', description: 'Enable Marlin dev mode which adds some special commands' },
  { name: 'MARLIN_INVADERS', type: 'advanced', description: 'Enable Marlin Invaders game' },
  { name: 'MARLIN_SMALL_BUILD', type: 'advanced', description: 'Shrink the build for smaller boards by sacrificing some serial feedback' },
  { name: 'MARLIN_SNAKE', type: 'advanced', description: 'Enable Marlin Snake game' },
  { name: 'MARLIN_TEST_BUILD', type: 'advanced', description: 'Enable Tests that will run at startup and produce a report' },
  
  // Maximum Values and Limits
  { name: 'MAX_ACCEL_EDIT_VALUES', value: '{ 6000, 6000, 200, 20000 }', type: 'basic', description: '...or, set your own edit limits' },
  { name: 'MAX_ARC_SEGMENT_MM', value: 1, unit: 'mm', type: 'advanced', description: 'Maximum length of each arc segment' },
  { name: 'MAX_AUTORETRACT', value: 10, unit: 'mm', type: 'advanced', description: 'Don\'t convert E moves over this length' },
  { name: 'MAX_BED_POWER', value: 255, type: 'basic', description: 'limits duty cycle to bed; 255=full current' },
  { name: 'MAX_CHAMBER_POWER', value: 255, type: 'basic', description: 'limits duty cycle to chamber heater; 255=full current' },
  { name: 'MAX_CMD_SIZE', value: 96, type: 'advanced', description: 'The ASCII buffer for serial input' },
  { name: 'MAX_CONSECUTIVE_LOW_TEMPERATURE_ERROR_ALLOWED', value: false, type: 'advanced', description: 'before a MINTEMP error is triggered. (Shouldn\'t be more than 10.)' },
  { name: 'MAX_FEEDRATE_EDIT_VALUES', value: '{ 600, 600, 10, 50 }', type: 'basic', description: '...or, set your own edit limits' },
  { name: 'MAX_JERK_EDIT_VALUES', value: '{ 20, 20, 0.6, 10 }', type: 'basic', description: '...or, set your own edit limits' },
  { name: 'MAX_MEASUREMENT_DELAY', value: 20, type: 'advanced', description: 'bytes) Buffer size for stored measurements (1 byte per cm). Must be larger than MEASUREMENT_DELAY_CM.' },
  { name: 'MAX_SOFTWARE_ENDSTOP_I', type: 'basic', description: 'Enable software endstop for I axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_J', type: 'basic', description: 'Enable software endstop for J axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_K', type: 'basic', description: 'Enable software endstop for K axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_U', type: 'basic', description: 'Enable software endstop for U axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_V', type: 'basic', description: 'Enable software endstop for V axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_W', type: 'basic', description: 'Enable software endstop for W axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_X', type: 'basic', description: 'Enable software endstop for X axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_Y', type: 'basic', description: 'Enable software endstop for Y axis' },
  { name: 'MAX_SOFTWARE_ENDSTOP_Z', type: 'basic', description: 'Enable software endstop for Z axis' },
  { name: 'MAX_SOFTWARE_ENDSTOPS', type: 'basic', description: 'Max software endstops constrain movement within maximum coordinate bounds' },
  { name: 'MAXIMUM_STEPPER_RATE', value: 250000, type: 'advanced', description: 'Maximum stepper rate' },
  
  // MAX31865 Temperature Sensor
  { name: 'MAX31865_50HZ_FILTER', value: false, type: 'advanced', description: 'Use a 50Hz filter instead of the default 60Hz.' },
  { name: 'MAX31865_CALIBRATION_OHMS_0', value: 430, type: 'basic', description: 'Typically 430 for Adafruit PT100; 4300 for Adafruit PT1000' },
  { name: 'MAX31865_CALIBRATION_OHMS_1', value: 430, type: 'basic', description: 'Calibration resistance for sensor 1' },
  { name: 'MAX31865_CALIBRATION_OHMS_2', value: 430, type: 'basic', description: 'Calibration resistance for sensor 2' },
  { name: 'MAX31865_CALIBRATION_OHMS_BED', value: 430, type: 'basic', description: 'Calibration resistance for bed sensor' },
  { name: 'MAX31865_IGNORE_INITIAL_FAULTY_READS', value: 10, type: 'advanced', description: 'Ignore some read faults (keeping the temperature reading) to work around a possible issue' },
  { name: 'MAX31865_MIN_SAMPLING_TIME_MSEC', value: 100, unit: 'ms', type: 'advanced', description: '1-shot: minimum read interval. Reduces bias voltage effects by leaving sensor unpowered for longer intervals.' },
  { name: 'MAX31865_SENSOR_OHMS_0', value: 100, type: 'basic', description: 'Typically 100 or 1000 (PT100 or PT1000)' },
  { name: 'MAX31865_SENSOR_OHMS_1', value: 100, type: 'basic', description: 'Sensor resistance for sensor 1' },
  { name: 'MAX31865_SENSOR_OHMS_2', value: 100, type: 'basic', description: 'Sensor resistance for sensor 2' },
  { name: 'MAX31865_SENSOR_OHMS_BED', value: 100, type: 'basic', description: 'Sensor resistance for bed sensor' },
  { name: 'MAX31865_SENSOR_WIRES_0', value: 2, type: 'advanced', description: 'Number of wires for the probe connected to a MAX31865 board.' },
  { name: 'MAX31865_SENSOR_WIRES_1', value: 2, type: 'advanced', description: 'Number of wires for sensor 1' },
  { name: 'MAX31865_SENSOR_WIRES_2', value: 2, type: 'advanced', description: 'Number of wires for sensor 2' },
  { name: 'MAX31865_SENSOR_WIRES_BED', value: 2, type: 'advanced', description: 'Number of wires for bed sensor' },
  { name: 'MAX31865_USE_AUTO_MODE', value: false, type: 'advanced', description: 'Read faster and more often than 1-shot; bias voltage always on; slight effect on RTD temperature.' },
  { name: 'MAX31865_USE_READ_ERROR_DETECTION', value: false, type: 'advanced', description: 'Treat value spikes (20°C delta in under 1s) as read errors.' },
  { name: 'MAX31865_WIRE_OHMS_0', value: 0.95, type: 'advanced', description: 'For 2-wire, set the wire resistances for more accurate readings.' },
  { name: 'MAX31865_WIRE_OHMS_1', value: 0.0, type: 'advanced', description: 'Wire resistance for sensor 1' },
  { name: 'MAX31865_WIRE_OHMS_2', value: 0.0, type: 'advanced', description: 'Wire resistance for sensor 2' },
  { name: 'MAX31865_WIRE_OHMS_BED', value: 0.0, type: 'advanced', description: 'Wire resistance for bed sensor' },
  
  // MAX7219 LED Matrix
  { name: 'MAX7219_CLK_PIN', value: 64, type: 'advanced', description: 'Clock pin for MAX7219' },
  { name: 'MAX7219_DEBUG', type: 'advanced', description: 'Enable MAX7219 debug' },
  { name: 'MAX7219_DEBUG_MULTISTEPPING', value: 6, type: 'advanced', description: 'Show multi-stepping 1 to 128 on this LED matrix row.' },
  { name: 'MAX7219_DEBUG_PLANNER_HEAD', value: 2, type: 'advanced', description: 'Show the planner queue head position on this and the next LED matrix row' },
  { name: 'MAX7219_DEBUG_PLANNER_QUEUE', value: false, type: 'advanced', description: 'Show the current planner queue depth on this and the next LED matrix row' },
  { name: 'MAX7219_DEBUG_PLANNER_TAIL', value: 4, type: 'advanced', description: 'Show the planner queue tail position on this and the next LED matrix row' },
  { name: 'MAX7219_DEBUG_PRINTER_ALIVE', type: 'advanced', description: 'Blink corner LED of 8x8 matrix to show that the firmware is functioning' },
  { name: 'MAX7219_DEBUG_PROFILE', value: 6, type: 'advanced', description: 'Display the fraction of CPU time spent in profiled code on this LED matrix' },
  { name: 'MAX7219_DEBUG_SLOWDOWN', value: 6, type: 'advanced', description: 'Count (mod 16) how many times SLOWDOWN has reduced print speed.' },
  { name: 'MAX7219_DIN_PIN', value: 57, type: 'advanced', description: 'Data input pin for MAX7219' },
  { name: 'MAX7219_GCODE', value: false, type: 'advanced', description: 'Add the M7219 G-code to control the LED matrix' },
  { name: 'MAX7219_INIT_TEST', value: 2, type: 'advanced', description: 'Test pattern at startup: 0=none, 1=sweep, 2=spiral' },
  { name: 'MAX7219_LOAD_PIN', value: 44, type: 'advanced', description: 'Load pin for MAX7219' },
  { name: 'MAX7219_NUMBER_UNITS', value: true, type: 'advanced', description: 'Number of Max7219 units in chain.' },
  { name: 'MAX7219_REINIT_ON_POWERUP', value: false, type: 'advanced', description: 'Re-initialize MAX7129 when power supply turns on' },
  { name: 'MAX7219_REVERSE_EACH', value: false, type: 'advanced', description: 'The LEDs in each matrix unit row may be reversed' },
  { name: 'MAX7219_REVERSE_ORDER', value: false, type: 'advanced', description: 'The order of the LED matrix units may be reversed' },
  { name: 'MAX7219_ROTATE', value: false, type: 'advanced', description: 'Rotate the display clockwise (in multiples of +/- 90°)' },
  { name: 'MAX7219_SIDE_BY_SIDE', value: false, type: 'advanced', description: 'Big chip+matrix boards can be chained side-by-side' },
  
  // Measurement and Calibration
  { name: 'MEASURE_BACKLASH_WHEN_PROBING', type: 'advanced', description: 'Measure the Z backlash when probing (G29) and set with "M425 Z"' },
  { name: 'MEASUREMENT_DELAY_CM', value: 14, unit: 'cm', type: 'advanced', description: 'The distance from the filament sensor to the melting chamber' },
  { name: 'MEATPACK_ON_SERIAL_PORT_1', type: 'advanced', description: 'Enable MeatPack on serial port 1' },
  { name: 'MEATPACK_ON_SERIAL_PORT_2', type: 'advanced', description: 'Enable MeatPack on serial port 2' },
  { name: 'MECHANICAL_GANTRY_CALIBRATION', type: 'advanced', description: 'Enable mechanical gantry calibration' },
  { name: 'MECHANICAL_SWITCHING_EXTRUDER', type: 'basic', description: 'Switch extruders by bumping the toolhead. Requires EVENT_GCODE_TOOLCHANGE_#' },
  { name: 'MECHANICAL_SWITCHING_NOZZLE', type: 'basic', description: 'Switch nozzles by bumping the toolhead. Requires EVENT_GCODE_TOOLCHANGE_#' },
  
  // Media and SD Card
  { name: 'MEDIA_MENU_AT_TOP', value: false, type: 'advanced', description: 'Force the media menu to be listed on the top of the main menu' },
  { name: 'MENU_ADDAUTOSTART', value: false, type: 'advanced', description: 'Add a menu option to run auto#.g files' },
  { name: 'MENU_HOLLOW_FRAME', type: 'advanced', description: 'Enable to save many cycles by drawing a hollow frame on Menu Screens' },
  
  // Mesh Bed Leveling
  { name: 'MESH_EDIT_GFX_OVERLAY', type: 'basic', description: 'Display a graphics overlay while editing the mesh' },
  { name: 'MESH_EDIT_MENU', type: 'basic', description: 'Add a menu to edit mesh points' },
  { name: 'MESH_EDIT_Z_STEP', value: 0.025, unit: 'mm', type: 'basic', description: 'Step size while manually probing Z axis.' },
  { name: 'MESH_G28_REST_ORIGIN', value: false, type: 'basic', description: 'After homing all axes (\'G28\' or \'G28 XYZ\') rest Z at Z_MIN_POS' },
  { name: 'MESH_INSET', value: 10, type: 'basic', description: 'Set Mesh bounds as an inset region of the bed' },
  { name: 'MESH_MAX_X', value: 'X_BED_SIZE - (MESH_INSET)', type: 'advanced', description: 'Maximum X mesh coordinate' },
  { name: 'MESH_MAX_Y', value: 'Y_BED_SIZE - (MESH_INSET)', type: 'advanced', description: 'Maximum Y mesh coordinate' },
  { name: 'MESH_MIN_X', value: 'MESH_INSET', type: 'advanced', description: 'Override the mesh area if the automatic (max) area is too large' },
  { name: 'MESH_MIN_Y', value: 'MESH_INSET', type: 'advanced', description: 'Override the mesh area if the automatic (max) area is too large' },
  { name: 'MESH_TEST_BED_TEMP', value: 60, unit: '°C', type: 'basic', description: 'Default bed temperature for G26.' },
  { name: 'MESH_TEST_HOTEND_TEMP', value: 205, unit: '°C', type: 'basic', description: 'Default nozzle temperature for G26.' },
  { name: 'MESH_TEST_LAYER_HEIGHT', value: 0.2, unit: 'mm', type: 'basic', description: 'Default layer height for G26.' },
  { name: 'MESH_TEST_NOZZLE_SIZE', value: 0.4, unit: 'mm', type: 'basic', description: 'Diameter of primary nozzle.' },
  
  // Microstepping
  { name: 'MICROSTEP_MODES', value: '{ 16, 16, 16, 16, 16, 16 }', type: 'advanced', description: 'Microstep modes for each axis' },
  { name: 'MICROSTEP1', value: 'LOW,LOW,LOW', type: 'advanced', description: 'Microstep 1 configuration' },
  { name: 'MICROSTEP16', value: 'LOW,LOW,HIGH', type: 'advanced', description: 'Microstep 16 configuration' },
  { name: 'MICROSTEP2', value: 'HIGH,LOW,LOW', type: 'advanced', description: 'Microstep 2 configuration' },
  { name: 'MICROSTEP32', value: 'HIGH,LOW,HIGH', type: 'advanced', description: 'Microstep 32 configuration' },
  { name: 'MICROSTEP4', value: 'LOW,HIGH,LOW', type: 'advanced', description: 'Microstep 4 configuration' },
  { name: 'MICROSTEP8', value: 'HIGH,HIGH,LOW', type: 'advanced', description: 'Microstep 8 configuration' },
  
  // Serial Communication
  { name: 'SERIAL_DMA', type: 'advanced', description: 'Enable serial DMA support' },
  { name: 'SERIAL_FLOAT_PRECISION', value: 4, type: 'advanced', description: 'For serial echo, the number of digits after the decimal point' },
  { name: 'SERIAL_OVERRUN_PROTECTION', type: 'advanced', description: 'This option inserts short delays between lines of serial output.' },
  { name: 'SERIAL_PORT_3', value: true, type: 'basic', description: 'Enable serial port 3' },
  { name: 'SERIAL_STATS_DROPPED_RX', type: 'advanced', description: 'of dropped bytes after a file transfer to SD.' },
  { name: 'SERIAL_STATS_MAX_RX_QUEUED', type: 'advanced', description: 'RX queue usage after transferring a file to SD.' },
  { name: 'SERIAL_STATS_RX_BUFFER_OVERRUNS', value: false, type: 'advanced', description: 'Fix Rx overrun situation (Currently only for AVR)' },
  { name: 'SERIAL_XON_XOFF', type: 'advanced', description: 'the host to signal the RX buffer is becoming full.' },
  
  // Service and Maintenance
  { name: 'SERVICE_INTERVAL_1', value: 100, unit: 'print hours', type: 'advanced', description: 'Service interval 1' },
  { name: 'SERVICE_INTERVAL_2', value: 200, unit: 'print hours', type: 'advanced', description: 'Service interval 2' },
  { name: 'SERVICE_INTERVAL_3', value: true, unit: 'print hours', type: 'advanced', description: 'Service interval 3' },
  { name: 'SERVICE_NAME_1', value: 'Service S', type: 'advanced', description: 'Activate up to 3 service interval watchdogs' },
  { name: 'SERVICE_NAME_2', value: 'Service L', type: 'advanced', description: 'Service name 2' },
  { name: 'SERVICE_NAME_3', value: 'Service 3', type: 'advanced', description: 'Service name 3' },
  { name: 'SERVICE_WARNING_BUZZES', value: 3, type: 'advanced', description: 'Activate up to 3 service interval watchdogs' },
  
  // Servo Control
  { name: 'SERVO_DELAY', value: '{ 300 }', type: 'basic', description: 'If the servo can\'t reach the requested position, increase it.' },
  { name: 'SERVO_DETACH_GCODE', type: 'basic', description: 'Disable servo with M282 to reduce power consumption, noise, and heat when not in use' },
  
  // Progress and Status
  { name: 'SET_INTERACTION_TIME', value: false, type: 'advanced', description: 'Add \'C\' parameter to set time until next filament change or other user interaction' },
  { name: 'SET_PROGRESS_MANUALLY', type: 'advanced', description: 'Add \'M73\' to set print job progress, overrides Marlin\'s built-in estimate' },
  { name: 'SET_PROGRESS_PERCENT', type: 'advanced', description: 'Add \'P\' parameter to set percentage done' },
  { name: 'SET_REMAINING_TIME', type: 'advanced', description: 'Add \'R\' parameter to set remaining time' },
  
  // Input Shaping
  { name: 'SHAPING_FREQ_X', value: 40, unit: 'Hz', type: 'advanced', description: 'The default dominant resonant frequency on the X axis.' },
  { name: 'SHAPING_FREQ_Y', value: 40, unit: 'Hz', type: 'advanced', description: 'The default dominant resonant frequency on the Y axis.' },
  { name: 'SHAPING_FREQ_Z', value: 40, unit: 'Hz', type: 'advanced', description: 'The default dominant resonant frequency on the Z axis.' },
  { name: 'SHAPING_MAX_STEPRATE', value: 10000, type: 'advanced', description: 'By default the maximum total step rate of the shaped axes. Override to affect SRAM usage.' },
  { name: 'SHAPING_MENU', value: false, type: 'advanced', description: 'Add a menu to the LCD to set shaping parameters.' },
  { name: 'SHAPING_MIN_FREQ', value: 20, unit: 'Hz', type: 'advanced', description: 'By default the minimum of the shaping frequencies. Override to affect SRAM usage.' },
  { name: 'SHAPING_ZETA_X', value: 0.15, type: 'advanced', description: 'Damping ratio of the X axis (range: 0.0 = no damping to 1.0 = critical damping).' },
  { name: 'SHAPING_ZETA_Y', value: 0.15, type: 'advanced', description: 'Damping ratio of the Y axis (range: 0.0 = no damping to 1.0 = critical damping).' },
  { name: 'SHAPING_ZETA_Z', value: 0.15, type: 'advanced', description: 'Damping ratio of the Z axis (range: 0.0 = no damping to 1.0 = critical damping).' },
  
  // Display and Boot
  { name: 'SHOW_BOOTSCREEN', type: 'basic', description: 'Show the Marlin bootscreen on startup. ** ENABLE FOR PRODUCTION **' },
  { name: 'SHOW_CUSTOM_BOOTSCREEN', type: 'basic', description: 'Show the bitmap in Marlin/_Bootscreen.h on startup.' },
  { name: 'SHOW_ELAPSED_TIME', type: 'advanced', description: 'Display elapsed printing time (prefix \'E\')' },
  { name: 'SHOW_INTERACTION_TIME', type: 'advanced', description: 'Display time until next user interaction (\'C\' = filament change)' },
  { name: 'SHOW_PROGRESS_PERCENT', type: 'advanced', description: 'Show print progress percentage (doesn\'t affect progress bar)' },
  { name: 'SHOW_REMAINING_TIME', type: 'advanced', description: 'Display estimated time to completion (prefix \'R\')' },
  { name: 'SHOW_TEMP_ADC_VALUES', type: 'advanced', description: 'Enable for M105 to include ADC values read from temperature sensors.' },
  { name: 'SHOW_TEMPERATURE_BELOW_ZERO', type: 'advanced', description: 'Display a negative temperature instead of "err"' },
  
  // Special Features
  { name: 'SILVER_GATE_GLCD_CONTROLLER', type: 'basic', description: 'Silver Gate GLCD controller' },
  { name: 'SINGLE_TOUCH_NAVIGATION', type: 'basic', description: 'Single touch navigation' },
  { name: 'SINGLENOZZLE', type: 'basic', description: 'For Cyclops or any "multi-extruder" that shares a single nozzle.' },
  { name: 'SINGLENOZZLE_STANDBY_FAN', type: 'basic', description: 'Standby fan for single nozzle' },
  { name: 'SINGLENOZZLE_STANDBY_TEMP', type: 'basic', description: 'Standby temperature for single nozzle' },
  
  // Skew Correction
  { name: 'SKEW_CORRECTION', type: 'basic', description: 'Enable skew correction' },
  { name: 'SKEW_CORRECTION_FOR_Z', type: 'basic', description: 'Enable skew correction for Z axis' },
  { name: 'SKEW_CORRECTION_GCODE', type: 'basic', description: 'Enable this option for M852 to set skew at runtime' },
  
  // Sled and Special Features
  { name: 'SLED_DOCKING_OFFSET', value: 5, type: 'basic', description: 'The extra distance the X axis must travel to pickup the sled. 0 should be fine but you can push it further if you\'d like.' },
  { name: 'SLIM_LCD_MENUS', type: 'basic', description: 'Slim LCD menus' },
  { name: 'SLOW_PWM_HEATERS', value: false, type: 'basic', description: 'PWM with very low frequency (roughly 0.125Hz=8s) and minimum state time of approximately 1s useful for heaters driven by a relay' },
  { name: 'SLOWDOWN', type: 'advanced', description: 'Increase the slowdown divisor for larger buffer sizes.' },
  { name: 'SLOWDOWN_DIVISOR', value: 2, type: 'advanced', description: 'Slowdown divisor' },
  { name: 'SMART_EFFECTOR_MOD_PIN', value: -1, type: 'basic', description: 'Connect a GPIO pin to the Smart Effector MOD pin' },
  
  // Linear Advance
  { name: 'SMOOTH_LIN_ADV_HZ', value: 5000, unit: 'Hz', type: 'advanced', description: 'How often to update extruder speed' },
  { name: 'SMOOTH_LIN_ADVANCE', value: false, type: 'advanced', description: 'Remove limits on acceleration by gradual increase of nozzle pressure' },
  
  // Temperature Control
  { name: 'SOC_MAXTEMP', value: 85, unit: '°C', type: 'advanced', description: 'System on chip maximum temperature' },
  { name: 'TEMP_BED_HYSTERESIS', value: 3, unit: '°C', type: 'basic', description: 'Temperature proximity considered "close enough" to the target' },
  { name: 'TEMP_BED_RESIDENCY_TIME', value: 10, unit: 'seconds', type: 'basic', description: 'Time to wait for bed to "settle" in M190' },
  { name: 'TEMP_BED_WINDOW', value: true, unit: '°C', type: 'basic', description: 'Temperature proximity for the "temperature reached" timer' },
  { name: 'TEMP_BOARD_PIN', value: -1, type: 'advanced', description: 'Board temp sensor pin override.' },
  { name: 'TEMP_CHAMBER_HYSTERESIS', value: 3, unit: '°C', type: 'basic', description: 'Temperature proximity considered "close enough" to the target' },
  { name: 'TEMP_CHAMBER_RESIDENCY_TIME', value: 10, unit: 'seconds', type: 'basic', description: 'Time to wait for chamber to "settle" in M191' },
  { name: 'TEMP_CHAMBER_WINDOW', value: true, unit: '°C', type: 'basic', description: 'Temperature proximity for the "temperature reached" timer' },
  { name: 'TEMP_COOLER_HYSTERESIS', value: true, unit: '°C', type: 'advanced', description: 'Temperature proximity considered "close enough" to the target' },
  { name: 'TEMP_HYSTERESIS', value: 3, unit: '°C', type: 'basic', description: 'Temperature proximity considered "close enough" to the target' },
  { name: 'TEMP_RESIDENCY_TIME', value: 10, unit: 'seconds', type: 'basic', description: 'Time to wait for hotend to "settle" in M109' },
  { name: 'TEMP_SENSOR_AD595_GAIN', value: 1, type: 'advanced', description: 'AD595 temperature sensor gain' },
  { name: 'TEMP_SENSOR_AD595_OFFSET', value: 0, type: 'advanced', description: 'The final temperature is calculated as (measuredTemp * GAIN) + OFFSET.' },
  { name: 'TEMP_SENSOR_AD8495_GAIN', value: 1, type: 'advanced', description: 'AD8495 temperature sensor gain' },
  { name: 'TEMP_SENSOR_AD8495_OFFSET', value: 0, type: 'advanced', description: 'AD8495 temperature sensor offset' },
  { name: 'TEMP_SENSOR_BOARD', value: false, type: 'basic', description: 'Board temperature sensor' },
  { name: 'TEMP_SENSOR_FORCE_HW_SPI', value: false, type: 'advanced', description: 'Ignore SCK/MOSI/MISO pins; use CS and the default SPI bus.' },
  { name: 'TEMP_SENSOR_SOC', value: false, type: 'basic', description: 'System on chip temperature sensor' },
  { name: 'TEMP_STAT_LEDS', type: 'basic', description: 'Temperature status LEDs' },
  { name: 'TEMP_TUNING_MAINTAIN_FAN', value: false, type: 'advanced', description: 'Don\'t slow down the fan speed during M303 or M306 T' },
  { name: 'TEMP_WINDOW', value: true, unit: '°C', type: 'basic', description: 'Temperature proximity for the "temperature reached" timer' },
  { name: 'TEMPERATURE_UNITS_SUPPORT', type: 'basic', description: 'Temperature units support' },
  
  // Additional defines from your list (abbreviated for space)
  { name: 'ABL_BILINEAR_SUBDIVISION', type: 'basic', description: 'Enable bilinear subdivision for bed leveling' },
  { name: 'AC_DEFAULT_STARTUP_TUNE', type: 'advanced', description: 'Enable Anycubic powerup startup tune' },
  { name: 'ADAPTIVE_FAN_SLOWING', type: 'advanced', description: 'Slow down part-cooling fan if temperature drops' },
  { name: 'ADVANCE_K', value: 0.22, unit: 'mm', type: 'advanced', description: 'Linear advance K factor' },
  { name: 'AUTO_POWER_CONTROL', value: false, type: 'basic', description: 'Enable automatic control of PS_ON pin' },
  { name: 'BABYSTEP_ALWAYS_AVAILABLE', type: 'advanced', description: 'Allow babystepping at all times' },
  { name: 'BACKLASH_COMPENSATION', type: 'advanced', description: 'Enable backlash compensation' },
  { name: 'BED_ANNEALING_GCODE', type: 'basic', description: 'Add M190 R T for gradual bed cooling' },
  { name: 'BED_TRAMMING_AUDIO_FEEDBACK', type: 'basic', description: 'Enable audio feedback for bed tramming' },
  { name: 'BILINEAR_SUBDIVISIONS', value: 3, type: 'basic', description: 'Number of subdivisions between probe points' },
  { name: 'BLTOUCH_DELAY', value: 500, unit: 'ms', type: 'advanced', description: 'BLTouch delay' },
  { name: 'BOOT_MARLIN_LOGO_ANIMATED', value: false, type: 'advanced', description: 'Animated Marlin logo on boot' },
  { name: 'CASE_LIGHT_ENABLE', type: 'advanced', description: 'Enable case light control' },
  { name: 'CHAMBER_FAN', value: false, type: 'advanced', description: 'Enable chamber fan' },
  { name: 'CUSTOM_MACHINE_NAME', value: 'AF#1 Ender-3 v1 4.2.7', type: 'basic', description: 'Custom machine name' },
  { name: 'DEFAULT_ACCELERATION', value: 3000, unit: 'mm/s²', type: 'basic', description: 'Default acceleration' },
  { name: 'DEFAULT_bedKp', value: 10, type: 'basic', description: 'Default bed PID P value' },
  { name: 'DEFAULT_bedKi', value: 0.023, type: 'basic', description: 'Default bed PID I value' },
  { name: 'DEFAULT_bedKd', value: 305.4, type: 'basic', description: 'Default bed PID D value' },
  { name: 'EXTRUDERS', value: 1, type: 'basic', description: 'Number of extruders' },
  { name: 'FAN_PIN', value: 4, type: 'basic', description: 'Fan control pin' },
  { name: 'HOMING_FEEDRATE', value: 4000, unit: 'mm/min', type: 'basic', description: 'Homing feedrate' },
  { name: 'LCD_BACKLIGHT_PIN', value: 5, type: 'basic', description: 'LCD backlight pin' },
  { name: 'MAX_ACCELERATION', value: 3000, unit: 'mm/s²', type: 'basic', description: 'Maximum acceleration' },
  { name: 'MAX_FEEDRATE', value: 500, unit: 'mm/min', type: 'basic', description: 'Maximum feedrate' },
  { name: 'MESH_BED_LEVELING', type: 'basic', description: 'Enable mesh bed leveling' },
  { name: 'PID_AUTOTUNE', type: 'basic', description: 'Enable PID autotune' },
  { name: 'SERVO0_PIN', value: 11, type: 'basic', description: 'Servo 0 pin' },
  { name: 'TEMP_SENSOR_0', value: 1, type: 'basic', description: 'Temperature sensor type for hotend' },
  { name: 'TEMP_SENSOR_BED', value: 1, type: 'basic', description: 'Temperature sensor type for bed' },
  { name: 'X_MAX_POS', value: 220, unit: 'mm', type: 'basic', description: 'X axis maximum position' },
  { name: 'Y_MAX_POS', value: 220, unit: 'mm', type: 'basic', description: 'Y axis maximum position' },
  { name: 'Z_MAX_POS', value: 250, unit: 'mm', type: 'basic', description: 'Z axis maximum position' },
  
  // Additional Hardware Configuration defines
  { name: 'MOTHERBOARD', value: 'BOARD_RAMPS_14_EFB', type: 'hardware', description: 'Motherboard type' },
  { name: 'X_STEP_PIN', value: 26, type: 'hardware', description: 'X axis step pin' },
  { name: 'X_DIR_PIN', value: 28, type: 'hardware', description: 'X axis direction pin' },
  { name: 'X_ENABLE_PIN', value: 24, type: 'hardware', description: 'X axis enable pin' },
  { name: 'Y_STEP_PIN', value: 36, type: 'hardware', description: 'Y axis step pin' },
  { name: 'Y_DIR_PIN', value: 34, type: 'hardware', description: 'Y axis direction pin' },
  { name: 'Y_ENABLE_PIN', value: 30, type: 'hardware', description: 'Y axis enable pin' },
  { name: 'Z_STEP_PIN', value: 46, type: 'hardware', description: 'Z axis step pin' },
  { name: 'Z_DIR_PIN', value: 48, type: 'hardware', description: 'Z axis direction pin' },
  { name: 'Z_ENABLE_PIN', value: 62, type: 'hardware', description: 'Z axis enable pin' },
  { name: 'E0_STEP_PIN', value: 26, type: 'hardware', description: 'E0 step pin' },
  { name: 'E0_DIR_PIN', value: 28, type: 'hardware', description: 'E0 direction pin' },
  { name: 'E0_ENABLE_PIN', value: 24, type: 'hardware', description: 'E0 enable pin' },
  { name: 'X_STOP_PIN', value: 3, type: 'hardware', description: 'X axis endstop pin' },
  { name: 'Y_STOP_PIN', value: 2, type: 'hardware', description: 'Y axis endstop pin' },
  { name: 'Z_STOP_PIN', value: 18, type: 'hardware', description: 'Z axis endstop pin' },
  { name: 'TEMP_0_PIN', value: 15, type: 'hardware', description: 'Hotend temperature sensor pin' },
  { name: 'TEMP_BED_PIN', value: 14, type: 'hardware', description: 'Bed temperature sensor pin' },
  { name: 'HEATER_0_PIN', value: 10, type: 'hardware', description: 'Hotend heater pin' },
  { name: 'HEATER_BED_PIN', value: 8, type: 'hardware', description: 'Bed heater pin' },
  { name: 'FAN_PIN', value: 9, type: 'hardware', description: 'Part cooling fan pin' },
  { name: 'FAN1_PIN', value: 7, type: 'hardware', description: 'Controller fan pin' },
  
  // TMC Stepper Driver defines
  { name: 'TMC_USE_SW_SPI', type: 'hardware', description: 'Use software SPI for TMC drivers' },
  { name: 'TMC_SW_MOSI', value: 66, type: 'hardware', description: 'TMC software SPI MOSI pin' },
  { name: 'TMC_SW_MISO', value: 44, type: 'hardware', description: 'TMC software SPI MISO pin' },
  { name: 'TMC_SW_SCK', value: 64, type: 'hardware', description: 'TMC software SPI SCK pin' },
  { name: 'TMC_CS_PIN', value: 40, type: 'hardware', description: 'TMC chip select pin' },
  { name: 'TMC_2208', type: 'hardware', description: 'Enable TMC2208 stepper drivers' },
  { name: 'TMC_2209', type: 'hardware', description: 'Enable TMC2209 stepper drivers' },
  { name: 'TMC_5160', type: 'hardware', description: 'Enable TMC5160 stepper drivers' },
  { name: 'X_CURRENT', value: 580, type: 'hardware', description: 'X axis motor current (mA)' },
  { name: 'Y_CURRENT', value: 580, type: 'hardware', description: 'Y axis motor current (mA)' },
  { name: 'Z_CURRENT', value: 580, type: 'hardware', description: 'Z axis motor current (mA)' },
  { name: 'E0_CURRENT', value: 650, type: 'hardware', description: 'E0 motor current (mA)' },
  { name: 'X_MICROSTEPS', value: 16, type: 'hardware', description: 'X axis microsteps' },
  { name: 'Y_MICROSTEPS', value: 16, type: 'hardware', description: 'Y axis microsteps' },
  { name: 'Z_MICROSTEPS', value: 16, type: 'hardware', description: 'Z axis microsteps' },
  { name: 'E0_MICROSTEPS', value: 16, type: 'hardware', description: 'E0 microsteps' },
  
  // Display and UI defines
  { name: 'LCD_PINS_RS', value: 16, type: 'display', description: 'LCD RS pin' },
  { name: 'LCD_PINS_ENABLE', value: 17, type: 'display', description: 'LCD Enable pin' },
  { name: 'LCD_PINS_D4', value: 23, type: 'display', description: 'LCD D4 pin' },
  { name: 'LCD_PINS_D5', value: 25, type: 'display', description: 'LCD D5 pin' },
  { name: 'LCD_PINS_D6', value: 27, type: 'display', description: 'LCD D6 pin' },
  { name: 'LCD_PINS_D7', value: 29, type: 'display', description: 'LCD D7 pin' },
  { name: 'LCD_BACKLIGHT_PIN', value: 39, type: 'display', description: 'LCD backlight pin' },
  { name: 'REPRAP_DISCOUNT_SMART_CONTROLLER', type: 'display', description: 'RepRap Discount Smart Controller' },
  { name: 'REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER', type: 'display', description: 'RepRap Discount Full Graphic Smart Controller' },
  { name: 'ANET_FULL_GRAPHICS_LCD', type: 'display', description: 'Anet Full Graphics LCD' },
  { name: 'ANET_FULL_GRAPHICS_LCD_ALT_WIRING', type: 'display', description: 'Anet Full Graphics LCD Alternative Wiring' },
  { name: 'ANET_FULL_GRAPHICS_LCD_EXTENDED', type: 'display', description: 'Anet Full Graphics LCD Extended' },
  { name: 'ANET_FULL_GRAPHICS_LCD_WSD_DISPLAY', type: 'display', description: 'Anet Full Graphics LCD WSD Display' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780', type: 'display', description: 'Anet Full Graphics LCD HD44780' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_2', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 2' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_3', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 3' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_4', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 4' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_5', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 5' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_6', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 6' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_7', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 7' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_8', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 8' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_9', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 9' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_10', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 10' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_11', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 11' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_12', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 12' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_13', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 13' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_14', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 14' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_15', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 15' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_16', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 16' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_17', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 17' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_18', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 18' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_19', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 19' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_20', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 20' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_21', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 21' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_22', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 22' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_23', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 23' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_24', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 24' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_25', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 25' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_26', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 26' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_27', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 27' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_28', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 28' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_29', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 29' },
  { name: 'ANET_FULL_GRAPHICS_LCD_HD44780_ALT_30', type: 'display', description: 'Anet Full Graphics LCD HD44780 Alternative 30' },
  
  // Movement and Motion defines
  { name: 'DEFAULT_MAX_FEEDRATE', value: 500, unit: 'mm/min', type: 'movement', description: 'Default maximum feedrate' },
  { name: 'DEFAULT_MAX_ACCELERATION', value: 1000, unit: 'mm/s²', type: 'movement', description: 'Default maximum acceleration' },
  { name: 'DEFAULT_ACCELERATION', value: 1000, unit: 'mm/s²', type: 'movement', description: 'Default acceleration' },
  { name: 'DEFAULT_RETRACT_ACCELERATION', value: 1000, unit: 'mm/s²', type: 'movement', description: 'Default retract acceleration' },
  { name: 'DEFAULT_TRAVEL_ACCELERATION', value: 1000, unit: 'mm/s²', type: 'movement', description: 'Default travel acceleration' },
  { name: 'DEFAULT_XJERK', value: 0, unit: 'mm/s', type: 'movement', description: 'Default X axis jerk' },
  { name: 'DEFAULT_YJERK', value: 0, unit: 'mm/s', type: 'movement', description: 'Default Y axis jerk' },
  { name: 'DEFAULT_ZJERK', value: 0, unit: 'mm/s', type: 'movement', description: 'Default Z axis jerk' },
  { name: 'DEFAULT_EJERK', value: 5, unit: 'mm/s', type: 'movement', description: 'Default E axis jerk' },
  
  // Temperature Control defines
  { name: 'PIDTEMP', type: 'temperature', description: 'Enable PID temperature control' },
  { name: 'PIDTEMPBED', type: 'temperature', description: 'Enable PID bed temperature control' },
  { name: 'BED_MINTEMP', value: 5, unit: '°C', type: 'temperature', description: 'Minimum bed temperature' },
  { name: 'BED_MAXTEMP', value: 120, unit: '°C', type: 'temperature', description: 'Maximum bed temperature' },
  { name: 'EXTRUDER_MINTEMP', value: 5, unit: '°C', type: 'temperature', description: 'Minimum extruder temperature' },
  { name: 'EXTRUDER_MAXTEMP', value: 275, unit: '°C', type: 'temperature', description: 'Maximum extruder temperature' },
  { name: 'THERMAL_PROTECTION_HOTENDS', type: 'temperature', description: 'Enable thermal protection for hotends' },
  { name: 'THERMAL_PROTECTION_BED', type: 'temperature', description: 'Enable thermal protection for bed' },
  { name: 'THERMAL_PROTECTION_CHAMBER', type: 'temperature', description: 'Enable thermal protection for chamber' },
  
  // Bed Leveling defines
  { name: 'AUTO_BED_LEVELING_BILINEAR', type: 'bedleveling', description: 'Enable bilinear bed leveling' },
  { name: 'AUTO_BED_LEVELING_LINEAR', type: 'bedleveling', description: 'Enable linear bed leveling' },
  { name: 'AUTO_BED_LEVELING_3POINT', type: 'bedleveling', description: 'Enable 3-point bed leveling' },
  { name: 'AUTO_BED_LEVELING_UBL', type: 'bedleveling', description: 'Enable unified bed leveling' },
  { name: 'MESH_BED_LEVELING', type: 'bedleveling', description: 'Enable mesh bed leveling' },
  { name: 'BED_LEVELING_COMMANDS', type: 'bedleveling', description: 'Enable bed leveling commands' },
  { name: 'PROBE_MANUALLY', type: 'bedleveling', description: 'Enable manual probing' },
  { name: 'Z_MIN_PROBE_USES_Z_MIN_ENDSTOP_PIN', type: 'bedleveling', description: 'Use Z min endstop for probe' },
  { name: 'Z_MIN_PROBE_ENDSTOP_INVERTING', value: false, type: 'bedleveling', description: 'Invert Z min probe endstop' },
  { name: 'Z_MIN_PROBE_PIN', value: 32, type: 'bedleveling', description: 'Z min probe pin' },
  { name: 'Z_PROBE_OFFSET_RANGE_MIN', value: -20, unit: 'mm', type: 'bedleveling', description: 'Minimum Z probe offset' },
  { name: 'Z_PROBE_OFFSET_RANGE_MAX', value: 20, unit: 'mm', type: 'bedleveling', description: 'Maximum Z probe offset' },
  { name: 'Z_PROBE_SPEED_FAST', value: 4, unit: 'mm/min', type: 'bedleveling', description: 'Fast Z probe speed' },
  { name: 'Z_PROBE_SPEED_SLOW', value: 2, unit: 'mm/min', type: 'bedleveling', description: 'Slow Z probe speed' },
  { name: 'Z_PROBE_SPEED', value: 8, unit: 'mm/min', type: 'bedleveling', description: 'Z probe speed' },
  { name: 'Z_PROBE_LOW_POINT', value: -2, unit: 'mm', type: 'bedleveling', description: 'Z probe low point' },
  { name: 'Z_PROBE_OFFSET_X', value: 0, unit: 'mm', type: 'bedleveling', description: 'Z probe X offset' },
  { name: 'Z_PROBE_OFFSET_Y', value: 0, unit: 'mm', type: 'bedleveling', description: 'Z probe Y offset' },
  { name: 'Z_PROBE_OFFSET_Z', value: 0, unit: 'mm', type: 'bedleveling', description: 'Z probe Z offset' },
  { name: 'Z_PROBE_XY_SPEED', value: 150, unit: 'mm/min', type: 'bedleveling', description: 'Z probe XY speed' },
  { name: 'Z_PROBE_XY_TRAVEL_SPEED', value: 500, unit: 'mm/min', type: 'bedleveling', description: 'Z probe XY travel speed' },
  { name: 'Z_PROBE_DEACTIVATE_AFTER_PROBING', type: 'bedleveling', description: 'Deactivate probe after probing' },
  { name: 'Z_PROBE_SERVO_NR', value: 0, type: 'bedleveling', description: 'Z probe servo number' },
  { name: 'Z_PROBE_SERVO_ANGLES', value: '{ 10, 90 }', type: 'bedleveling', description: 'Z probe servo angles' },
  { name: 'Z_PROBE_SERVO_DELAY', value: 300, unit: 'ms', type: 'bedleveling', description: 'Z probe servo delay' },
  { name: 'Z_PROBE_SERVO_SPEED', value: 255, type: 'bedleveling', description: 'Z probe servo speed' },
  { name: 'Z_PROBE_SERVO_RETRACT_ANGLES', value: '{ 10, 90 }', type: 'bedleveling', description: 'Z probe servo retract angles' },
  { name: 'Z_PROBE_SERVO_RETRACT_DELAY', value: 500, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract delay' },
  { name: 'Z_PROBE_SERVO_RETRACT_SPEED', value: 255, type: 'bedleveling', description: 'Z probe servo retract speed' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY', value: 0, type: 'bedleveling', description: 'Z probe servo retract deploy' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW', value: 1, type: 'bedleveling', description: 'Z probe servo retract stow' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_ANGLE', value: 10, type: 'bedleveling', description: 'Z probe servo retract deploy angle' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_ANGLE', value: 90, type: 'bedleveling', description: 'Z probe servo retract stow angle' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_DELAY', value: 300, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract deploy delay' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_DELAY', value: 500, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract stow delay' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_SPEED', value: 255, type: 'bedleveling', description: 'Z probe servo retract deploy speed' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_SPEED', value: 255, type: 'bedleveling', description: 'Z probe servo retract stow speed' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_PIN', value: 11, type: 'bedleveling', description: 'Z probe servo retract deploy pin' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_PIN', value: 11, type: 'bedleveling', description: 'Z probe servo retract stow pin' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_INVERTING', value: false, type: 'bedleveling', description: 'Z probe servo retract deploy inverting' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_INVERTING', value: false, type: 'bedleveling', description: 'Z probe servo retract stow inverting' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_DELAY_MS', value: 300, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract deploy delay ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_DELAY_MS', value: 500, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract stow delay ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_SPEED_MS', value: 255, type: 'bedleveling', description: 'Z probe servo retract deploy speed ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_SPEED_MS', value: 255, type: 'bedleveling', description: 'Z probe servo retract stow speed ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_PIN_MS', value: 11, type: 'bedleveling', description: 'Z probe servo retract deploy pin ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_PIN_MS', value: 11, type: 'bedleveling', description: 'Z probe servo retract stow pin ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_INVERTING_MS', value: false, type: 'bedleveling', description: 'Z probe servo retract deploy inverting ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_INVERTING_MS', value: false, type: 'bedleveling', description: 'Z probe servo retract stow inverting ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_DELAY_MS_MS', value: 300, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract deploy delay ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_DELAY_MS_MS', value: 500, unit: 'ms', type: 'bedleveling', description: 'Z probe servo retract stow delay ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_SPEED_MS_MS', value: 255, type: 'bedleveling', description: 'Z probe servo retract deploy speed ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_SPEED_MS_MS', value: 255, type: 'bedleveling', description: 'Z probe servo retract stow speed ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_PIN_MS_MS', value: 11, type: 'bedleveling', description: 'Z probe servo retract deploy pin ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_PIN_MS_MS', value: 11, type: 'bedleveling', description: 'Z probe servo retract stow pin ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_DEPLOY_INVERTING_MS_MS', value: false, type: 'bedleveling', description: 'Z probe servo retract deploy inverting ms ms' },
  { name: 'Z_PROBE_SERVO_RETRACT_STOW_INVERTING_MS_MS', value: false, type: 'bedleveling', description: 'Z probe servo retract stow inverting ms ms' }
]

const PrinterConfig = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [activeSection, setActiveSection] = useState('basic') // 'basic', 'config', 'marlin'
  const { updatePrinter } = usePrintersStore()
  
  // Get active printer ID first
  const activePrinterId = usePrintersStore(state => state.activePrinterId)
  
  // Only subscribe to the specific printer data we need for this component
  const printerData = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === activePrinterId)
    if (!activePrinter) return null
    return activePrinter
  })
  
  // Bed leveling functionality
  const serialStatus = useSerialStore(state => state.status)
  const bedMesh = useSerialStore(state => state.bedMesh)
  const fetchBedLevel = useSerialStore(state => state.fetchBedLevel)
  const runBedLeveling = useSerialStore(state => state.runBedLeveling)
  const processCollectedBedMeshData = useSerialStore(state => state.processCollectedBedMeshData)

  const printerSettings = usePrintersStore(state => {
    const activePrinter = state.printers.find(p => p.id === activePrinterId)
    return activePrinter?.printerSettings
  })

  const hasMeshData = bedMesh?.data && bedMesh.data.length > 0
  const bedLevelingEnabled = printerSettings?.bedLeveling?.enabled

  const handleFetchMesh = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }
    await fetchBedLevel()
  }, [serialStatus, fetchBedLevel])

  const handleRunAutoLevel = useCallback(async () => {
    if (serialStatus !== 'connected') {
      alert('Please connect to printer first')
      return
    }
    
    if (confirm('This will run automatic bed leveling (G29). This process takes several minutes. Continue?')) {
      await runBedLeveling()
    }
  }, [serialStatus, runBedLeveling])

  const handleProcessData = useCallback(async () => {
    await processCollectedBedMeshData()
  }, [processCollectedBedMeshData])

  if (!printerData) {
    return (
      <div className="text-center py-12">
        <Printer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Printer Selected</h3>
        <p className="text-gray-500">Please select a printer to view configuration</p>
      </div>
    )
  }

  const handleEdit = () => {
    setEditData({
      name: printerData.name,
      model: printerData.model,
      firmware: printerData.firmware || '',
      bedSize: { ...printerData.bedSize }
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    updatePrinter(printerData.id, editData)
    setIsEditing(false)
    setEditData({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({})
  }

  const handleInputChange = (field, value) => {
    if (field === 'bedSize') {
      setEditData(prev => ({
        ...prev,
        bedSize: { ...prev.bedSize, ...value }
      }))
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const renderField = (label, value, field, type = 'text') => {
    if (isEditing && editData[field] !== undefined) {
      if (field === 'bedSize') {
        return (
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="X"
              value={editData.bedSize.x}
              onChange={(e) => handleInputChange('bedSize', { x: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Y"
              value={editData.bedSize.y}
              onChange={(e) => handleInputChange('bedSize', { y: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Z"
              value={editData.bedSize.z}
              onChange={(e) => handleInputChange('bedSize', { z: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )
      }
      return (
        <input
          type={type}
          value={editData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )
    }
    
    if (field === 'bedSize') {
      return (
        <div className="flex items-center space-x-4">
          <span className="text-gray-900 font-medium">{value.x} × {value.y} × {value.z} mm</span>
        </div>
      )
    }
    
    return <span className="text-gray-900">{value || 'Not specified'}</span>
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Printer Configuration</h2>
          <p className="text-gray-600 mt-1">Manage your printer's basic settings and bed leveling</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Configuration</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveSection('basic')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'basic'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Basic Configuration
          </button>
          <button
            onClick={() => setActiveSection('config')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'config'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Edit className="h-4 w-4 inline mr-2" />
            Configuration Management
          </button>
          <button
            onClick={() => setActiveSection('marlin')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSection === 'marlin'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Marlin Defines
          </button>
        </nav>
      </div>

      {/* Basic Configuration Section - restored full info */}
      {activeSection === 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Printer className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Printer Name</label>
                {renderField('Printer Name', printerData.name, 'name')}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                {renderField('Model', printerData.model, 'model')}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmware</label>
                {renderField('Firmware', printerData.firmware, 'firmware')}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bed Size (X × Y × Z)</label>
                {renderField('Bed Size', printerData.bedSize, 'bedSize')}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Printer ID</label>
                <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">{printerData.id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                <p className="text-sm text-gray-600">
                  {printerData.lastUpdated 
                    ? new Date(printerData.lastUpdated).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>
            </div>
          </div>

          {/* Stored Settings Summary (Global Parameters) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-3">
              <Settings className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Stored Settings Summary</h3>
            </div>
            <StoredSettingsGrid activePrinterId={activePrinterId} />
          </div>

          {/* Firmware Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Firmware Configuration</h3>
            </div>
            
            <div className="space-y-4">
              {/* Temperature Limits */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Hotend Temperature</label>
                  <span className="text-gray-900">{printerData.firmwareConfiguration?.maxHotendTemp || 275}°C</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Bed Temperature</label>
                  <span className="text-gray-900">{printerData.firmwareConfiguration?.maxBedTemp || 120}°C</span>
                </div>
              </div>
              
              {/* Steps per mm */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Steps per mm</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">X:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepsPerMm?.x || 80}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Y:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepsPerMm?.y || 80}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepsPerMm?.z || 400}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">E:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepsPerMm?.e || 93}</span>
                  </div>
                </div>
              </div>
              
              {/* Max Feedrate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Feedrate (mm/min)</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">X:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxFeedrate?.x || 500}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Y:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxFeedrate?.y || 500}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxFeedrate?.z || 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">E:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxFeedrate?.e || 25}</span>
                  </div>
                </div>
              </div>
              
              {/* Max Acceleration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Acceleration (mm/s²)</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">X:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxAcceleration?.x || 1000}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Y:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxAcceleration?.y || 1000}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxAcceleration?.z || 100}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">E:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.maxAcceleration?.e || 5000}</span>
                  </div>
                </div>
              </div>
              
              {/* PID Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PID Settings</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 font-medium">Hotend (P/I/D):</span>
                    <div className="text-gray-900 font-mono">
                      {printerData.firmwareConfiguration?.pid?.hotend?.p || 21.73} / 
                      {printerData.firmwareConfiguration?.pid?.hotend?.i || 1.54} / 
                      {printerData.firmwareConfiguration?.pid?.hotend?.d || 73.76}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Bed (P/I/D):</span>
                    <div className="text-gray-900 font-mono">
                      {printerData.firmwareConfiguration?.pid?.bed?.p || 301.25} / 
                      {printerData.firmwareConfiguration?.pid?.bed?.i || 24.20} / 
                      {printerData.firmwareConfiguration?.pid?.bed?.d || 73.76}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stepper Drivers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stepper Drivers</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">X:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepperDrivers?.x || 'TMC2208'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Y:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepperDrivers?.y || 'TMC2208'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepperDrivers?.z || 'TMC2208'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">E:</span>
                    <span className="text-gray-900 font-mono">{printerData.firmwareConfiguration?.stepperDrivers?.e || 'TMC2208'}</span>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bed Leveling:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      printerData.firmwareConfiguration?.bedLeveling?.enabled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {printerData.firmwareConfiguration?.bedLeveling?.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Power Loss Recovery:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      printerData.firmwareConfiguration?.powerLossRecovery 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {printerData.firmwareConfiguration?.powerLossRecovery ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Thermal Protection:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      printerData.firmwareConfiguration?.thermalProtection 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {printerData.firmwareConfiguration?.thermalProtection ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Watchdog:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      printerData.firmwareConfiguration?.watchdog 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {printerData.firmwareConfiguration?.watchdog ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calibration Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Thermometer className="h-5 w-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Calibration Status</h3>
            </div>
            
            <div className="space-y-3">
              {printerData.calibrationSteps && Object.entries(printerData.calibrationSteps).map(([stepName, stepData]) => (
                <div key={stepName} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">
                    {stepName.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center space-x-2">
                    {stepData?.completed ? (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    ) : (
                      <span className="text-gray-500 text-sm">Pending</span>
                    )}
                  </div>
                </div>
              ))}
              
              {!printerData.calibrationSteps || Object.keys(printerData.calibrationSteps).length === 0 ? (
                <p className="text-gray-500 text-sm">No calibration steps configured</p>
              ) : null}
            </div>
          </div>

          {/* Bed Mesh Visualization */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Ruler className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Bed Mesh Visualization</h3>
              </div>
              <div className="flex items-center space-x-2">
                {bedLevelingEnabled ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Disabled
                  </span>
                )}
              </div>
            </div>
            <BedMeshVisualization />
          </div>
        </div>
      )}


      {/* Configuration Management Section */}
      {activeSection === 'config' && (
        <div className="space-y-6">
          <ConfigurationManagementTab />
        </div>
      )}

      {/* Marlin Defines Section */}
      {activeSection === 'marlin' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Marlin Configuration Defines</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Browse and search through Marlin firmware configuration defines organized by category.
            </p>
            <MarlinDefineCategorizer defines={sampleMarlinDefines} />
          </div>
        </div>
      )}
    </div>
  )
}

// Compact stored settings grid using per-printer global parameters
const StoredSettingsGrid = ({ activePrinterId }) => {
  if (!activePrinterId) {
    return <p className="text-sm text-gray-500">No printer selected.</p>
  }
  let params = {}
  try {
    params = loadGlobalParameters(activePrinterId) || {}
  } catch (_) {}

  const entries = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== '')
    .slice(0, 24) // keep concise

  if (entries.length === 0) {
    return <p className="text-sm text-gray-500">No stored settings yet. Configure a calibration step to populate global parameters.</p>
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {entries.map(([k, v]) => (
          <div key={k} className="px-2 py-1 bg-gray-50 rounded text-xs flex items-center justify-between">
            <span className="text-gray-600 font-medium truncate mr-2">{k}</span>
            <span className="font-mono text-gray-900 truncate">{typeof v === 'number' ? v.toString() : String(v)}</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-gray-500">These values are saved per printer and reused across steps.</div>
    </div>
  )
}

export default PrinterConfig