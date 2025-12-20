/**
 * NetworkMonitor Service
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NetworkMonitor {
  constructor() {
    this.listeners = [];
    this.history = [];
    this.maxHistorySize = 1000;
  }

  /**
   * Start monitoring network state
   */
  startMonitoring(callback) {
    const unsubscribe = NetInfo.addEventListener(state => {
      const networkInfo = {
        timestamp: Date.now(),
        isConnected: state.isConnected,
        type: state.type,
        isInternetReachable: state.isInternetReachable,
        details: state.details,
      };

      this.addToHistory(networkInfo);
      callback(networkInfo);
    });

    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  /**
   * Add network state to history
   */
  addToHistory(networkInfo) {
    this.history.push(networkInfo);
    
    // Keep history size manageable
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }

    // Persist to storage
    this.saveHistory();
  }

  /**
   * Save history to persistent storage
   */
  async saveHistory() {
    try {
      await AsyncStorage.setItem(
        'network_history',
        JSON.stringify(this.history)
      );
    } catch (error) {
      console.error('Error saving network history:', error);
    }
  }

  /**
   * Load history from persistent storage
   */
  async loadHistory() {
    try {
      const historyData = await AsyncStorage.getItem('network_history');
      if (historyData) {
        this.history = JSON.parse(historyData);
      }
    } catch (error) {
      console.error('Error loading network history:', error);
    }
  }

  /**
   * Get current network state
   */
  async getCurrentState() {
    const state = await NetInfo.fetch();
    return {
      timestamp: Date.now(),
      isConnected: state.isConnected,
      type: state.type,
      isInternetReachable: state.isInternetReachable,
      details: state.details,
    };
  }

  /**
   * Get network history
   */
  getHistory(limit = 100) {
    return this.history.slice(-limit);
  }

  /**
   * Clear all listeners
   */
  clearListeners() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
  }

  /**
   * Calculate network uptime percentage
   */
  getUptimePercentage(timeRange = 3600000) { // Default 1 hour
    const now = Date.now();
    const relevantHistory = this.history.filter(
      item => now - item.timestamp <= timeRange
    );

    if (relevantHistory.length === 0) return 100;

    const connectedCount = relevantHistory.filter(
      item => item.isConnected
    ).length;

    return ((connectedCount / relevantHistory.length) * 100).toFixed(2);
  }
}

// Export both the class and a singleton instance for convenience
export { NetworkMonitor };
export default new NetworkMonitor();
