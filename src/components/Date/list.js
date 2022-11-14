import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export default function ListDate({active, date, day}) {
  return (
    <TouchableOpacity
      className={`${
        active ? 'border border-[#FF8900]' : ''
      } px-3 pt-4 pb-2 rounded-2xl gap-y-1 items-center`}>
      <Text className={`${active ? 'text-[#FF8900]' : 'text-white'}`}>
        {date}
      </Text>
      <Text className={`${active ? 'text-[#FF8900]' : 'text-white'}`}>
        {day}
      </Text>
      {active ? <Icon name="dot-fill" size={10} color="#FF8900" /> : ''}
    </TouchableOpacity>
  );
}
