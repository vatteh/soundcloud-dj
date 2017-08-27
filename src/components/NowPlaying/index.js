import React from 'react';
import Marquee from 'react-marquee';
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
  nowPlaying: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerTrackTitle: {
    color: highlightColor2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: `${1.2}em`,
  },
  trackImageContainer: {
    height: 70,
    position: 'relative',
  },
  trackImage: {
    height: 60,
    margin: 5,
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
  trackImageExpandIcon.classList.add('trackImageContainer__onHover');
}

function onMouseLeaveFunction() {
  trackImageExpandIcon.classList.remove('trackImageContainer__onHover');
}

function NowPlaying({ activeTrack, nowPlayingExpanded, onExpandClick }) {
  styles.nowPlayingContainer.height = nowPlayingExpanded ? 210 : 70;
  styles.trackImageContainer.height = nowPlayingExpanded ? 210 : 70;

  if (activeTrack) {
    return (
      <div style={styles.nowPlayingContainer}>
        <div style={styles.nowPlaying}>
          <div
            style={styles.trackImageContainer}
            onClick={onExpandClick}
            onMouseEnter={onMouseEnterFunction}
            onMouseLeave={onMouseLeaveFunction}
          >
            <img style={styles.trackImage} src={activeTrack.artwork_url} />
            <i
              className="fa fa-plus-square fa-2x trackImageContainer"
              style={styles.trackImageExpandIcon}
              ref={(element) => {
                trackImageExpandIcon = element;
              }}
              aria-hidden="true"
            />
          </div>
          <a href={activeTrack.permalink_url} style={styles.playerTrackTitle}>
            <Marquee text={activeTrack.title} leading={1000} trailing={1000} loop={true} />
          </a>
        </div>
        <span style={styles.createdAt}>
          {activeTrack.created_at_formatted}
        </span>
      </div>
    );
  }

  return null;
}

NowPlaying.propTypes = {
  activeTrack: React.PropTypes.object,
};

export default NowPlaying;
