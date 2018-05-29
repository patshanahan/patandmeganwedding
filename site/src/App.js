import React, { Component } from 'react';
//import { NativeRouter } from 'react-router-native';
import { Route } from 'react-router-dom';
import Home from './Home.js';
import Results from './Results.js';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/rsvp" component={Results} />
      </div>
    );
  }
}

export default App;