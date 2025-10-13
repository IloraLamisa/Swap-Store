// src/screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { colors, spacing, fonts } from '../theme';

import BannerCarousel from '../component/BannerCarousel';
import CategoryGrid from '../component/CategoryGrid';
import ProductCard from '../component/ProductCard';
import ProductBottomSheet from '../component/ProductBottomSheet';
import FooterTabs from '../component/FooterTabs';
// import { POPULAR } from '../../assets/data/popular';
import { banners } from '../../assets/data/banner';
// import { categories } from '../../assets/data/categoriesIcon';
import MenuScreen from './MenuScreen';
import { getProducts } from '../api';
// import { categories } from '../data/categoryIcons';
// import CategoryGrid from '../components/CategoryGrid';




export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [selected, setSelected] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);


  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("categories", categories);
  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fitback.shop/demo1Category/');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Assuming the API returns an array of categories
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        // If the API returns an object with categories property
        setCategories(data.categories || data.data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const [allProducts, setAllProducts] = useState([]);
  const [loadingTwo, setLoadingTwo] = useState(true);

  const fetchCategoryProducts = async () => {
    try {
      setLoadingTwo(true);
      const products = await getProducts();



      setAllProducts(products);

    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoadingTwo(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const openProduct = (item) => {
    setSelected(item.id); // store the product ID instead of object
    setSheetVisible(true);
  };


  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content"
        backgroundColor="transparent"
        translucent />

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>


      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        <BannerCarousel banners={banners} />

        {/* category */}
        <CategoryGrid
          items={categories}
          onPress={(cat) =>
            navigation.navigate('CategoryProductsScreen', { categoryName: cat.name, categoryId: cat.id })
          }
        />


        <Text style={styles.sectionTitle}>Popular Products 🔥</Text>
        <FlatList
          data={allProducts.slice(0, 4)}
          keyExtractor={i => i.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={openProduct} />
          )}
          contentContainerStyle={{ paddingHorizontal: spacing.xl }}
        />
      </ScrollView>

      {/* BOTTOM SHEET + TABS */}
      <ProductBottomSheet
        visible={sheetVisible}
        productId={selected}
        onClose={() => setSheetVisible(false)}
        onBack={() => setSheetVisible(false)}
      />



      <MenuScreen
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />


      <FooterTabs active={activeTab} onChange={setActiveTab} />
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    paddingTop: StatusBar.currentHeight || spacing.md,

  },
  logo: {
    width: 75,
    height: 75,
  },
  searchWrap: {
    flex: 1,
    marginHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    color: colors.text,
    position: 'absolute',
    paddingLeft: spacing.md,
  },
  menuText: {
    fontSize: 26,
    color: colors.primary,
    fontFamily: fonts.bold,
    // height: 35,
    // backgroundColor: "red"
  },
  content: {
    paddingBottom: spacing.lg + 60, // leave space for footer tabs
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginLeft: spacing.xl,
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.textDark,
  },
  productRow: {
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
});