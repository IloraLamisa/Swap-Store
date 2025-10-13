// src/screens/SettingScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, fonts } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuScreen from './MenuScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Move PasswordChangeModal component outside of the main function
const PasswordChangeModal = ({
  visible,
  onClose,
  loading,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleChangePassword
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={() => !loading && onClose()}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Change Password</Text>
          <TouchableOpacity
            onPress={() => !loading && onClose()}
            disabled={loading}
          >
            <Ionicons name="close" size={24} color={colors.textDark} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            placeholder="Enter current password"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="Enter new password"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Confirm new password"
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.changePasswordButton, loading && styles.buttonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.changePasswordButtonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function SettingScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters long');
      return;
    }

    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'Session expired. Please log in again.');
        navigation.replace('Login');
        return;
      }

      // Get user data to verify current password
      const loginUserString = await AsyncStorage.getItem('loginUser');
      if (!loginUserString) {
        Alert.alert('Error', 'User data not found');
        return;
      }

      const userData = JSON.parse(loginUserString);

      // Verify current password
      if (userData.password !== currentPassword) {
        Alert.alert('Error', 'Current password is incorrect');
        return;
      }

      // Update password via API
      const response = await fetch(`https://fitback.shop/demo1UserProfile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local storage with new password
      const updatedUserData = {
        ...userData,
        password: newPassword
      };
      await AsyncStorage.setItem('loginUser', JSON.stringify(updatedUserData));

      Alert.alert('Success', 'Password changed successfully');

      // Reset form and close modal
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setChangePasswordModal(false);

    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ACCOUNT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.7}
            onPress={() => setChangePasswordModal(true)}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.optionText}>Change Password</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.muted}
            />
          </TouchableOpacity>

        </View>
      </ScrollView>

      <MenuScreen
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />

      <PasswordChangeModal
        visible={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        loading={loading}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleChangePassword={handleChangePassword}
      />
    </SafeAreaView>
  );
}

// Keep the styles object as is...
const styles = StyleSheet.create({
  // ... your existing styles
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
  section: {
    width: '100%',
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.textDark,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: spacing.md,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textDark,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.textDark,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  changePasswordButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    backgroundColor: colors.muted,
  },
  changePasswordButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});