import React from "react";

function HiddenCamera() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
      <img
        src="https://source.unsplash.com/400x400/?camera,hidden"
        alt="Hidden Camera"
        className="w-60 h-60 mb-4 rounded-lg shadow-lg"
      />
      <h2 className="text-3xl font-bold mb-2">Hidden Camera</h2>
      <p className="text-lg">
        Record videos discreetly using the hidden camera feature for gathering
        evidence when needed.
      </p>
    </div>
  );
}

export default HiddenCamera;
