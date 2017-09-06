import React from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-marquee';
import * as actions from '../../actions';
import CommentsTimeline from '../CommentsTimeline';
import { basePlayerColorTransparent, highlightColor1, highlightColor2, highlightColor3 } from '../../constants/styles';

const styles = {
  nowPlayingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    width: '100%',
    background: basePlayerColorTransparent,
  },
  playerTrackTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerTrackTitle: {
    color: highlightColor2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: `${1.2}em`,
  },
  trackImageContainer: {
    height: '100%',
    position: 'relative',
    cursor: 'pointer',
  },
  trackTitleCommentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
  },
  trackImage: {
    height: '100%',
    padding: 5,
    boxSizing: 'border-box',
  },
  trackImageExpandIcon: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
  createdAt: {
    color: highlightColor3,
    marginRight: 5,
  },
};

let trackImageExpandIcon;

function onMouseEnterFunction() {
  trackImageExpandIcon.classList.add('trackImageExpandIcon__onHover');
}

function onMouseLeaveFunction() {
  trackImageExpandIcon.classList.remove('trackImageExpandIcon__onHover');
}

function TrackImage({ activeTrack, nowPlayingExpanded, onExpandClick }) {
  return (
    <div
      style={styles.trackImageContainer}
      onClick={onExpandClick}
      onMouseEnter={onMouseEnterFunction}
      onMouseLeave={onMouseLeaveFunction}
    >
      <img style={styles.trackImage} src={activeTrack.artwork_url} />
      <i
        className={`fa ${nowPlayingExpanded ? 'fa-minus-square' : 'fa-plus-square'} fa-2x trackImageExpandIcon`}
        style={styles.trackImageExpandIcon}
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
  styles.nowPlayingContainer.height = nowPlayingExpanded ? 210 : 70;
  if (nowPlayingExpanded && !comments) {
    onFetchComments(activeTrack.id);
  }

  if (activeTrack) {
    return (
      <div className="nowPlayingContainer" style={styles.nowPlayingContainer}>
        <TrackImage activeTrack={activeTrack} nowPlayingExpanded={nowPlayingExpanded} onExpandClick={onExpandClick} />
        <div style={styles.trackTitleCommentsContainer}>
          <div style={styles.playerTrackTitleContainer}>
            <a href={activeTrack.permalink_url} style={styles.playerTrackTitle}>
              <Marquee text={activeTrack.title} leading={1000} trailing={1000} loop={true} />
            </a>
            <span style={styles.createdAt}>{activeTrack.created_at_formatted}</span>
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
    onFetchComments: trackId => dispatch(actions.fetchComments(trackId)),
    onExpandClick: () => dispatch(actions.toggleExpandNowPlaying()),
  }),
)(NowPlaying);
