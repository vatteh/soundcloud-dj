import * as actionTypes from '../constants/actionTypes';

const initialState = {
  volumeValue: 0.5,
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };

  switch (action.type) {
    case actionTypes.UPDATE_VOLUME: {
      const { volumeValue } = action;
      newState.volumeValue = volumeValue;
      return newState;
    }
    default:
      return newState;
  }
}
