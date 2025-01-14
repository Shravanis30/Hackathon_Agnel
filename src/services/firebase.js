import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyConx387VetNR6lA09XJFLepjFE39lVrZ8",
  authDomain: "htagnel.firebaseapp.com",
  projectId: "htagnel",
  storageBucket: "htagnel.firebasestorage.app",
  messagingSenderId: "1099332989195",
  appId: "1:1099332989195:web:38e3f01f21facd7d18b20e",
  measurementId: "G-3QGR9VNGY5"
};

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Initialize Analytics and Auth only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app); // Initialize Analytics only in the browser
}

const auth = getAuth(app);

// Export app, auth, and analytics for usage
export { app, auth, analytics };
export default app; // Default export
