import { Geolocation } from '@capacitor/geolocation';
import { Permissions } from '@capacitor/permissions';

const requestLocationPermission = async () => {
  const permission = await Permissions.request({ name: 'location' });
  if (permission.granted) {
    getCurrentLocation();
  } else {
    alert("Location permission denied");
  }
};

const getCurrentLocation = async () => {
  const position = await Geolocation.getCurrentPosition();
  console.log('Current position:', position);
};
