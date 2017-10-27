import React, { Component } from 'react';
import glamorous from 'glamorous';

const AudioContainer = glamorous.div({});

export class Audio extends Component {

  state = {
    play: false,
  }

  componentDidMount() {
    if (this.audio) {
      this.play();
    }
  }

  play = () => {
    this.audio.play();
  }

  pause = () => {
    this.audio.pause();
  }

  render() {
    return (
      <AudioContainer>
        <div>

        </div>

        <div>
          <audio
            ref={el => this.audio = el}
            id="radio-element"
            preload="audio"
          >
            <source src="https://stream1-ral.radio.intranet.ibm.com:8001/bluecast_128k.mp3" type="audio/mpeg">
          </audio>
        </div>
      </AudioContainer>
    )
  }
}
