import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Phone } from "lucide-react";
import { Geolocation } from "@capacitor/geolocation"; // Importing Capacitor Geolocation
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState([20.5937, 78.9629]); // Default to India's center
  const [locationReady, setLocationReady] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Get location using Capacitor Geolocation API
    const getLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        setLocationReady(true);
      } catch (error) {
        alert("Unable to fetch location.");
        console.error("Geolocation error:", error);
      }
    };

    getLocation(); // Call the function to get the current location
  }, []);

  // Navigate to GestureSOS page when SOS button is clicked
  const handleSOSButtonClick = () => {
    navigate("/gesturesos"); // Navigate to the GestureSOS page
  };

  // Navigate to Helpline page when the helpline icon is clicked
  const handleHelplineButtonClick = () => {
    navigate("/helpline"); // Navigate to the Helpline page
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-between items-center">
      {/* Leaflet Map View */}
      <div className="flex-grow w-full">
        <MapContainer
          center={currentLocation}
          zoom={13}
          style={{ width: "100%", height: "60vh" }}
        >
          {/* Add a Tile Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locationReady && (
            <Marker position={currentLocation}>
              <Popup>Your current location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full flex justify-between items-center p-4 bg-transparent">
        {/* Share Location */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14">
            <MapPin className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-600 mt-2">Share Location</span>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center items-center">
          <button
            className="bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
            aria-label="SOS Button"
            onClick={handleSOSButtonClick} // Add onClick to navigate
          >
            SOS
          </button>
        </div>

        {/* Helpline */}
        <div className="flex flex-col items-center">
          <div
            onClick={handleHelplineButtonClick} // Add onClick to navigate to Helpline
            className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
          >
            <Phone className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-600 mt-2">Helpline</span>
        </div>
      </div>
    </div>
  );
}
