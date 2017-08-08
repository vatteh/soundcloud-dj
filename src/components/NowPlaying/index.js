import React from 'react';
import Marquee from 'react-marquee';

const styles = {
  nowPlayingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
  },
  playerTrackTitle: {
    marginRight: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  trackImage: {
    height: 80,
    margin: 10,
  },
};

function NowPlaying({ activeTrack }) {
  if (activeTrack) {
    return (
      <div style={styles.nowPlayingContainer}>
        <img style={styles.trackImage} src={activeTrack.artwork_url} />
        <span style={styles.playerTrackTitle}>
          <Marquee text={activeTrack.title} leading={1000} trailing={1000} loop={true} />
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
