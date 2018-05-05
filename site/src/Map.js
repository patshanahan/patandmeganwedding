import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import FiveImg from './five.jpg';

export default class Map extends Component {    
    constructor(props) {
      super(props);
  
      this.state = {
        event: {lat: 44.949346, lng: -93.290393},
        title: 'FIVE Event Center',
        infoWindow: '<div class="App-mapInfo"><h3><a href="' + this.props.eventUrl + '" target="_blank">FIVE Event Center <span class="icon-new-tab" /></a></h3><p>2917 Bryant Avenue South<br />Minneapolis, MN 55408-2155</p><a href="' + this.props.eventUrl + '" target="_blank"><img src="' + FiveImg + '" alt="FIVE Event Center" /></a></div>'
      }
    }

    componentDidUpdate(prevProps, prevState) {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: this.state.event,
                zoom: 15,
                mapTypeId: 'roadmap'
            });

            this.map = new maps.Map(node, mapConfig);

            const markerConfig = Object.assign({}, {
                position: this.state.event,
                map: this.map,
                title: this.state.title
            });

            const infoConfig = Object.assign({}, {
                content: this.state.infoWindow
            });

            this.marker = new google.maps.Marker(markerConfig);

            this.infoWindow = new google.maps.InfoWindow(infoConfig);

            this.marker.addListener('click', () => {
                this.infoWindow.open(this.map, this.marker);
            });
        }
    }

    render() {
        const mapStyle = {
            width: '100%',
            height: '100%'
        }
        return (
            <div className="App-map">
                <div ref="map" style={mapStyle}>
                    Loading  map...
                </div>
            </div>
        )
    }
};