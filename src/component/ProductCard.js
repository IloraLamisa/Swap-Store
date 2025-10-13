// src/components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { BASE_URL } from '../api'; // ✅ export BASE_URL from api.js

export default function ProductCard({ product, onPress = () => { } }) {
  // Determine image source
  let imageSource;
  if (typeof product.image1 === 'string') {
    // If it's already a full URL, use it directly
    imageSource = product.image1.startsWith('http')
      ? { uri: product.image1 }
      : { uri: `${BASE_URL}${product.image1}` }; // prepend API base if relative path
  } else {
    // Local require() asset
    imageSource = product.image1;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress(product)}
    >
      {/* Discount */}
      {product.discount ? (
        <View style={styles.row}>
          <Text style={styles.discount}>{product.discount}% OFF</Text>
        </View>
      ) : null}

      {/* Product Image */}
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      {/* Info */}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {product.productname}
        </Text>
        <View style={styles.row}>
          {/* <Text style={styles.price}>{Number(product.mrp) - Number(product.discount)}৳</Text> */}
          <Text style={styles.price}>

            {Number(product.mrp) - (Number(product.mrp) * Number(product.discount) / 100)}৳
          </Text>
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
    marginVertical: spacing.xl,
  },
  info: {
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    height: 80,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    fontSize: 12,
    color: colors.textDark,
    marginBottom: 4,
    fontFamily: fonts.semiBold,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discount: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    paddingTop: 8,
    paddingLeft: 8,
    position: 'absolute',
    lineHeight: 22,
    zIndex: 1,
  },
  price: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    lineHeight: 22,
  },
});