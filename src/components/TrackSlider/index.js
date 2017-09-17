import React from 'react';
import Slider from 'material-ui/Slider';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { formatTime } from '../../utils';

const styles = {
  slider: {
    width: 730,
    marginTop: 10,
    marginBottom: 10,
  },
};

let sliderThrottleTimeoutID;

function TrackSlider({ activeTrack, currentTrackTime, onSliderDrag }) {
  const totalDurationSeconds = activeTrack ? Math.floor(activeTrack.duration / 1000) : 1;
  const currentTrackTimeDisplay = formatTime(currentTrackTime * 1000);
  const remainingTrackTimeDisplay = formatTime((totalDurationSeconds - currentTrackTime) * 1000);

  function onSliderChangeThrottle(e, value) {
    if (sliderThrottleTimeoutID) {
      clearTimeout(sliderThrottleTimeoutID);
    }

    sliderThrottleTimeoutID = setTimeout(() => {
      sliderThrottleTimeoutID = null;
      onSliderDrag(value);
    }, 350);
  }

  return (
    <div className="slider">
      <span className="slider__timeDisplay">{currentTrackTimeDisplay}</span>
      <Slider
        min={0}
        max={totalDurationSeconds}
        step={1}
        value={currentTrackTime}
        onChange={onSliderChangeThrottle}
        disableFocusRipple={true}
        sliderStyle={styles.slider}
      />
      <span className="slider__timeDisplay">-{remainingTrackTimeDisplay}</span>
    </div>
  );
}

TrackSlider.propTypes = {
  activeTrack: React.PropTypes.object,
  currentTrackTime: React.PropTypes.number,
  onSliderDrag: React.PropTypes.func,
};

export default connect(
  state => ({
    activeTrack: state.track.activeTrack,
    currentTrackTime: state.track.currentTrackTime,
  }),
  dispatch => ({
    onSliderDrag: time => dispatch(actions.updateTrackPlayhead(time)),
  }),
)(TrackSlider);
