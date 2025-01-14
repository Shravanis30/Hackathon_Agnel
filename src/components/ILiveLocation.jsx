// // src/components/LiveLocation.jsx
// import React, { useEffect, useState } from 'react';

// const LiveLocation = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     // Simulate live location sharing
//     navigator.geolocation.watchPosition((position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     });
//   }, []);

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Live Location Sharing</h2>
//       {location ? (
//         <div>
//           <p>Latitude: {location.lat}</p>
//           <p>Longitude: {location.lng}</p>
//         </div>
//       ) : (
//         <p>Fetching location...</p>
//       )}
//     </div>
//   );
// };

// export default LiveLocation;


import React, { useState } from "react";
import { getCurrentLocation, sendLocationToAPI } from "../controllers/locationController";
import { requestLocationPermission } from "../firebase/permissionsUtils";

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");

  const handleFetchLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setStatus("Location permission denied.");
        return;
      }

      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      const response = await sendLocationToAPI(currentLocation);
      setStatus(response);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <h2>User Location</h2>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      <button onClick={handleFetchLocation}>Fetch Location</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default LocationComponent;
