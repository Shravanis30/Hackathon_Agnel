import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);

function LoginPage() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((value) => (console.log("signin Successful")
    ).catch((err) => console.log(err)))
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="text"
        name="Email"
        onChange={(e) => setemail(e.target.value)}
        value={email}
        placeholder=" Email"
        className="border-b-2 mb-4 w-3/4 bg-transparent text-white"
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        placeholder="Password"
        className="border-b-2 mb-4 w-3/4 bg-transparent text-white"
      />
      <button onClick={signinUser} className="bg-pink-500 px-6 py-2 rounded-full">
        Login
      </button>
    </div>
  );
}

export default LoginPage;
