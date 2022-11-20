import React, {useEffect, useState} from 'react';
import {
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
import checkStorage from '../../utils/checkAsyncStorage';

export default function Home(props) {
  const [allEvents, setAllEvents] = useState([]);
  const navDetail = eventId =>
    props.navigation.navigate('Detail', {eventId: eventId});

  // useEffect(() => {
  //   checkStorage();
  //   getAllData();
  // }, []);

  const getAllData = async () => {
    try {
      const result = await axios.get(
        'event?page=&search=&dateTimeShow=&column=&asc=&limit=4',
      );
      setAllEvents(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        />
      </View>

      <View className="bg-[#222B45] flex-1 rounded-t-[40px]">
        <View style={styles.sortDateContainer} className="px-7 py-8">
          <ListDate date={13} day="Mon" />
          <ListDate date={14} day="Tue" />
          <ListDate active={true} date={15} day="Wed" />
          <ListDate date={16} day="Thu" />
          <ListDate date={17} day="Fri" />
        </View>

        <View className="bg-[#FCFCFC] flex-1 rounded-t-[40px] px-7 py-9">
          <View className="flex-row justify-between items-center mb-8">
            <Text className="font-poppins600 text-main-black tracking-medium text-xl">
              Events For You
            </Text>
            <TouchableOpacity className="bg-white p-2 shadow-lg shadow-slate-900 rounded-lg">
              <Icon name="sliders" size={24} color="#3366FF" />
            </TouchableOpacity>
          </View>

          {/* <FlatList
            horizontal={true}
            data={allEvents}
            renderItem={({item}) => (
              <CardEvent data={item} onPress={() => navDetail(item.eventId)} />
            )}
            keyExtractor={item => item.eventId}
          /> */}

          <View className="w-[260px] h-[376px] rounded-[40px] overflow-hidden relative">
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
          </View>
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
