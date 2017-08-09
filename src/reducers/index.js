import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import track from './track';
import volume from './volume';

export default combineReducers({
  track,
  volume,
  routing: routerReducer,
});
