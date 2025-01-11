import React from "react";

function LiveAudio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
      <img
        src="https://source.unsplash.com/400x400/?audio,safety"
        alt="Live Audio Recording"
        className="w-60 h-60 mb-4 rounded-lg shadow-lg"
      />
      <h2 className="text-3xl font-bold mb-2">Live Audio Recording</h2>
      <p className="text-lg">
        Capture live audio in emergency situations to ensure your safety and
        gather evidence.
      </p>
    </div>
  );
}

export default LiveAudio;
