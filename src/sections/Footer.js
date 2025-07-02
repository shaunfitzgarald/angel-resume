import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' shaunfitzgarald.com'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
          Made with <FavoriteIcon sx={{ color: 'red', fontSize: '1rem' }} /> by
          <Link color="inherit" href="https://github.com/shaunfitzgarald">
            shaunfitzgarald
          </Link>
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link component={RouterLink} to="/terms" color="text.secondary" underline="hover" variant="body2">
            Terms of Service
          </Link>
          <Link component={RouterLink} to="/privacy" color="text.secondary" underline="hover" variant="body2">
            Privacy Policy
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
export default Footer;
