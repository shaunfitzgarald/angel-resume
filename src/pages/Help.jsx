import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography } from '@mui/material';
import ChatWidget from '../components/ChatWidget';

export default function Help() {

  return (
    <>
      <Helmet>
        <title>Help Center | Support & FAQs – Shaun Fitzgarald</title>
        <meta
          name="description"
          content="Find answers to common questions about web development services, pricing, and project workflows."
        />
        <link rel="canonical" href="https://shaunfitzgarald.com/help" />
      </Helmet>
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
    </>
  );
}
