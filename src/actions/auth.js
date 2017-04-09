/* eslint-env browser*/

import SC from 'soundcloud';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';
import { CLIENT_ID } from '../constants/auth';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user,
  };
}

function fetchMe(session) {
  return (dispatch) => {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then(response => response.json())
      .then(data => dispatch(setMe(data)));
  };
}

function fetchStream(session) {
  return (dispatch) => {
    fetch(`//api.soundcloud.com/tracks?linked_partitioning=1&limit=20&offset=0&tags=Tech%20House&client_id=${CLIENT_ID}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setTracks(data.collection));
      });
  };
}

export default function auth() {
  return (dispatch) => {
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      dispatch(fetchStream(session));
    });
  };
}
