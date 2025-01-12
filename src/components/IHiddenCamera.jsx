// src/components/HiddenCamera.jsx
import React, { useState } from 'react';

const HiddenCamera = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert("Recording started...");
    } else {
      alert("Recording stopped.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Hidden Camera</h2>
      <button
        onClick={handleToggleRecording}
        className={`px-4 py-2 text-white rounded-lg w-full ${isRecording ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default HiddenCamera;
