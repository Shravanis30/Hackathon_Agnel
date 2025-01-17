import { useNavigate } from "react-router-dom";

function EmergencyContacts() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/accountPage");
  };

  const handleNext = () => {
    navigate("/hidden-camera");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-400 via-pink-300 to-blue-200 text-rose-900 flex flex-col items-center justify-center text-center p-6 relative">
      {/* Emergency contacts image */}
      <img
        src="https://source.unsplash.com/400x400/?emergency,contacts"
        alt="Emergency Contacts"
        className="w-60 h-60 mb-4 rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-110"
      />

      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-3">
        Emergency Contacts
      </h2>

      {/* Description */}
      <p className="text-lg mb-6 opacity-80">
        Access important emergency contacts and helpline numbers at your fingertips.
      </p>

      {/* Buttons */}
      <div className="absolute bottom-8 flex space-x-44 animate__animated animate__fadeIn">
        <button
          onClick={handleSkip}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EmergencyContacts;
