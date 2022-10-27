import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//item의 key 들을 return 해서 보여주기

function ClothItem({url, tagLabel, name, initializedAt}) {
  return (
    <Container>
      <ClothImage height={'100%'} width={'100%'} uri={url} />
      <CheckBox fillColor="black" disableText />
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
