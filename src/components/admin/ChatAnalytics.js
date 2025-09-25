import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
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

  useEffect(() => {
    // We'll need to create a chat_sessions collection to track this data
    // For now, we'll show a placeholder structure
    setLoading(false);
  }, [dateFilter]);

  // Mock data for demonstration - replace with real Firestore queries
  const mockChatData = {
    totalSessions: 45,
    totalMessages: 234,
    averageSessionLength: 3.2,
    satisfactionRate: 87,
    recentSessions: [
      {
        id: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        messageCount: 5,
        duration: 180, // seconds
        satisfaction: 'positive',
        lastMessage: 'Thank you for the information about pricing!'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        messageCount: 8,
        duration: 420,
        satisfaction: 'positive',
        lastMessage: 'I\'m interested in the Business Website package.'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        messageCount: 3,
        duration: 90,
        satisfaction: 'neutral',
        lastMessage: 'What are your rates?'
      }
    ]
  };

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

  const filteredSessions = mockChatData.recentSessions.filter(session =>
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
                {mockChatData.totalSessions}
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
                {mockChatData.totalMessages}
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
                {mockChatData.averageSessionLength}m
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
                {mockChatData.satisfactionRate}%
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

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> This is a demonstration of the chat analytics interface. 
          To implement real tracking, you'll need to:
          <br />
          1. Create a chat_sessions collection in Firestore
          <br />
          2. Track user interactions in the ChatWidget component
          <br />
          3. Implement satisfaction feedback collection
        </Typography>
      </Alert>
    </Box>
  );
};

export default ChatAnalytics;
