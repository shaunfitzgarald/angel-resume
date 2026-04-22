import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Button, Chip } from '@mui/material';
import { BentoGrid } from '../components/BentoGrid';
import { BentoCard } from '../components/BentoCard';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';

// Import project images
import graceKlassenImg from '../assets/grace-klassen.png';
import crookedCredenzaImg from '../assets/crooked-credenza-full.png';
import everythingBjaImg from '../assets/everything-bja-full.png';
import tylarAndTimImg from '../assets/tylar-and-tim-full.png';
import sdPrideNetworkImg from '../assets/san-diego-pride-network.gif';
import sdStartupMapImg from '../assets/SDStartUpMap.png';
import chicklechatImg from '../assets/chickle-chat.gif';
import kelseySinclairImg from '../assets/kelseysinclaire.gif';
import eventsAppScreenshot from '../assets/events-app-screenshot.png'
import sdHomelessInfoImg from '../assets/sd-homeless-info.png';

const projects = [
  {
    title: "Tylar & Tim's Wedding",
    description: 'A modern, elegant wedding website for Tylar and Timothy\'s upcoming celebration in Honolulu, Hawaii. Features a customized RSVP system, guest count tracker, travel logistics with hotel booking links, and an interactive AI chat assistant for guest inquiries.',
    image: tylarAndTimImg,
    tags: ['React', 'Firebase', 'RSVP System', 'AI Chat', 'Travel Logistics'],
    github: 'https://github.com/shaunfitzgarald/tylarandtim.git',
    demo: 'https://tylarandtim.love'
  },
  {
    title: 'The Crooked Credenza',
    description: 'A bespoke interior design studio platform featuring a modern, high-end "lived-in" aesthetic. Integrated with an AI-powered design assistant for real-time curation guidance and seamless consultation booking.',
    image: crookedCredenzaImg,
    tags: ['React', 'Firebase', 'AI Integration', 'Tailwind CSS', 'UI/UX'],
    github: 'https://github.com/shaunfitzgarald/brianm',
    demo: 'https://crookedcredenza.web.app'
  },
  {
    title: 'Everything BJA',
    description: 'The official interactive hub for actor and creator Brian Jordan Alvarez. This vibrant, mobile-first social platform features integrated video players, a social media wall, and an AI-powered chat widget to engage his community.',
    image: everythingBjaImg,
    tags: ['React', 'Firebase', 'Social Media', 'AI Widget', 'Video Integration'],
    github: 'https://github.com/shaunfitzgarald/everything-bja.git',
    demo: 'https://everything-bja.web.app'
  },
  {
    title: 'San Diego Homeless Info',
    description: 'A comprehensive interactive resource map for San Diego\'s homeless community. Features real-time transit data via OneBusAway, intelligent resource navigation with Google Gemini AI, and a full-stack dashboard for resource management.',
    image: sdHomelessInfoImg,
    tags: ['React', 'Firebase', 'Google Maps API', 'Gemini AI', 'Material UI'],
    github: 'https://github.com/shaunfitzgarald/passion-project.git',
    demo: 'https://sandiegohomeless.info'
  },
  {
    title: 'Kelsey Sinclaire',
    description: 'A modern, responsive portfolio for a creative professional with interactive features, including a secure admin portal (/admin) with full CRUD, enabling the client to manage all sections of the React app.',
    image: kelseySinclairImg,
    tags: ['React', 'Material-UI', 'Responsive Design', 'Portfolio'],
    github: 'https://github.com/shaunfitzgarald/kelsey-portfolio',
    demo: 'https://kelseysinclaire.com'
  },
  {
    title: 'Angel (Post)',
    description: 'A content management platform with user authentication, post creation and management, and interactive features.',
    // image: shaunImg,
    video: 'https://www.youtube.com/embed/-ZHwy2b2bLs',
    tags: ['React', 'Firebase', 'Authentication', 'Content Management', 'AI Genkit'],
    // github: 'https://github.com/shaunfitzgarald/angel',
    // demo: 'https://angelpost.me'
    demo: 'https://angelpost.vercel.app'
  },
  {
    title: 'PosturePortal',
    description: 'A comprehensive CRM system designed specifically for chiropractic practices, featuring patient management, appointment scheduling, and treatment tracking. Try it using the demo account (email: test@example.com, password: password).',
    // image: shaunImg, // Using placeholder since there's a video for this project
    video: 'https://youtube.com/embed/R5qmO6eQGaE',
    tags: ['React', 'Node.js', 'Firebase', 'Vertex AI', 'Healthcare'],
    // github: 'https://github.com/shaunfitzgarald/posture-portal',
    demo: 'https://posture-portal.com'
  },
  {
    title: 'EventsHub',
    description: 'A full-stack events management platform built with React and Firebase. It provides end-to-end workflows—event creation, RSVPs, guest messaging, budgeting, calendar views, and social promotion—plus robust AI integrations for content generation, insights, and automation. Try it using the demo account (email: test@example.com, password: password).',
    image: eventsAppScreenshot,
    tags: ['React', 'Firebase', 'Material-UI', 'AI', 'RSVP', 'Calendar', 'Budgeting'],
    github: 'https://github.com/shaunfitzgarald/events-app',
    demo: 'https://events-app-shaun-stephensons-projects.vercel.app'
  },
  // {
  //   title: 'ChickleChat',
  //   description: 'A social networking platform with real-time messaging, user profiles, and content sharing capabilities.',
  //   image: chicklechatImg,
  //   tags: ['React', 'Firebase', 'Real-time Database', 'Authentication'],
  //   // github: 'https://github.com/shaunfitzgarald/chickle-chat',
  //   demo: 'https://chickle-chat.onrender.com'
  // },
  {
    title: 'Grace Klassen Marketing Solutions',
    description: 'A professional website for a marketing agency, showcasing services, portfolio, and client testimonials with a clean, modern design.',
    image: graceKlassenImg,
    tags: ['React', 'Responsive Design', 'SEO Optimization', 'Contact Form'],
    github: 'https://github.com/shaunfitzgarald/grace-klassen-react',
    demo: 'https://graceklassen.com'
  },
  // {
  //   title: 'San Diego Pride Network',
  //   description: 'An events platform for the San Diego LGBTQ+ community, featuring event listings, registration, and community resources.',
  //   image: sdPrideNetworkImg,
  //   tags: ['React', 'Firebase', 'Event Management', 'Community'],
  //   github: 'https://github.com/shaunfitzgarald/san-diego-pride-network',
  //   demo: 'https://sdpridenetwork.onrender.com'
  // },
  {
    title: 'San Diego Startup Map',
    description: 'An interactive map application showcasing startups in the San Diego area, with filtering by industry, size, and funding stage.',
    image: sdStartupMapImg,
    tags: ['Internship Project', 'Ruby on Rails', 'Google Maps API', 'Filtering', 'Data Visualization'],
    // github: 'https://github.com/shaunfitzgarald/sd-startup-map',
    demo: 'https://sandiegostartupmap.com'
  }
];

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio Projects | Full Stack Web Apps – Shaun Fitzgarald</title>
        <meta
          name="description"
          content="A showcase of web applications and projects built by Shaun Fitzgarald, featuring React, Firebase, AI integrations, and custom CRM solutions."
        />
        <link rel="canonical" href="https://shaunfitzgarald.com/projects" />
      </Helmet>
      
      <Box id="projects" sx={{ width: '100%', pt: 4, pb: 12 }}>
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem' },
              color: 'white'
            }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00E5FF]">Projects</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
            Here are some of my recent projects. Each project was built to solve specific problems and improve user experiences.
          </Typography>
        </Box>
        
        <BentoGrid>
          {projects.map((project, index) => (
            <BentoCard 
              key={index} 
              delay={0.1 * (index % 5)}
              className={`flex flex-col ${index === 0 || index === 3 ? "md:col-span-2 row-span-2" : "md:col-span-1 row-span-2"} p-0 overflow-hidden`}
              noPadding
            >
              {project.video ? (
                <Box sx={{ height: 350, width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <iframe 
                    src={project.video} 
                    frameBorder="0" 
                    allowFullScreen
                    title={`${project.title} video`}
                    width="100%"
                    height="100%"
                    style={{ pointerEvents: 'auto' }}
                  ></iframe>
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    height: 350, 
                    width: '100%', 
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover img': {
                      transform: 'translateY(calc(-100% + 350px))'
                    }
                  }}
                >
                  <Box
                    component="img" 
                    src={project.image} 
                    alt={project.title}
                    sx={{ 
                      width: '100%', 
                      height: 'auto', 
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                      transition: 'transform 6s ease-in-out'
                    }}
                  />
                </Box>
              )}
              
              <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                  {project.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, flexGrow: 1 }}>
                  {project.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {project.tags.map((tag, tagIndex) => (
                    <Chip 
                      key={tagIndex} 
                      label={tag} 
                      size="small" 
                      sx={{ 
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': { background: 'rgba(255,255,255,0.1)' }
                      }} 
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                  {project.demo && (
                    <Button 
                      size="small" 
                      variant="contained"
                      startIcon={<LaunchIcon />}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '50px',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.2)',
                        }
                      }}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.github && (
                    <Button 
                      size="small" 
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        borderRadius: '50px',
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: 'rgba(255,255,255,0.5)',
                          background: 'rgba(255,255,255,0.05)',
                        }
                      }}
                    >
                      Code
                    </Button>
                  )}
                </Box>
              </Box>
            </BentoCard>
          ))}
        </BentoGrid>
        
        <Box textAlign="center" mt={8}>
          <Button 
            variant="contained" 
            size="large"
            href="https://github.com/shaunfitzgarald"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<GitHubIcon />}
            sx={{
              background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
              color: '#fff',
              fontWeight: 600,
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              textTransform: 'none'
            }}
          >
            View All Projects on GitHub
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Projects;
