import React, { useEffect } from "react";
import { fetchUsers } from "../services/firestoreService";

function FetchUsersComponent() {
  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">User Data</h2>
      {/* Add logic to display user data */}
    </div>
  );
}

export default FetchUsersComponent;
