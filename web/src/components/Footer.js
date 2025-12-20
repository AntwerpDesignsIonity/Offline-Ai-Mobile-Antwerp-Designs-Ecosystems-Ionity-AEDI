/**
 * Footer Component
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer-content">
        <p className="Footer-copyright">
          © 2025 NetworkZeroMonitor - All Rights Reserved
        </p>
        <p className="Footer-license">
          Licensed under Creative Commons CC0 1.0 Universal
        </p>
        <p className="Footer-policy">
          <strong>Policy 986 AED Fines Apply</strong>
        </p>
        <p className="Footer-author">
          Created by Johan Wilhelm van Antwerp
        </p>
      </div>
    </footer>
  );
};

export default Footer;
