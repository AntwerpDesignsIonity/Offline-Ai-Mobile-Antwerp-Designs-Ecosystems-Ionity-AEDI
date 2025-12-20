# Installation Guide

This guide provides step-by-step instructions for installing and setting up the AEDI (Antwerp Designs Ecosystems Ionity) - Offline AI Mobile Network Monitor.

> **Important**: This installation guide represents the planned installation process. The project is currently in the documentation and planning phase. Commands and steps will become available as the project structure is implemented.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Platform-Specific Setup](#platform-specific-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing AEDI, ensure you have the following installed on your system:

### Development Environment
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**: Latest stable version
- **Git**: v2.30.0 or higher

### Mobile Development Tools

#### For Android Development:
- **Android Studio**: Latest stable version
- **Android SDK**: API Level 24 (Android 7.0) or higher
- **Java Development Kit (JDK)**: Version 11 or higher
- **Gradle**: v7.0 or higher (usually bundled with Android Studio)

#### For iOS Development (macOS only):
- **Xcode**: Version 14.0 or higher
- **CocoaPods**: Latest stable version
- **iOS SDK**: iOS 13.0 or higher

### AI/ML Dependencies
- **Python**: v3.8 or higher (for AI model management)
- **TensorFlow Lite** or **ONNX Runtime** (mobile inference)

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI.git
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### Step 3: Install AI Models

Download and set up offline AI models:

```bash
# Run the model setup script
npm run setup:models

# OR manually download models
python scripts/download_models.py
```

### Step 4: Configure Environment

Create a configuration file:

```bash
# Copy the example configuration
cp config/example.env .env

# Edit the configuration file with your settings
nano .env
```

### Step 5: Build the Application

```bash
# Build for development
npm run build:dev

# Build for production
npm run build:prod
```

## Platform-Specific Setup

### Android Setup

1. **Open Android Studio**
   ```bash
   cd android
   # Open this directory in Android Studio
   ```

2. **Sync Gradle Files**
   - Let Android Studio sync and download dependencies
   - This may take several minutes on first run

3. **Configure SDK**
   - Ensure Android SDK is installed (API 24+)
   - Set `ANDROID_HOME` environment variable

4. **Build Android App**
   ```bash
   # From project root
   npm run android:build
   
   # OR using gradle directly
   cd android
   ./gradlew assembleDebug
   ```

5. **Run on Device/Emulator**
   ```bash
   npm run android
   ```

### iOS Setup (macOS Only)

1. **Install CocoaPods Dependencies**
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Open Xcode Project**
   ```bash
   open ios/AEDI.xcworkspace
   ```

3. **Configure Signing**
   - Select your development team in Xcode
   - Configure bundle identifier

4. **Build iOS App**
   ```bash
   # From project root
   npm run ios:build
   ```

5. **Run on Simulator/Device**
   ```bash
   npm run ios
   ```

## Verification

After installation, verify everything is working correctly:

### 1. Run Tests
```bash
npm test
```

### 2. Check AI Models
```bash
npm run verify:models
```

### 3. Verify Network Monitor
```bash
npm run verify:monitor
```

### 4. Launch Development Server
```bash
npm run dev
```

## Post-Installation Configuration

### Configure Network Monitoring

Edit `config/monitor.json`:
```json
{
  "monitoring": {
    "interval": 5000,
    "offline_mode": true,
    "log_level": "info"
  }
}
```

### Configure AI Settings

Edit `config/ai.json`:
```json
{
  "inference": {
    "model_path": "./models/network_model.tflite",
    "threads": 4,
    "acceleration": "auto"
  }
}
```

## Troubleshooting

### Common Issues

#### Issue: Dependencies Not Installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

#### Issue: Android Build Fails
**Solution:**
```bash
# Clean gradle cache
cd android
./gradlew clean

# Rebuild
./gradlew assembleDebug
```

#### Issue: iOS Build Fails
**Solution:**
```bash
# Clean build folder
cd ios
xcodebuild clean

# Reinstall pods
pod deintegrate
pod install
```

#### Issue: AI Models Not Loading
**Solution:**
```bash
# Verify model files exist
ls -la models/

# Re-download models
npm run setup:models --force
```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/issues)
2. Review the [System Requirements](SYSTEM_REQUIREMENTS.md)
3. Consult the [README](README.md) for additional documentation
4. Create a new issue with detailed error information

## Next Steps

After successful installation:

1. Review the [Folder Structure](FOLDER_STRUCTURE.md) to understand the project layout
2. Read the [System Requirements](SYSTEM_REQUIREMENTS.md) for optimization tips
3. Check the API documentation in `/docs/api`
4. Start developing with `npm run dev`

## Update Instructions

To update to the latest version:

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Rebuild
npm run build
```

---

**Last Updated:** 2025-12-20
