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
          elevation={8}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: (theme) => theme.palette.background.paper,
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
              <Button variant="outlined" color="inherit" onClick={handleNecessaryOnly} fullWidth>
                Accept necessary only
              </Button>
              <Button variant="contained" color="primary" onClick={handleAcceptAll} fullWidth>
                Accept all cookies
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
