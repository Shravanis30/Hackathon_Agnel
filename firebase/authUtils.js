import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

/**
 * Initialize Firebase Authentication
 */
const auth = getAuth();

/**
 * Sign in a user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} - Returns user information on success.
 */
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message || "Failed to sign in.");
  }
};

/**
 * Register a new user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} - Returns user information on success.
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message || "Failed to register user.");
  }
};

/**
 * Sign out the current user.
 * @returns {Promise<void>} - Resolves when the user is successfully signed out.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message || "Failed to log out.");
  }
};

/**
 * Get the currently signed-in user.
 * @returns {object|null} - Returns the current user object or null if no user is signed in.
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
