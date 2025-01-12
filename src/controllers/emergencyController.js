const admin = require('firebase-admin');
const db = admin.firestore();

exports.getEmergencyContacts = async (req, res) => {
    try {
        const contactsSnapshot = await db.collection('emergency_contacts').get();
        const contacts = contactsSnapshot.docs.map(doc => doc.data());
        return res.status(200).json({ contacts });
    } catch (error) {
        console.error('[Contacts Error]', error);
        return res.status(500).json({ message: 'Error fetching emergency contacts.' });
    }
};
