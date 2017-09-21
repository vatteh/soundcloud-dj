import { clientData } from './track';
import * as actionTypes from '../constants/actionTypes';
import { formatTime, formatDate } from '../utils';

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

export function toggleAutoScrollComments(autoScrollComments) {
  return {
    type: actionTypes.TOGGLE_AUTO_SCROLL_COMMENTS,
    autoScrollComments,
  };
}

export function fetchComments() {
  return (dispatch, getState) => {
    const state = getState();
    fetch(commentsURL(state.track.activeTrack.id, clientData.CLIENT_ID))
      .then(response => response.json())
      .then((data) => {
        data.sort((a, b) => a.timestamp - b.timestamp).forEach((element) => {
          element.timestamp_formatted = formatTime(element.timestamp);
          element.created_at_formatted = formatDate(element.created_at);
        });
        dispatch(setComments(data));
      });
  };
}
