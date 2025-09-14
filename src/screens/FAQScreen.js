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

const FAQS = [
  {
    q: 'How do I track my workouts?',
    a:
      "You can log your workouts by selecting the 'Track Workout' option on the dashboard. Simply choose the type of exercise, input the duration or repetitions, and the app will automatically save your session.",
  },
  { q: 'Can I customize my workout plan?', a: '' },
  { q: 'Can I sync the app with other fitness devices?', a: '' },
  { q: 'Can I track my nutrition and calorie intake?', a: '' },
  { q: 'Is the app suitable for beginners?', a: '' },
  { q: 'How do I set fitness goals?', a: '' },
];

export default function FAQScreen({ navigation }) {
  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // track which indices are expanded
  const [expanded, setExpanded] = useState([0]);

  const toggle = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER (same as ElectronicsScreen) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>FAQ</Text>

        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
     
      </View>
          <View style={styles.row}>
            
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.replace('Login1')}>
              <Text style={styles.btnPrimaryText}>Popular Topic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => navigation.replace('HomeScreen')}>
              <Text style={styles.btnGhostText}>General</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => navigation.replace('HomeScreen')}>
              <Text style={styles.btnGhostText}>Services</Text>
            </TouchableOpacity>
          </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {FAQS.map((item, idx) => {
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
      <FooterTabs></FooterTabs>
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
  row: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    gap: spacing.md ,
  },
  btn: {
    flex: 1,
    
    borderRadius: 32,
    alignItems: 'center',
    padding:5,
    height:26,
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
    borderRadius: 30,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor:colors.dotInactive,
  },
  question: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textDark,
    marginRight: spacing.sm,
    
  },
  answer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textDark,
  },
});