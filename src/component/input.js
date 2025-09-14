// src/components/Input.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../theme';

export default function Input({ style, ...props }) {
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderColor:   colors.border,
    borderWidth:   1,
    borderRadius:  8,
    paddingHorizontal: spacing.md,
    fontFamily:    fonts.regular,
    fontSize:      14,
    color:         colors.text,
    marginBottom:  spacing.lg,
    // drop shadow
    shadowColor:   colors.shadow,
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius:  4,
    elevation:     2,
  },
});