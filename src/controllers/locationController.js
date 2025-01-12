const admin = require('firebase-admin');
const db = admin.firestore();

exports.updateLocation = async (req, res) => {
    const { userId, location } = req.body;
    try {
        const userRef = db.collection('live_locations').doc(userId);
        await userRef.set({
            location,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        return res.status(200).json({ message: 'Location updated successfully!' });
    } catch (error) {
        console.error('[Location Update Error]', error);
        return res.status(500).json({ message: 'Error updating location.' });
    }
};
