/* eslint-env browser */
import CLIENT_ID from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks,
  };
}

export function playTrack(track) {
  return {
    type: actionTypes.TRACK_PLAY,
    track,
  };
}

export function fetchTracks() {
  return (dispatch) => {
    fetch(`
      //api.soundcloud.com/tracks?linked_partitioning=1&limit=20&offset=0&tags=Tech%20House&client_id=${CLIENT_ID}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setTracks(data.collection));
      });
  };
}
