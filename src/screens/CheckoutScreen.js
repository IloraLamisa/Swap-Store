// src/screens/CheckoutScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { items, changeQty } = useCart();
  console.log("items", items);

  const [delivery, setDelivery] = React.useState('Regular');
  const [coupon, setCoupon] = React.useState('');

  // const subtotal = useMemo(
  //   () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
  //   [items]
  // );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => {
      // Calculate discounted price for each item
      const mrp = Number(item.mrp || item.price);
      // const discount = Number(item.discount || 0);
      // const discountedPrice = mrp - (mrp * discount / 100);

      // Add to total: discounted price * quantity
      return sum + (mrp * item.qty);
    }, 0),
    [items]
  );

  const totalDiscount = useMemo(
    () => items.reduce((sum, item) => {
      const mrp = Number(item.mrp || item.price);
      const discountPercent = Number(item.discount || 0);
      const discountAmountPerItem = mrp * (discountPercent / 100); // Discount per single item
      return sum + (discountAmountPerItem * item.qty); // Total discount for all quantities
    }, 0),
    [items]
  );


  const shipping = delivery === 'Regular' ? 50 : 100;
  const discount = totalDiscount;

  const total = (subtotal - discount) + shipping;

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

        <Text style={styles.headerTitle}>My Cart</Text>

        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* CART ITEMS */}
        {items.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: spacing.xl }}>
            Your cart is empty
          </Text>
        )}

        {items.map((it) => (
          <View key={it.id} style={styles.itemCard}>
            <View style={styles.imageview}>
              <Image source={it.image1 ? { uri: it.image1 } : ""} style={styles.itemImage} resizeMode="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{it.productname}</Text>
              <Text style={styles.itemPrice}>{it.mrp}৳</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => changeQty(it.id, -1)}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{it.qty}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => changeQty(it.id, 1)}
                >
                  <Text style={styles.qtyBtnText}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* DELIVERY TYPE */}
        <Text style={styles.sectionTitle}>Delivery type</Text>
        <View style={styles.deliveryRow}>
          {['Regular', 'Express'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.deliveryPill,
                delivery === type && styles.deliveryActive,
              ]}
              onPress={() => setDelivery(type)}
            >
              <Text
                style={[
                  styles.deliveryText,
                  delivery === type && { color: colors.white },
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* COUPON */}
        <Text style={styles.sectionTitle}>Coupon</Text>
        <View style={styles.couponRow}>
          <TextInput
            style={styles.couponInput}
            placeholder="Enter coupon code"
            placeholderTextColor={colors.muted}
            value={coupon}
            onChangeText={setCoupon}
          />
          <TouchableOpacity style={styles.couponBtn}>
            <Text style={styles.couponBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* ORDER INFO */}
        <Text style={styles.sectionTitle}>Order Info</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Subtotal</Text>
            <Text style={styles.infoValue}>{subtotal}৳</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shipping cost</Text>
            <Text style={styles.infoValue}>{shipping}৳</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Discount</Text>
            <Text style={[styles.infoValue, styles.discountValue]}>
              -{discount}৳
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total}৳</Text>
          </View>
        </View>

        {/* CHECKOUT BUTTON */}
        {items.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('OrderScreen')}
          >
            <Text style={styles.checkoutText}>Check out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

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
  menuText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.bold,
    height: 35,
  },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 4


  },
  imageview: {
    backgroundColor: colors.lightpink,
    borderRadius: 16,
    width: 158,
    height: 96,
    alignContent: 'center'


  },
  itemImage: {
    width: 160,
    height: 110,
  },
  itemName: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textDark,
    marginLeft: spacing.md,
  },
  itemPrice: {
    marginTop: spacing.sm,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.primary,
    marginLeft: spacing.md,

  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.lightpink,
    width: 95,
    borderRadius: 16

  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  qtyBtnText: {
    color: colors.textDark,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  qtyValue: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginHorizontal: spacing.md,
  },

  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: colors.textDark,
  },

  deliveryRow: { flexDirection: 'row' },
  deliveryPill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deliveryActive: { backgroundColor: colors.primary },
  deliveryText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
  },

  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    fontFamily: fonts.regular,
    color: colors.textDark,
    backgroundColor: colors.white,
  },
  couponBtn: {
    height: 44,
    marginLeft: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.white,
  },

  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  infoLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
  },
  infoValue: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
  },
  discountValue: { color: colors.primary },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textDark,
  },
  totalValue: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.primary,
  },

  checkoutBtn: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.white,
  },
});