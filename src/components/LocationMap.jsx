import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function LocationMap() {
  const [currentPosition, setCurrentPosition] = useState(center);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationMap;
