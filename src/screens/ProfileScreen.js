// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import MenuScreen from './MenuScreen';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Session expired', 'Please log in again.');
        navigation.replace('Login');
        return;
      }

      // Fetch fresh data from API
      const response = await fetch(`https://fitback.shop/demo1UserProfile/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();

      // Update state with API data
      setUser(userData);

      // Update AsyncStorage with fresh data
      await AsyncStorage.setItem('loginUser', JSON.stringify(userData));

      // Also update individual fields for compatibility
      if (userData.name) {
        await AsyncStorage.setItem('userName', userData.name);
      }
      if (userData.phonenumber) {
        await AsyncStorage.setItem('userPhone', userData.phonenumber);
      }

    } catch (err) {
      console.error('Error fetching user profile:', err);

      // Fallback to AsyncStorage data if API fails
      try {
        const loginUserString = await AsyncStorage.getItem('loginUser');
        if (loginUserString) {
          const loginUserData = JSON.parse(loginUserString);
          setUser(loginUserData);
        } else {
          Alert.alert('Error', 'Failed to load profile data. Please try again.');
        }
      } catch (parseError) {
        Alert.alert('Error', 'Failed to load profile data.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadStoredData = async () => {
    try {
      const loginUserString = await AsyncStorage.getItem('loginUser');
      if (loginUserString) {
        const loginUserData = JSON.parse(loginUserString);
        setLoginUser(loginUserData);
        setUser(loginUserData); // Set initial data from storage
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  useEffect(() => {
    // Load stored data first for immediate display
    loadStoredData();
    // Then fetch fresh data from API
    fetchUserProfile();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserProfile();
  };

  if (loading && !user) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={styles.headerIcon}
            activeOpacity={0.7}
          >
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={handleRefresh}
      //     colors={[colors.primary]}
      //     tintColor={colors.primary}
      //   />
      // }
      >
        {/* PROFILE IMAGE */}
        <View style={styles.profileCard}>
          <Image
            source={
              user?.image
                ? { uri: user.image }
                : require('../../assets/user.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profilePhone}>{user?.phonenumber || ''}</Text>
        </View>

        {/* DETAILS */}
        <View style={styles.detailsContainer}>
          {[
            { label: 'Full Name', value: user?.name || 'Not set' },
            { label: 'Mobile Number', value: user?.phonenumber || 'Not set' },
            { label: 'Email Address', value: user?.email || 'Not set' },
            { label: 'Address', value: user?.address || 'Not set' },
            { label: 'Gender', value: user?.gender || 'Not set' },
            { label: 'Age', value: user?.age ? String(user.age) : 'Not set' },
            { label: 'City', value: user?.city || 'Not set' },
            { label: 'Occupation', value: user?.occupation || 'Not set' },
          ].map((item, index) => (
            <View style={styles.detailsRow} key={index}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* UPDATE BUTTON */}
        <TouchableOpacity
          style={styles.updateButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('EditProfile', { user })}
        >
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      <MenuScreen
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontFamily: fonts.regular,
    color: colors.textDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButton: {
    padding: spacing.sm,
    marginRight: spacing.xs,
  },
  headerIcon: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.primary,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  headerIcon: { padding: spacing.md },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.primary,
  },

  menuText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  content: {
    padding: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },
  profileName: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  profilePhone: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
  },
  value: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
    textAlign: 'right',
  },
  updateButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignSelf: 'center',
    minWidth: 150,
    alignItems: 'center',
  },
  updateText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.white,
  },
});