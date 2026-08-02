import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { FilmFrame } from './FilmFrame';
import { frames } from '../data/frames';
import { colors, layout } from '../theme';

export function ContactSheet() {
  const { width } = useWindowDimensions();
  const [selectedId, setSelectedId] = useState<string>(frames[7]?.id ?? '');

  const cellWidth = useMemo(() => {
    const totalGutter = layout.gutter * (layout.columns - 1);
    return (width - totalGutter) / layout.columns;
  }, [width]);

  const rows = useMemo(() => {
    const chunked: (typeof frames)[] = [];
    for (let i = 0; i < frames.length; i += layout.columns) {
      chunked.push(frames.slice(i, i + layout.columns));
    }
    return chunked;
  }, []);

  return (
    <FlatList
      data={rows}
      keyExtractor={(_, index) => `row-${index}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.list}
      renderItem={({ item: row, index: rowIndex }) => (
        <View style={styles.row}>
          {row.map((frame, colIndex) => (
            <FilmFrame
              key={frame.id}
              source={frame.source}
              frameNumber={frame.frameNumber}
              width={cellWidth}
              selected={selectedId === frame.id}
              index={rowIndex * layout.columns + colIndex}
              onPress={() => setSelectedId(frame.id)}
            />
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.void,
  },
  content: {
    paddingBottom: 120,
  },
  row: {
    flexDirection: 'row',
    gap: layout.gutter,
    backgroundColor: colors.void,
  },
});
