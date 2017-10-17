import { UPDATE_RADIO_STATE } from '../actions';
import radioIcon from '../assets/images/ibmcr.svg';

const initialState = {
  isLoggedIn: false,
  djName: '',
  description: '',
  profilePic: radioIcon,
  showName: '',
  startTime: '',
  endTime: '',
  songlist: [],
};

export const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RADIO_STATE:
      const radioState = action.radioState;

      if (radioState.songlist === undefined) {
        radioState.songlist = [];
      } else {
        radioState.songlist = Object.keys(radioState.songlist)
          .map(key => radioState.songlist[key])
          .reverse();
      }

      radioState.profilePic =
        radioState.profilePic === 'http://i.imgur.com/sKIWTxq.jpg'
          ? radioIcon
          : radioState.profilePic;

      return radioState;
    default:
      return state;
  }
};
