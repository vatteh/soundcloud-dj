import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import PlayIcons from '../PlayIcons';
import Player from '../Player';
import CLIENT_ID from '../../constants/auth';

const playIconColumnStyles = { width: 50, height: 60 };
const likesColumnStyles = { width: 60 };
const commentsColumnStyles = { width: 60 };
const durationColumnStyles = { width: 60 };

class TrackList extends Component {
  componentDidMount() {
    this.props.onFetchTracks();
  }

  rowDoubleClickHelper(track, e) {
    if (e.target.tagName === 'I') {
      return;
    }

    const { activeTrack, onRowDoubleClick, onActiveRowDoubleClick } = this.props;

    if (track === activeTrack) {
      onActiveRowDoubleClick(0);
    } else {
      onRowDoubleClick(track);
    }
  }

  render() {
    const { tracks = [], activeTrack } = this.props;

    return (
      <div>
        <Table fixedHeader={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={playIconColumnStyles}></TableHeaderColumn>
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
                <TableRow key={key} className="tableRow" onDoubleClick={this.rowDoubleClickHelper.bind(this, track)}>
                  <TableRowColumn style={playIconColumnStyles}>
                    <PlayIcons
                      activeTrack={activeTrack}
                      isPlaying={this.props.isPlaying}
                      onClickFunction={this.props.onPlayPauseIconClick.bind(this, track)}
                      track={track}
                      index={key}
                      ></PlayIcons>
                  </TableRowColumn>
                  <TableRowColumn>
                    <span style={{ fontSize: `${1.2}em` }}>
                      <a href={track.permalink_url}>{track.title}</a>
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
        <Player activeTrack={activeTrack}></Player>
      </div>
    );
  }
}

export default TrackList;
