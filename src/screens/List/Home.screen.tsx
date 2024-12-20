/**
 * TASKS TO BE IMPLEMENTED BY THE CANDIDATE:
 * 1. Fetch and display a paginated list of items from the remote API:
 *    URL: https://jsonplaceholder.typicode.com/posts?_page={pageNum}&_limit=10
 * 2. Implement "Load More" functionality when the user scrolls near the bottom.
 * 3. Navigate to a detail screen showing more info about the selected item when tapped.
 * 4. Use ActivityIndicator to show loading state
 *
 */

import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation'; // Adjust import as needed

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

interface Item {
  id: number;
  title: string;
  // Add other fields as needed
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // https://jsonplaceholder.typicode.com/posts?_page={pageNum}&_limit=10
  const fetchData = useCallback(async (pageNum: number) => {
    // Candidate to implement
  }, []);

  const onRefresh = () => {
    // Candidate to implement pull-to-refresh logic
  };

  const loadMore = () => {
    // Candidate to implement load-more logic
  };

  const renderItem = ({item}: {item: Item}) => (
    <TouchableOpacity
      onPress={() => {
        // Candidate to navigate to 'Detail' screen with item.id
      }}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    // Candidate to return footer loading indicator if needed
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home - Items Loaded: {data.length}</Text>

        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 12,
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemTitle: {
    fontSize: 16,
  },
});
