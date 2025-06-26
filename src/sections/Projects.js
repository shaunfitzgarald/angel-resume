import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions, Button, Chip } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment processing.',
    image: 'https://via.placeholder.com/600x400/8E4585/FFFFFF?text=E-commerce',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/username/ecommerce',
    demo: 'https://ecommerce-demo.com'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, task assignments, and progress tracking.',
    image: 'https://via.placeholder.com/600x400/8E4585/FFFFFF?text=Task+App',
    tags: ['React', 'Firebase', 'Material-UI', 'Redux'],
    github: 'https://github.com/username/task-app',
    demo: 'https://task-app-demo.com'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with modern web technologies to showcase creative work and skills.',
    image: 'https://via.placeholder.com/600x400/8E4585/FFFFFF?text=Portfolio',
    tags: ['React', 'Gatsby', 'GraphQL', 'Styled Components'],
    github: 'https://github.com/username/portfolio',
    demo: 'https://my-portfolio-demo.com'
  },
  {
    title: 'Recipe Finder',
    description: 'A web application that helps users discover recipes based on available ingredients and dietary preferences.',
    image: 'https://via.placeholder.com/600x400/8E4585/FFFFFF?text=Recipe+Finder',
    tags: ['Vue.js', 'Express', 'Spoonacular API', 'Bootstrap'],
    github: 'https://github.com/username/recipe-finder',
    demo: 'https://recipe-finder-demo.com'
  },
  {
    title: 'Fitness Tracker',
    description: 'A mobile-first application for tracking workouts, nutrition, and fitness goals with progress visualization.',
    image: 'https://via.placeholder.com/600x400/8E4585/FFFFFF?text=Fitness+Tracker',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    github: 'https://github.com/username/fitness-tracker',
    demo: 'https://fitness-tracker-demo.com'
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather application providing current conditions and forecasts with an intuitive user interface.',
    image: 'https://via.placeholder.com/600x400/8E4585/FFFFFF?text=Weather+Dashboard',
    tags: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS Grid'],
    github: 'https://github.com/username/weather-dashboard',
    demo: 'https://weather-dashboard-demo.com'
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
      <CardMedia
        component="img"
        height="200"
        image={project.image}
        alt={project.title}
        sx={{ objectFit: 'cover' }}
      />
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
          href="https://github.com/username"
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
