import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { Motion } from '@capacitor/motion';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { PushNotifications } from '@capacitor/push-notifications';
import { sendPushNotification } from './pushNotification'; // we'll implement this shortly

const IGestureSOS = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const powerButtonPressCount = useRef(0);

  // Fetch emergency contacts from Firebase Firestore
  const getEmergencyContacts = async () => {
    const contacts = [];
    const querySnapshot = await getDocs(collection(db, 'emergencyContacts'));
    querySnapshot.forEach((doc) => {
      contacts.push(doc.data());
    });
    setEmergencyContacts(contacts);
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

  // Send push notifications to emergency contacts
  const sendAlert = async () => {
    const message = `Emergency Alert! My current location is Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    emergencyContacts.forEach(async (contact) => {
      await sendPushNotification(contact.token, message);
    });
  };

  // SOS Button click handler
  const handleSOSButtonClick = async () => {
    console.log('SOS Button Pressed!');
    await getCurrentLocation();
    if (location) {
      await sendAlert();
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

  // Power button press detection
  useEffect(() => {
    const interval = setInterval(async () => {
      const deviceInfo = await Device.getInfo();
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
        if (powerButtonPressCount.current === 3) {
          await getCurrentLocation();
          if (location) {
            await sendAlert();
          }
          activateHiddenCameraAndRecording();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [location]);

  // Activate hidden camera and voice recording
  const activateHiddenCameraAndRecording = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
    });
    const videoUrl = await startVoiceRecording(); // Implement this function
    sendAlert(image, videoUrl);
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
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Emergency Alert System</h2>
      <button onClick={handleSOSButtonClick} className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold w-full">
        SOS
      </button>
    </div>
  );
};

export default IGestureSOS;
