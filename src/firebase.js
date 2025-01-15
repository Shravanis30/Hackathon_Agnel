// Import the functions you need from the SDKs
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getAnalytics } from "firebase/analytics"; // Firebase Analytics
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, push } from 'firebase/database';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUcgVwhAeMRYr57I5ZbizIsZvVZtvDqBk",
  authDomain: "newapp-2c597.firebaseapp.com",
  projectId: "newapp-2c597",
  storageBucket: "newapp-2c597.firebasestorage.app",
  messagingSenderId: "880082219668",
  appId: "1:880082219668:web:8baf9071b8d738993f7a81",
  measurementId: "G-QV673W0ZZD",
  databaseURL: "https://newapp-2c597-default-rtdb.firebaseio.com", // Root of the database
};
console.log("Firebase API Key:", firebaseConfig.apiKey);

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(app);

const db = getFirestore(app);
 
const database = getDatabase(app);


// Initialize Analytics (optional, if using analytics)
const analytics = typeof window !== "undefined" && getAnalytics(app);

// Export the Firebase services
export { app, auth, analytics, db, getDatabase, ref, push, database };
