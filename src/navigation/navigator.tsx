import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/navigation';
import DetailScreen from '../screens/List/Detail.screen.tsx';
import HomeScreen from '../screens/List/Home.screen.tsx';
import MenuScreen from '../screens/Menu.screen.tsx';
import BottomSheetScreen from '../screens/BottomSheet.screen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{title: 'Detail'}}
      />

      <Stack.Screen
        name="BottomSheet"
        component={BottomSheetScreen}
        options={{title: 'Detail'}}
      />
      <Stack.Screen
        name="List"
        component={HomeScreen}
        options={{title: 'Items List'}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{title: 'Detail'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
