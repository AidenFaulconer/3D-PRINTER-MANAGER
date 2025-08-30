# Marlin Firmware G-code API Documentation

This folder contains comprehensive documentation of all G-code commands supported by Marlin firmware, organized by category.

## File Structure

- **default-gcode-commands.md** - Standard G-code commands that are available by default
- **firmware-required-gcode-commands.md** - G-code commands that require specific firmware features to be enabled

## Source

Documentation scraped from [Marlin Firmware G-code Reference](https://marlinfw.org/docs/gcode/)

## Categories

### Default G-code Commands
These commands are available in all Marlin firmware builds:
- **G0-G1**: Linear Move
- **G2-G3**: Arc or Circle Move
- **G4**: Dwell
- **G20**: Inch Units
- **G21**: Millimeter Units
- **G28**: Auto Home
- **G90**: Absolute Positioning
- **G91**: Relative Positioning
- **G92**: Set Position
- **M0-M1**: Unconditional stop
- **M17**: Enable Steppers
- **M18, M84**: Disable steppers
- **M104**: Set Hotend Temperature
- **M105**: Report Temperatures
- **M109**: Wait for Hotend Temperature
- **M140**: Set Bed Temperature
- **M190**: Wait for Bed Temperature
- **M500**: Save Settings
- **M501**: Restore Settings
- **M502**: Factory Reset
- **M503**: Report Settings

### Firmware-Required G-code Commands
These commands require specific firmware features to be enabled:
- **G29**: Bed Leveling (various types)
- **G30**: Single Z-Probe
- **G31**: Dock Sled
- **G32**: Undock Sled
- **G33**: Delta Auto Calibration
- **G34**: Z Steppers Auto-Alignment
- **G35**: Tramming Assistant
- **G38.2-G38.5**: Probe target
- **G42**: Move to mesh coordinate
- **G76**: Probe temperature calibration
- **G425**: Backlash Calibration
- **M3-M5**: Spindle/Laser Control
- **M7-M9**: Coolant Controls
- **M20-M34**: SD Card Operations
- **M42**: Set Pin State
- **M43**: Debug Pins
- **M48**: Probe Repeatability Test
- **M73**: Set Print Progress
- **M75-M78**: Print Job Timers
- **M80-M81**: Power Control
- **M82-M83**: Extruder Modes
- **M85**: Inactivity Shutdown
- **M86-M87**: Hotend Idle Timeout
- **M92**: Set Axis Steps-per-unit
- **M100**: Free Memory
- **M102**: Configure Bed Distance Sensor
- **M106-M107**: Fan Control
- **M108**: Break and Continue
- **M110-M119**: System Commands
- **M120-M121**: Endstop Control
- **M122**: TMC Debugging
- **M123**: Fan Tachometers
- **M125**: Park Head
- **M126-M129**: Baricuda Control
- **M141**: Set Chamber Temperature
- **M143**: Set Laser Cooler Temperature
- **M145**: Set Material Preset
- **M149**: Temperature Units
- **M150**: Set RGB(W) Color
- **M154-M155**: Auto-Report Settings
- **M163-M166**: Mixing Extruder
- **M192-M193**: Temperature Wait Commands
- **M200**: Volumetric Extrusion
- **M201**: Print/Travel Move Limits
- **M203**: Set Max Feedrate
- **M204**: Set Starting Acceleration
- **M205**: Set Advanced Settings
- **M206**: Set Home Offsets
- **M207-M209**: Firmware Retraction
- **M210-M211**: Homing and Endstops
- **M217**: Filament swap parameters
- **M218**: Set Hotend Offset
- **M220-M221**: Feedrate and Flow
- **M226**: Wait for Pin State
- **M240**: Trigger Camera
- **M250-M256**: LCD Control
- **M260-M261**: I2C Communication
- **M280-M282**: Servo Control
- **M290**: Babystep
- **M300**: Play Tone
- **M301-M304**: PID Control
- **M305**: User Thermistor Parameters
- **M306**: Model Predictive Temp. Control
- **M350-M351**: Micro-stepping
- **M355**: Case Light Control
- **M360-M364**: SCARA Configuration
- **M380-M381**: Solenoid Control
- **M400**: Finish Moves
- **M401-M402**: Probe Control
- **M403**: MMU2 Filament Type
- **M404-M407**: Filament Width Sensor
- **M410**: Quickstop
- **M412**: Filament Runout
- **M413**: Power-loss Recovery
- **M420**: Bed Leveling State
- **M421**: Set Mesh Value
- **M422**: Set Z Motor XY
- **M423**: X Twist Compensation
- **M425**: Backlash compensation
- **M428**: Home Offsets Here
- **M430**: Power Monitor
- **M486**: Cancel Objects
- **M493**: Fixed-Time Motion
- **M504**: Validate EEPROM contents
- **M510-M512**: Machine Locking
- **M524**: Abort SD print
- **M540**: Endstops Abort SD
- **M550**: Machine Name
- **M569**: Set TMC stepping mode
- **M575**: Serial baud rate
- **M592**: Nonlinear Extrusion Control
- **M593**: ZV Input Shaping
- **M600**: Filament Change
- **M603**: Configure Filament Change
- **M605**: Multi Nozzle Mode
- **M665**: Delta/SCARA Configuration
- **M666**: Delta/Endstop Adjustments
- **M672**: Duet Smart Effector
- **M701-M702**: Load/Unload Filament
- **M710**: Controller Fan settings
- **M808**: Repeat Marker
- **M810-M819**: G-code macros
- **M820**: Report G-code macros
- **M851**: XYZ Probe Offset
- **M852**: Bed Skew Compensation
- **M860-M869**: I2C Position Encoders
- **M871**: Probe temperature config
- **M876**: Handle Prompt Response
- **M900**: Linear Advance Factor
- **M906**: Stepper Motor Current
- **M907**: Trimpot Stepper Motor Current
- **M908**: Set Trimpot Pins
- **M909**: Report DAC Stepper Current
- **M910**: Commit DAC to EEPROM
- **M911-M915**: TMC Configuration
- **M916-M920**: L6474 and TMC Advanced
- **M928**: Start SD Logging
- **M951**: Magnetic Parking Extruder
- **M993-M994**: Flash Settings Backup
- **M995**: Touch Screen Calibration
- **M997**: Firmware update
- **M999**: STOP Restart
- **M7219**: MAX7219 Control
- **T0-T7**: Tool Selection
- **T?-Tx**: MMU2 Special Commands

## Usage Notes

- Always check your firmware configuration before using advanced G-code commands
- Some commands may require specific hardware (probes, sensors, etc.)
- EEPROM commands (M500-M504) are essential for saving configuration changes
- Temperature and movement commands are fundamental to 3D printing operations
