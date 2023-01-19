import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageItem = async (key: string, errorMessage: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (e) {
    Alert.alert(
      errorMessage ? errorMessage : '[async storage] getStorageItem failed',
    );
  }
  return null;
};

const setStorageItem = async (
  key: string,
  value: string,
  errorMessage: string,
) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Alert.alert(
      errorMessage ? errorMessage : '[async storage] setStorageItem failed',
    );
  }
};

export {getStorageItem, setStorageItem};
