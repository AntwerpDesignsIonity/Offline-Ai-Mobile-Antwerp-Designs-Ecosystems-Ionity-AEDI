/**
 * Dashboard Screen
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const DashboardScreen = ({ networkState }) => {
  const getConnectionStatus = () => {
    if (!networkState.isConnected) {
      return { text: 'Disconnected', color: '#ff4444' };
    }
    if (!networkState.isInternetReachable) {
      return { text: 'Connected (No Internet)', color: '#ffbb33' };
    }
    return { text: 'Connected', color: '#00C851' };
  };

  const status = getConnectionStatus();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Network Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
          <Text style={styles.statusText}>{status.text}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection Details</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>
              {networkState.type || 'Unknown'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Connected:</Text>
            <Text style={styles.detailValue}>
              {networkState.isConnected ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Internet Reachable:</Text>
            <Text style={styles.detailValue}>
              {networkState.isInternetReachable ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.infoText}>
          NetworkZeroMonitor provides real-time network monitoring
          with offline capability and historical data tracking.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 NetworkZeroMonitor
        </Text>
        <Text style={styles.footerText}>
          License: CC0 1.0 Universal
        </Text>
        <Text style={styles.footerText}>
          Policy 986 AED Fines Apply
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statusBadge: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
});

export default DashboardScreen;
