import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import storageData from '../static/storage.json';
import ClothItem from '../components/ClothItem';

const StorageBox = ({navigation}) => {
  const {result_data_type, content} = storageData;

  useEffect(() => {
    console.log('storageData: ', storageData);
    console.log('result_data_type: ', result_data_type);
    console.log('content: ', content);
    content.map(item => {
      const {pictureList} = item;
      pictureList.map(o => console.log('url: ', o.url));
    });
  }, [storageData]);

  const ClothImage = ({height, width, uri}) => {
    return (
      <FastImage
        style={{height, width}}
        justifyContent="center"
        borderRadius={40}
        borderColor="red"
        source={{
          uri,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  };

  const [Checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Button
        style={styles.buybutton}
        title="되찾기"
        onPress={() => navigation.navigate('Details')}
      />
      <BouncyCheckbox
        style={styles.checkbox}
        size={25}
        fillColor="black"
        unfillColor="#FFFFFF"
        iconStyle={{borderColor: 'black'}}
        onPress={() => {
          setChecked(!Checked);
        }}
      />
      <ScrollView horizontal={false} style={styles.scrollView}>
        <View style={styles.stylegridView}>
          {content.map(item => {
            const {pictureList, storageId} = item;
            return (
              <ClothItemWrapper>
                <ClothItem key={storageId} url={pictureList[0].url} />
              </ClothItemWrapper>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const Button = styled.Button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

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
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  stylegridView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    // paddingTop: 10,
    justifyContent: 'space-around',
  },
});

export default StorageBox;
