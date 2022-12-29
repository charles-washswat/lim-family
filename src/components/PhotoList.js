import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

function PhotoList({id, onModify, image, title, content, isChecked, onPress}) {
  const navigation = useNavigation();
  return (
    <View>
      <Container>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailGallery', {
              id,
              onModify,
              oldImage: image,
              oldTitle: title,
              oldContent: content,
              oldIsChecked: isChecked,
            })
          }>
          <Photo height={'100%'} width={'100%'} image={image} />
        </TouchableOpacity>
        <CheckBox
          isChecked={isChecked}
          onPress={() => onPress({id, isChecked})}
          fillColor="black"
          disableText
          iconStyle={{borderColor: 'white'}}
        />
      </Container>
      <View style={{paddingTop: 5}}>
        <TestText fontSize={13}>{title}</TestText>
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

const CheckBox = styled(BouncyCheckbox)`
  position: absolute;
  top: 0;
  right: 0;
`;

const TestText = styled.Text`
  color: black;
  font-size: ${props => `${props.fontSize}px`};
  // font-size: ${({fontSize}) => `${fontSize}px`};
`;

const Container = styled.View`
  height: 180px;
  width: 180px;
  border-radius: 10px;
  border: 2px solid palevioletred;
  border-color: black;
`;

export default PhotoList;
