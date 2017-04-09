import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const { tracks, activeTrack } = state.track;
  return {
    tracks,
    activeTrack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlay: bindActionCreators(actions.playTrack, dispatch),
    onFetchTracks: bindActionCreators(actions.fetchTracks, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
