import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { useCart } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderSuccess from '../component/OrderSuccess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuScreen from './MenuScreen';


export default function OrderConfirmScreen({ navigation, route }) {
  const { items, clearCart } = useCart();
  const [successVisible, setSuccessVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    additionalDetails: ''
  });


  // const paymentMethod = route?.params?.paymentMethod || 'Cash on Delivery';
  const paymentMethod = 'Cash on Delivery';
  const shipping = route?.params?.shipping || 50;
  const voucher = route?.params?.voucher || 100;

  // const subtotal = useMemo(
  //   () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
  //   [items]
  // );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => {
      // Calculate discounted price for each item
      const mrp = Number(item.mrp || item.price);
      const discount = Number(item.discount || 0);
      const discountedPrice = mrp - (mrp * discount / 100);

      // Add to total: discounted price * quantity
      return sum + (discountedPrice * item.qty);
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


  // const shipping = delivery === 'Regular' ? 50 : 100;
  // const discount = totalDiscount;

  // const total = (subtotal - discount) + shipping;


  const total = subtotal + shipping;
  // const totalAmount = total - voucher;
  const totalAmount = total;


  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Submit order function
  // const submitOrder = async () => {
  //   // Validate form
  //   if (!formData.name || !formData.phone || !formData.address) {
  //     Alert.alert('Error', 'Please fill in all required fields');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // Get user data from AsyncStorage
  //     const userDataString = await AsyncStorage.getItem('loginUser');
  //     const userData = userDataString ? JSON.parse(userDataString) : null;

  //     // Prepare order data
  //     const orderData = {
  //       userid: userData?.id || '',
  //       username: formData.name,
  //       phonenumber: formData.phone,
  //       address: formData.address,
  //       notes: formData.additionalDetails,
  //       totalquantity: items.reduce((sum, item) => sum + item.qty, 0),
  //       totalprice: totalAmount,
  //       totalMRP: subtotal + totalDiscount,
  //       totalproductamount: subtotal,
  //       status: "pending",
  //       payment_method: paymentMethod,
  //       payment_status: "pending",
  //       deliverycharge: shipping,
  //       voucher: voucher,
  //       orderproductdata: items.map(item => ({
  //         product_id: item.id,
  //         product_name: item.productname,
  //         quantity: item.qty,
  //         price: item.mrp || item.price,
  //         discount: item.discount || 0,
  //         total_price: (Number(item.mrp || item.price) - (Number(item.mrp || item.price) * Number(item.discount || 0) / 100)) * item.qty
  //       })),
  //       ordertime: new Date().toLocaleTimeString(),
  //       orderdate: new Date().toLocaleDateString(),
  //     };
  //     console.log("orderDataorderData", orderData);
  //     // Submit order to API
  //     const response = await fetch('https://fitback.shop/demo1Order/new', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(orderData)
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log('Order submitted successfully:', result);

  //     // Clear cart after successful order
  //     // await AsyncStorage.removeItem('cart');

  //     // Show success modal
  //     setSuccessVisible(true);

  //   } catch (error) {
  //     console.error('Error submitting order:', error);
  //     Alert.alert('Error', 'Failed to submit order. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submitOrder = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    console.log("work");
    setLoading(true);

    try {
      const userDataString = await AsyncStorage.getItem('loginUser');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      // Prepare order data with proper data types
      const orderData = {
        userid: userData?.id ? parseInt(userData.id) : 0,
        username: formData.name.trim(),
        phonenumber: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.additionalDetails.trim(),
        totalquantity: parseInt(items.reduce((sum, item) => sum + item.qty, 0)),
        totalprice: parseFloat(totalAmount),
        totalMRP: parseFloat(subtotal + totalDiscount),
        totalproductamount: parseFloat(subtotal),
        status: "pending",
        payment_method: "Cash On Delivery",
        payment_status: "not paid",
        deliverycharge: parseFloat(shipping),
        voucher: parseFloat(voucher),
        orderproductdata: items.map(item => ({
          product_id: parseInt(item.id),
          product_name: item.productname,
          quantity: parseInt(item.qty),
          price: parseFloat(item.mrp || item.price),
          discount: parseFloat(item.discount || 0),
          total_price: parseFloat(
            (Number(item.mrp || item.price) -
              (Number(item.mrp || item.price) * Number(item.discount || 0) / 100)) * item.qty
          )
        })),
        ordertime: new Date().toLocaleTimeString('en-US', { hour12: false }),
        orderdate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      };

      console.log("Order Data:", JSON.stringify(orderData, null, 2));

      const response = await fetch('https://fitback.shop/demo1Order/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server response:', responseData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseData.message || 'Unknown error'}`);
      }

      console.log('Order submitted successfully:', responseData);

      // Clear cart after successful order
      await clearCart();

      setSuccessVisible(true);

    } catch (error) {
      console.error('Error submitting order:', error);
      Alert.alert('Error', `Failed to submit order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    submitOrder();
  };

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

        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7} onPress={() => setMenuVisible(true)}>
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
              {it.productname} x{it.qty}
            </Text>

            {/* Product Price */}
            <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>
              {/* {it.mrp * it.qty}৳ */}
              {(Number(it.mrp) - (Number(it.mrp) * Number(it.discount) / 100)) * it.qty}
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
        {/* <View style={[styles.rowBetween, { alignItems: 'center' }]}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/voucher.png')}
              style={styles.voucherIcon}
            />
            <Text style={styles.costLabel}>Voucher Applied</Text>
          </View>
          <Text style={[styles.costValue, { color: colors.textDark }]}>-{voucher}৳</Text>
        </View> */}

        {/* DIVIDER */}
        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{totalAmount}৳</Text>
        </View>

        {/* PAYMENT METHOD */}
        {/* <View style={styles.paymentRow}>
          <Text style={styles.sectionTitleInline}>Payment Method</Text>
          <View style={styles.methodValueRow}>
            <Text style={styles.valueText}>{paymentMethod}</Text>
          </View>
        </View>


        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressTitle}>Name</Text>
        <TextInput style={styles.input} placeholder="Name" placeholderTextColor={colors.muted} />
        <Text style={styles.addressTitle}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor={colors.muted} />
        <Text style={styles.addressTitle}>Address</Text>
        <TextInput style={styles.input} placeholder="Address" placeholderTextColor={colors.muted} />
        <Text style={styles.addressTitle}>Additional Details</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Additional Details"
          placeholderTextColor={colors.muted}
          multiline
        /> */}

        {/* <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => setSuccessVisible(true)}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity> */}

        <View style={styles.paymentRow}>
          <Text style={styles.sectionTitleInline}>Payment Method</Text>
          <View style={styles.methodValueRow}>
            <Text style={styles.valueText}>{paymentMethod}</Text>
          </View>
        </View>

        {/* DELIVERY ADDRESS FORM */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressTitle}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={colors.muted}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <Text style={styles.addressTitle}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={colors.muted}
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />
        <Text style={styles.addressTitle}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={colors.muted}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <Text style={styles.addressTitle}>Additional Details</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Additional Details"
          placeholderTextColor={colors.muted}
          multiline
          value={formData.additionalDetails}
          onChangeText={(text) => handleInputChange('additionalDetails', text)}
        />

        {/* CONFIRM BUTTON */}
        <TouchableOpacity
          style={[styles.confirmBtn, loading && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmText}>Confirm Order</Text>
          )}
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
      <MenuScreen
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />

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
    marginVertical: spacing.sm,
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
    marginTop: 16
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
  addressTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    marginLeft: 5,

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