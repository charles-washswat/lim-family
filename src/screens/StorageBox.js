import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
import storageData from '../static/storage.json';
import ClothItem from '../components/ClothItem';
import {Value} from 'react-native-reanimated';

const StorageBox = ({navigation}) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });
  const [storage, setStorage] = useState(storageData);
  const {content} = storage;

  const testArray1 = [
    {
      id: 1,
      url: 'naver',
      isChecked: true,
    },
    {
      id: 2,
      url: 'youtube',
      isChecked: true,
    },
    {
      id: 3,
      url: 'instagram',
      isChecked: false,
    },
    {
      id: 4,
      url: 'daum',
      isChecked: false,
    },
  ];

  const result1 = [
    {
      id: 1,
      url: 'naver',
      isChecked: true,
    },
    {
      id: 2,
      url: 'youtube',
      isChecked: true,
    },
  ];

  const result2 = ['naver', 'youtube'];

  // 숙제
  useEffect(() => {
    console.log('testArray111: ', testArray1);
    let result11 = null;
    let result22 = null;

    // 로직을 작성하시오
    result11 = testArray1.filter(object => object.isChecked === true);
    result22 = testArray1
      .filter(object => object.isChecked === true)
      .map(value => value.url);

    console.log('result1: ', result1);
    console.log('result11: ', result11);
    console.log('result2: ', result2);
    console.log('result22: ', result22);
  }, []);

  useEffect(() => {
    console.log('testArray1: ', testArray1);
    let result = null;

    // 로직을 작성하시오
    // map 사용해서, url key, value 만 뽑아내야 된다.
    const switcher = (id, array) => {
      let newArr = [];
      let newArr2 = [];
      // 여기에 작성하시오
      newArr = testArray1.map(item => {
        if (item.id === id) {
          return {...item, isChecked: !item.isChecked};
        } else return item;
      });
      newArr2 = testArray1.map(item =>
        item.id === id ? {...item, isChecked: !item.isChecked} : item,
      );
      return newArr2;
    };

    // result = testArray1.map(item => item.url);

    console.log('result: ', switcher(1, testArray1));
    console.log('result: ', switcher(2, testArray1));
    console.log('result1: ', result1);
  }, []);

  useEffect(() => {
    // console.log('storage', storage);
  }, [storage]);

  useEffect(() => {
    const {content} = storage;
    const newArray = content.map(item => ({...item, isChecked: false}));
    const newStorage = {...storage, content: newArray};
    setStorage(newStorage);
  }, []);
  // useEffect(() => {
  //   content.map(item => {
  //     const {pictureList} = item;
  //     pictureList.map(o => console.log('url: ', o.url));
  //   });
  // }, [storageData]);

  const onpressAction = ({storageId, isChecked}) => {
    // step 1 새로운 array를 만드는데 선택된 storageId의 객체의 isChecked만 바뀜
    const newArray2 = content.map(object => {
      if (object.storageId === storageId) {
        return {...object, isChecked: !isChecked};
      } else {
        return object;
      }
    });
    setStorage({...storage, content: newArray2});
  };

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    console.log('checked: ', checked);
  }, [checked]);

  // * 어려운버전
  // colorArray 는 state로 관리
  // colorArray = [] 초기상태
  // colorArray = ["#FFFFFF"] 추가버튼 눌렀을때 랜덤 색상이 생긴다
  // colorArray = ["#FFFFFF", "#9944AA"] 추가버튼 눌렀을때 랜덤 색상이 생긴다
  // colorArray = ["#FFFFFF"] 삭제버튼 눌렀을때 제일 마지막 색상이 사라진다
  function getRandomColor() {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }

  function Colorrender({colorrender, onRemove}) {
    const {id, backgroundColor} = colorrender;
    useEffect(() => {
      console.log('colorrender', colorrender);
    }, []);
    return (
      <TouchableOpacity
        style={{
          width: 45.7,
          height: 45.7,
          backgroundColor,
        }}
        onPress={() => onRemove(id)}
      />
    );
  }

  const [colorArray, setColorArray] = useState([]);
  const nextId = useRef(1);

  const onCreate = () => {
    const color = {
      id: nextId.current,
      backgroundColor: getRandomColor(),
    };
    setColorArray([...colorArray, color]);

    nextId.current += 1;
  };

  const onRemove = id => {
    setColorArray(colorArray.filter(color => color.id !== id));
  };

  const onRemoveLO = () => {
    // array length
    setColorArray(
      colorArray.filter((color, index) => index !== colorArray.length - 1),
    );
  };

  useEffect(() => {
    console.log('colorArray', colorArray);
  }, [colorArray]);

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() =>
            navigation.navigate('DetailScreen', {msg: 'From StorageBox'})
          }>
          <Text style={styles.buttonText}>되찾기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <Button
          style={styles.button2}
          title="On / Off"
          onPress={() => {
            setChecked(!checked);
          }}
        />
        {checked ? <View style={styles.box1} /> : <View style={styles.box2} />}
      </View>

      <View style={styles.container4}>
        <Button style={styles.button2} title="색상 추가" onPress={onCreate} />
        <Button style={styles.button2} title="색상 제거" onPress={onRemoveLO} />
      </View>
      <View style={styles.container5}>
        {colorArray.map((colorrender, index) => (
          <Colorrender
            colorrender={colorrender}
            key={index}
            onRemove={onRemove}
          />
        ))}
      </View>
      <ScrollView horizontal={false} style={styles.scrollView}>
        <View style={styles.stylegridView}>
          {content.map(item => {
            const {
              pictureList,
              storageId,
              tagLabel,
              name,
              initializedAt,
              isChecked,
            } = item;
            return (
              <ClothItemWrapper>
                <ClothItem
                  key={storageId}
                  url={pictureList[0].url}
                  tagLabel={tagLabel}
                  name={name}
                  initializedAt={initializedAt}
                  isChecked={isChecked}
                  onPress={onpressAction}
                />
              </ClothItemWrapper>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  container4: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
    width: '100%',
  },
  container5: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button1: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 40,
    borderRadius: 15,
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
  },
  button2: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  stylegridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  box0: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    marginTop: 10,
  },
  box1: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    marginTop: 10,
  },
  box2: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginTop: 10,
  },
});

export default StorageBox;
