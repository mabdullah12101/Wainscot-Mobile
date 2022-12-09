import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonAuth from '../../components/Button/auth';
import InputAuth from '../../components/Input/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {getDataUserById} from '../../stores/actions/user';
import {login} from '../../stores/actions/auth';
import Toast from 'react-native-toast-message';
import {getAllWishlishtByUserId} from '../../stores/actions/wishlist';

export default function Signin(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChangeForm = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleLogin = async () => {
    setLoading(true);
    await login(form)
      .then(res => {
        console.log(res.data);
        const result = res.data;
        const resultData = result.data[0];
        console.log(resultData);
        dispatch(getDataUserById(resultData.userId));
        dispatch(getAllWishlishtByUserId(resultData.userId, 1));
        AsyncStorage.setItem('token', resultData.token);
        AsyncStorage.setItem('refreshToken', resultData.refreshToken);
        setLoading(false);
        Toast.show({type: 'success', text1: 'Success', text2: result.message});
        props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
      })
      .catch(err => {
        console.log(err.response.data);
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: err.response.data.message,
        });
        setLoading(false);
      });
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

      <ButtonAuth
        content={loading ? <ActivityIndicator color={'#FFFFFF'} /> : 'Login'}
        isLoading={loading}
        onPress={handleLogin}
      />
    </ScrollView>
  );
}
