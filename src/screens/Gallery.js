import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import CameraButton from '../components/CameraButton';
import styled from 'styled-components/native';
import PhotoList from '../components/PhotoList';
import WritePhotoMode from '../screens/WritePhotoMode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  // useEffect(() => {
  //   // test
  //   // console.log('temp: ', temp.picture.assets[0].uri);
  //   // console.log('temp2: ', temp2?.picture?.assets[0]?.uri || 'hi');
  //   // console.log('temp3: ', temp3.picture.assets[0].uri);
  // }, []);

  const onCreate = ({title, content, picture, isChecked}) => {
    const writePhotoList = {
      id: nextId.current,
      image: picture?.assets[0]?.uri,
      title,
      content,
      isChecked,
    };
    setPhotoList([...photoList, writePhotoList]);
    nextId.current += 1;
  };

  const onRemove = id => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            setPhotoList(photoList.filter(item => item.isChecked === false));
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  const onpressAction = ({id, isChecked}) => {
    const newPhotoList = photoList.map(item => {
      if (item.id === id) {
        return {...item, isChecked: !isChecked};
      } else {
        return item;
      }
    });
    setPhotoList(newPhotoList);
  };

  useEffect(() => {
    console.log('photoList: ', photoList);
  }, [photoList]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gallery</Text>
        <TouchableOpacity onPress={onRemove}>
          <Icon name="trash-can-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={false} style={styles.scrollView}>
        <View style={styles.stylegridView}>
          {photoList.map(item => {
            const {id, image, title, isChecked} = item;
            return (
              <PhotoListWrapper key={id}>
                <PhotoList
                  id={id}
                  image={image}
                  title={title}
                  isChecked={isChecked}
                  onPress={onpressAction}
                />
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
    backgroundColor: 'white',
  },
  header: {
    height: '8.8%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
