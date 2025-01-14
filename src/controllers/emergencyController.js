const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

exports.addEmergencyContact = async (req, res) => {
  const { name } = req.body;
  await db.collection("contacts").add({ name });
  res.send("Contact added successfully!");
};

exports.getEmergencyContacts = async (req, res) => {
  const snapshot = await db.collection("contacts").get();
  const contacts = snapshot.docs.map((doc) => doc.data());
  res.json(contacts);
};
