import * as actionTypes from '../constants/actionTypes';

const initialState = {
  tracks: [],
  activeTrack: null,
  isPlaying: false,
  currentTrackTime: 0,
};

export default function (state = initialState, action) {
  const stateCopy = { ...state };
  stateCopy.seekTo = false;

  switch (action.type) {
    case actionTypes.TRACKS_SET: {
      const { tracks } = action;
      stateCopy.tracks = tracks;
      return stateCopy;
    }
    case actionTypes.TRACK_PLAY: {
      const { track } = action;
      stateCopy.activeTrack = track;
      stateCopy.isPlaying = true;
      return stateCopy;
    }
    case actionTypes.TRACK_PAUSE: {
      stateCopy.isPlaying = false;
      return stateCopy;
    }
    case actionTypes.TRACK_NEXT_PREV: {
      const { track } = action;
      stateCopy.isPlaying = true;
      stateCopy.activeTrack = track;
      return stateCopy;
    }
    case actionTypes.UPDATE_TRACK_PLAYHEAD: {
      const { currentTrackTime } = action;
      stateCopy.seekTo = true;
      stateCopy.currentTrackTime = currentTrackTime;
      return stateCopy;
    }
    case actionTypes.UPDATE_SLIDER: {
      const { currentTrackTime } = action;
      stateCopy.currentTrackTime = currentTrackTime;
      return stateCopy;
    }
    default:
      return stateCopy;
  }
}
