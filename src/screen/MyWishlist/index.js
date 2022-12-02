import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListWishlist from '../../components/Wishlist/ListWishlist';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  deleteWishlist,
  getAllWishlishtByUserId,
} from '../../stores/actions/wishlist';
import Toast from 'react-native-toast-message';

export default function MyWishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlists);
  const [page, setPage] = useState(1);
  const [loadingAll, setLoadingAll] = useState(false);
  const userId = useSelector(state => state.user.data.userId);
  const [totalPage, setTotalPage] = useState(10);
  const [last, setLast] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [wishlistId, setWishlistId] = useState('');
  const [nameEvent, setNameEvent] = useState('');

  useEffect(() => {
    getAllWishlist();
  }, [page]);

  const getAllWishlist = async () => {
    if (page <= totalPage && !last) {
      await dispatch(getAllWishlishtByUserId(userId, page)).then(res => {
        const result = res.action.payload.data;
        if (result.data.length > 0) {
          setTotalPage(result.pagination.totalPage);
        }
      });
    } else {
      setPage(totalPage);
      setLast(true);
    }
    setRefresh(false);
    setLoading(false);
    setLoadingAll(false);
    setLoadMore(false);
  };

  // const getWishlist = async () => {
  //   try {
  //     if (page <= totalPage) {
  //       const result = await axios.get(
  //         `/wishlist/userId/${userId}?page=${page}`,
  //       );
  //       if (result.data.data.length > 0) {
  //         if (page === 1) {
  //           setData(result.data.data);
  //         } else {
  //           setData([...data, ...result.data.data]);
  //         }
  //         setTotalPage(result.data.pagination.totalPage);
  //       } else {
  //         setData([]);
  //       }
  //     } else {
  //       setPage(totalPage);
  //       setLast(true);
  //     }
  //     setRefresh(false);
  //     setLoading(false);
  //     setLoadingAll(false);
  //     setLoadMore(false);
  //   } catch (error) {}
  // };

  const handleRefresh = () => {
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getAllWishlist();
    }
  };

  const handleLoadMore = () => {
    if (!loadMore) {
      const newPage = page + 1;
      setLoadMore(true);
      if (newPage <= totalPage + 1) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
  };

  const handleDeleteModal = (id, name) => {
    setDeleteModal(true);
    setWishlistId(id);
    setNameEvent(name);
  };

  const handleDeleteWishlist = () => {
    setLoadingDelete(true);
    dispatch(deleteWishlist(wishlistId))
      .then(res => {
        const result = res.action.payload.data;
        setPage(1);
        setLast(false);
        setLoadingAll(true);
        setDeleteModal(false);
        Toast.show({
          type: 'success',
          text1: 'Delete Wishlist',
          text2: result.message,
        });
        dispatch(getAllWishlishtByUserId(userId, page)).then(response => {
          const resultGet = response.action.payload.data;
          if (resultGet.data.length > 0) {
            setTotalPage(resultGet.pagination.totalPage);
          }
          setLoadingAll(false);
        });
        setLoadingDelete(false);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Delete Wishlist',
          text2: 'Delete Wishlist Failed',
        });
        setLoadingDelete(false);
      });
  };

  const resetWishlistId = () => {
    setWishlistId('');
    setNameEvent('');
    setDeleteModal(false);
  };

  return (
    <View className="bg-main-blue">
      <View
        className={`bg-white px-7 rounded-t-[40px] mt-3 ${
          wishlist.data.length > 3 ? '' : 'h-screen'
        }`}>
        {loadingAll || wishlist.isLoading ? (
          <View className="mt-48 items-center h-screen">
            <ActivityIndicator size={'large'} color="blue" />
          </View>
        ) : wishlist.data.length < 1 ? (
          <View className="items-center mt-48 h-screen">
            <Text className="text-main-black font-poppins600 text-2xl tracking-medium text-center">
              No Wishlist
            </Text>
            <Text className="text-[#B3B8B8] font-poppins500 text-sm tracking-small items-center mt-4">
              It appears you haven't add any wishlist
            </Text>
            <Text className="text-[#B3B8B8] font-poppins500 text-sm tracking-small items-center mt-2">
              yet. Maybe try searching these?
            </Text>
          </View>
        ) : (
          <View>
            <Modal isVisible={deleteModal}>
              <View className="bg-white items-center p-12 rounded-xl">
                <Icon name="exclamationcircleo" size={50} color="orange" />

                <Text className="font-poppins600 text-base text-main-black text-center mt-5">
                  Are you sure you want to delete {nameEvent}
                </Text>

                <View className="flex-row justify-center items-center gap-x-3 mt-5">
                  <TouchableOpacity
                    className="w-28 h-11 justify-center items-center border border-main-gray rounded-md"
                    onPress={resetWishlistId}>
                    {loadingDelete ? (
                      <ActivityIndicator color={'blue'} />
                    ) : (
                      <Text className="font-poppins600 text-main-black">
                        No, cancel
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-28 h-11 justify-center items-center bg-red-500 rounded-md"
                    onPress={handleDeleteWishlist}>
                    {loadingDelete ? (
                      <ActivityIndicator color={'white'} />
                    ) : (
                      <Text className="font-poppins600 text-white ">
                        Yes, I'm sure
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <FlatList
              data={wishlist.data}
              keyExtractor={item => item.wishlistId}
              renderItem={({item}) => (
                <ListWishlist
                  data={item}
                  handleDeleteWishlist={() =>
                    handleDeleteModal(item.wishlistId, item.event.name)
                  }
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
  );
}
