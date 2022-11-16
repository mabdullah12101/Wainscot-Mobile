import AsyncStorage from '@react-native-async-storage/async-storage';

export default function logCurrentStorage() {
  AsyncStorage.getAllKeys().then(keyArray => {
    AsyncStorage.multiGet(keyArray).then(keyValArray => {
      let myStorage = {};
      for (let keyVal of keyValArray) {
        myStorage[keyVal[0]] = keyVal[1];
      }

      console.log('CURRENT STORAGE: ', myStorage);
    });
  });
}
