// src/screens/MenuScreen.js

import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Animated,
  BackHandler,
  Platform,
  SafeAreaView,
  TouchableOpacity,

} from 'react-native';
import { colors, spacing, fonts } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import LogoutBottomSheet from './LogoutScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PANEL_WIDTH = 303;
const PANEL_HEIGHT = 676;

export default function MenuScreen({
  visible,
  onClose,
  navigation,
  top = 0,
  right = 0,
}) {

  const [loginUser, setLoginUser] = useState();
  console.log("loginUser", loginUser);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to get user data from AsyncStorage first
        const loginUserString = await AsyncStorage.getItem('loginUser');
        if (loginUserString) {
          const loginUser = JSON.parse(loginUserString);
          setLoginUser(loginUser);
        }

      } catch (error) {
        Alert.alert('Error', 'Failed to load user data');
        console.error('Error loading data:', error);
      } finally {
      }
    };

    loadData();
  }, []);


  const slideX = useRef(new Animated.Value(PANEL_WIDTH + right)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideX, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(backdrop, {
          toValue: 0.4,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideX, {
          toValue: PANEL_WIDTH + right,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, right, slideX, backdrop]);

  useEffect(() => {
    if (!visible) return;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [visible, onClose]);

  // menu items configuration
  const menuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: require('../../assets/menu/profile.png'),
      action: () => {
        onClose();
        navigation.navigate('ProfileScreen');
      },
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: require('../../assets/menu/settings.png'),
      action: () => {
        onClose();
        navigation.navigate('SettingsScreen');
      },
    },
    {
      key: 'orders',
      label: 'Order History',
      icon: require('../../assets/menu/orderHistory.png'),
      action: () => {
        onClose();
        navigation.navigate('OrderHistoryScreen');
      },
    },
    {
      key: 'support',
      label: 'Help & Support',
      icon: require('../../assets/menu/help.png'),
      action: () => {
        onClose();
        navigation.navigate('HelpSupportScreen');
      },
    },
    {
      key: 'faq',
      label: 'FAQs',
      icon: require('../../assets/menu/faq.png'),
      action: () => {
        onClose();
        navigation.navigate('FAQScreen');
      },
    },
    {
      key: 'rate',
      label: 'Rate App',
      icon: require('../../assets/menu/rate.png'),
      action: () => {
        onClose();
        navigation.navigate('RateAppScreen');
      },
    },
    {
      key: 'terms',
      label: 'Terms & Conditions',
      icon: require('../../assets/menu/term.png'),
      action: () => {
        onClose();
        navigation.navigate('TermsScreen');
      },
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
      >
        {/* Backdrop */}
        <Animated.View
          style={[styles.backdrop, { opacity: backdrop }]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
          />
        </Animated.View>

        {/* Sliding Panel */}
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.panel,
              {
                top,
                right,
                width: PANEL_WIDTH,
                height: PANEL_HEIGHT,
                transform: [{ translateX: slideX }],
              },
            ]}
          >
            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeButton}
              // onPress={() => navigation.navigate()}
              onPress={() => onClose()}
              activeOpacity={0.7}>

              <Ionicons name="close" size={24} color={colors.primary} />
            </TouchableOpacity>


            {/* Profile */}
            <View style={styles.profileSection}>
              {/* <Image
                source={require('../../assets/LadyProfile.png')}
                style={styles.profileImage}
              /> */}

              <Image
                source={
                  loginUser?.image
                    ? { uri: user.image }
                    : require('../../assets/user.png')
                }
                style={styles.profileImage}
              />

              <Text style={styles.profileName}>{loginUser?.name}</Text>
            </View>

            {/* Menu Items */}
            {menuItems.map(({ key, label, icon, action }) => (
              <TouchableOpacity
                key={key}
                style={styles.menuItem}
                onPress={action}
                activeOpacity={0.7}>



                <Image source={icon} style={styles.menuIcon} />
                <Text style={styles.menuText}>{label}</Text>
              </TouchableOpacity>

            ))}

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Logout Button */}
            <Pressable
              style={styles.logoutButton}
              onPress={() => {
                setShowLogoutModal(true); // Show logout modal
              }}
            >
              <Image
                source={require('../../assets/menu/logout.png')}
                style={styles.logoutIcon}
              />
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>

      {/* Logout Modal */}
      <LogoutBottomSheet
        visible={showLogoutModal}
        navigation={navigation}
        onCancel={() => setShowLogoutModal(false)} // Close the modal
        onConfirm={() => {
          setShowLogoutModal(false); // Close the modal
          onClose(); // Close the sidebar
          // Add your logout logic here
        }}
      />
    </>

  );
}

const styles = StyleSheet.create({

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: colors.backdrop,
    justifyContent: 'flex-end',
  },
  panel: {
    flex: 1,
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: spacing.md,
    zIndex: 1,
    color: colors.primary,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: spacing.lg + spacing.md,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
    borderBottomWidth: .5,
    paddingBottom: spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.md,
  },
  profileName: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textDark,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md + 2,
    marginLeft: spacing.md,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: spacing.md,
  },
  menuText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    marginLeft: spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg * 1.5,
    width: 192,
    height: 44,

  },
  logoutIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: spacing.md,
  },
  logoutText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.lightpink,
    marginLeft: spacing.sm,
  },
});