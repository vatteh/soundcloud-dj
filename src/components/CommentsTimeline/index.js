import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from '../../actions';
import { basePlayerColorTransparent, highlightColor1, highlightColor2, highlightColor3 } from '../../constants/styles';

const styles = {
  commentsTimelineContainer: {
    height: 150,
    width: '100%',
    overflow: 'scroll',
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    marginTop: 10,
    color: highlightColor2,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'col',
    height: 40,
    marginLeft: 5,
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    display: 'block',
  },
  commentBody: {
    fontSize: 14,
  },
  tagList: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    color: highlightColor3,
    fontSize: 12,
  },
  loader: {
    marginTop: 45,
  },
};

function CommentsTimeline({ activeTrack, comments, currentTrackTime }) {
  return (
    <div>
      {activeTrack.tag_list && <div style={styles.tagList}>Tags: {activeTrack.tag_list}</div>}
      <div style={styles.commentsTimelineContainer}>
        {comments && comments.length ? (
          comments.map(comment => (
            <div key={comment.id} style={styles.commentContainer}>
              <div style={styles.avatarContainer}>
                <a data-tip data-for={comment.user.username}>
                  <img style={styles.avatar} src={comment.user.avatar_url} />
                </a>
                <ReactTooltip place="top" type="dark" effect="float" id={comment.user.username}>
                  <div>{comment.user.username}</div>
                </ReactTooltip>
              </div>
              <span style={styles.commentBody}>
                {comment.body} - {comment.timestamp_formatted}
              </span>
            </div>
          ))
        ) : (
          <CircularProgress size={60} thickness={6} style={styles.loader} />
        )}
      </div>
    </div>
  );
}

CommentsTimeline.propTypes = {
  activeTrack: React.PropTypes.object,
  comments: React.PropTypes.array,
  currentTrackTime: React.PropTypes.number,
};

export default connect(state => ({
  activeTrack: state.track.activeTrack,
  comments: state.nowPlaying.comments,
  currentTrackTime: state.track.currentTrackTime,
}))(CommentsTimeline);
