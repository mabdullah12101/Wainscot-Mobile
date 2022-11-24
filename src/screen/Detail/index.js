import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Attendees from '../../components/Detail/attendees';
import IconContent from '../../components/Detail/iconcontent';
import axios from '../../utils/axios';
import moment from 'moment';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

export default function Detail({navigation, route}) {
  const eventId = route.params.eventId;
  const [data, setData] = useState({});
  const userId = useSelector(state => state.user.data.userId);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [checkWishlist, setCheckWishlist] = useState();

  const navBack = () => {
    navigation.goBack();
  };

  const navOrder = id => {
    navigation.navigate('Order', {eventId: id});
  };

  useEffect(() => {
    getEventById();
    getWishlistById();
  }, []);

  useEffect(() => {
    getWishlistById();
  }, [checkWishlist]);

  const getEventById = async () => {
    try {
      setLoadingUser(true);
      const result = await axios.get(`/event/${eventId}`);
      setData(result.data.data[0]);
      setLoadingUser(false);
    } catch (error) {
      console.log(error);
      setLoadingUser(false);
    }
  };

  const getWishlistById = async () => {
    try {
      setLoadingWishlist(true);
      const result = await axios.get(`/wishlist/userId/${userId}`);
      result.data.data.map(item => {
        if (item.eventId === eventId) {
          setCheckWishlist(item.wishlistId);
        }
      });
      setLoadingWishlist(false);
    } catch (error) {
      console.log(error);
      setLoadingWishlist(false);
    }
  };

  const addWishlist = async () => {
    try {
      const result = await axios.post('/wishlist', {
        eventId: eventId,
        userId: userId,
      });
      setCheckWishlist(result.data.data[0].wishlistId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWishlist = async () => {
    try {
      await axios.delete(`/wishlist/${checkWishlist}`);
      setCheckWishlist('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    try {
      setLoadingWishlist(true);
      if (!checkWishlist) {
        addWishlist();
      } else {
        deleteWishlist();
      }
    } catch (error) {
      console.log(error);
      setLoadingWishlist(false);
    }
  };

  return (
    <ScrollView>
      <View className="absolute bottom-5 z-50 w-full px-7">
        <TouchableOpacity
          className="w-full items-center bg-main-blue py-4 rounded-2xl shadow-lg shadow-blue-500"
          onPress={() => navOrder(eventId)}>
          <Text className="font-poppins600 tracking-medium text-white">
            Buy Ticket
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-[490px] absolute">
        <FastImage
          source={{uri: Config.CLOUDINARY_URL_IMAGE + data.image}}
          className="w-full h-full"
        />
      </View>

      <View className="flex-row justify-between items-center p-7">
        <TouchableOpacity onPress={navBack}>
          <Icon name="arrowleft" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        {loadingWishlist ? (
          <ActivityIndicator color={'blue'} />
        ) : (
          <TouchableOpacity onPress={handleWishlist}>
            <Icon
              name={checkWishlist ? 'heart' : 'hearto'}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>

      <View>
        {loadingUser ? (
          <View className="h-64 justify-center items-center">
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View className="px-7 mt-12">
            <Text className="font-poppins600 text-white tracking-large text-2xl max-w-xs leading-9 mb-3">
              {data.name}
            </Text>

            <View>
              <IconContent icon={'location'} content={data.location} />
              <IconContent
                icon={'clock'}
                content={moment(data.dateTimeShow).format('ddd, DD MMM, hh A')}
              />
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
        )}

        <View className="bg-[#192038] rounded-t-[40px] mt-12 pt-7">
          {loadingUser ? (
            <View className="h-20">
              <ActivityIndicator size={'large'} color="white" />
            </View>
          ) : (
            <View className="px-7">
              <Text className="font-poppins600 text-xl text-white tracking-medium">
                Event Detail
              </Text>
              <Text className="font-poppins400 text-xs tracking-medium text-main-gray max-w-xs mt-4">
                {data.detail}
              </Text>
            </View>
          )}

          <View className="bg-white rounded-t-[40px] mt-6 px-7 pt-7 pb-28">
            <Text className="font-poppins600 text-xl text-main-black tracking-medium mb-4">
              Location
            </Text>

            <View className="w-full h-40">
              <FastImage
                source={require('../../assets/img/location.png')}
                className="w-full h-full"
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
