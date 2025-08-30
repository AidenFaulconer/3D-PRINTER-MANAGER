# Pin Mapping Reference Guide

This guide provides comprehensive pin mapping information for different 3D printer control boards, helping you understand pin assignments and compatibility.

## Pin Type Definitions

### Input Pins
- **Digital Input**: Binary on/off signals (endstops, buttons)
- **Analog Input**: Variable voltage signals (thermistors, sensors)
- **PWM Input**: Pulse-width modulated signals (encoders)

### Output Pins
- **Digital Output**: Binary on/off signals (LEDs, relays)
- **PWM Output**: Variable duty cycle signals (fans, heaters)
- **Servo Output**: Precise timing signals (BLTouch, servos)

## Board Pin Mapping Tables

### STFM Board (STM32F407VGT6)

#### Stepper Motor Pins
| Function | Step Pin | Dir Pin | Enable Pin | CS Pin | Notes |
|----------|----------|---------|------------|--------|-------|
| X Axis | PA0 | PA1 | PA2 | PA3 | TMC2208 UART |
| Y Axis | PA4 | PA5 | PA6 | PA7 | TMC2208 UART |
| Z Axis | PB0 | PB1 | PB2 | PB3 | TMC2208 UART |
| E0 (Extruder) | PB4 | PB5 | PB6 | PB7 | TMC2208 UART |
| E1 (Second Extruder) | PB8 | PB9 | PB10 | PB11 | TMC2208 UART |

#### Endstop Pins
| Function | Pin | Type | Logic | Notes |
|----------|-----|------|-------|-------|
| X Endstop | PC0 | Digital | Active Low | Normally Open |
| Y Endstop | PC1 | Digital | Active Low | Normally Open |
| Z Endstop | PC2 | Digital | Active Low | Normally Open |

#### Thermistor Pins
| Function | Pin | Type | Resistance | Notes |
|----------|-----|------|------------|-------|
| Hotend | PC3 | Analog | 100K NTC | 10-bit ADC |
| Bed | PC4 | Analog | 100K NTC | 10-bit ADC |

#### Heater and Fan Pins
| Function | Pin | Type | Voltage | Current | Notes |
|----------|-----|------|---------|---------|-------|
| Hotend Heater | PC5 | PWM | 12V/24V | 2A | MOSFET controlled |
| Bed Heater | PC6 | PWM | 12V/24V | 5A | MOSFET controlled |
| Part Cooling Fan | PC7 | PWM | 12V | 0.5A | PWM speed control |
| Controller Fan | PC8 | PWM | 12V | 0.5A | PWM speed control |

#### Additional I/O Pins
| Function | Pin | Type | Voltage | Notes |
|----------|-----|------|---------|-------|
| BLTouch/Probe | PC9 | Digital | 5V | Servo control |
| RGB LED Strip | PC10 | PWM | 5V | Addressable LED |
| SD Card CS | PC11 | Digital | 3.3V | SPI interface |
| SD Card SCK | PC12 | Digital | 3.3V | SPI interface |

### SKR Mini E3 V2.0 (STM32F103RC)

#### Stepper Motor Pins
| Function | Step Pin | Dir Pin | Enable Pin | CS Pin | Notes |
|----------|----------|---------|------------|--------|-------|
| X Axis | PB9 | PB8 | PB7 | PB6 | TMC2209 UART |
| Y Axis | PB7 | PB6 | PB3 | PB10 | TMC2209 UART |
| Z Axis | PB5 | PB4 | PB3 | PB10 | TMC2209 UART |
| E0 (Extruder) | PB3 | PB10 | PB5 | PB4 | TMC2209 UART |

#### Endstop Pins
| Function | Pin | Type | Logic | Notes |
|----------|-----|------|-------|-------|
| X Endstop | PA1 | Digital | Active Low | Normally Open |
| Y Endstop | PA0 | Digital | Active Low | Normally Open |
| Z Endstop | PC14 | Digital | Active Low | Normally Open |

#### Thermistor Pins
| Function | Pin | Type | Resistance | Notes |
|----------|-----|------|------------|-------|
| Hotend | PA7 | Analog | 100K NTC | 12-bit ADC |
| Bed | PA6 | Analog | 100K NTC | 12-bit ADC |

