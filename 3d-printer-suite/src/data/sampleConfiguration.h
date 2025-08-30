/**
 * Marlin 3D Printer Firmware
 * Configuration.h
 */

#ifndef CONFIGURATION_H
#define CONFIGURATION_H

// Machine Configuration
#define MACHINE_NAME "Ender 3 Pro"
#define MACHINE_UUID "12345678-1234-1234-1234-123456789abc"

// Board Configuration
#define MOTHERBOARD BOARD_MELZI
#define SERIAL_PORT 0
#define BAUDRATE 115200

// Bed Configuration
#define TEMP_SENSOR_BED 1
#define BED_MAXTEMP 100
#define BED_MINTEMP 0

// Hotend Configuration
#define TEMP_SENSOR_0 1
#define HEATER_0_MAXTEMP 250
#define HEATER_0_MINTEMP 0

// Movement Configuration
#define DEFAULT_AXIS_STEPS_PER_UNIT { 80, 80, 400, 93 }
#define DEFAULT_MAX_FEEDRATE { 500, 500, 15, 50 }
#define DEFAULT_MAX_ACCELERATION { 500, 500, 100, 5000 }

// Endstop Configuration
#define USE_XMIN_PLUG
#define USE_YMIN_PLUG
#define USE_ZMIN_PLUG

#define X_MIN_ENDSTOP_INVERTING true
#define Y_MIN_ENDSTOP_INVERTING true
#define Z_MIN_ENDSTOP_INVERTING true

// Filament Configuration
#define FILAMENT_RUNOUT_SENSOR
#define FILAMENT_RUNOUT_SCRIPT "M600"

// LCD Configuration
#define REPRAP_DISCOUNT_SMART_CONTROLLER
#define LCD_BED_LEVELING

// Advanced Features
//#define AUTO_BED_LEVELING_3POINT
//#define AUTO_BED_LEVELING_LINEAR
#define AUTO_BED_LEVELING_BILINEAR

//#define MESH_BED_LEVELING
//#define RESTORE_LEVELING_AFTER_G28

// Experimental Features
//#define EXPERIMENTAL_I2CBUS
//#define I2C_SLAVE_ADDRESS 0

// Debug Features
//#define DEBUG_LEVELING_FEATURE
//#define DEBUG_MESH_BED_LEVELING

#endif
