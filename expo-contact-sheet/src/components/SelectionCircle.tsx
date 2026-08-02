import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { colors } from '../theme';

type Props = {
  visible: boolean;
};

/** Messy hand-drawn blue circle overlay for the focused frame */
export function SelectionCircle({ visible }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.86)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: visible ? 280 : 160,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: visible ? 1 : 0.86,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, opacity, scale]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrap,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <View style={styles.svgBox}>
        <Svg width="100%" height="100%" viewBox="0 0 100 130">
          <Ellipse
            cx="50"
            cy="65"
            rx="42"
            ry="56"
            stroke={colors.select}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            opacity={0.95}
          />
          {/* imperfect second pass for a sketchy feel */}
          <Path
            d="M18 70 C16 40, 30 12, 52 10 C78 8, 90 38, 88 68 C86 98, 70 120, 46 122 C24 124, 14 98, 18 70"
            stroke={colors.select}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            opacity={0.75}
          />
          <Ellipse
            cx="50"
            cy="65"
            rx="42"
            ry="56"
            fill={colors.selectSoft}
            opacity={0.12}
          />
        </Svg>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFill,
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgBox: {
    width: '108%',
    height: '108%',
  },
});
