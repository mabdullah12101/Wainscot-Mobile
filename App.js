import React from 'react';
import MainStackNavigator from './src/navigation';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <MainStackNavigator />
    </PaperProvider>
  );
}
