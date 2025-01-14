import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { Motion } from '@capacitor/motion';
import { PushNotifications } from '@capacitor/push-notifications';
// import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';  // Assuming firebase is configured here

const IGestureSOS = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactToken, setContactToken] = useState('');
  const powerButtonPressCount = useRef(0);

  // Fetch emergency contacts from Firebase Firestore
  const getEmergencyContacts = async () => {
    const contacts = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'emergencyContacts'));
      querySnapshot.forEach((doc) => {
        contacts.push(doc.data());
      });
      setEmergencyContacts(contacts);
    } catch (err) {
      console.error('Error fetching emergency contacts:', err);
    }
  };

  // Add emergency contact to Firebase Firestore
  const addEmergencyContact = async () => {
    if (contactName && contactToken) {
      try {
        await addDoc(collection(db, 'emergencyContacts'), {
          name: contactName,
          token: contactToken
        });
        setContactName('');
        setContactToken('');
        getEmergencyContacts();
      } catch (err) {
        console.error('Error adding contact:', err);
      }
    }
  };

  // Get current location of the user
  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation(position.coords);
    } catch (err) {
      console.error('Error getting location:', err);
    }
  };

  // Send live location updates to emergency contacts
  const sendLiveLocationAlert = async () => {
    if (!location) {
      await getCurrentLocation();
    }
    const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    emergencyContacts.forEach(async (contact) => {
      await sendPushNotification(contact.token, message);
    });
  };

  // SOS Button click handler
  const handleSOSButtonClick = async () => {
    console.log('SOS Button Pressed!');
    setIsSOSActive(true);
    await getCurrentLocation();
    if (location) {
      await sendLiveLocationAlert();
    }
    // Trigger Hidden Camera & Voice Recording
    activateHiddenCameraAndRecording();
  };

  // Shake detection and trigger SOS
  useEffect(() => {
    let shakeSubscription;
    const shakeHandler = async () => {
      shakeSubscription = await Motion.addListener('shake', () => {
        setShakeCount((prev) => prev + 1);
        if (shakeCount >= 3 && !isSOSActive) {
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
  }, [shakeCount, isSOSActive]);

  // Power button press detection
  useEffect(() => {
    const interval = setInterval(async () => {
      const deviceInfo = await Device.getInfo();
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
        if (powerButtonPressCount.current === 3 && !isSOSActive) {
          await getCurrentLocation();
          if (location) {
            await sendLiveLocationAlert();
          }
          activateHiddenCameraAndRecording();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [location, isSOSActive]);

  // Activate hidden camera and voice recording
  const activateHiddenCameraAndRecording = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
    });
    const videoUrl = await startVoiceRecording(); // Implement this function
    sendLiveLocationAlert(image, videoUrl);
  };

  // Initialize Push Notifications
  useEffect(() => {
    const initializePushNotifications = async () => {
      await PushNotifications.requestPermission();
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ', token.value);
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error during registration for push notifications: ', error);
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Received push notification: ', notification);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        console.log('Push notification action performed: ', action);
      });
    };

    initializePushNotifications();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Emergency Alert System</h2>
      <button onClick={handleSOSButtonClick} className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold w-full mb-4">
        SOS
      </button>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Add Emergency Contact</h3>
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          className="p-2 w-full mb-2 border border-gray-300 rounded-md"
          placeholder="Contact Name"
        />
        <input
          type="text"
          value={contactToken}
          onChange={(e) => setContactToken(e.target.value)}
          className="p-2 w-full mb-2 border border-gray-300 rounded-md"
          placeholder="Push Notification Token"
        />
        <button
          onClick={addEmergencyContact}
          className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
        >
          Add Contact
        </button>
      </div>
      <div>
        <h3 className="font-medium mb-2">Emergency Contacts:</h3>
        <ul>
          {emergencyContacts.map((contact, index) => (
            <li key={index} className="mb-2">{contact.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const sendPushNotification = async (token, message) => {
  // Implement the push notification sending functionality here
  console.log('Sending push notification to:', token);
  console.log('Message:', message);
};

const startVoiceRecording = async () => {
  // Implement voice recording functionality here
  console.log('Starting voice recording...');
  return 'audio_url';
};

export default IGestureSOS;
