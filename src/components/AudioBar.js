import React, { Component } from 'react';
import glamorous from 'glamorous';
import playIcon from '../assets/images/ic_play_circle_outline_white_24px.svg';
import pauseIcon from '../assets/images/ic_pause_circle_outline_white_24px.svg';
import playlistIcon from '../assets/images/ic_playlist_play_white_24px.svg';

import { ButtonReset } from './ButtonReset';

const Bar = glamorous.div({
  display: 'flex',
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
  padding: '0.5rem 0',
});

const AudioIcon = glamorous.img({
  height: '75px',
  width: 'auto',
});

export default class AudioBar extends Component {
  handleMute = () => {
    this.props.toggleMute(!this.props.mute);
  };

  handlePlaylist = () => {
    this.props.togglePlaylist(!this.props.tracklist);
  };

  render() {
    const { mute } = this.props;

    return (
      <Bar>
        <ButtonReset onClick={this.handleMute}>
          <AudioIcon alt="toggle mute" src={mute ? playIcon : pauseIcon} />
        </ButtonReset>

        <ButtonReset
          onClick={this.handlePlaylist}
          css={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            height: 'calc(100% - 24px)',
            right: '32px',
          }}
        >
          <img alt="open playlist" src={playlistIcon} />
        </ButtonReset>
      </Bar>
    );
  }
}
