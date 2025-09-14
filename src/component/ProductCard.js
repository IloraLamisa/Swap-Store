import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../theme';

export default function ProductCard({ product, onPress = () => {} }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress(product)}
    >
      <View style={styles.row}>
        <Text style={styles.discount}>{product.discount}% OFF</Text>
      </View>

      <Image source={product.image} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>{product.price}৳</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.lightpink,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 80,
    height: 75,
    backgroundColor: colors.lightpink,
    alignSelf: 'center',
    
    marginVertical:spacing.xl,

  },
  info: {
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    height: 80,
    position: 'relative',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    fontSize: 10,
    color: colors.textDark,
    marginBottom: 4,
    fontFamily: fonts.regular,
    lineHeight:22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discount: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: fonts.regular,
    paddingTop: 8,
    paddingLeft: 8,
    overflow: 'hidden',
    position: 'absolute',
    lineHeight:22,
    zIndex: 1,
  },
  price: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    lineHeight:22,
  },
});