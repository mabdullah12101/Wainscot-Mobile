import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Profile from '../screen/Profile';
import DrawerContent from '../components/DrawerContent';
import HeaderHome from '../components/Header/home';
import Order from '../screen/Order';
import HeaderDefault from '../components/Header/default';
import EditProfile from '../screen/Profile/edit';
import AllEvent from '../screen/AllEvent';
import Payment from '../screen/Payment';
import MyBooking from '../screen/MyBooking';
import ChangePassword from '../screen/Profile/ChangePassword';

function MenuNavigator() {
  // DAFTARKAN MENU YANG NANTINYA AKAN MASUK KE DALAM DRAWER DISINI
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          header: props => <HeaderHome {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: props => (
            <HeaderDefault
              {...props}
              name={'Profile'}
              variant={'bg-main-blue'}
            />
          ),
          drawerIcon: ({size, color}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Booking"
        component={MyBooking}
        options={{
          header: props => (
            <HeaderDefault
              {...props}
              name={'My Booking'}
              variant={'bg-main-blue'}
            />
          ),
          drawerIcon: ({size, color}) => (
            <Icon name="menuunfold" color={color} size={size} />
          ),
        }}
      />
      {/* MY BOOKING */}
      {/* MY WISHLIST */}
    </Drawer.Navigator>
  );
}

export default function AppStackNavigator() {
  // DAFTARKAN MENU YANG NANTINYA DAPAT DI AKSES DILUAR DRAWER DISINI
  return (
    <Stack.Navigator initialRouteName="MenuNavigator">
      <Stack.Screen
        name="MenuNavigator"
        component={MenuNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllEvent"
        component={AllEvent}
        options={{
          header: props => (
            <HeaderDefault
              {...props}
              name="List Event"
              variant={'bg-main-blue'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          header: props => (
            <HeaderDefault
              {...props}
              name="Checkout"
              variant={'bg-main-blue'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          header: props => (
            <HeaderDefault {...props} name="Payment" variant={'bg-main-blue'} />
          ),
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          header: props => (
            <HeaderDefault
              {...props}
              name="Edit Profile"
              variant={'bg-main-blue'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          header: props => (
            <HeaderDefault
              {...props}
              name="Change Password"
              variant={'bg-main-blue'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
