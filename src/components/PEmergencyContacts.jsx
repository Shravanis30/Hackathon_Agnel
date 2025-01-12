import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the emergency contacts from your API (replace the URL with your actual API endpoint)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/emergency/emergency-contacts');
        setContacts(response.data); // Store the fetched data in state
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contacts');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Render the component
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <ul className="space-y-2">
          {contacts.map((contact, index) => (
            <li key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
              <span className="text-lg">{contact.name}</span>
              <span className="text-gray-600">{contact.phone}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmergencyContacts;
