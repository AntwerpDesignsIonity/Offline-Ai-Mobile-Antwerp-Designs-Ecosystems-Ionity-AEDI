# Folder Structure Documentation

## Current Project Structure (V1.01)

```
Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/
│
├── .git/                           # Git version control directory
├── .gitignore                      # Git ignore configuration
│
├── README.md                       # Project overview and documentation
├── USAGE.md                        # Usage guide and instructions
├── SUMMARY.md                      # Implementation summary
├── FOLDER_STRUCTURE.md            # This file - folder structure documentation
├── SOFTWARE_STACK.md              # Software stack and installation requirements
├── CHANGELOG.md                   # Version history and changes
│
├── package.json                   # Node.js project configuration and dependencies
├── package-lock.json              # Locked versions of dependencies
├── config.json                    # Application configuration
│
├── index.js                       # Main Express server application
├── modelManager.js                # Model management module
│
├── public/                        # Static web assets
│   └── index.html                 # Web UI interface
│
├── dist/                          # Distribution builds (generated)
│   ├── offline-ai-mobile-aedi-v1.01.tar.gz
│   └── offline-ai-mobile-aedi-v1.01.zip
│
└── docs/                          # Additional documentation
    ├── API.md                     # API documentation
    ├── INSTALLATION.md            # Detailed installation guide
    └── RELEASE_NOTES.md           # Release notes and version history
```

## External Installation Directory Structure

The application expects the following directory structure for model storage:

### Primary Installation Path
```
/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/
└── [ProjectName]/
    └── Install/
        └── files/
            └── models/
                └── blobs/
                    ├── model1.blob
                    ├── model2.bin
                    └── ...
```

### Secondary Installation Path
```
/Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/
└── [ProjectName]/
    └── Install/
        └── files/
            └── models/
                └── blobs/
                    ├── model1.blob
                    ├── model2.bin
                    └── ...
```

## File Descriptions

### Root Level Files

- **README.md**: Main project documentation with features, installation, and usage
- **USAGE.md**: Detailed usage guide with examples and troubleshooting
- **SUMMARY.md**: Implementation summary and architecture overview
- **FOLDER_STRUCTURE.md**: This file, documenting the project structure
- **SOFTWARE_STACK.md**: Software dependencies and installation requirements
- **CHANGELOG.md**: Version history and changelog
- **.gitignore**: Specifies files to ignore in version control

### Configuration Files

- **package.json**: Node.js project metadata, scripts, and dependencies
- **package-lock.json**: Locked dependency versions for reproducible builds
- **config.json**: Application-specific configuration (paths, settings)

### Application Files

- **index.js**: Express.js server with API endpoints
- **modelManager.js**: Core logic for model management and offline mode

### Public Assets

- **public/index.html**: Web-based user interface

### Generated Directories

- **dist/**: Contains packaged releases (created during build)
- **node_modules/**: NPM dependencies (not committed to git)

## Directory Purpose

| Directory | Purpose |
|-----------|---------|
| `/` | Root project directory with source code and configuration |
| `/public/` | Static web assets served by Express |
| `/dist/` | Distribution packages for releases |
| `/docs/` | Additional documentation |
| `/node_modules/` | Node.js dependencies (generated) |

## Build Artifacts

The following are generated during build/install and should not be committed:

- `node_modules/` - NPM dependencies
- `dist/` - Distribution packages
- `*.log` - Log files
- `.DS_Store` - macOS metadata files
- `*.tmp` - Temporary files

## Version Information

- **Current Version**: 1.0.1 (V1.01)
- **Release Date**: 2025-12-20
- **Project Type**: Node.js web application
- **License**: ISC

## Development Guidelines

1. Source code is in the root directory
2. Configuration in `config.json` and `package.json`
3. Static assets go in `public/`
4. Documentation in root level `.md` files and `/docs/`
5. Build outputs go to `/dist/`
6. Never commit `node_modules/` or build artifacts
