import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

function DrawerContent(props) {
  const user = useSelector(state => state.user.data);

  const handleLogout = async () => {
    try {
      Toast.show({type: 'success', text1: 'Logout', text2: 'Success Logout'});
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
          <FastImage
            source={{
              uri: user.image
                ? Config.CLOUDINARY_URL_IMAGE + user.image
                : Config.CLOUDINARY_DEFAULT_IMAGE,
            }}
            style={styles.avatar}
          />

          <View className="ml-4">
            <Text
              style={{
                fontSize: 16,
                marginBottom: 3,
                fontFamily: 'Poppins',
                color: '#373A42',
              }}>
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 14,
                fontFamily: 'Poppins',
                color: '#373A42',
              }}>
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
