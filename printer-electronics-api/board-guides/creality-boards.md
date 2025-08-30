# Creality Board Guide

This guide covers Creality 3D printer control boards, including the popular 4.2.2 and 4.2.7 variants used in Ender 3, CR-10, and other Creality printers.

## Creality 4.2.2 Board

### Overview
The Creality 4.2.2 board is a standard control board featuring the STM32F103RCT6 microcontroller and TMC2208 stepper drivers in standalone mode.

### Specifications
- **MCU**: STM32F103RCT6
- **Architecture**: ARM Cortex-M3
- **Clock Speed**: 72MHz
- **Flash Memory**: 256KB
- **RAM**: 48KB
- **Operating Voltage**: 12V/24V
- **Stepper Drivers**: 4x TMC2208 (Standalone mode)
- **Thermistor Inputs**: 2x (Hotend + Bed)
- **Endstop Inputs**: 3x (X, Y, Z)
- **Fan Outputs**: 2x (Part Cooling + Controller)
- **Servo Output**: 1x (BLTouch/Probe)
- **SD Card**: Built-in microSD slot

### Pin Layout

#### Stepper Motors
| Function | Pin | Driver | Notes |
|----------|-----|--------|-------|
| X Stepper | PB9/PB8 | TMC2208 | X-axis movement |
| Y Stepper | PB7/PB6 | TMC2208 | Y-axis movement |
| Z Stepper | PB5/PB4 | TMC2208 | Z-axis movement |
| E0 Stepper | PB3/PB10 | TMC2208 | Extruder |

#### Endstops
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| X Endstop | PA1 | Normally Open | X-axis limit |
| Y Endstop | PA0 | Normally Open | Y-axis limit |
| Z Endstop | PC14 | Normally Open | Z-axis limit |

#### Thermistors
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| Hotend | PA7 | 100K NTC | Hotend temperature |
| Bed | PA6 | 100K NTC | Bed temperature |

#### Fans and Heaters
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| Hotend Heater | PA8 | PWM | 12V/24V output |
| Bed Heater | PA9 | PWM | 12V/24V output |
| Part Cooling Fan | PA10 | PWM | 12V output |
| Controller Fan | PA11 | PWM | 12V output |

#### Additional I/O
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| BLTouch/Probe | PA15 | Digital | Servo control |
| LED Strip | PA12 | PWM | RGB LED control |
| SD Card | SPI | Built-in | microSD interface |
| USB | PA11/PA12 | USB | USB communication |

### Firmware Configuration

#### Marlin Configuration
```cpp
// Board selection
#define MOTHERBOARD BOARD_CREALITY_V4

// Pin definitions
#define X_STEP_PIN                          PB9
#define X_DIR_PIN                           PB8
#define X_ENABLE_PIN                        PB7
#define X_CS_PIN                            PB6

#define Y_STEP_PIN                          PB5
#define Y_DIR_PIN                           PB4
#define Y_ENABLE_PIN                        PB3
#define Y_CS_PIN                            PB10

#define Z_STEP_PIN                          PB3
#define Z_DIR_PIN                           PB10
#define Z_ENABLE_PIN                        PB5
#define Z_CS_PIN                            PB4

#define E0_STEP_PIN                         PB3
#define E0_DIR_PIN                          PB10
#define E0_ENABLE_PIN                       PB5
#define E0_CS_PIN                           PB4

// Endstops
#define X_STOP_PIN                          PA1
#define Y_STOP_PIN                          PA0
#define Z_STOP_PIN                          PC14

// Thermistors
#define TEMP_0_PIN                          PA7
#define TEMP_BED_PIN                        PA6

// Heaters and Fans
#define HEATER_0_PIN                        PA8
#define HEATER_BED_PIN                      PA9
#define FAN_PIN                             PA10
#define FAN1_PIN                            PA11

// BLTouch
#define SERVO0_PIN                          PA15
#define Z_MIN_PROBE_PIN                     PA15

// LED
#define RGB_LED_PIN                         PA12

// TMC2208 Configuration
#define TMC_USE_SW_SPI
#define TMC_SW_MOSI                         PA7
#define TMC_SW_MISO                         PA6
#define TMC_SW_SCK                          PA5
```

