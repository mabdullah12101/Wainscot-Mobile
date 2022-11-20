import {combineReducers} from 'redux';

import counter from './counter';
import user from './user';
import events from './event';
import bookings from './booking';
import wishlists from './wishlist';
import auth from './auth';

export default combineReducers({
  counter,
  user,
  events,
  bookings,
  wishlists,
  auth,
});
