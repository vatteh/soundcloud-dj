import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import * as actions from '../../actions';
import { highlightColor2, highlightColor3 } from '../../constants/styles';

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
    float: 'left',
    color: highlightColor3,
    fontSize: 12,
    // marginBottom: 5,
  },
  loader: {
    marginTop: 45,
  },
  autoScrollSwitch: {
    width: 125,
    display: 'inlineBlock',
    float: 'right',
    marginRight: 5,
    // marginBottom: 5,
  },
};

let focusedComment;
let lastTrackTime;

function assignFocusedComment(commentsByTimestamp, currentTrackTime) {
  let currentComments;
  let timeIndex = Math.floor(currentTrackTime);
  while (timeIndex >= 0) {
    if (commentsByTimestamp[timeIndex]) {
      currentComments = commentsByTimestamp[timeIndex];

      const commentIndex = currentComments.indexOf(focusedComment);
      if (currentComments.indexOf(focusedComment) === -1) {
        focusedComment = currentComments[0];
      } else if (commentIndex < currentComments.length - 1) {
        focusedComment = currentComments[commentIndex + 1];
      }

      break;
    }

    timeIndex--;
  }
}

function CommentsTimeline({
  activeTrack,
  comments,
  commentsByTimestamp,
  currentTrackTime,
  autoScrollComments,
  onToggle,
}) {
  if (comments && comments.length && currentTrackTime !== lastTrackTime) {
    assignFocusedComment(commentsByTimestamp, currentTrackTime);
    lastTrackTime = currentTrackTime;
    const element = document.querySelector(`.comment_list #track_comment_${focusedComment.id}`);
    if (element) {
      element.scrollIntoView();
    }
  }

  return (
    <div>
      <div>
        {activeTrack.tag_list && <span style={styles.tagList}>Tags: {activeTrack.tag_list}</span>}
        <Toggle
          label="Auto Scroll"
          onToggle={onToggle}
          toggled={autoScrollComments}
          style={styles.autoScrollSwitch}
          labelStyle={{ color: highlightColor3 }}
        />
      </div>
      <div className={'comment_list'} style={styles.commentsTimelineContainer}>
        {comments && comments.length ? (
          comments.map(comment => (
            <div id={`track_comment_${comment.id}`} key={comment.id} style={styles.commentContainer}>
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
  commentsByTimestamp: React.PropTypes.object,
  currentTrackTime: React.PropTypes.number,
  autoScrollComments: React.PropTypes.bool,
};

export default connect(
  state => ({
    activeTrack: state.track.activeTrack,
    comments: state.nowPlaying.comments,
    commentsByTimestamp: state.nowPlaying.commentsByTimestamp,
    currentTrackTime: state.track.currentTrackTime,
    autoScrollComments: state.nowPlaying.autoScrollComments,
  }),
  dispatch => ({
    onToggle: (event, value) => dispatch(actions.toggleAutoScrollComments(value)),
  }),
)(CommentsTimeline);
