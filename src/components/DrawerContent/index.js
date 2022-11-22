import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';

function DrawerContent(props) {
  // const [user, setUser] = useState({});
  const user = useSelector(state => state.user.data);

  // useEffect(() => {
  //   getUserById();
  // }, []);

  // const getUserById = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('userId');
  //     const result = await axios.get(`user/${data}`);
  //     setUser(result.data.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      alert('Logout');
      await AsyncStorage.clear();
      props.navigation.replace('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerProfile}>
          <Image
            source={{
              uri: user.image
                ? Config.CLOUDINARY_URL_IMAGE + user.image
                : Config.CLOUDINARY_DEFAULT_IMAGE,
            }}
            style={styles.avatar}
          />
          {/* <Image
            source={{
              uri: user.image
                ? Config.CLOUDINARY_URL_IMAGE + user.image
                : Config.CLOUDINARY_DEFAULT_IMAGE,
            }}
            style={styles.avatar}
          /> */}
          <View style={styles.biodata}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.caption}>
              {user.profession ? user.profession : 'Profession Not Set'}
            </Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Icon color={color} size={size} name="log-out" />
          )}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // backgroundColor: 'gray',
  },
  biodata: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
});

export default DrawerContent;
