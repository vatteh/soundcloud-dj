import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';

const focusHighlightColor = 'rgb(224, 224, 224)';

export default class AppToolbar extends Component {
  onKeyPress(e) {
    const { onFetchTracks, updateSearchText } = this.props;

    if (e.key === 'Enter') {
      document.querySelector('tbody').scrollIntoView();
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
            {searchText && <span className="searchedFor">{`Searched for: ${searchText}`}</span>}
            <i className="fa fa-search fa-lg searchIcon" aria-hidden="true" />
            <TextField
              id="search-text-field"
              onKeyPress={this.onKeyPress.bind(this)}
              underlineStyle={{ borderColor: 'black' }}
              underlineFocusStyle={{ borderColor: focusHighlightColor }}
            />
          </span>
        }
      />
    );
  }
}
