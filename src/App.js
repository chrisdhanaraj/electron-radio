import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import { setAudioState, setTracklistState, updateRadioState } from './actions';
import AudioBar from './components/AudioBar';
import Playlist from './components/Playlist';
import Gif from './components/Gif';
import './radio.css';
const { Div } = glamorous;

const AppBackground = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 1rem 0 1rem',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  ':before': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '20px',
    WebkitAppRegion: 'drag',
  },
});

class App extends PureComponent {
  componentDidMount() {
    if (!process.env.REACT_APP_FIREBASE) {
      console.log('Please enter your firebase details');
    }

    const config = JSON.parse(process.env.REACT_APP_FIREBASE);
    firebase.initializeApp(config);
    const database = firebase.database();

    // props
    const { updateRadioState } = this.props;

    // firebase refs
    const firebaseRef = database.ref('/');

    firebaseRef.on('value', snapshot => {
      const { isLoggedIn, session } = snapshot.val();

      const radioState = {
        isLoggedIn,
        ...session,
      };

      updateRadioState(radioState);
    });

    if (this.audio) {
      this.audio.addEventListener('canplay', () => {
        this.audio.play();
      });
    }

    document.addEventListener('keydown', evt => {
      if (evt.which === 27) {
        this.props.togglePlaylist(false);
      }
    });
  }

  setAudioState = audioState => {
    if (audioState) {
      this.audio.muted = false;
    } else {
      this.audio.muted = true;
    }
  };

  render() {
    const {
      audioState,
      show,
      tracklist,
      togglePlaylist,
      toggleAudio,
    } = this.props;
    const { profilePic, songlist } = show;

    if (this.audio) {
      this.setAudioState(audioState);
    }

    return (
      <AppBackground onKeyDown={this.handleKeydown}>
        <Gif profilePic={profilePic} />
        <Div textAlign="center" marginBottm="1rem">
          <strong>
            {songlist.length > 0 ? songlist[0].songName : 'Offline'}
          </strong>
          {songlist.length > 0 && <p>{songlist[0].artistName}</p>}
        </Div>
        <Playlist
          open={tracklist}
          songlist={songlist}
          togglePlaylist={togglePlaylist}
        />
        <AudioBar
          mute={audioState}
          tracklist={tracklist}
          toggleMute={toggleAudio}
          togglePlaylist={togglePlaylist}
        />
        <audio
          ref={el => (this.audio = el)}
          id="radio-element"
          src="https://stream1-ral.radio.intranet.ibm.com:8001/bluecast_128k.mp3"
        >
          Your browser does not support the audio element.
        </audio>
      </AppBackground>
    );
  }
}

const mapStateToProps = state => {
  const { audio, tracklist, show } = state;

  return {
    audioState: audio,
    tracklist,
    show,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAudio: audioState => dispatch(setAudioState(audioState)),
    togglePlaylist: tracklistState =>
      dispatch(setTracklistState(tracklistState)),
    updateRadioState: radioState => dispatch(updateRadioState(radioState)),
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
