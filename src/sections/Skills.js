import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, LinearProgress, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { BentoGrid } from '../components/BentoGrid';
import { BentoCard } from '../components/BentoCard';
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
      <Box id="skills" sx={{ width: '100%', pt: 4, pb: 12 }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
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
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00E5FF]">Tech Stack</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            A comprehensive toolkit for building modern, scalable, and user-friendly applications.
          </Typography>
        </Box>

        <BentoGrid>
          {skillsData.map((category, index) => (
            <BentoCard 
              key={index} 
              delay={0.1 * index}
              className={index === 0 || index === 1 ? "md:col-span-2" : ""}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: '12px', 
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: 'white' }}>
                  {category.category}
                </Typography>
              </Stack>
              
              <Stack spacing={3}>
                {category.skills.map((skill) => (
                  <Box key={skill.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.level} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: index % 2 === 0 
                            ? 'linear-gradient(90deg, #7B61FF, #00E5FF)'
                            : 'linear-gradient(90deg, #FF5E3A, #7B61FF)',
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </BentoCard>
          ))}
        </BentoGrid>
      </Box>
    </>
  );
};

export default Skills;
