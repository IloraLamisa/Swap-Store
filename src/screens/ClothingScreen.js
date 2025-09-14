// src/screens/ClothingScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';

import ProductCard from '../component/ProductCard';
import FooterTabs from '../component/FooterTabs';
import ProductBottomSheet from '../component/ProductBottomSheet';
import { getProducts } from '../api';

export default function ClothingScreen({ navigation }) {
  const [allClothing, setAllClothing] = useState([]);
  const [onSaleClothing, setOnSaleClothing] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchClothingProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();

      // Filter by category name (case-insensitive, supports category or category_name)
      const clothing = products.filter(
        (p) =>
          p.category?.toLowerCase() === 'clothing' ||
          p.category_name?.toLowerCase() === 'clothing'
      );
      setAllClothing(clothing);

      // On-sale subset (supports either on_sale flag or discount > 0)
      const onSale = clothing.filter(
        (p) => p.on_sale === true || (typeof p.discount === 'number' && p.discount > 0)
      );
      setOnSaleClothing(onSale);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothingProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER (unchanged UI) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Clothing</Text>

        <TouchableOpacity
          onPress={() => {}}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* All Clothing Section */}
          <Text style={styles.sectionTitle}>Popular Products🔥</Text>
          <FlatList
            data={allClothing}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={() => openProduct(item)} />
            )}
          />

          {/* On Sale Clothing Section */}
          <Text style={styles.sectionTitle}>On Sale 🔥</Text>
          <FlatList
            data={onSaleClothing}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={() => openProduct(item)} />
            )}
          />
        </ScrollView>
      )}

      <FooterTabs />

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