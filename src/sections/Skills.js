import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, LinearProgress, Paper, Grow, Zoom } from '@mui/material';
import { 
  Code as DevelopmentIcon, 
  Business as ProfessionalIcon, 
  People as CustomerServiceIcon,
  Storage as DatabaseIcon,
  SmartToy as AIIcon
} from '@mui/icons-material';

const skills = {
  'Frontend Development': [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'Responsive Design', level: 85 },
    { name: 'TailwindCSS', level: 85 },
    { name: 'Material UI', level: 85 },
    { name: 'Syncfusion', level: 70 },
  ],
  'Backend Development': [
    { name: 'Node.js', level: 85 },
    { name: 'Firebase', level: 90 },
    { name: 'Ruby', level: 75 },
    { name: 'Java', level: 70 },
    { name: 'REST APIs', level: 80 },
  ],
  'Database Technologies': [
    { name: 'PostgreSQL', level: 80 },
    { name: 'SQL', level: 80 },
    { name: 'Firebase Firestore', level: 90 },
    { name: 'MongoDB', level: 65 },
  ],
  'AI & Advanced Technologies': [
    { name: 'Vertex AI', level: 80 },
    { name: 'Gemini', level: 80 },
    { name: 'ARM Assembly', level: 75 },
    { name: 'Machine Learning Basics', level: 65 },
  ],
  'Professional Skills': [
    { name: 'Client Communication', level: 90 },
    { name: 'Problem Solving', level: 90 },
    { name: 'Time Management', level: 90 },
    { name: 'Project Management', level: 85 },
  ],
  'Customer Service': [
    { name: 'Client Relations', level: 95 },
    { name: 'Training & Team Support', level: 90 },
    { name: 'Administrative Support', level: 90 },
    { name: 'Logistics & Fulfillment', level: 90 },
  ],
};

const SkillCategory = ({ title, icon, skills, index }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  
  useEffect(() => {
    // Delay skill bar animations to create a cascade effect
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 300 * index); // Stagger the animations based on category index
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          height: '100%', 
          borderRadius: 2,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box 
            sx={{ 
              mr: 1.5, 
              transform: 'scale(1)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.2)' }
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          {skills.map((skill, idx) => (
            <Grow 
              key={idx} 
              in={animateSkills} 
              style={{ transformOrigin: '0 0 0', transitionDelay: `${idx * 100}ms` }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s ease',
                  transform: hoveredSkill === idx ? 'translateX(8px)' : 'translateX(0)',
                }}
                onMouseEnter={() => setHoveredSkill(idx)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: hoveredSkill === idx ? 600 : 400,
                      transition: 'color 0.3s ease, font-weight 0.3s ease',
                      color: hoveredSkill === idx ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {skill.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      transition: 'color 0.3s ease',
                      color: hoveredSkill === idx ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    {skill.level}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={animateSkills ? skill.level : 0} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 5,
                    bgcolor: 'background.paper',
                    transition: 'all 1s ease-out',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      transition: 'transform 1s ease-out',
                      bgcolor: hoveredSkill === idx ? 'secondary.main' : 'primary.main',
                    }
                  }} 
                />
              </Box>
            </Grow>
          ))}
        </Box>
      </Paper>
    </Zoom>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);
  
  return (
    <Box id="skills" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Zoom in={isVisible}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 6, 
              color: 'primary.main', 
              fontWeight: 600,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                width: isVisible ? '80px' : '0px',
                height: '4px',
                bgcolor: 'secondary.main',
                transition: 'width 0.8s ease',
                transform: 'translateX(-50%)'
              }
            }}
          >
            Skills
          </Typography>
        </Zoom>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <SkillCategory 
              title="Frontend Development" 
              icon={<DevelopmentIcon fontSize="large" color="primary" />}
              skills={skills['Frontend Development']} 
              index={0}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <SkillCategory 
              title="Backend Development" 
              icon={<DevelopmentIcon fontSize="large" color="secondary" />}
              skills={skills['Backend Development']} 
              index={1}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <SkillCategory 
              title="Database Technologies" 
              icon={<DatabaseIcon fontSize="large" color="primary" />}
              skills={skills['Database Technologies']} 
              index={2}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SkillCategory 
              title="AI & Advanced Technologies" 
              icon={<AIIcon fontSize="large" color="secondary" />}
              skills={skills['AI & Advanced Technologies']} 
              index={3}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <SkillCategory 
              title="Professional Skills" 
              icon={<ProfessionalIcon fontSize="large" color="primary" />}
              skills={skills['Professional Skills']} 
              index={4}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <SkillCategory 
              title="Customer Service" 
              icon={<CustomerServiceIcon fontSize="large" color="secondary" />}
              skills={skills['Customer Service']} 
              index={5}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
