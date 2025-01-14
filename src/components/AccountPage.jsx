// import React from "react";
// import { useNavigate } from "react-router-dom";

// function AccountPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
//       {/* Logo Section */}
//       <div className="flex items-center justify-center mb-6">
//         <img
//           src="/path-to-logo.png"
//           alt="SafeGuardHer"
//           className="w-20 h-20"
//         />
//       </div>

//       {/* Title Section */}
//       <h1 className="text-3xl font-bold mb-6">SafeGuardHer</h1>

//       {/* Illustration */}
//       <div className="mb-6">
//         <img
//           src="/path-to-illustration.png" // Replace with the path to your image
//           alt="Illustration"
//           className="w-60 h-60"
//         />
//       </div>

//       {/* Buttons */}
//       <button
//         onClick={() => navigate("/login")}
//         className="bg-pink-500 px-8 py-3 rounded-full mb-4 text-white font-semibold shadow-md hover:bg-pink-600"
//       >
//         Login
//       </button>
//       <button
//         onClick={() => navigate("/signup")}
//         className="bg-blue-800 px-8 py-3 rounded-full text-white font-semibold shadow-md hover:bg-blue-700"
//       >
//         Continue using Google
//       </button>

//       {/* Footer Section */}
//       <p className="mt-6">
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/signup")}
//           className="text-pink-500 cursor-pointer underline"
//         >
//           Sign up here
//         </span>
//       </p>
//     </div>
//   );
// }

// export default AccountPage;




import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const signupWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
}

function AccountPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <img
          src="/path-to-logo.png"
          alt="SafeGuardHer"
          className="w-20 h-20"
        />
      </div>

      {/* Title Section */}
      <h1 className="text-3xl font-bold mb-6">SafeGuardHer</h1>

      {/* Illustration */}
      <div className="mb-6">
        <img
          src="/path-to-illustration.png" // Replace with the path to your image
          alt="Illustration"
          className="w-60 h-60"
        />
      </div>

      {/* Buttons */}
      <button
        onClick={() => navigate("/login")}
        className="bg-pink-500 px-8 py-3 rounded-full mb-4 text-white font-semibold shadow-md hover:bg-pink-600"
      >
        Login
      </button>
      <button
      onClick={signupWithGoogle}
        className="bg-blue-800 px-8 py-3 rounded-full text-white font-semibold shadow-md hover:bg-blue-700"
      >
        Continue using Google
      </button>

      {/* Footer Section */}
      <p className="mt-6">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-pink-500 cursor-pointer underline"
        >
          Sign up here
        </span>
      </p>
    </div>
  );
}

export default AccountPage;
