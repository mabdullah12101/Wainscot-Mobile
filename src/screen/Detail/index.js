import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Attendees from '../../components/Detail/attendees';
import IconContent from '../../components/Detail/iconcontent';

export default function Detail({navigation}) {
  const navBack = () => {
    navigation.goBack();
  };

  const navOrder = () => {
    navigation.navigate('Order');
  };

  return (
    <ScrollView>
      <View className="absolute bottom-5 z-50 w-full px-7">
        <TouchableOpacity
          className="w-full items-center bg-main-blue py-4 rounded-2xl shadow-lg shadow-blue-500"
          onPress={navOrder}>
          <Text className="font-poppins600 tracking-medium text-white">
            Buy Ticket
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-[490px] absolute">
        <Image
          source={require('../../assets/img/event1.png')}
          className="w-full h-full"
        />
      </View>

      <View className="flex-row justify-between items-center p-7">
        <TouchableOpacity onPress={navBack}>
          <Icon name="arrowleft" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="hearto" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="mt-12">
        <View className="px-7">
          <Text className="font-poppins600 text-white tracking-large text-2xl max-w-xs leading-9 mb-3">
            Sights & Sounds Exhibition
          </Text>

          <View>
            <IconContent icon={'location'} content="Jakarta, Indonesia" />
            <IconContent icon={'clock'} content="Wed, 15 Nov, 4:00 PM" />
          </View>

          <View className="mt-6">
            <Text className="font-poppins500 text-sm tracking-small text-white mb-3">
              Attendees
            </Text>

            <View className="flex-row">
              <Attendees />
              <Attendees minus={true} />
              <Attendees minus={true} />
              <Attendees minus={true} />
            </View>
          </View>
        </View>

        <View className="bg-[#192038] rounded-t-[40px] mt-12 pt-7">
          <View className="px-7">
            <Text className="font-poppins600 text-xl text-white tracking-medium">
              Event Detail
            </Text>
            <Text className="font-poppins400 text-xs tracking-medium text-main-gray max-w-xs mt-4">
              After his controversial art exhibition "Tear and Consume" back in
              November 2018, in which guests were invited to tear up…
            </Text>
          </View>

          <View className="bg-white rounded-t-[40px] mt-6 px-7 pt-7 pb-28">
            <Text className="font-poppins600 text-xl text-main-black tracking-medium mb-4">
              Location
            </Text>

            <View className="w-full">
              <Image
                source={require('../../assets/img/location.png')}
                className="w-full"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// const style = StyleSheet.create({});
