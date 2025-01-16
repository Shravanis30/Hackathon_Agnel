import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signinUser = () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setErrorMessage(""); // Reset error message
    setLoading(true); // Show loading spinner

    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log("Signin Successful", value);
        navigate("/homeMain"); // Navigate to homeMain after successful login
      })
      .catch((err) => {
        console.error("Error during sign-in:", err.message);
        setErrorMessage(`Login failed: ${err.message}`);
      })
      .finally(() => {
        setLoading(false); // Hide loading spinner
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <h2 className="text-2xl mb-4">Login</h2>
      <form
        className="flex flex-col items-center w-3/4"
        onSubmit={(e) => {
          e.preventDefault();
          signinUser();
        }}
      >
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="border-b-2 mb-4 bg-transparent text-white"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="border-b-2 mb-4 bg-transparent text-white"
        />
        {errorMessage && (
          <p className="text-red-500 text-xs mb-4">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="bg-pink-500 px-6 py-2 rounded-full"
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
