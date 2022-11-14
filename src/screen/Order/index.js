import React from 'react';
import {Image, Text, View} from 'react-native';

export default function Order() {
  return (
    <View className="bg-main-blue flex-1">
      <View className="bg-white mt-1 flex-1 rounded-t-[40px] pt-8">
        <View className="w-full items-center">
          <Image source={require('../../assets/img/order.png')} />
        </View>
      </View>
    </View>
  );
}
