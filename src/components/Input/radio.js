import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

export default function InputRadio({content, onPress, checked}) {
  return (
    <TouchableOpacity className="flex-row items-center mr-12" onPress={onPress}>
      <RadioButton
        value={content}
        status={checked === content ? 'checked' : 'unchecked'}
        onPress={onPress}
      />
      <Text className="font-poppins400 text-sm text-[#777777] tracking-medium">
        {content}
      </Text>
    </TouchableOpacity>
  );
}
