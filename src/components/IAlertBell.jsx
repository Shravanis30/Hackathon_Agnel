import React, { useState, useRef } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import alarmSound from '../assets/alarm-sound.mp3';

const AlertBell = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference for the audio instance
  const db = getFirestore();
  const functions = getFunctions();

  const handleAlert = async () => {
    // Play alert sound
    if (!isPlaying) {
      try {
        audioRef.current = new Audio(alarmSound);
        await audioRef.current.play();
        setIsPlaying(true);

        // Reset when audio ends
        audioRef.current.onended = () => setIsPlaying(false);
      } catch (error) {
        console.error('Error playing audio:', error);
        alert('Failed to play the alert sound. Check the file format or path.');
        setIsPlaying(false);
      }
    } else {
      // Stop the alert sound if it's already playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }

    // Trigger the Firebase Cloud Function
    try {
      const triggerAlert = httpsCallable(functions, 'triggerAlert');
      await triggerAlert({ userId: 'exampleUserId123' });
      console.log('Alert triggered successfully in the background.');
    } catch (error) {
      console.error('Error triggering alert:', error);
      alert('Failed to trigger alert in the background.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Alert Bell</h2>
      <button
        onClick={handleAlert}
        className={`px-4 py-2 rounded-lg w-full font-semibold text-white ${
          isPlaying ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isPlaying ? 'Stop Alert Bell' : 'Activate Alert Bell'}
      </button>
    </div>
  );
};

export default AlertBell;
