import { getMessaging, getToken } from 'firebase/messaging';

export const sendPushNotification = async (token, message) => {
  const messaging = getMessaging();
  const payload = {
    notification: {
      title: 'Emergency Alert!',
      body: message,
    },
    token: token,
  };

  try {
    await messaging.send(payload);
    console.log('Push notification sent!');
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};
