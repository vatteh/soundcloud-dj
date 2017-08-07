import React from 'react';

const styles = {
  controlButtons: {
    width: 150,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
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
          ? <i className="fa fa-pause-circle-o fa-4x" aria-hidden="true" />
          : <i className="fa fa-play-circle-o fa-4x" aria-hidden="true" />}
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
