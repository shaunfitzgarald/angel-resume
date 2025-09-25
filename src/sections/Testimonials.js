import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  CircularProgress,
  Alert,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Star as StarIcon,
  Business as BusinessIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to clean testimonial content from CSS artifacts
  const cleanTestimonialContent = (content) => {
    if (!content) return 'No content available';
    
    // Remove CSS code that might be embedded in the content
    let cleaned = content
      // Remove the exact CSS pattern we're seeing
      .replace(/;font-size:4rem;color:#0ACF83;position:absolute;top:-10px;left:-10px;opacity:0\.3;font-family:serif;\}\}\;\s*/g, '')
      // Remove any CSS properties that might be embedded
      .replace(/font-size:\d+rem;color:[^;]+;position:[^;]+;top:[^;]+;left:[^;]+;opacity:[^;]+;font-family:[^;]+;\}\}\;\s*/g, '')
      // Remove any CSS-like patterns
      .replace(/[;{}#0-9]+rem[;{}#0-9]+color[;{}#0-9]+position[;{}#0-9]+absolute[;{}#0-9]+top[;{}#0-9]+left[;{}#0-9]+opacity[;{}#0-9]+font-family[;{}#0-9]+serif[;{}#0-9]+/g, '')
      // Remove any remaining CSS artifacts - be more aggressive
      .replace(/[;{}#0-9]+rem[^a-zA-Z]*/g, '')
      .replace(/color:[^;]+;/g, '')
      .replace(/position:[^;]+;/g, '')
      .replace(/top:[^;]+;/g, '')
      .replace(/left:[^;]+;/g, '')
      .replace(/opacity:[^;]+;/g, '')
      .replace(/font-family:[^;]+;/g, '')
      .replace(/[{};]/g, '')
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();
    
    return cleaned;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Simplified approach - just use the simple query to avoid async issues
    const q = query(collection(db, 'testimonials'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allTestimonials = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filter visible testimonials in JavaScript
      const visibleTestimonials = allTestimonials.filter(testimonial => 
        testimonial.isVisible === true
      );
      
      // Sort by createdAt in JavaScript
      visibleTestimonials.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return bTime - aTime; // Descending order
      });
      
      console.log('Testimonials loaded:', visibleTestimonials);
      setTestimonials(visibleTestimonials);
      setLoading(false);
    }, (error) => {
      console.error('Error loading testimonials:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={isVisible} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2
              }}
            >
              Client Testimonials
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 300,
                maxWidth: '600px',
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              See what my clients have to say about working with me
            </Typography>
          </Box>
        </Fade>

        {testimonials.length === 0 ? (
          <Fade in={isVisible} timeout={1500}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                p: 6,
                maxWidth: '600px',
                mx: 'auto'
              }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    mb: 2,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  ✨ No Testimonials Yet
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 300,
                    mb: 3,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  Client testimonials will appear here once they're added
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  Check back soon to see what my clients have to say about their amazing projects!
                </Typography>
              </Box>
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} lg={4} key={testimonial.id}>
                <Fade 
                  in={isVisible} 
                  timeout={1000 + (index * 200)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating
                          value={testimonial.rating || 5}
                          readOnly
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: '#666666' }}>
                          ({testimonial.rating || 5}/5)
                        </Typography>
                      </Box>

                      {/* Testimonial Content */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          mb: 3,
                          color: '#333333',
                          position: 'relative',
                          '&::before': {
                            content: '"',
                            fontSize: '4rem',
                            color: theme.palette.primary.main,
                            position: 'absolute',
                            top: -10,
                            left: -10,
                            opacity: 0.3,
                            fontFamily: 'serif'
                          }
                        }}
                      >
                        {cleanTestimonialContent(testimonial.content)}
                      </Typography>

                      {/* Client Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                        <Avatar
                          src={testimonial.avatar}
                          sx={{
                            width: 56,
                            height: 56,
                            mr: 2,
                            border: '3px solid',
                            borderColor: 'primary.main'
                          }}
                        >
                          {testimonial.name?.charAt(0) || <PersonIcon />}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333333' }}>
                            {testimonial.name || 'Anonymous Client'}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <BusinessIcon sx={{ mr: 1, fontSize: 16, color: '#666666' }} />
                            <Typography variant="body2" sx={{ color: '#666666' }}>
                              {testimonial.role && testimonial.company 
                                ? `${testimonial.role} at ${testimonial.company}`
                                : testimonial.company || testimonial.role || 'Client'
                              }
                            </Typography>
                          </Box>
                          {testimonial.project && (
                            <Chip
                              label={testimonial.project}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Call to Action */}
        <Fade in={isVisible} timeout={2000}>
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 2,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Ready to work together?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 300,
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Let's create something amazing for your business
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Testimonials;
