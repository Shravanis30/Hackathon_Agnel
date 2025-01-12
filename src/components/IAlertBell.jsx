// src/components/AlertBell.jsx
import React from 'react';

const AlertBell = () => {
  const handleAlert = () => {
    const audio = new Audio('/assets/alarm-sound.mp3');
    audio.play();
    alert("Alert Bell Activated! Loud sound is playing.");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Alert Bell</h2>
      <button
        onClick={handleAlert}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg w-full"
      >
        Activate Alert Bell
      </button>
    </div>
  );
};

export default AlertBell;
