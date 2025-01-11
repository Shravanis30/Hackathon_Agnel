import React from "react";

function AlertBell() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
      <img
        src="https://source.unsplash.com/400x400/?bell,alert"
        alt="Alert Bell"
        className="w-60 h-60 mb-4 rounded-lg shadow-lg"
      />
      <h2 className="text-3xl font-bold mb-2">Alert Bell</h2>
      <p className="text-lg">
        Trigger a loud alert sound to draw attention and signal for help in
        distressing situations.
      </p>
    </div>
  );
}

export default AlertBell;