#### Heater and Fan Pins
| Function | Pin | Type | Voltage | Current | Notes |
|----------|-----|------|---------|---------|-------|
| Hotend Heater | PA8 | PWM | 12V/24V | 2A | MOSFET controlled |
| Bed Heater | PA9 | PWM | 12V/24V | 5A | MOSFET controlled |
| Part Cooling Fan | PA10 | PWM | 12V | 0.5A | PWM speed control |
| Controller Fan | PA11 | PWM | 12V | 0.5A | PWM speed control |

#### Additional I/O Pins
| Function | Pin | Type | Voltage | Notes |
|----------|-----|------|---------|-------|
| BLTouch/Probe | PA15 | Digital | 5V | Servo control |
| RGB LED Strip | PA12 | PWM | 5V | Addressable LED |
| SD Card | Built-in | SPI | 3.3V | microSD slot |

### Creality 4.2.2/4.2.7 (STM32F103RCT6)

#### Stepper Motor Pins
| Function | Step Pin | Dir Pin | Enable Pin | CS Pin | Notes |
|----------|----------|---------|------------|--------|-------|
| X Axis | PB9 | PB8 | PB7 | PB6 | TMC2208/2225 |
| Y Axis | PB7 | PB6 | PB3 | PB10 | TMC2208/2225 |
| Z Axis | PB5 | PB4 | PB3 | PB10 | TMC2208/2225 |
| E0 (Extruder) | PB3 | PB10 | PB5 | PB4 | TMC2208/2225 |

#### Endstop Pins
| Function | Pin | Type | Logic | Notes |
|----------|-----|------|-------|-------|
| X Endstop | PA1 | Digital | Active Low | Normally Open |
| Y Endstop | PA0 | Digital | Active Low | Normally Open |
| Z Endstop | PC14 | Digital | Active Low | Normally Open |

#### Thermistor Pins
| Function | Pin | Type | Resistance | Notes |
|----------|-----|------|------------|-------|
| Hotend | PA7 | Analog | 100K NTC | 12-bit ADC |
| Bed | PA6 | Analog | 100K NTC | 12-bit ADC |

#### Heater and Fan Pins
| Function | Pin | Type | Voltage | Current | Notes |
|----------|-----|------|---------|---------|-------|
| Hotend Heater | PA8 | PWM | 12V/24V | 2A | MOSFET controlled |
| Bed Heater | PA9 | PWM | 12V/24V | 5A | MOSFET controlled |
| Part Cooling Fan | PA10 | PWM | 12V | 0.5A | PWM speed control |
| Controller Fan | PA11 | PWM | 12V | 0.5A | PWM speed control |

#### Additional I/O Pins
| Function | Pin | Type | Voltage | Notes |
|----------|-----|------|---------|-------|
| BLTouch/Probe | PA15 | Digital | 5V | Servo control |
| RGB LED Strip | PA12 | PWM | 5V | Addressable LED |
| SD Card | Built-in | SPI | 3.3V | microSD slot |

## Pin Compatibility Matrix

### Cross-Board Compatibility
| Function | STFM | SKR Mini E3 V2.0 | Creality 4.2.2/4.2.7 | Notes |
|----------|------|-------------------|------------------------|-------|
| X Stepper | PA0/PA1 | PB9/PB8 | PB9/PB8 | Different pin assignments |
| Y Stepper | PA4/PA5 | PB7/PB6 | PB7/PB6 | Different pin assignments |
| Z Stepper | PB0/PB1 | PB5/PB4 | PB5/PB4 | Different pin assignments |
| E0 Stepper | PB4/PB5 | PB3/PB10 | PB3/PB10 | Different pin assignments |
| X Endstop | PC0 | PA1 | PA1 | Different pin assignments |
| Y Endstop | PC1 | PA0 | PA0 | Different pin assignments |
| Z Endstop | PC2 | PC14 | PC14 | Different pin assignments |
| Hotend Thermistor | PC3 | PA7 | PA7 | Different pin assignments |
| Bed Thermistor | PC4 | PA6 | PA6 | Different pin assignments |
| Hotend Heater | PC5 | PA8 | PA8 | Different pin assignments |
| Bed Heater | PC6 | PA9 | PA9 | Different pin assignments |
| Part Cooling Fan | PC7 | PA10 | PA10 | Different pin assignments |
| Controller Fan | PC8 | PA11 | PA11 | Different pin assignments |

