import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        This is App - header
        {this.props.children}
      </div>
    );
  }
}
