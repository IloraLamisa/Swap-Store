// src/screens/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing } from '../theme';
import { getUserProfiles } from '../api'; // ✅ import from central API service

export default function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleLogin = async () => {
    if (!phone || !pin) {
      Alert.alert('Error', 'Please enter phone number and PIN');
      return;
    }
    console.log("phone", phone, "pin", pin);
    try {
      const users = await getUserProfiles();

      const match =
        Array.isArray(users) &&
        users.find(
          (u) =>
            String(u.phonenumber).trim() === String(phone).trim() &&
            String(u.password).trim() === String(pin).trim()
        );

      if (!match) {
        Alert.alert("Login Failed", "Invalid phone or PIN");
        return;
      }

      // Save logged in user
      await AsyncStorage.setItem("loginUser", JSON.stringify(match));
      await AsyncStorage.setItem("userId", String(match.id));
      await AsyncStorage.setItem('user', JSON.stringify(match));

      console.log("Login Success:", match);
      navigation.replace("HomeScreen");
    } catch (err) {
      Alert.alert("Error", err.message);
    }


  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Phone Number */}
      <TextInput
        style={[styles.input, styles.shadow]}
        placeholder="Enter Your Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* PIN */}
      <View style={[styles.pinContainer, styles.shadow]}>
        <TextInput
          style={styles.pinInput}
          placeholder="******"
          placeholderTextColor="#999"
          secureTextEntry={!showPin}
          keyboardType="numeric"
          value={pin}
          onChangeText={setPin}
        />
        <TouchableOpacity onPress={() => setShowPin(!showPin)}>
          <Text style={styles.eye}>{showPin ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot PIN */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPin')}>
        <Text style={styles.forgot}>Forgot PIN?</Text>
      </TouchableOpacity>

      {/* Log In Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signup}>
        Don't have an account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.padding,
    justifyContent: 'center',
  },
  logo: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoAccent: { color: colors.primary },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: spacing.gapMedium,
    backgroundColor: 'white',
    fontSize: 16,
    color: colors.textDark,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  pinInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  eye: { fontSize: 18, paddingHorizontal: 8 },
  forgot: {
    color: colors.primary,
    textAlign: 'right',
    marginBottom: spacing.gapLarge,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: spacing.gapMedium,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signup: { textAlign: 'center', fontSize: 14, color: colors.textDark },
  signupLink: { color: colors.primary, fontWeight: 'bold' },

  // ✅ Shared shadow style for inputs
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
});