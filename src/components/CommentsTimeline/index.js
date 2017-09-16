import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import scrollIntoView from 'scroll-into-view';
import * as actions from '../../actions';
import { highlightColor2, highlightColor3 } from '../../constants/styles';

const styles = {
  commentContainer: {
    color: highlightColor2,
  },
  tagList: {
    color: highlightColor3,
  },
  loader: {
    marginTop: 45,
  },
  autoScrollSwitch: {
    width: 125,
    display: 'inlineBlock',
    float: 'right',
    marginRight: 5,
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
  if (comments && comments.length && autoScrollComments) {
    assignFocusedComment(commentsByTimestamp, currentTrackTime);
    lastTrackTime = currentTrackTime;
    const element = document.querySelector(`.commentList #trackComment_${focusedComment.id}`);
    if (element) {
      scrollIntoView(element, { time: 200 });
    }
  }

  return (
    <div>
      <div>
        {activeTrack.tag_list && (
          <span className="tagList" style={styles.tagList}>
            Tags: {activeTrack.tag_list}
          </span>
        )}
        <Toggle
          label="Auto Scroll"
          onToggle={onToggle}
          toggled={autoScrollComments}
          style={styles.autoScrollSwitch}
          labelStyle={{ color: highlightColor3 }}
        />
      </div>
      <div className="commentList">
        {comments && comments.length ? (
          comments.map(comment => (
            <div
              id={`trackComment_${comment.id}`}
              key={comment.id}
              className="commentList__commentContainer"
              style={{
                color: !autoScrollComments || comment.id === focusedComment.id ? highlightColor2 : highlightColor3,
              }}
            >
              <div className="avatarContainer">
                <a data-tip data-for={comment.user.username}>
                  <img className="avatarContainer__image" src={comment.user.avatar_url} />
                </a>
                <ReactTooltip place="top" type="dark" effect="float" id={comment.user.username}>
                  <div>{comment.user.username}</div>
                </ReactTooltip>
              </div>
              <span className="commentBody">
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
