import * as actionTypes from '../constants/actionTypes';

const initialState = {
  nowPlayingExpanded: false,
  comments: null,
  autoScrollComments: true,
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };

  switch (action.type) {
    case actionTypes.TOGGLE_EXPAND_NOW_PLAYING: {
      newState.nowPlayingExpanded = !newState.nowPlayingExpanded;
      return newState;
    }
    case actionTypes.FETCH_COMMENTS: {
      newState.comments = action.comments;
      newState.commentsByTimestamp = {};

      action.comments.forEach((comment) => {
        const timeStamp = Math.floor(comment.timestamp / 1000);

        if (newState.commentsByTimestamp[timeStamp]) {
          newState.commentsByTimestamp[timeStamp].push(comment);
        } else {
          newState.commentsByTimestamp[timeStamp] = [comment];
        }
      });

      return newState;
    }
    case actionTypes.RESET_COMMENTS: {
      newState.comments = null;
      return newState;
    }
    case actionTypes.TOGGLE_AUTO_SCROLL_COMMENTS: {
      newState.autoScrollComments = action.autoScrollComments;
      return newState;
    }
    default:
      return newState;
  }
}
