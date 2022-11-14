import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Signin from '../screen/Signin';
import Signup from '../screen/Signup';
import HeaderDefault from '../components/Header/default';

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{header: props => <HeaderDefault {...props} />}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{header: props => <HeaderDefault {...props} />}}
      />
    </Stack.Navigator>
  );
}
