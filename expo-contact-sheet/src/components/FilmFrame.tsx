import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { FilmSprockets } from './FilmSprockets';
import { SelectionCircle } from './SelectionCircle';
import { colors, layout } from '../theme';

type Props = {
  source: ImageSourcePropType;
  frameNumber: number;
  width: number;
  selected: boolean;
  index: number;
  onPress: () => void;
};

export function FilmFrame({
  source,
  frameNumber,
  width,
  selected,
  index,
  onPress,
}: Props) {
  const enter = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 420,
      delay: Math.min(index * 28, 400),
      useNativeDriver: true,
    }).start();
  }, [enter, index]);

  const imageHeight = width * (4 / 3) * 0.92;
  const brandSize = Math.max(5.5, width * 0.055);
  const numberSize = Math.max(7, width * 0.07);

  return (
    <Animated.View
      style={[
        styles.shell,
        {
          width,
          opacity: enter,
          transform: [
            {
              translateY: enter.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
            { scale: press },
          ],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(press, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 40,
            bounciness: 0,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(press, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 6,
          }).start()
        }
        style={styles.press}
      >
        <View style={styles.film}>
          <FilmSprockets count={Math.max(5, Math.round(width / 18))} />
          <View style={styles.labelRow}>
            <Text style={[styles.brand, { fontSize: brandSize }]} numberOfLines={1}>
              KODAK PORTRA 400
            </Text>
            <Text style={[styles.number, { fontSize: numberSize }]}>{frameNumber}</Text>
          </View>

          <View style={[styles.gate, { height: imageHeight }]}>
            <Image source={source} style={styles.image} resizeMode="cover" />
            <SelectionCircle visible={selected} />
          </View>

          <View style={styles.footerRow}>
            <Text style={[styles.numberSmall, { fontSize: numberSize * 0.9 }]}>
              {frameNumber}
            </Text>
            <Text style={[styles.brandTiny, { fontSize: brandSize * 0.9 }]}>PORTRA</Text>
            <Text style={[styles.numberSmall, { fontSize: numberSize * 0.9 }]}>
              {frameNumber}
            </Text>
          </View>
          <FilmSprockets count={Math.max(5, Math.round(width / 18))} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginBottom: layout.gutter,
  },
  press: {
    flex: 1,
  },
  film: {
    backgroundColor: colors.film,
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: layout.filmPadX,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginTop: 1,
    marginBottom: 2,
    minHeight: layout.filmPadTop - 4,
  },
  brand: {
    color: colors.label,
    letterSpacing: 0.4,
    fontWeight: '600',
    flexShrink: 1,
  },
  number: {
    color: colors.frameNumber,
    fontWeight: '700',
    marginLeft: 2,
  },
  gate: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginTop: 2,
    marginBottom: 1,
    minHeight: layout.filmPadBottom - 4,
  },
  numberSmall: {
    color: colors.frameNumber,
    fontWeight: '700',
  },
  brandTiny: {
    color: colors.label,
    letterSpacing: 0.6,
    fontWeight: '500',
    opacity: 0.85,
  },
});
