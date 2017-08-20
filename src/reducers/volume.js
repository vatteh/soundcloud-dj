import * as actionTypes from '../constants/actionTypes';

const initialState = {
  volumeValue: 0.1,
  onRepeat: false,
  onRandom: false,
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };

  switch (action.type) {
    case actionTypes.UPDATE_VOLUME: {
      const { volumeValue } = action;
      newState.volumeValue = volumeValue;
      return newState;
    }
    case actionTypes.TOGGLE_ON_REPEAT: {
      newState.onRepeat = !newState.onRepeat;
      return newState;
    }
    case actionTypes.TOGGLE_ON_RANDOM: {
      newState.onRandom = !newState.onRandom;
      return newState;
    }
    default:
      return newState;
  }
}
