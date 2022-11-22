import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardEvent from '../../components/Card/event';
import axios from '../../utils/axios';
import Icon from 'react-native-vector-icons/AntDesign';

export default function AllEvent(props) {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(true);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    getAllEvent();
  }, []);

  useEffect(() => {
    getAllEvent();
  }, [page, sort]);

  const getAllEvent = async () => {
    try {
      if (page <= totalPage) {
        const result = await axios.get(
          `event?page=${page}&limit=4&&column=dateTimeShow&asc=${sort}`,
        );
        if (page === 1) {
          setData(result.data.data);
        } else {
          setData([...data, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);
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
      getAllEvent();
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

  const navDetail = eventId =>
    props.navigation.navigate('Detail', {eventId: eventId});

  const ListHeader = () => {
    return (
      <>
        <TouchableOpacity
          className="items-end my-3"
          onPress={() => {
            setSort(!sort);
            setPage(1);
            setLoadingAll(true);
          }}>
          <View className="flex-row items-center">
            <Text className="text-main-blue font-poppins600 text-base tracking-medium mr-2">
              {sort ? 'Latest' : 'Newest'}
            </Text>
            <Icon name={sort ? 'down' : 'up'} size={22} color={'blue'} />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View className="m-3">
      {loadingAll ? (
        <View className="h-96 justify-center items-center">
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={data}
          numColumns="2"
          keyExtractor={item => item.eventId}
          renderItem={({item}) => (
            <View className="h-[350px] w-1/2 p-2">
              <CardEvent
                data={item}
                onPress={() => navDetail(item.eventId)}
                seeAll={true}
              />
            </View>
          )}
          onRefresh={handleRefresh}
          refreshing={refresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={() => (
            <View className="items-center">
              {last ? (
                <Text>-- No more data --</Text>
              ) : loading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}
