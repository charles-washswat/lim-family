import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import CameraButton from '../components/CameraButton';
import styled from 'styled-components/native';
import PhotoList from '../components/PhotoList';
import WritePhotoMode from '../screens/WritePhotoMode';

const TABBAR_HEIGHT = 70;

const Gallery = ({navigation}) => {
  const insets = useSafeAreaFrame();
  const [photoList, setPhotoList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const nextId = useRef(1);

  // const temp = {
  //   picture: {
  //     assets: [{uri: '123'}],
  //   },
  // };

  // const temp2 = {
  //   picture: {
  //     assets: [],
  //   },
  // };

  // const temp3 = {
  //   picture: {},
  // };

  useEffect(() => {
    // bye
    // console.log('temp: ', temp.picture.assets[0].uri);
    // console.log('temp2: ', temp2?.picture?.assets[0]?.uri || 'hi');
    // console.log('temp3: ', temp3.picture.assets[0].uri);
  }, []);

  const onCreate = ({title, content, picture}) => {
    const writePhotoList = {
      id: nextId.current,
      image: picture?.assets[0]?.uri,
      title,
      content,
    };
    console.log('writePhotoList: ', writePhotoList);
    setPhotoList([...photoList, writePhotoList]);
    nextId.current += 1;
  };

  useEffect(() => {
    console.log('photoList: ', photoList);
  }, [photoList]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView horizontal={false} style={styles.scrollView}>
        <View style={styles.stylegridView}>
          {photoList.map(item => {
            const {id, image, title} = item;
            return (
              <PhotoListWrapper key={id}>
                <PhotoList image={image} title={title} />
              </PhotoListWrapper>
            );
          })}
        </View>
      </ScrollView>
      <PlusButtonContainer
        bottom={Platform.select({
          android: TABBAR_HEIGHT / 2,
          ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
        })}>
        <CameraButton onPress={() => setModalVisible(true)} />
      </PlusButtonContainer>
      <WritePhotoMode
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={onCreate}
      />
    </KeyboardAvoidingView>
  );
};

const PhotoListWrapper = styled.View`
  padding-vertical: 5px;
`;

const PlusButtonContainer = styled.View`
  // zindex: 5;
  display: flex;
  position: absolute;
  flex: 1;
  // left: 50%;
  bottom: ${({bottom}) => `${bottom}px`};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  stylegridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
});

export default Gallery;
