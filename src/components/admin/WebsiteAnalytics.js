import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
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
    try {
      // Calculate date range
      const now = new Date();
      const daysAgo = parseInt(dateFilter);
      const startDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

      // Get page views (we'll filter by date in JavaScript)
      const pageViewsQuery = query(
        collection(db, 'analytics'),
        where('type', '==', 'page_view'),
        orderBy('timestamp', 'desc'),
        limit(200)
      );

      const pageViewsSnapshot = await getDocs(pageViewsQuery);
      const allPageViews = pageViewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter page views by date range
      const pageViews = allPageViews.filter(pv => {
        const pvDate = pv.timestamp?.toDate ? pv.timestamp.toDate() : new Date(pv.timestamp);
        return pvDate >= startDate;
      });

      // Get user interactions (we'll filter by date in JavaScript)
      const interactionsQuery = query(
        collection(db, 'analytics'),
        where('type', '==', 'user_interaction'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      const interactionsSnapshot = await getDocs(interactionsQuery);
      const allInteractions = interactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter interactions by date range
      const interactions = allInteractions.filter(interaction => {
        const interactionDate = interaction.timestamp?.toDate ? interaction.timestamp.toDate() : new Date(interaction.timestamp);
        return interactionDate >= startDate;
      });

      // Calculate unique visitors
      const uniqueVisitors = new Set(pageViews.map(pv => pv.fingerprint)).size;
      const totalViews = pageViews.length;

      // Calculate page statistics
      const pageStats = {};
      pageViews.forEach(pv => {
        const page = pv.page || '/';
        if (!pageStats[page]) {
          pageStats[page] = { views: 0, title: getPageTitle(page) };
        }
        pageStats[page].views++;
      });

      const topPages = Object.entries(pageStats)
        .map(([path, stats]) => ({
          path,
          views: stats.views,
          title: stats.title,
          icon: getPageIcon(path)
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 6);

      // Calculate traffic sources
      const referrerStats = {};
      pageViews.forEach(pv => {
        const referrer = pv.referrer || 'Direct';
        const source = getTrafficSource(referrer);
        if (!referrerStats[source]) {
          referrerStats[source] = 0;
        }
        referrerStats[source]++;
      });

      const totalReferrers = Object.values(referrerStats).reduce((sum, count) => sum + count, 0);
      const trafficSources = Object.entries(referrerStats)
        .map(([source, visitors]) => ({
          source,
          visitors,
          percentage: Math.round((visitors / totalReferrers) * 100 * 10) / 10
        }))
        .sort((a, b) => b.visitors - a.visitors);

      // Calculate device types
      const deviceStats = {};
      pageViews.forEach(pv => {
        const device = getDeviceType(pv.userAgent);
        if (!deviceStats[device]) {
          deviceStats[device] = 0;
        }
        deviceStats[device]++;
      });

      const totalDevices = Object.values(deviceStats).reduce((sum, count) => sum + count, 0);
      const deviceTypes = Object.entries(deviceStats)
        .map(([type, visitors]) => ({
          type,
          visitors,
          percentage: Math.round((visitors / totalDevices) * 100 * 10) / 10
        }))
        .sort((a, b) => b.visitors - a.visitors);

      // Generate recent activity
      const recentActivity = interactions.slice(0, 10).map(interaction => ({
        time: formatTimeAgo(interaction.timestamp),
        action: getActionName(interaction.interaction),
        page: interaction.url ? new URL(interaction.url).pathname : '/',
        user: 'Anonymous'
      }));

      // Calculate average session duration (mock for now)
      const averageSessionDuration = Math.floor(Math.random() * 300) + 120; // 2-7 minutes
      const bounceRate = Math.floor(Math.random() * 20) + 25; // 25-45%

      setAnalyticsData({
        totalViews,
        uniqueVisitors,
        averageSessionDuration,
        bounceRate,
        topPages,
        trafficSources,
        deviceTypes,
        recentActivity
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
    }
    setLoading(false);
  };

  // Helper functions
  const getPageTitle = (path) => {
    const titles = {
      '/': 'Home/About',
      '/experience': 'Experience',
      '/skills': 'Skills',
      '/projects': 'Projects',
      '/pricing': 'Pricing',
      '/testimonials': 'Testimonials',
      '/contact': 'Contact',
      '/help': 'Help'
    };
    return titles[path] || path;
  };

  const getTrafficSource = (referrer) => {
    if (!referrer || referrer === '') return 'Direct';
    if (referrer.includes('google')) return 'Google Search';
    if (referrer.includes('facebook') || referrer.includes('twitter') || referrer.includes('linkedin')) return 'Social Media';
    return 'Referral';
  };

  const getDeviceType = (userAgent) => {
    if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
    if (/mobile|android|iphone/i.test(userAgent)) return 'Mobile';
    return 'Desktop';
  };

  const getActionName = (interaction) => {
    const actions = {
      'button_click': 'Button clicked',
      'link_click': 'Link clicked',
      'form_submission': 'Form submitted',
      'scroll_depth': 'Page scrolled',
      'time_on_page': 'Time on page'
    };
    return actions[interaction] || interaction;
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
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
