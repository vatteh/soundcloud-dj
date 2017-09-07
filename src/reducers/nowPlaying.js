import * as actionTypes from '../constants/actionTypes';

const initialState = {
  nowPlayingExpanded: false,
  comments: null,
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };

  switch (action.type) {
    case actionTypes.TOGGLE_EXPAND_NOW_PLAYING: {
      newState.nowPlayingExpanded = !newState.nowPlayingExpanded;
      return newState;
    }
    case actionTypes.FETCH_COMMENTS: {
      newState.comments = action.comments;
      return newState;
    }
    case actionTypes.RESET_COMMENTS: {
      newState.comments = null;
      return newState;
    }
    default:
      return newState;
  }
}
