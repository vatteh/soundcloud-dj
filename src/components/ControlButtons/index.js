import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

function ControlButtons({ activeTrack, isPlaying, onPrevNextTrackIconClick, onPlayPauseIconClick }) {
  return (
    <div className="controlButtons">
      <i
        onClick={onPrevNextTrackIconClick.bind(this, activeTrack, -1)}
        className="fa fa-step-backward fa-2x"
        aria-hidden="true"
      />
      <span onClick={onPlayPauseIconClick.bind(this, activeTrack)}>
        {isPlaying ? (
          <i className="fa fa-pause fa-3x" aria-hidden="true" />
        ) : (
          <i className="fa fa-play fa-3x" aria-hidden="true" />
        )}
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

export default connect(
  state => ({
    activeTrack: state.track.activeTrack,
    isPlaying: state.track.isPlaying,
  }),
  dispatch => ({
    onPrevNextTrackIconClick: (currentTrack, increment) => dispatch(actions.prevNextTrack(currentTrack, increment)),
    onPlayPauseIconClick: selectedTrack => dispatch(actions.playPauseTrack(selectedTrack)),
  }),
)(ControlButtons);
