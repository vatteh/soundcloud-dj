import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import track from './track';
import volume from './volume';
import toolbar from './toolbar';

export default combineReducers({
  track,
  volume,
  toolbar,
  routing: routerReducer,
});
