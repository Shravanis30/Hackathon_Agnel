import React, { useState } from "react";
import { signInUser } from "../utils/authUtils";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSignIn = async () => {
    try {
      const user = await signInUser(email, password);
      setStatus(`Welcome, ${user.email}!`);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
      <button onClick={handleSignIn}>Sign In</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SignIn;