### Voltage Compatibility
| Board | Logic Level | Stepper Voltage | Heater Voltage | Fan Voltage | Notes |
|-------|-------------|-----------------|----------------|-------------|-------|
| STFM | 3.3V | 12V/24V | 12V/24V | 12V | 3.3V logic, 12V/24V power |
| SKR Mini E3 V2.0 | 3.3V | 12V/24V | 12V/24V | 12V | 3.3V logic, 12V/24V power |
| Creality 4.2.2/4.2.7 | 3.3V | 12V/24V | 12V/24V | 12V | 3.3V logic, 12V/24V power |

## Pin Assignment Guidelines

### Stepper Motor Pins
1. **Step Pin**: Generates step pulses for motor movement
2. **Direction Pin**: Controls motor rotation direction
3. **Enable Pin**: Enables/disables motor power
4. **CS Pin**: Chip select for UART/SPI communication

### Endstop Pins
1. **Normally Open (NO)**: Endstop is open when not triggered
2. **Normally Closed (NC)**: Endstop is closed when not triggered
3. **Active Low**: Endstop signal is pulled low when triggered
4. **Active High**: Endstop signal is pulled high when triggered

### Thermistor Pins
1. **Voltage Divider**: Thermistor forms voltage divider with fixed resistor
2. **ADC Resolution**: Higher resolution provides more accurate temperature readings
3. **Resistance Range**: Common values are 100K, 10K, and 3950K thermistors
4. **Temperature Range**: Typically -40°C to +300°C for 3D printing

### Heater and Fan Pins
1. **PWM Frequency**: Higher frequency reduces audible noise
2. **Current Rating**: Ensure MOSFET can handle required current
3. **Voltage Rating**: Ensure MOSFET can handle supply voltage
4. **Heat Dissipation**: Adequate heatsinking for high-power applications

## Common Pin Modifications

### Adding New Components
1. **Identify Available Pins**: Check board schematic for unused pins
2. **Check Pin Function**: Ensure pin supports required function
3. **Verify Voltage Levels**: Match component voltage requirements
4. **Update Firmware**: Configure new pins in firmware

### Pin Reassignment
1. **Backup Configuration**: Save current firmware configuration
2. **Update Pin Definitions**: Modify pin assignments in firmware
3. **Test Functionality**: Verify all functions work correctly
4. **Document Changes**: Record pin modifications for future reference

### Pin Expansion
1. **I2C Expanders**: Add multiple I/O pins via I2C
2. **SPI Expanders**: Add multiple I/O pins via SPI
3. **Shift Registers**: Add multiple output pins via shift registers
4. **Multiplexers**: Add multiple input pins via multiplexers

## Troubleshooting Pin Issues

### Common Problems
1. **Pin Not Responding**: Check pin configuration and connections
2. **Incorrect Voltage**: Verify voltage levels and power supply
3. **Pin Conflict**: Ensure pins are not used by multiple functions
4. **Firmware Mismatch**: Verify pin definitions match hardware

### Diagnostic Steps
1. **Visual Inspection**: Check for physical damage or loose connections
2. **Multimeter Test**: Measure voltage and continuity
3. **Oscilloscope**: Check signal timing and levels
4. **Firmware Test**: Use diagnostic commands to test pins

### Testing Commands
```gcode
M119    ; Test endstop pins
M105    ; Test thermistor pins
M106    ; Test fan pins
M104    ; Test heater pins
M122    ; Test stepper driver pins
```

## Resources and References

### Board Schematics
- [STFM Board Schematic](./schematics/stfm-schematic.pdf)
- [SKR Mini E3 V2.0 Schematic](./schematics/skr-mini-e3-v2-schematic.pdf)
- [Creality 4.2.2 Schematic](./schematics/creality-4.2.2-schematic.pdf)

### Pin Reference Tools
- [STM32F4 Pinout Tool](https://www.st.com/en/evaluation-tools/stm32f4discovery.html)
- [STM32F1 Pinout Tool](https://www.st.com/en/evaluation-tools/stm32f103c8t6.html)
- [Arduino Pin Mapping](https://www.arduino.cc/en/reference/board)

### Community Resources
- [3D Printing Electronics Discord](https://discord.gg/3dprinting)
- [Reddit r/3DPrinting](https://reddit.com/r/3DPrinting)
- [RepRap Forums](https://forums.reprap.org/)

### Documentation Standards
- [IEEE Pin Assignment Standards](https://standards.ieee.org/)
- [IPC Pin Design Guidelines](https://www.ipc.org/)
- [JEDEC Pin Specifications](https://www.jedec.org/)
