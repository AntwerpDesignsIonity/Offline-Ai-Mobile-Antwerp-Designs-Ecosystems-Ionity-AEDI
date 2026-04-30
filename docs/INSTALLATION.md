# Installation Guide

Complete installation guide for Offline AI Mobile AEDI (V1.01).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Configuration](#configuration)
4. [First Run](#first-run)
5. [Troubleshooting](#troubleshooting)
6. [Uninstallation](#uninstallation)

## Prerequisites

### System Requirements

- **Operating System**: 
  - Windows 10 or later
  - macOS 10.13 (High Sierra) or later
  - Linux (Ubuntu 18.04+, Debian 10+, CentOS 7+, or similar)
  
- **Hardware**:
  - Minimum 2 GB RAM
  - 100 MB disk space (plus space for AI models)
  - Any modern CPU (x86_64 architecture)

- **Software**:
  - Node.js v14.0.0 or higher
  - npm v6.0.0 or higher

### Installing Node.js

#### Windows

1. Download the Windows installer from [nodejs.org](https://nodejs.org/)
2. Run the installer (`.msi` file)
3. Follow the installation wizard
4. Restart your terminal/command prompt

Verify installation:
```cmd
node --version
npm --version
```

#### macOS

**Option 1: Using Homebrew (Recommended)**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

**Option 2: Using the macOS Installer**
1. Download the macOS installer from [nodejs.org](https://nodejs.org/)
2. Run the `.pkg` file
3. Follow the installation wizard

#### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install Node.js (18.x LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Linux (CentOS/RHEL/Fedora)

```bash
# Install Node.js (18.x LTS)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

## Installation Methods

### Method 1: From Source (Git Clone)

**Step 1: Clone the Repository**
```bash
git clone https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI.git

cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Configure (Optional)**

Edit `config.json` to customize installation paths:
```bash
# Linux/macOS
nano config.json

# Windows
notepad config.json
```

**Step 4: Start the Application**
```bash
npm start
```

### Method 2: From Release Package

**Step 1: Download the Release**

Download the latest release package from GitHub:
- `offline-ai-mobile-aedi-v1.01.tar.gz` (Linux/macOS)
- `offline-ai-mobile-aedi-v1.01.zip` (Windows)

**Step 2: Extract the Package**

**Linux/macOS:**
```bash
tar -xzf offline-ai-mobile-aedi-v1.01.tar.gz
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
```

**Windows:**
1. Right-click the `.zip` file
2. Select "Extract All..."
3. Choose destination folder
4. Open the extracted folder in Command Prompt or PowerShell

**Step 3: Install Dependencies**
```bash
npm install
```

**Step 4: Start the Application**
```bash
npm start
```

### Method 3: Global Installation (Advanced)

You can install the application globally for system-wide access:

```bash
# Navigate to the application directory
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI

# Create global link
npm link

# Now you can run from anywhere
offline-ai-mobile-aedi
```

## Configuration

### Basic Configuration

Edit `config.json` in the application root directory:

```json
{
  "appName": "Offline AI Mobile AEDI",
  "version": "1.0.1",
  "installDirectories": {
    "primary": "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
    "secondary": "/Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
    "installSubpath": "Install/files"
  },
  "modelSettings": {
    "blobFileFolder": "models/blobs",
    "updateInterval": 3600000,
    "offlineMode": true
  },
  "ui": {
    "enableOfflineButton": true,
    "defaultOfflineState": false
  }
}
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `installDirectories.primary` | Primary installation path | `/United Programs/...` |
| `installDirectories.secondary` | Secondary installation path | `/Programs/...` |
| `installDirectories.installSubpath` | Subpath for installation files | `Install/files` |
| `modelSettings.blobFileFolder` | Folder for model blob files | `models/blobs` |
| `modelSettings.updateInterval` | Model update interval (ms) | `3600000` (1 hour) |
| `modelSettings.offlineMode` | Enable offline mode by default | `true` |
| `ui.enableOfflineButton` | Show offline toggle button | `true` |
| `ui.defaultOfflineState` | Default offline state | `false` |

### Setting Up Model Directories

Create the required directory structure for your project:

```bash
# Example for a project named "MyAIProject"
mkdir -p "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/MyAIProject/Install/files/models/blobs"
```

Or on Windows:
```cmd
mkdir "C:\United Programs\AntwerpDesigns\JWVA\Ionity\2025+\gitcat\Projects\MyAIProject\Install\files\models\blobs"
```

Place your `.blob` or `.bin` model files in this directory.

### Environment Variables

You can override settings using environment variables:

```bash
# Change the port
PORT=8080 npm start

# Set environment
NODE_ENV=production npm start
```

## First Run

### Starting the Server

**Development Mode:**
```bash
npm start
```

**Production Mode:**
```bash
NODE_ENV=production npm start
```

### Accessing the Application

Once started, the server will display:
```
🚀 Offline AI Mobile AEDI Server started on port 3000
📱 Open http://localhost:3000 in your browser
🤖 Offline mode: Disabled
📦 Models loaded: 0
```

Open your web browser and navigate to:
```
http://localhost:3000
```

### Testing the Installation

1. **Check Server Status**:
   ```bash
   curl http://localhost:3000/api/status
   ```

2. **Toggle Offline Mode**:
   Click the toggle switch in the web UI

3. **Update Models**:
   Click "Update Models" button (ensure model files are in the configured directory)

## Running as a Service

### Linux (systemd)

Create a service file:
```bash
sudo nano /etc/systemd/system/offline-ai-aedi.service
```

Add the following content:
```ini
[Unit]
Description=Offline AI Mobile AEDI
After=network.target

[Service]
Type=simple
User=yourusername
WorkingDirectory=/path/to/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
ExecStart=/usr/bin/node index.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable offline-ai-aedi
sudo systemctl start offline-ai-aedi
sudo systemctl status offline-ai-aedi
```

### Using PM2 (Cross-platform)

Install PM2:
```bash
npm install -g pm2
```

Start the application:
```bash
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
pm2 start index.js --name offline-ai-aedi
```

Enable startup on boot:
```bash
pm2 startup
pm2 save
```

Manage the application:
```bash
pm2 status              # View status
pm2 logs offline-ai-aedi  # View logs
pm2 restart offline-ai-aedi  # Restart
pm2 stop offline-ai-aedi     # Stop
```

### Windows Service (NSSM)

1. Download NSSM from [nssm.cc](https://nssm.cc/)
2. Extract and open Command Prompt as Administrator
3. Navigate to NSSM directory
4. Install service:
   ```cmd
   nssm install OfflineAIAEDI "C:\Program Files\nodejs\node.exe" "C:\path\to\index.js"
   nssm set OfflineAIAEDI AppDirectory "C:\path\to\Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI"
   nssm start OfflineAIAEDI
   ```

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**: Use a different port
```bash
PORT=8080 npm start
```

#### Node.js Not Found

**Error**: `node: command not found`

**Solution**: Install Node.js or add it to PATH
```bash
# Check if Node.js is installed
which node  # Linux/macOS
where node  # Windows
```

#### Permission Denied (Linux/macOS)

**Error**: `EACCES: permission denied`

**Solution**: Fix npm permissions
```bash
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

Or run with elevated privileges:
```bash
sudo npm start
```

#### Models Not Loading

**Problem**: Models don't appear after clicking "Update Models"

**Solutions**:
1. Verify the installation directory path in `config.json`
2. Ensure model files have `.blob` or `.bin` extensions
3. Check that the `models/blobs` directory exists
4. Verify file permissions (read access required)

#### Cannot Access from Other Devices

**Problem**: Can only access from localhost

**Solution**: Bind to all interfaces
```bash
# Modify index.js or use environment variable
HOST=0.0.0.0 npm start
```

Then access using your machine's IP address:
```
http://192.168.1.100:3000
```

### Log Files

View application logs:
```bash
# If running with PM2
pm2 logs offline-ai-aedi

# If running with systemd
sudo journalctl -u offline-ai-aedi -f

# If running directly
# Logs will appear in the terminal
```

## Uninstallation

### Stop the Application

**If running directly**: Press `Ctrl+C`

**If using PM2**:
```bash
pm2 stop offline-ai-aedi
pm2 delete offline-ai-aedi
pm2 save
```

**If using systemd**:
```bash
sudo systemctl stop offline-ai-aedi
sudo systemctl disable offline-ai-aedi
sudo rm /etc/systemd/system/offline-ai-aedi.service
sudo systemctl daemon-reload
```

### Remove Files

**Linux/macOS**:
```bash
cd /path/to/parent/directory
rm -rf Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
```

**Windows**:
1. Navigate to the installation directory
2. Delete the folder

### Remove Global Installation

If installed globally:
```bash
npm unlink offline-ai-mobile-aedi
```

## Upgrading

To upgrade to a new version:

1. **Backup your configuration**:
   ```bash
   cp config.json config.json.backup
   ```

2. **Pull latest changes** (if using Git):
   ```bash
   git pull origin main
   npm install
   ```

3. **Or download new release** and extract over existing installation

4. **Restore configuration**:
   ```bash
   cp config.json.backup config.json
   ```

5. **Restart the application**

## Support

For installation help:
- Check the [README.md](../README.md)
- Review [SOFTWARE_STACK.md](../SOFTWARE_STACK.md)
- Check [Troubleshooting](#troubleshooting) section
- Open an issue on GitHub

---

**Last Updated**: 2025-12-20  
**Version**: 1.0.1
