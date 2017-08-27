import * as actionTypes from '../constants/actionTypes';

const initialState = {
  nowPlayingExpanded: false,
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };

  switch (action.type) {
    case actionTypes.TOGGLE_EXPAND_NOW_PLAYING: {
      newState.nowPlayingExpanded = !newState.nowPlayingExpanded;
      return newState;
    }
    default:
      return newState;
  }
}
