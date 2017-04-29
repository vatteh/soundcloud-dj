import React from 'react';

function PlayIcons({ activeTrack, isPlaying, track, index }) {
  return (
    <div className="trackIcons">
      {
        (isPlaying && track === activeTrack) ?
        <div>
          <i className="fa fa-volume-up fa-3x playingTrackIcon" aria-hidden="true"></i>
          <i className="fa fa-pause fa-3x pauseTrackIcon" aria-hidden="true"></i>
        </div> : <div>
          <i className="fa fa-play fa-3x playTrackIcon" aria-hidden="true"></i>
          <span className="indexTrackIcon" aria-hidden="true">{index + 1}</span>
        </div>
      }
    </div>
  );
}

PlayIcons.propTypes = {
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  track: React.PropTypes.object,
  index: React.PropTypes.number,
};

export default PlayIcons;
