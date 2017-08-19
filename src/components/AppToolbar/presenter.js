import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';

const styles = {
  searchIcon: {
    marginRight: 10,
  },
  underlineStyle: {
    borderColor: 'black',
  },
  underlineFocusStyle: {
    borderColor: 'rgb(224, 224, 224)',
  },
  searchedFor: {
    marginRight: 10,
  },
};

export default class AppToolbar extends Component {
  onKeyPress(e) {
    const { onFetchTracks, updateSearchText } = this.props;

    if (e.key === 'Enter') {
      updateSearchText(e.target.value);
      onFetchTracks(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    const { searchText } = this.props;

    return (
      <AppBar
        title="Soundcloud-DJ"
        showMenuIconButton={false}
        iconElementRight={
          <span>
            {searchText && <span style={styles.searchedFor}>{`Searched for: ${searchText}`}</span>}
            <i className="fa fa-search fa-lg" style={styles.searchIcon} aria-hidden="true" />
            <TextField
              id="search-text-field"
              onKeyPress={this.onKeyPress.bind(this)}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
          </span>
        }
      />
    );
  }
}
