import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Config from 'react-native-config';

export default function CardEvent({onPress, data}) {
  return (
    <View className="w-[260px] h-[376px] rounded-[40px] overflow-hidden relative mr-5">
      <Image
        source={{uri: Config.CLOUDINARY_URL_IMAGE + data.image}}
        // style={{width: 400, height: 400}}
        className="w-full h-full"
      />
      {/* <Image
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        className="w-full absolute"
        style={{width: 400, height: 400}}

      /> */}
      <View className="px-6 pb-6 mt-auto">
        <Text className="font-poppins500 text-sm text-white tracking-medium">
          {moment(data.dateTimeShow).format('ddd, DD MMM, hh A')}
        </Text>
        <Text className="text-white font-poppins600 text-xl tracking-large mt-1 mb-5">
          {data.name}
        </Text>
        <TouchableOpacity
          className="bg-[#FC1055] w-11 h-11 rounded-lg justify-center items-center"
          onPress={onPress}>
          <Icon name="arrow-right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
