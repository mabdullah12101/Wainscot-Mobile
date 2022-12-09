import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import ListBooking from '../../components/Booking';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import DetailBooking from '../../components/Booking/DetailBooking';
import axios from '../../utils/axios';

export default function MyBooking() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingAll, setLoadingAll] = useState(true);
  const userId = useSelector(state => state.user.data.userId);
  const [modalDetail, setModalDetail] = useState(false);
  const [totalPage, setTotalPage] = useState(10);
  const [detailBooking, setDetailBooking] = useState({});
  const [last, setLast] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    getBooking();
  }, []);

  useEffect(() => {
    getBooking();
  }, [page]);

  const getBooking = async () => {
    try {
      if (page <= totalPage) {
        const result = await axios.get(`booking/${userId}?page=${page}`);
        console.log(result.data);
        if (result.data.data.length > 0) {
          if (page === 1) {
            setData(result.data.data);
          } else {
            setData([...data, ...result.data.data]);
          }
          setTotalPage(result.data.pagination.totalPage);
        }
      } else {
        setLast(true);
      }
      setRefresh(false);
      setLoading(false);
      setLoadingAll(false);
      setLoadMore(false);
    } catch (error) {}
  };

  const handleRefresh = () => {
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getBooking();
    }
  };

  const handleLoadMore = () => {
    if (!loadMore) {
      // false
      const newPage = page + 1; // 1 + 1 = 2
      setLoadMore(true);
      if (newPage <= totalPage + 1) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
  };

  const handleDetailBooking = detail => {
    setModalDetail(true);
    setDetailBooking(detail);
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
              <Icon name="close" size={20} color="gray" />
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
            data.length > 3 ? '' : 'h-screen'
          }`}>
          {loadingAll ? (
            <View className="mt-48 items-center h-screen">
              <ActivityIndicator size={'large'} color="blue" />
            </View>
          ) : data.length < 1 ? (
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
                data={data}
                keyExtractor={item => item.bookingId}
                renderItem={({item}) => (
                  <ListBooking
                    data={item}
                    onPress={() => handleDetailBooking(item)}
                  />
                )}
                onRefresh={handleRefresh}
                refreshing={refresh}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (
                  <View className="items-center">
                    {last ? (
                      <Text className="my-10">-- No more data --</Text>
                    ) : loading ? (
                      <View className="my-10">
                        <ActivityIndicator size="large" color="blue" />
                      </View>
                    ) : null}
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
}
