import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
  const { venues } = props;

  const markers = venues.map((venue, index) => (
    <Marker id={venue.id} key={index} position={venue.geometry} icon={VenueLocationIcon} eventHandlers={{
        click: (e) => {
          props.filterCards(e.target.options.id)
        },
      }}>

      <MarkerPopup data={venue}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default VenueMarkers;