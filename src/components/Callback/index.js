/* eslint-env browser*/
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["componentDidMount", "render"] }] */
import React from 'react';

class Callback extends React.Component {
  componentDidMount() {
    window.setTimeout(opener.SC.connectCallback, 1);
  }

  render() {
    return <div><p>This page should close soon.</p></div>;
  }
}

export default Callback;
