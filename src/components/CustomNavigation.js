import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import StorageBox from '../screens/StorageBox';

const Stack = createStackNavigator();

const StackStorageBox = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StorageBox" component={StorageBox} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export {StackStorageBox};
