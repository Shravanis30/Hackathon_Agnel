import React, { useState } from "react";
import { registerUser } from "../utils/authUtils";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSignUp = async () => {
    try {
      const user = await registerUser(email, password);
      setStatus(`Account created for ${user.email}!`);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SignUp;
