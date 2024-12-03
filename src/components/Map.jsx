import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../hooks/useCities";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Map.module.css";
import MarkerComp from "./MarkerComp";
import { PropTypes } from "prop-types";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation();
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    setMapPosition((mapPosition) =>
      mapLat && mapLng ? [mapLat, mapLng] : mapPosition
    );
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <MarkerComp city={city} key={city.cityName} />
        ))}
        <ChangeMap position={mapPosition} />
        <DetectClick />
        {geolocationPosition && <MarkerComp geoPos={geolocationPosition} />}
      </MapContainer>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Your Position"}
        </Button>
      )}
    </div>
  );
}

ChangeMap.propTypes = {
  position: PropTypes.array,
};

function ChangeMap({ position }) {
  const map = useMap();
  map.setView(position, 6);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form/?lat=${e.latlng.lat}&&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
