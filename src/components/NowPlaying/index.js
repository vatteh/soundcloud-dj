import React from 'react';
import Marquee from 'react-marquee';

const styles = {
  nowPlayingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    width: '99%',
  },
  nowPlaying: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerTrackTitle: {
    margin: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  trackImage: {
    height: 60,
    margin: 5,
  },
  createdAt: {
    marginRight: 5,
  },
};

function NowPlaying({ activeTrack }) {
  if (activeTrack) {
    return (
      <div style={styles.nowPlayingContainer}>
        <div style={styles.nowPlaying}>
          <img style={styles.trackImage} src={activeTrack.artwork_url} />
          <span style={styles.playerTrackTitle}>
            <Marquee text={activeTrack.title} leading={1000} trailing={1000} loop={true} />
          </span>
        </div>
        <span style={styles.createdAt}>{activeTrack.created_at}</span>
      </div>
    );
  }

  return null;
}

NowPlaying.propTypes = {
  activeTrack: React.PropTypes.object,
};

export default NowPlaying;
