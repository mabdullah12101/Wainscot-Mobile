import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ButtonAuth from '../../components/Button/auth';
import InputWithLabel from '../../components/Input/label';
import {getDataUserById, updatePassword} from '../../stores/actions/user';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native-paper';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangeForm = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleChangePassword = () => {
    dispatch(updatePassword(user.data.userId, form))
      .then(res => {
        const result = res.action.payload.data;
        setForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        dispatch(getDataUserById(user.data.userId));
        Toast.show({type: 'success', text1: 'Success', text2: result.message});
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Change Password',
          text2: 'Change Password Failed',
        });
      });
  };

  return (
    <ScrollView className="bg-main-blue h-screen">
      <View className="bg-white h-screen mt-3 rounded-t-[40px] px-7 py-11">
        <InputWithLabel
          label={'Old Password'}
          placeholder={'Input Old Password ...'}
          secureTextEntry={true}
          value={form.oldPassword}
          handleChange={value => handleChangeForm('oldPassword', value)}
        />
        <InputWithLabel
          label={'New Password'}
          placeholder={'Input New Password ...'}
          secureTextEntry={true}
          value={form.newPassword}
          handleChange={value => handleChangeForm('newPassword', value)}
        />
        <InputWithLabel
          label={'Confirm Password'}
          placeholder={'Input Confirm Password ...'}
          secureTextEntry={true}
          value={form.confirmPassword}
          handleChange={value => handleChangeForm('confirmPassword', value)}
        />

        <ButtonAuth
          content={
            user.isLoading ? <ActivityIndicator color={'#FFFFFF'} /> : 'Update'
          }
          isLoading={user.isLoading}
          onPress={handleChangePassword}
        />
      </View>
    </ScrollView>
  );
}
