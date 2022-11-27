import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from '../../utils/axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

export default function Profile({navigation}) {
  const user = useSelector(state => state.user.data);

  // useEffect(() => {
  //   getUserById();
  // }, []);

  // const getUserById = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('userId');
  //     const result = await axios.get(`user/${data}`);
  //     setUser(result.data.data[0]);
  //     console.log(result.data.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const navEditProfile = () => navigation.navigate('Edit Profile');
  const navChangePassword = () => navigation.navigate('Change Password');

  return (
    <ScrollView className="bg-main-blue flex-1">
      <View className="bg-white flex-1 rounded-t-[40px] p-7 mt-3">
        <View className="w-[137px] h-[137px] mx-auto border-4 border-main-blue rounded-full p-2 overflow-hidden">
          <FastImage
            source={{
              uri: user.image
                ? Config.CLOUDINARY_URL_IMAGE + user.image
                : Config.CLOUDINARY_DEFAULT_IMAGE,
            }}
            className="w-full h-full rounded-full"
          />
        </View>

        <View className="items-center mt-5">
          <Text className="font-poppins600 text-xl tracking-medium text-main-black mb-2">
            {user.name}
          </Text>
          <Text className="font-poppins400 text-xs tracking-small text-[#373A42BF]">
            {user.profession ? user.profession : 'Profession Not Set'}
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

        <View className="w-72 h-44">
          <FastImage
            source={require('../../assets/img/card.png')}
            className="w-full h-full"
          />
        </View>

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

        <TouchableOpacity
          className="flex-row justify-between items-center mt-7 mb-5"
          onPress={navChangePassword}>
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
