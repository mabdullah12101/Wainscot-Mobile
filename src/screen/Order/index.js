import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from '../../utils/axios';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

export default function Order({route, navigation}) {
  const userId = useSelector(state => state.user.data.userId);
  const [listBooking, setListBooking] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [section, setSection] = useState([]);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(section);

  const eventId = route.params.eventId;

  useEffect(() => {
    getDataEvent();
  }, []);

  useEffect(() => {
    getTotalPayment();
    getSection();
  }, [dataOrder]);

  useEffect(() => {
    listBooking.map(item => {
      dataOrder.push({
        available: item.available,
        seat: item.section,
        qty: 0,
        price: 0,
      });
    });
  }, [listBooking]);

  const getDataBooking = async () => {
    try {
      setLoadingBooking(true);
      const dataBooking = await axios.get(`/booking/section/${eventId}`);
      const seat = [
        {
          type: 'VVIP',
          section: 1,
        },
        {type: 'VIP', section: 7},
        {type: 'REG', section: 9},
      ];
      const result = seat.map(item => {
        let data = [];
        for (let i = 1; i <= 4; i++) {
          for (let j = 1; j <= item.section; j++) {
            const filterSeat = dataBooking.data.data.filter(
              dataSeat => dataSeat.section === `${item.type}${i}-${j}`,
            );
            const checkData = data.filter(
              dataAvailable => dataAvailable.type === item.type,
            );
            if (checkData.length < 1) {
              if (filterSeat.length < 1) {
                data.push({
                  type: item.type,
                  section: `${item.type}${i}-${j}`,
                  available: item.type.includes('VVIP')
                    ? 10
                    : item.type.includes('VIP')
                    ? 20
                    : 30,
                });
              }
              if (filterSeat.length > 0 && !filterSeat[0]?.statusFull) {
                data.push({
                  type: filterSeat[0].section.includes('VVIP')
                    ? 'VVIP'
                    : item.type.includes('VIP')
                    ? 'VIP'
                    : 'REG',
                  section: filterSeat[0].section,
                  available: filterSeat[0].available,
                });
              }
            }
          }
        }
        return data;
      });
      const newResult = result.map(item => item[0]);
      setListBooking(newResult);
      setLoadingBooking(false);
    } catch (error) {
      console.log(error);
      setLoadingBooking(false);
    }
  };

  const getDataEvent = async () => {
    try {
      setLoadingEvent(true);
      const result = await axios.get(`/event/${eventId}`);
      setDataEvent(result.data.data);
      getDataBooking();
      setLoadingEvent(false);
    } catch (error) {
      console.log(error);
      setLoadingEvent(false);
    }
  };

  const increaseOrderSeat = data => {
    const findData = dataOrder.find(item => item.seat === data.seat);

    if (findData.qty < data.available) {
      const price = data.seat.includes('VVIP')
        ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
        : data.seat.includes('VIP')
        ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
        : dataEvent[0].price; // HARGA TIDAK BERUBAH UNTUK REGULAR
      findData.qty += 1;
      findData.price = price * findData.qty;
      setDataOrder([...dataOrder]);
    }
  };

  const decreaseOrderSeat = data => {
    const findData = dataOrder.find(item => item.seat === data.seat);
    if (findData.qty > 0) {
      const price = data.seat.includes('VVIP')
        ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
        : data.seat.includes('VIP')
        ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
        : dataEvent[0].price; // HARGA TIDAK BERUBAH UNTUK REGULAR
      findData.qty -= 1;
      findData.price = price * findData.qty;
      setDataOrder([...dataOrder]);
    }
  };

  const getTotalPayment = () => {
    let totalPayment = 0;
    dataOrder.map(item => {
      totalPayment = totalPayment + item.price;
    });
    setTotalPrice(totalPayment);
  };

  const getSection = () => {
    const tempSection = [];
    dataOrder.map(item => {
      for (let i = 0; i < item.qty; i++) {
        tempSection.push(item.seat);
      }
    });
    setSection(tempSection);
  };

  const createBooking = () => {
    setLoading(true);
    const data = {
      userId: userId,
      eventId: eventId,
      totalTicket: section.length,
      totalPayment: totalPrice,
      section: section,
    };

    axios
      .post('/booking', data)
      .then(res => {
        console.log(res.data.data.redirect_url);
        setLoading(false);
        navigation.navigate('Payment', {url: res.data.data.redirect_url});
      })
      .catch(() => {
        setLoading(false);
        Toast.show({type: 'error', text1: 'Order', text2: 'Order Failed'});
      });
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="bg-main-blue">
        <View className="bg-white mt-1 flex-1 rounded-t-[40px] py-8">
          <View className="w-full h-56 items-center">
            <FastImage
              source={require('../../assets/img/order.png')}
              className="w-full h-full"
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          {loadingEvent || loadingBooking ? (
            <View className="h-96 justify-center items-center">
              <ActivityIndicator size={'large'} color="blue" />
            </View>
          ) : (
            <View className="px-7">
              <Text className="font-poppins600 text-main-black tracking-medium text-xl mt-10">
                Tickets
              </Text>

              <FlatList
                data={dataOrder}
                renderItem={({item}) => (
                  <View>
                    <View className="flex-row items-center justify-between mt-8">
                      <View className="flex-row items-center">
                        <View className="w-12 h-12 rounded-lg bg-[#F1EAFF] justify-center items-center mr-3">
                          <FastImage
                            source={
                              item.seat.split('-')[0].includes('VVIP')
                                ? require('../../assets/img/vvip.png')
                                : item.seat.split('-')[0].includes('VIP')
                                ? require('../../assets/img/vip.png')
                                : require('../../assets/img/reg.png')
                            }
                            resizeMode={FastImage.resizeMode.contain}
                            className="w-9 h-9"
                          />
                        </View>
                        <View>
                          <Text className="font-poppins600 text-sm text-main-black tracking-medium">
                            SECTION {item.seat.split('-')[0]}, ROW{' '}
                            {item.seat.split('-')[1]}
                          </Text>
                          <Text className="font-poppins500 text-xs text-[#BDC0C4] mt-1">
                            {item.available} Seats available
                          </Text>
                        </View>
                      </View>
                      <View className="items-center">
                        <Text className="font-poppins600 text-base text-main-black tracking-medium">
                          {item.price}
                        </Text>
                        <Text className="font-poppins500 text-xs text-[#BDC0C4] mt-1 tracking-small">
                          per person
                        </Text>
                      </View>
                    </View>

                    <View className="ml-16 flex-row items-center justify-between mt-4">
                      <Text className="font-poppins600 text-xs tracking-medium text-main-black">
                        Quantity
                      </Text>
                      <View className="flex-row gap-x-5">
                        <TouchableOpacity
                          className="w-8 h-7 border border-main-gray rounded-lg justify-center items-center"
                          onPress={() => decreaseOrderSeat(item)}>
                          <Icon name="minus" size={10} color="#C1C5D0" />
                        </TouchableOpacity>

                        <Text className="font-poppins400 text-main-black">
                          {item.qty}
                        </Text>

                        <TouchableOpacity
                          className="w-8 h-7 border border-main-gray rounded-lg justify-center items-center"
                          onPress={() => increaseOrderSeat(item)}>
                          <Icon name="plus" size={10} color="#C1C5D0" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />

              <View className="mt-12">
                <View className="flex-row mb-4">
                  <Text className="basis-1/2 font-poppins600 text-sm text-main-black tracking-small">
                    Ticket Section
                  </Text>
                  <View className="basis-1/2 items-end">
                    <Text className="font-poppins600 text-sm text-main-blue tracking-small">
                      {dataOrder.filter(item => item.qty > 0).length > 0
                        ? dataOrder
                            .filter(item => item.qty > 0)
                            .map(item => item.seat + ' ')
                        : 'None'}
                    </Text>
                  </View>
                </View>

                <View className="flex-row mb-4">
                  <Text className="basis-1/2 font-poppins600 text-sm text-main-black tracking-small">
                    Quantity
                  </Text>
                  <View className="basis-1/2 items-end">
                    <Text className="font-poppins600 text-sm text-main-blue tracking-small">
                      {section.length}
                    </Text>
                  </View>
                </View>

                <View className="flex-row mb-4">
                  <Text className="basis-1/2 font-poppins600 text-sm text-main-black tracking-small">
                    Total Payment
                  </Text>
                  <View className="basis-1/2 items-end">
                    <Text className="font-poppins600 text-sm text-main-blue tracking-small">
                      {totalPrice}
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable
                className="w-full items-center bg-main-blue py-4 rounded-2xl shadow-lg shadow-blue-500 mt-12"
                onPress={createBooking}
                disabled={section.length < 1 ? true : false}>
                {loading ? (
                  <View>
                    <ActivityIndicator color={'white'} />
                  </View>
                ) : (
                  <Text className="font-poppins600 tracking-medium text-white">
                    Checkout
                  </Text>
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
