import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';

const AnalyticsTest = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const testAnalytics = async () => {
    setLoading(true);
    try {
      // Test analytics collection
      const analyticsQuery = query(collection(db, 'analytics'), orderBy('timestamp', 'desc'), limit(5));
      const analyticsSnapshot = await getDocs(analyticsQuery);
      const analyticsData = analyticsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Test chat sessions collection
      const sessionsQuery = query(collection(db, 'chat_sessions'), orderBy('timestamp', 'desc'), limit(5));
      const sessionsSnapshot = await getDocs(sessionsQuery);
      const sessionsData = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Test messages collection
      const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(5));
      const messagesSnapshot = await getDocs(messagesQuery);
      const messagesData = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setResults({
        analytics: analyticsData,
        sessions: sessionsData,
        messages: messagesData,
        analyticsCount: analyticsData.length,
        sessionsCount: sessionsData.length,
        messagesCount: messagesData.length
      });
    } catch (error) {
      console.error('Error testing analytics:', error);
      setResults({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Analytics Test
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This component helps test if analytics data is being collected properly.
      </Typography>

      <Button
        variant="contained"
        onClick={testAnalytics}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={20} /> : 'Test Analytics Collections'}
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
                Analytics test completed successfully!
              </Alert>
              
              <Typography variant="h6" gutterBottom>
                Collection Counts:
              </Typography>
              <Typography variant="body1">
                • Analytics events: {results.analyticsCount}
              </Typography>
              <Typography variant="body1">
                • Chat sessions: {results.sessionsCount}
              </Typography>
              <Typography variant="body1">
                • Contact messages: {results.messagesCount}
              </Typography>

              {results.analytics.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Analytics Events:
                  </Typography>
                  {results.analytics.map((event, index) => (
                    <Box key={event.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Typography variant="body2">
                        {index + 1}. {event.type} - {event.event || 'N/A'} 
                        {event.timestamp && ` (${event.timestamp.toDate?.()?.toLocaleString() || 'No timestamp'})`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {results.sessions.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Chat Sessions:
                  </Typography>
                  {results.sessions.map((session, index) => (
                    <Box key={session.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Typography variant="body2">
                        {index + 1}. Session {session.sessionId} - {session.messageCount || 0} messages
                        {session.timestamp && ` (${session.timestamp.toDate?.()?.toLocaleString() || 'No timestamp'})`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {results.messages.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Contact Messages:
                  </Typography>
                  {results.messages.map((message, index) => (
                    <Box key={message.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Typography variant="body2">
                        {index + 1}. From: {message.name || 'Anonymous'} - {message.subject || 'No subject'}
                        {message.timestamp && ` (${message.timestamp.toDate?.()?.toLocaleString() || 'No timestamp'})`}
                      </Typography>
                      {message.message && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                          Message: {message.message.substring(0, 100)}...
                        </Typography>
                      )}
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

export default AnalyticsTest;
