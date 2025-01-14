import { https } from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const triggerAlert = https.onCall(async (data, context) => {
  const { userId } = data;

  try {
    const alertRef = db.collection('alerts').doc('current');
    await alertRef.set({
      triggeredBy: userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { message: 'Alert triggered successfully!' };
  } catch (error) {
    console.error('[Trigger Alert Error]', error);
    throw new https.HttpsError('internal', 'Failed to trigger alert.');
  }
});
