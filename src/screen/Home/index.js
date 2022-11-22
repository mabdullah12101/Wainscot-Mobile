import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ListDate from '../../components/Date/list';
import Icon from 'react-native-vector-icons/Feather';
import axios from '../../utils/axios';
import CardEvent from '../../components/Card/event';
// import checkStorage from '../../utils/checkAsyncStorage';
import moment from 'moment';

export default function Home(props) {
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [listDate, setListDate] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(listDate);
  console.log(allEvents);
  console.log(search);
  const navDetail = eventId =>
    props.navigation.navigate('Detail', {eventId: eventId});

  // useEffect(() => {
  //   checkStorage();
  //   getAllData();
  // }, []);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    getAllData();
    generateDate();
  }, [date, search]);

  const getAllData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `event?search=${search}&limit=10&dateTimeShow=${date}&column=dateTimeShow&asc=false`,
      );
      setAllEvents(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const generateDate = () => {
    let list = [
      moment(date).subtract(2, 'days'),
      moment(date).subtract(1, 'days'),
      date,
      moment(date).subtract(-1, 'days'),
      moment(date).subtract(-2, 'days'),
    ];
    setListDate(list);
  };

  // const selectDate = date => {
  //   useNavigateSearch({searchDateTimeShow: date, page: 1});
  // };

  return (
    <ScrollView style={styles.container} className="bg-main-blue">
      <View className="mx-7 relative my-6">
        <View className="absolute top-4 left-7">
          <Icon name="search" color={'#FFFFFF'} size={24} />
        </View>
        <TextInput
          className="text-white font-poppins500 border border-white rounded-2xl py-4 pl-16"
          placeholder="Search Event..."
          placeholderTextColor={'#FFFFFF80'}
          onSubmitEditing={() => console.log(search)}
          onChangeText={value => setSearch(value)}
          value={search}
        />
      </View>

      <View className="bg-[#222B45] flex-1 rounded-t-[40px]">
        <View style={styles.sortDateContainer} className="px-7 py-8">
          {listDate.map((item, index) => (
            <View key={index}>
              <ListDate
                date={moment(item).format('DD')}
                day={moment(item).format('ddd')}
                active={index === 2 ? true : false}
                onPress={() => {
                  setDate(moment(item).format('YYYY-MM-DD'));
                }}
              />
            </View>
          ))}
        </View>

        {/* <FlatList data={listDate} renderItem={item => <Text>{item}</Text>} /> */}

        <View className="bg-[#FCFCFC] flex-1 rounded-t-[40px] px-7 py-9">
          <View className="flex-row justify-between items-center mb-8">
            <Text className="font-poppins600 text-main-black tracking-medium text-xl">
              Events For You
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AllEvent')}>
              <Text className="font-poppins600 text-main-blue tracking-medium text-lg">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View className="h-56 items-center justify-center">
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <>
              <FlatList
                horizontal={true}
                data={allEvents}
                renderItem={({item}) => (
                  <View className="w-[260px] h-[376px] mr-4">
                    <CardEvent
                      data={item}
                      onPress={() => navDetail(item.eventId)}
                    />
                  </View>
                )}
                keyExtractor={item => item.eventId}
              />

              {allEvents.length < 1 ? (
                <View className="h-56 items-center justify-center">
                  <Text className="font-poppins600 text-xl text-main-black">
                    No Data
                  </Text>
                </View>
              ) : (
                ''
              )}
            </>
          )}

          {/* <View className="w-[260px] h-[376px] rounded-[40px] overflow-hidden relative">
            <Image
              source={require('../../assets/img/event1.png')}
              className="w-full absolute"
            />
            <View className="px-6 pb-6 mt-auto">
              <Text className="font-poppins500 text-sm text-white tracking-medium">
                Wed, 15 Nov, 4:00 PM
              </Text>
              <Text className="text-white font-poppins600 text-xl tracking-large mt-1 mb-5">
                Sights & Sounds Exhibition
              </Text>
              <TouchableOpacity
                className="bg-[#FC1055] w-11 h-11 rounded-lg justify-center items-center"
                onPress={navDetail}>
                <Icon name="arrow-right" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
        {/* <Image
          source={{uri: 'https://reactjs.org/logo-og.png'}}
          style={{width: 400, height: 400}}
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  sortDateContainer: {
    // backgroundColor: '#222B45',
    width: '100%',
    flexDirection: 'row',
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dateContainer: {alignItems: 'center'},
  date: {color: 'white'},
});
