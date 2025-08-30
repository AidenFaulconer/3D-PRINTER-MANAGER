# Stepper Driver Guide

This guide covers stepper motor drivers commonly used in 3D printers, including specifications, features, and configuration options.

## TMC2208 Stepper Driver

### Overview
The TMC2208 is a popular stepper driver featuring silent operation and advanced features through UART communication.

### Specifications
- **Supply Voltage**: 4.75V - 36V
- **Output Current**: Up to 2.8A RMS
- **Microstepping**: Up to 256 microsteps
- **Communication**: UART, Single Wire UART, Step/Dir
- **Package**: QFN48 (7x7mm)
- **Operating Temperature**: -40°C to +125°C

### Features
- **StealthChop2**: Silent operation at low speeds
- **SpreadCycle**: High torque at high speeds
- **StallGuard2**: Motor stall detection
- **CoolStep**: Automatic current reduction
- **DC Motor Mode**: DC motor control capability

### Pin Configuration
| Pin | Function | Description |
|-----|----------|-------------|
| VCC | Power Supply | 5V logic supply |
| GND | Ground | Logic ground |
| VM | Motor Supply | Motor power supply (4.75V-36V) |
| VCP | Charge Pump | Internal charge pump output |
| VSA | Sense A | Phase A current sense |
| VSB | Sense B | Phase B current sense |
| AIN1 | Input A1 | Phase A input 1 |
| AIN2 | Input A2 | Phase A input 2 |
| BIN1 | Input B1 | Phase B input 1 |
| BIN2 | Input B2 | Phase B input 2 |
| DIAG1 | Diagnostic 1 | Stall detection output |
| DIAG2 | Diagnostic 2 | Temperature warning output |
| STEP | Step Input | Step pulse input |
| DIR | Direction Input | Direction input |
| EN | Enable Input | Enable/disable driver |
| MS1 | Microstep 1 | Microstep resolution setting |
| MS2 | Microstep 2 | Microstep resolution setting |
| PDN | Power Down | Power down input |
| CLK | Clock Input | External clock input |
| UART_RX | UART Receive | UART receive input |
| UART_TX | UART Transmit | UART transmit output |

### Configuration Options

#### Microstepping Settings
| MS1 | MS2 | Microsteps | Resolution |
|-----|-----|------------|------------|
| 0 | 0 | 1 | Full step |
| 1 | 0 | 2 | Half step |
| 0 | 1 | 4 | Quarter step |
| 1 | 1 | 8 | Eighth step |
| UART | UART | 16-256 | Configurable via UART |

#### Current Settings
- **RMS Current**: 0-2.8A RMS
- **Peak Current**: Up to 4A peak
- **Sense Resistor**: 0.11Ω (internal)
- **Current Scaling**: 32 levels

#### Silent Mode Configuration
```cpp
// Marlin Configuration
#define TMC2208_SERIAL
#define TMC2208_STEALTHCHOP
#define TMC2208_HYBRID_THRESHOLD
#define TMC2208_STALLGUARD

// Klipper Configuration
[stepper_x]
driver: TMC2208
uart_address: 0
uart_pin: PA3
run_current: 800
hold_current: 400
stealthchop_threshold: 999999
```

### Advantages
- **Silent Operation**: StealthChop2 eliminates stepper noise
- **High Efficiency**: Advanced current control algorithms
- **Thermal Protection**: Built-in temperature monitoring
- **Stall Detection**: Motor stall detection capability
- **UART Control**: Full configuration via UART

### Disadvantages
- **Cost**: Higher cost than basic drivers
- **Complexity**: Requires UART setup for full features
- **Heat Generation**: Can run hot under heavy load
- **Compatibility**: May not work with all boards

## TMC2209 Stepper Driver

### Overview
The TMC2209 is an enhanced version of the TMC2208 with improved stall detection and additional features.

### Key Differences from TMC2208
- **Enhanced StallGuard2**: Better stall detection accuracy
- **Improved Thermal Protection**: Better temperature monitoring
- **Higher Current Rating**: Up to 3A RMS output
- **Better Noise Performance**: Reduced electrical noise

### Specifications
- **Supply Voltage**: 4.75V - 36V
- **Output Current**: Up to 3A RMS
- **Microstepping**: Up to 256 microsteps
- **Communication**: UART, Single Wire UART, Step/Dir
- **Package**: QFN48 (7x7mm)
- **Operating Temperature**: -40°C to +125°C

### Configuration
```cpp
// Marlin Configuration
#define TMC2209_SERIAL
#define TMC2209_STEALTHCHOP
#define TMC2209_HYBRID_THRESHOLD
#define TMC2209_STALLGUARD

// Klipper Configuration
[stepper_x]
driver: TMC2209
uart_address: 0
uart_pin: PA3
run_current: 800
hold_current: 400
stealthchop_threshold: 999999
stallguard_threshold: 0
```

## TMC5160 Stepper Driver

### Overview
The TMC5160 is a high-current stepper driver designed for demanding applications requiring high torque and precision.

### Specifications
- **Supply Voltage**: 4.75V - 60V
- **Output Current**: Up to 20A RMS
- **Microstepping**: Up to 256 microsteps
- **Communication**: SPI, UART, Step/Dir
- **Package**: QFN48 (7x7mm)
- **Operating Temperature**: -40°C to +125°C

