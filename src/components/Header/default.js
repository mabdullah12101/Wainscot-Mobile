import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function HeaderDefault({navigation, name, variant}) {
  const navBack = () => {
    navigation.goBack();
  };

  return (
    <View
      className={`p-7 flex-row justify-between items-center ${
        variant ? variant : 'bg-white'
      }`}>
      <TouchableOpacity onPress={navBack}>
        <Icon
          name="arrowleft"
          size={24}
          color={`${variant ? '#FFFFFF' : '#373A42'}`}
        />
      </TouchableOpacity>
      <View>
        <Text className="font-poppins600 tracking-medium text-white">
          {name}
        </Text>
      </View>
      <View />
    </View>
  );
}
