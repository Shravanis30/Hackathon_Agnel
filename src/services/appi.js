// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-url.com', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const getEmergencyContacts = () => api.get('/api/emergency/contacts');
export const shareLocation = (location) => api.post('/api/location/share', location);
export const activateSOS = () => api.post('/api/sos/gesture');
// Add other API functions as needed
