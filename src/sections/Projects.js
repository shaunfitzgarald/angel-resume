import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions, Button, Chip } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';

// Import project images
import graceKlassenImg from '../assets/grace-klassen.png';
import crookedCredenzaImg from '../assets/crooked-credenza.gif';
import sdPrideNetworkImg from '../assets/san-diego-pride-network.gif';
import sdStartupMapImg from '../assets/SDStartUpMap.png';
import brickByBrickImg from '../assets/BrickByBrick.png';
import chicklechatImg from '../assets/chickle-chat.gif';
import shaunImg from '../assets/shaun.png';
import shaunFitzgaraldImg from '../assets/shaunfitzgarald.png';

const projects = [
  {
    title: 'Kelsey Sinclaire Portfolio',
    description: 'A professional portfolio website for a creative professional, featuring a modern design with responsive layout and interactive elements.',
    image: shaunFitzgaraldImg,
    tags: ['React', 'Material-UI', 'Responsive Design', 'Portfolio'],
    github: 'https://github.com/shaunfitzgarald/kelsey-portfolio',
    demo: 'https://kelseysinclaire.com'
  },
  {
    title: 'Angel Post',
    description: 'A content management platform with user authentication, post creation and management, and interactive features.',
    image: shaunImg,
    tags: ['React', 'Firebase', 'Authentication', 'Content Management'],
    // github: 'https://github.com/shaunfitzgarald/angel',
    demo: 'https://angelpost.me'
  },
  {
    title: 'PosturePortal',
    description: 'A comprehensive CRM system designed specifically for chiropractic practices, featuring patient management, appointment scheduling, and treatment tracking.',
    image: shaunImg, // Using placeholder since there's a video for this project
    video: 'https://youtube.com/embed/R5qmO6eQGaE',
    tags: ['React', 'Node.js', 'Firebase', 'Vertex AI', 'Healthcare'],
    // github: 'https://github.com/shaunfitzgarald/posture-portal',
    demo: 'https://posture-portal.com'
  },
  {
    title: 'ChickleChat',
    description: 'A social networking platform with real-time messaging, user profiles, and content sharing capabilities.',
    image: chicklechatImg,
    tags: ['React', 'Firebase', 'Real-time Database', 'Authentication'],
    // github: 'https://github.com/shaunfitzgarald/chickle-chat',
    demo: 'https://chickle-chat.onrender.com'
  },
  {
    title: 'Grace Klassen Marketing Solutions',
    description: 'A professional website for a marketing agency, showcasing services, portfolio, and client testimonials with a clean, modern design.',
    image: graceKlassenImg,
    tags: ['React', 'Responsive Design', 'SEO Optimization', 'Contact Form'],
    github: 'https://github.com/shaunfitzgarald/grace-klassen-react',
    demo: 'https://graceklassen.com'
  },
  {
    title: 'The Crooked Credenza',
    description: 'A portfolio website for an interior designer featuring project galleries, service information, and client testimonials.',
    image: crookedCredenzaImg,
    tags: ['HTML', 'CSS', 'JavaScript', 'Gallery', 'Animation', 'Responsive Design'],
    github: 'https://github.com/shaunfitzgarald/the-crooked-credenza',
    demo: 'https://the-crooked-credenza.onrender.com'
  },
  {
    title: 'San Diego Pride Network',
    description: 'An events platform for the San Diego LGBTQ+ community, featuring event listings, registration, and community resources.',
    image: sdPrideNetworkImg,
    tags: ['React', 'Firebase', 'Event Management', 'Community'],
    github: 'https://github.com/shaunfitzgarald/san-diego-pride-network',
    demo: 'https://sdpridenetwork.onrender.com'
  },
  {
    title: 'San Diego Startup Map',
    description: 'An interactive map application showcasing startups in the San Diego area, with filtering by industry, size, and funding stage.',
    image: sdStartupMapImg,
    tags: ['Internship Project', 'Ruby on Rails', 'Google Maps API', 'Filtering', 'Data Visualization'],
    // github: 'https://github.com/shaunfitzgarald/sd-startup-map',
    demo: 'https://sandiegostartupmap.com'
  },
  {
    title: 'BrickByBrick',
    description: 'A community platform for LEGO enthusiasts to share builds, exchange ideas, and connect with fellow builders.',
    image: brickByBrickImg,
    tags: ['React', 'Firebase', 'Community', 'Gallery'],
    github: 'https://github.com/byteSizeFox/brick-by-brick-frontend',
    demo: 'https://brick-by-brick-frontend.onrender.com'
  }
];

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }
    }}>
      {project.video ? (
        <Box sx={{ height: '50vh', width: '100%' }}>
          <iframe 
            src={project.video} 
            frameBorder="0" 
            allowFullScreen
            title={`${project.title} video`}
            width="100%"
            height="100%"
          />
        </Box>
      ) : (
        <CardMedia
          component="img"
          height="500"
          image={project.image}
          alt={project.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h3">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
          {project.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small" 
              sx={{ 
                bgcolor: 'primary.light',
                color: 'white',
                '& .MuiChip-label': { px: 1.5 }
              }} 
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        {project.demo && (
          <Button 
            size="small" 
            startIcon={<LaunchIcon />}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            Live Demo
          </Button>
        )}
        {project.github && (
          <Button 
            size="small" 
            startIcon={<GitHubIcon />}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            Code
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const Projects = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          My Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="700px" mx="auto">
          Here are some of my recent projects. Each project was built to solve specific problems and improve user experiences.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
      
      <Box textAlign="center" mt={6}>
        <Button 
          variant="outlined" 
          color="primary" 
          size="large"
          href="https://github.com/shaunfitzgarald"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<GitHubIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2
            }
          }}
        >
          View All Projects on GitHub
        </Button>
      </Box>
    </Container>
  );
};

export default Projects;
