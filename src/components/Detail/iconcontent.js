import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function IconContent({icon, content}) {
  return (
    <View className="flex-row items-center gap-x-1 mb-3">
      <Icon name={icon} size={35} color="#FC1055" />
      <Text className="font-poppins500 text-sm tracking-medium text-white">
        {content}
      </Text>
    </View>
  );
}
