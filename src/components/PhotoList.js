import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

function PhotoList({id, image, title}) {
  return (
    <View>
      <Container>
        <Photo height={'100%'} width={'100%'} image={image} />
      </Container>
      <View style={{paddingTop: 5}}>
        <Text style={{color: 'black', fontsize: 13}}>{title}</Text>
      </View>
    </View>
  );
}

const Photo = ({height, width, image}) => {
  return (
    <FastImage
      style={{height, width}}
      justifyContent="center"
      source={{
        uri: image,
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const Container = styled.View`
  height: 180px;
  width: 180px;
  border-radius: 10px;
  border: 2px solid palevioletred;
  border-color: black;
`;

export default PhotoList;
