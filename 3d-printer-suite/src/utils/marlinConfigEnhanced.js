/**
 * Enhanced Marlin Configuration utilities with categorization, validation, and presets
 */

// Detailed category mapping with subcategories
export const MARLIN_CATEGORIES = {
  'Machine Configuration': {
    subcategories: {
      'Basic Info': ['MACHINE_NAME', 'MACHINE_UUID', 'STRING_CONFIG_H_AUTHOR'],
      'Board & Serial': ['MOTHERBOARD', 'SERIAL_PORT', 'BAUDRATE', 'SERIAL_PORT_2'],
      'Printer Type': ['DELTA', 'SCARA', 'COREXY', 'COREXZ', 'COREYZ', 'MARKFORGED_XY']
    }
  },
  'Geometry & Kinematics': {
    subcategories: {
      'Build Volume': ['X_BED_SIZE', 'Y_BED_SIZE', 'X_MIN_POS', 'X_MAX_POS', 'Y_MIN_POS', 'Y_MAX_POS', 'Z_MIN_POS', 'Z_MAX_POS'],
      'Bed Configuration': ['BED_CENTER_AT_0_0', 'MANUAL_X_HOME_POS', 'MANUAL_Y_HOME_POS', 'MANUAL_Z_HOME_POS', 'BED_TRAMMING_INSET_LFRONT', 'BED_TRAMMING_INSET_RFRONT', 'BED_TRAMMING_INSET_LBACK', 'BED_TRAMMING_INSET_RBACK', 'BED_TRAMMING_HEIGHT', 'BED_TRAMMING_Z_HOP', 'BED_TRAMMING_USE_PROBE', 'BED_TRAMMING_INCLUDE_CENTER', 'BED_TRAMMING_VERIFY_RAISED', 'BED_TRAMMING_AUTO_LEVEL', 'BED_TRAMMING_REPORT_AVERAGE', 'BED_TRAMMING_ACCEPTABLE_TOLERANCE'],
      'Extruder Count': ['EXTRUDERS', 'TEMP_SENSOR_1', 'TEMP_SENSOR_2', 'TEMP_SENSOR_3'],
      'Bed Leveling': ['BED_LEVELING_COMMANDS', 'BED_LEVELING_REPEATABLE', 'BED_LEVELING_GRID', 'BED_LEVELING_GRID_POINTS', 'BED_LEVELING_GRID_SIZE', 'BED_LEVELING_GRID_OFFSET', 'BED_LEVELING_GRID_OFFSET_X', 'BED_LEVELING_GRID_OFFSET_Y', 'BED_LEVELING_GRID_OFFSET_Z', 'BED_LEVELING_GRID_OFFSET_RIGHT', 'BED_LEVELING_GRID_OFFSET_FRONT', 'BED_LEVELING_GRID_OFFSET_LEFT', 'BED_LEVELING_GRID_OFFSET_BACK']
    }
  },
  'Motion & Mechanics': {
    subcategories: {
      'Steps & Direction': ['DEFAULT_AXIS_STEPS_PER_UNIT', 'INVERT_X_DIR', 'INVERT_Y_DIR', 'INVERT_Z_DIR', 'INVERT_E0_DIR', 'INVERT_E1_DIR', 'INVERT_E2_DIR', 'INVERT_E3_DIR', 'INVERT_E4_DIR', 'INVERT_E5_DIR', 'INVERT_E6_DIR', 'INVERT_E7_DIR', 'X_DRIVER_TYPE', 'Y_DRIVER_TYPE', 'Z_DRIVER_TYPE', 'E0_DRIVER_TYPE', 'E1_DRIVER_TYPE', 'E2_DRIVER_TYPE', 'E3_DRIVER_TYPE', 'E4_DRIVER_TYPE', 'E5_DRIVER_TYPE', 'E6_DRIVER_TYPE', 'E7_DRIVER_TYPE'],
      'Speed & Acceleration': ['DEFAULT_MAX_FEEDRATE', 'DEFAULT_MAX_ACCELERATION', 'DEFAULT_ACCELERATION', 'DEFAULT_RETRACT_ACCELERATION'],
      'Jerk Control': ['CLASSIC_JERK', 'DEFAULT_XJERK', 'DEFAULT_YJERK', 'DEFAULT_ZJERK', 'DEFAULT_EJERK'],
      'Junction Deviation': ['JUNCTION_DEVIATION', 'JD_HANDLE_SMALL_SEGMENTS'],
      'Stepper Driver Configuration': ['X_DRIVER_TYPE', 'Y_DRIVER_TYPE', 'Z_DRIVER_TYPE', 'E0_DRIVER_TYPE', 'E1_DRIVER_TYPE', 'E2_DRIVER_TYPE', 'E3_DRIVER_TYPE', 'E4_DRIVER_TYPE', 'E5_DRIVER_TYPE', 'E6_DRIVER_TYPE', 'E7_DRIVER_TYPE', 'X_RSENSE', 'Y_RSENSE', 'Z_RSENSE', 'E0_RSENSE', 'E1_RSENSE', 'E2_RSENSE', 'E3_RSENSE', 'E4_RSENSE', 'E5_RSENSE', 'E6_RSENSE', 'E7_RSENSE', 'X_CHOPPER_TIMING', 'Y_CHOPPER_TIMING', 'Z_CHOPPER_TIMING', 'E0_CHOPPER_TIMING', 'E1_CHOPPER_TIMING', 'E2_CHOPPER_TIMING', 'E3_CHOPPER_TIMING', 'E4_CHOPPER_TIMING', 'E5_CHOPPER_TIMING', 'E6_CHOPPER_TIMING', 'E7_CHOPPER_TIMING']
    }
  },
  'Endstops & Homing': {
    subcategories: {
      'Endstop Configuration': ['USE_XMIN_PLUG', 'USE_YMIN_PLUG', 'USE_ZMIN_PLUG', 'USE_XMAX_PLUG', 'USE_YMAX_PLUG', 'USE_ZMAX_PLUG', 'X_MIN_ENDSTOP_INVERTING', 'Y_MIN_ENDSTOP_INVERTING', 'Z_MIN_ENDSTOP_INVERTING', 'X_MAX_ENDSTOP_INVERTING', 'Y_MAX_ENDSTOP_INVERTING', 'Z_MAX_ENDSTOP_INVERTING', 'X_MIN_ENDSTOP_PULLUP', 'Y_MIN_ENDSTOP_PULLUP', 'Z_MIN_ENDSTOP_PULLUP', 'X_MAX_ENDSTOP_PULLUP', 'Y_MAX_ENDSTOP_PULLUP', 'Z_MAX_ENDSTOP_PULLUP', 'ENDSTOPPULLUPS', 'ENDSTOPPULLUP_XMIN', 'ENDSTOPPULLUP_YMIN', 'ENDSTOPPULLUP_ZMIN', 'ENDSTOPPULLUP_XMAX', 'ENDSTOPPULLUP_YMAX', 'ENDSTOPPULLUP_ZMAX', 'ENDSTOP_INTERRUPTS_FEATURE', 'ENDSTOP_NOISE_FILTER', 'ENDSTOP_NOISE_THRESHOLD'],
      'Endstop Logic': ['X_MIN_ENDSTOP_INVERTING', 'Y_MIN_ENDSTOP_INVERTING', 'Z_MIN_ENDSTOP_INVERTING'],
      'Homing': ['HOMING_FEEDRATE_XY', 'HOMING_FEEDRATE_Z', 'HOMING_BUMP_FEEDRATE', 'X_HOME_BUMP_MM', 'Y_HOME_BUMP_MM', 'Z_HOME_BUMP_MM']
    }
  },
  'Temperature Control': {
    subcategories: {
      'Sensors': ['TEMP_SENSOR_0', 'TEMP_SENSOR_BED', 'TEMP_SENSOR_CHAMBER', 'TEMP_SENSOR_PROBE', 'TEMP_SENSOR_1', 'TEMP_SENSOR_2', 'TEMP_SENSOR_3', 'TEMP_SENSOR_4', 'TEMP_SENSOR_5', 'TEMP_SENSOR_6', 'TEMP_SENSOR_7', 'TEMP_SENSOR_COOLER', 'TEMP_SENSOR_REDUNDANT', 'TEMP_SENSOR_REDUNDANT_SOURCE', 'TEMP_SENSOR_REDUNDANT_TARGET', 'TEMP_SENSOR_REDUNDANT_MAX_DIFF'],
      'Safety Limits': ['HEATER_0_MAXTEMP', 'HEATER_0_MINTEMP', 'BED_MAXTEMP', 'BED_MINTEMP'],
      'PID Settings': ['PIDTEMP', 'DEFAULT_Kp', 'DEFAULT_Ki', 'DEFAULT_Kd', 'PIDTEMPBED'],
      'Thermal Protection': ['THERMAL_PROTECTION_HOTENDS', 'THERMAL_PROTECTION_BED', 'THERMAL_PROTECTION_CHAMBER'],
      'Temperature Control Features': ['BABYSTEPPING', 'BABYSTEP_XY', 'BABYSTEP_INVERT_Z', 'BABYSTEP_MULTIPLICATOR_Z', 'BABYSTEP_MULTIPLICATOR_XY', 'BABYSTEP_ZPROBE_OFFSET', 'BABYSTEP_HOTEND_Z_OFFSET', 'BABYSTEP_ZPROBE_GFX_OVERLAY', 'BABYSTEP_ZPROBE_GFX_REVERSE', 'BABYSTEP_ZPROBE_GFX_START_LEFT', 'BABYSTEP_ZPROBE_GFX_START_TOP', 'BABYSTEP_ZPROBE_GFX_START_RIGHT', 'BABYSTEP_ZPROBE_GFX_START_BOTTOM', 'BABYSTEP_ZPROBE_GFX_START_CENTER', 'BABYSTEP_ZPROBE_GFX_START_CENTER_LEFT', 'BABYSTEP_ZPROBE_GFX_START_CENTER_RIGHT', 'BABYSTEP_ZPROBE_GFX_START_CENTER_TOP', 'BABYSTEP_ZPROBE_GFX_START_CENTER_BOTTOM']
    }
  },
  'Bed Leveling': {
    subcategories: {
      'Auto Bed Leveling': ['AUTO_BED_LEVELING_3POINT', 'AUTO_BED_LEVELING_LINEAR', 'AUTO_BED_LEVELING_BILINEAR', 'AUTO_BED_LEVELING_UBL'],
      'Manual Leveling': ['MESH_BED_LEVELING', 'MANUAL_MESH_BED_LEVELING'],
      'Probe Configuration': ['BLTOUCH', 'FIX_MOUNTED_PROBE', 'NOZZLE_AS_PROBE', 'Z_PROBE_OFFSET_FROM_EXTRUDER'],
      'Grid Settings': ['GRID_MAX_POINTS_X', 'GRID_MAX_POINTS_Y', 'LEFT_PROBE_BED_POSITION', 'RIGHT_PROBE_BED_POSITION'],
      'Babystepping': ['BABYSTEPPING', 'BABYSTEP_XY', 'BABYSTEP_INVERT_Z', 'BABYSTEP_MULTIPLICATOR_Z', 'BABYSTEP_MULTIPLICATOR_XY', 'BABYSTEP_ZPROBE_OFFSET', 'BABYSTEP_HOTEND_Z_OFFSET', 'BABYSTEP_ZPROBE_GFX_OVERLAY', 'BABYSTEP_ZPROBE_GFX_REVERSE']
    }
  },
  'Extruder & Filament': {
    subcategories: {
      'Extruder Mechanics': ['PREVENT_COLD_EXTRUSION', 'EXTRUDE_MINTEMP', 'PREVENT_LENGTHY_EXTRUDE', 'EXTRUDE_MAXLENGTH'],
      'Linear Advance': ['LIN_ADVANCE', 'LIN_ADVANCE_K'],
      'Filament Handling': ['FILAMENT_RUNOUT_SENSOR', 'FILAMENT_RUNOUT_SCRIPT', 'ADVANCED_PAUSE_FEATURE'],
      'Pressure Control': ['FWRETRACT', 'RETRACT_LENGTH', 'RETRACT_FEEDRATE', 'RETRACT_ZRAISE']
    }
  },
  'Display & Interface': {
    subcategories: {
      'LCD Type': ['REPRAP_DISCOUNT_SMART_CONTROLLER', 'REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER', 'CR10_STOCKDISPLAY'],
      'Interface Features': ['ULTIPANEL', 'NEWPANEL', 'LCD_BED_LEVELING', 'LCD_UBL_MESH_EDITING'],
      'SD Card': ['SDSUPPORT', 'SD_CHECK_AND_RETRY', 'SDCARD_SORT_ALPHA']
    }
  },
  'Advanced Features': {
    subcategories: {
      'Motion Features': ['S_CURVE_ACCELERATION', 'BEZIER_JERK_CONTROL', 'EXPERIMENTAL_SCURVE'],
      'Stepper Drivers': ['TMC2130', 'TMC2208', 'TMC2209', 'TMC5130', 'TMC5160'],
      'Networking': ['WIFI_CUSTOM_COMMAND', 'ESP3D_WIFISUPPORT'],
      'Experimental': ['EXPERIMENTAL_I2CBUS', 'EMERGENCY_PARSER', 'REALTIME_REPORTING_COMMANDS'],
      'Advanced Motion': ['ADVANCED_PAUSE_FEATURE', 'ADVANCED_PAUSE_CONTINUOUS_PURGE', 'ADVANCED_PAUSE_PURGE_LENGTH', 'ADVANCED_PAUSE_PURGE_FEEDRATE', 'ADVANCED_PAUSE_PURGE_RETRACT', 'ADVANCED_PAUSE_PURGE_RETRACT_FEEDRATE', 'ADVANCED_PAUSE_PURGE_RETRACT_LENGTH', 'ADVANCED_PAUSE_PURGE_RETRACT_SPEED', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD_FEEDRATE', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD_LENGTH', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD_SPEED'],
      'Advanced Features': ['ADVANCED_PAUSE_FEATURE', 'ADVANCED_PAUSE_CONTINUOUS_PURGE', 'ADVANCED_PAUSE_PURGE_LENGTH', 'ADVANCED_PAUSE_PURGE_FEEDRATE', 'ADVANCED_PAUSE_PURGE_RETRACT', 'ADVANCED_PAUSE_PURGE_RETRACT_FEEDRATE', 'ADVANCED_PAUSE_PURGE_RETRACT_LENGTH', 'ADVANCED_PAUSE_PURGE_RETRACT_SPEED', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD_FEEDRATE', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD_LENGTH', 'ADVANCED_PAUSE_PURGE_RETRACT_UNLOAD_SPEED']
    }
  },
  'Custom Menus & UI': {
    subcategories: {
      'Menu Items': ['CUSTOM_MENU_MAIN', 'CUSTOM_MENU_CONFIGURATION', 'CUSTOM_MENU_MOVE', 'CUSTOM_MENU_TEMPERATURE', 'CUSTOM_MENU_CONTROL', 'CUSTOM_MENU_UTILITY', 'CUSTOM_MENU_MAINTENANCE', 'CUSTOM_MENU_INFO', 'CUSTOM_MENU_DEBUG', 'CUSTOM_MENU_CALIBRATION'],
      'Menu Actions': ['CUSTOM_MENU_ACTION_1', 'CUSTOM_MENU_ACTION_2', 'CUSTOM_MENU_ACTION_3', 'CUSTOM_MENU_ACTION_4', 'CUSTOM_MENU_ACTION_5', 'CUSTOM_MENU_ACTION_6', 'CUSTOM_MENU_ACTION_7', 'CUSTOM_MENU_ACTION_8', 'CUSTOM_MENU_ACTION_9', 'CUSTOM_MENU_ACTION_10'],
      'Menu Labels': ['CUSTOM_MENU_LABEL_1', 'CUSTOM_MENU_LABEL_2', 'CUSTOM_MENU_LABEL_3', 'CUSTOM_MENU_LABEL_4', 'CUSTOM_MENU_LABEL_5', 'CUSTOM_MENU_LABEL_6', 'CUSTOM_MENU_LABEL_7', 'CUSTOM_MENU_LABEL_8', 'CUSTOM_MENU_LABEL_9', 'CUSTOM_MENU_LABEL_10']
    }
  },
  'Printer-Specific Features': {
    subcategories: {
      'Delta Printer': ['DELTA_PRINTER', 'DELTA_ENDSTOP_ADJ', 'DELTA_DIAGONAL_ROD', 'DELTA_HEIGHT', 'DELTA_RADIUS', 'DELTA_SEGMENTS_PER_SECOND', 'DELTA_PRINTABLE_RADIUS', 'DELTA_PROBEABLE_RADIUS', 'DELTA_TOWER_ANGLE_TRIM', 'DELTA_ENDSTOP_OFFSET', 'DELTA_CARRIAGE_OFFSET', 'DELTA_DIAGONAL_ROD_TRIM_TOWER_1', 'DELTA_DIAGONAL_ROD_TRIM_TOWER_2', 'DELTA_DIAGONAL_ROD_TRIM_TOWER_3'],
      'SCARA Printer': ['SCARA_PRINTER', 'SCARA_LINKAGE_1', 'SCARA_LINKAGE_2', 'SCARA_OFFSET_X', 'SCARA_OFFSET_Y', 'SCARA_THETA_OFFSET', 'SCARA_PSI_OFFSET'],
      'CoreXY Printer': ['COREXY_PRINTER', 'COREXY_BELT_DRIVE', 'COREXY_BELT_DRIVE_XY', 'COREXY_BELT_DRIVE_XZ', 'COREXY_BELT_DRIVE_YZ'],
      'Dual X Carriage': ['DUAL_X_CARRIAGE', 'X_DUAL_STEPPER_DRIVERS', 'X2_DRIVER_TYPE', 'X2_HOME_DIR', 'X2_HOME_POS', 'X2_MAX_ENDSTOP_INVERTING', 'X2_MIN_ENDSTOP_INVERTING', 'X2_USE_ENDSTOP', 'X2_STEP_PIN', 'X2_DIR_PIN', 'X2_ENABLE_PIN', 'X2_MS1_PIN', 'X2_MS2_PIN', 'X2_RESET_PIN', 'X2_SLEEP_PIN', 'X2_STEPPER_DRIVER', 'X2_STEPPER_DRIVER_TYPE', 'X2_STEPPER_DRIVER_ADDRESS', 'X2_STEPPER_DRIVER_RSENSE', 'X2_STEPPER_DRIVER_RSENSE_OHMS', 'X2_STEPPER_DRIVER_RSENSE_OHMS_DEFAULT', 'X2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR', 'X2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_DEFAULT', 'X2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_SENSE_RESISTOR', 'X2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_SENSE_RESISTOR_DEFAULT'],
      'Dual Y Carriage': ['DUAL_Y_CARRIAGE', 'Y_DUAL_STEPPER_DRIVERS', 'Y2_DRIVER_TYPE', 'Y2_HOME_DIR', 'Y2_HOME_POS', 'Y2_MAX_ENDSTOP_INVERTING', 'Y2_MIN_ENDSTOP_INVERTING', 'Y2_USE_ENDSTOP', 'Y2_STEP_PIN', 'Y2_DIR_PIN', 'Y2_ENABLE_PIN', 'Y2_MS1_PIN', 'Y2_MS2_PIN', 'Y2_RESET_PIN', 'Y2_SLEEP_PIN', 'Y2_STEPPER_DRIVER', 'Y2_STEPPER_DRIVER_TYPE', 'Y2_STEPPER_DRIVER_ADDRESS', 'Y2_STEPPER_DRIVER_RSENSE', 'Y2_STEPPER_DRIVER_RSENSE_OHMS', 'Y2_STEPPER_DRIVER_RSENSE_OHMS_DEFAULT', 'Y2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR', 'Y2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_DEFAULT', 'Y2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_SENSE_RESISTOR', 'Y2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_SENSE_RESISTOR_DEFAULT'],
      'Dual Z Carriage': ['DUAL_Z_CARRIAGE', 'Z_DUAL_STEPPER_DRIVERS', 'Z2_DRIVER_TYPE', 'Z2_HOME_DIR', 'Z2_HOME_POS', 'Z2_MAX_ENDSTOP_INVERTING', 'Z2_MIN_ENDSTOP_INVERTING', 'Z2_USE_ENDSTOP', 'Z2_STEP_PIN', 'Z2_DIR_PIN', 'Z2_ENABLE_PIN', 'Z2_MS1_PIN', 'Z2_MS2_PIN', 'Z2_RESET_PIN', 'Z2_SLEEP_PIN', 'Z2_STEPPER_DRIVER', 'Z2_STEPPER_DRIVER_TYPE', 'Z2_STEPPER_DRIVER_ADDRESS', 'Z2_STEPPER_DRIVER_RSENSE', 'Z2_STEPPER_DRIVER_RSENSE_OHMS', 'Z2_STEPPER_DRIVER_RSENSE_OHMS_DEFAULT', 'Z2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR', 'Z2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_DEFAULT', 'Z2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_SENSE_RESISTOR', 'Z2_STEPPER_DRIVER_RSENSE_OHMS_SENSE_RESISTOR_SENSE_RESISTOR_DEFAULT']
    }
  },
  'Safety & Protection': {
    subcategories: {
      'Thermal Protection': ['THERMAL_PROTECTION_HOTENDS', 'THERMAL_PROTECTION_BED', 'THERMAL_PROTECTION_CHAMBER', 'THERMAL_PROTECTION_COOLER', 'THERMAL_PROTECTION_COOLER_PERIOD', 'THERMAL_PROTECTION_COOLER_HYSTERESIS', 'THERMAL_PROTECTION_COOLER_FAN_SPEED', 'THERMAL_PROTECTION_COOLER_FAN_SPEED_MIN', 'THERMAL_PROTECTION_COOLER_FAN_SPEED_MAX'],
      'Emergency Features': ['EMERGENCY_PARSER', 'HOST_ACTION_COMMANDS', 'HOST_PROMPT_SUPPORT', 'HOST_KEEPALIVE_FEATURE', 'HOST_KEEPALIVE_TIMEOUT', 'HOST_KEEPALIVE_INTERVAL', 'HOST_KEEPALIVE_TIMEOUT_SECONDS', 'HOST_KEEPALIVE_INTERVAL_SECONDS'],
      'Filament Safety': ['FILAMENT_RUNOUT_SENSOR', 'FILAMENT_RUNOUT_SCRIPT', 'FILAMENT_RUNOUT_DISTANCE_MM', 'FILAMENT_RUNOUT_SECONDS', 'FILAMENT_RUNOUT_PULLUP', 'FILAMENT_RUNOUT_ON_STATE', 'FILAMENT_RUNOUT_SENSOR_STATE', 'FILAMENT_RUNOUT_SENSOR_STATE_HIGH', 'FILAMENT_RUNOUT_SENSOR_STATE_LOW']
    }
  },
  'Communication & Host': {
    subcategories: {
      'Serial Communication': ['SERIAL_PORT', 'SERIAL_PORT_2', 'BAUDRATE', 'SERIAL_BAUDRATE', 'SERIAL_BAUDRATE_2', 'SERIAL_BAUDRATE_3', 'SERIAL_BAUDRATE_4', 'SERIAL_BAUDRATE_5', 'SERIAL_BAUDRATE_6', 'SERIAL_BAUDRATE_7', 'SERIAL_BAUDRATE_8', 'SERIAL_BAUDRATE_9', 'SERIAL_BAUDRATE_10'],
      'Host Interface': ['HOST_ACTION_COMMANDS', 'HOST_PROMPT_SUPPORT', 'HOST_KEEPALIVE_FEATURE', 'HOST_KEEPALIVE_TIMEOUT', 'HOST_KEEPALIVE_INTERVAL', 'HOST_KEEPALIVE_TIMEOUT_SECONDS', 'HOST_KEEPALIVE_INTERVAL_SECONDS'],
      'Network Features': ['WIFI_CUSTOM_COMMAND', 'ESP3D_WIFISUPPORT', 'ESP3D_WIFISUPPORT_SSID', 'ESP3D_WIFISUPPORT_PASSWORD', 'ESP3D_WIFISUPPORT_IP', 'ESP3D_WIFISUPPORT_GATEWAY', 'ESP3D_WIFISUPPORT_SUBNET', 'ESP3D_WIFISUPPORT_AP_SSID', 'ESP3D_WIFISUPPORT_AP_PASSWORD', 'ESP3D_WIFISUPPORT_AP_IP', 'ESP3D_WIFISUPPORT_AP_GATEWAY', 'ESP3D_WIFISUPPORT_AP_SUBNET']
    }
  },
  'Fans & Cooling': {
    subcategories: {
      'Fan Configuration': ['FANMUX0', 'FANMUX1', 'FANMUX2', 'FANMUX3', 'FANMUX4', 'FANMUX5', 'FANMUX6', 'FANMUX7', 'FANMUX8', 'FANMUX9', 'FANMUX10', 'FANMUX11', 'FANMUX12', 'FANMUX13', 'FANMUX14', 'FANMUX15', 'FANMUX16', 'FANMUX17', 'FANMUX18', 'FANMUX19', 'FANMUX20', 'FANMUX21', 'FANMUX22', 'FANMUX23', 'FANMUX24', 'FANMUX25', 'FANMUX26', 'FANMUX27', 'FANMUX28', 'FANMUX29', 'FANMUX30', 'FANMUX31'],
      'Cooling Fans': ['USE_CONTROLLER_FAN', 'CONTROLLER_FAN_PIN', 'CONTROLLER_FAN_EDITABLE', 'CONTROLLER_FAN_EDITABLE_SPEED', 'CONTROLLER_FAN_EDITABLE_TEMP', 'CONTROLLER_FAN_EDITABLE_TEMP_MIN', 'CONTROLLER_FAN_EDITABLE_TEMP_MAX', 'CONTROLLER_FAN_EDITABLE_TEMP_STEP', 'CONTROLLER_FAN_EDITABLE_TEMP_DEFAULT', 'CONTROLLER_FAN_EDITABLE_SPEED_MIN', 'CONTROLLER_FAN_EDITABLE_SPEED_MAX', 'CONTROLLER_FAN_EDITABLE_SPEED_STEP', 'CONTROLLER_FAN_EDITABLE_SPEED_DEFAULT'],
      'Part Cooling': ['EXTRUDER_AUTO_FAN_TEMPERATURE', 'EXTRUDER_AUTO_FAN_SPEED', 'EXTRUDER_AUTO_FAN_DURATION', 'EXTRUDER_AUTO_FAN_SPEED_MIN', 'EXTRUDER_AUTO_FAN_SPEED_MAX', 'EXTRUDER_AUTO_FAN_SPEED_STEP', 'EXTRUDER_AUTO_FAN_SPEED_DEFAULT', 'EXTRUDER_AUTO_FAN_TEMP_MIN', 'EXTRUDER_AUTO_FAN_TEMP_MAX', 'EXTRUDER_AUTO_FAN_TEMP_STEP', 'EXTRUDER_AUTO_FAN_TEMP_DEFAULT']
    }
  },
  'Hardware & Pins': {
    subcategories: {
      'Pin Assignments': ['X_STEP_PIN', 'X_DIR_PIN', 'X_ENABLE_PIN', 'X_MS1_PIN', 'X_MS2_PIN', 'X_RESET_PIN', 'X_SLEEP_PIN', 'Y_STEP_PIN', 'Y_DIR_PIN', 'Y_ENABLE_PIN', 'Y_MS1_PIN', 'Y_MS2_PIN', 'Y_RESET_PIN', 'Y_SLEEP_PIN', 'Z_STEP_PIN', 'Z_DIR_PIN', 'Z_ENABLE_PIN', 'Z_MS1_PIN', 'Z_MS2_PIN', 'Z_RESET_PIN', 'Z_SLEEP_PIN', 'E0_STEP_PIN', 'E0_DIR_PIN', 'E0_ENABLE_PIN', 'E0_MS1_PIN', 'E0_MS2_PIN', 'E0_RESET_PIN', 'E0_SLEEP_PIN'],
      'Heater Pins': ['HEATER_0_PIN', 'HEATER_1_PIN', 'HEATER_2_PIN', 'HEATER_3_PIN', 'HEATER_4_PIN', 'HEATER_5_PIN', 'HEATER_6_PIN', 'HEATER_7_PIN', 'HEATER_BED_PIN', 'HEATER_CHAMBER_PIN', 'HEATER_COOLER_PIN'],
      'Fan Pins': ['FAN_PIN', 'FAN1_PIN', 'FAN2_PIN', 'FAN3_PIN', 'FAN4_PIN', 'FAN5_PIN', 'FAN6_PIN', 'FAN7_PIN', 'CONTROLLER_FAN_PIN', 'EXTRUDER_AUTO_FAN_PIN'],
      'Sensor Pins': ['TEMP_0_PIN', 'TEMP_1_PIN', 'TEMP_2_PIN', 'TEMP_3_PIN', 'TEMP_4_PIN', 'TEMP_5_PIN', 'TEMP_6_PIN', 'TEMP_7_PIN', 'TEMP_BED_PIN', 'TEMP_CHAMBER_PIN', 'TEMP_COOLER_PIN', 'TEMP_PROBE_PIN'],
      'Endstop Pins': ['X_MIN_PIN', 'X_MAX_PIN', 'Y_MIN_PIN', 'Y_MAX_PIN', 'Z_MIN_PIN', 'Z_MAX_PIN', 'X_STOP_PIN', 'Y_STOP_PIN', 'Z_STOP_PIN'],
      'Probe Pins': ['Z_MIN_PROBE_PIN', 'Z_MIN_PROBE_PIN_INVERTING', 'Z_MIN_PROBE_PIN_PULLUP', 'Z_MIN_PROBE_PIN_PULLDOWN', 'Z_MIN_PROBE_PIN_PULLUP_INVERTING', 'Z_MIN_PROBE_PIN_PULLDOWN_INVERTING']
    }
  }
}

// Setting validation rules
export const MARLIN_VALIDATION_RULES = {
  'BAUDRATE': {
    type: 'enum',
    values: [9600, 19200, 38400, 57600, 115200, 230400, 250000, 500000, 1000000],
    default: 115200,
    description: 'Serial communication baud rate. 115200 is standard for most printers.'
  },
  'EXTRUDERS': {
    type: 'number',
    min: 1,
    max: 8,
    default: 1,
    description: 'Number of extruders. Most printers have 1, multi-color printers may have 2-4.'
  },
  'X_BED_SIZE': {
    type: 'number',
    min: 50,
    max: 1000,
    default: 220,
    description: 'Build volume width in mm. Should match your printer\'s physical bed size.'
  },
  'Y_BED_SIZE': {
    type: 'number',
    min: 50,
    max: 1000,
    default: 220,
    description: 'Build volume depth in mm. Should match your printer\'s physical bed size.'
  },
  'DEFAULT_AXIS_STEPS_PER_UNIT': {
    type: 'array',
    elementType: 'number',
    length: 4,
    description: 'Steps per mm for X, Y, Z, E axes. Critical for dimensional accuracy.',
    validation: (value) => {
      if (!Array.isArray(value) || value.length !== 4) return 'Must be array of 4 numbers'
      if (value.some(v => v < 10 || v > 2000)) return 'Values should be between 10-2000'
      return null
    }
  },
  'DEFAULT_MAX_FEEDRATE': {
    type: 'array',
    elementType: 'number',
    length: 4,
    description: 'Maximum feedrates in mm/s for X, Y, Z, E axes.',
    validation: (value) => {
      if (!Array.isArray(value) || value.length !== 4) return 'Must be array of 4 numbers'
      if (value[0] < 10 || value[0] > 1000) return 'X feedrate should be 10-1000 mm/s'
      if (value[1] < 10 || value[1] > 1000) return 'Y feedrate should be 10-1000 mm/s'
      if (value[2] < 1 || value[2] > 100) return 'Z feedrate should be 1-100 mm/s'
      if (value[3] < 1 || value[3] > 200) return 'E feedrate should be 1-200 mm/s'
      return null
    }
  },
  'HEATER_0_MAXTEMP': {
    type: 'number',
    min: 200,
    max: 500,
    default: 275,
    description: 'Maximum hotend temperature in °C. Set based on your hotend capabilities.'
  },
  'BED_MAXTEMP': {
    type: 'number',
    min: 60,
    max: 200,
    default: 130,
    description: 'Maximum bed temperature in °C. Set based on your heated bed capabilities.'
  },
  'LIN_ADVANCE_K': {
    type: 'number',
    min: 0,
    max: 10,
    default: 0,
    description: 'Linear Advance K factor. 0 disables, typical values 0.05-0.5 for direct drive, 0.3-1.5 for Bowden.'
  },
  'DEFAULT_MAX_ACCELERATION': {
    type: 'array',
    elementType: 'number',
    length: 4,
    description: 'Maximum acceleration in mm/s² for X, Y, Z, E axes.',
    validation: (value) => {
      if (!Array.isArray(value) || value.length !== 4) return 'Must be array of 4 numbers'
      if (value[0] < 100 || value[0] > 10000) return 'X acceleration should be 100-10000 mm/s²'
      if (value[1] < 100 || value[1] > 10000) return 'Y acceleration should be 100-10000 mm/s²'
      if (value[2] < 10 || value[2] > 1000) return 'Z acceleration should be 10-1000 mm/s²'
      if (value[3] < 100 || value[3] > 50000) return 'E acceleration should be 100-50000 mm/s²'
      return null
    }
  },
  'DEFAULT_ACCELERATION': {
    type: 'number',
    min: 100,
    max: 10000,
    default: 3000,
    description: 'Default acceleration in mm/s² for print moves.'
  },
  'DEFAULT_RETRACT_ACCELERATION': {
    type: 'number',
    min: 100,
    max: 50000,
    default: 3000,
    description: 'Default acceleration in mm/s² for retraction moves.'
  },
  'CLASSIC_JERK': {
    type: 'boolean',
    default: false,
    description: 'Enable classic jerk control instead of junction deviation.'
  },
  'DEFAULT_XJERK': {
    type: 'number',
    min: 0,
    max: 100,
    default: 10,
    description: 'Default X-axis jerk in mm/s.'
  },
  'DEFAULT_YJERK': {
    type: 'number',
    min: 0,
    max: 100,
    default: 10,
    description: 'Default Y-axis jerk in mm/s.'
  },
  'DEFAULT_ZJERK': {
    type: 'number',
    min: 0,
    max: 20,
    default: 0.3,
    description: 'Default Z-axis jerk in mm/s.'
  },
  'DEFAULT_EJERK': {
    type: 'number',
    min: 0,
    max: 100,
    default: 5,
    description: 'Default E-axis jerk in mm/s.'
  },
  'JUNCTION_DEVIATION': {
    type: 'number',
    min: 0.01,
    max: 1.0,
    default: 0.013,
    description: 'Junction deviation for smooth motion planning.'
  },
  'RETRACT_LENGTH': {
    type: 'number',
    min: 0,
    max: 50,
    default: 6.5,
    description: 'Retraction length in mm. 1-2mm for direct drive, 4-8mm for Bowden.'
  },
  'RETRACT_FEEDRATE': {
    type: 'number',
    min: 10,
    max: 200,
    default: 45,
    description: 'Retraction feedrate in mm/s.'
  },
  'RETRACT_ZRAISE': {
    type: 'number',
    min: 0,
    max: 10,
    default: 0,
    description: 'Z-axis raise during retraction in mm.'
  },
  'HOMING_FEEDRATE_XY': {
    type: 'number',
    min: 100,
    max: 10000,
    default: 3000,
    description: 'Homing feedrate for X and Y axes in mm/s.'
  },
  'HOMING_FEEDRATE_Z': {
    type: 'number',
    min: 100,
    max: 2000,
    default: 1500,
    description: 'Homing feedrate for Z axis in mm/s.'
  },
  'GRID_MAX_POINTS_X': {
    type: 'number',
    min: 2,
    max: 15,
    default: 5,
    description: 'Number of probe points in X direction for bed leveling.'
  },
  'GRID_MAX_POINTS_Y': {
    type: 'number',
    min: 2,
    max: 15,
    default: 5,
    description: 'Number of probe points in Y direction for bed leveling.'
  }
}

// Configuration presets for common modifications
export const MARLIN_PRESETS = {
  'Direct Drive Conversion': {
    description: 'Optimized settings for direct drive extruder conversion',
    settings: {
      'LIN_ADVANCE': true,
      'LIN_ADVANCE_K': 0.2,
      'RETRACT_LENGTH': 1.0,
      'RETRACT_FEEDRATE': 60,
      'DEFAULT_AXIS_STEPS_PER_UNIT': [80, 80, 400, 140], // Typical direct drive E-steps
      'DEFAULT_MAX_ACCELERATION': [500, 500, 100, 10000] // Higher E acceleration for direct drive
    }
  },
  'High Speed Printing': {
    description: 'Settings optimized for high-speed printing',
    settings: {
      'CLASSIC_JERK': false,
      'JUNCTION_DEVIATION': 0.05,
      'S_CURVE_ACCELERATION': true,
      'DEFAULT_MAX_FEEDRATE': [500, 500, 15, 120],
      'DEFAULT_MAX_ACCELERATION': [3000, 3000, 100, 10000],
      'LIN_ADVANCE': true,
      'LIN_ADVANCE_K': 0.4
    }
  },
  'Silent Operation': {
    description: 'Reduced noise settings for quiet operation',
    settings: {
      'TMC2208': true,
      'STEALTHCHOP': true,
      'HYBRID_THRESHOLD': true,
      'DEFAULT_MAX_FEEDRATE': [200, 200, 8, 50],
      'DEFAULT_MAX_ACCELERATION': [800, 800, 50, 5000],
      'DEFAULT_XJERK': 8,
      'DEFAULT_YJERK': 8,
      'DEFAULT_ZJERK': 0.3
    }
  },
  'Auto Bed Leveling': {
    description: 'Complete auto bed leveling setup',
    settings: {
      'AUTO_BED_LEVELING_BILINEAR': true,
      'GRID_MAX_POINTS_X': 5,
      'GRID_MAX_POINTS_Y': 5,
      'LCD_BED_LEVELING': true,
      'RESTORE_LEVELING_AFTER_G28': true,
      'ENABLE_LEVELING_FADE_HEIGHT': true,
      'DEFAULT_LEVELING_FADE_HEIGHT': 10
    }
  },
  'Safety Enhanced': {
    description: 'Enhanced safety features and thermal protection',
    settings: {
      'THERMAL_PROTECTION_HOTENDS': true,
      'THERMAL_PROTECTION_BED': true,
      'THERMAL_PROTECTION_CHAMBER': true,
      'PREVENT_COLD_EXTRUSION': true,
      'PREVENT_LENGTHY_EXTRUDE': true,
      'EMERGENCY_PARSER': true,
      'HOST_ACTION_COMMANDS': true,
      'HOST_PROMPT_SUPPORT': true
    }
  }
}

/**
 * Categorize Marlin settings into logical groups
 */
export function categorizeMarlinSettings(settings) {
  const categorized = {}
  const uncategorized = []

  // Initialize categories
  Object.keys(MARLIN_CATEGORIES).forEach(category => {
    categorized[category] = {}
    Object.keys(MARLIN_CATEGORIES[category].subcategories).forEach(subcategory => {
      categorized[category][subcategory] = []
    })
  })

  settings.forEach(setting => {
    let placed = false
    
    // Check each category and subcategory
    for (const [category, categoryData] of Object.entries(MARLIN_CATEGORIES)) {
      for (const [subcategory, settingNames] of Object.entries(categoryData.subcategories)) {
        if (settingNames.includes(setting.name)) {
          categorized[category][subcategory].push(setting)
          placed = true
          break
        }
      }
      if (placed) break
    }

    if (!placed) {
      uncategorized.push(setting)
    }
  })

  // Add uncategorized items to "Other" category
  if (uncategorized.length > 0) {
    if (!categorized['Other']) {
      categorized['Other'] = { 'Uncategorized': [] }
    }
    categorized['Other']['Uncategorized'] = uncategorized
  }

  return categorized
}

/**
 * Validate a Marlin setting value
 */
export function validateMarlinSetting(settingName, value) {
  const rule = MARLIN_VALIDATION_RULES[settingName]
  
  if (!rule) {
    // Basic type validation for unknown settings
    if (value === null || value === undefined || value === '') {
      return { isValid: false, error: 'Value cannot be empty' }
    }
    return { isValid: true, error: null }
  }

  // Custom validation function
  if (rule.validation) {
    const error = rule.validation(value)
    return { isValid: !error, error }
  }

  // Type-specific validation
  switch (rule.type) {
    case 'number':
      const num = parseFloat(value)
      if (isNaN(num)) {
        return { isValid: false, error: 'Must be a number' }
      }
      if (rule.min !== undefined && num < rule.min) {
        return { isValid: false, error: `Must be at least ${rule.min}` }
      }
      if (rule.max !== undefined && num > rule.max) {
        return { isValid: false, error: `Must be at most ${rule.max}` }
      }
      break

    case 'enum':
      // Convert value to number if the enum values are numbers
      const enumValue = typeof rule.values[0] === 'number' ? parseFloat(value) : value
      if (!rule.values.includes(enumValue)) {
        return { isValid: false, error: `Must be one of: ${rule.values.join(', ')}` }
      }
      break

    case 'boolean':
      if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
        return { isValid: false, error: 'Must be true or false' }
      }
      break

    case 'array':
      if (!Array.isArray(value)) {
        return { isValid: false, error: 'Must be an array' }
      }
      if (rule.length && value.length !== rule.length) {
        return { isValid: false, error: `Must have exactly ${rule.length} elements` }
      }
      break
  }

  return { isValid: true, error: null }
}

