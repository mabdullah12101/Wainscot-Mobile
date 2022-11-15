import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Profile({navigation}) {
  const navEditProfile = () => navigation.navigate('Edit Profile');

  return (
    <ScrollView className="bg-main-blue flex-1">
      <View className="bg-white flex-1 rounded-t-[40px] p-7 mt-3">
        <View className="w-[137px] h-[137px] mx-auto border-4 border-main-blue rounded-full p-2 overflow-hidden">
          <Image
            source={require('../../assets/img/profile.png')}
            className="w-full h-full rounded-full"
          />
        </View>

        <View className="items-center mt-5">
          <Text className="font-poppins600 text-xl tracking-medium text-main-black mb-2">
            Jhon Tomson
          </Text>
          <Text className="font-poppins400 text-xs tracking-small text-[#373A42BF]">
            Entrepreneur, ID
          </Text>
        </View>

        <View className="flex-row justify-between items-center my-7">
          <Text className="font-poppins600 text-xl tracking-medium text-main-black mb-2">
            Card
          </Text>
          <TouchableOpacity className="border border-dashed border-main-blue justify-center items-center w-11 h-11 rounded-lg">
            <Icon name="plus" size={24} color="#3366FF" />
          </TouchableOpacity>
        </View>

        <Image source={require('../../assets/img/card.png')} />

        <TouchableOpacity
          className="flex-row justify-between items-center mt-7"
          onPress={navEditProfile}>
          <View className="flex-row gap-x-6">
            <Icon name="edit" size={24} color="#C1C5D0" />
            <Text className="font-poppins600 text-sm tracking-medium text-main-black">
              Edit Profile
            </Text>
          </View>
          <View>
            <Icon name="right" size={24} color="#373A42" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center mt-7 mb-5">
          <View className="flex-row gap-x-6">
            <Icon name="lock" size={24} color="#C1C5D0" />
            <Text className="font-poppins600 text-sm tracking-medium text-main-black">
              Change Password
            </Text>
          </View>
          <View>
            <Icon name="right" size={24} color="#373A42" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// const style = StyleSheet.create({});
