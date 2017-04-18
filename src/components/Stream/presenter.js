import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
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
          <Table fixedHeader={true}>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {
                tracks.map((track, key) =>
                  <TableRow key={key}>
                    <TableRowColumn style={{ width: 60 }}>
                      <Avatar src={track.artwork_url} size={60} style={{ borderRadius: 0 }}/>
                    </TableRowColumn>
                    <TableRowColumn><a href={track.permalink_url}>{track.title}</a></TableRowColumn>
                    <TableRowColumn style={{ width: 50 }}>{track.durationFormatted}</TableRowColumn>
                    <TableRowColumn style={{ width: 50 }}>
                      <i className="fa fa-play-circle fa-3x" aria-hidden="true" onClick={onPlay.bind(this, track)}></i>
                    </TableRowColumn>
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
