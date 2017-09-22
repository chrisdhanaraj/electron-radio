import React, { Component } from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';
import radioIcon from '../assets/images/ibmcr.svg';

const animationStyles = props => {
  const spin = glamor.css.keyframes({
    '0%': { transform: `rotate(0deg)` },
    '100%': { transform: `rotate(360deg)` },
  });
  return { animation: `${spin} 45s infinite linear` };
};

const GifContainer = glamorous.div(
  {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '60vw',
    paddingBottom: '60vw',
    height: 0,
    marginBottom: '1rem',
  },
  animationStyles
);

const GifImageContainer = glamorous.div(
  {
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '50%',
    left: 0,
  },
  ({ gif }) => ({
    backgroundImage: `url(${gif})`,
  })
);

export default class Gif extends Component {
  static defaultProps = {
    profilePic: radioIcon,
  };

  render() {
    const { profilePic } = this.props;

    return (
      <GifContainer>
        <GifImageContainer gif={profilePic} />
      </GifContainer>
    );
  }
}
