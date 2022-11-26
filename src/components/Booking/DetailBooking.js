import React from 'react';
import {Text, View} from 'react-native';

export default function DetailBooking({title, content}) {
  return (
    <View className="flex-row items-center mb-5">
      <Text className="w-4/12 font-poppins500 text-main-black text-base tracking-small">
        {title}
      </Text>

      <View className="w-8/12 items-end">
        <Text className="font-poppins500 text-main-blue text-base tracking-small">
          {content}
        </Text>
      </View>
    </View>
  );
}
