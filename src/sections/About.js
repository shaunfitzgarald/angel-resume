import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { 
  Person as PersonIcon,
  EmojiEmotions as AboutIcon, 
  LocationOn as LocationIcon 
} from '@mui/icons-material';
import shaunAvatar from '../assets/shaun.png'; // TODO: Replace with Shaun's image

const About = () => {
  
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          mb: 4, 
          color: 'primary.main',
          fontWeight: 600
        }}>
          About Me
        </Typography>
        
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              position: 'relative',
              mb: 3,
              '&:hover': {
                '& img': {
                  transform: 'scale(1.02)',
                  boxShadow: 8
                },
                '&:after': {
                  opacity: 0.7,
                  transform: 'translate(10px, 10px)'
                }
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                top: 15,
                left: 15,
                right: -15,
                bottom: -15,
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: '50%',
                zIndex: -1,
                transition: 'all 0.3s ease',
                opacity: 0.5
              }
            }}>
              <Box
                component="img"
                src={shaunAvatar}
                alt="Shaun Stephenson"
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  height: 'auto',
                  borderRadius: '50%',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: 4,
                  transition: 'all 0.3s ease',
                  display: 'block',
                  mx: 'auto'
                }}
              />
            </Box>
          </Grid>
            
          {/* Location & Contact Info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              borderRadius: 2, 
              height: '100%',
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease-in-out'
              }
            }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ 
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                mb: 3
              }}>
                <LocationIcon color="primary" sx={{ mr: 1, fontSize: 'inherit' }} />
                Location
              </Typography>
              
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                '& > *': { mb: 1 }
              }}>
                <Typography variant="h6">San Diego, California</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  3942 8th Ave #17, San Diego, CA 92103
                </Typography>
                
                {/* Google Maps Embed */}
                <Box sx={{ 
                  width: '100%', 
                  height: 200, 
                  mb: 3,
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26889.42977003!2d-117.16498394999999!3d32.7472569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d954c7f5df33f5%3A0x7cc1e6e25add0087!2sHillcrest%2C%20San%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1656465858000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hillcrest, San Diego Map"
                  />
                </Box>
                
                <Typography variant="subtitle2" sx={{ 
                  mt: 3, 
                  mb: 1, 
                  color: 'text.secondary',
                  fontWeight: 500
                }}>
                  Contact Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Email:</Box>
                  shaun@shaunfitzgarald.com
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Phone:</Box>
                  +1 (858) 769-9688
                </Typography>
                <Typography variant="body2">
                  <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Education:</Box>
                  Computer Science (In Progress)
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Bio Info */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              borderRadius: 2,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease-in-out'
              }
            }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'primary.main',
                  fontWeight: 600
                }}
              >
                <PersonIcon color="primary" sx={{ mr: 1, fontSize: 'inherit' }} />
                Who am I?
              </Typography>
              <Typography paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
                I'm an energetic and detail-oriented professional with strong experience in fast-paced, high-volume environments.
                Skilled in customer service, multitasking, problem-solving, and technical communication. Currently pursuing a
                degree in Computer Science while delivering modern web applications for clients. I'm open to full-time roles
                that value organization, adaptability, and a commitment to quality work.
              </Typography>
              
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: 4,
                  color: 'primary.main',
                  fontWeight: 600
                }}
              >
                <AboutIcon color="primary" sx={{ mr: 1, fontSize: 'inherit' }} />
                What I Do
              </Typography>
              <Typography paragraph sx={{ lineHeight: 1.8 }}>
                With experience in caregiving and customer service, I bring patience, empathy, and strong
                communication skills to every role. I'm committed to providing exceptional care and
                support to those in need, and I'm always looking for opportunities to grow and learn
                new skills.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
