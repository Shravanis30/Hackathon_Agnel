const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-firebase-project.firebaseio.com'
});

// Initialize Express App
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const sosRoutes = require('./routes/sosRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const locationRoutes = require('./routes/locationRoutes');
const alertRoutes = require('./routes/alertRoutes');

// Use Routes
app.use(sosRoutes);
app.use(emergencyRoutes);
app.use(uploadRoutes);
app.use(locationRoutes);
app.use(alertRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








// // women-safety-backend/app.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const cors = require('cors');
// const multer = require('multer');

// // Initialize Express App
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Firebase Admin SDK Initialization
// const serviceAccount = require('./firebase-service-account.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://your-firebase-project.firebaseio.com'
// });

// const db = admin.firestore();
// const upload = multer({ dest: 'uploads/' });

// // ROUTES

// /**
//  * Route: SOS Activation
//  * Description: Save SOS requests to Firestore with user details and location.
//  */
// app.post('/sos', async (req, res) => {
//     const { userId, location } = req.body;
//     try {
//         const sosRef = db.collection('sos_requests').doc();
//         await sosRef.set({
//             userId,
//             location,
//             timestamp: admin.firestore.FieldValue.serverTimestamp()
//         });
//         return res.status(200).json({ message: 'SOS request sent successfully!' });
//     } catch (error) {
//         console.error('[SOS Error]', error);
//         return res.status(500).json({ message: 'Error sending SOS request.' });
//     }
// });

// /**
//  * Route: Emergency Contacts
//  * Description: Fetch emergency contact numbers from Firestore.
//  */
// app.get('/emergency-contacts', async (req, res) => {
//     try {
//         const contactsSnapshot = await db.collection('emergency_contacts').get();
//         const contacts = contactsSnapshot.docs.map(doc => doc.data());
//         return res.status(200).json({ contacts });
//     } catch (error) {
//         console.error('[Contacts Error]', error);
//         return res.status(500).json({ message: 'Error fetching emergency contacts.' });
//     }
// });

// /**
//  * Route: Upload Recorded Audio or Video
//  * Description: Handles file uploads using Multer for temporary storage.
//  */
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//     }
//     return res.status(200).json({ message: 'File uploaded successfully!', file });
// });

// /**
//  * Route: Live Location Updates
//  * Description: Save live location updates in Firestore for tracking.
//  */
// app.post('/update-location', async (req, res) => {
//     const { userId, location } = req.body;
//     try {
//         const userRef = db.collection('live_locations').doc(userId);
//         await userRef.set({
//             location,
//             timestamp: admin.firestore.FieldValue.serverTimestamp()
//         });
//         return res.status(200).json({ message: 'Location updated successfully!' });
//     } catch (error) {
//         console.error('[Location Update Error]', error);
//         return res.status(500).json({ message: 'Error updating location.' });
//     }
// });

// /**
//  * Route: Alert Bell
//  * Description: Trigger a loud alert or notify nearby users.
//  */
// app.post('/alert', async (req, res) => {
//     const { userId } = req.body;
//     try {
//         // Logic for alert (e.g., notify nearby users or play sound)
//         return res.status(200).json({ message: 'Alert triggered successfully!' });
//     } catch (error) {
//         console.error('[Alert Error]', error);
//         return res.status(500).json({ message: 'Error triggering alert.' });
//     }
// });

// /**
//  * Route: Retrieve SOS Requests
//  * Description: Fetch all SOS requests for admin or emergency services.
//  */
// app.get('/sos-requests', async (req, res) => {
//     try {
//         const sosSnapshot = await db.collection('sos_requests').get();
//         const sosRequests = sosSnapshot.docs.map(doc => doc.data());
//         return res.status(200).json({ sosRequests });
//     } catch (error) {
//         console.error('[SOS Fetch Error]', error);
//         return res.status(500).json({ message: 'Error fetching SOS requests.' });
//     }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
