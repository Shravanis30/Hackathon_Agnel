// import React from "react";

// function GestureSOS() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
//       <img
//         src="https://source.unsplash.com/400x400/?gesture,alert"
//         alt="Gesture SOS"
//         className="w-60 h-60 mb-4 rounded-lg shadow-lg"
//       />
//       <h2 className="text-3xl font-bold mb-2">Gesture-Based SOS Activation</h2>
//       <p className="text-lg">
//         Activate emergency alerts quickly using simple hand gestures, ensuring
//         immediate assistance when you need it most.
//       </p>
//     </div>
//   );
// }

// export default GestureSOS;




// LFGestureSOS.js (Second page)
// import React from "react";
import { useNavigate } from "react-router-dom";

function LFGestureSOS() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage"); // Navigate to the home page (SplashScreen)
  };

  const handleNext = () => {
    navigate("/live-location"); // Navigate to the next page (LiveLocation)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-600 to-blue-300 text-white flex flex-col items-center justify-center text-center p-4">
      <img
        src="https://source.unsplash.com/400x400/?gesture,alert"
        alt="Gesture SOS"
        className="w-60 h-60 mb-4 rounded-lg shadow-lg"
      />
      <h2 className="text-3xl font-bold mb-2">Gesture-Based SOS Activation</h2>
      <p className="text-lg">
        Activate emergency alerts quickly using simple hand gestures, ensuring
        immediate assistance when you need it most.
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

export default LFGestureSOS;
