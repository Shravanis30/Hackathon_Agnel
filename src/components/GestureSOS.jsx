// import React, { useState, useEffect } from 'react';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';
// import { Motion } from '@capacitor/motion';
// import { getDatabase, ref, push } from 'firebase/database';
// import { database } from '../firebase'; 

// const IGestureSOS = () => {
//   const [shakeCount, setShakeCount] = useState(0);
//   const [emergencyContacts, setEmergencyContacts] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [isSOSActive, setIsSOSActive] = useState(false);

//   // Fetch emergency contacts from local storage
//   const getEmergencyContacts = () => {
//     const contacts = localStorage.getItem('emergencyContacts');
//     if (contacts) {
//       setEmergencyContacts(JSON.parse(contacts));
//     }
//   };

//   // Get current location of the user
//   const getCurrentLocation = async () => {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       setLocation(position.coords);
//     } catch (err) {
//       console.error('Error getting location:', err);
//     }
//   };

//   // Send live location updates to Firebase
//   const sendLiveLocationAlert = async (videoUri = null) => {
//     if (!location) {
//       await getCurrentLocation();
//     }
//     const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}.`;

//     // Save alert to Firebase
//     const alertsRef = ref(database, 'alerts');
//     const alertData = {
//       message,
//       videoUri,
//       contacts: emergencyContacts,
//       timestamp: new Date().toISOString(),
//     };
//     try {
//       await push(alertsRef, alertData);
//       console.log('Alert sent to Firebase:', alertData);
//     } catch (err) {
//       console.error('Error saving alert to Firebase:', err);
//     }
//   };

//   // SOS Button click handler
//   const handleSOSButtonClick = async () => {
//     console.log('SOS Button Pressed!');
//     setIsSOSActive(true);
//     await getCurrentLocation();
//     if (location) {
//       await activateHiddenCamera();
//     }
//   };

//   // Shake detection and trigger SOS
//   useEffect(() => {
//     let shakeSubscription;
//     const shakeHandler = async () => {
//       shakeSubscription = await Motion.addListener('shake', () => {
//         setShakeCount((prev) => prev + 1);
//         if (shakeCount >= 4 && !isSOSActive) {
//           handleSOSButtonClick();
//         }
//       });
//     };
//     shakeHandler();

//     return () => {
//       if (shakeSubscription) {
//         shakeSubscription.remove();
//       }
//     };
//   }, [shakeCount, isSOSActive]);

//   // Activate hidden camera and record video for 1 minute
//   const activateHiddenCamera = async () => {
//     try {
//       const video = await Camera.getPhoto({
//         quality: 100,
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera,
//         duration: 60, // Simulate 1-minute video capture
//       });
//       console.log('Video captured:', video.path);
//       await sendLiveLocationAlert(video.path);
//     } catch (err) {
//       console.error('Error capturing video:', err);
//     }
//   };

//   // Fetch emergency contacts on component mount
//   useEffect(() => {
//     getEmergencyContacts();
//   }, []);

//   return (
//     <div className="p-6 bg-gradient-to-b from-red-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
//       <h2 className="text-3xl font-bold mb-6 text-white text-center">Emergency Alert System</h2>
//       <button
//         onClick={handleSOSButtonClick}
//         className="px-8 py-4 rounded-full bg-white text-red-500 font-semibold shadow-lg hover:bg-gray-100 transition-all w-full max-w-xs mb-6"
//       >
//         SOS
//       </button>
//       <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
//         <h3 className="font-medium mb-2 text-lg">Emergency Contacts:</h3>
//         <ul>
//           {emergencyContacts.length > 0 ? (
//             emergencyContacts.map((contact, index) => (
//               <li key={index} className="mb-2 text-gray-700">
//                 {contact}
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">No contacts added yet.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default IGestureSOS;



