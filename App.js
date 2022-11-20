import React from 'react';
import MainStackNavigator from './src/navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import stores from './src/stores';
const {store, persistor} = stores;

import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainStackNavigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
