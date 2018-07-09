import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Event.css';
import FiveImg from './five.jpg';

const events = [
  {
    key: 'five',
    url: 'https://www.fiveeventcenter.com/',
    coords: {lat: 44.949346, lng: -93.290393},
    title: 'FIVE Event Center',
    address: '2917 Bryant Avenue South<br />Minneapolis, MN 55408-2155',
    image: FiveImg
  },
  {
    key: 'moxy',
    url: 'http://moxy-hotels.marriott.com/en/hotels/minneapolis-uptown',
    coords: {lat: 44.948238, lng: -93.29431},
    title: 'Moxy Minneapolis Uptown',
    address: '1121 West Lake Street<br />Minneapolis, MN 55408'
  },
  {
    key: 'sheraton',
    url: 'http://www.sheratonminneapolismidtown.com/',
    coords: {lat: 44.9499696, lng: -93.2645589},
    title: 'Sheraton Minneapolis Midtown',
    address: '2901 Chicago Avenue South<br />Minneapolis, MN, 55407'
  }
];

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: this.props.activeMarker,
      selectedPlace: this.props.selectedPlace,
      showingInfoWindow: this.props.showingInfoWindow
    };

    this.onMarkerClick = this.props.onMarkerClick.bind(this);
    this.eventAnchorClick = this.eventAnchorClick.bind(this);
    this.onMapClick = this.props.onMapClick.bind(this);
  }

  componentWillMount() {
    this.subscriber = PubSub.subscribe('EVENT_ANCHOR_CLICK', (msg, data) => this.eventAnchorClick(msg, data));
  }

  eventAnchorClick = (msg, targetKey) => {
    const node = this.refs[targetKey];

    this.props.onAnchorClick(node);
  };

  anchorPublish = (event) => {
    event.preventDefault();

    const target = event.currentTarget.getAttribute('href');
    const targetKey = target.substring(1, target.length);

    PubSub.publish('EVENT_ANCHOR_CLICK', targetKey)
  }

  render() {    
    return (
      <div className="App-event">
        <h2 className="App-eventTitle">Wedding Details:</h2>
        <div className="App-eventContain">
            <div className="App-eventInfo style-backdrop">
                <span className="style-label">Location:</span>
                <h3 className="style-noGapBottom"><a href="#five" onClick={this.anchorPublish}>FIVE Event Center</a></h3>
                <span className="style-subtitle"><a href={events[0].url} target="_blank">Visit Web Site <span className="icon-new-tab" /></a></span>
                <p>
                  <span className="style-label">Address:</span><br />
                  2917 Bryant Avenue South<br />
                  Minneapolis, MN 55408-2155
                </p>
                <h3>Ceremony: 5pm</h3>
                <h3>Dinner and reception: 7pm</h3>
                <p>Guests may arrive as early as 4pm</p>
            </div>
            <div className="App-map" id="App-map">
              <Map
                google={this.props.google}
                zoom={14}
                initialCenter={events[0].coords}
                onClick={this.onMapClick}
              >
                {events.map((event, i) =>
                  <Marker
                    key={event.key}
                    onClick={this.onMarkerClick}
                    ref={event.key}
                    title={event.title}
                    position={event.coords}
                    placeUrl={event.url}
                    address={event.address}
                    image={event.image}
                  />
                )}
 
                <InfoWindow
                  marker={this.props.activeMarker}
                  visible={this.props.showingInfoWindow}
                  onClose={this.onMapClick}
                >                  
                  <div className="App-mapInfo">
                    <h3>
                      <a href={this.props.selectedPlace.placeUrl} target="_blank">{this.props.selectedPlace.title} <span className="icon-new-tab" /></a>
                    </h3>
                    <p dangerouslySetInnerHTML={{__html: this.props.selectedPlace.address}} />
                    <a href={this.props.selectedPlace.placeUrl} target="_blank"><img src={this.props.selectedPlace.image} alt={this.props.selectedPlace.title} /></a>
                  </div>
                </InfoWindow>
              </Map>
            </div>
        </div>
        <h2 className="App-eventTitle">Additional Information:</h2>
        <div className="style-backdrop">
          <p>For our guests staying at the Sheraton hotel, a shuttle service will be available to transport guests to and from the wedding.  For those who plan on driving, we will have a <strong>free</strong> valet service available due to the limited amount of parking in the area.</p>
          <p>Unfortunately for our guests staying at the Moxy we will not be able to provide shuttle service.</p>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC5JateQ5oDsHgQwod-WthNHfPtx05fgYY',
    libraries: ['visualization']
})(Event)