// src/screens/HelpSupportScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import MenuScreen from './MenuScreen';

export default function HelpSupportScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <ScrollView style={styles.container} >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help & Support</Text>

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>
      {/* CONTACT INFO SECTION */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contact Information</Text>
        <Text style={styles.contactSubtitle}>Say something to start a live chat!</Text>

        {/* Contact Details — stacked */}
        <View style={styles.infoBlock}>
          <Ionicons name="call" size={22} color={colors.white} style={styles.infoIconCentered} />
          <Text style={styles.infoTextCentered}>+1012 3456 789</Text>
        </View>

        <View style={styles.infoBlock}>
          <Ionicons name="mail" size={22} color={colors.white} style={styles.infoIconCentered} />
          <Text style={styles.infoTextCentered}>demo@gmail.com</Text>
        </View>

        <View style={styles.infoBlock}>
          <Ionicons name="location" size={22} color={colors.white} style={styles.infoIconCentered} />
          <Text style={styles.infoTextCentered}>
            132 Dartmouth Street Boston, Massachusetts 02156 United States
          </Text>
        </View>

        {/* Social Icons */}
        <View style={styles.socialRow}>
          <Ionicons name="logo-instagram" size={22} color={colors.white} style={styles.socialIcon} />
          <Ionicons name="logo-twitter" size={22} color={colors.white} style={styles.socialIcon} />
          <Ionicons name="logo-discord" size={22} color={colors.white} style={styles.socialIcon} />
        </View>
      </View>

      {/* FORM SECTION */}
      <View style={styles.formSection}>

        <Text style={styles.addressTitle}>Name</Text>
        <TextInput style={styles.input} placeholder="Name" placeholderTextColor={colors.muted} />

        <Text style={styles.addressTitle}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor={colors.muted} />

        <Text style={styles.addressTitle}>Email</Text>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.muted} />

        <Text style={styles.addressTitle}>Message</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Type your message here"
          placeholderTextColor={colors.muted}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <MenuScreen
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
  },
  headerIcon: {
    padding: spacing.md,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
    resizeMode: 'contain',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  menuText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.bold,
    height: 35,
  },
  /* CONTACT INFO STYLES */
  contactSection: {
    backgroundColor: colors.black,
    padding: spacing.lg,
    borderRadius: 16,
    marginHorizontal: spacing.xl,
    alignItems: 'center',
    width: 333,
    height: 371,
  },

  contactTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.white,

  },
  contactSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.white,
    marginBottom: spacing.md,
  },
  infoBlock: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  infoIconCentered: {
    marginBottom: spacing.md,
  },

  infoTextCentered: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },

  socialRow: { flexDirection: 'row', marginTop: spacing.md },
  socialIcon: { marginRight: spacing.md },

  /* FORM STYLES */
  formSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textDark,
  },
  addressTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    marginLeft: 5,
  },
  input: {
    backgroundColor: colors.addressbg,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: spacing.md,
  },

  /* SUBMIT BUTTON */
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: spacing.md,
  },
  submitText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
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
});