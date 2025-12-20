# Offline AI Copilot - Examples

## CLI Examples

### 1. Interactive Mode
The easiest way to get started:
```bash
npm run build
node dist/cli.js interactive
```

Select from the menu:
- 💬 Chat with AI
- 📝 Code Completion
- 🚀 Generate Text

### 2. Chat Mode
Have a conversation with the AI:
```bash
node dist/cli.js chat
```

Example conversation:
```
You: How do I reverse a string in JavaScript?
AI Copilot: You can reverse a string using split, reverse, and join...

You: Can you show me an example?
AI Copilot: Sure! Here's an example...
```

### 3. Code Completion

Create a file `example.js`:
```javascript
function calculateSum(a, b) {
    // TODO: implement
```

Run completion:
```bash
node dist/cli.js complete example.js
```

### 4. Text Generation
```bash
node dist/cli.js generate "Write a function that finds the maximum value in an array"
```

With custom parameters:
```bash
node dist/cli.js generate "Explain async/await" --length 200 --temperature 0.7
```

## API Examples

### Using cURL

#### Chat Request
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how can you help me?"}'
```

#### Code Completion
```bash
curl -X POST http://localhost:3000/api/complete \
  -H "Content-Type: application/json" \
  -d '{"code": "function fibonacci(n) {", "maxTokens": 50}'
```

#### Text Generation
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a story about AI", "maxLength": 100, "temperature": 0.8}'
```

### Using JavaScript/Fetch

```javascript
// Chat example
async function chat(message) {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  console.log(data.response);
}

// Code completion example
async function completeCode(code) {
  const response = await fetch('http://localhost:3000/api/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, maxTokens: 50 })
  });
  
  const data = await response.json();
  console.log(data.completion);
}
```

### Using Python

```python
import requests

# Chat
def chat(message):
    response = requests.post('http://localhost:3000/api/chat', 
        json={'message': message})
    return response.json()['response']

# Code completion
def complete_code(code):
    response = requests.post('http://localhost:3000/api/complete',
        json={'code': code, 'maxTokens': 50})
    return response.json()['completion']

# Usage
print(chat("Hello AI!"))
print(complete_code("function hello() {"))
```

## Android Integration

### Using with Termux

1. Install Termux from F-Droid or Play Store
2. Install Node.js:
```bash
pkg install nodejs
```

3. Clone and run:
```bash
git clone <repo-url>
cd Offline-Ai-Mobile-Antwerp-Designs-Ecosystems-Ionity-AEDI
npm install
npm run build
node dist/cli.js chat
```

### Cordova/Capacitor Integration

Add to your Cordova/Capacitor app:

```javascript
// Start local server
const { exec } = require('child_process');
exec('node dist/server.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`Server: ${stdout}`);
});

// Use the API
fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
})
.then(res => res.json())
.then(data => console.log(data.response));
```

## Advanced Usage

### Custom Model Configuration

```javascript
import { TransformerLLM } from './core/transformer';

const customModel = new TransformerLLM({
  vocabSize: 15000,
  embeddingDim: 512,
  numHeads: 8,
  numLayers: 6,
  maxSeqLength: 1024,
  ffnDim: 2048
});

const response = await customModel.generate("Your prompt here");
```

### Context-Aware Chat

```javascript
const context = [
  "User: What is JavaScript?",
  "Assistant: JavaScript is a programming language...",
  "User: Can you show me an example?",
];

const response = await model.chat("Make it interactive", context);
```

### Temperature Control

Lower temperature (0.3-0.5) for code:
```bash
node dist/cli.js generate "function sort array" --temperature 0.3
```

Higher temperature (0.8-1.2) for creative text:
```bash
node dist/cli.js generate "Write a story" --temperature 1.0
```

## Web Interface Examples

Open `http://localhost:3000` in your browser after starting the server.

### Features:
1. **Chat Tab**: Interactive conversation
2. **Code Completion Tab**: Paste code and get completions
3. **Generate Tab**: Text generation with custom parameters
4. **Info Tab**: System and model information

### Mobile Web App

Add to home screen on Android:
1. Open Chrome on Android
2. Navigate to `http://localhost:3000`
3. Tap menu → "Add to Home Screen"
4. Launch like a native app!

## Performance Tips

1. **Reduce maxSeqLength** for faster inference on mobile
2. **Lower temperature** for more deterministic outputs
3. **Batch requests** when possible
4. **Cache common completions** in your app
5. **Use smaller maxTokens** for code completion

## Troubleshooting

### Memory Issues on Android
Reduce model size in config:
```javascript
{
  embeddingDim: 128,
  numLayers: 2,
  maxSeqLength: 256
}
```

### Slow Generation
- Reduce maxLength parameter
- Lower temperature
- Use shorter prompts

### Server Won't Start
Check if port 3000 is available:
```bash
PORT=8080 npm run server
```
