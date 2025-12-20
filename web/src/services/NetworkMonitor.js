/**
 * Network Monitor Service for Web
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */

class NetworkMonitor {
  constructor() {
    this.connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;
  }

  /**
   * Get current network state
   */
  getCurrentState() {
    const state = {
      online: navigator.onLine,
      timestamp: Date.now(),
      type: 'unknown',
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false,
    };

    if (this.connection) {
      state.type = this.connection.type || 'unknown';
      state.effectiveType = this.connection.effectiveType || 'unknown';
      state.downlink = this.connection.downlink || 0;
      state.rtt = this.connection.rtt || 0;
      state.saveData = this.connection.saveData || false;
    }

    return state;
  }

  /**
   * Check if browser supports Network Information API
   */
  isNetworkInfoSupported() {
    return !!this.connection;
  }

  /**
   * Get connection type
   */
  getConnectionType() {
    if (!this.connection) return 'unknown';
    return this.connection.type || 'unknown';
  }

  /**
   * Get effective connection type (4g, 3g, 2g, slow-2g)
   */
  getEffectiveType() {
    if (!this.connection) return 'unknown';
    return this.connection.effectiveType || 'unknown';
  }

  /**
   * Get downlink speed in Mbps
   */
  getDownlink() {
    if (!this.connection) return 0;
    return this.connection.downlink || 0;
  }

  /**
   * Get round-trip time in ms
   */
  getRTT() {
    if (!this.connection) return 0;
    return this.connection.rtt || 0;
  }

  /**
   * Check if data saver mode is enabled
   */
  isSaveDataEnabled() {
    if (!this.connection) return false;
    return this.connection.saveData || false;
  }

  /**
   * Calculate uptime percentage from history
   */
  calculateUptime(history) {
    if (history.length === 0) return 100;
    
    const onlineCount = history.filter(state => state.online).length;
    return ((onlineCount / history.length) * 100).toFixed(2);
  }

  /**
   * Get average RTT from history
   */
  getAverageRTT(history) {
    if (history.length === 0) return 0;
    
    const validRTTs = history.filter(state => state.rtt > 0);
    if (validRTTs.length === 0) return 0;
    
    const sum = validRTTs.reduce((acc, state) => acc + state.rtt, 0);
    return (sum / validRTTs.length).toFixed(2);
  }

  /**
   * Get average downlink from history
   */
  getAverageDownlink(history) {
    if (history.length === 0) return 0;
    
    const validDownlinks = history.filter(state => state.downlink > 0);
    if (validDownlinks.length === 0) return 0;
    
    const sum = validDownlinks.reduce((acc, state) => acc + state.downlink, 0);
    return (sum / validDownlinks.length).toFixed(2);
  }
}

export default NetworkMonitor;