#### Klipper Configuration
```ini
[mcu]
serial: /dev/serial/by-id/usb-1a86_USB_Serial_1234567890

[stepper_x]
step_pin: PB9
dir_pin: PB8
enable_pin: !PB7
step_distance: 0.0125
endstop_pin: ^PA1

[stepper_y]
step_pin: PB5
dir_pin: PB4
enable_pin: !PB3
step_distance: 0.0125
endstop_pin: ^PA0

[stepper_z]
step_pin: PB3
dir_pin: PB10
enable_pin: !PB5
step_distance: 0.0125
endstop_pin: ^PC14

[extruder]
step_pin: PB3
dir_pin: PB10
enable_pin: !PB5
step_distance: 0.003765
nozzle_diameter: 0.4
filament_diameter: 1.75

[heater_bed]
heater_pin: PA9
sensor_type: Generic 3950
sensor_pin: PA6
control: pid
pid_Kp: 54.027
pid_Ki: 0.770
pid_Kd: 948.182

[heater_extruder]
heater_pin: PA8
sensor_type: Generic 3950
sensor_pin: PA7
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114

[fan]
pin: PA10

[controller_fan]
pin: PA11

[bltouch]
sensor_pin: ^PA15
control_pin: PA15
x_offset: -44
y_offset: -8
z_offset: 2.5
```

## Creality 4.2.7 Board

### Overview
The Creality 4.2.7 board is an updated version featuring the STM32F103RCT6 microcontroller and TMC2225 stepper drivers in standalone mode, offering improved performance and reliability.

### Key Differences from 4.2.2
- **Stepper Drivers**: TMC2225 instead of TMC2208
- **Improved Heat Dissipation**: Better thermal management
- **Enhanced Stability**: More reliable operation
- **Better Noise Performance**: Quieter stepper operation

### Specifications
- **MCU**: STM32F103RCT6
- **Architecture**: ARM Cortex-M3
- **Clock Speed**: 72MHz
- **Flash Memory**: 256KB
- **RAM**: 48KB
- **Operating Voltage**: 12V/24V
- **Stepper Drivers**: 4x TMC2225 (Standalone mode)
- **Thermistor Inputs**: 2x (Hotend + Bed)
- **Endstop Inputs**: 3x (X, Y, Z)
- **Fan Outputs**: 2x (Part Cooling + Controller)
- **Servo Output**: 1x (BLTouch/Probe)
- **SD Card**: Built-in microSD slot

### Pin Layout
*Same as 4.2.2 board - pin compatibility maintained*

### Firmware Configuration
*Same as 4.2.2 board - firmware compatibility maintained*

## CR-10 Smart Pro Board

### Overview
The CR-10 Smart Pro board is an advanced control board designed for larger format printers, featuring enhanced capabilities and additional I/O options.

### Specifications
- **MCU**: STM32F103RCT6
- **Architecture**: ARM Cortex-M3
- **Clock Speed**: 72MHz
- **Flash Memory**: 256KB
- **RAM**: 48KB
- **Operating Voltage**: 12V/24V
- **Stepper Drivers**: 5x TMC2208 (Standalone mode)
- **Thermistor Inputs**: 3x (Hotend + Bed + Chamber)
- **Endstop Inputs**: 4x (X, Y, Z + Filament)
- **Fan Outputs**: 3x (Part Cooling + Controller + Chamber)
- **Servo Output**: 1x (BLTouch/Probe)
- **SD Card**: Built-in microSD slot

### Additional Features
- **Chamber Temperature Control**: Built-in chamber heater support
- **Filament Runout Sensor**: Dedicated filament sensor input
- **Additional Fan Control**: Chamber cooling fan support
- **Enhanced I/O**: More expansion options for upgrades

## Ender 3 V2 Board

### Overview
The Ender 3 V2 uses the same 4.2.2 or 4.2.7 board as other Creality printers, but with specific firmware configurations optimized for the Ender 3 V2 printer.

### Key Features
- **Silent Operation**: TMC2208/TMC2225 drivers provide quiet operation
- **BLTouch Ready**: Native BLTouch support without modifications
- **RGB LED Support**: Built-in RGB LED strip control
- **SD Card Interface**: microSD slot for standalone printing

## Board Comparison

