# NetworkZeroMonitor Mobile App

**Author:** Johan Wilhelm van Antwerp  
**Statement:** "Anything is possible With God Of All Creation"

## Overview

The NetworkZeroMonitor mobile application is a cross-platform network monitoring tool built with React Native for iOS and Android devices.

## Features

- **Real-time Network Monitoring**: Continuous tracking of network connectivity
- **Offline Support**: Works even without internet connection
- **Connection Type Detection**: Identifies WiFi, Cellular, Ethernet, etc.
- **Internet Reachability**: Checks if internet is actually accessible
- **Historical Data**: Stores network state history for analysis
- **Network Uptime Calculation**: Tracks network reliability over time

## Installation

### Prerequisites

- Node.js v14 or higher
- npm or yarn
- React Native CLI (`npm install -g react-native-cli`)

#### For iOS Development
- macOS
- Xcode 12 or higher
- CocoaPods

#### For Android Development
- Android Studio
- Android SDK (API level 21 or higher)
- Java Development Kit (JDK) 11

### Setup

1. Install dependencies:
```bash
npm install
```

2. For iOS, install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

3. Run the app:

**iOS:**
```bash
npm run ios
# or
react-native run-ios
```

**Android:**
```bash
npm run android
# or
react-native run-android
```

## Project Structure

```
mobile/
├── src/
│   ├── App.js                 # Main application component
│   ├── components/            # Reusable UI components
│   ├── screens/               # Application screens
│   │   └── DashboardScreen.js # Main dashboard
│   ├── services/              # Business logic services
│   │   └── NetworkMonitor.js  # Network monitoring service
│   └── utils/                 # Utility functions
│       └── Colors.js          # Color constants
├── android/                   # Android-specific files
├── ios/                       # iOS-specific files
├── index.js                   # Entry point
├── app.json                   # App configuration
└── package.json              # Dependencies
```

## Usage

The app automatically starts monitoring network state when launched. The dashboard displays:

- **Network Status**: Current connection state (Connected/Disconnected)
- **Connection Type**: WiFi, Cellular, Ethernet, etc.
- **Internet Reachability**: Whether internet is accessible
- **Connection Details**: Additional network information

## API Reference

### NetworkMonitor Service

The `NetworkMonitor` service provides the following methods:

- `startMonitoring(callback)`: Begin monitoring network state
- `getCurrentState()`: Get current network state snapshot
- `getHistory(limit)`: Retrieve network history
- `getUptimePercentage(timeRange)`: Calculate network uptime
- `clearListeners()`: Stop all monitoring

## Testing

Run tests with:
```bash
npm test
```

## License

This project is licensed under Creative Commons CC0 1.0 Universal.

**POLICY 986 AED FINES APPLY**  
See [LICENSE](../LICENSE) for full details.

## Author

**Johan Wilhelm van Antwerp**  
"Anything is possible With God Of All Creation"
