# Offline AI Mobile - Antwerp Designs Ecosystems Ionity (AEDI)

A mobile-optimized offline AI application with model management and offline functionality.

## Features

- **Offline Mode Toggle**: Easily switch between online and offline modes with a visual toggle button
- **Model Management**: Automatically reads and updates AI models from blob file folders
- **Configurable Install Paths**: Supports multiple installation directory configurations
- **Real-time Model Updates**: Dynamic model loading from configured blob directories
- **Mobile-Optimized UI**: Responsive interface designed for mobile and desktop use

## Download

### This Repository

Get the latest version of Offline AI Mobile AEDI:

- **GitHub Repository**: [Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI](https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI)
- **Clone URL**: `https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI.git`

### Recommended Free AI Repositories

The following are the best free AI repositories on GitHub that work great for offline usage:

#### AI Models & Inference

1. **[llama.cpp](https://github.com/ggerganov/llama.cpp)** - High-performance C/C++ inference of LLaMA and other models with GGML support. Excellent for offline CPU/GPU inference.
   - Supports quantized models for efficient offline use
   - Cross-platform (Windows, macOS, Linux, iOS, Android)
   - Minimal dependencies, perfect for offline environments

2. **[ONNX Runtime](https://github.com/microsoft/onnxruntime)** - Cross-platform, high-performance ML inference engine from Microsoft.
   - Run models offline on CPU, GPU, or specialized hardware
   - Supports multiple model formats
   - Optimized for mobile and edge devices

3. **[Ollama](https://github.com/ollama/ollama)** - Run large language models locally and offline.
   - Simple setup for running LLMs locally
   - Built-in model management
   - Perfect for offline AI applications

4. **[Transformers.js](https://github.com/xenova/transformers.js)** - Run Hugging Face transformers directly in JavaScript/Node.js.
   - No server needed, fully offline capable
   - Browser and Node.js support
   - Compatible with this project's Node.js architecture

5. **[whisper.cpp](https://github.com/ggerganov/whisper.cpp)** - High-performance speech recognition offline.
   - Port of OpenAI's Whisper model
   - Runs entirely offline
   - Great for mobile voice applications

#### Model Files & Resources

6. **[Hugging Face Hub](https://github.com/huggingface/huggingface_hub)** - Download and manage AI models for offline use.
   - Access thousands of pre-trained models
   - CLI tools for downloading models
   - Cache models locally for offline operation

7. **[GPT4All](https://github.com/nomic-ai/gpt4all)** - Ecosystem of open-source chatbots trained on massive curated data.
   - Privacy-focused, runs 100% offline
   - Optimized for consumer-grade hardware
   - Cross-platform desktop application

These repositories provide the infrastructure and models needed to run powerful AI applications entirely offline, complementing the Offline AI Mobile AEDI application.

## Installation Directories

The application supports two installation directory configurations:

1. **Primary Directory**: `/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/[Project Name]/Install/files`
2. **Secondary Directory**: `/Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/[Project Name]/Install/files`

Models are stored in the `models/blobs` subfolder within these directories.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI.git
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
```

2. Install dependencies:
```bash
npm install
```

3. Configure your project settings in `config.json` if needed.

### Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Configuration

Edit `config.json` to customize:

- Install directory paths
- Blob file folder location
- Model update intervals
- Default offline mode state
- UI preferences

Example configuration:
```json
{
  "appName": "Offline AI Mobile AEDI",
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

## API Endpoints

- `GET /api/status` - Get current application status
- `POST /api/offline` - Toggle offline mode
- `GET /api/models/update?project=[ProjectName]` - Update models from blob files
- `GET /api/models` - Get all loaded models
- `GET /api/config` - Get application configuration

## Usage

### Toggling Offline Mode

Click the offline mode toggle switch in the UI to enable or disable offline functionality. When enabled:
- The status indicator turns blue
- The application operates in offline mode
- Models are loaded from local blob files

### Updating Models

Click the "Update Models" button to:
- Scan the configured blob file directory
- Load available model files (.blob and .bin files)
- Display model information (name, size, modification date)

## Model File Format

The application supports:
- `.blob` files
- `.bin` files

Place your model files in the configured blob directory:
`[Install Directory]/models/blobs/`

## Architecture

- **Express Server**: Lightweight web server for API and static file serving
- **ModelManager**: Core module for managing AI models and offline state
- **Responsive UI**: Modern, mobile-first interface with real-time updates
- **Configuration-Driven**: Flexible settings via JSON configuration

## Development

### Project Structure

```
.
├── index.js              # Main server application
├── modelManager.js       # Model management module
├── config.json          # Application configuration
├── package.json         # Node.js dependencies
├── public/
│   └── index.html       # Web UI
└── README.md            # This file
```

### Adding New Features

1. Update the model manager in `modelManager.js`
2. Add API endpoints in `index.js`
3. Update the UI in `public/index.html`

## License

ISC

## Author

Antwerp Designs Ionity

---

**Note**: This application is designed for offline AI model management and requires proper configuration of installation directories for full functionality.
