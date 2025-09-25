import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, IconButton, Typography, TextField, Button, Stack, Avatar, Tooltip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { sendChat } from '../services/aiService';
import { trackChatEvent, trackChatSession } from '../utils/analytics';

const CONSENT_STORAGE_KEY = 'cookieConsent.v1';
function readConsent() {
  try { const raw = localStorage.getItem(CONSENT_STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

// Typing indicator component
const TypingIndicator = () => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
    <Typography variant="caption" color="text.secondary">AI is typing</Typography>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            animation: `typing 1.4s infinite ease-in-out ${i * 0.2}s`,
            '@keyframes typing': {
              '0%, 60%, 100%': {
                transform: 'translateY(0)',
                opacity: 0.4,
              },
              '30%': {
                transform: 'translateY(-10px)',
                opacity: 1,
              },
            },
          }}
        />
      ))}
    </Box>
  </Stack>
);

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      {!isUser && (<Avatar sx={{ width: 28, height: 28 }}>AI</Avatar>)}
      <Paper variant="outlined" sx={{ p: 1.25, maxWidth: '100%', bgcolor: isUser ? 'primary.light' : 'background.paper', borderColor: isUser ? 'primary.main' : 'divider', color: isUser ? 'primary.contrastText' : 'text.primary' }}>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{content}</Typography>
      </Paper>
      {isUser && <Avatar sx={{ width: 28, height: 28 }}>You</Avatar>}
    </Stack>
  );
}

export default function ChatWidget({ embedded = false }) {
  const [open, setOpen] = useState(embedded);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "✨ Hi! I'm Shaun's AI assistant. Ask me about pricing, services, or Shaun's background and work." },
  ]);
  const [consent, setConsent] = useState(() => readConsent());
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [sessionStartTime] = useState(() => Date.now());
  const listRef = useRef(null);

  useEffect(() => { if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [open, messages]);
  useEffect(() => { const onUpdate = (e) => setConsent(e.detail); window.addEventListener('cookie-consent-updated', onUpdate); return () => window.removeEventListener('cookie-consent-updated', onUpdate); }, []);

  // Track chat session when widget opens
  useEffect(() => {
    if (open) {
      trackChatEvent('chat_opened', { sessionId });
    }
  }, [open, sessionId]);

  // Track session end when component unmounts or chat closes
  useEffect(() => {
    return () => {
      if (open && messages.length > 1) {
        const sessionDuration = Date.now() - sessionStartTime;
        trackChatSession({
          sessionId,
          messageCount: messages.length,
          duration: sessionDuration,
          endedAt: new Date().toISOString()
        });
      }
    };
  }, [open, messages.length, sessionId, sessionStartTime]);

  const disabled = consent?.level === 'necessary';

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (disabled) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Chat is disabled when only necessary cookies are allowed. Use Cookie Settings to enable additional cookies.' }]);
      return;
    }
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    
    // Track user message
    trackChatEvent('user_message', { 
      sessionId, 
      messageText: text, 
      messageCount: next.length 
    });
    
    try { window.dispatchEvent(new CustomEvent('chat-sent', { detail: { text } })); } catch {}
    setLoading(true);
    try {
      const reply = await sendChat(next);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply || ' ' }]);
      
      // Track assistant response
      trackChatEvent('assistant_response', { 
        sessionId, 
        responseText: reply, 
        messageCount: next.length + 1,
        success: true
      });
      
      try { window.dispatchEvent(new CustomEvent('chat-response', { detail: { ok: true } })); } catch {}
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, there was an error reaching the assistant.' }]);
      
      // Track error
      trackChatEvent('assistant_error', { 
        sessionId, 
        error: e.message,
        messageCount: next.length + 1,
        success: false
      });
      
      try { window.dispatchEvent(new CustomEvent('chat-response', { detail: { ok: false } })); } catch {}
    } finally {
      setLoading(false);
    }
  };

  const container = (
    <Paper elevation={10} sx={{ width: { xs: '100%', sm: 360 }, height: { xs: '60vh', sm: 480 }, display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 1.25, bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">✨ Ask Shaun AI</Typography>
        {!embedded && (
          <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'primary.contrastText' }} aria-label="Close chat">
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Box ref={listRef} sx={{ flex: 1, p: 1.25, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {messages.map((m, i) => (<Message key={i} role={m.role} content={m.content} />))}
        {loading && (
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Avatar sx={{ width: 28, height: 28 }}>AI</Avatar>
            <Paper variant="outlined" sx={{ p: 1.25, bgcolor: 'background.paper', borderColor: 'divider' }}>
              <TypingIndicator />
            </Paper>
          </Stack>
        )}
      </Box>
      <Box sx={{ p: 1.25, borderTop: '1px solid', borderColor: 'divider' }}>
        {disabled && (<Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>Chat is disabled with necessary-only cookies. Update your cookie preferences to use the assistant.</Typography>)}
        <Stack direction="row" spacing={1}>
          <TextField value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} size="small" fullWidth placeholder="Ask about pricing, services, or Shaun…" disabled={loading || disabled} />
          <Button variant="contained" onClick={handleSend} disabled={loading || disabled}>Send</Button>
          {disabled && (<Button variant="outlined" color="inherit" onClick={() => window.dispatchEvent(new Event('cookie-consent-open'))}>Cookie Settings</Button>)}
        </Stack>
      </Box>
    </Paper>
  );

  if (embedded) return <Box sx={{ maxWidth: 720, mx: 'auto' }}>{container}</Box>;

  return (
    <Box sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: (t) => t.zIndex.modal + 2 }}>
      {open ? (
        container
      ) : (
        <Tooltip title="Chat with Shaun AI">
          <IconButton color="primary" onClick={() => { setOpen(true); try { window.dispatchEvent(new CustomEvent('chat-opened')); } catch {} }} sx={{ bgcolor: 'background.paper', boxShadow: 3 }} size="large" aria-label="Open chat">
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
