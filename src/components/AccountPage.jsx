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




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { app } from "../firebase";

// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

// const signupWithGoogle = () => {
//   signInWithPopup(auth, googleProvider)
// }

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
//       onClick={signupWithGoogle}
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





// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {app} from "../firebase"
// import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

// const signupWithGoogle = () => {
//   // signInWithPopup(auth, googleProvider)
//   signInWithRedirect(auth, googleProvider)
// }

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
//         onClick={() => navigate("/loginPage")}
//         className="bg-pink-500 px-8 py-3 rounded-full mb-4 text-white font-semibold shadow-md hover:bg-pink-600"
//       >
//         Login
//       </button>
//       <button
//       onClick={signupWithGoogle}
//         className="bg-blue-800 px-8 py-3 rounded-full text-white font-semibold shadow-md hover:bg-blue-700"
//       >
//         Continue using Google
//       </button>

//       {/* Footer Section */}
//       <p className="mt-6">
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/signUp")}
//           className="text-pink-500 cursor-pointer underline"
//         >
//           Sign up here
//         </span>
//       </p>
//     </div>
//   );
// }

// export default AccountPage;


// // import React from "react";
// import { useNavigate } from "react-router-dom";
// // import { app } from "../firebase";
// // import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";

//   const auth = getAuth();
//   const googleProvider = new GoogleAuthProvider();
// // const auth = getAuth(app);
// // const googleProvider = new GoogleAuthProvider();

// function AccountPage() {
//   const navigate = useNavigate();

  
  
//   const signupWithGoogle = () => {
//     signInWithRedirect(auth, googleProvider);
//   };
  
//   // Handle the redirect result
//   getRedirectResult(auth)
//     .then((result) => {
//       if (result) {
//         console.log("User signed in:", result.user);
//       }
//     })
//     .catch((error) => {
//       console.error("Error handling redirect result:", error);
//     });

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
//       <div className="flex items-center justify-center mb-6">
//         <img
//           src="/path-to-logo.png"
//           alt="SafeGuardHer"
//           className="w-20 h-20"
//         />
//       </div>
//       <h1 className="text-3xl font-bold mb-6">SafeGuardHer</h1>
//       <div className="mb-6">
//         <img
//           src="/path-to-illustration.png"
//           alt="Illustration"
//           className="w-60 h-60"
//         />
//       </div>
//       <button
//         onClick={() => navigate("/loginPage")}
//         className="bg-pink-500 px-8 py-3 rounded-full mb-4 text-white font-semibold shadow-md hover:bg-pink-600"
//       >
//         Login
//       </button>
//       <button
//         onClick={signupWithGoogle}
//         className="bg-blue-800 px-8 py-3 rounded-full text-white font-semibold shadow-md hover:bg-blue-700"
//       >
//         Continue using Google
//       </button>
//       <p className="mt-6">
//         Don&apos;t have an account?{" "}
//         <span
//           onClick={() => navigate("/signUp")}
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
import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { app } from "../firebase"; // Import the initialized Firebase app

const auth = getAuth(app); // Initialize auth with the Firebase app
const googleProvider = new GoogleAuthProvider();

function AccountPage() {
  const navigate = useNavigate();

  const signupWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
  };

  // Handle the redirect result
  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("User signed in:", result.user);
        }
      })
      .catch((error) => {
        console.error("Error handling redirect result:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <div className="flex items-center justify-center mb-6">
        <img src="/path-to-logo.png" alt="SafeGuardHer" className="w-20 h-20" />
      </div>
      <h1 className="text-3xl font-bold mb-6">SafeGuardHer</h1>
      <div className="mb-6">
        <img src="/path-to-illustration.png" alt="Illustration" className="w-60 h-60" />
      </div>
      <button
        onClick={() => navigate("/loginPage")}
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
      <p className="mt-6">
        Don&apos;t have an account?{" "}
        <span onClick={() => navigate("/signUp")} className="text-pink-500 cursor-pointer underline">
          Sign up here
        </span>
      </p>
    </div>
  );
}

export default AccountPage;
