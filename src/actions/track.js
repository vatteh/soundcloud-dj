/* eslint-env browser */
/* eslint no-param-reassign: ["error", { "props": false }]*/
import CLIENT_ID from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';
import { formatTime } from '../utils';

const LIMIT = 25;
const baseURL = `//api.soundcloud.com/tracks?linked_partitioning=1&limit=${LIMIT}&client_id=${CLIENT_ID}`;
const defaultTags = '&tags=Tech%20House';
let trackOffset = 0;

export function setSortBy(column) {
  return {
    type: actionTypes.UPDATE_SORT,
    column,
  };
}

export function setTracks(tracks, append) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks,
    append,
  };
}

export function fetchingTracks() {
  return {
    type: actionTypes.FETCHING_TRACKS,
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
    let index;

    if (state.volume.onRandom && increment !== 0) {
      index = Math.floor(Math.random() * state.track.tracks.length);
    } else {
      index = state.track.tracks.findIndex(track => track === currentTrack);
      index += increment;
    }

    if (state.track.tracks[index]) {
      dispatch({
        type: actionTypes.TRACK_NEXT_PREV,
        track: state.track.tracks[index],
      });
    }
  };
}

export function fetchTracks(searchText) {
  return (dispatch, getState) => {
    if (searchText !== undefined) {
      trackOffset = 0;
    }
    const offsetParam = `&offset=${trackOffset}`;

    const state = getState();
    let searchParam;
    if (searchText) {
      searchParam = `&q=${searchText}`;
    } else if (state.toolbar && state.toolbar.searchText) {
      searchParam = `&q=${state.toolbar.searchText}`;
    } else {
      searchParam = defaultTags;
    }

    dispatch(fetchingTracks());
    const url = baseURL + searchParam + offsetParam;
    fetch(url).then(response => response.json()).then((data) => {
      data.collection.forEach((element) => {
        element.durationFormatted = formatTime(element.duration);
      });
      dispatch(setTracks(data.collection, searchText === undefined));
      trackOffset += LIMIT;
    });
  };
}
