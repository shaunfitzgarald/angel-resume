import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CONSENT_STORAGE_KEY = 'cookieConsent.v1';

function getStoredConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function storeConsent(level) {
  const payload = {
    level, // 'necessary' | 'all'
    ts: Date.now(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // ignore storage errors
  }
  // Fire a hookable event so analytics or other modules can react
  window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: payload }));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener('cookie-consent-open', onOpen);
    return () => window.removeEventListener('cookie-consent-open', onOpen);
  }, []);

  const handleAcceptAll = () => {
    storeConsent('all');
    setOpen(false);
  };

  const handleNecessaryOnly = () => {
    storeConsent('necessary');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.snackbar + 10,
        p: { xs: 1, sm: 2 },
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(20, 20, 30, 0.6)',
            backdropFilter: 'blur(16px)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
            <Box sx={{ pr: { sm: 2 } }}>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                We use cookies
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We use necessary cookies to make this site work. With your consent, we may use additional cookies for analytics and improvements. See our{' '}
                <Typography component={RouterLink} to="/privacy" variant="body2" color="primary" sx={{ textDecoration: 'underline', display: 'inline' }}>
                  Privacy Policy
                </Typography>
                .
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Button 
                variant="outlined" 
                onClick={handleNecessaryOnly} 
                fullWidth
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  px: 3,
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Accept necessary only
              </Button>
              <Button 
                variant="contained" 
                onClick={handleAcceptAll} 
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: 600,
                  px: 3,
                  boxShadow: '0 4px 14px rgba(123, 97, 255, 0.4)',
                }}
              >
                Accept all cookies
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
