import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const { tracks, activeTrack, isPlaying } = state.track;
  return {
    tracks,
    activeTrack,
    isPlaying,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlayPauseIconClick: bindActionCreators(actions.playPauseTrack, dispatch),
    onRowDoubleClick: bindActionCreators(actions.playTrack, dispatch),
    onFetchTracks: bindActionCreators(actions.fetchTracks, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
