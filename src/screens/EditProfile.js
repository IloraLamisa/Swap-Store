import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import Input from '../component/input';
import { updateUserProfile } from '../api'; // ✅ central API service
import MenuScreen from './MenuScreen';

export default function EditProfile({ navigation, route }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Get user ID from AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          Alert.alert('Error', 'Session expired. Please log in again.');
          navigation.replace('Login');
          return;
        }
        setUserId(storedUserId);

        // Try to get user data from AsyncStorage first
        const loginUserString = await AsyncStorage.getItem('loginUser');
        if (loginUserString) {
          const loginUser = JSON.parse(loginUserString);
          setFullName(loginUser.name || '');
          setPhone(loginUser.phonenumber || '');
          setEmail(loginUser.email || '');
          setAddress(loginUser.address || '');
          setGender(loginUser.gender || '');
          setAge(loginUser.age ? String(loginUser.age) : '');
        }

        // Fetch fresh data from API
        await fetchUserProfile(storedUserId);
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data');
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`https://fitback.shop/demo1UserProfile/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();

      // Update state with API data
      setFullName(userData.name || '');
      setPhone(userData.phonenumber || '');
      setEmail(userData.email || '');
      setAddress(userData.address || '');
      setGender(userData.gender || '');
      setAge(userData.age ? String(userData.age) : '');

      // Update AsyncStorage with fresh data
      await AsyncStorage.setItem('loginUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // We'll keep the AsyncStorage data if API call fails
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (!userId) {
        Alert.alert('Error', 'Session expired. Please log in again.');
        navigation.replace('Login');
        return;
      }

      const payload = {
        name: fullName,
        email,
        address,
        gender,
        age: age ? Number(age) : null,
      };

      // Update via API
      const response = await fetch(`https://fitback.shop/demo1UserProfile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();

      // Update AsyncStorage with new data
      const loginUserString = await AsyncStorage.getItem('loginUser');
      if (loginUserString) {
        const loginUser = JSON.parse(loginUserString);
        const updatedLoginUser = {
          ...loginUser,
          ...payload
        };
        await AsyncStorage.setItem('loginUser', JSON.stringify(updatedLoginUser));
      }

      Alert.alert('Success', 'Profile updated successfully');

      navigation.navigate("ProfileScreen");
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to update profile');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

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

        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.headerIcon} activeOpacity={0.7}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        {/* Name */}
        <Text style={styles.label}>Full Name</Text>
        <Input
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        {/* Phone (read-only) */}
        <Text style={styles.label}>Mobile Number</Text>
        <Input
          value={phone}
          editable={false}
          placeholder="Your phone number"
        />

        {/* Editable fields */}
        <Text style={styles.label}>Email Address</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Address</Text>
        <Input
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />

        <Text style={styles.label}>Gender</Text>
        <Input
          value={gender}
          onChangeText={setGender}
          placeholder="Enter your gender"
        />

        <Text style={styles.label}>Age</Text>
        <Input
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter your age"
        />

        {/* Save button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
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
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.padding,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.white,
  },
});