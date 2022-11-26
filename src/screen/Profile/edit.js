import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputWithLabel from '../../components/Input/label';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import InputRadio from '../../components/Input/radio';
import DatePicker from 'react-native-date-picker';
// import InputAuth from '../../components/Input/auth';
import ButtonAuth from '../../components/Button/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axios';
import Config from 'react-native-config';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getDataUserById, updateProfileUser} from '../../stores/actions/user';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

export default function EditProfile() {
  // const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  // const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
  // const [user, setUser] = useState({});
  const user = useSelector(state => state.user);

  const [form, setForm] = useState({
    name: user.data.name,
    username: user.data.username,
    email: user.data.email,
    phoneNumber: user.data.phoneNumber,
    gender: user.data.gender,
    profession: user.data.profession,
    nationality: user.data.nationality,
    dateOfBirth: user.data.dateOfBirth,
  });

  // console.log(moment(date).format('DD-MM-YYYY'));
  // console.log(date);
  console.log(new Date(user.dateOfBirth));
  console.log(form);

  // useEffect(() => {
  //   getUserById();
  // }, []);

  // const getUserById = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('userId');
  //     setUserId(data);
  //     const result = await axios.get(`user/${data}`);
  //     const resultData = result.data.data[0];
  //     setUser(resultData);
  //     setForm({
  //       name: resultData.name,
  //       username: resultData.username,
  //       email: resultData.email,
  //       phoneNumber: resultData.phoneNumber,
  //       gender: resultData.gender,
  //       profession: resultData.profession,
  //       nationality: resultData.nationality,
  //       dateOfBirth: resultData.dateOfBirth,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChangeForm = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleEditProfile = () => {
    dispatch(updateProfileUser(user.data.userId, form))
      .then(() => {
        dispatch(getDataUserById(user.data.userId));

        Toast.show({
          type: 'success',
          text1: 'Update Profile',
          text2: 'Success Update Profile',
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Update Profile',
          text2: 'Failed Update Profile',
        });
      });
    // console.log(form);
    // try {
    //   console.log(form);
    //   const result = await axios.patch(`user/${userId}`, form);

    //   alert(result.data.message);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <ScrollView className="flex-1 bg-main-blue">
      <View className="bg-white flex-1 rounded-t-[40px] p-7">
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

        <View className="mt-12">
          <InputWithLabel
            label={'Name'}
            value={form.name}
            handleChange={value => handleChangeForm('name', value)}
          />
          <InputWithLabel
            label={'Username'}
            value={form.username}
            handleChange={value => handleChangeForm('username', value)}
          />

          <InputWithLabel
            label={'Email'}
            keyboardType={'email-address'}
            value={form.email}
            editable={false}
          />
          <InputWithLabel
            label={'Phone'}
            value={form.phoneNumber}
            handleChange={value => handleChangeForm('phoneNumber', value)}
          />

          <View className="mb-7">
            <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
              Gender
            </Text>

            <View className="flex-row">
              <InputRadio
                checked={form.gender}
                content="Male"
                onPress={() => setForm({...form, ['gender']: 'male'})}
              />

              <InputRadio
                checked={form.gender}
                content="Female"
                onPress={() => setForm({...form, ['gender']: 'female'})}
              />
            </View>
          </View>

          <View className="mb-7">
            <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
              Profession
            </Text>
            <RNPickerSelect
              placeholder={{label: 'Select Profession', value: null}}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              onValueChange={value => setForm({...form, ['profession']: value})}
              Icon={() => {
                return <Icon name="down" size={24} color="#979797" />;
              }}
              items={[
                {label: 'Accountant', value: 'Accountant'},
                {label: 'Programmer', value: 'Programmer'},
                {label: 'Architect', value: 'Architect'},
                {label: 'Farmer', value: 'Farmer'},
                {label: 'Journalist', value: 'Journalist'},
              ]}
              value={form.profession}
            />
          </View>

          <View className="mb-7">
            <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
              Nationality
            </Text>
            <RNPickerSelect
              placeholder={{label: 'Select Nationality', value: null}}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              onValueChange={value =>
                setForm({...form, ['nationality']: value})
              }
              Icon={() => {
                return <Icon name="down" size={24} color="#979797" />;
              }}
              items={[
                {label: 'Germany', value: 'Germany'},
                {label: 'Japan', value: 'Japan'},
                {label: 'Indonesia', value: 'Indonesia'},
                {label: 'South Korea', value: 'South Korea'},
                {label: 'China', value: 'China'},
              ]}
              value={form.nationality}
            />
          </View>

          <View className="mb-12">
            <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
              Birthday Date
            </Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              {/* <InputAuth
                // editable={false}
                // placeholder={user.dateOfBirth ? user.dateOfBirth : 'DD/MM/YYYY'}
                value={user.dateOfBirth ? user.dateOfBirth : 'DD/MM/YYYY'}
              /> */}
              <View className="border border-main-gray px-6 py-4 rounded-2xl text-sm tracking-medium font-poppins400 text-main-black mb-4">
                <Text>
                  {form.dateOfBirth
                    ? moment(form.dateOfBirth).format('DD-MM-YYYY')
                    : 'DD/MM/YYYY'}
                </Text>
              </View>
              <DatePicker
                modal
                open={open}
                date={
                  form.dateOfBirth ? new Date(form.dateOfBirth) : new Date()
                }
                mode={'date'}
                onConfirm={data => {
                  setOpen(false);
                  console.log(data);
                  setForm({
                    ...form,
                    ['dateOfBirth']: moment(data).format('YYYY-MM-DD'),
                  });
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>

          <ButtonAuth content={'Save'} onPress={handleEditProfile} />
        </View>
      </View>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 17,
    borderWidth: 1,
    borderColor: '#C1C5D0',
    borderRadius: 15,
    color: '#777777',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 20,
    right: 15,
  },
});
