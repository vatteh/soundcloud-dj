import CLIENT_ID from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';
import { formatDate } from '../utils';

const LIMIT = 25;

function commentsURL(trackId, clientId) {
  return `//api.soundcloud.com/tracks/${trackId}/comments?client_id=${clientId}`;
}

export function toggleExpandNowPlaying() {
  return {
    type: actionTypes.TOGGLE_EXPAND_NOW_PLAYING,
  };
}

export function setComments(comments) {
  return {
    type: actionTypes.FETCH_COMMENTS,
    comments,
  };
}

export function fetchComments() {
  return (dispatch, getState) => {
    const state = getState();
    fetch(commentsURL(state.track.activeTrack.id, CLIENT_ID))
      .then(response => response.json())
      .then((data) => {
        data.forEach((element) => {
          element.created_at_formatted = formatDate(element.created_at);
        });
        dispatch(setComments(data));
      });
  };
}
