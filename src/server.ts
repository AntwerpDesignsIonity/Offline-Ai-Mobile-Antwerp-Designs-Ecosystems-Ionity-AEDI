/**
 * Web API Server for Hybrid Mode
 * Provides REST API for browser/mobile app integration
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import { TransformerLLM } from './core/transformer';

const app = express();
const model = new TransformerLLM();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Offline AI Copilot API',
    version: '1.0.0',
    mode: 'offline',
    timestamp: new Date().toISOString()
  });
});

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await model.chat(message, context || []);
    
    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate chat response',
      details: (error as Error).message
    });
  }
});

// Code completion endpoint
app.post('/api/complete', async (req: Request, res: Response) => {
  try {
    const { code, maxTokens } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const completion = await model.complete(code, maxTokens || 50);
    
    res.json({
      success: true,
      completion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Completion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate code completion',
      details: (error as Error).message
    });
  }
});

// Text generation endpoint
app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, maxLength, temperature } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await model.generate(
      prompt,
      maxLength || 100,
      temperature || 0.8
    );
    
    res.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate text',
      details: (error as Error).message
    });
  }
});

// Model info endpoint
app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    model: 'Efficient Transformer',
    mode: 'offline',
    capabilities: ['chat', 'code-completion', 'text-generation'],
    platform: process.platform,
    architecture: process.arch,
    nodeVersion: process.version,
    androidCompatible: true,
    minAndroidVersion: '7.0'
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║          🤖 Offline AI Copilot API Server                 ║');
  console.log('║          GitHub Copilot Inspired - Offline Mode           ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API URL: http://localhost:${PORT}`);
  console.log('✓ Mode: Offline');
  console.log('✓ Android 7+ Compatible');
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  /health              - Health check`);
  console.log(`  GET  /api/info            - Model information`);
  console.log(`  POST /api/chat            - Chat with AI`);
  console.log(`  POST /api/complete        - Code completion`);
  console.log(`  POST /api/generate        - Text generation`);
  console.log('');
});

export default server;
