import { combineReducers } from 'redux';

import locationReducer from './features/location/locationSlice';

export default combineReducers({
  location: locationReducer,
})
