import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CLIENT_ID from '../../constants/auth';

class Stream extends Component {
  componentDidMount() {
    this.props.onFetchTracks();
  }

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
    const { tracks = [], activeTrack, onPlay } = this.props;

    return (
      <div>
        <br />
        <div>
          {
            tracks.map((track, key) =>
              <div className="track" key={key}>
                {track.title} <button type="button" onClick={onPlay.bind(this, track)}>Play</button>
              </div>,
            )
          }
        </div>
        {
          activeTrack ? <audio
              id="audio"
              ref={(element) => { this.audioElement = element; }}
              src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`} /> : null
        }
      </div>
    );
  }
}

export default Stream;
