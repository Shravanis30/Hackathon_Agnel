
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToSomeRoute = () => {
    navigate('/gestureSOS');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-500">
        Women Safety App
      </h1>
      <p className="text-lg mb-8 text-center">
        Your safety is our priority. Press the button below to activate SOS.
      </p>
      <button 
        onClick={goToSomeRoute} 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Activate Gesture SOS
      </button>
    </div>
  );
};

export default Home;
