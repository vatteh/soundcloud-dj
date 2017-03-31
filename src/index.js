import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import Stream from './components/Stream';

const tracks = [{
  title: 'Some track'
}, {
  title: 'Some other track'
}];

const store = configureStore();
store.dispach(actions.setTracks(tracks));

ReactDOM.render(
  <Stream />, document.getElementById('app')
);

module.hot.accept();
