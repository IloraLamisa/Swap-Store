import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import Input from '../component/input';
import { updateUserProfile } from '../api'; // ✅ central API service


export default function EditProfile({ navigation, route }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const loadData = async () => {
      // Load from AsyncStorage (saved at signup/profile fetch)
      const storedName = await AsyncStorage.getItem('userName');
      const storedPhone = await AsyncStorage.getItem('userPhone');

      setFullName(storedName || '');
      setPhone(storedPhone || '');

      // If coming from ProfileScreen with user data
      if (route.params?.user) {
        const u = route.params.user;
        setEmail(u.email || '');
        setAddress(u.address || '');
        setGender(u.gender || '');
        setAge(u.age != null ? String(u.age) : '');
      }
    };
    loadData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'Session expired. Please log in again.');
        navigation.replace('Login');
        return;
      }

      const payload = {
        email,
        address,
        gender,
        age: age ? Number(age) : null,
      };

      await updateUserProfile(userId, payload);

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>

        {/* Name (read-only) */}
        <Text style={styles.label}>Full Name</Text>
        <Input value={fullName} editable={false} />

        {/* Phone (read-only) */}
        <Text style={styles.label}>Mobile Number</Text>
        <Input value={phone} editable={false} />

        {/* Editable fields */}
        <Text style={styles.label}>Email Address</Text>
        <Input value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Address</Text>
        <Input value={address} onChangeText={setAddress} />

        <Text style={styles.label}>Gender</Text>
        <Input value={gender} onChangeText={setGender} />

        <Text style={styles.label}>Age</Text>
        <Input
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Save button */}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.padding,
  },
  headerIcon: {
    padding: spacing.md,
    alignSelf: 'flex-start',
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
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.white,
  },
});