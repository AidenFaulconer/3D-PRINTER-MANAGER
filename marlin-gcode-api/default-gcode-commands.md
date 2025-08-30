# Default G-code Commands

These G-code commands are available in all Marlin firmware builds by default.

## Movement Commands

### G0-G1: Linear Move
- **Description**: Move in a straight line
- **Usage**: `G0 X<pos> Y<pos> Z<pos> E<pos> F<speed>`
- **Example**: `G1 X100 Y100 F3000`

### G2-G3: Arc or Circle Move
- **Description**: Move in an arc or circle
- **Usage**: `G2/G3 X<pos> Y<pos> I<offset> J<offset> F<speed>`
- **Example**: `G2 X10 Y10 I5 J0 F1000`

### G4: Dwell
- **Description**: Pause for a specified time
- **Usage**: `G4 P<milliseconds>` or `G4 S<seconds>`
- **Example**: `G4 P1000`

### G5: Bézier Cubic Spline Move
- **Description**: Move along a Bézier curve
- **Usage**: `G5 X<pos> Y<pos> I<control1> J<control1> P<control2> Q<control2> F<speed>`

### G6: Direct Stepper Move
- **Description**: Direct stepper motor control
- **Usage**: `G6 X<steps> Y<steps> Z<steps> E<steps>`

### G10: Retract
- **Description**: Retract filament
- **Usage**: `G10 S<retract>`

### G11: Recover
- **Description**: Recover filament
- **Usage**: `G11 S<recover>`

### G12: Clean the Nozzle
- **Description**: Clean nozzle with specified pattern
- **Usage**: `G12 P<pattern> S<strokes> R<radius>`

### G17-G19: CNC Workspace Planes
- **Description**: Set workspace plane
- **Usage**: `G17` (XY), `G18` (XZ), `G19` (YZ)

## Unit and Positioning Commands

### G20: Inch Units
- **Description**: Set units to inches
- **Usage**: `G20`

### G21: Millimeter Units
- **Description**: Set units to millimeters
- **Usage**: `G21`

### G26: Mesh Validation Pattern
- **Description**: Print mesh validation pattern
- **Usage**: `G26 P<pattern> S<spacing> R<repeat>`

### G27: Park Toolhead
- **Description**: Park the toolhead
- **Usage**: `G27`

### G28: Auto Home
- **Description**: Home all axes
- **Usage**: `G28 [X] [Y] [Z]`
- **Example**: `G28 X Y`

### G53: Move in Machine Coordinates
- **Description**: Move in absolute machine coordinates
- **Usage**: `G53 G0 X<pos> Y<pos> Z<pos>`

### G54-G59.3: Workspace Coordinate System
- **Description**: Select coordinate system
- **Usage**: `G54` through `G59.3`

### G60: Stored Positions
- **Description**: Save current position
- **Usage**: `G60 S<slot>`

### G61: Return to Saved Position
- **Description**: Return to saved position
- **Usage**: `G61 X<slot> Y<slot> Z<slot>`

### G80: Cancel Current Motion Mode
- **Description**: Cancel motion mode
- **Usage**: `G80`

### G90: Absolute Positioning
- **Description**: Set absolute positioning mode
- **Usage**: `G90`

### G91: Relative Positioning
- **Description**: Set relative positioning mode
- **Usage**: `G91`

### G92: Set Position
- **Description**: Set current position
- **Usage**: `G92 X<pos> Y<pos> Z<pos> E<pos>`

## System Commands

### M0-M1: Unconditional Stop
- **Description**: Stop and wait for user input
- **Usage**: `M0` or `M1 [message]`

### M17: Enable Steppers
- **Description**: Enable all stepper motors
- **Usage**: `M17`

### M18, M84: Disable Steppers
- **Description**: Disable stepper motors
- **Usage**: `M18` or `M84 [X] [Y] [Z] [E] [S<time>]`

### M104: Set Hotend Temperature
- **Description**: Set hotend temperature
- **Usage**: `M104 S<temp> [T<tool>]`

### M105: Report Temperatures
- **Description**: Report current temperatures
- **Usage**: `M105`

### M109: Wait for Hotend Temperature
- **Description**: Wait for hotend to reach temperature
- **Usage**: `M109 S<temp> [T<tool>]`

### M140: Set Bed Temperature
- **Description**: Set bed temperature
- **Usage**: `M140 S<temp>`

### M190: Wait for Bed Temperature
- **Description**: Wait for bed to reach temperature
- **Usage**: `M190 S<temp>`

### M500: Save Settings
- **Description**: Save settings to EEPROM
- **Usage**: `M500`

### M501: Restore Settings
- **Description**: Restore settings from EEPROM
- **Usage**: `M501`

### M502: Factory Reset
- **Description**: Reset to factory defaults
- **Usage**: `M502`

### M503: Report Settings
- **Description**: Report current settings
- **Usage**: `M503`

### M112: Full Shutdown
- **Description**: Emergency stop
- **Usage**: `M112`

### M114: Get Current Position
- **Description**: Report current position
- **Usage**: `M114`

### M115: Firmware Info
- **Description**: Report firmware information
- **Usage**: `M115`

### M117: Set LCD Message
- **Description**: Set LCD message
- **Usage**: `M117 <message>`

### M119: Endstop States
- **Description**: Report endstop states
- **Usage**: `M119`

### M400: Finish Moves
- **Description**: Wait for moves to complete
- **Usage**: `M400`

### M410: Quickstop
- **Description**: Emergency stop
- **Usage**: `M410`

### M999: STOP Restart
- **Description**: Stop and restart
- **Usage**: `M999`

## Tool Commands

### T0-T7: Select or Report Tool
- **Description**: Select tool/extruder
- **Usage**: `T<tool_number>`

## Notes

- These commands are available in all Marlin firmware builds
- Some commands may have additional parameters depending on firmware version
- Always check your specific firmware documentation for exact syntax
- Movement commands (G0-G3) are fundamental to 3D printing operations
- Temperature commands (M104, M109, M140, M190) are essential for print preparation
- EEPROM commands (M500-M503) are crucial for saving configuration changes