### Feature Comparison
| Feature | 4.2.2 | 4.2.7 | CR-10 Smart Pro | Ender 3 V2 |
|---------|--------|--------|------------------|-------------|
| MCU | STM32F103 | STM32F103 | STM32F103 | STM32F103 |
| Stepper Drivers | TMC2208 | TMC2225 | TMC2208 | TMC2208/2225 |
| Driver Count | 4 | 4 | 5 | 4 |
| Thermistor Inputs | 2 | 2 | 3 | 2 |
| Endstop Inputs | 3 | 3 | 4 | 3 |
| Fan Outputs | 2 | 2 | 3 | 2 |
| Price | $ | $ | $$ | $ |
| Noise Level | Medium | Low | Medium | Medium |

### Performance Comparison
| Metric | 4.2.2 | 4.2.7 | CR-10 Smart Pro |
|--------|--------|--------|------------------|
| Stepper Noise | 7/10 | 9/10 | 7/10 |
| Heat Dissipation | 6/10 | 8/10 | 7/10 |
| Reliability | 7/10 | 8/10 | 8/10 |
| Upgrade Potential | 6/10 | 7/10 | 8/10 |
| Cost Effectiveness | 8/10 | 7/10 | 6/10 |

## Installation and Setup

### Physical Installation
1. **Power Off**: Ensure printer is completely powered off
2. **Remove Old Board**: Carefully disconnect all wires and remove old board
3. **Install New Board**: Mount new Creality board in same location
4. **Connect Wires**: Follow pin mapping guide for connections
5. **Power Test**: Test basic functionality before firmware upload

### Firmware Installation
1. **Download Firmware**: Get appropriate firmware for your printer model
2. **Configure Pins**: Update pin definitions if needed
3. **Compile**: Build firmware with correct board selection
4. **Upload**: Flash firmware to Creality board
5. **Test**: Verify all functions work correctly

### Initial Configuration
1. **PID Tuning**: Run PID autotune for heaters
2. **Endstop Testing**: Verify all endstops work correctly
3. **Stepper Testing**: Test all stepper motors
4. **Temperature Testing**: Verify temperature readings
5. **Fan Testing**: Test all fan outputs

## Common Modifications

### Stepper Driver Upgrades
- **TMC2209**: Drop-in replacement with UART mode support
- **TMC5160**: High-current drivers for larger printers
- **TMC2660**: Advanced drivers with SPI interface

### Additional Features
- **Filament Runout Sensor**: Connect to spare I/O pins
- **Additional Fans**: Use PWM outputs for multiple cooling zones
- **Chamber Heater**: Utilize spare heater output
- **LED Lighting**: Expand RGB LED control for better illumination

## Troubleshooting

### Common Issues
1. **Stepper Motors Not Moving**
   - Check enable pin configuration
   - Verify step/direction pin assignments
   - Test with simple G-code commands

2. **Temperature Reading Errors**
   - Verify thermistor type in firmware
   - Check wiring connections
   - Test thermistor resistance

3. **Endstop Problems**
   - Confirm endstop type (NO/NC)
   - Check pin assignments
   - Test with M119 command

4. **Fan Control Issues**
   - Verify PWM pin configuration
   - Check fan voltage requirements
   - Test with M106 command

### Diagnostic Commands
```gcode
M119    ; Check endstop states
M105    ; Read temperatures
M115    ; Firmware info
M503    ; Print settings
M122    ; TMC driver status
```

## Resources and Links

### Official Documentation
- [Creality Official Website](https://www.creality.com/)
- [Creality Support](https://www.creality.com/support)
- [Creality Firmware Downloads](https://www.creality.com/download)

### Community Resources
- [Creality Facebook Group](https://www.facebook.com/groups/creality3d/)
- [3D Printing Electronics Discord](https://discord.gg/3dprinting)
- [Reddit r/Creality](https://reddit.com/r/Creality)
- [Reddit r/3DPrinting](https://reddit.com/r/3DPrinting)

### Firmware Resources
- [Marlin Firmware](https://marlinfw.org/)
- [Klipper Firmware](https://www.klipper3d.org/)
- [RepRap Firmware](https://reprap.org/wiki/RepRap_Firmware)

### Purchase Links
- [Creality Official Store](https://www.creality.com/)
- [Amazon Creality Store](https://amazon.com/stores/Creality3D)
- [AliExpress Creality Store](https://creality.aliexpress.com/)

### Upgrade Kits
- [Silent Board Upgrade](https://www.creality.com/products/creality-3d-printer-silent-mainboard-v4-2-2)
- [BLTouch Kit](https://www.creality.com/products/bltouch-auto-bed-leveling-sensor)
- [Glass Bed](https://www.creality.com/products/creality-glass-bed-235x235mm)
