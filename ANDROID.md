# Android Deployment Guide

## 🤖 Deploying to Android Devices

This guide explains how to run the Offline AI Copilot on Android 7+ devices.

## Method 1: Termux (Recommended for Testing)

### Prerequisites
- Android 7.0 (Nougat) or higher
- At least 2GB RAM
- 500MB free storage

### Installation Steps

1. **Install Termux**
   - Download from F-Droid: https://f-droid.org/en/packages/com.termux/
   - Or Google Play Store (older version)

2. **Setup Termux**
```bash
# Update packages
pkg update && pkg upgrade

# Install Node.js
pkg install nodejs git

# Verify installation
node --version
npm --version
```

3. **Clone and Setup**
```bash
# Clone repository
git clone https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI.git

# Navigate to directory
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI

# Install dependencies
npm install

# Build project
npm run build
```

4. **Run the Application**
```bash
# CLI mode
node dist/cli.js chat

# Server mode
npm run server
```

5. **Access Web Interface**
   - Open Chrome on Android
   - Navigate to: `http://localhost:3000`
   - Add to home screen for app-like experience

### Performance Optimization for Android

Edit model config for lower-end devices:
```javascript
// src/core/transformer.ts
const config = {
  vocabSize: 5000,      // Reduced vocabulary
  embeddingDim: 128,    // Smaller embeddings
  numHeads: 2,          // Fewer attention heads
  numLayers: 2,         // Fewer layers
  maxSeqLength: 256,    // Shorter sequences
  ffnDim: 512          // Smaller feed-forward
};
```

## Method 2: Cordova App (Play Store Ready)

### Setup Cordova Project

1. **Install Cordova**
```bash
npm install -g cordova
```

2. **Create Cordova Project**
```bash
cordova create OfflineAICopilot com.antwerpdesigns.offlineai "Offline AI Copilot"
cd OfflineAICopilot
cordova platform add android
```

3. **Copy Built Files**
```bash
# Copy the built distribution
cp -r ../Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/dist ./www/js/
cp -r ../Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/public/* ./www/

# Copy node_modules (required dependencies only)
mkdir -p www/node_modules
cp -r ../Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/node_modules/express www/node_modules/
cp -r ../Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI/node_modules/cors www/node_modules/
```

4. **Configure AndroidManifest.xml**
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application
    android:usesCleartextTraffic="true"
    android:networkSecurityConfig="@xml/network_security_config">
</application>
```

5. **Build APK**
```bash
cordova build android --release
```

6. **Sign APK for Play Store**
```bash
# Generate keystore
keytool -genkey -v -keystore offline-ai-release.keystore -alias offline-ai -keyalg RSA -keysize 2048 -validity 10000

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore offline-ai-release.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk offline-ai

# Align APK
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk OfflineAICopilot.apk
```

## Method 3: Capacitor App (Modern Approach)

### Setup Capacitor

1. **Install Capacitor**
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

2. **Initialize Capacitor**
```bash
npx cap init "Offline AI Copilot" "com.antwerpdesigns.offlineai"
npx cap add android
```

3. **Configure**

Edit `capacitor.config.json`:
```json
{
  "appId": "com.antwerpdesigns.offlineai",
  "appName": "Offline AI Copilot",
  "webDir": "public",
  "bundledWebRuntime": false,
  "server": {
    "url": "http://localhost:3000",
    "cleartext": true
  }
}
```

4. **Build and Sync**
```bash
npm run build
npx cap sync android
npx cap open android
```

5. **Build in Android Studio**
   - Open project in Android Studio
   - Build → Generate Signed Bundle / APK
   - Follow wizard for Play Store submission

## Play Store Preparation

### Required Assets

1. **App Icon** (512x512 PNG)
   - Use GitHub/Copilot inspired design
   - Place in `res/drawable/icon.png`

2. **Screenshots** (at least 2)
   - Phone: 1080x1920 or higher
   - Tablet: 1536x2048 or higher
   - Capture CLI, Chat, and Web UI

3. **Feature Graphic** (1024x500)
   - Banner for Play Store listing

4. **Privacy Policy**
   - Required URL with privacy policy
   - Mention offline operation, no data collection

### Google Play Console Setup

1. **Create App**
   - Go to Google Play Console
   - Create new app
   - Fill in details

2. **Store Listing**
   - Title: "Offline AI Copilot - GitHub Inspired"
   - Short description: "AI code assistant working 100% offline"
   - Full description: Use content from README.md
   - Category: Tools or Productivity
   - Tags: AI, Copilot, Offline, Code, Programming

3. **Content Rating**
   - Fill questionnaire
   - Should be rated for Everyone

4. **Target Audience**
   - Age: 13+
   - Target: Developers, programmers, students

5. **App Content**
   - Declare no ads
   - Offline functionality
   - No user data collection

6. **Upload APK/AAB**
   - Upload signed APK or Android App Bundle
   - Set version: 1.0.0

## Testing on Android

### Debug Build
```bash
# Cordova
cordova run android

# Capacitor
npx cap run android
```

### Physical Device Testing
1. Enable Developer Options on Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `adb devices` to verify connection
5. Deploy app via Android Studio or CLI

### Performance Testing
```bash
# Monitor memory usage
adb shell dumpsys meminfo com.antwerpdesigns.offlineai

# Check CPU usage
adb shell top | grep offlineai

# View logs
adb logcat | grep -i "ai copilot"
```

## Optimization Tips

### Memory Management
- Clear context regularly in chat mode
- Limit sequence length
- Use smaller model configuration

### Battery Efficiency
- Implement request batching
- Add request debouncing
- Optimize model inference

### Storage
- Compress model weights
- Use efficient data structures
- Clean up temporary files

## Troubleshooting

### App Crashes on Startup
- Check Android version (7.0+)
- Verify sufficient RAM (2GB+)
- Check logcat for errors

### Slow Performance
- Reduce model size
- Lower maxSeqLength
- Use fewer layers

### Network Errors (Even Offline)
- Ensure cleartext traffic allowed
- Check localhost configuration
- Verify server is running

## Distribution Checklist

- [ ] APK signed with release key
- [ ] Version number incremented
- [ ] All screenshots prepared
- [ ] Privacy policy published
- [ ] Store listing complete
- [ ] Tested on multiple devices
- [ ] Memory usage acceptable
- [ ] Battery usage acceptable
- [ ] Offline mode verified
- [ ] Content rating obtained
- [ ] Target API level set (min: 24, target: 33+)

## Post-Launch

### Updates
- Monitor crash reports
- Collect user feedback
- Release bug fixes
- Add new features

### Metrics to Track
- Download count
- Active users
- Crash-free rate
- User ratings
- Response times

---

**Ready for Play Store Submission!** 🚀

Follow this guide to deploy your Offline AI Copilot to Android devices and the Google Play Store.
