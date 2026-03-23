import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, IconButton, Typography, TextField, Button, Stack, Avatar, Tooltip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { sendChat } from '../services/aiService';
import { trackChatEvent, startChatSession, updateChatSession, endChatSession } from '../utils/analytics';

const CONSENT_STORAGE_KEY = 'cookieConsent.v1';
function readConsent() {
  try { const raw = localStorage.getItem(CONSENT_STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

// Typing indicator component
const TypingIndicator = () => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>AI is typing</Typography>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
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
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
      {!isUser && (<Avatar sx={{ width: 28, height: 28, background: 'rgba(255,255,255,0.1)', color: '#00E5FF', fontSize: '0.75rem', fontWeight: 700 }}>AI</Avatar>)}
      <Paper elevation={0} sx={{ p: 1.5, borderRadius: '16px', borderBottomRightRadius: isUser ? 0 : '16px', borderBottomLeftRadius: !isUser ? 0 : '16px', background: isUser ? 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)' : 'rgba(255,255,255,0.05)', border: isUser ? 'none' : '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{content}</Typography>
      </Paper>
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

  // Listen for remote open events from anywhere in the app (like the About card button)
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('chat-opened', handleOpen);
    document.addEventListener('chat-opened', handleOpen);
    return () => {
      window.removeEventListener('chat-opened', handleOpen);
      document.removeEventListener('chat-opened', handleOpen);
    };
  }, []);

  // Track chat session when widget opens
  useEffect(() => {
    if (open) {
      trackChatEvent('chat_opened', { sessionId });
      startChatSession(sessionId);
    }
  }, [open, sessionId]);

  // Track session end when component unmounts or chat closes
  useEffect(() => {
    return () => {
      if (open && messages.length > 1) {
        const sessionDuration = Date.now() - sessionStartTime;
        endChatSession(sessionId, {
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
    
    // Update chat session with user message
    updateChatSession(sessionId, {
      role: 'user',
      content: text,
      messageType: 'user_message'
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
      
      // Update chat session with assistant response
      updateChatSession(sessionId, {
        role: 'assistant',
        content: reply,
        messageType: 'assistant_response'
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
    <Paper elevation={0} sx={{ width: { xs: '100%', sm: 380 }, height: { xs: '60vh', sm: 540 }, display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(20, 20, 30, 0.65)', backdropFilter: 'blur(24px)', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
      <Box sx={{ p: 2, background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.2) 0%, rgba(0, 229, 255, 0.2) 100%)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700 }}>✨ Ask Shaun AI</Typography>
        {!embedded && (
          <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'white', background: 'rgba(255,255,255,0.1)', '&:hover': { background: 'rgba(255,255,255,0.2)' } }} aria-label="Close chat">
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Box ref={listRef} sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.map((m, i) => (<Message key={i} role={m.role} content={m.content} />))}
        {loading && (
          <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ maxWidth: '85%' }}>
            <Avatar sx={{ width: 28, height: 28, background: 'rgba(255,255,255,0.1)', color: '#00E5FF', fontSize: '0.75rem', fontWeight: 700 }}>AI</Avatar>
            <Paper elevation={0} sx={{ p: 1.5, borderRadius: '16px', borderBottomLeftRadius: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <TypingIndicator />
            </Paper>
          </Stack>
        )}
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(0,0,0,0.2)' }}>
        {disabled && (<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1, display: 'block' }}>Chat is disabled with necessary-only cookies.</Typography>)}
        <Stack direction="row" spacing={1.5}>
          <TextField 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} 
            size="small" 
            fullWidth 
            placeholder="Ask about pricing, services..." 
            disabled={loading || disabled} 
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.05)',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                '&.Mui-focused fieldset': { borderColor: '#00E5FF' },
              },
              '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSend} 
            disabled={loading || disabled}
            sx={{
              borderRadius: '50px',
              minWidth: 'unset',
              px: { xs: 2, sm: 3 },
              background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
              color: 'white',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(123, 97, 255, 0.4)',
              '&.Mui-disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
            }}
          >
            Send
          </Button>
          {disabled && (<Button variant="outlined" onClick={() => window.dispatchEvent(new Event('cookie-consent-open'))} sx={{ borderRadius: '50px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Settings</Button>)}
        </Stack>
      </Box>
    </Paper>
  );

  if (embedded) return <Box sx={{ maxWidth: 720, mx: 'auto' }}>{container}</Box>;

  return (
    <Box sx={{ position: 'fixed', right: { xs: 16, sm: 24 }, bottom: { xs: 100, sm: 24 }, zIndex: (t) => t.zIndex.modal + 2 }}>
      {open ? (
        container
      ) : (
        <Tooltip title="Chat with Shaun AI" placement="left">
          <IconButton 
            onClick={() => { setOpen(true); try { window.dispatchEvent(new CustomEvent('chat-opened')); } catch {} }} 
            sx={{ 
              background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)', 
              color: 'white',
              boxShadow: '0 4px 20px rgba(123, 97, 255, 0.6)', 
              p: 2,
              '&:hover': {
                background: 'linear-gradient(135deg, #6A50E5 0%, #00CDE5 100%)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }} 
            aria-label="Open chat"
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
