import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Email } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/shaunfitzgarald', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://linkedin.com/in/shaunfitzgarald', label: 'LinkedIn' },
    { icon: <Twitter />, url: 'https://twitter.com/shaunfitzgarald', label: 'Twitter' },
    { icon: <Email />, url: 'mailto:shaun@shaunfitzgarald.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        background: 'rgba(11, 15, 25, 0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          <Stack direction="row" spacing={2}>
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                component={Link}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'translateY(-3px)',
                    background: 'rgba(123, 97, 255, 0.1)',
                  },
                }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Stack>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Designed & Built by Shaun Fitzgarald
            </Typography>
            <Typography variant="caption" color="text.disabled">
              © {currentYear} All Rights Reserved
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