### Features
- **High Current**: Up to 20A RMS output
- **High Voltage**: Up to 60V operation
- **Advanced Control**: Sophisticated motion control
- **Multiple Interfaces**: SPI, UART, and Step/Dir modes
- **Thermal Protection**: Comprehensive thermal management

### Configuration
```cpp
// Marlin Configuration
#define TMC5160_SERIAL
#define TMC5160_STEALTHCHOP
#define TMC5160_HYBRID_THRESHOLD
#define TMC5160_STALLGUARD

// Klipper Configuration
[stepper_x]
driver: TMC5160
uart_address: 0
uart_pin: PA3
run_current: 1500
hold_current: 750
stealthchop_threshold: 999999
```

## TMC2660 Stepper Driver

### Overview
The TMC2660 is a professional-grade stepper driver with advanced features and high performance.

### Specifications
- **Supply Voltage**: 4.75V - 60V
- **Output Current**: Up to 20A RMS
- **Microstepping**: Up to 256 microsteps
- **Communication**: SPI
- **Package**: QFN48 (7x7mm)
- **Operating Temperature**: -40°C to +125°C

### Features
- **SPI Interface**: High-speed SPI communication
- **Advanced Control**: Sophisticated motion algorithms
- **High Performance**: Professional-grade performance
- **Flexible Configuration**: Extensive configuration options
- **Thermal Management**: Advanced thermal protection

### Configuration
```cpp
// Marlin Configuration
#define TMC2660_SPI
#define TMC2660_STEALTHCHOP
#define TMC2660_HYBRID_THRESHOLD
#define TMC2660_STALLGUARD

// Klipper Configuration
[stepper_x]
driver: TMC2660
cs_pin: PA3
spi_bus: spi1
run_current: 1500
hold_current: 750
stealthchop_threshold: 999999
```

## Driver Comparison Table

| Feature | TMC2208 | TMC2209 | TMC5160 | TMC2660 |
|---------|---------|---------|---------|---------|
| Max Current | 2.8A | 3A | 20A | 20A |
| Max Voltage | 36V | 36V | 60V | 60V |
| Communication | UART | UART | SPI/UART | SPI |
| Silent Mode | Yes | Yes | Yes | Yes |
| Stall Detection | Basic | Enhanced | Advanced | Advanced |
| Cost | $ | $$ | $$$ | $$$$ |
| Use Case | Standard | Enhanced | High Power | Professional |

## Installation and Setup

### Physical Installation
1. **Check Compatibility**: Ensure driver fits board socket
2. **Orientation**: Align driver correctly in socket
3. **Heat Sink**: Install heat sink if provided
4. **Secure**: Ensure driver is firmly seated

### Firmware Configuration
1. **Enable Driver**: Enable driver in firmware
2. **Configure Pins**: Set up UART/SPI pins
3. **Set Current**: Configure motor current
4. **Test Operation**: Verify driver functions correctly

### Current Tuning
1. **Start Low**: Begin with low current setting
2. **Test Movement**: Check motor movement
3. **Increase Gradually**: Increase current until motor runs smoothly
4. **Monitor Temperature**: Ensure driver doesn't overheat
5. **Fine Tune**: Adjust for optimal performance

## Troubleshooting

### Common Issues
1. **Motor Not Moving**
   - Check enable pin configuration
   - Verify step/direction pins
   - Check current settings
   - Test with simple commands

2. **Excessive Noise**
   - Enable StealthChop mode
   - Adjust current settings
   - Check microstepping configuration
   - Verify driver compatibility

3. **Driver Overheating**
   - Reduce current settings
   - Improve heat dissipation
   - Check voltage supply
   - Verify load requirements

4. **Communication Errors**
   - Check UART/SPI configuration
   - Verify pin assignments
   - Check baud rate settings
   - Test with known good driver

### Diagnostic Commands
```gcode
M122    ; Driver status and configuration
M906    ; Set motor current
M569    ; Set stepper mode
M503    ; Print current settings
```

## Resources and Links

### Official Documentation
- [TMC2208 Datasheet](https://www.trinamic.com/products/integrated-circuits/details/tmc2208-la/)
- [TMC2209 Datasheet](https://www.trinamic.com/products/integrated-circuits/details/tmc2209-la/)
- [TMC5160 Datasheet](https://www.trinamic.com/products/integrated-circuits/details/tmc5160-la/)
- [TMC2660 Datasheet](https://www.trinamic.com/products/integrated-circuits/details/tmc2660-la/)

### Community Resources
- [Trinamic Community](https://www.trinamic.com/support/community/)
- [3D Printing Electronics Discord](https://discord.gg/3dprinting)
- [Reddit r/3DPrinting](https://reddit.com/r/3DPrinting)

### Purchase Links
- [Digi-Key TMC2208](https://www.digikey.com/en/products/detail/trinamic-motion-control-gmbh/TMC2208-LA-T/10424852)
- [Mouser TMC2209](https://www.mouser.com/ProductDetail/Trinamic/TMC2209-LA-T)
- [AliExpress TMC Drivers](https://www.aliexpress.com/wholesale?SearchText=tmc2208)

### Configuration Tools
- [TMC Configurator](https://www.trinamic.com/support/software/tmc-configurator/)
- [Marlin Firmware](https://marlinfw.org/)
- [Klipper Firmware](https://www.klipper3d.org/)
