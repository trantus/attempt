import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface Item {
  id: number;
  title: string;
  // Add other fields as needed from your chosen API
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      // Replace the URL below with a real API endpoint
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`,
      );
      const items = await response.json();
      if (pageNum === 1) {
        setData(items);
      } else {
        setData(prev => [...prev, ...items]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  const loadMore = () => {
    // Add logic to prevent loading more if no more data is available
    setPage(prev => prev + 1);
  };

  const renderItem = ({item}: {item: Item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {id: item.id})}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{marginVertical: 20}} />;
  };

  return (
    <View style={styles.container}>
      <Text>Home Many items uploaded: {data.length}</Text>
      {loading && data.length === 0 ? (
        <ActivityIndicator size="large" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
