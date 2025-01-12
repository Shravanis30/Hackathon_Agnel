// src/components/LiveLocation.jsx
import React, { useEffect, useState } from 'react';

const LiveLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Simulate live location sharing
    navigator.geolocation.watchPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Location Sharing</h2>
      {location ? (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LiveLocation;
