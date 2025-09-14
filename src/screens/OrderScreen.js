import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { useCart } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderSuccess from '../component/OrderSuccess';


export default function OrderConfirmScreen({ navigation, route }) {
  const { items } = useCart();
  const [successVisible, setSuccessVisible] = useState(false);


  
  const paymentMethod = route?.params?.paymentMethod || 'Cash on Delivery';
  const shipping = route?.params?.shipping || 50;
  const voucher = route?.params?.voucher || 100;

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const total = subtotal + shipping;
  const totalAmount = total - voucher;

  return (
    <View style={styles.container}>
      {/* HEADER (unchanged) */}
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

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        
        {/* TITLE */}
        <Text style={styles.sectionHeader}>Order Summary</Text>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableTitle, { flex: 2 }]}>Name</Text>
          <Text style={[styles.tableTitle, { flex: 1, textAlign: 'right' }]}>Price</Text>
        </View>

        {/* TABLE ROWS */}
        {items.map((it, index) => (
  <View key={it.id} style={styles.tableRow}>
    {/* Serial Number */}
    <Text style={[styles.tableCell, { width: 15 }]}>{index + 1}.</Text>

    {/* Product Name */}
    <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={1}>
      {it.name} x{it.qty}
    </Text>

    {/* Product Price */}
    <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>
      {it.price * it.qty}৳
    </Text>
  </View>
))}


 <View style={styles.divider} />


        {/* COST BREAKDOWN */}
        <View style={styles.rowBetween}>
          <Text style={styles.costLabel}>Subtotal</Text>
          <Text style={styles.costValue}>{subtotal}৳</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.costLabel}>Shipping cost</Text>
          <Text style={styles.costValue}>{shipping}৳</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.costLabel}>Total</Text>
          <Text style={styles.costValue}>{total}৳</Text>
        </View>

        {/* VOUCHER WITH ICON */}
        <View style={[styles.rowBetween, { alignItems: 'center' }]}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/voucher.png')}
              style={styles.voucherIcon}
            />
            <Text style={styles.costLabel}>Voucher Applied</Text>
          </View>
          <Text style={[styles.costValue, { color: colors.textDark }]}>-{voucher}৳</Text>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{totalAmount}৳</Text>
        </View>

        {/* PAYMENT METHOD */}
       <View style={styles.paymentRow}>
        <Text style={styles.sectionTitleInline}>Payment Method</Text>
      <View style={styles.methodValueRow}>
       <Text style={styles.valueText}>{paymentMethod}</Text>
     </View>
        </View>


        {/* DELIVERY ADDRESS FORM */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressTitle}>Name</Text>
        <TextInput style={styles.input}   placeholder="Name" placeholderTextColor={colors.muted} />
        <Text style={styles.addressTitle}>Phone Number</Text>
        <TextInput style={styles.input}  placeholder="Phone Number" placeholderTextColor={colors.muted} />
        <Text style={styles.addressTitle}>Address</Text>
        <TextInput style={styles.input}   placeholder="Address" placeholderTextColor={colors.muted} />
        <Text style={styles.addressTitle}>Additional Details</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Additional Details"
          placeholderTextColor={colors.muted}
          multiline
        />

        {/* CONFIRM BUTTON */}
       <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => setSuccessVisible(true)}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

      {/* Success modal */}
      <OrderSuccess
        visible={successVisible}
        onClose={() => {
          setSuccessVisible(false);
          navigation.navigate('HomeScreen'); // or wherever you want after closing
        }}
      />


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  /* HEADER — unchanged from your code */
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

  /* NEW LAYOUT STYLES */
  sectionHeader: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
   
  },
  tableTitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },
 tableCell: {
  fontFamily: fonts.regular,
  fontSize: 14,
  color: colors.textDark,
},


  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: spacing.xl * 5,
    marginVertical:spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center' },

  costLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
  },
  costValue: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
  },
  voucherIcon: {
    width: 41,
    height: 41,
    marginRight: 6,
    resizeMode: 'contain',
  },
  divider: {
    height: 1,
    backgroundColor: colors.textDark,
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textDark,
  },
  totalValue: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textDark,
  },

  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textDark,
  },
sectionTitleInline: {
  fontFamily: fonts.semiBold,
  fontSize: 12,
  color: colors.textDark,
},

  paymentRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: colors.white,
  borderRadius: 12,
  paddingVertical: spacing.sm,
  marginBottom: spacing.md,
},

  methodValueRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
valueText: {
  fontFamily: fonts.regular,
  fontSize: 12,
  color: colors.textDark,
},


  input: {
    backgroundColor: colors.addressbg,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
addressTitle:{
  fontFamily: fonts.medium,
  fontSize: 14,
  color: colors.textDark,
  marginLeft:5,

},
  confirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: 32,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  confirmText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.white,
  },
});