import React, { Component } from 'react';
import './MenuItem.css';

class MenuItem extends Component {
  render() {
    return (
      <div className="App-MenuItem style-calloutBox">
        <h3>{this.props.entreeName}</h3>
        <p>{this.props.description}</p>
        <p>Served with: {this.props.sides}</p>
      </div>
    );
  }
}

export default MenuItem;