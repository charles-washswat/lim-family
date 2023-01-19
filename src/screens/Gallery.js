import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import CameraButton from '../components/CameraButton';
import styled from 'styled-components/native';
import PhotoItem from '../components/PhotoItem';
import WritePhotoMode from '../screens/WritePhotoMode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStorageItem, setStorageItem} from '../utils';
import {photoListKey} from '../utils/keys';
import usePhotoList from '../hooks/usePhotoList';
import usePhotoListActions from '../hooks/usePhotoListActions';

const TABBAR_HEIGHT = 70;

const Gallery = ({navigation}) => {
  const photoList = usePhotoList();
  const {remove} = usePhotoListActions();
  const insets = useSafeAreaFrame();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log('photoList', photoList);
  }, [photoList]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gallery</Text>
        <TouchableOpacity
          onPress={() => {
            remove(id);
          }}>
          <Icon name="trash-can-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={false} style={styles.scrollView}>
        <View style={styles.stylegridView}>
          {photoList?.length > 0 &&
            photoList.map(item => {
              const {id, image, title, content, isChecked} = item;
              return (
                <PhotoListWrapper key={id}>
                  <PhotoItem
                    id={id}
                    image={image}
                    title={title}
                    content={content}
                    isChecked={isChecked}
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
