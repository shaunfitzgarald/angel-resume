import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
        <Typography variant="body2" color="text.secondary" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
          Made with <FavoriteIcon sx={{ color: 'red', fontSize: '1rem' }} /> by
          <Link color="inherit" href="https://github.com/shaunfitzgarald">
            shaunfitzgarald
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
