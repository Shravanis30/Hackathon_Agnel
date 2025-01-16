// import React from "react";
import { useNavigate } from "react-router-dom";


function LiveAudio() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage"); // Navigate to the home page (SplashScreen)
  };

  const handleNext = () => {
    navigate("/alert-bell"); // Navigate to the next page (EmergencyContacts)
  };
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

export default LiveAudio;
