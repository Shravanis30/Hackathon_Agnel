import { useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SidebarWithNavbar from "./SidebarWithNavbar";

const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 20.5937, // Default to India's center
    longitude: 78.9629,
  });
  const [locationReady, setLocationReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const navigate = useNavigate();
  let mediaRecorder;
  let videoChunks = [];
  let recordingInterval;
  let locationInterval;
  let mediaStream;

  const handleLocationSharingClick = () => {
    navigate("/locationSharing");
  };

  const handleHelplineButtonClick = () => {
    navigate("/helpline");
  };

  const sendLocationToDiscord = async () => {
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
        console.log("Location shared successfully!");
      } else {
        throw new Error("Failed to share location");
      }
    } catch (error) {
      console.error("Error sharing location:", error);
    }
  };

  const startRecording = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(videoChunks, { type: "video/webm" });
        setVideoBlob(blob);
        videoChunks = [];
        const videoUrl = URL.createObjectURL(blob);
        // Send the video to Discord
        const formData = new FormData();
        formData.append("file", blob, "video.webm");

        const DISCORD_WEBHOOK_URL =
      "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";
const response = await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Video sent to Discord successfully!");
        } else {
          console.log("Failed to send video to Discord.");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Record for 10 seconds and send the video to Discord
      recordingInterval = setInterval(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          mediaRecorder.start();
        }
      }, 10000); // Stop and start recording every 10 seconds

      // Share location every 10 seconds while recording
      locationInterval = setInterval(() => {
        sendLocationToDiscord();
      }, 10000); // Share location every 10 seconds
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      clearInterval(recordingInterval); // Stop the recording interval
      clearInterval(locationInterval); // Stop location sharing interval
      mediaRecorder.stop();
      setIsRecording(false); // Set the button back to SOS
      mediaStream.getTracks().forEach(track => track.stop()); // Stop the camera stream
    }
  };

  const handleSOSButtonClick = async () => {
    if (isRecording) {
      // Stop recording and stop location sharing
      stopRecording();
    } else {
      // Start recording and start sharing location
      startRecording();
      await sendLocationToDiscord(); // Send initial location
    }
  };

  // Get user's current location using geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationReady(true);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation(); // Get the user's current location when the component mounts
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-200">
      <SidebarWithNavbar />

      <div className="mt-16 px-4 md:px-8 flex-grow">
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

        <div className="w-full flex justify-between items-center p-4 bg-transparent fixed bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50">
          <div className="flex flex-col items-center">
            <div
              className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
              onClick={handleLocationSharingClick}
            >
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <span className="text-xs text-gray-600 mt-2">Share Location</span>
          </div>

          <div className="flex justify-center items-center">
            <button
              className={`bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 ${isRecording ? "bg-red-800" : ""}`}
              aria-label="SOS Button"
              onClick={handleSOSButtonClick}
            >
              {isRecording ? "Stop Recording" : "SOS"}
            </button>
          </div>

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

















































// perfectly working of sending message to discord i.e sharing location and sharing live video



// import { useState, useEffect } from "react";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { MapPin, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import SidebarWithNavbar from "./SidebarWithNavbar";

// const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYXMxOTM2IiwiYSI6ImNtNXk1b3p6aTBmN3oycW45anIxeGIyeGYifQ.g8zrtImUGHjJyyp0vn1fmA"; // Replace with your Mapbox token

// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState({
//     latitude: 20.5937, // Default to India's center
//     longitude: 78.9629,
//   });
//   const [locationReady, setLocationReady] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const navigate = useNavigate();
//   let mediaRecorder;
//   let videoChunks = [];
//   let recordingInterval;
//   let locationInterval;

//   const handleLocationSharingClick = () => {
//     navigate("/locationSharing");
//   };

//   const handleHelplineButtonClick = () => {
//     navigate("/helpline");
//   };

