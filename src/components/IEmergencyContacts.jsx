// src/components/EmergencyContacts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('/api/emergency/contacts');
      setContacts(response.data);
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} className="mb-2">
            <span className="font-bold">{contact.name}:</span> {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyContacts;
