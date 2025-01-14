import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

const db = getFirestore(firebaseApp);

export const getContacts = async () => {
  const snapshot = await getDocs(collection(db, "contacts"));
  return snapshot.docs.map((doc) => doc.data().name);
};

export const addContact = async (name) => {
  await addDoc(collection(db, "contacts"), { name });
};
