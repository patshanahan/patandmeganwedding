import React, { Component } from 'react';
import splash from './splash.jpg';
import separator from './separator.png';
import './Header.css';

var splashBG = {
  backgroundImage: 'url(' + splash + ')'
}

class Header extends Component {
  render() {
    return (
      <div className="App-header" style={splashBG}>
        <div className="App-heaaderContent style-backdrop">
          <p className="App-date">
            July 14th, 2018
          </p>
          <p className="App-title">
            Patrick &amp; Megan
          </p>
          <p className="App-subtitle">
            It's finally happening!
          </p>
        </div>
        <div className="App-separator">
          <img src={separator} alt="Decorative separator Element" />
        </div>
      </div>
    );
  }
}

export default Header;