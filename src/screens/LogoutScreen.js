// LogoutBottomSheet.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { colors, spacing, fonts } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LogoutBottomSheet({ visible, navigation, onCancel }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Sheet */}
        <View style={styles.sheet}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.subtitle}>Are you sure you want to logout?</Text>


          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onCancel}>
              <Text style={styles.btnGhostText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary]}
              onPress={async () => {
                await AsyncStorage.multiRemove([
                  'userId',
                  'loginUser',
                  'user',
                  'userName',
                  'userPhone'
                ]);

                navigation.replace('Login1');
              }}
            >
              <Text style={styles.btnPrimaryText}>Logout</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    // backgroundColor: '#00000030',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    height: '233',


  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.textDark,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: spacing.md,

  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.xl,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 32,
    alignItems: 'center',
  },
  btnGhost: {
    backgroundColor: colors.lightpink,
  },
  btnGhostText: {
    fontFamily: fonts.medium,
    color: colors.primary,
    fontSize: 16,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
  },
  btnPrimaryText: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: 16,
  },
});