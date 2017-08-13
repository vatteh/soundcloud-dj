import * as actionTypes from '../constants/actionTypes';

const initialState = {
  searchText: '',
};

export default function (prevState = initialState, action) {
  const newState = { ...prevState };

  switch (action.type) {
    case actionTypes.UPDATE_SEARCH_TEXT: {
      const { searchText } = action;
      newState.searchText = searchText;
      return newState;
    }
    default:
      return newState;
  }
}
