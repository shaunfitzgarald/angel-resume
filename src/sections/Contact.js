import React, { useState, useRef, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  IconButton,
  Snackbar,
  Alert,
  Zoom,
  Fade
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon, 
  LinkedIn as LinkedInIcon, 
  GitHub as GitHubIcon, 
  Twitter as TwitterIcon,
  Send as SendIcon
} from '@mui/icons-material';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Email is sent via Firebase Functions when a new message is added to Firestore

  // Test Firebase connectivity
  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...');
      // Try to get a reference to the messages collection
      const messagesRef = collection(db, 'messages');
      console.log('Firebase connection successful, messages collection reference:', messagesRef);
      return true;
    } catch (error) {
      console.error('Firebase connection test failed:', error);
      return false;
    }
  };

  // Function to save message to Firebase
  const saveToFirebase = async () => {
    try {
      // First test the connection
      const connectionOk = await testFirebaseConnection();
      if (!connectionOk) {
        console.error('Cannot save message: Firebase connection failed');
        return false;
      }
      
      console.log('Attempting to save message to Firebase:', formData);
      
      // Create a test message with timestamp to verify Firestore writes
      const messageData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
        clientTimestamp: new Date().toISOString() // Add client timestamp for verification
      };
      
      console.log('Prepared message data:', messageData);
      
      const docRef = await addDoc(collection(db, 'messages'), messageData);
      
      console.log('Message successfully saved to Firebase with ID:', docRef.id);
      return true;
    } catch (error) {
      console.error('Failed to save message to Firebase:', error);
      console.error('Error details:', error.code, error.message);
      alert('Firebase error: ' + error.message); // Show alert for debugging
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save to Firebase (which triggers the Cloud Function to send email)
      const firebaseSuccess = await saveToFirebase();
      
      if (firebaseSuccess) {
        // Show success message
        setSnackbarMessage('Your message has been sent successfully!');
        setSnackbarSeverity('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        // Show error if Firebase save failed
        setSnackbarMessage('Failed to send message. Please try again later.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setSnackbarMessage('An unexpected error occurred. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const contactMethods = [
    {
      icon: <EmailIcon color="primary" fontSize="large" />,
      title: 'Email',
      value: 'shaun@shaunfitzgarald.com',
      href: 'mailto:shaun@shaunfitzgarald.com'
    },
    {
      icon: <PhoneIcon color="primary" fontSize="large" />,
      title: 'Phone',
      value: '+1 (858) 769-9688',
      href: 'tel:+18587699688'
    },
    {
      icon: <LocationIcon color="primary" fontSize="large" />,
      title: 'Location',
      value: 'San Diego Hillcrest Area, CA',
      href: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      url: 'https://github.com/shaunfitzgarald',
      color: '#333'
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/shaunfitzgarald',
      color: '#0077B5'
    },
    {
      icon: <TwitterIcon />,
      label: 'Twitter',
      url: 'https://twitter.com/shaunfitzgarald',
      color: '#1DA1F2'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          Get In Touch
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth="700px" mx="auto">
          Have a question or want to work together? Feel free to reach out to me!
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Zoom in={isVisible} style={{ transitionDelay: '100ms' }}>
            <Paper elevation={3} sx={{ 
              p: 4, 
              height: '100%', 
              borderRadius: 2,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: (theme) => theme.shadows[10]
              }
            }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
              Contact Information
            </Typography>
            
            {contactMethods.map((method, index) => (
              <Fade in={isVisible} style={{ transitionDelay: `${200 + index * 100}ms` }} key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  mb: 4,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(8px)'
                  }
                }}>
                <Box sx={{ mr: 3, mt: 0.5 }}>
                  {method.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {method.title}
                  </Typography>
                  <Typography 
                    component="a" 
                    href={method.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {method.value}
                  </Typography>
                </Box>
              </Box>
              </Fade>
            ))}

            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Connect With Me
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  aria-label={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: social.color,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease',
                    width: 48,
                    height: 48
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Paper>
          </Zoom>
        </Grid>

        <Grid item xs={12} md={7}>
          <Zoom in={isVisible} style={{ transitionDelay: '300ms' }}>
            <Paper elevation={3} sx={{ 
              p: 4, 
              borderRadius: 2,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: (theme) => theme.shadows[10]
              }
            }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
              Send Me a Message
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Interested in my experience or have a question? I'll get back to you as soon as possible.
            </Typography>
            <form ref={form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid container item spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<SendIcon />}
                  disabled={loading}
                  sx={{
                    mt: 1,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Grid>
            </Grid>
            </form>
          </Paper>
          </Zoom>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
