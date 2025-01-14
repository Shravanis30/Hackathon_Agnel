// locationController.js

/**
 * Gets the user's current location (latitude and longitude).
 * @returns {Promise<object>} - Returns an object with latitude and longitude.
 */
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject("Unable to fetch location. Error: " + error.message);
          },
          { enableHighAccuracy: true }
        );
      }
    });
  };
  
  /**
   * Sends the user's location to a backend API.
   * @param {object} location - The user's location object containing latitude and longitude.
   * @returns {Promise<string>} - Returns a success message from the API.
   */
  export const sendLocationToAPI = async (location) => {
    try {
      const response = await fetch("https://your-backend-api.com/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send location to the API.");
      }
  
      const data = await response.json();
      return data.message || "Location sent successfully!";
    } catch (error) {
      throw new Error(error.message || "An error occurred while sending location.");
    }
  };
  