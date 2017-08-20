import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  container: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  volumeContainer: {
    width: 145,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volumeSlider: {
    width: 100,
    margin: 6,
    float: 'right',
  },
  volumeSliderIcon: {},
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
    const onRepeatIconStyle = {
      color: onRepeat ? cyan500 : 'black',
    };
    const onRandomIconStyle = {
      color: onRandom ? cyan500 : 'black',
    };

    return (
      <div style={styles.container}>
        <i onClick={onRepeatToggle} className="fa fa-repeat fa-2x" style={onRepeatIconStyle} aria-hidden="true" />
        <i onClick={onRandomToggle} className="fa fa-random fa-2x" style={onRandomIconStyle} aria-hidden="true" />
        <div style={styles.volumeContainer}>
          <span style={styles.volumeSliderIcon}>
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
