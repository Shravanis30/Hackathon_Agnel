// src/components/GestureSOS.jsx
import React, { useState } from 'react';

const GestureSOS = () => {
  const [isSOSActivated, setIsSOSActivated] = useState(false);

  const handleGestureSOS = () => {
    // Simulate SOS activation (e.g., gesture recognition)
    setIsSOSActivated(true);
    alert("SOS Activated! Emergency services notified.");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Gesture-based SOS Activation</h2>
      <button
        onClick={handleGestureSOS}
        className="px-4 py-2 bg-red-500 text-white rounded-lg w-full"
      >
        Activate SOS
      </button>
      {isSOSActivated && (
        <div className="mt-4 text-red-600 font-semibold">
          SOS has been activated! Help is on the way.
        </div>
      )}
    </div>
  );
};

export default GestureSOS;
