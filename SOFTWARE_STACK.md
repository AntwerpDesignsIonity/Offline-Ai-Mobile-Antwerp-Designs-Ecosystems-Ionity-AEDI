# Software Stack Documentation

## Overview

Offline AI Mobile AEDI (V1.01) is built on a modern, lightweight technology stack designed for offline AI model management and mobile-optimized user interfaces.

## Core Technology Stack

### Runtime Environment

| Component | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v14.0.0+ | JavaScript runtime environment |
| **npm** | v6.0.0+ | Package manager |

### Backend Framework

| Component | Version | Purpose |
|-----------|---------|---------|
| **Express.js** | ^4.18.2 | Web server framework for Node.js |

### Frontend

| Component | Version | Purpose |
|-----------|---------|---------|
| **HTML5** | - | User interface markup |
| **CSS3** | - | Styling and responsive design |
| **Vanilla JavaScript** | ES6+ | Client-side interactivity |

### File System

| Component | Purpose |
|-----------|---------|
| **fs (Node.js built-in)** | File system operations for reading blob files |
| **path (Node.js built-in)** | Path manipulation and resolution |

## Installation Requirements

### System Requirements

#### Minimum Requirements
- **Operating System**: Windows 10, macOS 10.13+, or Linux (Ubuntu 18.04+)
- **RAM**: 2 GB
- **Disk Space**: 100 MB for application + space for AI model blobs
- **CPU**: Any modern processor (x86_64)
- **Network**: Not required for offline operation

#### Recommended Requirements
- **Operating System**: Windows 11, macOS 12+, or Linux (Ubuntu 20.04+)
- **RAM**: 4 GB or more
- **Disk Space**: 500 MB for application + model storage
- **CPU**: Multi-core processor
- **Network**: Available for initial setup and updates

### Software Dependencies

#### Required Software

1. **Node.js** (v14.0.0 or higher)
   - Download: https://nodejs.org/
   - Installation:
     ```bash
     # macOS (using Homebrew)
     brew install node
     
     # Ubuntu/Debian
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     
     # Windows
     # Download and run installer from nodejs.org
     ```

2. **npm** (v6.0.0 or higher)
   - Comes bundled with Node.js
   - Verify installation:
     ```bash
     npm --version
     ```

#### Optional Software

1. **Git** (for development)
   - Download: https://git-scm.com/
   - Used for version control and cloning repository

2. **Text Editor/IDE**
   - VS Code (recommended)
   - Sublime Text
   - Atom
   - Any code editor of choice

## Step-by-Step Installation

### 1. Install Node.js and npm

#### Windows
```bash
# Download installer from https://nodejs.org/
# Run the installer and follow prompts
# Verify installation
node --version
npm --version
```

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Verify installation
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
# Install Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Application Dependencies

```bash
# Navigate to application directory
cd /path/to/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI

# Install dependencies
npm install
```

This will install:
- Express.js (^4.18.2)
- All transitive dependencies

### 3. Verify Installation

```bash
# Check that dependencies are installed
npm list --depth=0

# Expected output:
# offline-ai-mobile-aedi@1.0.1
# └── express@4.18.2
```

## Development Dependencies

For development and testing, you may need:

```bash
# Install development tools globally (optional)
npm install -g nodemon  # Auto-restart on file changes
npm install -g pm2      # Process manager for production
```

## Production Deployment

### Using PM2 (Recommended for Production)

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start index.js --name "offline-ai-aedi"

# Enable startup on boot
pm2 startup
pm2 save
```

### Using systemd (Linux)

Create a systemd service file:

```ini
# /etc/systemd/system/offline-ai-aedi.service
[Unit]
Description=Offline AI Mobile AEDI
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
ExecStart=/usr/bin/node index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable offline-ai-aedi
sudo systemctl start offline-ai-aedi
```

## Environment Variables

The application supports the following environment variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | 3000 | Server port number |
| `NODE_ENV` | development | Environment mode |

Example:
```bash
PORT=8080 npm start
```

## Dependency Management

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies (carefully)
npm update

# Update specific package
npm update express
```

### Security Audits

```bash
# Run security audit
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

## Build Tools

### Package Creation

```bash
# Create distribution package
npm run package

# Creates:
# - dist/offline-ai-mobile-aedi-v1.01.tar.gz
# - dist/offline-ai-mobile-aedi-v1.01.zip
```

## Troubleshooting

### Common Issues

1. **Node.js version too old**
   ```bash
   # Check version
   node --version
   
   # Update to latest LTS version
   ```

2. **npm install fails**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Retry installation
   npm install
   ```

3. **Port already in use**
   ```bash
   # Use different port
   PORT=8080 npm start
   ```

4. **Permission errors (Linux/macOS)**
   ```bash
   # Fix npm permissions
   sudo chown -R $USER:$GROUP ~/.npm
   sudo chown -R $USER:$GROUP ~/.config
   ```

## Technology Choices

### Why Express.js?
- Lightweight and fast
- Minimal overhead for simple APIs
- Large ecosystem and community
- Well-documented and stable

### Why Vanilla JavaScript (Frontend)?
- No build step required
- Faster initial load
- Simpler deployment
- Fewer dependencies

### Why Node.js?
- JavaScript on both frontend and backend
- Excellent for I/O operations (file reading)
- Large package ecosystem
- Cross-platform compatibility

## Version History

| Version | Node.js | Express | Date |
|---------|---------|---------|------|
| 1.0.1 | 14.0.0+ | 4.18.2 | 2025-12-20 |
| 1.0.0 | 14.0.0+ | 4.18.2 | 2025-12-19 |

## Additional Resources

- Node.js Documentation: https://nodejs.org/docs/
- Express.js Guide: https://expressjs.com/
- npm Documentation: https://docs.npmjs.com/

## Support and Contact

For issues related to the software stack:
- Check Node.js compatibility
- Verify all dependencies are installed
- Review error logs
- Consult documentation

---

**Last Updated**: 2025-12-20  
**Version**: 1.0.1 (V1.01)
