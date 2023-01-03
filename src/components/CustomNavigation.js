import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import StorageBox from '../screens/StorageBox';
import Gallery from '../screens/Gallery';
import DetailGallery from '../screens/DetailGallery';
import PhotoList from '../components/PhotoList';

const Stack = createStackNavigator();

const StackStorageBox = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StorageBox" component={StorageBox} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

const StackGallery = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="PhotoList" component={PhotoList} />
      <Stack.Screen name="DetailGallery" component={DetailGallery} />
    </Stack.Navigator>
  );
};

export {StackStorageBox, StackGallery};
