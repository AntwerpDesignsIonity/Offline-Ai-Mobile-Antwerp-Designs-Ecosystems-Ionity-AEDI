/**
 * NetworkZeroMonitor Mobile Application
 * 
 * Author: Johan Wilhelm van Antwerp
 * Statement: "Anything is possible With God Of All Creation"
 * 
 * License: CC0 1.0 Universal
 * Policy 986 AED Fines Apply
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NetworkMonitor from './services/NetworkMonitor';
import DashboardScreen from './screens/DashboardScreen';
import { Colors } from './utils/Colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [networkState, setNetworkState] = useState({
    isConnected: false,
    type: 'none',
    isInternetReachable: false,
  });

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState({
        isConnected: state.isConnected,
        type: state.type,
        isInternetReachable: state.isInternetReachable,
      });
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.header}>
            <Text style={styles.title}>NetworkZeroMonitor</Text>
            <Text style={styles.author}>Johan Wilhelm van Antwerp</Text>
            <Text style={styles.motto}>
              "Anything is possible With God Of All Creation"
            </Text>
          </View>
          <DashboardScreen networkState={networkState} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  motto: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
});

export default App;
