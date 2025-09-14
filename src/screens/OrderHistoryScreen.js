// src/screens/OrderScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import { useCart } from '../context/CartContext';

export default function OrderScreen({ navigation }) {
  const { items } = useCart();
  const [activeTab, setActiveTab] = useState('Active');

  // Example: using cart data to create order rows
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const orders = [
    {
      id: '00001',
      date: '10/10/2024',
      itemCount: items.length,
      total: subtotal.toFixed(2),
    },
    {
      id: '00002',
      date: '10/10/2024',
      itemCount: items.length - 1 >= 0 ? items.length - 1 : 0,
      total: (subtotal * 0.85).toFixed(2),
    },
  ];

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

        <Text style={styles.headerTitle}>Order History</Text>

        <TouchableOpacity
          onPress={() => {}}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

     {/* STATUS BUTTONS */}
<View style={styles.statusButtons}>
  <TouchableOpacity
    style={[styles.statusBtn, { backgroundColor: colors.primary }]}
    
  >
    <Text style={styles.statusBtnText}>Active</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.statusBtn}
   
  >
    <Text style={styles.statusBtnText2}>Completed</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.statusBtn}
   
  >
    <Text style={styles.statusBtnText2}>Canceled</Text>
  </TouchableOpacity>
</View>
      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Order</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Date</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Item</Text>
        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Total (tk)</Text>
      </View>

      {/* ORDER LIST */}
      <ScrollView>
        {orders.map(order => (
          <View style={styles.tableRow} key={order.id}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{order.id}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{order.date}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{order.itemCount}</Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>{order.total}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  /* HEADER (yours) */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
  },
  headerIcon: { padding: spacing.md },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  menuText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.bold,
    height: 35,
  },

  statusButtons: {
  flexDirection: 'row',
  marginHorizontal: spacing.lg,
 marginVertical:spacing.md,
 paddingVertical:spacing.sm,
  justifyContent: 'space-between',
  backgroundColor:colors.greybg,
},    
statusBtn: {
  flex: 1,
  marginHorizontal: 4,
  paddingVertical: spacing.sm,
  borderRadius: 8,
  backgroundColor: colors.background,
  alignItems: 'center',
  justifyContent: 'center',
},
statusBtnText: {
  fontFamily: fonts.medium,
  fontSize: 14,
  color: colors.background,
},
statusBtnText2: {
  fontFamily: fonts.medium,
  fontSize: 14,
  color: colors.primary,
},

  /* TABLE */
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginHorizontal:spacing.md
  },
  tableHeaderText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textDark,
    borderBottomWidth: 1,
    borderColor:colors.dotInactive,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
   backgroundColor:colors.addressbg,
   marginVertical:spacing.sm,
   marginHorizontal:spacing.xl,
  },
  tableCell: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textDark,
  },
});