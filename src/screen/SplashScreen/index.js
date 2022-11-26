import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

export default function SplashScreen(props) {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      props.navigation.replace('AppScreen');
    } else {
      props.navigation.replace('AuthScreen');
    }
  };

  return (
    <View className="h-screen bg-main-blue pt-24">
      <View className="items-center px-10">
        <Text className="font-poppins600 tracking-large text-5xl text-white items-center mb-5 leading-[60px]">
          Find Events
        </Text>
        <Text className="font-poppins600 tracking-large text-5xl text-white items-center">
          You Love
        </Text>
      </View>

      <FastImage
        source={require('../../assets/img/splash.png')}
        className="w-full h-full"
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
}
