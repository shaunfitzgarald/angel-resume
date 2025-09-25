import React, { useState, useEffect } from 'react';
import { analytics } from '../../firebase';
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
  Button,
  LinearProgress
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  MouseIcon as ClickIcon,
  ExitToApp as ExitIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

const WebsiteAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('7'); // days
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // In a real implementation, you would fetch analytics data from Firebase Analytics
    // or Google Analytics API. For now, we'll use mock data.
    loadAnalyticsData();
  }, [dateFilter]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData({
        totalViews: 1247,
        uniqueVisitors: 892,
        averageSessionDuration: 245, // seconds
        bounceRate: 34.2,
        topPages: [
          { path: '/', views: 456, title: 'Home/About', icon: <HomeIcon /> },
          { path: '/pricing', views: 234, title: 'Pricing', icon: <MoneyIcon /> },
          { path: '/projects', views: 189, title: 'Projects', icon: <CodeIcon /> },
          { path: '/contact', views: 156, title: 'Contact', icon: <EmailIcon /> },
          { path: '/experience', views: 134, title: 'Experience', icon: <WorkIcon /> },
          { path: '/skills', views: 78, title: 'Skills', icon: <CodeIcon /> }
        ],
        trafficSources: [
          { source: 'Direct', visitors: 456, percentage: 51.1 },
          { source: 'Google Search', visitors: 234, percentage: 26.2 },
          { source: 'Social Media', visitors: 123, percentage: 13.8 },
          { source: 'Referral', visitors: 79, percentage: 8.9 }
        ],
        deviceTypes: [
          { type: 'Desktop', visitors: 567, percentage: 63.6 },
          { type: 'Mobile', visitors: 267, percentage: 29.9 },
          { type: 'Tablet', visitors: 58, percentage: 6.5 }
        ],
        recentActivity: [
          { time: '2 minutes ago', action: 'Page view', page: '/pricing', user: 'Anonymous' },
          { time: '5 minutes ago', action: 'Chat started', page: '/', user: 'Anonymous' },
          { time: '8 minutes ago', action: 'Contact form', page: '/contact', user: 'john@example.com' },
          { time: '12 minutes ago', action: 'Page view', page: '/projects', user: 'Anonymous' },
          { time: '15 minutes ago', action: 'Page view', page: '/', user: 'Anonymous' }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getPageIcon = (path) => {
    const page = analyticsData?.topPages.find(p => p.path === path);
    return page?.icon || <VisibilityIcon />;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!analyticsData) {
    return (
      <Alert severity="error">
        Failed to load analytics data. Please try again.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Website Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Track website performance, user behavior, and traffic patterns.
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
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              onClick={loadAnalyticsData}
              disabled={loading}
            >
              Refresh Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VisibilityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Page Views</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.totalViews.toLocaleString()}
              </Typography>
              <Typography color="text.secondary">
                Total views in the last {dateFilter} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Unique Visitors</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.uniqueVisitors.toLocaleString()}
              </Typography>
              <Typography color="text.secondary">
                Individual visitors
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
                {formatDuration(analyticsData.averageSessionDuration)}
              </Typography>
              <Typography color="text.secondary">
                Average session time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ExitIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Bounce Rate</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {analyticsData.bounceRate}%
              </Typography>
              <Typography color="text.secondary">
                Single-page sessions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Top Pages */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Top Pages
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Page</TableCell>
                    <TableCell align="right">Views</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.topPages.map((page, index) => (
                    <TableRow key={page.path}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {page.icon}
                          <Box sx={{ ml: 1 }}>
                            <Typography variant="body2" fontWeight="medium">
                              {page.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {page.path}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {page.views.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Box sx={{ width: 60, mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(page.views / analyticsData.topPages[0].views) * 100}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant="caption">
                            {((page.views / analyticsData.totalViews) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Traffic Sources */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Traffic Sources
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell align="right">Visitors</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.trafficSources.map((source) => (
                    <TableRow key={source.source}>
                      <TableCell>
                        <Chip
                          label={source.source}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {source.visitors.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Box sx={{ width: 60, mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={source.percentage}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant="caption">
                            {source.percentage}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Device Types */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Device Types
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Device</TableCell>
                    <TableCell align="right">Visitors</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.deviceTypes.map((device) => (
                    <TableRow key={device.type}>
                      <TableCell>
                        <Chip
                          label={device.type}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {device.visitors.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Box sx={{ width: 60, mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={device.percentage}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant="caption">
                            {device.percentage}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Page</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.recentActivity.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={activity.action}
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getPageIcon(activity.page)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {activity.page}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {activity.user}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> This is a demonstration of the website analytics interface. 
          To implement real analytics tracking, you'll need to:
          <br />
          1. Set up Firebase Analytics or Google Analytics
          <br />
          2. Implement custom event tracking throughout your app
          <br />
          3. Create API endpoints to fetch analytics data
        </Typography>
      </Alert>
    </Box>
  );
};

export default WebsiteAnalytics;
