import React, { Component } from 'react';
import RegistryList from './RegistryList.js';
import AmazonLogo from './amazon_logo_RGB.jpg';
import KohlsLogo from './kohls-logo.png';
import TargetLogo from './BullseyeNoR_17_200x200_rgb.jpg';
import './Registry.css';

class Registry extends Component {
  render() {
    return (
      <div className="App-Registry">
        <h2>Gift Registries:</h2>
        <RegistryList registryUrl='default' />
        <RegistryList
            registryUrl='https://www.amazon.com/wedding/share/shanahan-wedding-july-2018'
            registryName='Amazon'
            registryImg={AmazonLogo}
        />
        <RegistryList
            registryUrl='https://www.kohls.com/upgrade/gift_registry/kohlsgrw_home.jsp?section=list&amp;listid=3423357'
            registryName="Kohl's"
            registryImg={KohlsLogo}
        />
        <RegistryList
            registryUrl='http://tgt.gifts/PatrickAndMeganWedding'
            registryName="Target"
            registryImg={TargetLogo}
        />
        <div className="style-backdrop">
          <p>If you prefer, we would also be thrilled to receive gift cards from the following locations:</p>
          <ul>
            <li>Menards</li>
            <li>Home Depot</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Registry;