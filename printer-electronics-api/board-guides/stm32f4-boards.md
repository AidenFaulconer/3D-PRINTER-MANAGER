# STM32F4 Board Guide

This guide covers STM32F4-based 3D printer control boards, including the STFM board and other popular variants.

## STFM Board

### Overview
The STFM board is a custom STM32F4-based control board designed for 3D printers. It features the STM32F407VGT6 microcontroller with ARM Cortex-M4 core running at 168MHz.

### Specifications
- **MCU**: STM32F407VGT6
- **Architecture**: ARM Cortex-M4
- **Clock Speed**: 168MHz
- **Flash Memory**: 1MB
- **RAM**: 192KB
- **Operating Voltage**: 12V/24V
- **Stepper Drivers**: 5x TMC2208/TMC2209 (UART mode)
- **Thermistor Inputs**: 2x (Hotend + Bed)
- **Endstop Inputs**: 3x (X, Y, Z)
- **Fan Outputs**: 2x (Part Cooling + Controller)
- **Servo Output**: 1x (BLTouch/Probe)

### Pin Layout

#### Stepper Motors
| Function | Pin | Driver | Notes |
|----------|-----|--------|-------|
| X Stepper | PA0/PA1 | TMC2208 | X-axis movement |
| Y Stepper | PA2/PA3 | TMC2208 | Y-axis movement |
| Z Stepper | PA4/PA5 | TMC2208 | Z-axis movement |
| E0 Stepper | PA6/PA7 | TMC2208 | Extruder |
| E1 Stepper | PB0/PB1 | TMC2208 | Second Extruder |

#### Endstops
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| X Endstop | PC0 | Normally Open | X-axis limit |
| Y Endstop | PC1 | Normally Open | Y-axis limit |
| Z Endstop | PC2 | Normally Open | Z-axis limit |

#### Thermistors
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| Hotend | PC3 | 100K NTC | Hotend temperature |
| Bed | PC4 | 100K NTC | Bed temperature |

#### Fans and Heaters
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| Hotend Heater | PC5 | PWM | 12V/24V output |
| Bed Heater | PC6 | PWM | 12V/24V output |
| Part Cooling Fan | PC7 | PWM | 12V output |
| Controller Fan | PC8 | PWM | 12V output |

#### Additional I/O
| Function | Pin | Type | Notes |
|----------|-----|------|-------|
| BLTouch/Probe | PC9 | Digital | Servo control |
| LED Strip | PC10 | PWM | RGB LED control |
| SD Card | PC11/PC12 | SPI | SD card interface |
| USB | PA11/PA12 | USB | USB communication |

### Firmware Configuration

#### Marlin Configuration
```cpp
// Board selection
#define MOTHERBOARD BOARD_STM32F4
#define BOARD_STM32F4

// Pin definitions
#define X_STEP_PIN                          PA0
#define X_DIR_PIN                           PA1
#define X_ENABLE_PIN                        PA2
#define X_CS_PIN                            PA3

#define Y_STEP_PIN                          PA4
#define Y_DIR_PIN                           PA5
#define Y_ENABLE_PIN                        PA6
#define Y_CS_PIN                            PA7

#define Z_STEP_PIN                          PB0
#define Z_DIR_PIN                           PB1
#define Z_ENABLE_PIN                        PB2
#define Z_CS_PIN                            PB3

#define E0_STEP_PIN                         PB4
#define E0_DIR_PIN                          PB5
#define E0_ENABLE_PIN                       PB6
#define E0_CS_PIN                           PB7

// Endstops
#define X_STOP_PIN                          PC0
#define Y_STOP_PIN                          PC1
#define Z_STOP_PIN                          PC2

// Thermistors
#define TEMP_0_PIN                          PC3
#define TEMP_BED_PIN                        PC4

// Heaters and Fans
#define HEATER_0_PIN                        PC5
#define HEATER_BED_PIN                      PC6
#define FAN_PIN                             PC7
#define FAN1_PIN                            PC8

// BLTouch
#define SERVO0_PIN                          PC9
#define Z_MIN_PROBE_PIN                     PC9

// LED
#define RGB_LED_PIN                         PC10
```

