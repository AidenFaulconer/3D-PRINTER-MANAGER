# SKR Board Guide

This guide covers BigTreeTech (BTT) SKR series control boards, including the popular SKR Mini E3 V2.0 and other variants.

## SKR Mini E3 V2.0

### Overview
The SKR Mini E3 V2.0 is a drop-in replacement for Creality boards, featuring the STM32F103RC microcontroller and TMC2209 stepper drivers in UART mode.

### Specifications
- **MCU**: STM32F103RC
- **Architecture**: ARM Cortex-M3
- **Clock Speed**: 72MHz
- **Flash Memory**: 256KB
- **RAM**: 48KB
- **Operating Voltage**: 12V/24V
- **Stepper Drivers**: 4x TMC2209 (UART mode)
- **Thermistor Inputs**: 2x (Hotend + Bed)
- **Endstop Inputs**: 3x (X, Y, Z)
- **Fan Outputs**: 2x (Part Cooling + Controller)
- **Servo Output**: 1x (BLTouch/Probe)
- **SD Card**: Built-in microSD slot

### Pin Layout

#### Stepper Motors
| Function | Pin | Driver | Notes |
|----------|-----|--------|-------|
| X Stepper | PB9/PB8 | TMC2209 | X-axis movement |
| Y Stepper | PB7/PB6 | TMC2209 | Y-axis movement |
| Z Stepper | PB5/PB4 | TMC2209 | Z-axis movement |
| E0 Stepper | PB3/PB10 | TMC2209 | Extruder |

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
#define MOTHERBOARD BOARD_BTT_SKR_MINI_E3_V2_0

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

// TMC2209 Configuration
#define TMC_USE_SW_SPI
#define TMC_SW_MOSI                         PA7
#define TMC_SW_MISO                         PA6
#define TMC_SW_SCK                          PA5
```

#### Klipper Configuration
```ini
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32f103xe_1234567890

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

### Features and Capabilities

#### Advanced Features
- **UART Stepper Control**: Full TMC2209 UART mode support with stallGuard2
- **Silent Operation**: TMC2209 drivers provide quiet stepper operation
- **Built-in SD Card**: microSD slot for standalone printing
- **BLTouch Support**: Native BLTouch/3D probe support
- **RGB LED Control**: PWM control for addressable LED strips
- **Dual Fan Control**: Independent control of part cooling and controller fans

#### Performance Characteristics
- **Maximum Step Rate**: 100kHz (suitable for most printing applications)
- **Silent Operation**: TMC2209 drivers eliminate stepper motor noise
- **Temperature Control**: Precise PID control for heaters
- **Fan Control**: PWM fan control for optimal cooling

### Common Modifications

#### Stepper Driver Upgrades
- **TMC5160**: High-current drivers for larger printers
- **TMC2660**: Advanced drivers with SPI interface
- **TMC2130**: SPI-based drivers with advanced features

#### Additional Features
- **Filament Runout Sensor**: Connect to spare I/O pins
- **Additional Fans**: Use PWM outputs for multiple cooling zones
- **Chamber Heater**: Utilize spare heater output
- **LED Lighting**: Expand RGB LED control for better illumination

### Troubleshooting

#### Common Issues
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

#### Diagnostic Commands
```gcode
M119    ; Check endstop states
M105    ; Read temperatures
M115    ; Firmware info
M503    ; Print settings
M122    ; TMC driver status
```

## Other SKR Boards

### SKR Mini E3 V3.0
- **MCU**: STM32G0B1
- **Features**: ARM Cortex-M0+, improved TMC2209 support
- **Use Case**: Drop-in replacement for older SKR boards

### SKR Pro V1.2
- **MCU**: STM32F407VGT6
- **Features**: 8 stepper drivers, extensive I/O
- **Use Case**: Large format printers, multi-extruder setups

### SKR 2
- **MCU**: Dual STM32F407VGT6
- **Features**: Dual MCU architecture, 8 stepper drivers
- **Use Case**: Professional printers, research applications

### SKR E3 Turbo
- **MCU**: STM32F103RCT6
- **Features**: 5 stepper drivers, improved cooling
- **Use Case**: Ender 3 upgrades, small format printers

### Comparison Table
| Feature | Mini E3 V2.0 | Mini E3 V3.0 | Pro V1.2 | SKR 2 |
|---------|---------------|---------------|----------|-------|
| MCU | STM32F103 | STM32G0B1 | STM32F407 | Dual STM32F407 |
| Stepper Drivers | 4 | 4 | 8 | 8 |
| Fan Outputs | 2 | 2 | 4 | 6 |
| Thermistor Inputs | 2 | 2 | 3 | 4 |
| Endstop Inputs | 3 | 3 | 6 | 8 |
| Price | $ | $ | $$ | $$$ |
| Complexity | Low | Low | Medium | High |

## Installation and Setup

### Physical Installation
1. **Power Off**: Ensure printer is completely powered off
2. **Remove Old Board**: Carefully disconnect all wires and remove old board
3. **Install SKR Board**: Mount new SKR board in same location
4. **Connect Wires**: Follow pin mapping guide for connections
5. **Power Test**: Test basic functionality before firmware upload

### Firmware Installation
1. **Download Firmware**: Get appropriate firmware for your printer
2. **Configure Pins**: Update pin definitions if needed
3. **Compile**: Build firmware with correct board selection
4. **Upload**: Flash firmware to SKR board
5. **Test**: Verify all functions work correctly

### Initial Configuration
1. **PID Tuning**: Run PID autotune for heaters
2. **Endstop Testing**: Verify all endstops work correctly
3. **Stepper Testing**: Test all stepper motors
4. **Temperature Testing**: Verify temperature readings
5. **Fan Testing**: Test all fan outputs

## Resources and Links

### Official Documentation
- [BTT SKR Mini E3 V2.0 Manual](https://github.com/bigtreetech/BIGTREETECH-SKR-mini-E3)
- [BTT Firmware Repository](https://github.com/bigtreetech/BIGTREETECH-SKR-mini-E3/tree/master/firmware)
- [BTT Community](https://github.com/bigtreetech/BIGTREETECH-SKR-mini-E3/issues)

### Community Resources
- [BTT Discord](https://discord.gg/bigtreetech)
- [3D Printing Electronics Discord](https://discord.gg/3dprinting)
- [Reddit r/3DPrinting](https://reddit.com/r/3DPrinting)

### Firmware Resources
- [Marlin Firmware](https://marlinfw.org/)
- [Klipper Firmware](https://www.klipper3d.org/)
- [RepRap Firmware](https://reprap.org/wiki/RepRap_Firmware)

### Purchase Links
- [BTT Official Store](https://www.biqu.equipment/)
- [Amazon SKR Mini E3 V2.0](https://amazon.com/dp/B07SJR6HL3)
- [AliExpress BTT Store](https://btt.aliexpress.com/)
