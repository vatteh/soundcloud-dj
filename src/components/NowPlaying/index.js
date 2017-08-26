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
  trackImage: {
    height: 60,
    margin: 5,
  },
  createdAt: {
    color: highlightColor3,
    marginRight: 5,
  },
};

function NowPlaying({ activeTrack }) {
  if (activeTrack) {
    return (
      <div style={styles.nowPlayingContainer}>
        <div style={styles.nowPlaying}>
          <img style={styles.trackImage} src={activeTrack.artwork_url} />
          <a href={activeTrack.permalink_url} style={styles.playerTrackTitle}>
            <Marquee text={activeTrack.title} leading={1000} trailing={1000} loop={true} />
          </a>
        </div>
        <span style={styles.createdAt}>{activeTrack.created_at_formatted}</span>
      </div>
    );
  }

  return null;
}

NowPlaying.propTypes = {
  activeTrack: React.PropTypes.object,
};

export default NowPlaying;
