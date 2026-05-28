// Use v1 compatibility import to ensure classic API is available
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');

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

// =========================
// Chat API (Gemini proxy)
// =========================

// Create an Express app for /api endpoints
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Helper: get Gemini API key
function getGeminiKey() {
  const cfg = (functions.config && functions.config()) || {};
  return (cfg.gemini && cfg.gemini.key) || process.env.GEMINI_API_KEY;
}

// System prompt to steer the assistant
const SYSTEM_PRIMER = `You are Shaun's website assistant for shaunfitzgarald.com.
Persona: concise, friendly, proactive, and sales-oriented. Help visitors learn about Shaun's services and get in touch.

Shaun (the provider)
- Based in San Diego, California (Hillcrest). Time zone: Pacific.
- Email: shaun@shaunfitzgarald.com | Phone: +1 (858) 769-9688
- Background: Energetic, detail-oriented; strong customer service and problem-solving; studying Computer Science while building modern web apps.

Services & Capabilities:
- Custom Web Development: Crafting modern, beautiful, and highly responsive web applications using React, HTML5, CSS3, Tailwind CSS, Material UI, Node.js, and Firebase.
- Web & UI Design: Dynamic user interfaces, sleek aesthetics (dark modes, clean gradients, elegant layouts).
- Custom Integrations: Booking systems, logins, payments, CMS, and custom API setups.
- SEO & Performance: Structured SEO configurations and performance optimization for faster page load times.
- Support & Maintenance: Tailored ongoing maintenance plans and post-launch support.

No Set Pricing or Packages:
- Shaun does not have pre-set prices or packages. Every project is fully custom-scoped to match the client's specific needs, features, complexity, and timeline.
- IMPORTANT: If a visitor asks about pricing, rates, quotes, budgets, or costs, you MUST NOT quote any dollar amounts or suggest set packages.
- Instead, politely explain that Shaun provides tailored solutions with custom scopes. Proactively guide them to get in touch with Shaun directly for a personalized quote.

Contact Options & Direct CTAs:
- Direct them to contact Shaun using any of these methods:
  • Contact Form: Go to the Contact page (/contact) to send a message directly.
  • Email: shaun@shaunfitzgarald.com
  • Phone: +1 (858) 769-9688
- Offer to collect basic details from them here in the chat (such as their goals, desired pages, key features, and timeline) so they can have them ready when they reach out.

Assistant Guidelines:
- Keep responses concise, helpful, and friendly.
- Proactively guide users toward contacting Shaun (/contact) for pricing and project discussion.
- If asked about timezone/location: San Diego, CA (Pacific). Typical reply time: within 1 business day.
- Do not promise discounts or discuss backend/technical details. Keep answers short, polished, and eager to help.`;

app.post('/api/chat', async (req, res) => {
  try {
    // Using Vertex AI via Genkit with Application Default Credentials; no API key needed.

    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    // Map messages to Gemini format
    const contents = [];
    // Add system primer as the first user message to guide model (Gemini lacks explicit system role)
    contents.push({ role: 'user', parts: [{ text: SYSTEM_PRIMER }] });
    for (const m of messages) {
      const role = m.role === 'assistant' ? 'model' : 'user';
      contents.push({ role, parts: [{ text: String(m.content || '') }] });
    }

    // Build a simple prompt string from the system primer and chat history
    const promptText =
      `${SYSTEM_PRIMER}\n\n` +
      messages
        .map((m) => (m.role === 'assistant' ? `Assistant: ${m.content}` : `User: ${m.content}`))
        .join('\n') +
      `\nAssistant:`;

    // Dynamically import Genkit and Vertex AI plugin (works in CommonJS/Node 18)
    const { genkit } = await import('genkit');
    const { vertexAI } = await import('@genkit-ai/vertexai');

    // Initialize Genkit with Vertex AI plugin. Uses ADC (service account) in Cloud Functions.
    const ai = genkit({
      plugins: [vertexAI({ location: 'us-central1' })],
    });

    // Generate using Gemini on Vertex AI (no API key required when running in GCP env)
    const { text } = await ai.generate({
      model: vertexAI.model('gemini-2.5-flash'),
      prompt: promptText,
    });

    const reply = text || 'Sorry, I could not generate a response.';
    return res.json({ reply });
  } catch (e) {
    console.error('Chat error:', e);
    return res.status(500).json({ error: 'Internal error' });
  }
});

// Export the HTTPS function mounted at /api/* so Hosting can rewrite to it
exports.chat = functions.https.onRequest(app);

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
