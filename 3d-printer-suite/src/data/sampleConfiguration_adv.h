/**
 * Marlin 3D Printer Firmware
 * Configuration_adv.h
 */

#ifndef CONFIGURATION_ADV_H
#define CONFIGURATION_ADV_H

// Advanced Movement Features
#define ADVANCED_PAUSE_FEATURE
#define ADVANCED_PAUSE_CONTINUOUS_PURGE
#define ADVANCED_PAUSE_PURGE_FEEDRATE 3
#define ADVANCED_PAUSE_PURGE_LENGTH 20

// Advanced Temperature Features
#define THERMAL_PROTECTION_PERIOD 40
#define THERMAL_PROTECTION_HYSTERESIS 4
#define THERMAL_PROTECTION_BED_PERIOD 20
#define THERMAL_PROTECTION_BED_HYSTERESIS 2

// Advanced Filament Features
#define FILAMENT_CHANGE_ENABLE
#define FILAMENT_CHANGE_X_POS 211
#define FILAMENT_CHANGE_Y_POS 0
#define FILAMENT_CHANGE_Z_ADD 2

// Advanced LCD Features
#define BABYSTEPPING
#define BABYSTEP_XY
#define BABYSTEP_INVERT_Z false

// Advanced Endstop Features
#define ENDSTOP_INTERRUPTS_FEATURE
#define ENDSTOP_NOISE_FILTER
#define ENDSTOP_NOISE_THRESHOLD 2

// Advanced Motor Features
#define STEALTHCHOP
#define HYBRID_THRESHOLD
#define TMC_DEBUG
#define TMC_BAUD_RATE 115200

// Advanced Bed Leveling Features
#define G26_MESH_VALIDATION
#define G26_MESH_EDITING
#define G26_MESH_EDITING_EXTRA

// Advanced G-code Features
#define GCODE_MACROS
#define GCODE_MOTION_MODES
#define GCODE_PARK_AND_SCRIBE

// Advanced Safety Features
#define MAX7219_DEBUG
#define MAX7219_NUMBER_UNITS 1
#define MAX7219_INVERT_TEST false

// Advanced Network Features
//#define WIFI_CUSTOM_COMMAND
//#define ESP3D_WIFISUPPORT

// Advanced Sensor Features
#define FILAMENT_WIDTH_SENSOR
#define FILAMENT_WIDTH_SENSOR_USE_MM3
#define FILAMENT_WIDTH_SENSOR_MEASUREMENT_OFFSET 0.2

// Advanced Power Features
#define POWER_SUPPLY 0
#define POWER_SUPPLY_TIMEOUT 0
#define POWER_SUPPLY_MANUAL_POWER_OFF

#endif
