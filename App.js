import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import HomeScreen from './src/screens/HomeScreen';
import {StackStorageBox} from './src/components/CustomNavigation';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Button = styled.Button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="StorageBox"
          component={StackStorageBox}
          options={{
            title: '이용내역',
            tabBarIcon: ({color, size}) => (
              <Icon1 name="file-document-edit" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '마이세특',
            tabBarIcon: ({color, size}) => (
              <Icon1 name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#F2F2F2',
  },
  stylegridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
});

export default App;
