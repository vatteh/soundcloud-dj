import * as actionTypes from '../constants/actionTypes';

export function updateVolume(newValue) {
  return {
    type: actionTypes.UPDATE_VOLUME,
    volumeValue: newValue,
  };
}

export function toggleOnRepeat() {
  return {
    type: actionTypes.TOGGLE_ON_REPEAT,
  };
}

export function toggleOnRandom() {
  return {
    type: actionTypes.TOGGLE_ON_RANDOM,
  };
}
