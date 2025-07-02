import React from 'react';
import { Container, Typography, Box, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Terms = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Terms of Service</Typography>
      </Breadcrumbs>
      
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Service
        </Typography>
        
        <Typography variant="body1" paragraph>
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to shaunfitzgarald.com. These Terms of Service govern your use of our website and the services we provide. By accessing or using our website, you agree to be bound by these Terms.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          2. Use of the Website
        </Typography>
        <Typography variant="body1" paragraph>
          You may use our website for lawful purposes only. You agree not to use the website in any way that violates any applicable local, state, national, or international law or regulation.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          3. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          The content on this website, including text, graphics, logos, images, and software, is the property of Shaun Fitzgarald and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content from this website without prior written permission.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          4. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          In no event shall Shaun Fitzgarald be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          5. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these Terms at any time. We will provide notice of any material changes by updating the "Last Updated" date at the top of this page. Your continued use of the website after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide by them.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          6. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at shaun@shaunfitzgarald.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Terms;
