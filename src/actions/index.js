export const SET_AUDIO_STATE = 'SET_AUDIO_STATE';
export const SET_TRACKLIST_STATE = 'SET_TRACKLIST_STATE';
export const UPDATE_RADIO_STATE = 'UPDATE_RADIO_STATE';

export const setAudioState = audioState => {
  return {
    type: SET_AUDIO_STATE,
    audioState: audioState,
  };
};

export const setTracklistState = tracklistState => {
  return {
    type: SET_TRACKLIST_STATE,
    tracklistState: tracklistState,
  };
};

export const updateRadioState = radioState => {
  return {
    type: UPDATE_RADIO_STATE,
    radioState,
  };
};
