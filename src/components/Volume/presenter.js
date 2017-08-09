import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';

const styles = {
  volumeControlContainer: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  volumeSlider: {
    width: 150,
    margin: 6,
  },
};

export default class Volume extends Component {
  onVolumeSliderChangeThrottle(e, value) {
    const { onVolumeSliderDrag } = this.props;

    if (this.sliderThrottleTimeoutID) {
      clearTimeout(this.sliderThrottleTimeoutID);
    }

    this.sliderThrottleTimeoutID = setTimeout(() => {
      this.sliderThrottleTimeoutID = null;
      this.props.audioElement.volume = value;
      onVolumeSliderDrag(value);
    }, 350);
  }

  render() {
    const { volumeValue } = this.props;

    return (
      <div style={styles.volumeControlContainer}>
        <span>
          {volumeValue >= 0.7 && <i className="fa fa-volume-up fa-2x playingTrackIcon" aria-hidden="true" />}
          {volumeValue < 0.7 &&
            volumeValue > 0 &&
            <i className="fa fa-volume-down fa-2x playingTrackIcon" aria-hidden="true" />}
          {volumeValue === 0 && <i className="fa fa-volume-off fa-2x playingTrackIcon" aria-hidden="true" />}
        </span>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={volumeValue}
          onChange={this.onVolumeSliderChangeThrottle.bind(this)}
          disableFocusRipple={true}
          sliderStyle={styles.volumeSlider}
        />
      </div>
    );
  }
}
