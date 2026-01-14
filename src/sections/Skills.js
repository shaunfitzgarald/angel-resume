import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Grid, Card, CardContent, LinearProgress, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// Data
const skillsData = [
  {
    category: 'Frontend Development',
    icon: <CodeIcon fontSize="large" sx={{ color: 'primary.main' }} />,
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Responsive Design', level: 85 },
      { name: 'Material UI', level: 85 },
      { name: 'TailwindCSS', level: 85 },
      { name: 'Syncfusion', level: 70 },
    ],
  },
  {
    category: 'Backend Development',
    icon: <StorageIcon fontSize="large" sx={{ color: 'secondary.main' }} />,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Firebase', level: 90 },
      { name: 'REST APIs', level: 80 },
      { name: 'Ruby', level: 75 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    category: 'Database Technologies',
    icon: <StorageIcon fontSize="large" sx={{ color: '#00C2FF' }} />,
    skills: [
      { name: 'Firebase Firestore', level: 90 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'SQL', level: 80 },
      { name: 'MongoDB', level: 65 },
    ],
  },
  {
    category: 'AI & Advanced Tech',
    icon: <CloudIcon fontSize="large" sx={{ color: '#7B61FF' }} />,
    skills: [
      { name: 'Vertex AI', level: 80 },
      { name: 'Gemini', level: 80 },
      { name: 'ARM Assembly', level: 75 },
      { name: 'Machine Learning Basics', level: 65 },
    ],
  },
  {
    category: 'Professional Skills',
    icon: <WorkIcon fontSize="large" sx={{ color: '#FFB020' }} />,
    skills: [
      { name: 'Client Communication', level: 90 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Time Management', level: 90 },
      { name: 'Project Management', level: 85 },
    ],
  },
  {
    category: 'Customer Service',
    icon: <SupportAgentIcon fontSize="large" sx={{ color: '#F03D3D' }} />,
    skills: [
      { name: 'Client Relations', level: 95 },
      { name: 'Training & Team Support', level: 90 },
      { name: 'Administrative Support', level: 90 },
      { name: 'Logistics & Fulfillment', level: 90 },
    ],
  },
];

const Skills = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Skills & Technologies | React, Firebase, AI – Shaun Fitzgarald</title>
        <meta
          name="description"
          content="A comprehensive look at Shaun Fitzgarald's technical skills including React, Node.js, Firebase, AI integrations, and professional project management."
        />
        <link rel="canonical" href="https://shaunfitzgarald.com/skills" />
      </Helmet>
      <Box id="skills" sx={{ py: 12, position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Skills & Technologies
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            A comprehensive toolkit for building modern, scalable, and user-friendly applications.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {skillsData.map((category, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    {category.icon}
                    <Typography variant="h5" component="h3" fontWeight="bold">
                      {category.category}
                    </Typography>
                  </Stack>
                  
                  <Stack spacing={2}>
                    {category.skills.map((skill) => (
                      <Box key={skill.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" fontWeight="500">
                            {skill.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {skill.level}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={skill.level} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: 'rgba(148, 163, 184, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: index % 2 === 0 
                                ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                                : `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    </>
  );
};

export default Skills;
