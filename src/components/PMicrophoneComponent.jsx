import { Permissions } from '@capacitor/permissions';

const requestMicrophonePermission = async () => {
  const permission = await Permissions.request({ name: 'microphone' });
  if (permission.granted) {
    startRecording();
  } else {
    alert("Microphone permission denied");
  }
};

const startRecording = () => {
  // Logic to start recording audio here
};
