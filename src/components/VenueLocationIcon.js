
import L from 'leaflet';
import icon from '../assets/vial.jpg';
import iconShadow from '../assets/vial.jpg';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const VenueLocationIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconShadow,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});