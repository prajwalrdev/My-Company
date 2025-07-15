/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure your email transport using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass,
  },
});

exports.sendContactEmail = functions.firestore
    .document("contacts/{contactId}")
    .onCreate(async (snap, context) => {
      const data = snap.data() || {};
      const mailOptions = {
        from: `"blockbTech.in" <${functions.config().gmail.user}>`,
        to: "devprajwal36@gmail.com", // Change to your email
        subject: `New Contact: ${data.subject || "No Subject"}`,
        html:
                `<h2>New Contact Submission</h2>` +
                `<p><strong>Name:</strong> ${data.name || ""} ${
                  data.lastName || ""
                }</p>` +
                `<p><strong>Email:</strong> ${data.email || ""}</p>` +
                `<p><strong>Phone:</strong> ${data.phone || ""}</p>` +
                `<p><strong>Subject:</strong> ${data.subject || ""}</p>` +
                `<p><strong>Message:</strong><br>${(data.message || "").replace(
                    /\n/g,
                    "<br>",
                )}</p>`,
      };
      try {
        await transporter.sendMail(mailOptions);
        functions.logger.info("Contact email sent successfully");
      } catch (error) {
        functions.logger.error("Error sending contact email:", error);
      }
      return null;
    });