/**
 * Get setting description and help text
 */
export function getSettingInfo(settingName) {
  const rule = MARLIN_VALIDATION_RULES[settingName]
  
  return {
    description: rule?.description || 'No description available',
    type: rule?.type || 'unknown',
    default: rule?.default,
    constraints: {
      min: rule?.min,
      max: rule?.max,
      values: rule?.values
    }
  }
}

/**
 * Compare two configuration objects and return differences
 */
export function compareConfigurations(current, baseline) {
  const differences = {
    added: [],
    modified: [],
    removed: []
  }

  const currentMap = new Map(current.map(setting => [setting.name, setting]))
  const baselineMap = new Map(baseline.map(setting => [setting.name, setting]))

  // Find added and modified settings
  current.forEach(setting => {
    const baselineSetting = baselineMap.get(setting.name)
    if (!baselineSetting) {
      differences.added.push(setting)
    } else if (baselineSetting.value !== setting.value || baselineSetting.enabled !== setting.enabled) {
      differences.modified.push({
        current: setting,
        baseline: baselineSetting
      })
    }
  })

  // Find removed settings
  baseline.forEach(setting => {
    if (!currentMap.has(setting.name)) {
      differences.removed.push(setting)
    }
  })

  return differences
}

/**
 * Apply a preset to current configuration
 */
