import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Volume from './presenter';

function mapStateToProps(state) {
  const { volumeValue, onRepeat, onRandom } = state.volume;
  return {
    volumeValue,
    onRepeat,
    onRandom,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onVolumeSliderDrag: bindActionCreators(actions.updateVolume, dispatch),
    onRepeatToggle: bindActionCreators(actions.toggleOnRepeat, dispatch),
    onRandomToggle: bindActionCreators(actions.toggleOnRandom, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
