// File: src/services/firestoreService.js

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import the Firebase config file

// Function to save user data to Firestore
export async function saveUserData(userId, data) {
  try {
    const docRef = await addDoc(collection(db, "users"), { userId, ...data });
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error.message);
  }
}

// Function to fetch user data from Firestore
export async function fetchUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  } catch (error) {
    console.error("Error fetching documents:", error.message);
  }
}
