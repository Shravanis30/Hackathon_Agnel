import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios"; // Ensure you import axios

// Initialize Firebase Admin SDK
admin.initializeApp();

export const someFunction = functions.https.onRequest(async (req, res) => {  // Mark the function as async
  try {
    const { latitude, longitude } = req.body;

    // Ensure the location data is valid
    if (!latitude || !longitude) {
      return res.status(400).send("Invalid location data");
    }

    // Define the Discord webhook URL
    const webhookUrl = "https://discord.com/api/webhooks/1329138480764424294/ApXOIfyGBzZHmTwWjMJ5AVXh6C-VCOO6B51wenQq42J-S-mjjMMC8YhMnB0lpBE-U5WB";

    // Create the payload
    const payload = {
      content: `User location: Latitude: ${latitude}, Longitude: ${longitude}`,
    };

    // Send the location to Discord via the webhook
    await axios.post(webhookUrl, payload);  // Now this is inside an async function

    // Send a response to acknowledge the request
    res.status(200).send("Location sent to Discord");
  } catch (error) {
    console.error("Error sending location to Discord:", error);
    res.status(500).send("Error sending location");
  }
});
