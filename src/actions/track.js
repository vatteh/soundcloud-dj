/* eslint-env browser */
import * as actionTypes from '../constants/actionTypes';
import { formatTime, formatDate } from '../utils';

export const clientData = {
  CLIENT_ID: null,
};
const LIMIT = 25;
let baseURL;
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
      if (state.track.activeTrack !== selectedTrack) {
        dispatch({
          type: actionTypes.RESET_COMMENTS,
        });
      }

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
  return (dispatch, getState) => {
    if (getState().track.activeTrack !== selectedTrack) {
      dispatch({
        type: actionTypes.RESET_COMMENTS,
      });
    }

    dispatch({
      type: actionTypes.TRACK_PLAY,
      track: selectedTrack,
    });
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
      if (increment !== 0) {
        dispatch({
          type: actionTypes.RESET_COMMENTS,
        });
      }

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
    const clientIdPromise = !clientData.CLIENT_ID
      ? fetch('/client_id/')
          .then(response => response.json())
          .then((data) => {
            clientData.CLIENT_ID = data;
            baseURL = `//api.soundcloud.com/tracks?linked_partitioning=1&limit=${LIMIT}&client_id=${clientData.CLIENT_ID}`;
          })
      : Promise.resolve();

    clientIdPromise.then(() => {
      const url = baseURL + searchParam + offsetParam;
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          data.collection.forEach((element) => {
            element.duration_formatted = formatTime(element.duration);
            element.created_at_formatted = formatDate(element.created_at);
          });
          dispatch(setTracks(data.collection, searchText === undefined));
          trackOffset += LIMIT;
        });
    });
  };
}
