import React, { Component } from 'react';
import Hotel from './Hotel.js';
import './Accommodations.css';

class Accommodations extends Component {
  render() {
    return (
      <div className="App-Accommodations">
        <h2>Accommodations</h2>
        <p>Visiting from out of town?  Or just looking for a weekend getaway in the area?  We have blocked rooms for Friday the 13th and Saturday the 14th (day of wedding) at the following hotels (shuttle service to the ceremony will be arranged for the <strong>Sheraton only</strong>):</p>
        <Hotel
            hotelName="Moxy Minneapolis Uptown"
            rate="$149 (single queen or king)"
            instructions="Call for reservations and reference <strong>&quot;Sirois/Shanahan Wedding Block&quot;</strong> for discount block rate"
            phone="1-612-822-5020"
            cutoff="6/22/18"
            externalUrl="http://moxy-hotels.marriott.com/en/hotels/minneapolis-uptown"
            anchorRef="moxy"
        />
        <Hotel
            hotelName="Sheraton Minneapolis Midtown"
            rate="$99 (single &amp; double), $109 (triple), $119 (quad)"
            instructions="Call for reservations and reference <strong>&quot;Sirois/Shanahan Wedding Block&quot;</strong> for discount block rate"
            phone="1-866-837-4196"
            cutoff="6/22/18"
            externalUrl="http://www.sheratonminneapolismidtown.com/"
            anchorRef="sheraton"
        />
      </div>
    );
  }
}

export default Accommodations;