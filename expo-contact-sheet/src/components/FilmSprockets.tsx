import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  count?: number;
};

/** Small triangular tick marks along film edges */
export function FilmSprockets({ count = 7 }: Props) {
  return (
    <View style={styles.row} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.tick,
            i % 2 === 0 ? styles.tickLight : styles.tickAccent,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    height: 6,
  },
  tick: {
    width: 0,
    height: 0,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  tickLight: {
    borderBottomColor: colors.sprocket,
  },
  tickAccent: {
    borderBottomColor: colors.sprocketAccent,
  },
});
