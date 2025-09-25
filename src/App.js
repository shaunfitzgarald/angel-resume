import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  useScrollTrigger,
  Fade,
} from '@mui/material';
import logoImage from './assets/shaunfitzgarald.png';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  AttachMoney as AttachMoneyIcon,
  HelpOutline as HelpOutlineIcon,
  RateReview as RateReviewIcon,
} from '@mui/icons-material';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { trackPageView } from './utils/analytics';


// Import sections
import Home from './sections/Home';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Education from './sections/Education';
import Footer from './sections/Footer';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';

// Import pages
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Help from './pages/Help';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatWidget from './components/ChatWidget';
import CookieConsent from './components/CookieConsent';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const drawerWidth = 240;

// Scroll to top on route change and track page views
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track page view
    const pageTitle = getPageTitle(pathname);
    trackPageView(pathname, pageTitle).catch(error => {
      console.error('Error tracking page view:', error);
    });
  }, [pathname]);
  return null;
}

// Get page title based on path
function getPageTitle(pathname) {
  const titles = {
    '/': 'About - Shaun Fitzgarald',
    '/experience': 'Experience - Shaun Fitzgarald',
    '/skills': 'Skills - Shaun Fitzgarald',
    '/projects': 'Projects - Shaun Fitzgarald',
    '/pricing': 'Pricing - Shaun Fitzgarald',
    '/testimonials': 'Testimonials - Shaun Fitzgarald',
    '/contact': 'Contact - Shaun Fitzgarald',
    '/help': 'Help - Shaun Fitzgarald',
    '/admin/login': 'Admin Login - Shaun Fitzgarald',
    '/admin': 'Admin Dashboard - Shaun Fitzgarald',
    '/terms': 'Terms of Service - Shaun Fitzgarald',
    '/privacy': 'Privacy Policy - Shaun Fitzgarald'
  };
  return titles[pathname] || 'Shaun Fitzgarald';
}

// Scroll to top button component
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    // { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <PersonIcon />, path: '/' },
    { text: 'Experience', icon: <WorkIcon />, path: '/experience' },
    { text: 'Skills', icon: <CodeIcon />, path: '/skills' },
    // { text: 'Education', icon: <SchoolIcon />, path: '/education' },
    { text: 'Projects', icon: <DataObjectIcon />, path: '/projects' },
    { text: 'Pricing', icon: <AttachMoneyIcon />, path: '/pricing' },
    { text: 'Testimonials', icon: <RateReviewIcon />, path: '/testimonials' },
    { text: 'Contact', icon: <EmailIcon />, path: '/contact' },
    { text: 'Help', icon: <HelpOutlineIcon />, path: '/help' },
  ];

  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: '#ffffff' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    const CONSENT_STORAGE_KEY = 'cookieConsent.v1';
    const readConsent = () => {
      try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return null; }
    };
    const send = (name, params) => {
      const consent = readConsent();
      if (consent?.level !== 'all') return;
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', name, params || {});
      }
    };
    // Attach listeners once
    if (typeof window !== 'undefined' && !window.__chat_analytics_bound) {
      window.__chat_analytics_bound = true;
      window.addEventListener('chat-opened', () => send('chat_opened'));
      window.addEventListener('chat-sent', () => send('chat_sent'));
      window.addEventListener('chat-response', (e) => send('chat_response', { success: !!(e?.detail?.ok) }));
      window.addEventListener('cta-click', (e) => {
        const d = e?.detail || {};
        send('cta_click', { page: d.page, cta: d.cta, pkg: d.pkg });
      });
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <CssBaseline />
          <ScrollToTop />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src={logoImage}
              alt="Shaun Fitzgarald"
              sx={{
                height: { xs: 60, sm: 80, md: 100 },
                maxWidth: '90%',
                mr: 2,
                display: 'flex',
                filter: theme => theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawerContent}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Toolbar id="back-to-top-anchor" />
          <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              {/* <Route path="/education" element={<Education />} /> */}
              <Route path="/projects" element={<Projects />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Container>
          <Footer />
        </Box>

        <ScrollTop>
          <IconButton
            color="primary"
            aria-label="scroll back to top"
            sx={{ backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'primary.light' } }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </ScrollTop>
        </Box>
        <CookieConsent />
        <ChatWidget />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
