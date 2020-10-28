import { combineReducers } from 'redux';

import { caller } from './caller';
import { myContacts } from './myContacts';
import { recent } from './recentCalls';
import { search } from './search';

export const rootReducer = combineReducers({
  caller,
  myContacts,
  recent,
  search
});
