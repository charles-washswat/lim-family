import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import storageData from '../static/storage.json';

function ClothItem({url, tagLabel}) {
  return (
    <Container>
      <ClothImage height={'100%'} width={'100%'} uri={url} />
      <CheckBox fillColor="black" />
    </Container>
  );
}

const ClothImage = ({height, width, uri}) => {
  return (
    <FastImage
      style={{height, width}}
      justifyContent="center"
      // borderRadius={40}
      // borderColor="red"
      source={{
        uri,
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const CheckBox = styled(BouncyCheckbox)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Container = styled.View`
  height: 180px;
  width: 180px;
  border-radius: 10px;
  border: 2px solid palevioletred;
  border-color: black;
  background-color: gray;
`;

export default ClothItem;
