import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Maximize2,
  ShoppingBag,
  Sparkles,
} from 'lucide-react-native';
import { colors } from '../theme';

type Props = {
  onBagPress?: () => void;
  onExpandPress?: () => void;
  onSearchPress?: () => void;
};

export function FloatingActions({
  onBagPress,
  onExpandPress,
  onSearchPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Shopping bag"
        onPress={onBagPress}
        style={[
          styles.bag,
          {
            top: Math.max(insets.top, 12) + 4,
          },
        ]}
      >
        <ShoppingBag size={20} color="#fff" strokeWidth={1.75} />
      </Pressable>

      <View
        style={[
          styles.fabStack,
          { bottom: Math.max(insets.bottom, 16) + 8 },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Expand"
          onPress={onExpandPress}
          style={styles.fab}
        >
          <Maximize2 size={18} color="#fff" strokeWidth={1.8} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Visual search"
          onPress={onSearchPress}
          style={styles.fab}
        >
          <Sparkles size={18} color="#fff" strokeWidth={1.8} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bag: {
    position: 'absolute',
    right: 16,
    zIndex: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.bag,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.fabBorder,
  },
  fabStack: {
    position: 'absolute',
    right: 16,
    zIndex: 20,
    gap: 10,
  },
  fab: {
    width: 48,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.fab,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.fabBorder,
  },
});
