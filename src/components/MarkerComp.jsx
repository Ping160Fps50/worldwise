import L from "leaflet";
import marker from "../../public/marker.svg";
import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

MarkerComp.propTypes = {
  city: PropTypes.shape({
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    cityName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
  }),
  geoPos: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

const customIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [32, 32], // size of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

function MarkerComp({ city, geoPos }) {
  const [lat, setLat] = useState(city ? city.position.lat : "0");
  const [lng, setLng] = useState(city ? city.position.lng : "0");

  useEffect(() => {
    if (geoPos) {
      setLat(geoPos.lat);
      setLng(geoPos.lng);
    }
  }, [geoPos]);

  return (
    <Marker position={[lat, lng]} icon={customIcon}>
      <Popup>
        {geoPos ? "Your Location" : `${city.emoji} ${city.cityName}`}
      </Popup>
    </Marker>
  );
}

export default MarkerComp;
