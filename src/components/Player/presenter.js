import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import { GridList } from 'material-ui/GridList';
import Slider from 'material-ui/Slider';
import TrackSlider from '../TrackSlider';
import ControlButtons from '../ControlButtons';
import NowPlaying from '../NowPlaying';
import Volume from '../Volume';
import CLIENT_ID from '../../constants/auth';
import { basePlayerColor } from '../../constants/styles';

const styles = {
  playerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0)',
    position: 'fixed',
    right: 0,
    width: '100%',
    borderTop: '1px solid rgba(0, 0, 0, 0)',
    zIndex: 1,
  },
  playControlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
    background: basePlayerColor,
  },
};

export default class Player extends Component {
  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.audioElement);
    if (!audioElement) {
      return;
    }

    const { activeTrack, isPlaying, seekTo, onRepeat, currentTrackTime, onPrevNextTrackIconClick } = this.props;

    audioElement.onended = () => {
      onPrevNextTrackIconClick(activeTrack, onRepeat ? 0 : 1);
    };

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
      nowPlayingExpanded,
      onSliderDrag,
      onPlayPauseIconClick,
      onPrevNextTrackIconClick,
      onExpandClick,
    } = this.props;

    if (isPlaying && !this.sliderUpdateTimeoutID) {
      this.awaitSliderUpdate();
    } else if (!isPlaying && this.sliderUpdateTimeoutID) {
      clearTimeout(this.sliderUpdateTimeoutID);
      this.sliderUpdateTimeoutID = undefined;
    }

    styles.playerContainer.bottom = activeTrack ? 0 : -140;
    styles.playerContainer.height = nowPlayingExpanded ? 280 : 140;

    return (
      <div>
        <div className="player" style={styles.playerContainer}>
          <NowPlaying activeTrack={activeTrack} nowPlayingExpanded={nowPlayingExpanded} onExpandClick={onExpandClick} />
          <div style={styles.playControlsContainer}>
            <ControlButtons
              activeTrack={activeTrack}
              isPlaying={isPlaying}
              onPrevNextTrackIconClick={onPrevNextTrackIconClick}
              onPlayPauseIconClick={onPlayPauseIconClick}
            />
            <TrackSlider activeTrack={activeTrack} currentTrackTime={currentTrackTime} onSliderDrag={onSliderDrag} />
            <Volume audioElement={this.audioElement} />
          </div>
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
