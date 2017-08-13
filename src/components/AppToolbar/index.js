import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AppToolbar from './presenter';

function mapStateToProps(state) {
  const { searchText } = state.toolbar;
  return {
    searchText,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchTracks: bindActionCreators(actions.fetchTracks, dispatch),
    updateSearchText: bindActionCreators(actions.updateSearchText, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
