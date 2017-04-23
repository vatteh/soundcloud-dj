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

    if (isPlaying && activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  onRowDoubleClick(track) {
    const { activeTrack, onRowDoubleClick } = this.props;
    const audioElement = ReactDOM.findDOMNode(this.audioElement);
    if (track === activeTrack) {
      audioElement.currentTime = 0;
    } else {
      onRowDoubleClick(track);
    }
  }

  icon(track) {
    const { activeTrack, isPlaying, onPlayPauseIconClick } = this.props;
    return (
      <div className="trackArtwork" onClick={onPlayPauseIconClick.bind(this, track)}>
        <img src={track.artwork_url} style={{ width: 75 }} />
        {
          (isPlaying && track === activeTrack) ?
          <div>
            <i className="fa fa-volume-up fa-3x visibleOnHover" aria-hidden="true"></i>
            <i className="fa fa-pause-circle-o fa-4x hiddenOnHover" aria-hidden="true"></i>
          </div> : <i className="fa fa-play-circle-o fa-4x hiddenOnHover" aria-hidden="true"></i>
        }
      </div>
    );
  }

  render() {
    const { tracks = [], activeTrack } = this.props;
    const likesColumnStyles = { width: 60 };
    const commentsColumnStyles = { width: 60 };
    const durationColumnStyles = { width: 60 };

    return (
      <div>
        <br />
        <div>
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn style={likesColumnStyles}>
                  <i className="fa fa-heart fa-lg" aria-hidden="true"></i>
                </TableHeaderColumn>
                <TableHeaderColumn style={commentsColumnStyles}>
                  <i className="fa fa-comments fa-lg" aria-hidden="true"></i>
                </TableHeaderColumn>
                <TableHeaderColumn style={durationColumnStyles}>Duration</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {
                tracks.map((track, key) =>
                  <TableRow key={key} className="tableRow" onDoubleClick={this.onRowDoubleClick.bind(this, track)}>
                    <TableRowColumn style={{ width: 75, padding: 0 }}>
                      {this.icon(track)}
                    </TableRowColumn>
                    <TableRowColumn>
                      <span style={{ fontSize: `${1.2}em` }}>
                        {track.title}
                      </span>
                    </TableRowColumn>
                    <TableRowColumn style={likesColumnStyles}>
                      <span style={{ fontSize: `${1.2}em` }}>
                        {track.likes_count.toLocaleString()}
                      </span>
                    </TableRowColumn>
                    <TableRowColumn style={commentsColumnStyles}>
                      <span style={{ fontSize: `${1.2}em` }}>
                        {track.comment_count.toLocaleString()}
                      </span>
                    </TableRowColumn>
                    <TableRowColumn style={durationColumnStyles}>
                      <span style={{ fontSize: `${1.2}em` }}>
                        {track.durationFormatted}
                      </span>
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
