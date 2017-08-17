import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TrackList from './presenter';

function mapStateToProps(state) {
  const { tracks, activeTrack, isPlaying, sortBy } = state.track;
  return {
    tracks,
    activeTrack,
    isPlaying,
    sortBy,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlayPauseIconClick: bindActionCreators(actions.playPauseTrack, dispatch),
    onRowDoubleClick: bindActionCreators(actions.playTrack, dispatch),
    onFetchTracks: bindActionCreators(actions.fetchTracks, dispatch),
    onActiveRowDoubleClick: bindActionCreators(actions.updateTrackPlayhead, dispatch),
    onColumnHeaderClick: bindActionCreators(actions.setSortBy, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
