# Changelog

All notable changes to the Offline AI Mobile AEDI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-12-20

### Added
- **FOLDER_STRUCTURE.md**: Comprehensive documentation of project folder structure
- **SOFTWARE_STACK.md**: Detailed software stack documentation with installation requirements
- **CHANGELOG.md**: Version history and change tracking
- Package scripts for creating distribution builds
- Improved .gitignore to exclude build artifacts and dependencies
- Documentation folder structure for organized docs
- Release notes and version information
- API documentation
- Detailed installation guide

### Changed
- Updated package.json version to 1.0.1
- Enhanced README.md with better structure and clarity
- Improved project organization with proper documentation structure

### Fixed
- Documentation consistency across all files
- Version numbering alignment

## [1.0.0] - 2025-12-19

### Added
- Initial release of Offline AI Mobile AEDI
- Express.js web server
- Model Manager for AI blob file management
- Offline mode toggle functionality
- Web-based user interface with mobile optimization
- Configuration system via config.json
- Support for dual installation directory paths
- API endpoints for status, offline mode, and model management
- Real-time model updates from blob file folders
- Responsive UI design
- README.md with comprehensive documentation
- USAGE.md with usage instructions
- SUMMARY.md with implementation details

### Features
- **Offline Mode**: Toggle button to enable/disable offline functionality
- **Model Management**: Automatic reading and updating of AI models from blob folders
- **Dual Path Support**: Primary and secondary installation directory configurations
- **REST API**: Full API for programmatic access
- **Mobile-First UI**: Responsive interface optimized for mobile devices
- **File System Integration**: Direct reading of .blob and .bin model files
- **Configuration-Driven**: Flexible settings via JSON configuration

### Technical Stack
- Node.js 14.0.0+
- Express.js 4.18.2
- Vanilla JavaScript (ES6+)
- HTML5 & CSS3

### API Endpoints
- `GET /api/status` - Get application status
- `POST /api/offline` - Toggle offline mode
- `GET /api/models/update` - Update models from blob files
- `GET /api/models` - Get all loaded models
- `GET /api/config` - Get application configuration

## Version Numbering

This project follows [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for added functionality in a backward compatible manner
- PATCH version for backward compatible bug fixes

## Release Notes

### V1.01 (1.0.1) Highlights
This release focuses on improving documentation, project structure, and packaging:
- Complete folder structure documentation
- Comprehensive software stack guide with installation steps
- Professional changelog tracking
- Enhanced build and packaging capabilities
- Better organization for future releases

### V1.00 (1.0.0) Highlights
First stable release with core functionality:
- Fully functional offline AI model management
- Web-based interface
- REST API
- Dual installation path support
- Mobile-optimized design

---

## Links
- [GitHub Repository](https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI)
- [Issues](https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/issues)
- [Pull Requests](https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/pulls)
