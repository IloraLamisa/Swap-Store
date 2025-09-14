// src/components/ProductBottomSheet.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import { PRODUCTS } from '../../assets/data/Products';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const { height, width } = Dimensions.get('window');

export default function ProductBottomSheet({ visible, productId, onClose, onBack }) {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return null;

  const images = product.images || [product.image];

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(idx);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    onClose();
    navigation.navigate('CheckoutScreen');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Product Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            
          >
           
            {/* IMAGE CAROUSEL */}
       <View style={styles.imageContainer}>
         <FlatList
           data={images.slice(0, 5)}  // ✅ ensures only first 5 images are used
           keyExtractor={(item, index) => index.toString()}
           horizontal
           pagingEnabled
           showsHorizontalScrollIndicator={false}
           onScroll={onScroll}
           scrollEventThrottle={16}
           snapToAlignment="center"
           renderItem={({ item }) => (
      <View style={styles.imageWrapper}>
        <Image
          source={item}
          style={styles.image}
          resizeMode="contain"
                  />
                </View>
              )}
            />
            </View>

            {/* dots */}
            <View style={styles.dots}>
              {images.slice(0, 5).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    { backgroundColor: i === activeIndex ? colors.primary : colors.dotInactive },
                  ]}
                />
              ))}
            </View>
            

            {/* NAME + STATUS */}
            <View style={styles.topRow}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.inStock}>In Stock</Text>
            </View>

            {/* PRICE + RATING */}
            
              <Text style={styles.price}>Price- {product.price}৳</Text>
            <Text style={styles.rating}>⭐ {product.rating} Reviews</Text>
            {/* COLOR OPTIONS */}
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Select Color</Text>
              <View style={styles.colorRow}>
                <View style={[styles.colorSwatch, { backgroundColor: '#000', borderColor: colors.primary }]} />
                <View style={[styles.colorSwatch, { backgroundColor: '#fff' }]} />
              </View>
            </View>

            {/* QUANTITY */}
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Quantity</Text>
              <View style={styles.qtyControls}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{qty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => q + 1)}>
                  <Text style={styles.qtyBtnText}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* DESCRIPTION */}
            <Text style={styles.label}>Description</Text>
            <Text style={styles.desc}>{product.description}</Text>

            {/* ADD TO CART BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(186, 30, 152, 0.29)',
    justifyContent: 'flex-end',
  },
  sheet: {
    height: height * 0.7,
    backgroundColor: colors.white,
    overflow: 'hidden',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  imageContainer: {
    backgroundColor: colors.lightpink,
    height: 250,
    borderRadius: 16,
    marginHorizontal: spacing.xl,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: 250,
position:'relative'
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  inStock: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginVertical: spacing.sm,
  },
  optionLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    
  },
  colorRow: { flexDirection: 'row', alignItems: 'center' },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: spacing.sm,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightpink,
    borderRadius: 16,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    color: colors.textDark,
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  qtyValue: {
    fontFamily: fonts.medium,
    fontSize: 12,
    marginHorizontal: spacing.md,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    bottom: spacing.lg,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  price: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.primary,
    marginHorizontal:spacing.xl,
  },
  rating: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textDark,
    marginHorizontal:spacing.xl,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    
    
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 20,
    color: colors.textDark,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 32,
    marginHorizontal: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom:2,
  },
  
  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
});