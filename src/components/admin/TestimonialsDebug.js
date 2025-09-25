import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';

const TestimonialsDebug = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const testTestimonials = async () => {
    setLoading(true);
    try {
      // Get all testimonials
      const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
      const allTestimonials = testimonialsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('All testimonials:', allTestimonials);

      setResults({
        total: allTestimonials.length,
        testimonials: allTestimonials,
        visible: allTestimonials.filter(t => t.isVisible === true),
        hidden: allTestimonials.filter(t => t.isVisible !== true)
      });
    } catch (error) {
      console.error('Error testing testimonials:', error);
      setResults({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Testimonials Debug
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This component helps debug testimonials data.
      </Typography>

      <Button
        variant="contained"
        onClick={testTestimonials}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={20} /> : 'Test Testimonials Collection'}
      </Button>

      {results && (
        <Paper sx={{ p: 2 }}>
          {results.error ? (
            <Alert severity="error">
              Error: {results.error}
            </Alert>
          ) : (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                Testimonials test completed successfully!
              </Alert>
              
              <Typography variant="h6" gutterBottom>
                Collection Summary:
              </Typography>
              <Typography variant="body1">
                • Total testimonials: {results.total}
              </Typography>
              <Typography variant="body1">
                • Visible testimonials: {results.visible.length}
              </Typography>
              <Typography variant="body1">
                • Hidden testimonials: {results.hidden.length}
              </Typography>

              {results.testimonials.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    All Testimonials:
                  </Typography>
                  {results.testimonials.map((testimonial, index) => (
                    <Box key={testimonial.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Typography variant="body2">
                        {index + 1}. {testimonial.name || 'No name'} - {testimonial.company || 'No company'}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        ID: {testimonial.id}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        isVisible: {String(testimonial.isVisible)} (type: {typeof testimonial.isVisible})
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        createdAt: {testimonial.createdAt?.toDate?.()?.toLocaleString() || 'No timestamp'}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        Content: {testimonial.content?.substring(0, 100)}...
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default TestimonialsDebug;
