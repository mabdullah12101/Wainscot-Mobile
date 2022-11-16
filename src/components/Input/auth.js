import React from 'react';
import {TextInput} from 'react-native';

export default function InputAuth({
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
  handleChange,
  value,
}) {
  return (
    <TextInput
      className="border border-main-gray px-6 py-4 rounded-2xl text-sm tracking-medium font-poppins400 text-main-black mb-4"
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={'none'}
      editable={editable}
      onChangeText={handleChange}
      defaultValue={value}
    />
  );
}
