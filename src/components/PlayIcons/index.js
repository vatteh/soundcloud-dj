import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

function PlayIcons({ activeTrack, isPlaying, onClickFunction, track, index }) {
  return (
    <div onClick={onClickFunction.bind(this, track)} className="trackIcons">
      {isPlaying && track === activeTrack ? (
        <div>
          <i className="fa fa-volume-up fa-3x playingTrackIcon" aria-hidden="true" />
          <i className="fa fa-pause fa-3x pauseTrackIcon" aria-hidden="true" />
        </div>
      ) : (
        <div>
          <i className="fa fa-play fa-3x playTrackIcon" aria-hidden="true" />
          <span className="indexTrackIcon" aria-hidden="true">
            {index + 1}
          </span>
        </div>
      )}
    </div>
  );
}

PlayIcons.propTypes = {
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  onClickFunction: React.PropTypes.func,
  track: React.PropTypes.object,
  index: React.PropTypes.number,
};

export default connect(
  state => ({
    activeTrack: state.track.activeTrack,
    isPlaying: state.track.isPlaying,
  }),
  dispatch => ({
    onClickFunction: track => dispatch(actions.playPauseTrack(track)),
  }),
)(PlayIcons);
