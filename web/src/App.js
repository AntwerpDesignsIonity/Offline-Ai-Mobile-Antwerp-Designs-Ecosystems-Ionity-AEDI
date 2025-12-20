/**
 * NetworkZeroMonitor Web Application
 * 
 * Author: Johan Wilhelm van Antwerp
 * Statement: "Anything is possible With God Of All Creation"
 * 
 * License: CC0 1.0 Universal
 * Policy 986 AED Fines Apply
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import NetworkMonitor from './services/NetworkMonitor';

function App() {
  const [networkState, setNetworkState] = useState({
    online: navigator.onLine,
    type: 'unknown',
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Initialize network monitor
    const monitor = new NetworkMonitor();

    // Update network state
    const updateNetworkState = () => {
      const state = monitor.getCurrentState();
      setNetworkState(state);
      setHistory(prev => [...prev.slice(-99), state]); // Keep last 100 entries
    };

    // Set up listeners
    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    // Check if Network Information API is available
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', updateNetworkState);
    }

    // Initial state
    updateNetworkState();

    // Periodic updates
    const interval = setInterval(updateNetworkState, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', updateNetworkState);
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Dashboard networkState={networkState} history={history} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
