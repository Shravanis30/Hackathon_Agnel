/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const functions = require("firebase-functions");
// const twilio = require("twilio");

// // Twilio credentials
// const accountSid = "AC591bfb307d2a6defdacbb8761a646fbf";
// const authToken = "e9024e10d90cfb7daeefcaa72625982e";
// const twilioPhoneNumber = "+16812068603";

// const client = twilio(accountSid, authToken);

// // Cloud Function to send SMS
// exports.sendSMS = functions.https.onRequest(async (req, res) => {
//   const { to, message } = req.body;

//   try {
//     const twilioResponse = await client.messages.create({
//       body: message,
//       from: twilioPhoneNumber,
//       to,
//     });
//     res.status(200).send({ success: true, sid: twilioResponse.sid });
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//     res.status(500).send({ success: false, error: error.message });
//   }
// });

// const functions = require("firebase-functions");
// const twilio = require("twilio");

// // Twilio credentials
// const accountSid = "AC591bfb307d2a6defdacbb8761a646fbf";
// const authToken = "e9024e10d90cfb7daeefcaa72625982e";
// const twilioPhoneNumber = "+16812068603";

// const client = twilio(accountSid, authToken);

// // Cloud Function to send SMS
// exports.sendSMS = functions.https.onRequest(async (req, res) => {
//   const { to, message } = req.body;

//   try {
//     const twilioResponse = await client.messages.create({
//       body: message,
//       from: twilioPhoneNumber,
//       to,
//     });
//     res.status(200).send({ success: true, sid: twilioResponse.sid });
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//     res.status(500).send({ success: false, error: error.message });
//   }
// });

const functions = require("firebase-functions");
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Cloud Function to send SMS
exports.sendSMS = functions.https.onRequest(async (req, res) => {
  const { to, message } = req.body;

  try {
    const twilioResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to,
    });
    res.status(200).send({ success: true, sid: twilioResponse.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});
