import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function Home(props) {
  const navDetail = () => props.navigation.navigate('Detail');
  return (
    <View style={styles.container}>
      <View style={styles.sortDateContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>13</Text>
          <Text style={styles.date}>Mon</Text>
        </View>
        <Text style={styles.date}>14</Text>
        <Text style={styles.date}>15</Text>
        <Text style={styles.date}>16</Text>
        <Text style={styles.date}>17</Text>
      </View>
      <Text>Home</Text>
      <Button title="Detail Screen" onPress={navDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  sortDateContainer: {
    backgroundColor: '#222B45',
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dateContainer: {alignItems: 'center'},
  date: {color: 'white'},
});