#### Klipper Configuration
```ini
[mcu]
serial: /dev/serial/by-id/usb-STM32F4_CDC_1234567890

[stepper_x]
step_pin: PA0
dir_pin: PA1
enable_pin: !PA2
step_distance: 0.0125
endstop_pin: ^PC0

[stepper_y]
step_pin: PA4
dir_pin: PA5
enable_pin: !PA6
step_distance: 0.0125
endstop_pin: ^PC1

[stepper_z]
step_pin: PB0
dir_pin: PB1
enable_pin: !PB2
step_distance: 0.0125
endstop_pin: ^PC2

[extruder]
step_pin: PB4
dir_pin: PB5
enable_pin: !PB6
step_distance: 0.003765
nozzle_diameter: 0.4
filament_diameter: 1.75

[heater_bed]
heater_pin: PC6
sensor_type: Generic 3950
sensor_pin: PC4
control: pid
pid_Kp: 54.027
pid_Ki: 0.770
pid_Kd: 948.182

[heater_extruder]
heater_pin: PC5
sensor_type: Generic 3950
sensor_pin: PC3
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114

[fan]
pin: PC7

[controller_fan]
pin: PC8

[bltouch]
sensor_pin: ^PC9
control_pin: PC9
x_offset: -44
y_offset: -8
z_offset: 2.5
```

### Features and Capabilities

#### Advanced Features
- **UART Stepper Control**: Full TMC2208/2209 UART mode support
- **High-Speed Processing**: 168MHz ARM Cortex-M4 for smooth motion
- **Multiple Fan Control**: Independent control of part cooling and controller fans
- **BLTouch Support**: Native BLTouch/3D probe support
- **RGB LED Control**: PWM control for addressable LED strips
- **SD Card Interface**: Built-in SD card support for standalone printing

#### Performance Characteristics
- **Maximum Step Rate**: 200kHz (suitable for high-speed printing)
- **Smooth Motion**: Advanced motion planning with high-resolution timers
- **Temperature Control**: Precise PID control for heaters
- **Fan Control**: PWM fan control for optimal cooling

### Common Modifications

#### Stepper Driver Upgrades
- **TMC2209**: Drop-in replacement for TMC2208 with stallGuard2
- **TMC5160**: High-current drivers for larger printers
- **TMC2660**: Advanced drivers with SPI interface

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

### Resources and Links

#### Official Documentation
- [STM32F4 Reference Manual](https://www.st.com/resource/en/reference_manual/dm00031020-stm32f405-415-stm32f407-417-stm32f427-437-and-stm32f429-439-advanced-arm-based-32-bit-mcus-stmicroelectronics.pdf)
- [STM32F4 Programming Manual](https://www.st.com/resource/en/programming_manual/dm00046982-stm32f4-series-cortex-m4-programming-manual-stmicroelectronics.pdf)

#### Community Resources
- [STM32F4 Community Forum](https://community.st.com/s/topic/0TO0X000000KxGvWAK/stm32f4)
- [3D Printing Electronics Discord](https://discord.gg/3dprinting)
- [Reddit r/3DPrinting](https://reddit.com/r/3DPrinting)

#### Firmware Resources
- [Marlin Firmware](https://marlinfw.org/)
- [Klipper Firmware](https://www.klipper3d.org/)
- [RepRap Firmware](https://reprap.org/wiki/RepRap_Firmware)

## Other STM32F4 Boards

### Fysetc Spider
- **MCU**: STM32F446
- **Features**: 8 stepper drivers, multiple fan outputs
- **Use Case**: Large format printers, multi-extruder setups

### BTT Octopus
- **MCU**: STM32F446
- **Features**: 8 stepper drivers, extensive I/O
- **Use Case**: Professional printers, research applications

### Comparison Table
| Feature | STFM | Fysetc Spider | BTT Octopus |
|---------|------|----------------|--------------|
| MCU | STM32F407 | STM32F446 | STM32F446 |
| Stepper Drivers | 5 | 8 | 8 |
| Fan Outputs | 2 | 4 | 6 |
| Thermistor Inputs | 2 | 3 | 4 |
| Endstop Inputs | 3 | 6 | 8 |
| Price | $$ | $$$ | $$$$ |
| Complexity | Medium | High | Very High |
