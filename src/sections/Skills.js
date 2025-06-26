import React from 'react';
import { Box, Typography, Container, Grid, LinearProgress, Paper } from '@mui/material';
import { Code as CodeIcon, DesignServices as DesignIcon, Storage as DatabaseIcon, Storage as StorageIcon, Build as ToolsIcon } from '@mui/icons-material';

const skills = {
  'Frontend': [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Material-UI', level: 85 },
    { name: 'Redux', level: 80 },
  ],
  'Backend': [
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Express', level: 85 },
    { name: 'RESTful APIs', level: 90 },
    { name: 'GraphQL', level: 75 },
  ],
  'Database': [
    { name: 'MongoDB', level: 80 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'Firebase', level: 85 },
    { name: 'Redis', level: 70 },
  ],
  'UI/UX Design': [
    { name: 'Figma', level: 85 },
    { name: 'Adobe XD', level: 80 },
    { name: 'Responsive Design', level: 90 },
    { name: 'User Research', level: 75 },
  ],
  'Professional Skills': [
    { name: 'Team Leadership', level: 85 },
    { name: 'Problem Solving', level: 90 },
    { name: 'Communication', level: 88 },
    { name: 'Project Management', level: 80 },
    { name: 'Agile/Scrum', level: 82 }
  ]
};

const SkillCategory = ({ title, icon, skills }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {icon}
        <Typography variant="h5" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Box>
        {skills.map((skill, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1">{skill.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {skill.level}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={skill.level} 
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: 'primary.main',
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const Skills = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
          My Skills
        </Typography>
        
        <Typography variant="h6" component="h2" align="center" color="textSecondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          I've worked with a variety of technologies in the web development world.
          Here's a quick overview of my technical skills and knowledge.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SkillCategory 
              title="Frontend" 
              icon={<CodeIcon color="primary" />} 
              skills={skills.Frontend} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SkillCategory 
              title="Backend" 
              icon={<StorageIcon color="primary" />} 
              skills={skills.Backend} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SkillCategory 
              title="Database" 
              icon={<DatabaseIcon color="primary" />} 
              skills={skills.Database} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SkillCategory 
              title="UI/UX Design" 
              icon={<DesignIcon color="primary" />} 
              skills={skills['UI/UX Design']} 
            />
          </Grid>
          
          <Grid item xs={12}>
            <SkillCategory 
              title="Professional Skills" 
              icon={<ToolsIcon color="primary" />} 
              skills={skills['Professional Skills']} 
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Skills;
