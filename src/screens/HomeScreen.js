import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const HomeScreen = ({navigation}) => {
  return (
    <Container>
      <Text>HomeScreen</Text>
      <Button
        title="이용내역"
        onPress={() => navigation.navigate('StorageBox')}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.Button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default HomeScreen;
