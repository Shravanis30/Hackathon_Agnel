import React from "react";
import { saveUserData } from "../services/firestoreService";

function SaveUserComponent() {
  const handleSave = () => {
    const userId = "123"; // Example user ID
    const data = { name: "John Doe", email: "john@example.com" }; // Example data
    saveUserData(userId, data);
  };

  return (
    <div>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save User Data
      </button>
    </div>
  );
}

export default SaveUserComponent;
