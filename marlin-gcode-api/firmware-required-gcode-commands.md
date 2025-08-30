# Firmware-Required G-code Commands

These G-code commands require specific firmware features to be enabled in Marlin firmware.

## Bed Leveling Commands

### G29: Bed Leveling
- **Description**: Various bed leveling methods
- **Firmware Requirements**: `AUTO_BED_LEVELING_*`, `BILINEAR_BED_LEVELING`, `MESH_BED_LEVELING`, `UBL`
- **Usage**: `G29 [type] [parameters]`
- **Types**:
  - `G29` - Auto bed leveling
  - `G29 P1` - 3-point leveling
  - `G29 P2` - Linear leveling
  - `G29 P3` - Manual leveling
  - `G29 P4` - Bilinear leveling
  - `G29 P5` - Unified bed leveling

### G30: Single Z-Probe
- **Description**: Single Z-probe measurement
- **Firmware Requirements**: `Z_PROBE_ALLEN_KEY`, `FIX_MOUNTED_PROBE`
- **Usage**: `G30 X<pos> Y<pos>`

### G31: Dock Sled
- **Description**: Dock the Z-probe sled
- **Firmware Requirements**: `Z_PROBE_SLED`
- **Usage**: `G31`

### G32: Undock Sled
- **Description**: Undock the Z-probe sled
- **Firmware Requirements**: `Z_PROBE_SLED`
- **Usage**: `G32`

### G33: Delta Auto Calibration
- **Description**: Delta printer auto-calibration
- **Firmware Requirements**: `DELTA_AUTO_CALIBRATION`
- **Usage**: `G33 [parameters]`

### G34: Z Steppers Auto-Alignment
- **Description**: Align Z stepper motors
- **Firmware Requirements**: `Z_STEPPER_AUTO_ALIGN`
- **Usage**: `G34`

### G35: Tramming Assistant
- **Description**: Bed tramming assistance
- **Firmware Requirements**: `ASSISTED_TRAMMING`
- **Usage**: `G35`

### G38.2-G38.5: Probe Target
- **Description**: Probe toward target
- **Firmware Requirements**: `G38_PROBE_TARGET`
- **Usage**: `G38.2 X<pos> Y<pos> Z<pos> F<speed>`

### G42: Move to Mesh Coordinate
- **Description**: Move to mesh coordinate
- **Firmware Requirements**: `G26_MESH_VALIDATION`
- **Usage**: `G42 I<index> J<index>`

### G76: Probe Temperature Calibration
- **Description**: Calibrate probe temperature
- **Firmware Requirements**: `PROBE_TEMP_COMPENSATION`
- **Usage**: `G76 [parameters]`

### G425: Backlash Calibration
- **Description**: Calibrate backlash compensation
- **Firmware Requirements**: `BACKLASH_COMPENSATION`
- **Usage**: `G425 [parameters]`

## Advanced Movement Commands

### G5: Bézier Cubic Spline Move
- **Description**: Move along Bézier curve
- **Firmware Requirements**: `G5_BEZIER`
- **Usage**: `G5 X<pos> Y<pos> I<control1> J<control1> P<control2> Q<control2> F<speed>`

### G6: Direct Stepper Move
- **Description**: Direct stepper control
- **Firmware Requirements**: `DIRECT_STEPPING`
- **Usage**: `G6 X<steps> Y<steps> Z<steps> E<steps>`

## Spindle and Laser Commands

### M3: Spindle CW / Laser On
- **Description**: Turn on spindle clockwise or laser
- **Firmware Requirements**: `SPINDLE_LASER_ENABLE`
- **Usage**: `M3 S<power>`

### M4: Spindle CCW / Laser On
- **Description**: Turn on spindle counter-clockwise or laser
- **Firmware Requirements**: `SPINDLE_LASER_ENABLE`
- **Usage**: `M4 S<power>`

### M5: Spindle / Laser Off
- **Description**: Turn off spindle or laser
- **Firmware Requirements**: `SPINDLE_LASER_ENABLE`
- **Usage**: `M5`

## Coolant and Control Commands

### M7-M9: Coolant Controls
- **Description**: Control coolant systems
- **Firmware Requirements**: `COOLANT_CONTROL`
- **Usage**: `M7`, `M8`, `M9`

