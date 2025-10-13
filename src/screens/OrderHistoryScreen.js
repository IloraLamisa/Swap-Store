// src/screens/OrderScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import MenuScreen from './MenuScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Active');
  const [menuVisible, setMenuVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://fitback.shop/demo1Order/?userid=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        console.error('Failed to fetch orders:', data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Active') {
      return order.status === 'pending' || order.status === 'processing';
    } else if (activeTab === 'Completed') {
      return order.status === 'completed' || order.status === 'delivered';
    } else if (activeTab === 'Canceled') {
      return order.status === 'cancelled' || order.status === 'failed';
    }
    return true;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

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
          onPress={() => setMenuVisible(true)}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* STATUS BUTTONS */}
      <View style={styles.statusButtons}>
        <TouchableOpacity
          style={[styles.statusBtn, activeTab === 'Active' && styles.activeStatusBtn]}
          onPress={() => setActiveTab('Active')}
        >
          <Text style={[styles.statusBtnText, activeTab === 'Active' && styles.activeStatusBtnText]}>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusBtn, activeTab === 'Completed' && styles.activeStatusBtn]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.statusBtnText, activeTab === 'Completed' && styles.activeStatusBtnText]}>
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusBtn, activeTab === 'Canceled' && styles.activeStatusBtn]}
          onPress={() => setActiveTab('Canceled')}
        >
          <Text style={[styles.statusBtnText, activeTab === 'Canceled' && styles.activeStatusBtnText]}>
            Canceled
          </Text>
        </TouchableOpacity>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={64} color={colors.muted} />
          <Text style={styles.emptyText}>No {activeTab.toLowerCase()} orders found</Text>
        </View>
      ) : (
        <>
          {/* TABLE HEADER */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Order ID</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Date</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Items</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>Total (tk)</Text>
          </View>

          {/* ORDER LIST */}
          <ScrollView style={styles.ordersContainer}>
            {filteredOrders.map(order => (
              <TouchableOpacity
                style={styles.orderItem}
                key={order.id}
                onPress={() => navigation.navigate('OrderDetails', { order })}
              >
                <View style={styles.orderRow}>
                  <Text style={[styles.orderCell, { flex: 1.5 }]}>#{order.id}</Text>
                  <Text style={[styles.orderCell, { flex: 1.5 }]}>{formatDate(order.orderdate)}</Text>
                  <Text style={[styles.orderCell, { flex: 1, textAlign: "center" }]}>{order.totalquantity}</Text>
                  <Text style={[styles.orderCell, styles.totalCell, { flex: 1.5 }]}>{order.totalprice}</Text>
                </View>
                {/* <View style={styles.statusContainer}>
                  <Text style={[styles.statusText,
                  {
                    color: order.status === 'pending' ? colors.warning :
                      order.status === 'completed' ? colors.success :
                        order.status === 'cancelled' ? colors.error : colors.textDark
                  }
                  ]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </View> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      <MenuScreen
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontFamily: fonts.regular,
    color: colors.textDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  headerIcon: {
    padding: spacing.md
  },
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
  statusButtons: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    padding: 4,
    backgroundColor: colors.greybg,
    borderRadius: 8,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStatusBtn: {
    backgroundColor: colors.primary,
  },
  statusBtnText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
  },
  activeStatusBtnText: {
    color: colors.white,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: spacing.md,
  },
  tableHeaderText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textDark,
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  orderItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
    borderBottomWidth: 1
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCell: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textDark,
  },
  totalCell: {
    textAlign: 'right',
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  statusContainer: {
    marginTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.xs,
  },
  statusText: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    marginTop: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.muted,
  },
});