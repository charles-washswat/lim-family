import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CameraButton({onPress}) {
  return (
    // <View style={styles.wrapper}>
    <Pressable
      android_ripple={{
        color: '#2c2c2c',
      }}
      style={styles.circle}
      onPress={() => onPress()}>
      <Icon name="plus-thick" color="white" size={24} />
    </Pressable>
    // </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 27,
    height: 55,
    width: 55,
    // transform: [{translateX: -27}],
    // ...Platform.select({
    //   android: {elevation: 5, overflow: 'hidden'},
    // }),
  },
  circle: {
    backgroundColor: '#2c2c2c',
    borderRadius: 27,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraButton;
