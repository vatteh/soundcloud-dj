import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';

export default class Player extends Component {
  render() {
    const { activeTrack } = this.props;

    return (
      <div className={`player ${activeTrack ? 'player-visible' : ''}`}>
        <span>Player</span>
      </div>
    );
  }
}
