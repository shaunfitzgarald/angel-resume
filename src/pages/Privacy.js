import React from 'react';
import { Container, Typography, Box, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Privacy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Privacy Policy</Typography>
      </Breadcrumbs>
      
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph>
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          When you use our contact form, we collect the information you provide to us, including your name, email address, and any message content. This information is used solely for the purpose of responding to your inquiries.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">Respond to your inquiries and communications</Typography>
          </li>
          <li>
            <Typography variant="body1">Improve our website and services</Typography>
          </li>
          <li>
            <Typography variant="body1">Comply with legal obligations</Typography>
          </li>
        </ul>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          3. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          4. Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          We may use third-party services, such as Firebase, to store and process your information. These third parties have their own privacy policies addressing how they use such information.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          5. Cookies and Analytics
        </Typography>
        <Typography variant="body1" paragraph>
          Our website may use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          6. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at shaun@shaunfitzgarald.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Privacy;
