import { LocalNotifications } from '@capacitor/local-notifications';
import { Permissions } from '@capacitor/permissions';

const requestNotificationPermission = async () => {
  const permission = await Permissions.request({ name: 'notifications' });
  if (permission.granted) {
    triggerAlert();
  } else {
    alert("Notification permission denied");
  }
};

const triggerAlert = () => {
  LocalNotifications.schedule({
    notifications: [
      {
        title: "Emergency Alert",
        body: "This is an emergency!",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000) }, // Schedule notification after 1 second
        sound: "alert.mp3", // Play sound
      },
    ],
  });
};
