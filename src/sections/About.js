import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Button } from '@mui/material';
import { 
  EmojiEmotions as AboutIcon, 
  LocationOn as LocationIcon 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import shaunAvatar from '../assets/shaun.png';
import { BentoGrid } from '../components/BentoGrid';
import { BentoCard } from '../components/BentoCard';

const TITLES = [
  "Developing Custom Web Apps",
  "Developing AI-Driven Solutions",
  "Developing Scalable Systems"
];

const About = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
  <Helmet>
    <title>San Diego Full Stack Developer | Custom Web Apps – Shaun Fitzgarald</title>
    <meta
      name="description"
      content="San Diego full stack developer specializing in custom web applications, modern websites, and scalable digital solutions using React, Node, and TypeScript."
    />
    <link rel="canonical" href="https://shaunfitzgarald.com/" />
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Shaun Fitzgarald",
          "jobTitle": "Full Stack Developer",
          "url": "https://shaunfitzgarald.com",
          "sameAs": [
            "https://github.com/shaunfitzgarald",
            "https://linkedin.com/in/shaunfitzgarald"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Diego",
            "addressRegion": "CA",
            "postalCode": "92103",
            "addressCountry": "US"
          }
        }
      `}
    </script>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Shaun Fitzgarald Web Development",
          "image": "https://shaunfitzgarald.com/static/media/shaunfitzgarald.png",
          "@id": "https://shaunfitzgarald.com",
          "url": "https://shaunfitzgarald.com",
          "telephone": "+18587699688",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hillcrest Area",
            "addressLocality": "San Diego",
            "addressRegion": "CA",
            "postalCode": "92103",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.7473,
            "longitude": -117.1647
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        }
      `}
    </script>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Shaun Fitzgarald Portfolio",
          "url": "https://shaunfitzgarald.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://shaunfitzgarald.com/projects?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}
    </script>
  </Helmet>

    <Box sx={{ width: '100%', pt: 4, pb: 12 }}>
      <BentoGrid>
        
        {/* Intro / Avatar Bento Card (Spans 2 columns) */}
        <BentoCard className="md:col-span-2 row-span-2 flex flex-col justify-end" delay={0.1}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#7B61FF]/40 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, mb: 4 }}>
            <Box
              component="img"
              src={shaunAvatar}
              alt="Shaun Fitzgarald"
              sx={{
                width: { xs: 120, sm: 160 },
                height: { xs: 120, sm: 160 },
                flexShrink: 0,
                borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                objectFit: 'cover'
              }}
            />
            <Box>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: 2 }}>
                Full-Stack Developer | AI Integrations | Scalable Architecture
              </Typography>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 2, minHeight: { xs: 'auto', md: '120px' } }}>
                I'm Shaun,<br />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] inline-block"
                  >
                    {TITLES[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '600px', mb: 2 }}>
            I build high-performance React applications fueled by Gemini and Firebase to turn complex ideas into seamless digital experiences.
          </Typography>
          


          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '50px',
                px: 4,
                py: 1.5,
              }}
            >
              Start a Project
            </Button>
            <Button
              component={Link}
              to="/projects"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }
              }}
            >
              See the Work →
            </Button>
          </Box>
        </BentoCard>

        {/* Powered by Intelligence Card */}
        <BentoCard className="md:col-span-1 flex flex-col justify-center" delay={0.15}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E3A] to-[#FF9A44]">Powered by Intelligence</span>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            I integrate Gemini Pro directly into web workflows, creating apps that can think, summarize, and automate—not just display data.
          </Typography>
        </BentoCard>

        {/* AI Chat / Vibrant Card */}
        <BentoCard className="md:col-span-1 row-span-2 group overflow-hidden" delay={0.2}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 via-[#7B61FF]/20 to-[#FF5E3A]/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7B61FF] to-[#00E5FF] mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(123,97,255,0.5)]"
            >
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>AI</Typography>
            </motion.div>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Chat with my<br/>AI Assistant</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
              Powered by Genkit & Gemini. Ask about my experience, skills, or rates!
            </Typography>
            <Button
              variant="contained"
              onClick={() => document.dispatchEvent(new CustomEvent('chat-opened'))}
              sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                color: 'white',
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Open AI Chat
            </Button>
          </div>
        </BentoCard>

        {/* Who Am I? Card (Fills Row 2, Col 3) */}
        <BentoCard className="md:col-span-1 relative overflow-hidden group" delay={0.25} noPadding>
          <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00E5FF]/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'white' }}>Who am I?</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.85rem' }}>
              I’m a developer obsessed with clean design and complex logic. While completing my CS degree, I've built scalable systems—from Firebase workflows to AI-driven Genkit applications. I focus on building seamless digital experiences.
            </Typography>
          </Box>
        </BentoCard>

        {/* Info Card 1 - The Workflow */}
        <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col h-full" delay={0.3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AboutIcon sx={{ fontSize: 32, color: '#7B61FF', mr: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>The Workflow</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1, justifyContent: 'center' }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00E5FF' }}>Strategy First</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>We define the "why" before the "how."</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00E5FF' }}>Rapid Development</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Using a modern stack (React + Vite + Tailwind) to move from mockup to MVP in record time.</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00E5FF' }}>Scalable Core</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Every line of code is written with your future growth in mind—backed by the reliability of Firebase.</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00E5FF' }}>Open Loop</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>You’re never in the dark. Constant communication and iterative updates are my standard.</Typography>
            </Box>
          </Box>
        </BentoCard>

        {/* Location & Contact Map */}
        <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col h-full" delay={0.4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationIcon sx={{ color: '#FF5E3A', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Based in San Diego, CA</Typography>
          </Box>
          <Box sx={{ 
            width: '100%', 
            flexGrow: 1, 
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26889.42977003!2d-117.16498394999999!3d32.7472569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d954c7f5df33f5%3A0x7cc1e6e25add0087!2sHillcrest%2C%20San%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1656465858000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="San Diego Location Map"
            />
          </Box>
        </BentoCard>

      </BentoGrid>
    </Box>
    </>
  );
};

export default About;
