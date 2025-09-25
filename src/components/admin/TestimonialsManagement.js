import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Rating,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    content: '',
    rating: 5,
    isVisible: true,
    avatar: '',
    project: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const testimonialsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(testimonialsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenDialog = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name || '',
        company: testimonial.company || '',
        role: testimonial.role || '',
        content: testimonial.content || '',
        rating: testimonial.rating || 5,
        isVisible: testimonial.isVisible !== false,
        avatar: testimonial.avatar || '',
        project: testimonial.project || ''
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        company: '',
        role: '',
        content: '',
        rating: 5,
        isVisible: true,
        avatar: '',
        project: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      company: '',
      role: '',
      content: '',
      rating: 5,
      isVisible: true,
      avatar: '',
      project: ''
    });
  };

  const handleSubmit = async () => {
    try {
      const testimonialData = {
        ...formData,
        createdAt: editingTestimonial ? editingTestimonial.createdAt : new Date(),
        updatedAt: new Date()
      };

      if (editingTestimonial) {
        await updateDoc(doc(db, 'testimonials', editingTestimonial.id), testimonialData);
      } else {
        await addDoc(collection(db, 'testimonials'), testimonialData);
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', testimonialId));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const handleToggleVisibility = async (testimonial) => {
    try {
      await updateDoc(doc(db, 'testimonials', testimonial.id), {
        isVisible: !testimonial.isVisible
      });
    } catch (error) {
      console.error('Error updating testimonial visibility:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Testimonials Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage client testimonials and reviews for your website.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Testimonial
        </Button>
      </Box>

      {testimonials.length === 0 ? (
        <Alert severity="info">
          No testimonials found. Add your first testimonial to get started.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} lg={4} key={testimonial.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{ mr: 2, width: 56, height: 56 }}
                    >
                      {testimonial.name?.charAt(0) || <PersonIcon />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {testimonial.name || 'Anonymous'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role && testimonial.company 
                          ? `${testimonial.role} at ${testimonial.company}`
                          : testimonial.company || testimonial.role || 'Client'
                        }
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating
                      value={testimonial.rating || 5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({testimonial.rating || 5}/5)
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, minHeight: 60 }}>
                    {testimonial.content || 'No content provided.'}
                  </Typography>

                  {testimonial.project && (
                    <Chip
                      label={testimonial.project}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip
                      icon={testimonial.isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      label={testimonial.isVisible ? 'Visible' : 'Hidden'}
                      color={testimonial.isVisible ? 'success' : 'default'}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(testimonial.createdAt)}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(testimonial)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleVisibility(testimonial)}
                  >
                    {testimonial.isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(testimonial.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Testimonial Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role/Title"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Avatar URL (optional)"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                helperText="URL to client's profile picture"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Rating:
                </Typography>
                <Rating
                  value={formData.rating}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, rating: newValue });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Testimonial Content"
                multiline
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                helperText="The testimonial text that will be displayed"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  />
                }
                label="Visible on website"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.content}
          >
            {editingTestimonial ? 'Update' : 'Add'} Testimonial
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestimonialsManagement;
