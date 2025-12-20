const fs = require('fs');
const path = require('path');

class ModelManager {
  constructor(configPath = './config.json') {
    try {
      this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      console.error(`Failed to load config from ${configPath}: ${error.message}`);
      // Use default configuration
      this.config = {
        installDirectories: {
          primary: "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
          secondary: "/Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
          installSubpath: "Install/files"
        },
        modelSettings: {
          blobFileFolder: "models/blobs",
          updateInterval: 3600000,
          offlineMode: true
        },
        ui: {
          enableOfflineButton: true,
          defaultOfflineState: false
        }
      };
    }
    this.models = [];
    this.offlineMode = this.config.ui.defaultOfflineState;
  }

  /**
   * Get the full install path for a project
   * @param {string} projectName - Name of the project
   * @param {boolean} useSecondary - Use secondary install directory
   * @returns {string} Full install path
   */
  getInstallPath(projectName, useSecondary = false) {
    const baseDir = useSecondary 
      ? this.config.installDirectories.secondary 
      : this.config.installDirectories.primary;
    return path.join(baseDir, projectName, this.config.installDirectories.installSubpath);
  }

  /**
   * Read blob files from the configured folder
   * @param {string} projectName - Name of the project
   * @returns {Array} Array of model blob files
   */
  readBlobFiles(projectName) {
    try {
      const installPath = this.getInstallPath(projectName);
      const blobFolder = path.join(installPath, this.config.modelSettings.blobFileFolder);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(blobFolder)) {
        fs.mkdirSync(blobFolder, { recursive: true });
        console.log(`Created blob folder: ${blobFolder}`);
        return [];
      }

      const files = fs.readdirSync(blobFolder);
      const blobFiles = files.filter(file => file.endsWith('.blob') || file.endsWith('.bin'));
      
      console.log(`Found ${blobFiles.length} blob file(s) in ${blobFolder}`);
      return blobFiles.map(file => ({
        name: file,
        path: path.join(blobFolder, file),
        size: fs.statSync(path.join(blobFolder, file)).size,
        modified: fs.statSync(path.join(blobFolder, file)).mtime
      }));
    } catch (error) {
      console.error(`Error reading blob files: ${error.message}`);
      return [];
    }
  }

  /**
   * Update models from blob files
   * @param {string} projectName - Name of the project
   */
  updateModels(projectName) {
    console.log('Updating models from blob files...');
    this.models = this.readBlobFiles(projectName);
    console.log(`Loaded ${this.models.length} model(s)`);
    return this.models;
  }

  /**
   * Toggle offline mode
   * @param {boolean} enabled - Enable or disable offline mode
   */
  setOfflineMode(enabled) {
    this.offlineMode = enabled;
    console.log(`Offline mode ${enabled ? 'enabled' : 'disabled'}`);
    return this.offlineMode;
  }

  /**
   * Get current offline mode status
   * @returns {boolean} Current offline mode status
   */
  getOfflineMode() {
    return this.offlineMode;
  }

  /**
   * Get all loaded models
   * @returns {Array} Array of loaded models
   */
  getModels() {
    return this.models;
  }

  /**
   * Get model count
   * @returns {number} Number of loaded models
   */
  getModelCount() {
    return this.models.length;
  }
}

module.exports = ModelManager;
