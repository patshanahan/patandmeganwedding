import React, { Component } from 'react';
import './Person.css';

class Person extends Component {
  render() {
    return (
      <div className="App-person">
        <h3>{this.props.personName}</h3>
        <img src={this.props.personImage} alt={this.props.personName} />
        <p>{this.props.personBio}</p>
      </div>
    );
  }
}

export default Person;