import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import { GridList } from 'material-ui/GridList';
import TrackSlider from '../TrackSlider';
import CLIENT_ID from '../../constants/auth';

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
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  volumeControlContainer: {
    flexGrow: 1,
  },
  controlButtons: {
    width: 150,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
};

export default class Player extends Component {
  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.audioElement);
    if (!audioElement) {
      return;
    }

    const { activeTrack, isPlaying, seekTo, currentTrackTime } = this.props;
    if (seekTo) {
      audioElement.currentTime = currentTrackTime;
    }

    if (isPlaying && activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  awaitSliderUpdate() {
    const { onSliderUpdate } = this.props;

    this.sliderUpdateTimeoutID = setTimeout(() => {
      const audioElement = ReactDOM.findDOMNode(this.audioElement);
      if (!audioElement) {
        return;
      }

      this.sliderUpdateTimeoutID = undefined;
      onSliderUpdate(audioElement.currentTime);
    }, 1000);
  }

  render() {
    const {
      activeTrack,
      isPlaying,
      currentTrackTime,
      onSliderDrag,
      onPlayPauseIconClick,
      onPrevNextTrackIconClick,
    } = this.props;

    if (isPlaying && !this.sliderUpdateTimeoutID) {
      this.awaitSliderUpdate();
    } else if (!isPlaying && this.sliderUpdateTimeoutID) {
      clearTimeout(this.sliderUpdateTimeoutID);
      this.sliderUpdateTimeoutID = undefined;
    }

    return (
      <div>
        <div className={`player ${activeTrack ? 'player-visible' : ''}`} style={styles.playerContainer}>
          <div style={styles.nowPlayingContainer}>now playing</div>
          <div style={styles.playControlsContainer}>
            <div style={styles.controlButtons}>
              <i
                onClick={onPrevNextTrackIconClick.bind(this, activeTrack, -1)}
                className="fa fa-step-backward fa-2x"
                aria-hidden="true"
              />
              <span onClick={onPlayPauseIconClick.bind(this, activeTrack)}>
                {isPlaying
                  ? <i className="fa fa-pause-circle-o fa-4x" aria-hidden="true" />
                  : <i className="fa fa-play-circle-o fa-4x" aria-hidden="true" />}
              </span>
              <i
                onClick={onPrevNextTrackIconClick.bind(this, activeTrack, 1)}
                className="fa fa-step-forward fa-2x"
                aria-hidden="true"
              />
            </div>
            <TrackSlider activeTrack={activeTrack} currentTrackTime={currentTrackTime} onSliderDrag={onSliderDrag} />
          </div>
          <div style={styles.volumeControlContainer}>volume control</div>
        </div>
        {activeTrack
          ? <audio
              id="audio"
              ref={(element) => {
                this.audioElement = element;
              }}
              src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}
            />
          : null}
      </div>
    );
  }
}
