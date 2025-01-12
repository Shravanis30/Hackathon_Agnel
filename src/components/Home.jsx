// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Safety App</h1>
      <div className="space-y-4">
        <Link
          to="/Igesture-sos"
          className="px-6 py-3 bg-red-500 text-white rounded-lg w-full text-center"
        >
          Gesture SOS
        </Link>
        <Link
          to="/Ilive-location"
          className="px-6 py-3 bg-green-500 text-white rounded-lg w-full text-center"
        >
          Live Location
        </Link>
        <Link
          to="/Iemergency-contacts"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg w-full text-center"
        >
          Emergency Contacts
        </Link>
        <Link
          to="/Ihidden-camera"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg w-full text-center"
        >
          Hidden Camera
        </Link>
        <Link
          to="/Ilive-audio"
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg w-full text-center"
        >
          Live Audio
        </Link>
        <Link
          to="/Ialert-bell"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg w-full text-center"
        >
          Alert Bell
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
