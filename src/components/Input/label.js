import React from 'react';
import {Text, View} from 'react-native';
import InputAuth from './auth';

export default function InputWithLabel({
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  value,
  editable,
  handleChange,
}) {
  return (
    <View className="mb-3">
      <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
        {label}
      </Text>
      <InputAuth
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        editable={editable}
        handleChange={handleChange}
      />
    </View>
  );
}
