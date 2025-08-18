import React, { useEffect } from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery, keyframes } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

const Home = () => {
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
        textAlign: 'center', 
        py: 8,
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
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '30px',
          height: '30px',
          background: theme.palette.primary.main,
          borderRadius: '50%',
          filter: 'blur(5px)',
          zIndex: -1,
          opacity: 0.2,
          animation: `${floatingAnimation} 8s ease-in-out infinite reverse`
        }
      }}
    >
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
          Shaun's Resume
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
            mx: 'auto',
            px: 2
          }}
        >
          Full Stack Developer & Creative Problem Solver
        </Typography>
      </motion.div>

      <motion.div variants={item}>
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '700px', 
            mx: 'auto',
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
          Welcome to my professional portfolio. I'm passionate about creating beautiful, 
          functional, and user-centered digital experiences. With a strong foundation in 
          both design and development, I bring ideas to life through code.
        </Typography>
      </motion.div>

      <motion.div variants={item}>
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2, 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            component={motion.a}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Resume_Stephenson_Shaun.pdf"
            download
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
            Download Resume
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="#contact"
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
            Contact Me
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;
