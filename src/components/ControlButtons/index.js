import React from 'react';
import { highlightColor1 } from '../../constants/styles';

const styles = {
  controlButtons: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: highlightColor1,
  },
};

function ControlButtons({ activeTrack, isPlaying, onPrevNextTrackIconClick, onPlayPauseIconClick }) {
  return (
    <div style={styles.controlButtons}>
      <i
        onClick={onPrevNextTrackIconClick.bind(this, activeTrack, -1)}
        className="fa fa-step-backward fa-2x"
        aria-hidden="true"
      />
      <span onClick={onPlayPauseIconClick.bind(this, activeTrack)}>
        {isPlaying
          ? <i className="fa fa-pause fa-3x" aria-hidden="true" />
          : <i className="fa fa-play fa-3x" aria-hidden="true" />}
      </span>
      <i
        onClick={onPrevNextTrackIconClick.bind(this, activeTrack, 1)}
        className="fa fa-step-forward fa-2x"
        aria-hidden="true"
      />
    </div>
  );
}

ControlButtons.propTypes = {
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  onPrevNextTrackIconClick: React.PropTypes.func,
  onPlayPauseIconClick: React.PropTypes.func,
};

export default ControlButtons;
