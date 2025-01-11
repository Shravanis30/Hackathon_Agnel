import React from "react";

function SpyCameraPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white p-5">
      <h2 className="text-3xl font-bold text-primary mb-4">Spy Camera</h2>
      <img
        src="/spy-camera-image.png"
        alt="Spy Camera"
        className="w-64 h-64 object-cover mb-6"
      />
      <p className="text-lg text-gray-700 text-center mb-6">
        Use the spy camera feature to discreetly capture videos and ensure your
        safety.
      </p>
      <button className="bg-secondary px-6 py-2 rounded-full text-white font-semibold">
        Start Recording
      </button>
    </div>
  );
}

export default SpyCameraPage;
