// import React from "react";
import {useNavigate} from "react-router-dom"

function AlertBell() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage"); // Navigate to the home page (SplashScreen)
  };

  const handleNext = () => {
    navigate("/accountPage"); // Navigate to the next page (EmergencyContacts)
  };
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

      <div className="absolute bottom-4 flex space-x-4">
        <button
          onClick={handleSkip}
          className="bg-red-500 text-white py-2 px-6 rounded-md"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white py-2 px-6 rounded-md"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default AlertBell;