### M10-M11: Vacuum / Blower Control
- **Description**: Control vacuum or blower
- **Firmware Requirements**: `VACUUM_BLOWER_CONTROL`
- **Usage**: `M10`, `M11`

## SD Card Commands

### M20-M34: SD Card Operations
- **Description**: SD card management
- **Firmware Requirements**: `SDSUPPORT`
- **Commands**:
  - `M20` - List SD card
  - `M21` - Init SD card
  - `M22` - Release SD card
  - `M23` - Select SD file
  - `M24` - Start/Resume SD print
  - `M25` - Pause SD print
  - `M26` - Set SD position
  - `M27` - Report SD status
  - `M28` - Start SD write
  - `M29` - Stop SD write
  - `M30` - Delete SD file
  - `M31` - Report print time
  - `M32` - Select and start
  - `M33` - Get long path
  - `M34` - SD card sorting

## Debug and Configuration Commands

### M42: Set Pin State
- **Description**: Set pin state
- **Firmware Requirements**: `PINS_DEBUGGING`
- **Usage**: `M42 P<pin> S<state>`

### M43: Debug Pins
- **Description**: Debug pin states
- **Firmware Requirements**: `PINS_DEBUGGING`
- **Usage**: `M43 [parameters]`

### M43 T: Toggle Pins
- **Description**: Toggle pin states
- **Firmware Requirements**: `PINS_DEBUGGING`
- **Usage**: `M43 T<pin>`

### M48: Probe Repeatability Test
- **Description**: Test probe repeatability
- **Firmware Requirements**: `Z_MIN_PROBE_REPEATABILITY_TEST`
- **Usage**: `M48 [parameters]`

## Print Progress Commands

### M73: Set Print Progress
- **Description**: Set print progress
- **Firmware Requirements**: `PRINT_PROGRESS`
- **Usage**: `M73 P<progress> R<remaining>`

### M75-M78: Print Job Timers
- **Description**: Print job timing
- **Firmware Requirements**: `PRINTCOUNTER`
- **Commands**:
  - `M75` - Start print job timer
  - `M76` - Pause print job timer
  - `M77` - Stop print job timer
  - `M78` - Print job stats

## Power Management Commands

### M80: Power On
- **Description**: Turn on power supply
- **Firmware Requirements**: `POWER_SUPPLY`
- **Usage**: `M80`

### M81: Power Off
- **Description**: Turn off power supply
- **Firmware Requirements**: `POWER_SUPPLY`
- **Usage**: `M81`

### M85: Inactivity Shutdown
- **Description**: Set inactivity shutdown
- **Firmware Requirements**: `INACTIVITY_TIMER`
- **Usage**: `M85 S<seconds>`

### M86: Hotend Idle Timeout
- **Description**: Set hotend idle timeout
- **Firmware Requirements**: `HOTEND_IDLE_TIMEOUT`
- **Usage**: `M86 S<seconds>`

### M87: Disable Hotend Idle Timeout
- **Description**: Disable hotend idle timeout
- **Firmware Requirements**: `HOTEND_IDLE_TIMEOUT`
- **Usage**: `M87`

## Extruder Configuration Commands

### M82: E Absolute
- **Description**: Set extruder to absolute mode
- **Firmware Requirements**: `EXTRUDER_ABSOLUTE_MODE`
- **Usage**: `M82`

### M83: E Relative
- **Description**: Set extruder to relative mode
- **Firmware Requirements**: `EXTRUDER_ABSOLUTE_MODE`
- **Usage**: `M83`

### M200: Volumetric Extrusion Diameter
- **Description**: Set filament diameter
- **Firmware Requirements**: `VOLUMETRIC_EXTRUSION`
- **Usage**: `M200 D<diameter>`

### M201: Print / Travel Move Limits
- **Description**: Set acceleration limits
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M201 [parameters]`

### M203: Set Max Feedrate
- **Description**: Set maximum feedrates
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M203 [parameters]`

### M204: Set Starting Acceleration
- **Description**: Set acceleration values
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M204 [parameters]`

### M205: Set Advanced Settings
- **Description**: Set advanced motion settings
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M205 [parameters]`

