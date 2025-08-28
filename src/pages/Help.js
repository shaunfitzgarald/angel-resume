import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ChatWidget from '../components/ChatWidget';

export default function Help() {
  useEffect(() => {
    document.title = 'Help | Shaun Fitzgarald';
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          Help Center
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={760} mx="auto">
          Ask me anything about pricing, services, or my background. The AI assistant is available below.
        </Typography>
      </Box>
      <ChatWidget embedded />
    </Container>
  );
}
