// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth functions
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyConx387VetNR6lA09XJFLepjFE39lVrZ8",
  authDomain: "htagnel.firebaseapp.com",
  projectId: "htagnel",
  storageBucket: "htagnel.firebasestorage.app",
  messagingSenderId: "1099332989195",
  appId: "1:1099332989195:web:e924717fbeca1b0818b20e",
  measurementId: "G-DZ549HG89K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();  // Check if Firebase is already initialized

// Initialize Firebase Authentication
const auth = getAuth(app); // Create the auth instance

// Initialize Analytics (optional, for analytics tracking)
const analytics = getAnalytics(app);

// Export auth so you can use it elsewhere in your app
export { auth, app, analytics };