export function applyPreset(currentSettings, presetName) {
  const preset = MARLIN_PRESETS[presetName]
  if (!preset) return currentSettings

  const updatedSettings = [...currentSettings]
  
  Object.entries(preset.settings).forEach(([settingName, newValue]) => {
    const settingIndex = updatedSettings.findIndex(s => s.name === settingName)
    
    if (settingIndex !== -1) {
      // Update existing setting
      updatedSettings[settingIndex] = {
        ...updatedSettings[settingIndex],
        value: newValue,
        enabled: true
      }
    } else {
      // Add new setting
      updatedSettings.push({
        name: settingName,
        value: newValue,
        enabled: true,
        description: getSettingInfo(settingName).description,
        fileType: 'basic'
      })
    }
  })

  return updatedSettings
}

/**
 * Determine if a setting is relevant for the current printer type
 */
export function isSettingRelevantForPrinter(settingName, printerType = 'cartesian') {
  const printerSpecificSettings = {
    delta: [
      'DELTA_PRINTER', 'DELTA_ENDSTOP_ADJ', 'DELTA_DIAGONAL_ROD', 'DELTA_HEIGHT', 'DELTA_RADIUS',
      'DELTA_SEGMENTS_PER_SECOND', 'DELTA_PRINTABLE_RADIUS', 'DELTA_PROBEABLE_RADIUS',
      'DELTA_TOWER_ANGLE_TRIM', 'DELTA_ENDSTOP_OFFSET', 'DELTA_CARRIAGE_OFFSET',
      'DELTA_DIAGONAL_ROD_TRIM_TOWER_1', 'DELTA_DIAGONAL_ROD_TRIM_TOWER_2', 'DELTA_DIAGONAL_ROD_TRIM_TOWER_3'
    ],
    scara: [
      'SCARA_PRINTER', 'SCARA_LINKAGE_1', 'SCARA_LINKAGE_2', 'SCARA_OFFSET_X', 'SCARA_OFFSET_Y',
      'SCARA_THETA_OFFSET', 'SCARA_PSI_OFFSET'
    ],
    corexy: [
      'COREXY_PRINTER', 'COREXY_BELT_DRIVE', 'COREXY_BELT_DRIVE_XY', 'COREXY_BELT_DRIVE_XZ', 'COREXY_BELT_DRIVE_YZ'
    ],
    dual_x: [
      'DUAL_X_CARRIAGE', 'X_DUAL_STEPPER_DRIVERS', 'X2_DRIVER_TYPE', 'X2_HOME_DIR', 'X2_HOME_POS',
      'X2_MAX_ENDSTOP_INVERTING', 'X2_MIN_ENDSTOP_INVERTING', 'X2_USE_ENDSTOP'
    ],
    dual_y: [
      'DUAL_Y_CARRIAGE', 'Y_DUAL_STEPPER_DRIVERS', 'Y2_DRIVER_TYPE', 'Y2_HOME_DIR', 'Y2_HOME_POS',
      'Y2_MAX_ENDSTOP_INVERTING', 'Y2_MIN_ENDSTOP_INVERTING', 'Y2_USE_ENDSTOP'
    ],
    dual_z: [
      'DUAL_Z_CARRIAGE', 'Z_DUAL_STEPPER_DRIVERS', 'Z2_DRIVER_TYPE', 'Z2_HOME_DIR', 'Z2_HOME_POS',
      'Z2_MAX_ENDSTOP_INVERTING', 'Z2_MIN_ENDSTOP_INVERTING', 'Z2_USE_ENDSTOP'
    ]
  }

  // If it's a printer-specific setting, check if it matches the current printer type
  for (const [type, settings] of Object.entries(printerSpecificSettings)) {
    if (settings.includes(settingName)) {
      return type === printerType || printerType === 'cartesian' // Cartesian printers don't have these specific settings
    }
  }

  // For non-printer-specific settings, always show them
  return true
}

/**
 * Search and filter settings
 */
export function searchSettings(settings, query) {
  if (!query) return settings

  const lowercaseQuery = query.toLowerCase()
  
  return settings.filter(setting =>
    setting.name.toLowerCase().includes(lowercaseQuery) ||
    setting.description.toLowerCase().includes(lowercaseQuery) ||
    String(setting.value).toLowerCase().includes(lowercaseQuery)
  )
}
