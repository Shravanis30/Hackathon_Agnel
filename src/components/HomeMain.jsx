import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function HomeMain() {
  const center = [23.7808875, 90.279237]; // Dhaka coordinates for the center of the map
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with your icon URL
    iconSize: [40, 40], // Adjust the size of the marker
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40" // Replace with the user profile picture
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-lg font-bold">Faria Islam</h3>
            <p className="text-sm">Triggered panic alert</p>
            <p className="text-xs italic">Tap for more details</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">Safe Code</p>
          <p className="text-3xl font-bold">8149</p>
        </div>
      </header>

      {/* Map Section */}
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center} icon={customIcon}>
            <Popup>Faria's Location</Popup>
          </Marker>
        </MapContainer>
        {/* Track Me Button */}
        <button className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold">
          Track Me
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 py-2 flex justify-between items-center px-6">
        <button className="flex flex-col items-center text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6 mb-1"
            viewBox="0 0 20 20"
          >
            <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM8 14.414L3.586 10 8 5.586 9.414 7 7.828 8.586H16v2H7.828L9.414 13 8 14.414z" />
          </svg>
          <span>Track Me</span>
        </button>
        <button className="flex flex-col items-center text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6 mb-1"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm.866 4.5l-1 6h-2l1-6h2zm-1 8a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 9.866 14.5z" />
          </svg>
          <span>Panic</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6 mb-1"
            viewBox="0 0 20 20"
          >
            <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm2.5 15h-5v-1h5v1zm.25-4h-5.5L6.5 6h7l-1.75 5z" />
          </svg>
          <span>Record</span>
        </button>
      </nav>
    </div>
  );
}

export default HomeMain;