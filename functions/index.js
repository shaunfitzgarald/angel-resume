// Use v1 compatibility import to ensure classic API is available
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Initialize Firebase Admin
admin.initializeApp();

// Helper to create transporter lazily so we don't access config at require-time
function createTransporter() {
  const emailUser = process.env.NODE_ENV === 'production'
    ? (functions.config().email && functions.config().email.user)
    : process.env.EMAIL_USER;

  const emailPass = process.env.NODE_ENV === 'production'
    ? (functions.config().email && functions.config().email.password)
    : process.env.EMAIL_PASSWORD;

  return nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
}

// Firestore trigger function for sending emails when new messages are created
exports.sendEmailOnNewMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snapshot, context) => {
      
    const messageData = snapshot.data();
    
    // Get destination email from config or env
    const destinationEmail = process.env.NODE_ENV === 'production'
      ? functions.config().email.destination
      : process.env.DESTINATION_EMAIL;
    
        // Create transporter now (inside function scope)
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `"Your Resume Website" <${process.env.NODE_ENV === 'production' ? (functions.config().email && functions.config().email.user) : process.env.EMAIL_USER}>`,
      to: destinationEmail, // Where you want to receive the contact form messages
      replyTo: messageData.email,
      subject: `New Contact Form Message: ${messageData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4a90e2; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h1>New Message from Your Website</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px;">
            <div style="margin-bottom: 15px;">
              <div style="font-weight: bold; margin-bottom: 5px;">From:</div>
              <div>${messageData.name} (${messageData.email})</div>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="font-weight: bold; margin-bottom: 5px;">Subject:</div>
              <div>${messageData.subject}</div>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="font-weight: bold; margin-bottom: 5px;">Message:</div>
              <div>${messageData.message}</div>
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
            <p>This email was sent from your website's contact form.</p>
            <p>Received on: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST</p>
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('New email sent to:', destinationEmail);
      return null;
    } catch(error) {
      console.error('There was an error sending the email:', error);
      return null;
    }
  });
