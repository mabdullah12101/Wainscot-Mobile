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
import {useDispatch, useSelector} from 'react-redux';
import ListBooking from '../../components/Booking';
import {getBookingByUserId} from '../../stores/actions/booking';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import DetailBooking from '../../components/Booking/DetailBooking';

export default function MyBooking() {
  const [page, setPage] = useState(1);
  const [loadingAll, setLoadingAll] = useState(true);
  const userId = useSelector(state => state.user.data.userId);
  const bookings = useSelector(state => state.bookings);
  const [modalDetail, setModalDetail] = useState(false);
  const [detailBooking, setDetailBooking] = useState({});
  //   console.log(bookings.data);
  const dispatch = useDispatch();
  console.log(detailBooking);

  useEffect(() => {
    dispatch(getBookingByUserId(userId, page)).then(() => {
      setLoadingAll(false);
    });
  }, [page]);

  const handleDetailBooking = data => {
    setModalDetail(true);
    setDetailBooking(data);
  };

  const handleCloseModal = () => {
    setModalDetail(false);
    setDetailBooking({});
  };

  return (
    <>
      <Modal isVisible={modalDetail}>
        <ScrollView className="bg-white rounded-xl py-5">
          <View className="flex-row justify-center relative items-center">
            <Text className="text-main-black font-poppins600 text-lg">
              Detail Booking
            </Text>
            <TouchableOpacity
              className="absolute right-4"
              onPress={handleCloseModal}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>

          {Object.keys(detailBooking).length > 0 ? (
            <View className="px-5 mt-12">
              <DetailBooking
                title={'Event'}
                content={detailBooking.event.name}
              />

              <DetailBooking
                title={'Location'}
                content={detailBooking.event.location}
              />

              <DetailBooking
                title={'Date Time Show'}
                content={moment(detailBooking.event.dateTimeShow).format(
                  'ddd, DD MMM, hh A',
                )}
              />

              <DetailBooking
                title={'Total Ticket'}
                content={detailBooking.totalTicket}
              />

              <DetailBooking
                title={'Total Payment'}
                content={detailBooking.totalPayment}
              />

              <DetailBooking
                title={'Status Payment'}
                content={detailBooking.statusPayment}
              />

              <DetailBooking
                title={'Section'}
                content={detailBooking.bookingSection.map(
                  item => `${item.section} `,
                )}
              />
            </View>
          ) : (
            ''
          )}
        </ScrollView>
      </Modal>

      <View className="bg-main-blue">
        <View
          className={`bg-white px-7 rounded-t-[40px] mt-3 ${
            bookings.data.length > 3 ? '' : 'h-screen'
          }`}>
          {loadingAll ? (
            <View className="mt-48 items-center h-screen">
              <ActivityIndicator size={'large'} color="blue" />
            </View>
          ) : bookings.data.length < 1 ? (
            <View className="items-center mt-48 h-screen">
              <Text className="text-main-black font-poppins600 text-2xl tracking-medium">
                No tickets bought
              </Text>
              <Text className="text-[#B3B8B8] font-poppins500 text-sm tracking-small items-center mt-4">
                It appears you haven't bought any tickets
              </Text>
              <Text className="text-[#B3B8B8] font-poppins500 text-sm tracking-small items-center mt-2">
                yet. Maybe try searching these?
              </Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={bookings.data}
                keyExtractor={item => item.bookingId}
                renderItem={({item}) => (
                  <ListBooking
                    data={item}
                    onPress={() => handleDetailBooking(item)}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
}
