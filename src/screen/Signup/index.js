import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function Signup(props) {
  const handleSignup = () => {
    props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
  };

  return (
    <View>
      <Text>Signup</Text>
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({});
