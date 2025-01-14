
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../firebase"; // Correctly imports the default export

const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
      createUserWithEmailAndPassword(auth, email, password)
      console.log(app);
      
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createUser}>Sign Up</button>
    </div>
  );
};

export default SignUp;