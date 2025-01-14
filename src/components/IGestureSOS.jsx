import React, { useState, useEffect, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { Motion } from '@capacitor/motion';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const IGestureSOS = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const powerButtonPressCount = useRef(0);

  // Function to fetch emergency contacts from Firebase
  const getEmergencyContacts = async () => {
    const contacts = [];
    const querySnapshot = await getDocs(collection(db, 'emergencyContacts'));
    querySnapshot.forEach((doc) => {
      contacts.push(doc.data());
    });
    setEmergencyContacts(contacts);
  };

  // Function to get current location
  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation(position.coords);
    } catch (err) {
      console.error('Error getting location:', err);
    }
  };

  // Function to send SMS using Twilio
  const sendSMSToEmergencyContacts = async (location) => {
    try {
      const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
      const contacts = emergencyContacts.map((contact) => contact.phone);

      // Backend endpoint URL (Cloud Function or any secure server handling Twilio API)
      const backendUrl = 'YOUR_BACKEND_URL/send-sms';

      const response = await axios.post(backendUrl, {
        contacts,
        message,
      });

      if (response.data.success) {
        console.log('SMS sent successfully:', response.data);
      } else {
        console.error('Error sending SMS:', response.data.error);
      }
    } catch (err) {
      console.error('Error sending SMS:', err);
    }
  };

  // Function to handle SOS button click
  const handleSOSButtonClick = async () => {
    console.log('SOS Button Pressed!');
    await getCurrentLocation();
    if (location) {
      await sendSMSToEmergencyContacts(location);
    }
  };

  // Function to detect shake event
  useEffect(() => {
    let shakeSubscription;
    const shakeHandler = async () => {
      shakeSubscription = await Motion.addListener('shake', () => {
        setShakeCount((prev) => prev + 1);
        if (shakeCount >= 3) {
          handleSOSButtonClick();
        }
      });
    };
    shakeHandler();

    return () => {
      if (shakeSubscription) {
        shakeSubscription.remove();
      }
    };
  }, [shakeCount]);

  // Function to detect power button press event
  useEffect(() => {
    const interval = setInterval(async () => {
      const deviceInfo = await Device.getInfo();
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
        // Check for power button press (simplified)
        if (powerButtonPressCount.current === 3) {
          await getCurrentLocation();
          if (location) {
            await sendSMSToEmergencyContacts(location);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto sm:max-w-xs sm:p-2">
      <h2 className="text-xl font-semibold mb-4 text-center">Emergency Alert System</h2>
      <div className="flex flex-col gap-4">
        {/* SOS Button */}
        <button
          onClick={handleSOSButtonClick}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold w-full"
        >
          SOS
        </button>

        {/* Info Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
          {emergencyContacts.length > 0 ? (
            <ul className="list-disc ml-6">
              {emergencyContacts.map((contact, index) => (
                <li key={index}>{contact.name} - {contact.phone}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No emergency contacts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IGestureSOS;
