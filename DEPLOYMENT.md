# NetworkZeroMonitor - Build & Deployment Guide

**Author:** Johan Wilhelm van Antwerp  
**License:** CC0 1.0 Universal - Policy 986 AED Fines Apply

## Overview

This document provides comprehensive instructions for building and deploying both the mobile and web versions of NetworkZeroMonitor.

---

## Mobile Application

### Prerequisites

- Node.js v14 or higher
- React Native CLI
- For iOS: macOS, Xcode, CocoaPods
- For Android: Android Studio, Android SDK

### Development Build

#### iOS Development

1. Install dependencies:
```bash
cd mobile
npm install
cd ios
pod install
cd ..
```

2. Start Metro bundler:
```bash
npm start
```

3. In a new terminal, run on iOS:
```bash
npm run ios
# or specify a simulator
npm run ios -- --simulator="iPhone 14"
```

#### Android Development

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Start Metro bundler:
```bash
npm start
```

3. In a new terminal, run on Android:
```bash
npm run android
```

### Production Build

#### iOS Production Build

1. Open iOS project in Xcode:
```bash
cd mobile/ios
open NetworkZeroMonitor.xcworkspace
```

2. Configure signing and provisioning profiles in Xcode

3. Archive the app:
   - Product → Archive
   - Distribute App → App Store Connect

#### Android Production Build

1. Generate a keystore (first time only):
```bash
cd mobile/android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure signing in `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

3. Build the release APK:
```bash
cd mobile/android
./gradlew assembleRelease
```

4. The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

5. Build the release AAB (for Google Play):
```bash
cd mobile/android
./gradlew bundleRelease
```

---

## Web Application

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Development Build

1. Install dependencies:
```bash
cd web
npm install
```

2. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Production Build

1. Create optimized build:
```bash
cd web
npm run build
```

2. The production files will be in the `build/` directory

### Deployment Options

#### Option 1: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
cd web
npm run build
netlify deploy --prod --dir=build
```

Or simply drag and drop the `build` folder to https://app.netlify.com/drop

#### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd web
vercel --prod
```

#### Option 3: GitHub Pages

1. Add to `web/package.json`:
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Deploy:
```bash
npm run deploy
```

#### Option 4: AWS S3 + CloudFront

1. Build the app:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync build/ s3://your-bucket-name --delete
```

3. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Option 5: Docker

Create `Dockerfile` in web directory:
```dockerfile
FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t networkzeromonitor-web .
docker run -p 80:80 networkzeromonitor-web
```

---

## Testing

### Mobile Tests

```bash
cd mobile
npm test
```

### Web Tests

```bash
cd web
npm test
```

---

## Environment Variables

### Mobile

Create `.env` file in mobile directory (if needed):
```
API_URL=https://api.example.com
ENV=production
```

### Web

Create `.env.production` in web directory:
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production
```

---

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install and Build
        run: |
          cd web
          npm install
          npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './web/build'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Troubleshooting

### Mobile Issues

**Metro bundler won't start:**
```bash
npm start -- --reset-cache
```

**iOS build fails:**
```bash
cd ios
pod deintegrate
pod install
```

**Android build fails:**
```bash
cd android
./gradlew clean
```

### Web Issues

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Port 3000 already in use:**
```bash
PORT=3001 npm start
```

---

## License

All builds must include proper attribution:

**Author:** Johan Wilhelm van Antwerp  
**Statement:** "Anything is possible With God Of All Creation"  
**License:** Creative Commons CC0 1.0 Universal  
**Policy:** 986 AED Fines Apply

See [LICENSE](../LICENSE) for complete terms.
