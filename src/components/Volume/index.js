import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Volume from './presenter';

function mapStateToProps(state) {
  const { volumeValue } = state.volume;
  return {
    volumeValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onVolumeSliderDrag: bindActionCreators(actions.updateVolume, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
