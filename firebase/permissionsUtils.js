// permissionsUtils.js

/**
 * Requests location access permission from the user.
 * @returns {Promise<boolean>} - Returns true if permission is granted, otherwise false.
 */
export const requestLocationPermission = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          () => resolve(true),
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              resolve(false);
            } else {
              reject("An error occurred while requesting location permission.");
            }
          }
        );
      }
    });
  };
  
  /**
   * Checks if location services are enabled in the browser.
   * @returns {boolean} - Returns true if location services are enabled.
   */
  export const checkLocationServices = () => {
    return "geolocation" in navigator;
  };
  