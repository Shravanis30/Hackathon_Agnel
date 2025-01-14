import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Device } from '@capacitor/device';
import { Motion } from '@capacitor/motion';
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
const storage = getStorage(app);

const HiddenCameraWithTriggers = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [videoBlob, setVideoBlob] = useState(null);
  const [shakeCount, setShakeCount] = useState(0);
  const recordingTimerRef = useRef(null);

  // Function to request camera permissions
  const requestCameraPermission = async () => {
    const result = await Camera.requestPermissions();
    if (result.camera !== 'granted') {
      alert('Camera permission is required to record video');
    }
  };

  // Function to start recording
  const startRecording = async () => {
    try {
      setIsRecording(true);
      alert("Recording started for 2 minutes...");

      // Record video
      const video = await recordVideo();
      setVideoBlob(video);

      // Set timer to stop recording after 2 minutes
      recordingTimerRef.current = setTimeout(() => {
        stopRecording();
      }, 120000); // 2 minutes in milliseconds
    } catch (error) {
      console.error("Error during recording:", error);
      alert("Failed to record video.");
    }
  };

  // Function to stop recording
  const stopRecording = async () => {
    try {
      clearTimeout(recordingTimerRef.current);
      setIsRecording(false);
      alert("Recording stopped.");

      // Save video to Firebase Storage
      if (videoBlob) {
        const videoUrl = await saveToFirebase(videoBlob);

        // Add to local recordings state
        setRecordings((prev) => [
          ...prev,
          { url: videoUrl, timestamp: new Date() },
        ]);

        // Notify emergency contacts
        await notifyEmergencyContacts(videoUrl);

        alert("Recording saved and sent to emergency contacts.");
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      alert("Failed to stop recording.");
    }
  };

  // Record video using Camera
  const recordVideo = async () => {
    try {
      const video = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 90,
      });

      if (!video || !video.webPath) {
        throw new Error('Failed to retrieve video.');
      }

      const response = await fetch(video.webPath);
      const videoBlob = await response.blob();
      return videoBlob;
    } catch (error) {
      console.error("Error during video recording:", error);
      alert("Failed to record video.");
    }
  };

  // Save video to Firebase Storage
  const saveToFirebase = async (videoBlob) => {
    const storageRef = ref(storage, `videos/recording_${Date.now()}.mp4`);
    await uploadBytes(storageRef, videoBlob);
    return getDownloadURL(storageRef);
  };

  // Notify emergency contacts with video URL
  const notifyEmergencyContacts = async (videoUrl) => {
    const contacts = await getEmergencyContacts();
    console.log("Emergency Contacts:", contacts);

    // Implement actual notification logic (e.g., email or SMS) here.
    contacts.forEach((contact) => {
      console.log(`Notifying ${contact.name} at ${contact.email} with video: ${videoUrl}`);
    });
  };

  // Fetch emergency contacts from Firestore
  const getEmergencyContacts = async () => {
    const contacts = [];
    const querySnapshot = await getDocs(collection(db, "emergencyContacts"));
    querySnapshot.forEach((doc) => {
      contacts.push(doc.data());
    });
    return contacts;
  };

  // Handle Shake detection
  useEffect(() => {
    let shakeSubscription;
    const shakeHandler = async () => {
      shakeSubscription = await Motion.addListener('shake', () => {
        setShakeCount((prev) => prev + 1);
        if (shakeCount >= 3) {
          startRecording(); // Start recording on shake detection
        }
      });
    };

    // Execute the shake handler
    shakeHandler();

    // Cleanup by removing the listener when the component unmounts
    return () => {
      if (shakeSubscription) {
        shakeSubscription.remove();
      }
    };
  }, [shakeCount]);

  // Power button detection (for Android/iOS)
  useEffect(() => {
    let powerButtonPressCount = 0;
    const interval = setInterval(async () => {
      const deviceInfo = await Device.getInfo();
      if (deviceInfo.platform === "android" || deviceInfo.platform === "ios") {
        // Custom method for detecting power button press is needed
        if (powerButtonPressCount === 3) {
          startRecording(); // Start recording on power button press 3 times
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto sm:max-w-xs sm:p-2">
      <h2 className="text-xl font-semibold mb-4 text-center">Hidden Camera</h2>
      <div className="flex flex-col gap-4">
        {/* Start/Stop Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded-lg w-full font-semibold text-white ${isRecording
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
            }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        {/* Record Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recordings</h3>
          {recordings.length > 0 ? (
            <ul className="list-disc ml-6">
              {recordings.map((recording, index) => (
                <li key={index}>
                  <a
                    href={recording.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Recording {index + 1} - {recording.timestamp.toLocaleString()}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recordings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component to catch errors in the tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <HiddenCameraWithTriggers />
  </ErrorBoundary>
);

export default App;
