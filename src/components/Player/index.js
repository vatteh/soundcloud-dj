import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Player from './presenter';

function mapStateToProps(state) {
  const { activeTrack, isPlaying } = state.track;
  return {
    activeTrack,
    isPlaying,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlayPauseIconClick: bindActionCreators(actions.playPauseTrack, dispatch),
    onPrevNextTrackIconClick: bindActionCreators(actions.prevNextTrack, dispatch),
    onSliderUpdate: bindActionCreators(actions.sliderUpdate, dispatch),
    onSliderDrag: bindActionCreators(actions.trackPlayheadUpdate, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
