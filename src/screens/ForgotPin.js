import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import Input from '../component/input';
import { sendOtpApi } from '../api'; // ✅ new API function

export default function ForgotPin({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    try {
      await sendOtpApi(phone);
      Alert.alert('Success', `OTP sent to ${phone}`);
      navigation.navigate('OtpVerification', { phone });
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

      {/* BODY */}
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Forgot Pin ?</Text>
        <Text style={styles.subtitle}>
          Please enter your mobile number. You will receive an OTP to create a new PIN.
        </Text>
        <Text style={styles.label}>Phone Number</Text>
        <Input
          placeholder="Enter Your Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.shadow}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Enter</Text>
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
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    justifyContent: 'left',
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
    textAlign: 'left',
    position:'relative',
    marginBottom:spacing.xl,
    
  },
  container: { flex: 1, padding: spacing.xl, justifyContent: 'center' },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.muted,
    marginBottom: spacing.xl * 2,
    textAlign: 'left',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  shadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.white,
  },
});