// import React, { useState, useEffect } from "react";
// import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
// import { Geolocation } from "@capacitor/geolocation";
// import { Motion } from "@capacitor/motion";
// import { database } from "../firebase"; // Import Firebase database
// import { ref, push } from "firebase/database";

// const IGestureSOS = () => {
//   const [shakeCount, setShakeCount] = useState(0);
//   const [emergencyContacts, setEmergencyContacts] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [isSOSActive, setIsSOSActive] = useState(false);

//   const getEmergencyContacts = () => {
//     const contacts = localStorage.getItem("emergencyContacts");
//     if (contacts) {
//       setEmergencyContacts(JSON.parse(contacts));
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       setLocation(position.coords);
//     } catch (err) {
//       console.error("Error getting location:", err);
//     }
//   };

//   const sendLiveLocationAlert = async (photoUri = null) => {
//     if (!location) {
//       await getCurrentLocation();
//     }
//     const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}.`;

//     const alertsRef = ref(database, "alerts");
//     const alertData = {
//       message,
//       photoUri,
//       contacts: emergencyContacts,
//       timestamp: new Date().toISOString(),
//     };
//     try {
//       await push(alertsRef, alertData);
//       console.log("Alert sent to Firebase:", alertData);
//     } catch (err) {
//       console.error("Error saving alert to Firebase:", err);
//     }
//   };

//   const handleSOSButtonClick = async () => {
//     setIsSOSActive(true);
//     await getCurrentLocation();
//     if (location) {
//       await activateHiddenCamera();
//     }
//   };

//   useEffect(() => {
//     let lastX = 0,
//       lastY = 0,
//       lastZ = 0,
//       shakeCount = 0;
//     const threshold = 15;
//     const shakeHandler = async () => {
//       const listener = await Motion.addListener("accel", (event) => {
//         const { x, y, z } = event.acceleration || {};
//         const deltaX = Math.abs(x - lastX);
//         const deltaY = Math.abs(y - lastY);
//         const deltaZ = Math.abs(z - lastZ);

//         if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
//           shakeCount++;
//           setShakeCount(shakeCount);
//           if (shakeCount >= 4 && !isSOSActive) {
//             handleSOSButtonClick();
//           }
//         }

//         lastX = x;
//         lastY = y;
//         lastZ = z;
//       });

//       return () => listener.remove();
//     };

//     shakeHandler();
//   }, [shakeCount, isSOSActive]);

//   const activateHiddenCamera = async () => {
//     try {
//       const photo = await Camera.getPhoto({
//         quality: 100,
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera,
//       });
//       console.log("Photo captured:", photo.path);
//       await sendLiveLocationAlert(photo.path);
//     } catch (err) {
//       console.error("Error capturing photo:", err);
//     }
//   };

//   useEffect(() => {
//     getEmergencyContacts();
//   }, []);

