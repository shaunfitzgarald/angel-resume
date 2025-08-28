// src/services/aiService.js
const DEFAULT_ENDPOINT =
  process.env.REACT_APP_CHAT_ENDPOINT || '/api/chat';

// Keep only the last N turns to reduce token fluff
const MAX_TURNS = 10;

export async function sendChat(messages, endpoint = DEFAULT_ENDPOINT) {
  const trimmed = Array.isArray(messages)
    ? messages.slice(-MAX_TURNS)
    : [];

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: trimmed }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI endpoint error (${res.status}): ${text || 'unknown'}`);
  }

  const data = await res.json().catch(() => ({}));
  return data.reply || '(no reply)';
}