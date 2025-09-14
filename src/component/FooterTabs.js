// src/components/FooterTabs.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../theme';

const TABS = [
  { key: 'Home', label: 'Home', icon: require('../../assets/home.png'), screen: 'HomeScreen' },
  { key: 'Cart', label: 'Cart', icon: require('../../assets/cart.png'), screen: 'OrderScreen' },
  { key: 'Profile', label: 'Profile', icon: require('../../assets/profile.png'), screen: 'ProfileScreen' },
];

export default function FooterTabs({ active }) {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.screen)}
            activeOpacity={0.8}
          >
            <Image source={tab.icon} style={styles.icon} />
            {/* ✅ Text always wrapped in <Text> */}
            <Text style={styles.label}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 32,
    backgroundColor: colors.background,
    height: 64,
    width: 252,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.textDark,
  },
});