//   return (
//     <div className="p-6 bg-gradient-to-b from-red-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
//       <h2 className="text-3xl font-bold mb-6 text-white text-center">Emergency Alert System</h2>
//       <button
//         onClick={handleSOSButtonClick}
//         className="px-8 py-4 rounded-full bg-white text-red-500 font-semibold shadow-lg hover:bg-gray-100 transition-all w-full max-w-xs mb-6"
//       >
//         SOS
//       </button>
//       <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
//         <h3 className="font-medium mb-2 text-lg">Emergency Contacts:</h3>
//         <ul>
//           {emergencyContacts.length > 0 ? (
//             emergencyContacts.map((contact, index) => (
//               <li key={index} className="mb-2 text-gray-700">
//                 {contact}
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">No contacts added yet.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default IGestureSOS;
import React, { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";

const SMS_BACKEND_URL = "https://your-backend-url.com/send-sms";

const IGestureSOS = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");

  const isValidPhoneNumber = (number) => /^\+?[1-9]\d{1,14}$/.test(number);

  const getEmergencyContacts = () => {
    const contacts = JSON.parse(localStorage.getItem("emergencyContacts") || "[]");
    const validContacts = contacts.filter(isValidPhoneNumber);
    setEmergencyContacts(validContacts);
  };

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation(position.coords);
    } catch (err) {
      console.error("Error getting location:", err);
    }
  };

  const playBuzzer = () => {
    const audio = new Audio("/buzzer.mp3");
    audio.play().catch((error) => {
      console.error("Error playing buzzer:", error);
      alert("Buzzer sound failed to play.");
    });
  };

  const sendLiveLocationSMS = async () => {
    if (!location) {
      await getCurrentLocation();
    }

    const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    const message = `Emergency Alert! My location: ${mapsLink}`;

    for (const contact of emergencyContacts) {
      try {
        const response = await axios.post(SMS_BACKEND_URL, {
          to: contact,
          message,
        });
        console.log(`SMS sent to ${contact}:`, response.data);
      } catch (error) {
        console.error(`Failed to send SMS to ${contact}:`, error.response?.data);
      }
    }
  };

  const handleSOSButtonClick = async () => {
    playBuzzer();
    setStatus("Fetching location...");
    await getCurrentLocation();
    setStatus("Sending SMS...");
    if (location) {
      await sendLiveLocationSMS();
      setStatus("SOS alert sent!");
    } else {
      setStatus("Failed to fetch location.");
    }
  };

  useEffect(() => {
    getEmergencyContacts();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-red-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Emergency Alert System</h2>
      <button
        onClick={handleSOSButtonClick}
        className="px-8 py-4 rounded-full bg-white text-red-500 font-semibold shadow-lg hover:bg-gray-100 transition-all w-full max-w-xs mb-6"
      >
        SOS
      </button>
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h3 className="font-medium mb-2 text-lg">Emergency Contacts:</h3>
        <ul>
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact, index) => (
              <li key={index} className="mb-2 text-gray-700">
                {contact}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No contacts added yet.</li>
          )}
        </ul>
        <p className="text-sm text-gray-500 mt-4">{status}</p>
      </div>
    </div>
  );
};

export default IGestureSOS;







// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, CameraResultType } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';
// import { Device } from '@capacitor/device';
// import { Motion } from '@capacitor/motion';
// import { PushNotifications } from '@capacitor/push-notifications';
// // import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
// // import { db } from '../firebase';  // Assuming firebase is configured here

// const IGestureSOS = () => {
//   const [shakeCount, setShakeCount] = useState(0);
//   const [emergencyContacts, setEmergencyContacts] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [isSOSActive, setIsSOSActive] = useState(false);
//   const [contactName, setContactName] = useState('');
//   const [contactToken, setContactToken] = useState('');
//   const powerButtonPressCount = useRef(0);

//   // Fetch emergency contacts from Firebase Firestore
//   const getEmergencyContacts = async () => {
//     const contacts = [];
//     try {
//       const querySnapshot = await getDocs(collection(db, 'emergencyContacts'));
//       querySnapshot.forEach((doc) => {
//         contacts.push(doc.data());
//       });
//       setEmergencyContacts(contacts);
//     } catch (err) {
//       console.error('Error fetching emergency contacts:', err);
//     }
//   };

//   // Add emergency contact to Firebase Firestore
//   const addEmergencyContact = async () => {
//     if (contactName && contactToken) {
//       try {
//         await addDoc(collection(db, 'emergencyContacts'), {
//           name: contactName,
//           token: contactToken
//         });
//         setContactName('');
//         setContactToken('');
//         getEmergencyContacts();
//       } catch (err) {
//         console.error('Error adding contact:', err);
//       }
//     }
//   };

//   // Get current location of the user
//   const getCurrentLocation = async () => {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       setLocation(position.coords);
//     } catch (err) {
//       console.error('Error getting location:', err);
//     }
//   };

