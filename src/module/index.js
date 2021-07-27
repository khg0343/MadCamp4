import { combineReducers } from 'redux';
import palette from './palette';
import playlist from './playlist';
import friendlist from './friendlist'
import todaystatelist from './todaystatelist'

const rootReducer = combineReducers({
  palette,
  playlist,
  friendlist,
  todaystatelist
});

export default rootReducer;
