import axios from 'axios';
import {useState} from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet} from 'react-native';
import HeaderDefault from '../../components/Header/default';
import commonStyle from '../../utils/commonStyle';

const style = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    elevation: 30,
    borderRadius: 30,
    margin: 10,
    height: 300,
  },
});
const Demo = () => {
  const [data, setData] = useState([1, 23, 12, 423, 56, 345, 235, 34]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
  });

  axios
    .get(
      `localhost:300/api/v1/posts?page=${pagination.page}&limit=${pagination.limit}`,
    )
    .then(() => {});
  return (
    <>
      <HeaderDefault name={'Demo'} variant={'bg-main-blue'} />
      <FlatList
        data={data}
        onEndReached={number => {
          setData(prevData =>
            prevData.concat([
              1, 5, 646, 5, 58, 67, 4, 3, 5, 234, 1, 41, 4, 1, 421, 4, 142, 2,
              1, 23, 12, 423, 56, 345, 235, 34, 623, 5, 234, 23, 23, 1, 23, 12,
              423, 56, 345, 235, 34, 623, 5, 234, 23, 23, 1, 23, 12, 423, 56,
              345, 235, 34, 623, 5, 234, 23, 23,
            ]),
          );
          console.log(data);
        }}
        renderItem={({item, index}) => {
          return (
            <View style={[style.card, commonStyle.margin, commonStyle.padding]}>
              <Text>haloo {item}</Text>
            </View>
          );
        }}
      />
    </>
  );
};

export default Demo;
