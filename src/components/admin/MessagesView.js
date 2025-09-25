import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  MarkEmailUnread as MarkUnreadIcon,
  MoreVert as MoreIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

const MessagesView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      setLoading(false);
    }, (error) => {
      console.error('Error loading messages:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setViewDialogOpen(true);
  };

  const handleMarkAsRead = async (messageId, isRead) => {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: !isRead });
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, 'messages', messageId));
      setViewDialogOpen(false);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleMenuOpen = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessageId(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

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
        Contact Messages
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage all contact form submissions from your website visitors.
      </Typography>

      {messages.length === 0 ? (
        <Alert severity="info">
          No messages found. Contact form submissions will appear here.
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} hover>
                  <TableCell>
                    <Chip
                      label={message.read ? 'Read' : 'Unread'}
                      color={message.read ? 'default' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{message.name || 'N/A'}</TableCell>
                  <TableCell>{message.email || 'N/A'}</TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {message.subject || 'No Subject'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon sx={{ mr: 1, fontSize: 16 }} />
                      {formatDate(message.timestamp)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Message">
                      <IconButton
                        size="small"
                        onClick={() => handleViewMessage(message)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, message.id)}
                    >
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Message Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 1 }} />
            Message Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  From:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body1">
                    {selectedMessage.name || 'Anonymous'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body1">
                    {selectedMessage.email || 'No email provided'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Subject:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SubjectIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body1">
                    {selectedMessage.subject || 'No Subject'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body1">
                    {formatDate(selectedMessage.timestamp)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Message:
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: '#000000' }}>
                    {selectedMessage.message || selectedMessage.content || 'No message content'}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>
            Close
          </Button>
          {selectedMessage && (
            <>
              <Button
                onClick={() => handleMarkAsRead(selectedMessage.id, selectedMessage.read)}
                startIcon={selectedMessage.read ? <MarkUnreadIcon /> : <MarkReadIcon />}
              >
                {selectedMessage.read ? 'Mark as Unread' : 'Mark as Read'}
              </Button>
              <Button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const message = messages.find(m => m.id === selectedMessageId);
            if (message) {
              handleMarkAsRead(message.id, message.read);
            }
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            {messages.find(m => m.id === selectedMessageId)?.read ? 
              <MarkUnreadIcon fontSize="small" /> : 
              <MarkReadIcon fontSize="small" />
            }
          </ListItemIcon>
          <ListItemText>
            {messages.find(m => m.id === selectedMessageId)?.read ? 
              'Mark as Unread' : 
              'Mark as Read'
            }
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteMessage(selectedMessageId);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MessagesView;
