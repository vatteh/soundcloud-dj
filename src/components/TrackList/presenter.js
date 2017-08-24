import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import PlayIcons from '../PlayIcons';
import Player from '../Player';
import AppToolbar from '../AppToolbar';
import SortIcon from '../SortIcon';
import CLIENT_ID from '../../constants/auth';

const playIconColumnStyles = { width: 50, height: 60 };
const playsColumnStyles = { width: 80 };
const likesColumnStyles = { width: 60 };
const commentsColumnStyles = { width: 60 };
const durationColumnStyles = { width: 60 };
const loaderColumnStyles = { overflow: 'visible' };
const innerColumnStyle = { fontSize: `${1.2}em` };
const columnTitleStyles = { marginRight: 5 };
const loaderStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 50,
  marginBottom: 150,
  width: window.innerWidth,
};

class TrackList extends Component {
  componentDidMount() {
    this.props.onFetchTracks();
    this.setupInfiniteScroll();
  }

  setupInfiniteScroll() {
    const tableBodyElement = document.querySelector('tbody').parentNode.parentNode;
    this.timeoutID = null;
    tableBodyElement.addEventListener('scroll', () => {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.timeoutID = null;
        if (tableBodyElement.offsetHeight + tableBodyElement.scrollTop >= tableBodyElement.scrollHeight - 100) {
          this.props.onFetchTracks();
        }
      }, 50);
    });
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

  sortTableBy(e) {
    const { onColumnHeaderClick } = this.props;

    if (e.target.tagName === 'TH' && e.target.dataset) {
      onColumnHeaderClick(e.target.dataset.sort);
    } else if (e.target.parentNode.tagName === 'TH' && e.target.parentNode.dataset) {
      onColumnHeaderClick(e.target.parentNode.dataset.sort);
    }
  }

  render() {
    const { tracks = [], activeTrack, onFetchTracks, sortBy, fetchingTracks } = this.props;

    return (
      <div>
        <AppToolbar onFetchTracks={onFetchTracks} />
        <Table fixedHeader={true} height={`${window.innerHeight - 150}px`}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow onClick={this.sortTableBy.bind(this)}>
              <TableHeaderColumn style={playIconColumnStyles} />
              <TableHeaderColumn data-sort="title">
                <span style={columnTitleStyles}>Title</span>
                <SortIcon column={'title'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn data-sort="playback_count" style={playsColumnStyles}>
                <span style={columnTitleStyles}>Plays</span>
                <SortIcon column={'playback_count'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn data-sort="likes_count" style={likesColumnStyles}>
                <i className="fa fa-heart fa-lg" style={columnTitleStyles} aria-hidden="true" />
                <SortIcon column={'likes_count'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn data-sort="comment_count" style={commentsColumnStyles}>
                <i className="fa fa-comments fa-lg" style={columnTitleStyles} aria-hidden="true" />
                <SortIcon column={'comment_count'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn data-sort="duration" style={durationColumnStyles}>
                <span style={columnTitleStyles}>Duration</span>
                <SortIcon column={'duration'} sortBy={sortBy} />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {tracks.map((track, key) =>
              <TableRow key={key} className="tableRow" onDoubleClick={this.rowDoubleClickHelper.bind(this, track)}>
                <TableRowColumn style={playIconColumnStyles}>
                  <PlayIcons
                    activeTrack={activeTrack}
                    isPlaying={this.props.isPlaying}
                    onClickFunction={this.props.onPlayPauseIconClick.bind(this, track)}
                    track={track}
                    index={key}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <span style={innerColumnStyle}>
                    <a href={track.permalink_url}>
                      {track.title}
                    </a>
                  </span>
                </TableRowColumn>
                <TableRowColumn style={playsColumnStyles}>
                  <span style={innerColumnStyle}>
                    {track.playback_count.toLocaleString()}
                  </span>
                </TableRowColumn>
                <TableRowColumn style={likesColumnStyles}>
                  <span style={innerColumnStyle}>
                    {track.likes_count.toLocaleString()}
                  </span>
                </TableRowColumn>
                <TableRowColumn style={commentsColumnStyles}>
                  <span style={innerColumnStyle}>
                    {track.comment_count.toLocaleString()}
                  </span>
                </TableRowColumn>
                <TableRowColumn style={durationColumnStyles}>
                  <span style={innerColumnStyle}>
                    {track.duration_formatted}
                  </span>
                </TableRowColumn>
              </TableRow>,
            )}
            <TableRow className="tableRow">
              <TableRowColumn className="tableColumn" style={loaderColumnStyles}>
                {fetchingTracks && <CircularProgress size={70} thickness={7} style={loaderStyles} />}
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <Player activeTrack={activeTrack} />
      </div>
    );
  }
}

export default TrackList;
