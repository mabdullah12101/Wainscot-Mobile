import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function ButtonAuth({onPress, content}) {
  return (
    <TouchableOpacity
      className="bg-main-blue items-center py-4 rounded-2xl shadow-lg shadow-blue-400"
      onPress={onPress}>
      <Text className="font-poppins600 text-white tracking-medium">
        {content}
      </Text>
    </TouchableOpacity>
  );
}