### M206: Set Home Offsets
- **Description**: Set home offsets
- **Firmware Requirements**: `SET_HOME_OFFSETS`
- **Usage**: `M206 [parameters]`

### M207-M209: Firmware Retraction
- **Description**: Firmware retraction settings
- **Firmware Requirements**: `FWRETRACT`
- **Commands**:
  - `M207` - Firmware retraction settings
  - `M208` - Firmware recover settings
  - `M209` - Set auto retract

### M210: Homing Feedrate
- **Description**: Set homing feedrate
- **Firmware Requirements**: `HOMING_FEEDRATE`
- **Usage**: `M210 [parameters]`

### M211: Software Endstops
- **Description**: Enable/disable software endstops
- **Firmware Requirements**: `SOFTWARE_ENDSTOPS`
- **Usage**: `M211 S<state>`

### M217: Filament Swap Parameters
- **Description**: Set filament swap parameters
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M217 [parameters]`

### M218: Set Hotend Offset
- **Description**: Set hotend offset
- **Firmware Requirements**: `HOTEND_OFFSET`
- **Usage**: `M218 T<tool> X<offset> Y<offset> Z<offset>`

### M220: Set Feedrate Percentage
- **Description**: Set feedrate percentage
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M220 S<percentage>`

### M221: Set Flow Percentage
- **Description**: Set flow percentage
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M221 S<percentage>`

## Advanced Control Commands

### M226: Wait for Pin State
- **Description**: Wait for pin to reach state
- **Firmware Requirements**: `PINS_DEBUGGING`
- **Usage**: `M226 P<pin> S<state>`

### M240: Trigger Camera
- **Description**: Trigger camera
- **Firmware Requirements**: `PHOTOGRAPH_PIN`
- **Usage**: `M240`

### M250-M256: LCD Control
- **Description**: LCD display control
- **Firmware Requirements**: `LCD_CONTROL`
- **Commands**:
  - `M250` - LCD contrast
  - `M255` - LCD sleep/backlight timeout
  - `M256` - LCD brightness

### M260-M261: I2C Communication
- **Description**: I2C communication
- **Firmware Requirements**: `I2C_COMMUNICATION`
- **Commands**:
  - `M260` - I2C send
  - `M261` - I2C request

### M280-M282: Servo Control
- **Description**: Servo motor control
- **Firmware Requirements**: `SERVO_ANGLES`
- **Commands**:
  - `M280` - Servo position
  - `M281` - Edit servo angles
  - `M282` - Detach servo

### M290: Babystep
- **Description**: Fine Z-axis adjustment
- **Firmware Requirements**: `BABYSTEPPING`
- **Usage**: `M290 Z<offset>`

### M300: Play Tone
- **Description**: Play tone on speaker
- **Firmware Requirements**: `SPEAKER`
- **Usage**: `M300 S<frequency> P<duration>`

## PID and Temperature Control Commands

### M301-M304: PID Control
- **Description**: PID temperature control
- **Firmware Requirements**: `PIDTEMP`, `PIDTEMPBED`
- **Commands**:
  - `M301` - Set hotend PID
  - `M302` - Cold extrude
  - `M303` - PID autotune
  - `M304` - Set bed PID

### M305: User Thermistor Parameters
- **Description**: Set custom thermistor parameters
- **Firmware Requirements**: `THERMISTOR_USER`
- **Usage**: `M305 [parameters]`

### M306: Model Predictive Temp. Control
- **Description**: Model predictive temperature control
- **Firmware Requirements**: `MPCTEMP`
- **Usage**: `M306 [parameters]`

## Motor and Hardware Control Commands

### M350: Set Micro-stepping
- **Description**: Set micro-stepping
- **Firmware Requirements**: `MICROSTEP_MODES`
- **Usage**: `M350 [parameters]`

### M351: Set Microstep Pins
- **Description**: Set microstep pins
- **Firmware Requirements**: `MICROSTEP_MODES`
- **Usage**: `M351 [parameters]`

### M355: Case Light Control
- **Description**: Control case lighting
- **Firmware Requirements**: `CASE_LIGHT_ENABLE`
- **Usage**: `M355 S<state> P<pin>`

### M360-M364: SCARA Configuration
- **Description**: SCARA robot configuration
- **Firmware Requirements**: `SCARA`
- **Commands**:
  - `M360` - SCARA Theta A
  - `M361` - SCARA Theta-B
  - `M362` - SCARA Psi-A
  - `M363` - SCARA Psi-B
  - `M364` - SCARA Psi-C

### M380-M381: Solenoid Control
- **Description**: Solenoid valve control
- **Firmware Requirements**: `SOLENOID_CONTROL`
- **Commands**:
  - `M380` - Activate solenoid
  - `M381` - Deactivate solenoids

## Probe and Leveling Commands

### M401: Deploy Probe
- **Description**: Deploy Z-probe
- **Firmware Requirements**: `Z_PROBE_ALLEN_KEY`, `FIX_MOUNTED_PROBE`
- **Usage**: `M401`

### M402: Stow Probe
- **Description**: Stow Z-probe
- **Firmware Requirements**: `Z_PROBE_ALLEN_KEY`, `FIX_MOUNTED_PROBE`
- **Usage**: `M402`

### M403: MMU2 Filament Type
- **Description**: Set MMU2 filament type
- **Firmware Requirements**: `PRUSA_MMU2`
- **Usage**: `M403 [parameters]`

### M404: Filament Width Sensor Nominal Diameter
- **Description**: Set filament width sensor diameter
- **Firmware Requirements**: `FILAMENT_WIDTH_SENSOR`
- **Usage**: `M404 D<diameter>`

### M405: Filament Width Sensor On
- **Description**: Enable filament width sensor
- **Firmware Requirements**: `FILAMENT_WIDTH_SENSOR`
- **Usage**: `M405`

### M406: Filament Width Sensor Off
- **Description**: Disable filament width sensor
- **Firmware Requirements**: `FILAMENT_WIDTH_SENSOR`
- **Usage**: `M406`

### M407: Read Filament Width
- **Description**: Read filament width
- **Firmware Requirements**: `FILAMENT_WIDTH_SENSOR`
- **Usage**: `M407`

## Advanced Features Commands

### M412: Filament Runout
- **Description**: Configure filament runout
- **Firmware Requirements**: `FILAMENT_RUNOUT_SENSOR`
- **Usage**: `M412 [parameters]`

### M413: Power-loss Recovery
- **Description**: Configure power-loss recovery
- **Firmware Requirements**: `POWER_LOSS_RECOVERY`
- **Usage**: `M413 S<state>`

### M420: Bed Leveling State
- **Description**: Enable/disable bed leveling
- **Firmware Requirements**: `AUTO_BED_LEVELING_*`
- **Usage**: `M420 S<state>`

### M421: Set Mesh Value
- **Description**: Set mesh bed leveling value
- **Firmware Requirements**: `MESH_BED_LEVELING`
- **Usage**: `M421 I<index> J<index> Z<value>`

### M422: Set Z Motor XY
- **Description**: Set Z motor XY position
- **Firmware Requirements**: `Z_STEPPER_AUTO_ALIGN`
- **Usage**: `M422 [parameters]`

### M423: X Twist Compensation
- **Description**: Set X twist compensation
- **Firmware Requirements**: `X_TWIST_COMPENSATION`
- **Usage**: `M423 [parameters]`

### M425: Backlash Compensation
- **Description**: Configure backlash compensation
- **Firmware Requirements**: `BACKLASH_COMPENSATION`
- **Usage**: `M425 [parameters]`

### M428: Home Offsets Here
- **Description**: Set home offsets at current position
- **Firmware Requirements**: `SET_HOME_OFFSETS`
- **Usage**: `M428`

### M430: Power Monitor
- **Description**: Power monitoring
- **Firmware Requirements**: `POWER_MONITOR`
- **Usage**: `M430 [parameters]`

### M486: Cancel Objects
- **Description**: Cancel specific objects
- **Firmware Requirements**: `CANCEL_OBJECTS`
- **Usage**: `M486 [parameters]`

### M493: Fixed-Time Motion
- **Description**: Fixed-time motion control
- **Firmware Requirements**: `FIXED_TIME_MOTION`
- **Usage**: `M493 [parameters]`

## EEPROM and Configuration Commands

### M504: Validate EEPROM Contents
- **Description**: Validate EEPROM contents
- **Firmware Requirements**: `EEPROM_SETTINGS`
- **Usage**: `M504`

### M510: Lock Machine
- **Description**: Lock machine
- **Firmware Requirements**: `MACHINE_LOCK`
- **Usage**: `M510`

### M511: Unlock Machine
- **Description**: Unlock machine
- **Firmware Requirements**: `MACHINE_LOCK`
- **Usage**: `M511`

### M512: Set Passcode
- **Description**: Set machine passcode
- **Firmware Requirements**: `MACHINE_LOCK`
- **Usage**: `M512 P<passcode>`

### M524: Abort SD Print
- **Description**: Abort SD card print
- **Firmware Requirements**: `SDSUPPORT`
- **Usage**: `M524`

### M540: Endstops Abort SD
- **Description**: Configure endstops to abort SD print
- **Firmware Requirements**: `SDSUPPORT`, `ABORT_ON_ENDSTOP_HIT_FEATURE_ENABLED`
- **Usage**: `M540 S<state>`

### M550: Machine Name
- **Description**: Set machine name
- **Firmware Requirements**: `MACHINE_NAME`
- **Usage**: `M550 P<name>`

## Advanced Hardware Commands

### M569: Set TMC Stepping Mode
- **Description**: Set TMC stepper mode
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Usage**: `M569 [parameters]`

### M575: Serial Baud Rate
- **Description**: Set serial baud rate
- **Firmware Requirements**: `BAUDRATE_GCODE`
- **Usage**: `M575 [parameters]`

### M592: Nonlinear Extrusion Control
- **Description**: Nonlinear extrusion control
- **Firmware Requirements**: `NONLINEAR_EXTRUSION`
- **Usage**: `M592 [parameters]`

### M593: ZV Input Shaping
- **Description**: ZV input shaping
- **Firmware Requirements**: `INPUT_SHAPING`
- **Usage**: `M593 [parameters]`

### M600: Filament Change
- **Description**: Filament change procedure
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M600 [parameters]`

