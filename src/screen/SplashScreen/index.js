import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function SplashScreen(props) {
  const token = false;
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    setTimeout(() => {
      if (token) {
        props.navigation.replace('AppScreen');
      } else {
        props.navigation.replace('AuthScreen');
      }
    }, 1000);
  };

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({});
