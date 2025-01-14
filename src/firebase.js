// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyB6OSlB39vk3Ju2psEq2yA3y0yfRfN6JTE",
// //   authDomain: "angelwatch-fd0a0.firebaseapp.com",
// //   projectId: "angelwatch-fd0a0",
// //   storageBucket: "angelwatch-fd0a0.firebasestorage.app",
// //   messagingSenderId: "996247757782",
// //   appId: "1:996247757782:web:b3da89341b9b0557007a77",
// //   measurementId: "G-ZD7LPMH9FX"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB6OSlB39vk3Ju2psEq2yA3y0yfRfN6JTE",
//   authDomain: "angelwatch-fd0a0.firebaseapp.com",
//   projectId: "angelwatch-fd0a0",
//   storageBucket: "angelwatch-fd0a0.firebasestorage.app",
//   messagingSenderId: "996247757782",
//   appId: "1:996247757782:web:b3da89341b9b0557007a77",
//   measurementId: "G-ZD7LPMH9FX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
  measurementId: "G-3QGR9VNGY5",
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics and Auth
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
