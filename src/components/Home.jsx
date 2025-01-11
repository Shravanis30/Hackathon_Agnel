import React from "react";
import FeaturesCard from "./FeaturesCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const features = [
    { title: "SOS", description: "Send emergency alerts", path: "/sos" },
    {
      title: "Spy Camera",
      description: "Discreet recording for safety",
      path: "/spy-camera",
    },
    {
      title: "Share Location",
      description: "Share your live location",
      path: "/share-location",
    },
  ];

  return (
    <div className="bg-white min-h-screen p-5">
      <h1 className="text-primary text-3xl font-bold mb-6 text-center">
        Women Safety App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeaturesCard
            key={index}
            title={feature.title}
            description={feature.description}
            onClick={() => navigate(feature.path)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
