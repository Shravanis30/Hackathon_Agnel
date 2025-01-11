import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-secondary text-white p-5">
      <h2 className="text-3xl font-bold mb-4">Welcome to Women Safety App</h2>
      <p className="text-lg text-center mb-8">
        Your companion for ensuring safety and security.
      </p>
      <button
        className="bg-primary px-6 py-2 rounded-full text-white font-semibold"
        onClick={() => navigate("/sos")}
      >
        Get Started
      </button>
    </div>
  );
}

export default WelcomePage;
