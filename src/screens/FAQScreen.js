// src/screens/FAQScreen.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fonts } from '../theme';
import FooterTabs from '../component/FooterTabs';
import MenuScreen from './MenuScreen';

// Define different FAQ categories
const FAQ_CATEGORIES = {
  POPULAR: 'popular',
  GENERAL: 'general',
  SERVICES: 'services'
};

const FAQ_DATA = {
  [FAQ_CATEGORIES.POPULAR]: [
    {
      q: 'How do I track my workouts?',
      a: "You can log your workouts by selecting the 'Track Workout' option on the dashboard. Simply choose the type of exercise, input the duration or repetitions, and the app will automatically save your session.",
    },
    {
      q: 'Can I customize my workout plan?',
      a: 'Yes, you can fully customize your workout plan. Go to the "My Plans" section, select "Create New Plan", and choose exercises that match your goals and fitness level.'
    },
    {
      q: 'Can I sync the app with other fitness devices?',
      a: 'Our app supports integration with most popular fitness trackers and smartwatches. Go to "Settings > Connected Devices" to pair your device.'
    },
  ],
  [FAQ_CATEGORIES.GENERAL]: [
    {
      q: 'Is the app suitable for beginners?',
      a: 'Absolutely! Our app offers programs for all fitness levels, including specific beginner programs with guided tutorials and modified exercises.',
    },
    {
      q: 'How do I set fitness goals?',
      a: 'Navigate to the "Goals" tab in your profile. You can set goals for weight loss, muscle gain, endurance, or create custom goals with specific targets and timelines.'
    },
    {
      q: 'Can I use the app without a subscription?',
      a: 'Yes, we offer a free tier with basic features. However, premium features like personalized coaching and advanced analytics require a subscription.'
    },
    {
      q: 'How often is new content added?',
      a: 'We add new workout programs and exercises monthly. All subscribers get immediate access to new content as it\'s released.'
    },
  ],
  [FAQ_CATEGORIES.SERVICES]: [
    {
      q: 'Can I track my nutrition and calorie intake?',
      a: 'Yes, our premium subscription includes comprehensive nutrition tracking. You can log meals, track macros, and get personalized nutrition recommendations based on your goals.',
    },
    {
      q: 'Do you offer personal training services?',
      a: 'We offer virtual personal training through our premium subscription. You\'ll get customized workout plans and regular check-ins with a certified trainer.'
    },
    {
      q: 'What support options are available?',
      a: 'We provide email support for all users and priority chat support for premium subscribers. Our average response time is less than 24 hours.'
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes, you can cancel your subscription at any time through your account settings. You\'ll maintain access until the end of your billing period.'
    },
  ]
};

export default function FAQScreen({ navigation }) {
  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES.POPULAR);
  const [expanded, setExpanded] = useState([0]);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggle = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setExpanded([0]); // Expand first item when changing category
  };

  const currentFAQs = FAQ_DATA[activeCategory];

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

        <Text style={styles.headerTitle}>FAQ</Text>

        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.headerIcon} activeOpacity={0.7}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* CATEGORY BUTTONS */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.btn,
            activeCategory === FAQ_CATEGORIES.POPULAR ? styles.btnPrimary : styles.btnGhost
          ]}
          onPress={() => handleCategoryChange(FAQ_CATEGORIES.POPULAR)}
        >
          <Text style={
            activeCategory === FAQ_CATEGORIES.POPULAR ? styles.btnPrimaryText : styles.btnGhostText
          }>
            Popular Topic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            activeCategory === FAQ_CATEGORIES.GENERAL ? styles.btnPrimary : styles.btnGhost
          ]}
          onPress={() => handleCategoryChange(FAQ_CATEGORIES.GENERAL)}
        >
          <Text style={
            activeCategory === FAQ_CATEGORIES.GENERAL ? styles.btnPrimaryText : styles.btnGhostText
          }>
            General
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            activeCategory === FAQ_CATEGORIES.SERVICES ? styles.btnPrimary : styles.btnGhost
          ]}
          onPress={() => handleCategoryChange(FAQ_CATEGORIES.SERVICES)}
        >
          <Text style={
            activeCategory === FAQ_CATEGORIES.SERVICES ? styles.btnPrimaryText : styles.btnGhostText
          }>
            Services
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentFAQs.map((item, idx) => {
          const isOpen = expanded.includes(idx);
          return (
            <View key={idx} style={styles.item}>
              <TouchableOpacity
                style={styles.questionRow}
                onPress={() => toggle(idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.question}>{item.q}</Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textDark}
                />
              </TouchableOpacity>

              {isOpen && item.a ? (
                <Text style={styles.answer}>{item.a}</Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>

      <FooterTabs />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  headerIcon: {
    padding: spacing.xs,
    marginHorizontal: spacing.sm,
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
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  btn: {
    flex: 1,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  btnGhost: {
    backgroundColor: colors.dotInactive,
  },
  btnGhostText: {
    fontFamily: fonts.medium,
    color: colors.primary,
    fontSize: 12,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 6
  },
  btnPrimaryText: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: 12,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  item: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.dotInactive,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  question: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textDark,
    marginRight: spacing.sm,
  },
  answer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    paddingTop: spacing.xs,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textDark,
    lineHeight: 20,
  },

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
});