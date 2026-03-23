import React, { useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Toolbar,
  useScrollTrigger,
  Fade,
  IconButton,
} from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';
import logoImage from './assets/logo-new.png';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { trackPageView } from './utils/analytics';
import { HelmetProvider } from 'react-helmet-async';


// Import sections
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Pricing from './sections/Pricing';
// import Testimonials from './sections/Testimonials';

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
import DeepSpaceBackground from './components/DeepSpaceBackground';
import NavigationDock from './components/NavigationDock';

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
    // '/testimonials': 'Testimonials - Shaun Fitzgarald',
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

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  
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
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <DeepSpaceBackground />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            position: 'relative',
            zIndex: 1
          }}>
            <CssBaseline />
            <ScrollToTop />

            {/* Top Logo Header */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 40,
                p: { xs: 2, md: 3 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={logoImage}
                alt="Shaun Fitzgarald"
                sx={{
                  width: { xs: 380, sm: 500, md: 650 },
                  height: { xs: 85, sm: 110, md: 140 },
                  objectFit: 'cover',
                  objectPosition: 'center',
                  mixBlendMode: 'screen', // Makes the black background perfectly transparent
                  filter: 'brightness(1.2)',
                  pointerEvents: 'none', // Prevents the wider box from blocking clicks
                  transition: 'all 0.3s ease'
                }}
              />
            </Box>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: { xs: 16, sm: 20, md: 26 },
                pb: 16, // Space for NavigationDock
                px: { xs: 2, md: 4, lg: 8 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Toolbar id="back-to-top-anchor" sx={{ minHeight: 0, p: 0, m: 0 }} />
              <Box className="w-full max-w-7xl">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
                    <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
                    <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                    <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
                    <Route path="/help" element={<PageWrapper><Help /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                    <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
                    <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <PageWrapper><AdminDashboard /></PageWrapper>
                      </ProtectedRoute>
                    } />
                  </Routes>
                </AnimatePresence>
              </Box>
            </Box>
            
            <Footer />

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
          <NavigationDock />
          <CookieConsent />
          <ChatWidget />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
