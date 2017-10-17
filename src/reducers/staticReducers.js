import { SET_AUDIO_STATE, SET_TRACKLIST_STATE } from '../actions';

// default not muted
export const audioReducer = (state = true, action) => {
  switch (action.type) {
    case SET_AUDIO_STATE:
      return action.audioState;
    default:
      return state;
  }
};

// default tracklist closed
export const tracklistReducer = (state = false, action) => {
  switch (action.type) {
    case SET_TRACKLIST_STATE:
      return action.tracklistState;
    default:
      return state;
  }
};
