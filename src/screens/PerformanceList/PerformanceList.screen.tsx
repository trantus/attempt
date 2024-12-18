import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDebouncedValue} from './useDebounceValue.tsx';

const ITEM_HEIGHT = 50;
const DATA_SIZE = 1000;

// Mock large dataset
const initialData = Array.from({length: DATA_SIZE}, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
}));

const PerformanceScreen = React.forwardRef((props, ref) => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const flatListRef = useRef<FlatList>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return data;
    return data.filter(item =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [data, debouncedQuery]);

  React.useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      flatListRef.current?.scrollToOffset({offset: 0, animated: true});
    },
  }));

  // Show/hide scroll-to-top button based on scroll position
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setShowScrollToTop(offsetY > 300);
    },
    [],
  );

  // AppState handling (Bonus)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // Refresh or update data if necessary
        // e.g., setData(updatedDataFromServer);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  const renderItem = useCallback(
    ({item}: {item: any}) => <MemoizedListItem title={item.title} />,
    [],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Large List */}
      <FlatList
        ref={flatListRef}
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={() =>
            flatListRef.current?.scrollToOffset({offset: 0, animated: true})
          }>
          <Text style={{color: '#fff'}}>Top</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const ListItem = ({title}: {title: string}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{title}</Text>
    </View>
  );
};

// Memoized to prevent unnecessary re-renders
const MemoizedListItem = React.memo(ListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#f1f1f1',
    margin: 8,
    borderRadius: 4,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PerformanceScreen;
