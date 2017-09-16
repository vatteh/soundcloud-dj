import React from 'react';
import Slider from 'material-ui/Slider';
import { formatTime } from '../../utils';
import { highlightColor3 } from '../../constants/styles';

const styles = {
  slider: {
    width: 730,
    marginTop: 10,
    marginBottom: 10,
  },
  trackTimeDisplay: {
    color: highlightColor3,
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
      <span style={styles.trackTimeDisplay}>{currentTrackTimeDisplay}</span>
      <Slider
        min={0}
        max={totalDurationSeconds}
        step={1}
        value={currentTrackTime}
        onChange={onSliderChangeThrottle}
        disableFocusRipple={true}
        sliderStyle={styles.slider}
      />
      <span style={styles.trackTimeDisplay}>-{remainingTrackTimeDisplay}</span>
    </div>
  );
}

TrackSlider.propTypes = {
  activeTrack: React.PropTypes.object,
  currentTrackTime: React.PropTypes.number,
  onSliderDrag: React.PropTypes.func,
};

export default TrackSlider;
