import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailGallery = ({route}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{route.params.msg}</Text>
    </View>
  );
};

export default DetailGallery;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#000',
    fontWeight: '700',
    fontSize: 30,
  },
});
