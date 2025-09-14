import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import { sendOtpApi, verifyOtpApi } from '../api'; // ✅ new API functions

export default function OtpVerification({ navigation, route }) {
  const { phone } = route.params || {};
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (phone) handleSendOtp();
  }, [phone]);

  const handleSendOtp = async () => {
    try {
      await sendOtpApi(phone);
      Alert.alert('OTP Sent', `Code sent to ${phone}`);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 4) inputsRef.current[index + 1]?.focus();
  };

  const handleVerify = async () => {
    const otp = code.join('');
    if (otp.length < 5) {
      Alert.alert('Error', 'Enter the 5-digit code');
      return;
    }
    try {
      await verifyOtpApi(phone, otp);
      Alert.alert('Success', 'OTP verified');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

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
          <Ionicons name="arrow-back" size={26} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.iconlabel}>back</Text>
              <View style={styles.headerIcon} />
            </View>

      <View style={styles.container}>
         <Text style={styles.headerTitle}>Verification</Text>
        <Text style={styles.subtitle}>Enter the 5-digit code sent to {phone}</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.codeInput, styles.shadow]}
              maxLength={1}
              keyboardType="numeric"
              secureTextEntry
              ref={(ref) => (inputsRef.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSendOtp} style={{ marginTop: spacing.md }}>
          <Text style={{ color: colors.primary }}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: 'space-between',
  },
headerIcon: { padding: spacing.sm ,},
   position:"absolute",
  iconlabel:{ fontFamily: fonts.semiBold,
    position:"static",
    color:colors.primary,

  },
    headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 26,
    color: colors.primary,
    textAlign: 'center',
    position:'relative',
    marginBottom:spacing.xl,
    
  },
  container: { flex: 1, padding: spacing.padding, justifyContent: 'center', alignItems: 'center' },
  subtitle: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing.gapLarge,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: spacing.gapLarge,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    color: colors.textDark,
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});