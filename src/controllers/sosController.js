// const admin = require('firebase-admin');
// const db = admin.firestore();

// const sendSOSRequest = async (req, res) => {
//     const { userId, location } = req.body;
//     try {
//         const sosRef = db.collection('sos_requests').doc();
//         await sosRef.set({
//             userId,
//             location,
//             timestamp: admin.firestore.FieldValue.serverTimestamp(),
//         });
//         res.status(200).json({ message: 'SOS request sent successfully!' });
//     } catch (error) {
//         console.error('[SOS Error]', error);
//         res.status(500).json({ message: 'Error sending SOS request.' });
//     }
// };

// const getSOSRequests = async (req, res) => {
//     try {
//         const sosSnapshot = await db.collection('sos_requests').get();
//         const sosRequests = sosSnapshot.docs.map(doc => doc.data());
//         res.status(200).json({ sosRequests });
//     } catch (error) {
//         console.error('[SOS Fetch Error]', error);
//         res.status(500).json({ message: 'Error fetching SOS requests.' });
//     }
// };

// module.exports = { sendSOSRequest, getSOSRequests };



const admin = require('firebase-admin');
const db = admin.firestore();

exports.activateSos = async (req, res) => {
    const { userId, location } = req.body;
    try {
        const sosRef = db.collection('sos_requests').doc();
        await sosRef.set({
            userId,
            location,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        return res.status(200).json({ message: 'SOS request sent successfully!' });
    } catch (error) {
        console.error('[SOS Error]', error);
        return res.status(500).json({ message: 'Error sending SOS request.' });
    }
};

exports.getSosRequests = async (req, res) => {
    try {
        const sosSnapshot = await db.collection('sos_requests').get();
        const sosRequests = sosSnapshot.docs.map(doc => doc.data());
        return res.status(200).json({ sosRequests });
    } catch (error) {
        console.error('[SOS Fetch Error]', error);
        return res.status(500).json({ message: 'Error fetching SOS requests.' });
    }
};
