import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CallerContextProvider } from './src/CallerContext';
import { AppNavigator } from './src/router/AppNavigator';

import { store, persistor } from './src/store';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <CallerContextProvider>
          <AppNavigator />
        </CallerContextProvider>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);