### M603: Configure Filament Change
- **Description**: Configure filament change
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M603 [parameters]`

### M605: Multi Nozzle Mode
- **Description**: Multi nozzle mode
- **Firmware Requirements**: `DUAL_X_CARRIAGE`
- **Usage**: `M605 [parameters]`

### M665: Delta/SCARA Configuration
- **Description**: Delta or SCARA configuration
- **Firmware Requirements**: `DELTA`, `SCARA`
- **Usage**: `M665 [parameters]`

### M666: Delta/Endstop Adjustments
- **Description**: Delta or endstop adjustments
- **Firmware Requirements**: `DELTA`, `DUAL_ENDSTOPS`
- **Usage**: `M666 [parameters]`

### M672: Duet Smart Effector
- **Description**: Duet Smart Effector sensitivity
- **Firmware Requirements**: `DUET_SMART_EFFECTOR`
- **Usage**: `M672 [parameters]`

### M701: Load Filament
- **Description**: Load filament
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M701 [parameters]`

### M702: Unload Filament
- **Description**: Unload filament
- **Firmware Requirements**: `ADVANCED_PAUSE_FEATURE`
- **Usage**: `M702 [parameters]`

### M710: Controller Fan Settings
- **Description**: Controller fan settings
- **Firmware Requirements**: `CONTROLLER_FAN_EDITABLE`
- **Usage**: `M710 [parameters]`

