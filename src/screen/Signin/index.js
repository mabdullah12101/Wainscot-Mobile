import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ButtonAuth from '../../components/Button/auth';
import InputAuth from '../../components/Input/auth';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/AntDesign';

export default function Signin(props) {
  const [form, setForm] = useState({});

  const handleLogin = async () => {
    try {
      // props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
      const result = await axios.post('auth/login', form);
      await AsyncStorage.setItem('userId', result.data.data[0].userId);
      await AsyncStorage.setItem('token', result.data.data[0].token);
      await AsyncStorage.setItem(
        'refreshToken',
        result.data.data[0].refreshToken,
      );
      alert(result.data.message);
      props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
    } catch (error) {
      console.log(error);
    }
  };

  const navSignup = () => {
    props.navigation.navigate('Signup');
  };

  const handleChangeForm = (name, value) => {
    setForm({...form, [name]: value});
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

      <InputAuth
        placeholder={'Email'}
        keyboardType="email-address"
        handleChange={value => handleChangeForm('email', value)}
      />
      <InputAuth
        placeholder={'Password'}
        secureTextEntry={true}
        handleChange={value => handleChangeForm('password', value)}
      />

      <TouchableOpacity className="items-end mt-6 mb-6">
        <Text className="font-poppins600 text-main-blue text-xs tracking-small">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <ButtonAuth content={'Login'} onPress={handleLogin} />
    </ScrollView>
  );
}
