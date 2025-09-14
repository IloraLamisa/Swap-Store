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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import { getUserProfile } from '../api'; // ✅ central API service

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Session expired', 'Please log in again.');
        navigation.replace('Login');
        return;
      }

    const storedName = await AsyncStorage.getItem('userName');
const storedPhone = await AsyncStorage.getItem('userPhone');

const data = await getUserProfile(userId);
setUser({
  ...data,
  name: storedName || data?.name || data?.full_name,
  phone: storedPhone || data?.phone,
});


      
      if (data?.name || data?.full_name) {
        await AsyncStorage.setItem('userName', data.name || data.full_name);
      }
      if (data?.phone) {
        await AsyncStorage.setItem('userPhone', data.phone);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

        <TouchableOpacity onPress={() => {}} style={styles.headerIcon} activeOpacity={0.7}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* PROFILE IMAGE */}
          <View style={styles.profileCard}>
            <Image
              source={
                user?.profile_image
                  ? { uri: user.profile_image }
                  : user?.image
                  ? { uri: user.image }
                  : require('../../assets/user.png')
              }
              style={styles.profileImage}
            />
          </View>

          {/* DETAILS */}
          <View style={styles.detailsContainer}>
            {[
              { label: 'Full Name', value: user?.name || user?.full_name || '' },
              { label: 'Mobile Number', value: user?.phone || '' },
              { label: 'Email Address', value: user?.email || '' },
              { label: 'Address', value: user?.address || '' },
              { label: 'Gender', value: user?.gender || '' },
              { label: 'Age', value: user?.age != null ? String(user.age) : '' },
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
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
  },
  headerIcon: {
    padding: spacing.md,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.primary,
  },
  menuText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.bold,
    height: 35,
  },
  content: {
    padding: spacing.md,
    paddingTop: 0,
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
    width: 124,
    height: 134,
    borderRadius: 48,
    marginTop: spacing.sm,
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
    marginBottom: spacing.xl,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.textDark,
  },
  value: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textDark,
  },
  updateButton: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 12,
    alignSelf: 'center',
    width: 120,
    height: 36,
    justifyContent: 'center',
  },
  updateText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
});