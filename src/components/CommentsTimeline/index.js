import React from 'react';

const styles = {
  commentsTimelineContainer: {
    height: 150,
    width: '100%',
    overflow: 'scroll',
  },
};

function CommentsTimeline({ activeTrack, comments, currentTrackTime }) {
  return <div style={styles.commentsTimelineContainer} />;
}

CommentsTimeline.propTypes = {
  activeTrack: React.PropTypes.object,
  comments: React.PropTypes.array,
  currentTrackTime: React.PropTypes.number,
};

export default CommentsTimeline;
