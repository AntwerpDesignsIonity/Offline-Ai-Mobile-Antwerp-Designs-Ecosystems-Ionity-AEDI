/**
 * Dashboard Component
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */

import React from 'react';
import './Dashboard.css';
import NetworkMonitor from '../services/NetworkMonitor';

const Dashboard = ({ networkState, history }) => {
  const monitor = new NetworkMonitor();

  const getStatusColor = () => {
    return networkState.online ? '#00C851' : '#ff4444';
  };

  const getConnectionQuality = () => {
    const effectiveType = networkState.effectiveType;
    switch (effectiveType) {
      case '4g':
        return { text: 'Excellent', color: '#00C851' };
      case '3g':
        return { text: 'Good', color: '#33b5e5' };
      case '2g':
        return { text: 'Fair', color: '#ffbb33' };
      case 'slow-2g':
        return { text: 'Poor', color: '#ff4444' };
      default:
        return { text: 'Unknown', color: '#888888' };
    }
  };

  const quality = getConnectionQuality();
  const uptime = monitor.calculateUptime(history);
  const avgRTT = monitor.getAverageRTT(history);
  const avgDownlink = monitor.getAverageDownlink(history);

  return (
    <div className="Dashboard">
      <div className="Dashboard-grid">
        {/* Status Card */}
        <div className="Card">
          <h2 className="Card-title">Network Status</h2>
          <div 
            className="Status-indicator" 
            style={{ backgroundColor: getStatusColor() }}
          >
            <span className="Status-text">
              {networkState.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Connection Details Card */}
        <div className="Card">
          <h2 className="Card-title">Connection Details</h2>
          <div className="Details">
            <div className="Detail-row">
              <span className="Detail-label">Type:</span>
              <span className="Detail-value">{networkState.type}</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">Effective Type:</span>
              <span className="Detail-value">{networkState.effectiveType}</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">Quality:</span>
              <span 
                className="Detail-value" 
                style={{ color: quality.color, fontWeight: 'bold' }}
              >
                {quality.text}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics Card */}
        <div className="Card">
          <h2 className="Card-title">Performance Metrics</h2>
          <div className="Details">
            <div className="Detail-row">
              <span className="Detail-label">Downlink:</span>
              <span className="Detail-value">{networkState.downlink} Mbps</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">RTT (Round-Trip Time):</span>
              <span className="Detail-value">{networkState.rtt} ms</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">Data Saver:</span>
              <span className="Detail-value">
                {networkState.saveData ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="Card">
          <h2 className="Card-title">Statistics</h2>
          <div className="Details">
            <div className="Detail-row">
              <span className="Detail-label">Uptime:</span>
              <span className="Detail-value">{uptime}%</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">Avg RTT:</span>
              <span className="Detail-value">{avgRTT} ms</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">Avg Downlink:</span>
              <span className="Detail-value">{avgDownlink} Mbps</span>
            </div>
            <div className="Detail-row">
              <span className="Detail-label">Data Points:</span>
              <span className="Detail-value">{history.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="Info-section">
        <p className="Info-text">
          NetworkZeroMonitor provides real-time network monitoring with cross-platform
          support. This web version works on any modern browser and provides detailed
          insights into your network connection quality and performance.
        </p>
        {!monitor.isNetworkInfoSupported() && (
          <p className="Info-warning">
            ⚠️ Your browser does not fully support the Network Information API.
            Some features may be limited.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
