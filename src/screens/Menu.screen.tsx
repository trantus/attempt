import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen: React.FC<Props> = ({navigation}) => {
  const navigateToListExample = () => {
    navigation.navigate('List');
  };

  const navigateToListBottomSheet = () => {
    navigation.navigate('BottomSheet');
  };

  const navigateToPerformanceList = () => {
    navigation.navigate('PerformanceList');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToPerformanceList}>
        <Text style={styles.title}>1. Performance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToListExample}>
        <Text style={styles.title}>2. List load more</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity onPress={navigateToListBottomSheet}>*/}
      {/*  <Text style={styles.title}>2. BottomSheet</Text>*/}
      {/*</TouchableOpacity>*/}
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
