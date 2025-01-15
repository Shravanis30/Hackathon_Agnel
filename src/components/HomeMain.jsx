import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Phone } from "lucide-react";
import { Geolocation } from "@capacitor/geolocation";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SidebarWithNavbar from "./SidebarWithNavbar"; // Import SidebarWithNavbar

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

  const handleSOSButtonClick = () => {
    navigate("/gesturesos");
  };

  const handleHelplineButtonClick = () => {
    navigate("/helpline");
  };

  const handleShareLocationClick = () => {
    navigate("/locationSharing"); // Navigate to the ShareLocation page
  };

  return (
    <div className="relative min-h-screen bg-gray-200">
      {/* Sidebar with Navbar */}
      <SidebarWithNavbar />

      {/* Main content */}
      <div className="mt-16 px-4 md:px-8 flex-grow">
        {/* Leaflet Map View */}
        <div className="w-full mb-4">
          <MapContainer
            center={currentLocation}
            zoom={13}
            style={{ width: "100%", height: "60vh" }}
          >
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
        <div className="w-full flex justify-between items-center p-4 bg-transparent fixed bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50">
          {/* Share Location */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleShareLocationClick} // Add onClick to navigate
              className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
            >
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <span className="text-xs text-gray-600 mt-2">Share Location</span>
          </div>

          {/* SOS Button */}
          <div className="flex justify-center items-center">
            <button
              className="bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
              aria-label="SOS Button"
              onClick={handleSOSButtonClick}
            >
              SOS
            </button>
          </div>

          {/* Helpline */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleHelplineButtonClick}
              className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
            >
              <Phone className="w-6 h-6 text-gray-700" />
            </div>
            <span className="text-xs text-gray-600 mt-2">Helpline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
