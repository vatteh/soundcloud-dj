import * as actionTypes from '../constants/actionTypes';

export function toggleExpandNowPlaying() {
  return {
    type: actionTypes.TOGGLE_EXPAND_NOW_PLAYING,
  };
}

export function fetchComments(trackId) {
  return {
    type: actionTypes.FETCH_COMMENTS,
    trackId,
  };
}
