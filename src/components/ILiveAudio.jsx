// src/components/LiveAudio.jsx
import React, { useState } from 'react';

const LiveAudio = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleAudio = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert("Audio recording started...");
    } else {
      alert("Audio recording stopped.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Audio Recording</h2>
      <button
        onClick={handleToggleAudio}
        className={`px-4 py-2 text-white rounded-lg w-full ${isRecording ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default LiveAudio;
