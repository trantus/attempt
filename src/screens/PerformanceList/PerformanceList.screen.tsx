import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

const ITEM_HEIGHT = 50;
const DATA_SIZE = 1000;

// ===== 1 =====
// Implement performance optimizations for smooth scrolling and minimal re-renders.

// ===== 2 =====
// Add a floating “Scroll to Top” button that becomes visible when the user
// has scrolled down a certain distance,
// and use forwardRef and imperative methods on the list to programmatically scroll.

// ===== 3 =====
// Implement debouncing so the filter doesn’t re-run on every keystroke.

// Mock large dataset
const initialData = Array.from({length: DATA_SIZE}, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
}));

const PerformanceScreen = React.forwardRef((props, ref) => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

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
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: any}) => <ListItem title={item.title} />}
      />

      {/* Scroll to Top Button */}
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
