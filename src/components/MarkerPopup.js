import React from 'react';
import {Popup} from 'react-leaflet';

const MarkerPopup = (props) => {
  const { name } = props.data;
  const { address } = props.data
  const { city } = props.data
  const { url } = props.data

  return  (<Popup>
    <div className='poup-text'>
        <h3>{name}</h3>
        <p>{city}</p>
        <p>{address}</p>
        <a href={url} target='__blank'>Reserve</a>
    </div>
  </Popup>);
};

export default MarkerPopup;