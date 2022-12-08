import React, {useState} from 'react';
import {
  ActivityIndicator,
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
import ButtonAuth from '../../components/Button/auth';
import Config from 'react-native-config';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDataUserById,
  updateImage,
  updateProfileUser,
} from '../../stores/actions/user';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';

export default function EditProfile() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
  const [newImage, setNewImage] = useState({});
  const lengthImage = Object.keys(newImage).length;
  const [loading, setLoading] = useState(false);

  const getDataUser = () => {
    setLoading(true);
    dispatch(getDataUserById(user.data.userId))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleChangeForm = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleEditProfile = () => {
    setLoading(true);
    dispatch(updateProfileUser(user.data.userId, form))
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Update Profile',
          text2: 'Success Update Profile',
        });
        getDataUser();
      })
      .catch(() => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Update Profile',
          text2: 'Failed Update Profile',
        });
      });
  };

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary();
      setNewImage({['image']: result.assets[0]});
    } catch (error) {}
  };

  const handleUpdateImage = () => {
    const imageData = new FormData();
    imageData.append('image', {
      uri: newImage.image.uri,
      name: newImage.image.fileName,
      type: newImage.image.type,
    });
    console.log(imageData);
    setLoading(true);
    updateImage(user.data.userId, imageData)
      .then(response => {
        console.log('response');
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: 'Update Image',
          text2: response.data.message,
        });
        getDataUser();
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Update Image',
          text2: error.response.data.message,
        });
      });
  };

  return (
    <ScrollView className="flex-1 bg-main-blue">
      <View className="bg-white flex-1 rounded-t-[40px] p-7">
        <View className="items-center">
          <TouchableOpacity
            className="w-[137px] h-[137px] border-4 border-main-blue rounded-full p-2 overflow-hidden relative"
            onPress={handleImagePicker}>
            <View className="absolute z-50 top-12 right-12">
              <Icon name="camera" size={30} color="white" />
            </View>
            <FastImage
              source={{
                uri:
                  lengthImage > 0
                    ? newImage.image.uri
                    : user.data.image
                    ? Config.CLOUDINARY_URL_IMAGE + user.data.image
                    : Config.CLOUDINARY_DEFAULT_IMAGE,
              }}
              className="w-full h-full rounded-full"
            />
          </TouchableOpacity>

          {lengthImage < 1 ? (
            <TouchableOpacity
              className="justify-center items-center border border-main-blue w-40 h-12 rounded-lg mt-5"
              onPress={handleImagePicker}>
              <Text className="font-poppins600 text-main-blue">
                Choose Photo
              </Text>
            </TouchableOpacity>
          ) : loading ? (
            <View className="justify-center items-center border border-main-blue w-40 h-12 rounded-lg mt-5">
              <ActivityIndicator color={'blue'} />
            </View>
          ) : (
            <TouchableOpacity
              className="justify-center items-center border border-main-blue w-52 h-12 rounded-lg mt-5"
              onPress={handleUpdateImage}>
              <Text className="font-poppins600 text-main-blue">Save</Text>
            </TouchableOpacity>
          )}

          <Text className="text-main-black font-poppins400 text-xs tracking-small mt-3 mb-1">
            Image size: max, 500 KB
          </Text>
          <Text className="text-main-black font-poppins400 text-xs tracking-small">
            Image formats: JPG, JPEG, PNG
          </Text>
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
              <View className="border border-main-gray px-6 py-4 rounded-2xl text-sm tracking-medium font-poppins400 text-main-black mb-4">
                <Text className="text-main-black font-poppins400 text-sm tracking-medium">
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

          <ButtonAuth
            content={loading ? <ActivityIndicator color={'white'} /> : 'Save'}
            onPress={handleEditProfile}
            isLoading={loading}
          />
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
