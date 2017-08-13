import * as actionTypes from '../constants/actionTypes';

export default function updateSearchText(searchText) {
  return {
    type: actionTypes.UPDATE_SEARCH_TEXT,
    searchText,
  };
}
