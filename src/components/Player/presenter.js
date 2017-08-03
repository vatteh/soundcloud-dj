import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import { GridList } from 'material-ui/GridList';
import Slider from 'material-ui/Slider';
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
    width: 600,
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

  onSliderChangeThrottle(e, value) {
    const { onSliderDrag } = this.props;

    if (this.sliderThrottleTimeoutID) {
      clearTimeout(this.sliderThrottleTimeoutID);
    }

    this.sliderThrottleTimeoutID = setTimeout(() => {
      this.sliderThrottleTimeoutID = null;
      onSliderDrag(value);
    }, 250);
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
      onPlayPauseIconClick,
      onPrevNextTrackIconClick,
      onSliderDrag,
    } = this.props;

    if (activeTrack && isPlaying && !this.sliderUpdateTimeoutID) {
      this.awaitSliderUpdate();
    } else if (this.sliderUpdateTimeoutID) {
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
                style={styles.nextPrevSong}
              />
              <span onClick={onPlayPauseIconClick.bind(this, activeTrack)} style={styles.playPauseIcon}>
                {isPlaying
                  ? <i className="fa fa-pause-circle-o fa-4x" aria-hidden="true" />
                  : <i className="fa fa-play-circle-o fa-4x" aria-hidden="true" />}
              </span>
              <i
                onClick={onPrevNextTrackIconClick.bind(this, activeTrack, 1)}
                className="fa fa-step-forward fa-2x"
                aria-hidden="true"
                style={styles.nextPrevSong}
              />
            </div>
            <Slider
              min={0}
              max={activeTrack ? activeTrack.duration : 1}
              step={1}
              value={currentTrackTime}
              onChange={this.onSliderChangeThrottle.bind(this)}
              disableFocusRipple={true}
              sliderStyle={styles.slider}
            />
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
