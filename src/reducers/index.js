import { combineReducers } from 'redux';
import { SET_AUDIO_STATE, SET_TRACKLIST_STATE } from '../actions';

const audioReducer = (state = 'paused', action) => {
  switch (action.type) {
    case SET_AUDIO_STATE:
      return action.audioState;
    default:
      return state;
  }
};

const tracklistReducer = (state = 'closed', action) => {
  switch (action.type) {
    case SET_TRACKLIST_STATE:
      return action.tracklistState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  audio: audioReducer,
  tracklist: tracklistReducer,
});

export default rootReducer;
