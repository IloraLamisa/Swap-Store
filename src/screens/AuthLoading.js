// src/screens/AuthLoading.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme';

export default function AuthLoading({ navigation }) {
  console.log("auth loading");
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem('userId');
  //       if (userId) {
  //         // Logged in → go to Home
  //         navigation.replace('HomeScreen');
  //       } else {
  //         // Not logged in → go to Welcome1
  //         navigation.replace('Welcome1');
  //       }
  //     } catch (err) {
  //       navigation.replace('Welcome1');
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  // return (
  //   <View style={styles.container}>
  //     <ActivityIndicator size="large" color={colors.primary} />
  //   </View>
  // );

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check authentication status and app first launch
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user has already logged in
      const userData = await AsyncStorage.getItem('loginUser');
      const firstTimeLaunch = await AsyncStorage.getItem('isFirstTime');

      if (userData) {
        // User is logged in, navigate to HomeScreen
        navigation.replace('HomeScreen');
      } else if (firstTimeLaunch === null) {
        // First time launching the app, show welcome screens
        await AsyncStorage.setItem('isFirstTime', 'false');
        navigation.replace('Welcome1');
      } else {
        // Not first time and not logged in, show login screen
        navigation.replace('Login1');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // If any error occurs, default to login screen
      navigation.replace('Login1');
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});