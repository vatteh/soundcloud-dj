import * as actionTypes from '../constants/actionTypes';

const initialState = {
  tracks: [],
  activeTrack: null,
  isPlaying: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET: {
      const { tracks } = action;
      return { ...state, tracks };
    }
    case actionTypes.TRACK_PLAY: {
      const { track } = action;
      return { ...state, activeTrack: track, isPlaying: true };
    }
    case actionTypes.TRACK_PAUSE: {
      return { ...state, isPlaying: false };
    }
    case actionTypes.TRACK_NEXT_PREV: {
      const { track } = action;
      return { ...state, activeTrack: track };
    }
    case actionTypes.UPDATE_SLIDER: {
      const { track } = action;
      return { ...state };
    }
    default:
      return state;
  }
}
