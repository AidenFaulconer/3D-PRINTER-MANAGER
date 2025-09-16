// Marlin Configuration Define Categories
// This file categorizes Marlin configuration defines for better organization

export const MARLIN_DEFINE_CATEGORIES = {
  // Hardware Configuration
  HARDWARE: {
    name: "Hardware Configuration",
    description: "Physical hardware setup and pin definitions",
    color: "blue",
    defines: [
      // Board and Motherboard
      "MOTHERBOARD", "BOARD_*", "CONFIG_EXAMPLES_DIR",
      
      // Pin Definitions
      "X_STEP_PIN", "X_DIR_PIN", "X_ENABLE_PIN", "X_CS_PIN",
      "Y_STEP_PIN", "Y_DIR_PIN", "Y_ENABLE_PIN", "Y_CS_PIN", 
      "Z_STEP_PIN", "Z_DIR_PIN", "Z_ENABLE_PIN", "Z_CS_PIN",
      "E*_STEP_PIN", "E*_DIR_PIN", "E*_ENABLE_PIN", "E*_CS_PIN",
      
      // Endstops
      "X_STOP_PIN", "Y_STOP_PIN", "Z_STOP_PIN", "Z_MIN_PROBE_PIN",
      "ENDSTOP*", "ENDSTOPPULL*",
      
      // Thermistors and Temperature
      "TEMP_*_PIN", "HEATER_*_PIN", "FAN*_PIN",
      
      // Stepper Drivers
      "TMC_*", "CHOPPER_TIMING*", "CURRENT_STEP_DOWN",
      "DIGIPOT_*", "DAC_*",
      
      // Display and UI
      "LCD_*", "TFT_*", "ANYCUBIC_*", "BTT_*", "BIQU_*",
      "CUSTOM_MENU_*", "CUSTOM_USER_*", "BUTTON*_*",
      "DGUS_*", "DWIN_*", "FYSETC_*", "CR10_*",
      
      // Servos and Motors
      "SERVO*_PIN", "SERVO*_ANGLE", "SERVO*_SPEED",
      
      // I2C and Communication
      "I2C_*", "I2CPE_*"
    ]
  },

  // Temperature Control
  TEMPERATURE: {
    name: "Temperature Control",
    description: "Hotend, bed, and chamber temperature management",
    color: "red",
    defines: [
      // PID Settings
      "DEFAULT_*Kp", "DEFAULT_*Ki", "DEFAULT_*Kd",
      "PID_*", "AUTOTEMP*",
      
      // Temperature Limits
      "MAXTEMP*", "MINTEMP*", "OVERSHOOT*",
      "BED_*TEMP*", "CHAMBER_*TEMP*", "COOLER_*TEMP*",
      
      // Temperature Sensors
      "TEMP_*_BETA", "TEMP_*_RESISTANCE*", "TEMP_*_PULLUP*",
      "TEMP_*_SH_C_COEFF", "TEMP_*_GAIN*", "TEMP_*_OFFSET*",
      "TEMP_*_HYSTERESIS*", "TEMP_*_RESIDENCY*", "TEMP_*_WINDOW*",
      "TEMP_*_SENSOR*", "TEMP_*_BOARD*", "TEMP_*_SOC*",
      
      // Heating Control
      "BED_*", "CHAMBER_*", "COOLER_*", "HEATER_*",
      "THERMAL_PROTECTION*", "WATCH_TEMP*", "SOC_*",
      "TEMP_*_STAT*", "TEMP_*_TUNING*", "TEMP_*_UNITS*"
    ]
  },

  // Movement and Kinematics
  MOVEMENT: {
    name: "Movement & Kinematics", 
    description: "Axis movement, acceleration, and kinematic systems",
    color: "green",
    defines: [
      // Acceleration and Speed
      "DEFAULT_*ACCELERATION*", "DEFAULT_*JERK*", "DEFAULT_*FEEDRATE*",
      "MAX_*ACCELERATION*", "MAX_*JERK*", "MAX_*FEEDRATE*",
      "DEFAULT_*JERK*", "DEFAULT_*FEEDRATE*", "DEFAULT_*SEGMENTS*",
      "DEFAULT_*MINIMUM*", "DEFAULT_*MINTRAVEL*", "DEFAULT_*TRAVEL*",
      
      // Kinematics
      "CORE*", "DELTA*", "SCARA*", "TPARA*", "POLAR*",
      "BELTPRINTER", "ARTICULATED_ROBOT_ARM",
      
      // Backlash and Compensation
      "BACKLASH_*", "CORE_BACKLASH",
      
      // Movement Limits
      "X_MAX_POS", "Y_MAX_POS", "Z_MAX_POS", "X_MIN_POS", "Y_MIN_POS", "Z_MIN_POS",
      "X_BED_SIZE", "Y_BED_SIZE", "Z_MAX_LENGTH",
      "*_MAX_POS", "*_MIN_POS", "*_MAX_ENDSTOP*", "*_MIN_ENDSTOP*",
      
      // Homing
      "HOMING_*", "Z_SAFE_HOMING", "Z_HOMING_HEIGHT",
      "CODEPENDENT_XY_HOMING", "ASSISTED_TRAMMING*",
      "HOME_*", "DELTA_*",
      
      // Axis Control
      "DISABLE_*", "INVERT_*", "*_DIR", "*_ENABLE*",
      "FINE_MANUAL_MOVE", "DIRECT_*", "EDGE_STEPPING",
      
      // G-code Motion
      "G*_FEEDRATE*", "G*_*_FEEDRATE*", "G*_*_COMMANDS*",
      "G*_MAX_*", "G*_MINIMUM_*", "G*_PROBE_*"
    ]
  },

  // Bed Leveling and Probing
  BED_LEVELING: {
    name: "Bed Leveling & Probing",
    description: "Automatic bed leveling and probe configuration",
    color: "purple", 
    defines: [
      // Bed Leveling Types
      "AUTO_BED_LEVELING*", "ABL_*", "BILINEAR*", "MESH_BED_LEVELING*",
      "UBL_*", "GRID_MAX_POINTS*", "BED_LEVELING_COMMANDS*",
      
      // Probe Configuration
      "Z_PROBE_*", "BLTOUCH*", "FIX_MOUNTED_PROBE*",
      "PROBE_*", "Z_MIN_PROBE_*", "Z_PROBE_SPEED*",
      
      // Bed Mesh
      "MESH_*", "BED_MESH_*", "GRID_*", "PROBING_*",
      
      // Tramming
      "BED_TRAMMING*", "ASSISTED_TRAMMING*",
      
      // Magnetic Probes
      "MAG_MOUNTED_*", "MAGLEV*", "MAGNETIC_*",
      
      // Probe Deployment
      "PROBE_DEPLOY*", "PROBE_STOW*", "PROBE_ACTIVATION*",
      "PROBE_ENABLE*", "PROBE_MANUALLY*", "PROBE_OFFSET*",
      "PROBE_TARE*", "PROBE_TOOLCHANGE*"
    ]
  },

  // Extrusion and Filament
  EXTRUSION: {
    name: "Extrusion & Filament",
    description: "Extruder configuration and filament handling",
    color: "orange",
    defines: [
      // Extruder Configuration
      "EXTRUDERS", "E_STEP_PER_UNIT*", "EXTRUDE_*",
      "EXTRUDER_*", "E*_STEPS_PER_UNIT*", "E*_CURRENT*",
      "E*_AUTO_FAN*", "E*_CHAIN_POS*", "E*_CS_PIN*",
      "E*_FAN_TACHO*", "E*_HOLD_MULTIPLIER*", "E*_HYBRID_THRESHOLD*",
      "E*_INTERPOLATE*", "E*_MICROSTEPS*", "E*_SLAVE_ADDRESS*",
      
      // Filament Change
      "FILAMENT_CHANGE*", "CONFIGURE_FILAMENT_CHANGE*",
      "ADVANCED_PAUSE*", "PARK_HEAD_ON_PAUSE*",
      
      // Linear Advance
      "LIN_ADVANCE*", "ADVANCE_*", "LA_*",
      
      // Retraction
      "RETRACT_*", "RETRACTION_*", "FWRETRACT*",
      
      // MMU/IDEX
      "MMU*", "IDEX*", "DUAL_X_CARRIAGE*", "DUPLICATION*",
      "_MMU*", "_MMU3_*",
      
      // Filament Detection
      "FIL_*", "FILAMENT_*", "FILWIDTH_*",
      
      // Flow Control
      "FLOW_*", "FLOWMETER_*"
    ]
  },

  // Fans and Cooling
  FANS: {
    name: "Fans & Cooling",
    description: "Fan control and cooling systems",
    color: "cyan",
    defines: [
      // Fan Control
      "FAN*_PIN", "FAN*_SPEED*", "FAN*_MIN*", "FAN*_MAX*",
      "CONTROLLER_FAN*", "CONTROLLERFAN*",
      
      // Auto Fan
      "AUTO_FAN*", "EXTRUDER_AUTO_FAN*", "CHAMBER_AUTO_FAN*",
      "COOLER_AUTO_FAN*",
      
      // Cooling
      "COOLING*", "ADAPTIVE_FAN_SLOWING*", "THERMAL_PROTECTION*"
    ]
  },

  // Display and User Interface
  DISPLAY: {
    name: "Display & User Interface",
    description: "LCD, TFT, and user interface configuration",
    color: "yellow",
    defines: [
      // Display Types
      "LCD_*", "TFT_*", "ANYCUBIC_*", "BTT_*", "BIQU_*",
      "CR10_TFT*", "AZSMZ_*", "BEEZ_*", "BQ_*",
      "MKS_*", "MAKEBOARD_*", "MAKRPANEL*", "MALYAN_*",
      "DGUS_*", "DWIN_*", "FYSETC_*", "NEXTION_*",
      
      // Display Features
      "DISPLAY_*", "STATUS_SCREEN_*", "BOOTSCREEN*",
      "CUSTOM_STATUS_SCREEN*", "CUSTOM_MENU*",
      
      // Buttons and Controls
      "BUTTON*_*", "ENCODER_*", "ROTARY_ENCODER*",
      
      // Audio and Feedback
      "BEEP*", "SOUND*", "AUDIO*", "SPEAKER*",
      
      // Menu Configuration
      "MAIN_MENU_*", "MENU_*", "MEDIA_MENU_*",
      
      // LED Matrix and Lighting
      "MAX7219_*", "NEOPIXEL*", "RGB_*", "LED_*",
      "PCA9533*", "PCA9632*", "CASE_LIGHT*",
      
      // Display Features
      "SHOW_*", "DISPLAY_*", "STATUS_*", "BOOTSCREEN*",
      "SILVER_GATE*", "SINGLE_TOUCH*", "SLIM_LCD*",
      
      // TFT and Touch
      "TFT_*", "TOUCH_*", "TOUCH_UI_*", "TOUCH_SCREEN*",
      "TOUCH_CALIBRATION*", "TOUCH_OFFSET*", "TOUCH_ORIENTATION*"
    ]
  },

  // Advanced Features
  ADVANCED: {
    name: "Advanced Features",
    description: "Advanced functionality and experimental features",
    color: "indigo",
    defines: [
      // Advanced Movement
      "ADVANCED_*", "ADAPTIVE_*", "S_CURVE_ACCELERATION*",
      "JUNCTION_DEVIATION*", "JERK*",
      
      // Advanced Pause
      "ADVANCED_PAUSE*", "PARK_HEAD_ON_PAUSE*",
      
      // Advanced Homing
      "ADVANCED_HOMING*", "Z_SAFE_HOMING*",
      
      // Advanced G-codes
      "ADVANCED_OK*", "GCODE_*", "M115*",
      
      // Advanced Reporting
      "AUTO_REPORT*", "REPORT_*", "STATUS_*",
      
      // Marlin Features
      "MARLIN_*", "MARLIN_BRICKOUT*", "MARLIN_DEV_MODE*",
      "MARLIN_INVADERS*", "MARLIN_SMALL_BUILD*", "MARLIN_SNAKE*",
      "MARLIN_TEST_BUILD*",
      
      // Manual Control
      "MANUAL_*", "MANUAL_E_MOVES*", "MANUAL_FEEDRATE*",
      "MANUAL_MOVE_DISTANCE*", "MANUAL_PROBE*", "MANUAL_SOLENOID*",
      
      // Measurement and Calibration
      "MEASURE_*", "MEASUREMENT_*", "MEATPACK_*", "MECHANICAL_*",
      
      // Microstepping
      "MICROSTEP*", "MICROSTEP1*", "MICROSTEP2*", "MICROSTEP4*",
      "MICROSTEP8*", "MICROSTEP16*", "MICROSTEP32*",
      
      // Maximum Values
      "MAX_*", "MAXIMUM_*", "MAX_ACCEL_*", "MAX_ARC_*",
      "MAX_AUTORETRACT*", "MAX_BED_POWER*", "MAX_CHAMBER_POWER*",
      "MAX_CMD_SIZE*", "MAX_CONSECUTIVE_*", "MAX_FEEDRATE_*",
      "MAX_JERK_*", "MAX_MEASUREMENT_*", "MAX_SOFTWARE_*",
      "MAXIMUM_STEPPER_*",
      
      // Special Features
      "SINGLENOZZLE*", "SINGLE_*", "SLED_*", "SLOW_*",
      "SLOWDOWN*", "SMART_*", "SMOOTH_*", "SF_*",
      
      // Progress and Status
      "SET_*", "SHOW_*", "STATUS_*", "SERVICE_*",
      
      // Servo Control
      "SERVO_*", "SERVO_DELAY*", "SERVO_DETACH*"
    ]
  },

  // Safety and Protection
  SAFETY: {
    name: "Safety & Protection",
    description: "Safety features and thermal protection",
    color: "red",
    defines: [
      // Thermal Protection
      "THERMAL_PROTECTION*", "WATCH_TEMP*", "THERMAL_RUNAWAY*",
      "MAXTEMP*", "MINTEMP*", "OVERSHOOT*",
      
      // Emergency Features
      "EMERGENCY_PARSER*", "HOST_ACTION_COMMANDS*",
      "EMERGENCY_STOP*", "KILL_PIN*",
      
      // Safety Limits
      "SAFETY_*", "PROTECTION*", "LIMIT_*",
      
      // Power Control
      "POWER_*", "AUTO_POWER*", "BACKUP_POWER*"
    ]
  },

  // Communication and Connectivity
  COMMUNICATION: {
    name: "Communication & Connectivity",
    description: "Serial communication and network features",
    color: "teal",
    defines: [
      // Serial Communication
      "BAUDRATE*", "SERIAL_*", "USB_*", "BLUETOOTH*",
      
      // Network Features
      "WIFI*", "ETHERNET*", "NETWORK*",
      
      // File Transfer
      "BINARY_FILE_TRANSFER*", "CUSTOM_FIRMWARE_UPLOAD*",
      
      // Reporting
      "AUTO_REPORT*", "REPORT_*", "STATUS_*",
      
      // Serial Communication
      "SERIAL_*", "SERIAL_DMA*", "SERIAL_FLOAT_*", "SERIAL_OVERRUN*",
      "SERIAL_STATS*", "SERIAL_XON_XOFF*", "SERIAL_PORT_*"
    ]
  },

  // Calibration and Testing
  CALIBRATION: {
    name: "Calibration & Testing",
    description: "Calibration procedures and testing features",
    color: "pink",
    defines: [
      // Calibration Procedures
      "CALIBRATION_*", "AUTO_CALIBRATION*",
      
      // Testing Features
      "DEBUG_*", "TEST_*", "VERIFY_*",
      
      // Measurement
      "MEASURE_*", "PROBE_*", "SENSOR_*",
      
      // Service and Maintenance
      "SERVICE_*", "MAINTENANCE_*",
      
      // Input Shaping
      "SHAPING_*", "INPUT_SHAPING_*",
      
      // Skew Correction
      "SKEW_*", "SKEW_CORRECTION*"
    ]
  },

  // Power and Electronics
  POWER: {
    name: "Power & Electronics",
    description: "Power management and electronic components",
    color: "gray",
    defines: [
      // Power Control
      "POWER_*", "AUTO_POWER*", "BACKUP_POWER*",
      "PS_ON_PIN*", "POWER_SUPPLY*",
      
      // Voltage and Current
      "VOLTAGE_*", "CURRENT_*", "AMPERAGE_*",
      
      // Electronics
      "ELECTRONICS_*", "BOARD_*", "MCU_*"
    ]
  },

  // Experimental and Development
  EXPERIMENTAL: {
    name: "Experimental & Development",
    description: "Experimental features and development tools",
    color: "amber",
    defines: [
      // Development Features
      "DEBUG_*", "DEVELOPMENT*", "EXPERIMENTAL*",
      
      // Testing
      "TEST_*", "VERIFY_*", "VALIDATE*",
      
      // Experimental Movement
      "EXPERIMENTAL_*", "BETA_*", "ALPHA_*"
    ]
  }
}

// Helper function to categorize a define based on its name
export const categorizeDefine = (defineName) => {
  for (const [categoryKey, category] of Object.entries(MARLIN_DEFINE_CATEGORIES)) {
    for (const pattern of category.defines) {
      if (pattern.includes('*')) {
        // Handle wildcard patterns
        const regex = new RegExp(pattern.replace(/\*/g, '.*'))
        if (regex.test(defineName)) {
          return categoryKey
        }
      } else if (defineName === pattern) {
        return categoryKey
      }
    }
  }
  return 'UNCATEGORIZED'
}

// Get all defines for a specific category
export const getDefinesForCategory = (categoryKey) => {
  return MARLIN_DEFINE_CATEGORIES[categoryKey]?.defines || []
}

// Get category information
export const getCategoryInfo = (categoryKey) => {
  return MARLIN_DEFINE_CATEGORIES[categoryKey] || null
}

// Get all categories
export const getAllCategories = () => {
  return Object.keys(MARLIN_DEFINE_CATEGORIES)
}
