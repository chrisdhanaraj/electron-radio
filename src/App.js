import React, { PureComponent } from 'react';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import AudioBar from './components/AudioBar';
import Playlist from './components/Playlist';
import Gif from './components/Gif';
import radioIcon from './assets/images/ibmcr.svg';
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
  state = {
    description: '',
    djName: '',
    endTime: '',
    profilePic: radioIcon,
    showName: '',
    songlist: [],
    startTime: '',
    live: false,
    mute: false,
    playlistOpen: false,
  };

  togglePlaylist = flag => {
    const toggle = flag !== undefined ? flag : !this.state.playlistOpen;

    this.setState({
      playlistOpen: toggle,
    });
  };

  toggleMute = flag => {
    const toggle = flag !== undefined ? flag : !this.state.mute;

    if (this.audio) {
      this.audio.muted = toggle;
    }

    this.setState({
      mute: toggle,
    });
  };

  componentDidMount() {
    if (!process.env.REACT_APP_FIREBASE) {
      console.log('Please enter your firebase details');
    }

    const config = JSON.parse(process.env.REACT_APP_FIREBASE);
    firebase.initializeApp(config);
    const database = firebase.database();

    // firebase refs
    const firebaseRef = database.ref('/');
    const loggedInRef = database.ref('/isLoggedIn');
    const sessionRef = database.ref('/session');

    firebaseRef.on('value', snapshot => {
      console.log(snapshot.val());
    });

    // firebase listeners
    loggedInRef.on('value', snapshot => {
      const loggedIn = snapshot.val();
      const stateObj = Object.assign(
        {
          live: loggedIn,
        },
        !loggedIn && {
          profilePic: radioIcon,
        }
      );

      this.setState(stateObj);
    });

    if (this.audio) {
      this.audio.addEventListener('canplay', () => {
        this.audio.play();
      });
    }

    document.addEventListener('keydown', evt => {
      if (evt.which === 27) {
        this.togglePlaylist(false);
      }
    });

    sessionRef.on('value', snapshot => {
      const session = snapshot.val();
      let playlist = [];
      const { songlist, profilePic, ...other } = session;

      if (songlist) {
        playlist = Object.keys(songlist)
          .map(key => songlist[key])
          .reverse();
      }

      this.setState({
        profilePic: !this.state.live ? radioIcon : profilePic,
        songlist: playlist,
        ...other,
      });
    });
  }

  render() {
    const { live, songlist, playlistOpen, profilePic, mute } = this.state;

    const currentTrack = songlist[0];

    return (
      <AppBackground onKeyDown={this.handleKeydown}>
        <Gif profilePic={profilePic} live={live} />

        {currentTrack !== undefined && (
          <Div textAlign="center" marginBottm="1rem">
            <strong>{currentTrack.songName}</strong>
            <p>{currentTrack.artistName}</p>
          </Div>
        )}

        {live && (
          <AudioBar
            mute={mute}
            toggleMute={this.toggleMute}
            togglePlaylist={this.togglePlaylist}
          />
        )}

        {live && (
          <Playlist
            open={playlistOpen}
            songlist={songlist}
            togglePlaylist={this.togglePlaylist}
          />
        )}

        <audio
          ref={el => (this.audio = el)}
          id="radio-element"
          src="https://9.20.64.218:8001/bluecast_128k.mp3"
        >
          Your browser does not support the audio element.
        </audio>
      </AppBackground>
    );
  }
}

export default App;
