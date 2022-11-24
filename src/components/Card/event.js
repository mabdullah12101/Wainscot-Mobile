import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

export default function CardEvent({onPress, data, seeAll}) {
  return (
    <View
      className={`w-full h-full ${
        seeAll ? 'rounded-xl' : 'rounded-[40px]'
      } overflow-hidden relative mr-5`}>
      <FastImage
        source={{uri: Config.CLOUDINARY_URL_IMAGE + data.image}}
        className="w-full h-full"
      />
      <View className="px-6 pb-6 mt-auto">
        <Text
          className={`font-poppins500 ${
            seeAll ? 'text-xs' : 'text-sm'
          }  text-white tracking-medium`}>
          {moment(data.dateTimeShow).format('ddd, DD MMM, hh A')}
        </Text>
        <Text
          className={`text-white font-poppins600 ${
            seeAll ? 'text-lg' : 'text-xl'
          }  tracking-large mt-1 mb-5`}>
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
