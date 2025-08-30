# 3D Printer Electronics API Documentation

This folder contains comprehensive documentation for 3D printer electronics, including board variants, pin layouts, and component references.

## File Structure

- **board-guides/** - Detailed guides for specific board variants
- **pin-reference/** - Pin layout references and mappings
- **component-library/** - Electronic component specifications and datasheets
- **wiring-guides/** - Wiring diagrams and connection guides
- **firmware-configs/** - Firmware configuration examples for different boards

## Supported Board Types

### Creality Boards
- **4.2.2** - Standard Creality board with TMC2208 drivers
- **4.2.7** - Updated Creality board with TMC2225 drivers
- **CR-10 Smart Pro** - Advanced Creality board
- **Ender 3 V2** - Standard Ender 3 board

### SKR Boards (BigTreeTech)
- **SKR Mini E3 V2.0** - Popular drop-in replacement for Creality boards
- **SKR Mini E3 V3.0** - Updated version with improved features
- **SKR Pro V1.2** - High-end board with multiple stepper support
- **SKR 2** - Advanced board with dual MCU support

### STM32F4 Boards
- **STFM** - STM32F4-based board (your current board)
- **Fysetc Spider** - STM32F4 board with advanced features
- **BTT Octopus** - STM32F4 board with extensive I/O

### Other Popular Boards
- **MKS Gen L** - Classic board with expandable design
- **Duet 2 WiFi** - Professional board with WiFi connectivity
- **Smoothieboard** - Open-source board with modular design

## Quick Navigation

### By Board Type
- [Creality Boards](./board-guides/creality-boards.md)
- [SKR Boards](./board-guides/skr-boards.md)
- [STM32F4 Boards](./board-guides/stm32f4-boards.md)
- [Other Boards](./board-guides/other-boards.md)

### By Component
- [Stepper Drivers](./component-library/stepper-drivers.md)
- [Thermistors](./component-library/thermistors.md)
- [Endstops](./component-library/endstops.md)
- [Fans](./component-library/fans.md)
- [Sensors](./component-library/sensors.md)

### By Function
- [Pin Mapping Reference](./pin-reference/pin-mapping.md)
- [Wiring Diagrams](./wiring-guides/wiring-diagrams.md)
- [Firmware Configuration](./firmware-configs/firmware-setup.md)

## Common Use Cases

### Board Replacement
- Identify current board and pin layout
- Find compatible replacement board
- Map pins correctly for new board
- Update firmware configuration

### Component Upgrades
- Upgrade stepper drivers
- Add new sensors or endstops
- Install additional fans or heaters
- Upgrade to better thermistors

### Firmware Updates
- Configure pins for specific board
- Set up advanced features
- Optimize performance settings
- Enable new capabilities

## Notes

- Always verify pin assignments before making connections
- Check voltage requirements for components
- Use appropriate wire gauge for current requirements
- Test connections before powering on
- Keep firmware configurations backed up
- Document any custom modifications made

## Contributing

This documentation is designed to be a living reference. When you discover new information about boards or components, consider updating the relevant files to help other users.
