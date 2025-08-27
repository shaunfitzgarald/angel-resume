import React, { useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Button, useTheme, useMediaQuery, keyframes } from '@mui/material';
import { 
  Person as PersonIcon,
  EmojiEmotions as AboutIcon, 
  LocationOn as LocationIcon 
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import shaunAvatar from '../assets/shaun.png'; // TODO: Replace with Shaun's image

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  }
};

const floatingAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  return (
    <Box 
      component={motion.div}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={container}
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150%',
          height: '200%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, transparent 50%)`,
          borderRadius: '50%',
          zIndex: -1,
          opacity: 0.5,
          animation: `${floatingAnimation} 15s ease-in-out infinite`
        }
      }}
    >
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8,
          mb: 4
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              position: 'relative',
              maxWidth: 300,
              mx: { xs: 'auto', md: 0 },
              '&:hover': {
                '& img': { transform: 'scale(1.02)', boxShadow: 8 },
                '&:after': { opacity: 0.7, transform: 'translate(10px, 10px)' }
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
                  height: 'auto',
                  borderRadius: '50%',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: 4,
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <motion.div variants={item}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 900,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '10px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}70)`,
                    borderRadius: '10px',
                    zIndex: -1,
                    filter: 'blur(5px)'
                  }
                }}
              >
                Hey there! 👋
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography 
                variant="h5" 
                component="h2" 
                color="textSecondary" 
                gutterBottom
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  maxWidth: '800px',
                  px: 2
                }}
              >
                I'm Shaun, a Full Stack Developer & Creative Problem Solver
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: '700px', 
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  px: 2,
                  color: 'text.primary',
                  '&::first-letter': {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    float: 'left',
                    lineHeight: 1,
                    mr: 1,
                    mt: 0.5
                  }
                }}
                component={motion.p}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.6 }
                }}
              >
                This is what I do: I build modern web applications that solve real problems. 
                Whether you need a sleek business website, a custom web app, or help bringing 
                your digital vision to life, I've got you covered. I love turning complex ideas 
                into simple, beautiful, and functional solutions.
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2, 
                alignItems: 'center'
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/experience"
                  component={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: '50px',
                    boxShadow: `0 4px 0 ${theme.palette.primary.dark}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 0 ${theme.palette.primary.dark}`
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  View My Experience
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  href="/contact"
                  component={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    borderRadius: '50px',
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Let's Work Together
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

          
      {/* About Details Section */}
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
        <motion.div variants={item}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ 
            mb: 4, 
            color: 'primary.main',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            More About Me
          </Typography>
        </motion.div>
        
        <motion.div variants={item}>
          <Grid container spacing={4} alignItems="stretch">
            
          {/* Who am I & How I Work */}
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
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                <PersonIcon color="primary" sx={{ mr: 1, fontSize: 'inherit' }} />
                Who am I?
              </Typography>
              <Typography paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
                I'm a full-stack developer with a passion for creating modern, user-focused web applications. 
                Currently pursuing my Computer Science degree while building real solutions for clients. 
                I thrive in fast-paced environments and excel at translating complex technical requirements 
                into clean, functional code that solves real problems.
              </Typography>
              
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: 3,
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                <AboutIcon color="primary" sx={{ mr: 1, fontSize: 'inherit' }} />
                How I Work
              </Typography>
              <Typography paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
                I believe in clear communication and collaborative problem-solving. Whether working with 
                clients to understand their vision or debugging complex technical issues, I approach every 
                challenge with patience and attention to detail.
              </Typography>
              <Typography paragraph sx={{ lineHeight: 1.8 }}>
                My experience managing multiple client projects while attending school full-time has taught me 
                excellent time management and prioritization skills. I deliver quality work on deadline and 
                maintain open communication throughout the development process.
              </Typography>
            </Paper>
          </Grid>

          {/* Location & Contact: Map + Contact Button */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              borderRadius: 2, 
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
                Location & Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>San Diego, California</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Hillcrest, San Diego, CA 92103
                  </Typography>
                </Box>
                {/* Google Maps Embed */}
                <Box sx={{ 
                  width: '100%', 
                  height: 250, 
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
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <Button variant="contained" color="primary" size="large" href="/contact">
                    Contact Me
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
          </Grid>
        </motion.div>
      </Box>
    </Container>
    </Box>
  );
};

export default About;
