

import React, { useState, useEffect } from "react";
import { getContacts, addContact } from "../firebase/firestoreUtils";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    if (newContact.trim()) {
      await addContact(newContact);
      setContacts((prev) => [...prev, newContact]);
      setNewContact("");
    }
  };

  return (
    <div>
      <h1>Emergency Contacts</h1>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>{contact}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add new contact"
        value={newContact}
        onChange={(e) => setNewContact(e.target.value)}
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
};

export default EmergencyContacts;
