import React, { Component } from 'react';
import './RegistryList.css';

class RegistryList extends Component {
  render() {
    const isDefault = this.props.registryUrl === 'default' ? true : false;

    const registryContent = <a href={this.props.registryUrl} title={this.props.registryName} target="_blank">
      {this.props.registryImg ? (
        <img src={this.props.registryImg} alt={this.props.registryName} />
      ) : (
        this.props.registryName
      )}
    </a>;

    return (
      <div className="App-RegistryList style-calloutBox">
        {!isDefault ? registryContent : <RegistryDefault />}
      </div>
    );
  }
}

class RegistryDefault extends Component {
  render() {
    return (
      <div>
        <p>Your presence is all we ask, but if you would like to purchase a gift for us we have registries with the following retailers.</p>
        <h4>Thank You</h4>
      </div>
    );
  }
}

export default RegistryList;