import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { 
  Person as PersonIcon,
  EmojiEmotions as AboutIcon, 
  LocationOn as LocationIcon 
} from '@mui/icons-material';

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
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
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
                src="/angel-avatar.jpg"
                alt="Angel Ramirez"
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
            
            <Paper elevation={3} sx={{ 
              p: 3, 
              borderRadius: 2, 
              flex: 1, 
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
                  Open to opportunities in the area
                </Typography>
                
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
                  angel.ramirez@example.com
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Phone:</Box>
                  (555) 123-4567
                </Typography>
                <Typography variant="body2">
                  <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Military Status:</Box>
                  U.S. Army Reserve
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
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
                I'm a dedicated and compassionate individual with a strong background in caregiving and customer service.
                My experience in the U.S. Army Reserve has instilled in me discipline, teamwork, and the ability to
                perform well under pressure. I'm passionate about helping others and always strive to make a positive
                impact in my community.
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
