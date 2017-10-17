import { combineReducers } from 'redux';
import { audioReducer, tracklistReducer } from './staticReducers';

const rootReducer = combineReducers({
  audio: audioReducer,
  tracklist: tracklistReducer,
});

export default rootReducer;
