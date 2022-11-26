import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function ListBooking({data, onPress}) {
  return (
    <View className="mt-10 flex-row border-b border-[#C1C5D040] pb-6">
      <View className="w-14 h-[75px] items-center pt-3 mr-6">
        <Text className="text-[#FF8900] font-poppins600 text-sm">
          {moment(data.createdAt).format('DD')}
        </Text>
        <Text className="text-main-gray font-poppins500 text-xs">
          {moment(data.createdAt).format('ddd')}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="text-main-black font-poppins600 text-2xl tracking-large mb-3 flex-wrap">
          {data.event.name}
        </Text>
        <Text className="text-[#373A42BF] font-poppins400 text-xs tracking-small mb-2">
          {data.event.location}
        </Text>
        <Text className="text-[#373A42BF] font-poppins400 text-xs tracking-small mb-2">
          {moment(data.event.dateTimeShow).format('ddd, DD MMM, hh A')}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text className="text-main-blue font-poppins500 text-xs tracking-small">
            Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
