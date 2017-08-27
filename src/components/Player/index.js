import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Player from './presenter';

function mapStateToProps(state) {
  const { activeTrack, isPlaying, currentTrackTime, seekTo } = state.track;
  const { onRepeat } = state.volume;
  const { nowPlayingExpanded } = state.nowPlaying;
  return {
    activeTrack,
    isPlaying,
    onRepeat,
    currentTrackTime,
    seekTo,
    nowPlayingExpanded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlayPauseIconClick: bindActionCreators(actions.playPauseTrack, dispatch),
    onPrevNextTrackIconClick: bindActionCreators(actions.prevNextTrack, dispatch),
    onSliderDrag: bindActionCreators(actions.updateTrackPlayhead, dispatch),
    onSliderUpdate: bindActionCreators(actions.updateSlider, dispatch),
    onExpandClick: bindActionCreators(actions.toggleExpandNowPlaying, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
