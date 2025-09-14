// src/components/BannerCarousel.js

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing,  } from '../theme';
import { fonts } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH  = width - spacing.xl * 2; // Full width minus padding and spacing
const CARD_HEIGHT = 117;
const SIDE_PADDING = (width - CARD_WIDTH) / 2;
const BANNER_GAP = spacing.xl;

export default function BannerCarousel({ banners = [] }) {
  const scrollRef = useRef(null);
  const [activeIdx, setActive] = useState(0);

  const onScroll = ({ nativeEvent }) => {
    const x = nativeEvent.contentOffset.x;
      const page = Math.round(x / width);
    setActive(page);
  };


  if (!banners.length) return null;

  return (
    <View style={styles.wrapper}>
      <ScrollView
  ref={scrollRef}
  horizontal
  showsHorizontalScrollIndicator={false}
  decelerationRate="fast"
  snapToInterval={CARD_WIDTH + BANNER_GAP}
  snapToAlignment="start"
  contentContainerStyle={{
    paddingHorizontal: SIDE_PADDING, // keeps first and last centered
  }}
  onScroll={onScroll}
  scrollEventThrottle={16}
>
  {banners.map((b, i) => (
    <View
      key={b.id}
      style={[
        styles.card,
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          marginRight: i === banners.length - 1 ? 0 : BANNER_GAP,
        },
      ]}
    >
      <View style={styles.textCol}>
        <Text style={styles.title}>{b.title}</Text>
        <Text style={styles.subtitle}>{b.subtitle}</Text>
        <TouchableOpacity style={styles.pill}>
          <Text style={styles.pillText}>{b.cta}</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={b.image}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  ))}
</ScrollView>

      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIdx ? colors.primary : colors.dotInactive },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightpink,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    // Android shadow
    elevation: 4,

  },
  textCol: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    paddingLeft: spacing.md,
    fontWeight: '1000',
  },
  subtitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textDark,
    paddingLeft: spacing.md,
  },
  pill: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginLeft: spacing.md,
  },
  pillText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.white,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderTopLeftRadius: 50,
    padding: 0,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});