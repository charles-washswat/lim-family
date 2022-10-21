import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styled from "styled-components/native";
import FastImage from 'react-native-fast-image';

const Button = styled.Button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const HomeScreen = ({navigation}) => {
  const ClothImage = () => (
  <FastImage
      style={{ width: 200, height: 200 }}
      source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
  />
)

  const [Checked, setChecked] = useState(false);
  return (
    <View style={styles.screen}>
      <Text>HomeScreen</Text>
      <BouncyCheckbox
        style={styles.checkbox}
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "black",  borderRadius: 0, }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={() => {
          setChecked(!Checked);
        }}
      />
      <Button
        title="구매하기"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>
        <Button
        title="돌아가기"
        onPress={() => navigation.goBack()}
      />
      <Button 
        title="홈으로 돌아가기"
        onPress={() => navigation.popToTop()}
      />
    </View>
  )
}

const Stack = createStackNavigator();

const App = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkbox: {
    margin: 10
  }
})

export default App;