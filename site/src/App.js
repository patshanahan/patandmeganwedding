import React, { Component } from 'react';
import Header from './Header.js';
//import Person from './Person.js';
import Countdown from './Countdown.js';
import Event from './Event.js';
import Registry from './Registry.js';
import RSVP from './RSVP.js';
import Accommodations from './Accommodations.js';
import './App.css';
import './icons.css';
//import megan from './megan.jpg';
//import pat from './pat.jpg';
//import separator from './separator2.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onAnchorClick = (node) => {
    this.onMarkerClick(node.props, node.marker);

    window.scrollTo(0, document.getElementById('App-map').offsetTop);
  };

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Patrick and Megan Are Getting Married!</h1>
        <Header />
        {/*
        <div className="App-people">
          <Person
            personName = "Megan"
            personImage = {megan}
            personBio = "Megan grew up in Inver Grove Heights, MN where she attended Simley High School.  Megan went on to attend Jamestown College in Jamestown, ND and double majored in Computer Science and Management Information Science.  After a brief stint working at her old high school, Megan took a job at 3M on the 3M.com team where she met Pat and changed her life forever.  Megan has a passion for cats, music and Harry Potter."
          />
          <Person
            personName = "Pat"
            personImage = {pat}
            personBio = "Patrick was born in Minneapolis, but spent most of his school years in Bloomington where he attended Jefferson High School.  Patrick went on to attend the University of St. Thomas where he majored in Applied Mathematics.  Patrick worked at 3M on the 3M.com team for nearly three years before he met the love of his life in new team member Megan.  Patrick loves movies and baseball."
          />
          <img src={separator} className="App-separator2" alt="Separator" />
        </div>
        */}
        <Countdown />
        <Event
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          showingInfoWindow={this.state.showingInfoWindow}
          onMarkerClick={this.onMarkerClick}
          onAnchorClick={this.onAnchorClick}
          onMapClick={this.onMapClick}
        />
        <Registry />
        <RSVP />
        <Accommodations
          onAnchorClick={this.onAnchorClick}
        />
        <p className="style-txtRight style-txtSmall">Designed and Built by Patrick Shanahan, powered by React and AWS.</p>
      </div>
    );
  }
}

export default App;