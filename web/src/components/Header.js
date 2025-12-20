/**
 * Header Component
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="Header">
      <div className="Header-content">
        <h1 className="Header-title">NetworkZeroMonitor</h1>
        <p className="Header-subtitle">Cross-Platform Network Monitoring</p>
        <p className="Header-author">by Johan Wilhelm van Antwerp</p>
        <p className="Header-motto">"Anything is possible With God Of All Creation"</p>
      </div>
    </header>
  );
};

export default Header;