//   const sendLocationToDiscord = async () => {
//     const mapsLink = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
//     const message = {
//       content: `📍 **Live Location Update!**\nLatitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}\nView on Maps: [Click Here](${mapsLink})`,
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
//         console.log("Location shared successfully!");
//       } else {
//         throw new Error("Failed to share location");
//       }
//     } catch (error) {
//       console.error("Error sharing location:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       mediaRecorder = new MediaRecorder(stream);
//       mediaRecorder.ondataavailable = (event) => {
//         videoChunks.push(event.data);
//       };
//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(videoChunks, { type: "video/webm" });
//         setVideoBlob(blob);
//         videoChunks = [];

//         // Create a temporary file URL for the video
//         const videoUrl = URL.createObjectURL(blob);

//         // Send the video to Discord
//         const formData = new FormData();
//         formData.append("file", blob, "video.webm");

//         const DISCORD_WEBHOOK_URL =
//           "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

//         const response = await fetch(DISCORD_WEBHOOK_URL, {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           console.log("Video sent to Discord successfully!");
//         } else {
//           console.log("Failed to send video to Discord.");
//         }
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       // Record for 10 seconds and send the video to Discord
//       recordingInterval = setInterval(() => {
//         if (mediaRecorder.state === "recording") {
//           mediaRecorder.stop();
//           mediaRecorder.start();
//         }
//       }, 10000); // Stop and start recording every 10 seconds

//       // Share location every 10 seconds while recording
//       locationInterval = setInterval(() => {
//         sendLocationToDiscord();
//       }, 10000); // Share location every 10 seconds
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   // const stopRecording = () => {
//   //   if (mediaRecorder && mediaRecorder.state === "recording") {
//   //     clearInterval(recordingInterval); // Stop the recording interval
//   //     clearInterval(locationInterval); // Stop location sharing interval
//   //     mediaRecorder.stop();
//   //     setIsRecording(false);
//   //   }
//   // };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       clearInterval(recordingInterval); // Stop the recording interval
//       clearInterval(locationInterval); // Stop location sharing interval
//       mediaRecorder.stop();
//       setIsRecording(false); // Set the button back to SOS
//     }
//   };

//   // const handleSOSButtonClick = async () => {
//   //   if (isRecording) {
//   //     // Stop recording and stop location sharing
//   //     stopRecording();
//   //   } else {
//   //     // Start recording and start sharing location
//   //     startRecording();
//   //     await sendLocationToDiscord(); // Send initial location
//   //   }
//   // };

//   const handleSOSButtonClick = async () => {
//     if (isRecording) {
//       // Stop recording and stop location sharing
//       stopRecording();
//     } else {
//       // Start recording and start sharing location
//       startRecording();
//       await sendLocationToDiscord(); // Send initial location
//     }
//   };

//   // Get user's current location using geolocation
//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLocationReady(true);
//         },
//         (error) => {
//           console.error("Error getting location: ", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation(); // Get the user's current location when the component mounts
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-200">
//       <SidebarWithNavbar />

//       <div className="mt-16 px-4 md:px-8 flex-grow">
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
//                 >
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </Marker>
//                 <Popup
//                   latitude={currentLocation.latitude}
//                   longitude={currentLocation.longitude}
//                   closeOnClick={false}
//                   closeButton={true}
//                   anchor="top"
//                 >
//                   <div>Your current location</div>
//                 </Popup>
//               </>
//             )}
//           </Map>
//         </div>

//         <div className="w-full flex justify-between items-center p-4 bg-transparent fixed bottom-0 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50">
//           <div className="flex flex-col items-center">
//             <div
//               className="flex justify-center items-center bg-white shadow-md rounded-full w-14 h-14 cursor-pointer"
//               onClick={handleLocationSharingClick}
//             >
//               <MapPin className="w-6 h-6 text-gray-700" />
//             </div>
//             <span className="text-xs text-gray-600 mt-2">Share Location</span>
//           </div>

//           <div className="flex justify-center items-center">
//             <button
//               className={`bg-red-600 text-white font-bold text-sm px-6 py-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 ${isRecording ? "bg-red-800" : ""}`}
//               aria-label="SOS Button"
//               onClick={handleSOSButtonClick}
//             >
//               {isRecording ? "Stop Recording" : "SOS"}
//             </button>
//           </div>

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














