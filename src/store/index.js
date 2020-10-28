import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['myContacts', 'recent'],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export { store, persistor };
// persistor.purge();
