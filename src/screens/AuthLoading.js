// src/screens/AuthLoading.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme';

export default function AuthLoading({ navigation }) {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          // Logged in → go to Home
          navigation.replace('HomeScreen');
        } else {
          // Not logged in → go to Welcome1
          navigation.replace('Welcome1');
        }
      } catch (err) {
        navigation.replace('Welcome1');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});