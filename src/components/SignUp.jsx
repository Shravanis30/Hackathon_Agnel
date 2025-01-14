import React, { useState } from "react";
import { registerUser } from "../utils/authUtils";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase"; // Adjust the path to your firebase.js file

const auth = getAuth(app);

const SignUp = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert(`Failed to create account: ${error.message}`);
    }
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}

      />

      <button onClick={createUser}>
      Signup
      </button>
    
    </div>
  );
};

export default SignUp;
