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
} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import CameraButton from '../components/CameraButton';
import styled from 'styled-components/native';
import PhotoList from '../components/PhotoList';
import WritePhotoMode from '../screens/WritePhotoMode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TABBAR_HEIGHT = 70;

const Gallery = ({navigation}) => {
  const insets = useSafeAreaFrame();
  const [photoList, setPhotoList] = useState([]);
  useEffect(() => {
    async function load() {
      try {
        const rawPhotoList = await AsyncStorage.getItem('photoList');
        const savedPhotoList = JSON.parse(rawPhotoList);
        savedPhotoList.filter(element => {
          return element !== undefined && element !== null && element !== '';
        });
        setPhotoList(savedPhotoList);
      } catch (e) {
        Alert.alert('불러오기에 실패하였습니다');
      }
    }
    load();
  }, []);
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

  const onCreate = async ({title, content, picture, isChecked}) => {
    const writedPhotoContents = {
      id: nextId.current,
      image: picture?.assets[0]?.uri,
      title,
      content,
      isChecked,
    };
    const combinedPhotoList = [...photoList, writedPhotoContents];
    setPhotoList(combinedPhotoList);
    nextId.current += 1;
    try {
      await AsyncStorage.setItem(
        'photoList',
        JSON.stringify(combinedPhotoList),
      );
    } catch (e) {
      Alert.alert('저장에 실패하였습니다');
    }
  };

  const onModify = async ({id, title, content, picture, isChecked}) => {
    const modifiedPhotoContents = {
      id,
      image: picture,
      title,
      content,
      isChecked,
    };
    const modifiedPhotoList = photoList.map(item =>
      item.id === id ? {...item, ...modifiedPhotoContents} : item,
    );
    const newList = modifiedPhotoList.filter(element => {
      return element !== undefined && element !== null && element !== '';
    });
    setPhotoList(newList);
    try {
      await AsyncStorage.setItem('photoList', JSON.stringify(newList));
    } catch (e) {
      Alert.alert('저장에 실패하였습니다');
    }
  };

  const onRemove = () => {
    if (photoList.every(item => item.isChecked === false)) {
      return Alert.alert('삭제할 항목을 선택해주세요');
    }
    return Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            const removedPhotoList = photoList.filter(
              item => item.isChecked === false,
            );
            setPhotoList(removedPhotoList);
            try {
              await AsyncStorage.setItem(
                'photoList',
                JSON.stringify(removedPhotoList),
              );
            } catch (e) {
              console.log('e');
              Alert.alert('저장에 실패하였습니다');
            }
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  const onpressAction = async ({id, isChecked}) => {
    const setCheckedPhotoContents = photoList.map(item =>
      item.id === id ? {...item, isChecked: !isChecked} : item,
    );
    setPhotoList(setCheckedPhotoContents);
    try {
      await AsyncStorage.setItem(
        'photoList',
        JSON.stringify(setCheckedPhotoContents),
      );
    } catch (e) {
      console.log('e');
      Alert.alert('저장에 실패하였습니다');
    }
  };

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
            const {id, image, title, content, isChecked} = item;
            return (
              <PhotoListWrapper key={id}>
                <PhotoList
                  id={id}
                  image={image}
                  title={title}
                  content={content}
                  isChecked={isChecked}
                  onPress={onpressAction}
                  onModify={onModify}
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
