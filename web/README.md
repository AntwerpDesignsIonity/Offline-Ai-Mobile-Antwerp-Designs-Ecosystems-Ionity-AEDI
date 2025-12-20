# NetworkZeroMonitor Web Application

**Author:** Johan Wilhelm van Antwerp  
**Statement:** "Anything is possible With God Of All Creation"

## Overview

The NetworkZeroMonitor web application is a cross-platform network monitoring tool built with React that works on any modern web browser.

## Features

- **Real-time Network Monitoring**: Continuous tracking of network connectivity
- **Browser Compatibility**: Works on Chrome, Firefox, Safari, Edge, and more
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Network Information API**: Utilizes browser APIs for detailed network metrics
- **Connection Quality Assessment**: Evaluates network performance (4G, 3G, 2G, etc.)
- **Performance Metrics**: Tracks downlink speed, RTT, and data saver status
- **Statistics Dashboard**: View uptime percentage and average metrics
- **Offline Support**: Detects and handles offline states gracefully

## Installation

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Production Build

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` directory, ready for deployment.

### Deployment

Deploy to any static hosting service:

**Netlify:**
```bash
npm run build
# Drag and drop the build folder to Netlify
```

**Vercel:**
```bash
npm run build
vercel --prod
```

**GitHub Pages:**
```bash
npm install gh-pages --save-dev
npm run build
npm run deploy
```

## Project Structure

```
web/
├── public/
│   ├── index.html            # HTML template
│   └── manifest.json         # PWA manifest
├── src/
│   ├── components/           # React components
│   │   ├── Dashboard.js      # Main dashboard
│   │   ├── Dashboard.css     # Dashboard styles
│   │   ├── Header.js         # Header component
│   │   ├── Header.css        # Header styles
│   │   ├── Footer.js         # Footer component
│   │   └── Footer.css        # Footer styles
│   ├── services/             # Business logic
│   │   └── NetworkMonitor.js # Network monitoring service
│   ├── App.js                # Main app component
│   ├── App.css               # App styles
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
└── package.json              # Dependencies
```

## Browser Support

- Chrome 61+
- Firefox 53+
- Safari 12+
- Edge 79+
- Opera 48+

**Note:** Some features like Network Information API may have limited support in certain browsers. The app gracefully degrades functionality when APIs are not available.

## API Usage

### Network Information API

The application uses the Network Information API to access:

- **Connection Type**: WiFi, Cellular, Ethernet, etc.
- **Effective Type**: 4G, 3G, 2G, slow-2G
- **Downlink**: Download speed in Mbps
- **RTT**: Round-trip time in milliseconds
- **Save Data**: Whether data saver mode is enabled

### Browser Compatibility Check

```javascript
const monitor = new NetworkMonitor();
if (monitor.isNetworkInfoSupported()) {
  // Network Information API is available
} else {
  // Fallback to basic online/offline detection
}
```

## Testing

Run the test suite:
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

## Contributing

Contributions are welcome! Please ensure:

1. All contributions respect the CC0 1.0 Universal License
2. Proper attribution is maintained as per Policy 986 AED
3. Code follows the existing style and structure
4. All tests pass before submitting

## Support

For questions or issues, please open an issue in the GitHub repository.
