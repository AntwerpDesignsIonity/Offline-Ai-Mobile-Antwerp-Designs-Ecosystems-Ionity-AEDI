# Usage Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## Features

### Offline Mode Toggle
- Click the toggle switch to enable/disable offline mode
- Blue indicator shows when offline mode is active
- State persists during the session

### Model Management
- Click "Update Models" to scan for AI models in the configured directories
- Models are read from `.blob` and `.bin` files
- Displays model name, size, and modification date

### Configuration

Edit `config.json` to customize:

```json
{
  "installDirectories": {
    "primary": "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
    "secondary": "/Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
    "installSubpath": "Install/files"
  },
  "modelSettings": {
    "blobFileFolder": "models/blobs",
    "updateInterval": 3600000,
    "offlineMode": true
  }
}
```

### API Usage

**Get Status:**
```bash
curl http://localhost:3000/api/status
```

**Toggle Offline Mode:**
```bash
curl -X POST http://localhost:3000/api/offline \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```

**Update Models:**
```bash
curl "http://localhost:3000/api/models/update?project=MyProject"
```

## Directory Structure

```
[Install Directory]/
└── [Project Name]/
    └── Install/
        └── files/
            └── models/
                └── blobs/
                    ├── model1.blob
                    ├── model2.bin
                    └── ...
```

## Troubleshooting

### Models not loading
- Verify the install directory paths in `config.json`
- Ensure model files have `.blob` or `.bin` extensions
- Check that the `models/blobs` subdirectory exists

### Server won't start
- Ensure port 3000 is available
- Run `npm install` to install dependencies
- Check Node.js version (requires v14+)

## Development

### Running in Development Mode
```bash
npm start
```

### Testing API Endpoints
```bash
# Test all endpoints
curl http://localhost:3000/api/status
curl http://localhost:3000/api/config
curl http://localhost:3000/api/models
```

## License

ISC
