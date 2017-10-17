import { SET_AUDIO_STATE, SET_TRACKLIST_STATE } from '../actions';

export const audioReducer = (state = 'paused', action) => {
  switch (action.type) {
    case SET_AUDIO_STATE:
      return action.audioState;
    default:
      return state;
  }
};

export const tracklistReducer = (state = 'closed', action) => {
  switch (action.type) {
    case SET_TRACKLIST_STATE:
      return action.tracklistState;
    default:
      return state;
  }
};
