import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ButtonAuth from '../../components/Button/auth';
import InputAuth from '../../components/Input/auth';
// import Icon from 'react-native-vector-icons/AntDesign';

export default function Signin(props) {
  const handleLogin = () => {
    props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
  };

  const navSignup = () => {
    props.navigation.navigate('Signup');
  };

  return (
    <ScrollView className="px-7 flex-1 bg-white">
      <Text className="text-2xl font-poppins600 text-black tracking-[1px] mb-4">
        Log In
      </Text>

      <View className="mb-12 flex-row items-center gap-x-2">
        <Text className="text-sm font-poppins400 text-black tracking-[0.5px]">
          Dont have an account?
        </Text>
        <TouchableOpacity onPress={navSignup}>
          <Text className="font-poppins600 text-main-blue tracking-small">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <InputAuth placeholder={'Username'} />
      <InputAuth placeholder={'Email'} keyboardType="email-address" />
      <InputAuth placeholder={'Password'} secureTextEntry={true} />

      <TouchableOpacity className="items-end mt-6 mb-6">
        <Text className="font-poppins600 text-main-blue text-xs tracking-small">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <ButtonAuth content={'Login'} onPress={handleLogin} />
    </ScrollView>
  );
}
