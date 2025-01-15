
// LocationSharing.jsx
import React, { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Toast } from '@capacitor/toast';

export default function LocationSharing() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("emergencyContacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCurrentLocation(position.coords);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  const sendLocationToContacts = async () => {
    if (!currentLocation) {
      alert("Location not available");
      return;
    }

    contacts.forEach((contact) => {
      console.log(`Sending location to ${contact}:`, currentLocation);
    });

    await Toast.show({
      text: "Location shared with emergency contacts!",
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Live Location Sharing</h1>
      {currentLocation ? (
        <div className="mb-4">
          <p>Latitude: {currentLocation.latitude}</p>
          <p>Longitude: {currentLocation.longitude}</p>
        </div>
      ) : (
        <p>Fetching location...</p>
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
