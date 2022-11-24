import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Attendees({minus}) {
  return (
    <View
      className={`w-7 h-7 rounded-full overflow-hidden ${
        minus ? '-ml-2' : ''
      }`}>
      <FastImage
        source={require('../../assets/img/Avatar.png')}
        className="w-full h-full"
      />
    </View>
  );
}
