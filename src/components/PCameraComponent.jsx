import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Permissions } from '@capacitor/permissions';

const CameraComponent = () => {
  const [image, setImage] = useState(null);

  const checkAndRequestCameraPermission = async () => {
    const permission = await Permissions.request({ name: 'camera' });
    if (permission.granted) {
      takePicture();
    } else {
      alert("Camera permission denied");
    }
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
    });
    setImage(image.webPath);
  };

  return (
    <div>
      <button onClick={checkAndRequestCameraPermission}>Take Picture</button>
      {image && <img src={image} alt="Captured" />}
    </div>
  );
};

export default CameraComponent;
