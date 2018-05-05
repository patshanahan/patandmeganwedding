import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './Hotel.css';

class Hotel extends Component {
  anchorPublish = (event) => {
    event.preventDefault();

    const target = event.currentTarget.getAttribute('href');
    const targetKey = target.substring(1, target.length);

    PubSub.publish('EVENT_ANCHOR_CLICK', targetKey)
  }

  render() {
    return (
      <div className="App-hotel style-calloutBox">
        <h3>{this.props.hotelName}</h3>
        <p>Rate (per night): <strong>{this.props.rate}</strong></p>
        <p><span dangerouslySetInnerHTML={{__html: this.props.instructions}} /></p>
        <p>Phone: <a href={'tel:' + this.props.phone}>{this.props.phone}</a></p>
        <p>Please make reservations on or before: <strong>{this.props.cutoff}</strong></p>
        <p><a href={this.props.externalUrl} target="_blank">Go to site <span className="icon-new-tab" /></a></p>
        <p><a href={"#" + this.props.anchorRef} onClick={this.anchorPublish}>View on Map</a></p>
      </div>
    );
  }
}

export default Hotel;