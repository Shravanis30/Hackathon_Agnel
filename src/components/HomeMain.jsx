import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Phone } from "lucide-react";
import { Geolocation } from "@capacitor/geolocation";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SidebarWithNavbar from "./SidebarWithNavbar"; // Import SidebarWithNavbar

const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 20.5937, // Default to India's center
    longitude: 78.9629,
  });
  const [locationReady, setLocationReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationReady(true);
      } catch (error) {
        alert("Unable to fetch location.");
        console.error("Geolocation error:", error);
      }
    };

    getLocation();
  }, []);

  const handleSOSButtonClick = () => {
    navigate("/gesturesos");
  };

  const handleHelplineButtonClick = () => {
    navigate("/helpline");
  };

  const handleShareLocationClick = async () => {
    if (!locationReady) {
      alert("Location is not ready. Please allow location access.");
      return;
    }

    const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
    const message = {
      content: `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\nView on Maps: [Click Here](${mapsLink})`,
    };

    const DISCORD_WEBHOOK_URL =
      "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        alert("Location shared successfully!");
      } else {
        throw new Error("Failed to share location");
      }
    } catch (error) {
      console.error("Error sharing location:", error);
      alert("Failed to share location. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-200">
      {/* Sidebar with Navbar */}
      <SidebarWithNavbar />

      {/* Main content */}
      <div className="mt-16 px-4 md:px-8 flex-grow">
        {/* Mapbox Map */}
        <div className="w-full mb-4">
          <Map
            initialViewState={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              zoom: 13,
            }}
            style={{ width: "100%", height: "60vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {locationReady && (
              <>
                <Marker
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                  anchor="bottom"
                >
                  <MapPin className="text-red-500 w-6 h-6" />
                </Marker>
                <Popup
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                  closeOnClick={false}
                  closeButton={true}
                  anchor="top"
                >
                  <div>Your current location</div>
                </Popup>
              </>
            )}
          </Map>
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
              onClick={handleShareLocationClick}
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
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { MapPin, Phone } from "lucide-react";
// import { Geolocation } from "@capacitor/geolocation";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import SidebarWithNavbar from "./SidebarWithNavbar"; // Import SidebarWithNavbar

// // Fix for default marker icon issue in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
// });

// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState([20.5937, 78.9629]); // Default to India's center
//   const [locationReady, setLocationReady] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         const position = await Geolocation.getCurrentPosition();
//         setCurrentLocation([position.coords.latitude, position.coords.longitude]);
//         setLocationReady(true);
//       } catch (error) {
//         alert("Unable to fetch location.");
//         console.error("Geolocation error:", error);
//       }
//     };

//     getLocation(); // Call the function to get the current location
//   }, []);

//   const handleSOSButtonClick = () => {
//     navigate("/gesturesos");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const handleShareLocationClick = async () => {
//     if (!locationReady) {
//       alert("Location is not ready. Please allow location access.");
//       return;
//     }

//     const mapsLink = `https://www.google.com/maps?q=${currentLocation[0]},${currentLocation[1]}`;
//     const message = {
//       content: `📍 **Live Location Update!**\nLatitude: ${currentLocation[0]}\nLongitude: ${currentLocation[1]}\nView on Maps: [Click Here](${mapsLink})`,
//     };

//     const DISCORD_WEBHOOK_URL =
//       "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

//     try {
//       const response = await fetch(DISCORD_WEBHOOK_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       if (response.ok) {
//         alert("Location shared successfully!");
//       } else {
//         throw new Error("Failed to share location");
//       }
//     } catch (error) {
//       console.error("Error sharing location:", error);
//       alert("Failed to share location. Please try again.");
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       {/* Sidebar with Navbar */}
//       <SidebarWithNavbar />

//       {/* Main content */}
//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         {/* Leaflet Map View */}
//         <div className="w-full mb-4">
//           <MapContainer
//             center={currentLocation}
//             zoom={13}
//             style={{ width: "100%", height: "60vh" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {locationReady && (
//               <Marker position={currentLocation}>
//                 <Popup>Your current location</Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="w-full flex justify-between items-center p-4 bg-transparent fixed bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50">
//           {/* Share Location */}
//           <div className="flex flex-col items-center">
//             <div
//               onClick={handleShareLocationClick} // Add onClick to navigate
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//             >
//               <MapPin className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Share Location</span>
//           </div>

//           {/* SOS Button */}
//           <div className="flex justify-center items-center">
//             <button
//               className="bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
//               aria-label="SOS Button"
//               onClick={handleSOSButtonClick}
//             >
//               SOS
//             </button>
//           </div>

//           {/* Helpline */}
//           <div className="flex flex-col items-center">
//             <div
//               onClick={handleHelplineButtonClick}
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//             >
//               <Phone className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Helpline</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { MapPin, Phone } from "lucide-react";
// import { Geolocation } from "@capacitor/geolocation";
// import { useNavigate } from "react-router-dom";
// import SidebarWithNavbar from "./SidebarWithNavbar";

// const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token

// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 19.0755, // Default to India's center
//     longitude: 72.9913,
//   });
//   const [locationReady, setLocationReady] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         const position = await Geolocation.getCurrentPosition();
//         setCurrentLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//         setLocationReady(true);
//       } catch (error) {
//         alert("Unable to fetch location.");
//         console.error("Geolocation error:", error);
//       }
//     };

//     getLocation();
//   }, []);

//   const handleSOSButtonClick = () => {
//     navigate("/gesturesos");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const handleShareLocationClick = () => {
//     navigate("/locationSharing");
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       {/* Sidebar with Navbar */}
//       <SidebarWithNavbar />

//       {/* Main content */}
//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         {/* Mapbox Map */}
//         <div className="w-full mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "60vh" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             {locationReady && (
//               <>
//                 <Marker
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   anchor="bottom"
//                   onClick={() => setPopupVisible(true)}
//                 >
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </Marker>
//                 {popupVisible && (
//                   <Popup
//                     latitude={currentLocation.latitude}
//                     longitude={currentLocation.longitude}
//                     onClose={() => setPopupVisible(false)}
//                     closeOnClick={false}
//                   >
//                     <div>Your current location</div>
//                   </Popup>
//                 )}
//               </>
//             )}
//           </Map>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="w-full flex justify-between items-center p-4 bg-transparent fixed bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50">
//           {/* Share Location */}
//           <div className="flex flex-col items-center">
//             <div
//               onClick={handleShareLocationClick}
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//             >
//               <MapPin className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Share Location</span>
//           </div>

//           {/* SOS Button */}
//           <div className="flex justify-center items-center">
//             <button
//               className="bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
//               aria-label="SOS Button"
//               onClick={handleSOSButtonClick}
//             >
//               SOS
//             </button>
//           </div>

//           {/* Helpline */}
//           <div className="flex flex-col items-center">
//             <div
//               onClick={handleHelplineButtonClick}
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//             >
//               <Phone className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Helpline</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { MapPin, Phone } from "lucide-react";
// import { Geolocation } from "@capacitor/geolocation";
// import SidebarWithNavbar from "./SidebarWithNavbar";

// // Mapbox Token
// const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA";

// // Discord Webhook URL
// const DISCORD_WEBHOOK_URL =
//   "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 19.0755, // Default to Mumbai
//     longitude: 72.9913,
//   });
//   const [popupVisible, setPopupVisible] = useState(false);

//   // Function to fetch and send live location to Discord
//   const trackAndSendLocation = async () => {
//     try {
//       // Fetch current location
//       const position = await Geolocation.getCurrentPosition();
//       const location = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };
//       setCurrentLocation(location);

//       // Send location to Discord Webhook
//       const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
//       const message = {
//         content: `📍 **Real-Time Location Update!**\nLatitude: ${location.latitude}\nLongitude: ${location.longitude}\nView on Maps: [Click Here](${mapsLink})`,
//       };

//       await fetch(DISCORD_WEBHOOK_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       console.log("Location sent to Discord:", location);
//     } catch (error) {
//       console.error("Error tracking or sending location:", error);
//     }
//   };

//   // Start tracking location automatically
//   useEffect(() => {
//     const interval = setInterval(() => {
//       trackAndSendLocation(); // Fetch and send location periodically
//     }, 5000); // Send location every 5 seconds

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       {/* Sidebar with Navbar */}
//       <SidebarWithNavbar />

//       {/* Main content */}
//       <div className="mt-16 px-4 md:px-8 flex-grow">
//         {/* Mapbox Map */}
//         <div className="w-full mb-4">
//           <Map
//             initialViewState={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//               zoom: 13,
//             }}
//             style={{ width: "100%", height: "60vh" }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             mapboxAccessToken={MAPBOX_TOKEN}
//           >
//             <>
//               <Marker
//                 latitude={currentLocation.latitude}
//                 longitude={currentLocation.longitude}
//                 anchor="bottom"
//                 onClick={() => setPopupVisible(true)}
//               >
//                 <MapPin className="text-red-500 w-6 h-6" />
//               </Marker>
//               {popupVisible && (
//                 <Popup
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   onClose={() => setPopupVisible(false)}
//                   closeOnClick={false}
//                 >
//                   <div>Your current location</div>
//                 </Popup>
//               )}
//             </>
//           </Map>
//         </div>
//       </div>
//     </div>
//   );
// }
