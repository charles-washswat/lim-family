import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import HomeScreen from './src/screens/HomeScreen';
import StorageBox from './src/screens/StorageBox';

//stack navigation 추가해서 Tab 네비와 합쳐주기
const Tab = createBottomTabNavigator();

const Button = styled.Button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const urlList = [
  'https://image.washswat.com/ecommerce/demo/20221007_04_30_16',
  'https://image.washswat.com/ecommerce/demo/20221007_04_30_48',
  // ...
];
const urlList2 = [
  'https://image.washswat.com/ecommerce/demo/20221007_04_30_16',
  'https://image.washswat.com/ecommerce/demo/20221007_04_30_48',
  // ...
];

const allList = [];

const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="홈으로 돌아가기"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="StorageBox">
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
          component={StorageBox}
          options={{
            title: '이용내역',
            tabBarIcon: ({color, size}) => (
              <Icon1 name="file-document-edit" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
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
  checkbox: {
    margin: 10,
  },
  buybutton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginBottom: 30,
    borderRadius: 35,
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
