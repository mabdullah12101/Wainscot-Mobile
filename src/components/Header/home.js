import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export default function HeaderHome({navigation}) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View className="flex-row justify-between items-center bg-main-blue p-7">
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menufold" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="message1" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
