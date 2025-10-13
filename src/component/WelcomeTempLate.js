import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, spacing, textStrings } from '../theme';

const { width } = Dimensions.get('window');

export default function WelcomeTemplate({ activeIndex, onContinue }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />


      {/* Main Illustration */}
      <Image source={require('../../assets/welcome1.png')} style={styles.gifts} />

      {/* Text */}

      <Text style={styles.subtitle}>{textStrings.subtitle}</Text>

      {/* Navigation Dots */}
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? colors.dotActive : colors.dotInactive },
            ]}
          />
        ))}
      </View>

      {/* Continue Arrow */}
      <TouchableOpacity style={styles.arrow} onPress={onContinue}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,

  },
  logo: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },

  gifts: {
    width: 361,
    height: 283,
    resizeMode: 'contain',
    marginBottom: spacing.md,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.gapLarge,
  },
  dots: {
    flexDirection: 'row',
    marginBottom: spacing.gapLarge,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 5,
  },
  arrow: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  arrowText: {
    color: '#fff',
    fontSize: 26,
    justifyContent: 'center',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
});