## Macro and Advanced Control Commands

### M808: Repeat Marker
- **Description**: Repeat marker
- **Firmware Requirements**: `GCODE_MACROS`
- **Usage**: `M808 [parameters]`

### M810-M819: G-code Macros
- **Description**: G-code macro execution
- **Firmware Requirements**: `GCODE_MACROS`
- **Usage**: `M810` through `M819`

### M820: Report G-code Macros
- **Description**: Report G-code macros
- **Firmware Requirements**: `GCODE_MACROS`
- **Usage**: `M820`

### M851: XYZ Probe Offset
- **Description**: Set XYZ probe offset
- **Firmware Requirements**: `Z_PROBE_ALLEN_KEY`, `FIX_MOUNTED_PROBE`
- **Usage**: `M851 [parameters]`

### M852: Bed Skew Compensation
- **Description**: Bed skew compensation
- **Firmware Requirements**: `SKEW_CORRECTION`
- **Usage**: `M852 [parameters]`

### M860-M869: I2C Position Encoders
- **Description**: I2C position encoders
- **Firmware Requirements**: `I2C_POSITION_ENCODERS`
- **Usage**: `M860` through `M869`

### M871: Probe Temperature Config
- **Description**: Probe temperature configuration
- **Firmware Requirements**: `PROBE_TEMP_COMPENSATION`
- **Usage**: `M871 [parameters]`

