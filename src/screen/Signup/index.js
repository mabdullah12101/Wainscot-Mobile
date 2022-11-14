import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import ButtonAuth from '../../components/Button/auth';
import InputAuth from '../../components/Input/auth';

export default function Signup(props) {
  const handleSignup = () => {
    props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
  };

  const navLogin = () => {
    props.navigation.navigate('Signin');
  };

  return (
    <ScrollView className="px-7 flex-1 bg-white">
      <Text className="text-2xl font-poppins600 text-black tracking-[1px] mb-4">
        Sign Up
      </Text>

      <View className="mb-12 flex-row items-center gap-x-2">
        <Text className="text-sm font-poppins400 text-black tracking-[0.5px]">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={navLogin}>
          <Text className="font-poppins600 text-main-blue tracking-small">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      <InputAuth placeholder={'Full Name'} />
      <InputAuth placeholder={'Email'} keyboardType="email-address" />
      <InputAuth placeholder={'Password'} secureTextEntry={true} />
      <InputAuth placeholder={'Confirm Password'} secureTextEntry={true} />

      <View className="mb-6" />

      <ButtonAuth content={'Sign Up'} onPress={handleSignup} />
    </ScrollView>
  );
}
