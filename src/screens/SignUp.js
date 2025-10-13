// src/screens/SignUp.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, fonts } from '../theme';
import Input from '../component/input';
import { createUserProfile } from '../api'; // ✅ use central API service

export default function SignUp({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');

  const handleSignUp = async () => {
    if (!fullName || !phone || !pin) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      const data = await createUserProfile({
        name: fullName,
        phonenumber: phone,
        password: pin,
      });

      console.log(data?.id);

      if (data?.id) {
        await AsyncStorage.setItem('userName', fullName);
        await AsyncStorage.setItem('userPhone', phone);

        await AsyncStorage.setItem("loginUser", JSON.stringify(data));
        await AsyncStorage.setItem("userId", String(data.id));
        await AsyncStorage.setItem('user', JSON.stringify(data));
      }

      // Alert.alert('Success', 'Account created successfully');
      navigation.replace('HomeScreen');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <Text style={styles.title}>Create an account</Text>

        <Text style={styles.label}>Name</Text>
        <Input
          placeholder="Enter Your Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.inputShadow}
        />

        <Text style={styles.label}>Phone Number</Text>
        <Input
          placeholder="Enter Your Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.inputShadow}
        />

        <Text style={styles.label}>PIN</Text>
        <Input
          placeholder="Enter Your PIN"
          secureTextEntry
          keyboardType="numeric"
          value={pin}
          onChangeText={setPin}
          style={styles.inputShadow}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
    justifyContent: 'center',
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 20,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  inputShadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: { fontFamily: fonts.medium, fontSize: 16, color: colors.white },
});