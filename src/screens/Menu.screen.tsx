import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen: React.FC<Props> = ({navigation}) => {
  const navigateToListExample = () => {
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToListExample}>
        <Text style={styles.title}>1. To do</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToListExample}>
        <Text style={styles.title}>2. List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
});