### M876: Handle Prompt Response
- **Description**: Handle prompt response
- **Firmware Requirements**: `HOST_PROMPT_SUPPORT`
- **Usage**: `M876 [parameters]`

## Advanced Motion Commands

### M900: Linear Advance Factor
- **Description**: Set linear advance factor
- **Firmware Requirements**: `LIN_ADVANCE`
- **Usage**: `M900 K<factor>`

### M906: Stepper Motor Current
- **Description**: Set stepper motor current
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Usage**: `M906 [parameters]`

### M907: Trimpot Stepper Motor Current
- **Description**: Set trimpot stepper motor current
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Usage**: `M907 [parameters]`

### M908: Set Trimpot Pins
- **Description**: Set trimpot pins
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Usage**: `M908 [parameters]`

### M909: Report DAC Stepper Current
- **Description**: Report DAC stepper current
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Usage**: `M909`

### M910: Commit DAC to EEPROM
- **Description**: Commit DAC to EEPROM
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Usage**: `M910`

### M911-M915: TMC Configuration
- **Description**: TMC stepper driver configuration
- **Firmware Requirements**: `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Commands**:
  - `M911` - TMC OT pre-warn condition
  - `M912` - Clear TMC OT pre-warn
  - `M913` - Set hybrid threshold speed
  - `M914` - TMC bump sensitivity
  - `M915` - TMC Z axis calibration

### M916-M920: L6474 and TMC Advanced
- **Description**: L6474 and TMC advanced features
- **Firmware Requirements**: `HAVE_L6470`, `HAVE_TMC2130`, `HAVE_TMC2208`, `HAVE_TMC2660`
- **Commands**:
  - `M916` - L6474 thermal warning test
  - `M917` - L6474 overcurrent warning test
  - `M918` - L6474 speed warning test
  - `M919` - TMC chopper timing
  - `M920` - TMC homing current

## Special Hardware Commands

### M928: Start SD Logging
- **Description**: Start SD card logging
- **Firmware Requirements**: `SDSUPPORT`
- **Usage**: `M928 [filename]`

### M951: Magnetic Parking Extruder
- **Description**: Magnetic parking extruder
- **Firmware Requirements**: `MAGNETIC_PARKING_EXTRUDER`
- **Usage**: `M951 [parameters]`

### M993-M994: Flash Settings Backup
- **Description**: Flash settings backup and restore
- **Firmware Requirements**: `FLASH_EEPROM_EMULATION`
- **Commands**:
  - `M993` - Back up flash settings to SD
  - `M994` - Restore flash from SD

### M995: Touch Screen Calibration
- **Description**: Touch screen calibration
- **Firmware Requirements**: `TOUCH_SCREEN_CALIBRATION`
- **Usage**: `M995`

### M997: Firmware Update
- **Description**: Firmware update
- **Firmware Requirements**: `FIRMWARE_UPDATE`
- **Usage**: `M997`

### M7219: MAX7219 Control
- **Description**: MAX7219 LED matrix control
- **Firmware Requirements**: `MAX7219_DEBUG`
- **Usage**: `M7219 [parameters]`

## MMU2 Commands

### T?-Tx: MMU2 Special Commands
- **Description**: MMU2 filament handling special commands
- **Firmware Requirements**: `PRUSA_MMU2`
- **Usage**: Various MMU2-specific commands

## Notes

- These commands require specific firmware features to be enabled
- Check your firmware configuration before using these commands
- Some commands may require additional hardware (probes, sensors, etc.)
- Advanced features like bed leveling, TMC drivers, and MMU2 require proper configuration
- Always refer to your specific firmware documentation for exact syntax and requirements
