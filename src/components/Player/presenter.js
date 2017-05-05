import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import { GridList } from 'material-ui/GridList';
import Slider from 'material-ui/Slider';

const styles = {
  playerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nowPlayingContainer: {
    flexGrow: 1,
  },
  playControlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 2,
    textAlign: 'center',
  },
  volumeControlContainer: {
    flexGrow: 1,
  },
  controlButtons: {
    width: 150,
    display: 'flex',
    flexGrow: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  slider: {
    flexGrow: 1,
    width: 800,
    marginTop: 10,
    marginBottom: 10,
  },
  playPauseIcon: {
    flexGrow: 1,
  },
  nextPrevSong: {
    flexGrow: 1,
  },
};

export default class Player extends Component {
  render() {
    const { activeTrack, isPlaying, onPlayPauseIconClick, onPrevNextTrackIconClick } = this.props;

    return (
      <div className={`player ${activeTrack ? 'player-visible' : ''}`} style={styles.playerContainer}>
        <div style={styles.nowPlayingContainer}>now playing</div>
        <div style={styles.playControlsContainer}>
          <div style={styles.controlButtons}>
            <i
              onClick={onPrevNextTrackIconClick.bind(this, activeTrack, -1)}
              className="fa fa-step-backward fa-2x"
              aria-hidden="true"
              style={styles.nextPrevSong}
            ></i>
            <span onClick={onPlayPauseIconClick.bind(this, activeTrack)} style={styles.playPauseIcon}>
              {
                isPlaying ?
                <i className="fa fa-pause-circle-o fa-4x" aria-hidden="true"></i> :
                <i className="fa fa-play-circle-o fa-4x" aria-hidden="true"></i>
              }
            </span>
            <i
              onClick={onPrevNextTrackIconClick.bind(this, activeTrack, 1)}
              className="fa fa-step-forward fa-2x"
              aria-hidden="true"
              style={styles.nextPrevSong}
            ></i>
          </div>
          <Slider min={0} max={1000} step={1} sliderStyle={styles.slider}/>
        </div>
        <div style={styles.volumeControlContainer}>volume control</div>
      </div>
    );
  }
}
