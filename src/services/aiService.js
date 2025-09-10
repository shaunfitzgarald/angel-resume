/**
 * AI Service for handling chat interactions with the backend
 */

// Base URL for API calls - adjust as needed for your environment
const API_URL = process.env.REACT_APP_API_URL || '/api';

/**
 * Sends chat messages to the AI service and returns the response
 * @param {Array} messages - Array of message objects with role and content properties
 * @returns {Promise<string>} - The AI response text
 */
export async function sendChat(messages) {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    let text = '';
    try { text = await res.text(); } catch {}
    throw new Error(`Chat request failed: ${res.status} ${text}`);
  }
  const data = await res.json().catch(() => ({}));
  return data.reply;
}

// Default export for the entire service
export default {
  sendChat,
};