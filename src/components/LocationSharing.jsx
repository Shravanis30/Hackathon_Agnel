
// // LocationSharing.jsx
// import React, { useState, useEffect } from 'react';
// import { Geolocation } from '@capacitor/geolocation';
// import { Toast } from '@capacitor/toast';

// export default function LocationSharing() {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [contacts, setContacts] = useState(() => {
//     const savedContacts = localStorage.getItem("emergencyContacts");
//     return savedContacts ? JSON.parse(savedContacts) : [];
//   });

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const position = await Geolocation.getCurrentPosition();
//         setCurrentLocation(position.coords);
//       } catch (error) {
//         console.error("Error fetching location:", error);
//       }
//     };

//     fetchLocation();
//   }, []);

//   const sendLocationToContacts = async () => {
//     if (!currentLocation) {
//       alert("Location not available");
//       return;
//     }

//     contacts.forEach((contact) => {
//       console.log(`Sending location to ${contact}:`, currentLocation);
//     });

//     await Toast.show({
//       text: "Location shared with emergency contacts!",
//     });
//   };

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-2xl font-bold mb-4">Live Location Sharing</h1>
//       {currentLocation ? (
//         <div className="mb-4">
//           <p>Latitude: {currentLocation.latitude}</p>
//           <p>Longitude: {currentLocation.longitude}</p>
//         </div>
//       ) : (
//         <p>Fetching location...</p>
//       )}

//       <button
//         onClick={sendLocationToContacts}
//         className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//       >
//         Share Location
//       </button>

//       <div className="mt-4">
//         <h2 className="text-lg font-bold">Emergency Contacts</h2>
//         <ul>
//           {contacts.map((contact, index) => (
//             <li key={index}>{contact}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// LocationSharing.jsx
import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { Geolocation } from "@capacitor/geolocation";
import { Toast } from "@capacitor/toast";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token

export default function LocationSharing() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("emergencyContacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Failed to fetch location. Please ensure location permissions are enabled.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const sendLocationToContacts = async () => {
    if (!currentLocation) {
      alert("Location not available");
      return;
    }

    const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;

    contacts.forEach((contact) => {
      console.log(`Sending location to ${contact}: ${mapsLink}`);
    });

    await Toast.show({
      text: "Location shared with emergency contacts!",
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Live Location Sharing</h1>

      {loading ? (
        <p>Fetching location...</p>
      ) : currentLocation ? (
        <div className="w-full h-64 mb-4">
          <Map
            initialViewState={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              zoom: 13,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Marker
              latitude={currentLocation.latitude}
              longitude={currentLocation.longitude}
              anchor="bottom"
            >
              <Popup closeButton={true} anchor="top">
                <div>Your current location</div>
              </Popup>
            </Marker>
          </Map>
        </div>
      ) : (
        <p>Location unavailable.</p>
      )}

      <button
        onClick={sendLocationToContacts}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Share Location
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Emergency Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>{contact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
