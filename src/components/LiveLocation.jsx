import React from "react";

function LiveLocation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
      <img
        src="https://source.unsplash.com/400x400/?location,tracking"
        alt="Live Location"
        className="w-60 h-60 mb-4 rounded-lg shadow-lg"
      />
      <h2 className="text-3xl font-bold mb-2">Live Location Sharing & Tracking</h2>
      <p className="text-lg">
        Share your real-time location with trusted contacts and enable seamless
        tracking for added safety.
      </p>
    </div>
  );
}

export default LiveLocation;
