/* eslint-env browser */
/* eslint no-param-reassign: ["error", { "props": false }]*/
import CLIENT_ID from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks,
  };
}

export function playPauseTrack(selectedTrack) {
  return (dispatch, getState) => {
    const state = getState();

    if (state.track.activeTrack !== selectedTrack || !state.track.isPlaying) {
      dispatch({
        type: actionTypes.TRACK_PLAY,
        track: selectedTrack,
      });
    } else {
      dispatch({
        type: actionTypes.TRACK_PAUSE,
      });
    }
  };
}

export function playTrack(selectedTrack) {
  return {
    type: actionTypes.TRACK_PLAY,
    track: selectedTrack,
  };
}

export function prevNextTrack(currentTrack, increment) {
  return (dispatch, getState) => {
    const state = getState();
    const index = state.track.tracks.findIndex(track => track === currentTrack);

    if (state.track.tracks[index + increment]) {
      dispatch({
        type: actionTypes.TRACK_NEXT_PREV,
        track: state.track.tracks[index + increment],
      });
    }
  };
}

export function sliderUpdate(newValue) {
  return {
    type: actionTypes.UPDATE_SLIDER,
    // track: selectedTrack,
  };
}

export function trackPlayheadUpdate() {
  return {
    type: actionTypes.UPDATE_TRACK_PLAYHEAD,
    // track: selectedTrack,
  };
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);

  let displayHours = Math.floor(totalMinutes / 60);
  displayHours = displayHours ? `${displayHours}:` : '';
  let displayMinutes = Math.floor(totalMinutes % 60);
  displayMinutes = displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes;
  let displaySeconds = Math.floor(totalSeconds % 60);
  displaySeconds = displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds;

  return `${displayHours}${displayMinutes}:${displaySeconds}`;
}

export function fetchTracks() {
  return (dispatch) => {
    fetch(`
      //api.soundcloud.com/tracks?linked_partitioning=1&limit=20&offset=0&tags=Tech%20House&client_id=${CLIENT_ID}`)
      .then(response => response.json())
      .then((data) => {
        data.collection.forEach((element) => {
          element.durationFormatted = formatTime(element.duration);
        });
        dispatch(setTracks(data.collection));
      });
  };
}
