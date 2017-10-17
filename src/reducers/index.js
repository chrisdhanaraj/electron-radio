import { combineReducers } from 'redux';
import { showReducer } from './showReducer';
import { audioReducer, tracklistReducer } from './staticReducers';

const rootReducer = combineReducers({
  audio: audioReducer,
  tracklist: tracklistReducer,
  show: showReducer,
});

export default rootReducer;
