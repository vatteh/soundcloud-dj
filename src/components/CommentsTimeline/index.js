import React from 'react';

const styles = {
  waveformUrl: {
    height: 150,
    width: '100%',
  },
};

function CommentsTimeline({ activeTrack, comments, currentTrackTime }) {
  return (
    <div>
      <img style={styles.waveformUrl} src={activeTrack.waveform_url} />
    </div>
  );
}

CommentsTimeline.propTypes = {
  activeTrack: React.PropTypes.object,
  comments: React.PropTypes.array,
  currentTrackTime: React.PropTypes.number,
};

export default CommentsTimeline;
