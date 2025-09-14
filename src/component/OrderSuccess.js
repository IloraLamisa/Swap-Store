// src/components/OrderSuccess.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { colors, spacing, fonts } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OrderSuccess({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={26} color={colors.primary} />
          </TouchableOpacity>

          {/* Success Icon */}
          <Image
            source={require('../../assets/success.png')}
            style={styles.image}
          />

          {/* Success Message */}
          <Text style={styles.message}>
            Your order has been placed successfully
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(186, 30, 152, 0.29)', // translucent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 336,
    height: 228,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
    padding: spacing.md,
  },
  image: {
    width: 72,
    height: 72,
    marginBottom: spacing.md,
    resizeMode: 'contain',
    marginTop:spacing.md*3,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    paddingHorizontal:spacing.md,
  },
});