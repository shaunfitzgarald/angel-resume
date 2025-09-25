import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
  Analytics as AnalyticsIcon,
  RateReview as TestimonialsIcon,
  Logout as LogoutIcon,
  Message as MessageIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon
} from '@mui/icons-material';

// Import admin components (we'll create these next)
import MessagesView from '../components/admin/MessagesView';
import ChatAnalytics from '../components/admin/ChatAnalytics';
import WebsiteAnalytics from '../components/admin/WebsiteAnalytics';
import TestimonialsManagement from '../components/admin/TestimonialsManagement';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  const tabs = [
    { label: 'Dashboard', icon: <DashboardIcon />, component: <DashboardOverview /> },
    { label: 'Messages', icon: <EmailIcon />, component: <MessagesView /> },
    { label: 'Chat Analytics', icon: <ChatIcon />, component: <ChatAnalytics /> },
    { label: 'Website Analytics', icon: <AnalyticsIcon />, component: <WebsiteAnalytics /> },
    { label: 'Testimonials', icon: <TestimonialsIcon />, component: <TestimonialsManagement /> }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {currentUser?.email}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
              />
            ))}
          </Tabs>

          {tabs.map((tab, index) => (
            <TabPanel key={index} value={activeTab} index={index}>
              {tab.component}
            </TabPanel>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MessageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Messages</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                0
              </Typography>
              <Typography color="text.secondary">
                New contact form messages
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => {/* Navigate to messages */}}>
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Chat Sessions</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                0
              </Typography>
              <Typography color="text.secondary">
                AI chatbot interactions
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => {/* Navigate to chat analytics */}}>
                View Analytics
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Page Views</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                0
              </Typography>
              <Typography color="text.secondary">
                Website visits today
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => {/* Navigate to website analytics */}}>
                View Analytics
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Testimonials</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                0
              </Typography>
              <Typography color="text.secondary">
                Published reviews
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => {/* Navigate to testimonials */}}>
                Manage
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        This dashboard provides an overview of your website's activity. Use the tabs above to dive deeper into specific areas.
      </Alert>
    </Box>
  );
};

export default AdminDashboard;
