import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import { GridList } from 'material-ui/GridList';
import Slider from 'material-ui/Slider';
import CLIENT_ID from '../../constants/ids';

import TrackSlider from '../TrackSlider';
import ControlButtons from '../ControlButtons';
import NowPlaying from '../NowPlaying';
import Volume from '../Volume';
import { clientData } from '../../actions/track';

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
    const { onSliderUpdate, activeTrack, currentTrackTime } = this.props;
    const sliderUpdateTime = Math.min(activeTrack.duration / 1000, 1000);

    this.sliderUpdateTimeoutID = setTimeout(() => {
      const audioElement = ReactDOM.findDOMNode(this.audioElement);
      if (!audioElement) {
        return;
      }

      this.sliderUpdateTimeoutID = undefined;
      onSliderUpdate(
        currentTrackTime !== audioElement.currentTime ? audioElement.currentTime : audioElement.currentTime + 0.01, // To prevent a bug where the slider does not update when a track starts
      );
    }, sliderUpdateTime);
  }

  render() {
    const { activeTrack, isPlaying, currentTrackTime, nowPlayingExpanded } = this.props;

    if (isPlaying && !this.sliderUpdateTimeoutID) {
      this.awaitSliderUpdate();
    } else if (!isPlaying && this.sliderUpdateTimeoutID) {
      clearTimeout(this.sliderUpdateTimeoutID);
      this.sliderUpdateTimeoutID = undefined;
    }

    return (
      <div>
        <div className="player" style={{ bottom: activeTrack ? 0 : -140, height: nowPlayingExpanded ? 280 : 140 }}>
          <NowPlaying />
          <div className="player__controls">
            <ControlButtons />
            <TrackSlider />
            <Volume audioElement={this.audioElement} />
          </div>
        </div>
        {activeTrack ? (
          <audio
            id="audio"
            ref={(element) => {
              this.audioElement = element;
            }}
            src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}
          />
        ) : null}
      </div>
    );
  }
}
