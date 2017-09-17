import React from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-marquee';

import * as actions from '../../actions';
import CommentsTimeline from '../CommentsTimeline';

let trackImageExpandIcon;
let fetchingComments = false;

function onMouseEnterFunction() {
  trackImageExpandIcon.classList.add('trackImageExpandIcon__onHover');
}

function onMouseLeaveFunction() {
  trackImageExpandIcon.classList.remove('trackImageExpandIcon__onHover');
}

function TrackImage({ activeTrack, nowPlayingExpanded, onExpandClick }) {
  return (
    <div
      className="trackImage"
      onClick={onExpandClick}
      onMouseEnter={onMouseEnterFunction}
      onMouseLeave={onMouseLeaveFunction}
    >
      <img className="trackImage__image" src={activeTrack.artwork_url} />
      <i
        className={`fa ${nowPlayingExpanded ? 'fa-minus-square' : 'fa-plus-square'} fa-2x trackImageExpandIcon`}
        ref={(element) => {
          trackImageExpandIcon = element;
        }}
        aria-hidden="true"
      />
    </div>
  );
}

TrackImage.propTypes = {
  activeTrack: React.PropTypes.object,
  nowPlayingExpanded: React.PropTypes.bool,
  onExpandClick: React.PropTypes.func,
};

function NowPlaying({ activeTrack, nowPlayingExpanded, comments, onFetchComments, onExpandClick }) {
  if (nowPlayingExpanded && !comments && !fetchingComments) {
    fetchingComments = true;
    onFetchComments(activeTrack.id);
  } else {
    fetchingComments = false;
  }

  if (activeTrack) {
    return (
      <div className="nowPlaying" style={{ height: nowPlayingExpanded ? 210 : 70 }}>
        <TrackImage activeTrack={activeTrack} nowPlayingExpanded={nowPlayingExpanded} onExpandClick={onExpandClick} />
        <div className="nowPlaying__trackTitleComments">
          <div className="nowPlaying__trackTitleComments__playerTrackTitle">
            <a href={activeTrack.permalink_url} className="title">
              <Marquee text={activeTrack.title} leading={1000} trailing={1000} loop={true} />
            </a>
            <span className="date">{activeTrack.created_at_formatted}</span>
          </div>
          {nowPlayingExpanded && <CommentsTimeline />}
        </div>
      </div>
    );
  }

  return null;
}

NowPlaying.propTypes = {
  activeTrack: React.PropTypes.object,
  nowPlayingExpanded: React.PropTypes.bool,
  comments: React.PropTypes.array,
  onFetchComments: React.PropTypes.func,
  onExpandClick: React.PropTypes.func,
};

export default connect(
  state => ({
    activeTrack: state.track.activeTrack,
    nowPlayingExpanded: state.nowPlaying.nowPlayingExpanded,
    comments: state.nowPlaying.comments,
  }),
  dispatch => ({
    onFetchComments: () => dispatch(actions.fetchComments()),
    onExpandClick: () => dispatch(actions.toggleExpandNowPlaying()),
  }),
)(NowPlaying);
