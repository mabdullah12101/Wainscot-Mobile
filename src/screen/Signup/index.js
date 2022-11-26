import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ButtonAuth from '../../components/Button/auth';
import InputAuth from '../../components/Input/auth';
import axios from '../../utils/axios';
import Toast from 'react-native-toast-message';

export default function Signup(props) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post('auth/register', form);
      Toast.show({
        type: 'success',
        text1: 'Sign Up',
        text2: result.data.message,
      });
      setLoading(false);
      props.navigation.navigate('Signin');
    } catch (error) {
      Toast.show({type: 'error', text1: 'Sign Up', text2: 'Sign Up Failed'});
      setLoading(false);
    }
  };

  const navLogin = () => {
    props.navigation.navigate('Signin');
  };

  const handleChangeForm = (name, value) => {
    setForm({...form, [name]: value});
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

      <InputAuth
        placeholder={'Full Name'}
        handleChange={value => handleChangeForm('name', value)}
      />
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
      <InputAuth
        placeholder={'Confirm Password'}
        secureTextEntry={true}
        handleChange={value => handleChangeForm('confirmPassword', value)}
      />

      <View className="mb-6" />

      <ButtonAuth
        content={loading ? <ActivityIndicator color={'white'} /> : 'Sign Up'}
        isLoading={loading}
        onPress={handleSignup}
      />
    </ScrollView>
  );
}
