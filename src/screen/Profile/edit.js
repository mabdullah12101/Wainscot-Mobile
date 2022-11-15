import React, {useState} from 'react';
import {
  Image,
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
import InputAuth from '../../components/Input/auth';
import ButtonAuth from '../../components/Button/auth';

export default function EditProfile() {
  const [checked, setChecked] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView className="flex-1 bg-main-blue">
      <View className="bg-white flex-1 rounded-t-[40px] p-7">
        <View className="w-[137px] h-[137px] mx-auto border-4 border-main-blue rounded-full p-2 overflow-hidden">
          <Image
            source={require('../../assets/img/profile.png')}
            className="w-full h-full rounded-full"
          />
        </View>

        <View className="mt-12">
          <InputWithLabel label={'Name'} placeholder={'Jhon Tomson'} />
          <InputWithLabel label={'Username'} placeholder={'@jhont0'} />
          <InputWithLabel
            label={'Email'}
            placeholder={'jhont0@mail.com'}
            keyboardType={'email-address'}
          />
          <InputWithLabel label={'Phone'} placeholder={'081234567890'} />

          <View className="mb-7">
            <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
              Gender
            </Text>

            <View className="flex-row">
              <InputRadio
                checked={checked}
                content="Male"
                onPress={() => setChecked('Male')}
              />

              <InputRadio
                checked={checked}
                content="Female"
                onPress={() => setChecked('Female')}
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
              onValueChange={value => console.log(value)}
              Icon={() => {
                return <Icon name="down" size={24} color="#979797" />;
              }}
              items={[
                {label: 'Football', value: 'football'},
                {label: 'Baseball', value: 'baseball'},
                {label: 'Hockey', value: 'hockey'},
              ]}
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
              onValueChange={value => console.log(value)}
              Icon={() => {
                return <Icon name="down" size={24} color="#979797" />;
              }}
              items={[
                {label: 'Football', value: 'football'},
                {label: 'Baseball', value: 'baseball'},
                {label: 'Hockey', value: 'hockey'},
              ]}
            />
          </View>

          <View className="mb-12">
            <Text className="text-main-black font-poppins400 tracking-medium text-sm mb-3">
              Birthday Date
            </Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <InputAuth editable={false} placeholder={'DD/MM/YYYY'} />
              <DatePicker
                modal
                open={open}
                date={date}
                mode={'date'}
                // eslint-disable-next-line no-shadow
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>

          <ButtonAuth content={'Save'} />
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
