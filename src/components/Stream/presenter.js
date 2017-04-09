import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

class Stream extends Component {
  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.audioElement);

    if (!audioElement) { return; }

    const { activeTrack } = this.props;

    if (activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { user, tracks = [], activeTrack, onAuth, onPlay } = this.props;

    return (
      <div>
        <div>
          {
            user ?
              <div>{user.username}</div> :
              <button onClick={onAuth} type="button">Login</button>
          }
        </div>
        <br />
        <div>
          {
            tracks.map((track, key) =>
              <div className="track" key={key}>
                {track.title}
                <button type="button" onClick={() => onPlay(track)}>Play</button>
              </div>,
            )
          }
        </div>
        {
          activeTrack ?
            <audio
              id="audio"
              ref={(element) => { this.audioElement = element; }}
              src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`} /> : null
        }
      </div>
    );
  }
}

export default Stream;
