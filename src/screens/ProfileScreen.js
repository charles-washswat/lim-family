import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import styled from 'styled-components/native';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        title="홈으로 돌아가기"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProfileScreen;
