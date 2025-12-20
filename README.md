# NetworkZeroMonitor

**Author:** Johan Wilhelm van Antwerp  
**Statement:** "Anything is possible With God Of All Creation"

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

## 📋 Overview

NetworkZeroMonitor is a comprehensive cross-platform network monitoring application designed to track and analyze network connectivity, bandwidth usage, and connection quality in real-time. Available for both mobile platforms and as a web application.

## ⚖️ License & Policy

This project is licensed under **Creative Commons CC0 1.0 Universal**.

**POLICY 986 AED FINES APPLY**  
Unauthorized commercial use, modification, or redistribution without proper attribution or in violation of the stated terms may result in enforcement actions and applicable fines under Policy 986 AED (Antwerp Ecosystem Designs).

See [LICENSE](LICENSE) for full details.

## 🚀 Features

- **Real-time Network Monitoring**: Track network connectivity status and changes
- **Bandwidth Analysis**: Monitor upload and download speeds
- **Connection Quality Metrics**: Measure latency, packet loss, and jitter
- **Historical Data**: View network performance trends over time
- **Cross-Platform Support**: Available on mobile (iOS/Android) and web platforms
- **Offline Capability**: Continue monitoring even without internet connectivity
- **Data Visualization**: Beautiful charts and graphs for network metrics

## 📱 Available Versions

### Mobile Application
- **Platform**: iOS and Android
- **Technology**: React Native
- **Features**: Native performance with full device integration
- **Location**: `/mobile` directory

### Web Application
- **Platform**: All modern browsers
- **Technology**: React with responsive design
- **Features**: Access from any device with a web browser
- **Location**: `/web` directory

## 🛠️ Installation

### Mobile App

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- iOS: Xcode and CocoaPods (for iOS development)
- Android: Android Studio and Android SDK (for Android development)

#### Setup
```bash
cd mobile
npm install

# For iOS
cd ios && pod install && cd ..
npm run ios

# For Android
npm run android
```

### Web App

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

#### Setup
```bash
cd web
npm install
npm start
```

The web application will be available at `http://localhost:3000`

#### Production Build
```bash
cd web
npm run build
```

## 📖 Documentation

Detailed documentation for each platform is available in their respective directories:

- [Mobile App Documentation](mobile/README.md)
- [Web App Documentation](web/README.md)

## 🏗️ Project Structure

```
.
├── LICENSE                 # CC0 1.0 Universal License with Policy 986 AED
├── README.md              # This file
├── mobile/                # React Native mobile application
│   ├── src/              # Mobile app source code
│   ├── android/          # Android-specific files
│   ├── ios/              # iOS-specific files
│   └── package.json      # Mobile dependencies
└── web/                  # React web application
    ├── public/           # Static assets
    ├── src/              # Web app source code
    └── package.json      # Web dependencies
```

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. All contributions respect the CC0 1.0 Universal License
2. Proper attribution is maintained as per Policy 986 AED
3. Code follows the existing style and structure
4. All tests pass before submitting

## 📧 Contact

For questions, issues, or policy inquiries regarding Policy 986 AED, please open an issue in this repository.

## 🙏 Acknowledgments

**Johan Wilhelm van Antwerp**  
"Anything is possible With God Of All Creation"

---

© 2025 NetworkZeroMonitor - Released under Creative Commons CC0 1.0 Universal  
Policy 986 AED Fines Apply
