// src/components/CategoryGrid.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, spacing, fonts } from '../theme';

const { width } = Dimensions.get('window');
const NUM_COLS = 5;
const ITEM_SIZE =
  (width - spacing.xl * 2 - spacing.md * (NUM_COLS - 1)) / NUM_COLS;

export default function CategoryGrid({ items = [], onPress = () => {} }) {
  return (
    <View style={styles.container}>
      {items.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={[styles.item, { width: ITEM_SIZE }]}
          onPress={() => onPress(cat)}
          activeOpacity={0.8}
        >
          <View style={styles.iconWrap}>
            <Image
              source={
                cat.icon
                  ? cat.icon // local PNG asset from your list
                  : cat.image
                  ? { uri: cat.image } // API-provided image if present
                  : require('../../assets/default-category.png')
              }
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {cat.title || cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  item: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 36,
    height: 36,
  },
  label: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textDark,
    textAlign: 'center',
  },
});