import './Map.css'


import React from 'react';
import MapView from './MapView.js';

function Map(props) {
  return (
    <div className="App">
      <MapView vaccLocData={props.vaccLocData} filterCards={props.filterCards}/>
    </div>
  );
}
export default Map;
   