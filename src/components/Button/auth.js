import React from 'react';
import {Pressable, Text} from 'react-native';

export default function ButtonAuth({onPress, content, isLoading}) {
  return (
    <Pressable
      className={`bg-main-blue items-center justify-center h-14 rounded-2xl shadow-lg shadow-blue-400 ${
        isLoading ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      disabled={isLoading ? true : false}>
      <Text className="font-poppins600 text-white tracking-medium">
        {content}
      </Text>
    </Pressable>
  );
}
