import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import CLIENT_ID from '../../constants/auth';

class Stream extends Component {
  componentDidMount() {
    this.props.onFetchTracks();
  }

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.audioElement);

    if (!audioElement) { return; }

    const { activeTrack, isPlaying } = this.props;

    if (activeTrack && isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  icon(track) {
    const { activeTrack, isPlaying, onPlayPause } = this.props;
    return (
      <div className="trackArtwork" onClick={onPlayPause.bind(this, track)}>
        <img src={track.artwork_url} style={{ width: 75 }} />
        {
          (isPlaying && track === activeTrack) ?
          <div>
            <i className="fa fa-volume-up fa-3x visibleOnHover" aria-hidden="true"></i>
            <i className="fa fa-pause fa-3x hiddenOnHover" aria-hidden="true"></i>
          </div> : <i className="fa fa-play fa-3x hiddenOnHover" aria-hidden="true"></i>
        }
      </div>
    );
  }

  render() {
    const { tracks = [], activeTrack } = this.props;

    return (
      <div>
        <br />
        <div>
          <Table fixedHeader={true}>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {
                tracks.map((track, key) =>
                  <TableRow key={key}>
                    <TableRowColumn style={{ width: 75 }}>
                      {this.icon(track)}
                    </TableRowColumn>
                    <TableRowColumn><a href={track.permalink_url}>{track.title}</a></TableRowColumn>
                    <TableRowColumn style={{ width: 50 }}>{track.durationFormatted}</TableRowColumn>
                  </TableRow>,
                )
              }
            </TableBody>
          </Table>
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
