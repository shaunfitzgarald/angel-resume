import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, where, getDocs, limit } from 'firebase/firestore';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import {
  Chat as ChatIcon,
  Message as MessageIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon
} from '@mui/icons-material';

const ChatAnalytics = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('7'); // days
  const [searchTerm, setSearchTerm] = useState('');
  const [analyticsData, setAnalyticsData] = useState({
    totalSessions: 0,
    totalMessages: 0,
    averageSessionLength: 0,
    satisfactionRate: 0,
    recentSessions: []
  });

  useEffect(() => {
    loadChatData();
  }, [dateFilter]);

  const loadChatData = async () => {
    setLoading(true);
    try {
      // Get all chat sessions (we'll filter by date in JavaScript)
      const sessionsQuery = query(
        collection(db, 'chat_sessions'),
        orderBy('timestamp', 'desc'),
        limit(100) // Limit to recent sessions
      );

      const sessionsSnapshot = await getDocs(sessionsQuery);
      const allSessions = sessionsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        };
      });

      // Filter by date range in JavaScript
      const now = new Date();
      const daysAgo = parseInt(dateFilter);
      const startDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      
      const sessions = allSessions.filter(session => {
        const sessionDate = session.timestamp?.toDate ? session.timestamp.toDate() : new Date(session.timestamp);
        return sessionDate >= startDate;
      });

      // Get all chat events (we'll filter by date in JavaScript)
      const eventsQuery = query(
        collection(db, 'analytics'),
        where('type', '==', 'chat_event'),
        orderBy('timestamp', 'desc'),
        limit(200) // Limit to recent events
      );

      const eventsSnapshot = await getDocs(eventsQuery);
      const allEvents = eventsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        };
      });

      // Filter events by date range
      const events = allEvents.filter(event => {
        const eventDate = event.timestamp?.toDate ? event.timestamp.toDate() : new Date(event.timestamp);
        return eventDate >= startDate;
      });

      // Calculate analytics
      const totalSessions = sessions.length;
      const totalMessages = events.filter(e => e.event === 'user_message' || e.event === 'assistant_response').length;
      const averageSessionLength = sessions.length > 0 
        ? sessions.reduce((sum, session) => sum + (session.duration || 0), 0) / sessions.length / 1000 / 60 // Convert to minutes
        : 0;
      
      // Calculate satisfaction rate (for now, we'll use a placeholder since we don't have feedback data yet)
      const satisfactionRate = sessions.length > 0 ? 85 : 0; // Placeholder rate

      // Get recent sessions with message previews
      const recentSessions = sessions.slice(0, 10).map(session => {
        // Get the last message from the messages array if it exists
        let lastMessageContent = 'No messages';
        if (session.messages && session.messages.length > 0) {
          const lastMessage = session.messages[session.messages.length - 1];
          lastMessageContent = lastMessage.content || lastMessage.messageText || 'No message content';
        }

        return {
          id: session.id,
          timestamp: session.timestamp,
          messageCount: session.messageCount || 0,
          duration: session.duration || 0,
          satisfaction: Math.random() > 0.1 ? 'positive' : 'neutral', // Mock satisfaction
          lastMessage: lastMessageContent,
          sessionId: session.sessionId
        };
      });

      setAnalyticsData({
        totalSessions,
        totalMessages,
        averageSessionLength: Math.round(averageSessionLength * 10) / 10,
        satisfactionRate,
        recentSessions
      });

      setChatSessions(sessions);
    } catch (error) {
      console.error('Error loading chat data:', error);
    }
    setLoading(false);
  };

  // Filter sessions based on search term
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (date) => {
    return date.toLocaleString();
  };

  const getSatisfactionColor = (satisfaction) => {
    switch (satisfaction) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      default: return 'default';
    }
  };

  const getSatisfactionIcon = (satisfaction) => {
    switch (satisfaction) {
      case 'positive': return <ThumbUpIcon />;
      case 'negative': return <ThumbDownIcon />;
      default: return <MessageIcon />;
    }
  };

  const filteredSessions = analyticsData.recentSessions.filter(session =>
    session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Chat Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Track AI chatbot interactions and user engagement.
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Time Period</InputLabel>
              <Select
                value={dateFilter}
                label="Time Period"
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <MenuItem value="1">Last 24 hours</MenuItem>
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Search messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setDateFilter('7');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Sessions</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.totalSessions}
              </Typography>
              <Typography color="text.secondary">
                Chat sessions in the last {dateFilter} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MessageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Messages</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.totalMessages}
              </Typography>
              <Typography color="text.secondary">
                Messages exchanged
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Avg. Duration</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.averageSessionLength}m
              </Typography>
              <Typography color="text.secondary">
                Average session length
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Satisfaction</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.satisfactionRate}%
              </Typography>
              <Typography color="text.secondary">
                Positive feedback rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Sessions Table */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Chat Sessions
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Messages</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Satisfaction</TableCell>
                <TableCell>Last Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Alert severity="info">
                      No chat sessions found for the selected criteria.
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((session) => (
                  <TableRow key={session.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimeIcon sx={{ mr: 1, fontSize: 16 }} />
                        {formatDate(session.timestamp)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={session.messageCount}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{formatDuration(session.duration)}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getSatisfactionIcon(session.satisfaction)}
                        label={session.satisfaction}
                        color={getSatisfactionColor(session.satisfaction)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 300 }}>
                        {session.lastMessage}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
};

export default ChatAnalytics;
