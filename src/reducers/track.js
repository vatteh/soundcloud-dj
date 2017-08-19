import * as actionTypes from '../constants/actionTypes';
import { sortColumnBy } from '../utils';

const initialState = {
  tracks: [],
  activeTrack: null,
  isPlaying: false,
  currentTrackTime: 0,
  fetchingTracks: false,
  sortBy: {
    column: null,
    direction: null,
  },
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };
  newState.seekTo = false;

  switch (action.type) {
    case actionTypes.FETCHING_TRACKS: {
      newState.fetchingTracks = true;
      return newState;
    }
    case actionTypes.TRACKS_SET: {
      const { tracks, append } = action;
      newState.tracks = append ? [...prevState.tracks, ...tracks] : [...tracks];
      newState.fetchingTracks = false;
      return newState;
    }
    case actionTypes.TRACK_PLAY: {
      const { track } = action;
      newState.activeTrack = track;
      newState.isPlaying = true;
      if (newState.activeTrack !== prevState.activeTrack) {
        newState.currentTrackTime = 0.01; // weird slider bug when currentTrackTime is set to 0
      }
      return newState;
    }
    case actionTypes.TRACK_PAUSE: {
      newState.isPlaying = false;
      return newState;
    }
    case actionTypes.TRACK_NEXT_PREV: {
      const { track } = action;
      newState.activeTrack = track;
      newState.isPlaying = true;
      newState.currentTrackTime = 0.01; // weird slider bug when currentTrackTime is set to 0
      return newState;
    }
    case actionTypes.UPDATE_TRACK_PLAYHEAD: {
      const { currentTrackTime } = action;
      newState.seekTo = true;
      newState.currentTrackTime = currentTrackTime;
      return newState;
    }
    case actionTypes.UPDATE_SLIDER: {
      const { currentTrackTime } = action;
      newState.currentTrackTime = currentTrackTime;
      return newState;
    }
    case actionTypes.UPDATE_SORT: {
      const { column } = action;
      let direction;
      if (!column) {
        direction = null;
      } else if (prevState.sortBy.column !== column) {
        direction = 'asc';
      } else {
        direction = prevState.sortBy.direction === 'asc' ? 'desc' : 'asc';
      }

      newState.sortBy = {
        column,
        direction,
      };

      if (column) {
        newState.tracks.sort(sortColumnBy(column, direction));
      }

      return newState;
    }
    default:
      return newState;
  }
}
