import React from 'react';
import {Image, View} from 'react-native';

export default function Attendees({minus}) {
  return (
    <View
      className={`w-7 h-7 rounded-full overflow-hidden ${
        minus ? '-ml-2' : ''
      }`}>
      <Image
        source={require('../../assets/img/Avatar.png')}
        className="w-full h-full"
      />
    </View>
  );
}
