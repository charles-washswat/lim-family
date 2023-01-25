import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
  Button,
  TextInput,
  Image,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import usePhotoListActions from '../hooks/usePhotoListActions';

const DetailGallery = ({route}) => {
  const {id, oldImage, oldTitle, oldContent, oldIsChecked} = route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState(oldTitle);
  const [content, setContent] = useState(oldContent);
  const [picture, setPicture] = useState(oldImage);
  const [isChecked, setIsChecked] = useState(oldIsChecked);
  const {add} = usePhotoListActions();
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setPicture(res.assets[0].uri);
      },
    );
  };

  const onReset = () => {
    setTitle(oldTitle);
    setContent(oldContent);
    setPicture(oldImage);
    setIsChecked(oldIsChecked);
  };

  const setValidator = () => {
    add({picture: picture?.assets[0]?.uri, title, content});
    onReset();
  };

  return (
    <KeyboardAvoidingView style={styles.container0}>
      <ScrollView style={styles.ViewContainer}>
        <Pressable style={styles.background} onPress={Keyboard.dismiss}>
          <View style={styles.container1}>
            <Button title="사진수정" onPress={onSelectImage} color="#2c2c2c" />
            <Image
              style={styles.upLoadImage}
              source={{uri: picture}}
              resizeMode="cover"
            />
          </View>
          <View style={styles.container2}>
            <Text style={{fontWeight: 'bold', marginLeft: 11}}>제목</Text>
            <TextInput
              style={styles.input1}
              placeholder="제목을 입력해주세요"
              keyboardType="default"
              multiline={true}
              value={title}
              onChangeText={setTitle}
              maxLength={13}
            />
          </View>
          <View style={styles.container3}>
            <Text style={{fontWeight: 'bold', marginLeft: 11}}>내용</Text>
            <TextInput
              style={styles.input2}
              placeholder="내용을 입력해주세요"
              keyboardType="default"
              multiline={true}
              value={content}
              onChangeText={setContent}
              maxLength={100}
            />
          </View>
          <View style={styles.container4}>
            <Button title="수정" color="#2c2c2c" onPress={setValidator} />
            <Button
              title="취소"
              color="#2c2c2c"
              onPress={() => {
                navigation.navigate('Gallery');
                onReset();
              }}
            />
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default DetailGallery;

const styles = StyleSheet.create({
  container0: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ViewContainer: {
    height: 600,
    width: 400,
  },
  background: {
    height: 600,
    width: 400,
    backgroundColor: '#E2E2E2',
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 60,
  },
  container1: {
    flex: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container2: {
    flex: 0.5,
  },
  container3: {
    flex: 0.8,
  },
  container4: {
    flex: 0.5,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input1: {
    height: 30,
    margin: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 3,
    textAlignVertical: 'top',
  },
  input2: {
    height: 80,
    margin: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 3,
    textAlignVertical: 'top',
  },
  upLoadImage: {
    width: '50%',
    height: '80%',
  },
  screen: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#000',
    fontWeight: '700',
    fontSize: 30,
  },
});
