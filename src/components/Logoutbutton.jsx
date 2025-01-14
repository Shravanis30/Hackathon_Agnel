import React from "react";
import { logoutUser } from "../utils/authUtils";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
