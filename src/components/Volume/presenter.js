import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  volumeSlider: {
    width: 100,
    margin: 6,
    float: 'right',
  },
  highlightIconStyle: {
    color: cyan500,
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
    const { volumeValue, onRepeat, onRandom, onRepeatToggle, onRandomToggle } = this.props;

    return (
      <div className="rightControls">
        <i
          onClick={onRepeatToggle}
          className="fa fa-repeat fa-2x rightControls__onRepeat pointer"
          style={onRepeat ? styles.highlightIconStyle : {}}
          aria-hidden="true"
        />
        <i
          onClick={onRandomToggle}
          className="fa fa-random fa-2x rightControls__onRandom pointer"
          style={onRandom ? styles.highlightIconStyle : {}}
          aria-hidden="true"
        />
        <div className="rightControls__volume">
          <span className="rightControls__volume__icon">
            {volumeValue >= 0.7 && <i className="fa fa-volume-up fa-2x" aria-hidden="true" />}
            {volumeValue < 0.7 && volumeValue > 0 && <i className="fa fa-volume-down fa-2x" aria-hidden="true" />}
            {volumeValue === 0 && <i className="fa fa-volume-off fa-2x" aria-hidden="true" />}
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
      </div>
    );
  }
}
