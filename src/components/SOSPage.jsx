import React from "react";
import { useNavigate } from "react-router-dom";

function SOSPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white p-5">
      <h2 className="text-3xl font-bold text-primary mb-4">SOS Feature</h2>
      <img
        src="/sos-image.png"
        alt="SOS"
        className="w-64 h-64 object-cover mb-6"
      />
      <p className="text-lg text-gray-700 text-center mb-6">
        Tap the button below to send an emergency alert to your trusted
        contacts.
      </p>
      <button
        className="bg-secondary px-6 py-2 rounded-full text-white font-semibold"
        onClick={() => navigate("/spy-camera")}
      >
        Next
      </button>
    </div>
  );
}

export default SOSPage;
