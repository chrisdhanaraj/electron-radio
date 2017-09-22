import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from 'carbon-components-react';
import glamorous from 'glamorous';
import { ButtonReset } from './ButtonReset';
import closeIcon from '../assets/images/ic_close_white_24px.svg';

const TrackHeader = glamorous.div({
  display: 'flex',
});

const TableContainer = glamorous.div(
  {
    position: 'absolute',
    backgroundColor: '#000',
    padding: '2rem 1rem',
    top: 0,
    left: 0,
    height: '100vh',
    overflow: 'scroll',
    width: '100%',
    transition: 'all 700ms cubic-bezier(0.5, 0, 0.1, 1)',
    transform: 'translateY(0)',
  },
  ({ open }) => {
    return {
      transform: `translateY(${open ? '0' : '200vh'})`,
    };
  }
);

export default class Playlist extends Component {
  state = {
    open: false,
  };

  handlePlaylist = evt => {
    this.props.togglePlaylist(false);
  };

  render() {
    const { open, songlist } = this.props;

    return (
      <TableContainer open={open}>
        <TrackHeader>
          <h2>Tracklist</h2>
          <ButtonReset
            onClick={this.handlePlaylist}
            css={{ marginLeft: 'auto' }}
          >
            <img alt="close playlist" src={closeIcon} />
          </ButtonReset>
        </TrackHeader>

        <Table>
          <TableHead>
            <TableRow header>
              <TableHeader>Song Title</TableHeader>
              <TableHeader>Artist</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {songlist.map(track => {
              return (
                <TableRow key={`${track.songName + track.artistName}`}>
                  <TableData>{track.songName}</TableData>
                  <TableData>{track.artistName}</TableData>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
