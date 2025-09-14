import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';

const { height } = Dimensions.get('window');

export default function RateAppWindow({ navigation, onClose }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const Star = ({ index }) => (
    <TouchableOpacity onPress={() => setRating(index)}>
      <Ionicons
        name={index <= rating ? 'star' : 'star-outline'}
        size={40}
        color={colors.muted}
        style={{ marginHorizontal: 16 }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}> </Text>

        <TouchableOpacity
          onPress={() => {}}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>
      {/* BOTTOM CONTAINER */}
      <View style={styles.sheet}>
        {/* TOP ROW: Google Play + Profile */}
        <View style={styles.topRow}>
          <Text style={styles.googleText}>Google Play</Text>
          <View style={styles.profileRow}>
           
            <Text style={styles.profileName}>Piya</Text>
            <Image
              source={require('../../assets/profile.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
 <View style={styles.divider} />
        {/* APP LOGO + NAME */}
        <View style={styles.appRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.appLogo}
          />
          <Text style={styles.appName}>App name</Text>
        </View>

        {/* NOTE */}
        <Text style={styles.note}>
          Your review is public and includes your Google profile name and photo.
        </Text>

        {/* STAR RATING */}
        <View style={styles.starRow}>
          {[1,  2,  3,  4,  5].map(i => (
            <Star key={i} index={i} />
          ))}
        </View>

        {/* REVIEW INPUT */}
        <TextInput
          style={styles.reviewInput}
          placeholder="(Optional) Tell others what you think"
          placeholderTextColor={colors.muted}
          multiline
          value={review}
          onChangeText={setReview}
        />

        {/* BUTTONS */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnGhost]}
            onPress={onClose}
          >
            <Text style={styles.btnGhostText}>Not now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
            <Text style={styles.btnPrimaryText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
  },
  headerIcon: { padding: spacing.md },
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

  /* BOTTOM CONTAINER */
sheet: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: height * 0.5,
  backgroundColor: colors.background,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 45 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 50,
},


  /* TOP ROW INSIDE CONTAINER */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:spacing.md+spacing.sm,
  },
  googleText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textDark,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 28, height: 28, borderRadius: 14, marginRight: 2,marginLeft:8 },
  profileName: { fontFamily: fonts.medium, fontSize: 18, color: colors.textDark },
  
  divider: {
  height: 1,
  backgroundColor: colors.dotInactive,
  },
  /* APP ROW */
  appRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, padding:spacing.md+spacing.sm, },
  appLogo: { width: 44, height: 44, marginRight: spacing.md, borderRadius: 6 },
  appName: { fontFamily: fonts.semiBold, fontSize: 16, color: colors.textDark },

  /* NOTE */
  note: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textDark,
    marginBottom: spacing.md,
    marginHorizontal:spacing.xl,
  },

  /* STARS */
  starRow: { flexDirection: 'row', padding:spacing.sm, marginBottom: spacing.xl,marginLeft:spacing.md  },

  /* INPUT */
  reviewInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: colors.textDark,
    borderRadius: 10,
    padding: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
    height: 60,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
    marginHorizontal:spacing.md,
  },

  /* BUTTONS */
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal:spacing.xl,
    height:40,
  },
  btnGhost: {
    backgroundColor: colors.background,
    marginRight: spacing.sm,
    borderColor:colors.dotInactive,
    borderWidth:1,
  },
  btnGhostText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  btnPrimaryText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.white,
  },
});