//   // Send live location updates to emergency contacts
//   const sendLiveLocationAlert = async () => {
//     if (!location) {
//       await getCurrentLocation();
//     }
//     const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
//     emergencyContacts.forEach(async (contact) => {
//       await sendPushNotification(contact.token, message);
//     });
//   };

//   // SOS Button click handler
//   const handleSOSButtonClick = async () => {
//     console.log('SOS Button Pressed!');
//     setIsSOSActive(true);
//     await getCurrentLocation();
//     if (location) {
//       await sendLiveLocationAlert();
//     }
//     // Trigger Hidden Camera & Voice Recording
//     activateHiddenCameraAndRecording();
//   };

//   // Shake detection and trigger SOS
//   useEffect(() => {
//     let shakeSubscription;
//     const shakeHandler = async () => {
//       shakeSubscription = await Motion.addListener('shake', () => {
//         setShakeCount((prev) => prev + 1);
//         if (shakeCount >= 3 && !isSOSActive) {
//           handleSOSButtonClick();
//         }
//       });
//     };
//     shakeHandler();

//     return () => {
//       if (shakeSubscription) {
//         shakeSubscription.remove();
//       }
//     };
//   }, [shakeCount, isSOSActive]);

//   // Power button press detection
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const deviceInfo = await Device.getInfo();
//       if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
//         if (powerButtonPressCount.current === 3 && !isSOSActive) {
//           await getCurrentLocation();
//           if (location) {
//             await sendLiveLocationAlert();
//           }
//           activateHiddenCameraAndRecording();
//         }
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [location, isSOSActive]);

//   // Activate hidden camera and voice recording
//   const activateHiddenCameraAndRecording = async () => {
//     const image = await Camera.getPhoto({
//       quality: 100,
//       resultType: CameraResultType.Uri,
//     });
//     const videoUrl = await startVoiceRecording(); // Implement this function
//     sendLiveLocationAlert(image, videoUrl);
//   };

//   // Initialize Push Notifications
//   useEffect(() => {
//     const initializePushNotifications = async () => {
//       await PushNotifications.requestPermission();
//       PushNotifications.addListener('registration', (token) => {
//         console.log('Push registration success, token: ', token.value);
//       });

//       PushNotifications.addListener('registrationError', (error) => {
//         console.error('Error during registration for push notifications: ', error);
//       });

//       PushNotifications.addListener('pushNotificationReceived', (notification) => {
//         console.log('Received push notification: ', notification);
//       });

//       PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
//         console.log('Push notification action performed: ', action);
//       });
//     };

//     initializePushNotifications();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Emergency Alert System</h2>
//       <button onClick={handleSOSButtonClick} className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold w-full mb-4">
//         SOS
//       </button>
//       <div className="mb-4">
//         <h3 className="font-medium mb-2">Add Emergency Contact</h3>
//         <input
//           type="text"
//           value={contactName}
//           onChange={(e) => setContactName(e.target.value)}
//           className="p-2 w-full mb-2 border border-gray-300 rounded-md"
//           placeholder="Contact Name"
//         />
//         <input
//           type="text"
//           value={contactToken}
//           onChange={(e) => setContactToken(e.target.value)}
//           className="p-2 w-full mb-2 border border-gray-300 rounded-md"
//           placeholder="Push Notification Token"
//         />
//         <button
//           onClick={addEmergencyContact}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
//         >
//           Add Contact
//         </button>
//       </div>
//       <div>
//         <h3 className="font-medium mb-2">Emergency Contacts:</h3>
//         <ul>
//           {emergencyContacts.map((contact, index) => (
//             <li key={index} className="mb-2">{contact.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const sendPushNotification = async (token, message) => {
//   // Implement the push notification sending functionality here
//   console.log('Sending push notification to:', token);
//   console.log('Message:', message);
// };

// const startVoiceRecording = async () => {
//   // Implement voice recording functionality here
//   console.log('Starting voice recording...');
//   return 'audio_url';
// };

// export default IGestureSOS;







// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
// import { Geolocation } from "@capacitor/geolocation";
// import { Motion } from "@capacitor/motion";
// import { database } from "../firebase";
// import { ref, push } from "firebase/database";

// const IGestureSOS = () => {
//   const [shakeCount, setShakeCount] = useState(0);
//   const [emergencyContacts, setEmergencyContacts] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [isSOSActive, setIsSOSActive] = useState(false);

//   const getEmergencyContacts = () => {
//     const contacts = localStorage.getItem("emergencyContacts");
//     if (contacts) {
//       setEmergencyContacts(JSON.parse(contacts));
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       setLocation(position.coords);
//     } catch (err) {
//       console.error("Error getting location:", err);
//     }
//   };

//   const sendLiveLocationAlert = async (message, photoUri = null) => {
//     const alertsRef = ref(database, "alerts");
//     const alertData = {
//       message,
//       photoUri,
//       contacts: emergencyContacts,
//       timestamp: new Date().toISOString(),
//     };
//     try {
//       await push(alertsRef, alertData);
//       console.log("Alert sent to Firebase:", alertData);
//     } catch (err) {
//       console.error("Error saving alert to Firebase:", err);
//     }

//     for (const contact of emergencyContacts) {
//       try {
//         const response = await axios.post(
//           "https://<region>-<project-id>.cloudfunctions.net/sendSMS",
//           { to: contact, message },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(`SMS sent to ${contact}:`, response.data);
//       } catch (error) {
//         console.error(`Failed to send SMS to ${contact}:`, error.response?.data);
//       }
//     }
//   };

//   const handleSOSButtonClick = async () => {
//     setIsSOSActive(true);

//     if (!location) {
//       await getCurrentLocation();
//     }

//     if (location) {
//       const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}.`;

//       await activateHiddenCamera();
//       await sendLiveLocationAlert(message);
//     } else {
//       console.error("Location is unavailable. Unable to send SOS alert.");
//     }
//   };

//   useEffect(() => {
//     const threshold = 15;
//     let lastX = 0,
//       lastY = 0,
//       lastZ = 0;

//     const shakeHandler = async () => {
//       const listener = await Motion.addListener("accel", (event) => {
//         const { x, y, z } = event.acceleration || {};
//         const deltaX = Math.abs(x - lastX);
//         const deltaY = Math.abs(y - lastY);
//         const deltaZ = Math.abs(z - lastZ);

//         if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
//           setShakeCount((prev) => prev + 1);
//           if (shakeCount >= 4 && !isSOSActive) {
//             handleSOSButtonClick();
//           }
//         }

//         lastX = x;
//         lastY = y;
//         lastZ = z;
//       });

//       return () => listener.remove();
//     };

//     shakeHandler();
//   }, [shakeCount, isSOSActive]);

//   const activateHiddenCamera = async () => {
//     try {
//       const photo = await Camera.getPhoto({
//         quality: 100,
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera,
//       });
//       console.log("Photo captured:", photo.path);
//     } catch (err) {
//       console.error("Error capturing photo:", err);
//     }
//   };

//   useEffect(() => {
//     getEmergencyContacts();
//   }, []);

//   return (
//     <div className="p-6 bg-gradient-to-b from-red-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
//       <h2 className="text-3xl font-bold mb-6 text-white text-center">Emergency Alert System</h2>
//       <button
//         onClick={handleSOSButtonClick}
//         className="px-8 py-4 rounded-full bg-white text-red-500 font-semibold shadow-lg hover:bg-gray-100 transition-all w-full max-w-xs mb-6"
//       >
//         SOS
//       </button>
//       <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
//         <h3 className="font-medium mb-2 text-lg">Emergency Contacts:</h3>
//         <ul>
//           {emergencyContacts.length > 0 ? (
//             emergencyContacts.map((contact, index) => (
//               <li key={index} className="mb-2 text-gray-700">
//                 {contact}
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">No contacts added yet.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default IGestureSOS;
