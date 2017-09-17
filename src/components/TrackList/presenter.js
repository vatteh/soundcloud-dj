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
        <Table className="table" fixedHeader={true} height={`${window.innerHeight - 150}px`}>
          <TableHeader className="tableHeader" displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow onClick={this.sortTableBy.bind(this)}>
              <TableHeaderColumn className="table__playIconColumnTitle pointer" />
              <TableHeaderColumn className="pointer" data-sort="title">
                <span>Title</span>
                <SortIcon column={'title'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn className="table__playsColumnTitle pointer" data-sort="playback_count">
                <span>Plays</span>
                <SortIcon column={'playback_count'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn className="table__likesColumnTitle pointer" data-sort="likes_count">
                <i className="fa fa-heart fa-lg" aria-hidden="true" />
                <SortIcon column={'likes_count'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn className="table__commentCountColumnTitle pointer" data-sort="comment_count">
                <i className="fa fa-comments fa-lg" aria-hidden="true" />
                <SortIcon column={'comment_count'} sortBy={sortBy} />
              </TableHeaderColumn>
              <TableHeaderColumn className="table__durationColumnTitle pointer" data-sort="duration">
                <span>Duration</span>
                <SortIcon column={'duration'} sortBy={sortBy} />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {tracks.map((track, key) => (
              <TableRow key={key} className="tableBodyRow" onDoubleClick={this.rowDoubleClickHelper.bind(this, track)}>
                <TableRowColumn className="table__playIconColumnTitle pointer">
                  <PlayIcons
                    activeTrack={activeTrack}
                    isPlaying={this.props.isPlaying}
                    onClickFunction={this.props.onPlayPauseIconClick.bind(this, track)}
                    track={track}
                    index={key}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <span className="inner-column">
                    <a href={track.permalink_url}>{track.title}</a>
                  </span>
                </TableRowColumn>
                <TableRowColumn className="table__playsColumnTitle">
                  <span className="inner-column">{track.playback_count.toLocaleString()}</span>
                </TableRowColumn>
                <TableRowColumn className="table__likesColumnTitle">
                  <span className="inner-column">{track.likes_count.toLocaleString()}</span>
                </TableRowColumn>
                <TableRowColumn className="table__commentCountColumnTitle">
                  <span className="inner-column">{track.comment_count.toLocaleString()}</span>
                </TableRowColumn>
                <TableRowColumn className="table__durationColumnTitle">
                  <span className="inner-column">{track.duration_formatted}</span>
                </TableRowColumn>
              </TableRow>
            ))}
            <TableRow className="tableBodyRow">
              <TableRowColumn className="tableColumn">
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
