import * as actionTypes from '../constants/actionTypes';

export function updateSlider(newValue) {
  return {
    type: actionTypes.UPDATE_SLIDER,
    currentTrackTime: newValue,
  };
}

export function updateTrackPlayhead(newValue) {
  return {
    type: actionTypes.UPDATE_TRACK_PLAYHEAD,
    currentTrackTime: newValue,
  };
}
