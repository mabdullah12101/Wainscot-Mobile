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
      placeholder={placeholder}
      placeholderTextColor="#C1C5D0"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={'none'}
      editable={editable}
      onChangeText={handleChange}
      defaultValue={value}
      style={{
        borderColor: '#C1C5D0',
        borderStyle: 'solid',
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
        letterSpacing: 1,
        fontFamily: 'Popppins',
        color: '#373A42',
        marginBottom: 16,
        borderRadius: 16,
      }}
    />
  );
}
