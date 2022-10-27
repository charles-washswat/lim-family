import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import storageData from '../static/storage.json';
import ClothItem from '../components/ClothItem';

const StorageBox = ({navigation}) => {
  const {content} = storageData;
  useEffect(() => {
    content.map(item => {
      const {pictureList} = item;
      pictureList.map(o => console.log('url: ', o.url));
    });
  }, [storageData]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailScreen', {msg: 'From StorageBox'})
        }
        style={styles.button}>
        <Text style={styles.buttonText}>되찾기</Text>
      </TouchableOpacity>
      <ScrollView horizontal={false} style={styles.scrollView}>
        <View style={styles.stylegridView}>
          {content.map(item => {
            const {pictureList, storageId, tagLabel, name, initializedAt} =
              item;
            return (
              <ClothItemWrapper>
                <ClothItem
                  key={storageId}
                  url={pictureList[0].url}
                  tagLabel={tagLabel}
                  name={name}
                  initializedAt={initializedAt}
                />
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
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    marginBottom: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
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
    justifyContent: 'space-around',
  },
});

export default StorageBox;
