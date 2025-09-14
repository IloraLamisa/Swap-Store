// src/screens/GroceryScreen.js

import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import ProductCard from '../component/ProductCard';
import FooterTabs from '../component/FooterTabs';
import ProductBottomSheet from '../component/ProductBottomSheet';

import {
  getGroceryProducts,
  getGroceryOnSaleProducts,
} from '../../assets/data/Products';

export default function GroceryScreen({ navigation }) {
  const allGrocery = useMemo(() => getGroceryProducts(), []);
  const onSaleGrocery = useMemo(() => getGroceryOnSaleProducts(), []);

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [sheetVisible, setSheetVisible] = useState(false);
  
    const openProduct = (item) => {
      setSelectedProductId(item.id);
      setSheetVisible(true);
    };
  
    const closeProductSheet = () => {
      setSheetVisible(false);
      setSelectedProductId(null);
        };
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

        <Text style={styles.headerTitle}>Grocery</Text>

        <TouchableOpacity
          onPress={() => {}}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* All Grocery Section */}
        <Text style={styles.sectionTitle}>Popular Products🔥</Text>
        <FlatList
          data={allGrocery}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
           renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => openProduct(item)}
            />
          )}
        />

        {/* On Sale Grocery Section */}
        <Text style={styles.sectionTitle}>On Sale 🔥</Text>
        <FlatList
          data={onSaleGrocery}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
           renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => openProduct(item)}
            />
          )}
        />
      </ScrollView>
      <FooterTabs/>
       <ProductBottomSheet
              visible={sheetVisible}
              productId={selectedProductId}
              onClose={closeProductSheet}
              onBack={closeProductSheet}
            />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  headerIcon: {
    padding: spacing.xl,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.primary,
  },
  menuText: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.bold,
    height: 35,
  },

  scrollContent: {
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textDark,
    marginHorizontal: spacing.xl,
    marginVertical: spacing.md,
  },

  listContent: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
});