import * as actionTypes from '../constants/actionTypes';

export default function updateVolume(newValue) {
  return {
    type: actionTypes.UPDATE_VOLUME,
    volumeValue: newValue,
  };
}
