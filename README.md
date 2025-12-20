# 🤖 Offline AI Copilot

![GitHub](https://img.shields.io/badge/GitHub-Copilot_Inspired-blue?logo=github)
![Offline](https://img.shields.io/badge/Mode-100%25_Offline-green)
![Android](https://img.shields.io/badge/Android-7%2B_Compatible-brightgreen?logo=android)
![Node](https://img.shields.io/badge/Node.js-14%2B-339933?logo=node.js)

**GitHub Copilot-inspired Offline AI Assistant** - A fully functional, lightweight LLM running completely offline on any system, including Android 7+. Built with modern JavaScript/TypeScript and an efficient transformer architecture.

## ✨ Features

- 🔒 **100% Offline** - No internet connection required after installation
- 📱 **Mobile Ready** - Optimized for Android 7+ and all major platforms
- ⚡ **Efficient** - Small, optimized transformer model for fast inference
- 💬 **Chat Interface** - Interactive AI chat via CLI
- 📝 **Code Completion** - GitHub Copilot-style code suggestions
- 🚀 **Text Generation** - General purpose text generation
- 🌐 **Web API** - REST API for hybrid mobile/web applications
- 🎨 **GitHub Branding** - Beautiful CLI and web interface inspired by GitHub Copilot
- 🖥️ **Cross-Platform** - Works on Linux, macOS, Windows, and Android

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/AntwerpDesignsIonity/Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI.git
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI

# Install dependencies
npm install

# Build the project
npm run build
```

### CLI Usage

```bash
# Interactive mode
ai-copilot interactive

# Start a chat session
ai-copilot chat

# Complete code from a file
ai-copilot complete mycode.js

# Generate text from a prompt
ai-copilot generate "Write a function that sorts an array"

# View system information
ai-copilot info
```

### Web API Server

```bash
# Start the API server
npm run server

# Server will run on http://localhost:3000
# Open browser to see the web interface
```

## 📖 API Documentation

### REST Endpoints

#### Health Check
```http
GET /health
```

#### Chat
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Hello, how can you help?",
  "context": ["Previous conversation..."]
}
```

#### Code Completion
```http
POST /api/complete
Content-Type: application/json

{
  "code": "function hello() {",
  "maxTokens": 50
}
```

#### Text Generation
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "Write a story about",
  "maxLength": 100,
  "temperature": 0.8
}
```

#### Model Info
```http
GET /api/info
```

## 🏗️ Architecture

### Efficient Transformer Model

The core LLM uses a lightweight transformer architecture optimized for:
- **Low Memory Footprint** - Runs on devices with limited RAM
- **Fast Inference** - Optimized for CPU execution
- **Small Model Size** - Easy to package and distribute
- **Mobile Compatibility** - Works on Android 7+ devices

### Technology Stack

- **TypeScript** - Type-safe development
- **Node.js** - Cross-platform runtime
- **Express** - Web API framework
- **Commander** - CLI framework
- **Chalk & Ora** - Beautiful terminal UI
- **TensorFlow.js** - Optional ML acceleration (future enhancement)

## 📱 Android Deployment

This application is ready for Android deployment:

1. **Requirements**: Android 7+ (API Level 24+)
2. **Node.js**: Use Termux or similar Node.js runtime for Android
3. **Package**: Can be packaged with Cordova/Capacitor for Play Store

### Building for Android

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# The dist/ folder contains the compiled application
# Package with your preferred mobile framework (Cordova, Capacitor, etc.)
```

## 🎨 Web Interface

The web interface provides:
- **Chat Mode** - Interactive conversation with AI
- **Code Completion** - Real-time code suggestions
- **Text Generation** - Creative text generation
- **System Info** - View model and system details
- **GitHub Theme** - Beautiful dark theme inspired by GitHub

Access at: `http://localhost:3000` when server is running

## 🔧 Configuration

### Model Configuration

Edit `src/core/transformer.ts` to adjust:
- `vocabSize` - Vocabulary size (default: 10000)
- `embeddingDim` - Embedding dimensions (default: 256)
- `numHeads` - Attention heads (default: 4)
- `numLayers` - Transformer layers (default: 4)
- `maxSeqLength` - Max sequence length (default: 512)

### Server Configuration

Set environment variables:
```bash
export PORT=3000  # API server port
```

## 📚 Examples

### Example 1: Code Completion
```bash
ai-copilot complete example.js
```

### Example 2: Interactive Chat
```bash
ai-copilot chat
> How do I sort an array in JavaScript?
```

### Example 3: Text Generation
```bash
ai-copilot generate "Write a function that calculates fibonacci"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by GitHub Copilot
- Built for the Antwerp Designs Ionity ecosystem
- Designed for offline-first mobile AI applications

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation
- Review the examples

## 🌟 Star Us!

If you find this project useful, please give it a star ⭐ on GitHub!

---

**Made with ❤️ by Antwerp Designs Ionity**
