const express = require('express');
const path = require('path');
const ModelManager = require('./modelManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize model manager
const modelManager = new ModelManager();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes

/**
 * GET /api/status
 * Get current application status
 */
app.get('/api/status', (req, res) => {
  res.json({
    offlineMode: modelManager.getOfflineMode(),
    modelCount: modelManager.getModelCount(),
    models: modelManager.getModels()
  });
});

/**
 * POST /api/offline
 * Toggle offline mode
 */
app.post('/api/offline', (req, res) => {
  const { enabled } = req.body;
  const offlineMode = modelManager.setOfflineMode(enabled);
  res.json({
    success: true,
    offlineMode: offlineMode
  });
});

/**
 * GET /api/models/update
 * Update models from blob files
 */
app.get('/api/models/update', (req, res) => {
  const projectName = req.query.project || 'Default';
  
  try {
    const models = modelManager.updateModels(projectName);
    res.json({
      success: true,
      project: projectName,
      count: models.length,
      models: models
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/models
 * Get all loaded models
 */
app.get('/api/models', (req, res) => {
  res.json({
    success: true,
    count: modelManager.getModelCount(),
    models: modelManager.getModels()
  });
});

/**
 * GET /api/config
 * Get application configuration
 */
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    config: modelManager.config
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Offline AI Mobile AEDI Server started on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} in your browser`);
  console.log(`🤖 Offline mode: ${modelManager.getOfflineMode() ? 'Enabled' : 'Disabled'}`);
  console.log(`📦 Models loaded: ${modelManager.getModelCount()}`);
});

module.exports = app;
