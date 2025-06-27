/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https"); // Unused, removed for lint
// const logger = require("firebase-functions/logger"); // Unused, removed for lint
const functions = require("firebase-functions");
const fetch = require("node-fetch"); // npm install node-fetch@2
const RECAPTCHA_SECRET = "6LclM28rAAAAABlDVCXIbyMWA-7IdW3DtPkZV2R7"; // <-- Replace with your actual secret key

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Ready for admin notification function

exports.submitContact = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const token = req.body["g-recaptcha-response"];
  if (!token) {
    return res.status(400).send("No reCAPTCHA token provided");
  }

  // Verify reCAPTCHA with Google
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;
  const response = await fetch(verifyUrl, { method: "POST" });
  const data = await response.json();

  if (!data.success) {
    return res.status(400).send("reCAPTCHA failed. Please try again.");
  }

  // TODO: Process your form (save to Firestore, send email, etc.)
  return res.status(200).send("Form submitted successfully!");
});
