import React from "react";

function ShareLocationPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white p-5">
      <h2 className="text-3xl font-bold text-primary mb-4">Share Location</h2>
      <img
        src="/location-image.png"
        alt="Share Location"
        className="w-64 h-64 object-cover mb-6"
      />
      <p className="text-lg text-gray-700 text-center mb-6">
        Share your live location with trusted contacts in real-time to ensure
        your safety.
      </p>
      <button className="bg-secondary px-6 py-2 rounded-full text-white font-semibold">
        Share Now
      </button>
    </div>
  );
}

export default ShareLocationPage;
