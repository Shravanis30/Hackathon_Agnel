import React from "react";

function FeaturesCard({ title, description, onClick }) {
  return (
    <div
      className="bg-secondary text-white p-6 rounded-lg shadow-lg hover:bg-primary cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  );
}

export default FeaturesCard;
