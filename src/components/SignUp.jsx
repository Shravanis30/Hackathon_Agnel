
// import { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {app} from "../firebase"; // Correctly imports the default export

// const auth = getAuth(app);

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const createUser = async () => {
//       createUserWithEmailAndPassword(auth, email, password)
//       console.log(app);
      
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input
//         type="email"
//         value={email}
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         value={password}
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={createUser}>Sign Up</button>
//     </div>
//   );
// };

// export default SignUp;




import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // Correctly imports the default export

const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(false); // To show a loading indicator

  const createUser = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError(""); // Reset error before trying
    setLoading(true); // Set loading to true while making the request

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      console.log("User created successfully");
      // You can navigate the user to a different page or show a success message
    } catch (err) {
      setLoading(false);
      setError(err.message); // Set the error message if the signup fails
      console.error("Error creating user:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 p-6">
      <h2 className="text-3xl font-bold mb-4 text-pink-600">Sign Up</h2>

      <div className="w-full max-w-sm">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={createUser}
          disabled={loading} // Disable button while loading
          className={`w-full p-3 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-pink-600 hover:bg-pink-700'} transition-all`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
