import React from 'react';
import { Box, Typography, Container, Paper, Chip, useTheme, useMediaQuery } from '@mui/material';
import { Work as WorkIcon, School as SchoolIcon, MilitaryTech as MilitaryIcon, LocationOn as LocationIcon, Star as StarIcon } from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';

const experiences = [
  {
    id: 1,
    role: 'Caregiver',
    company: 'Casa Companion & Victoria Post Acute',
    location: 'San Diego, CA',
    duration: '2018 – 2019, 2023 – 2025',
    description: [
      'Provided compassionate care including meals, bathing, and mobility support',
      'Worked closely with medical teams to report on patient conditions',
      'Maintained clean and safe environments—applicable to food prep areas'
    ],
    skills: ['Patient Care', 'Medical Team Collaboration', 'Sanitation'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 2,
    role: 'Team Member',
    company: 'Jamba Juice',
    location: 'Grossmont Plaza, CA',
    duration: 'Apr 2021 – Aug 2021',
    description: [
      'Greeted and assisted guests with friendly, accurate service',
      'Operated POS system efficiently; managed cash/card transactions',
      'Followed food safety guidelines and maintained clean work areas',
      'Worked well in a fast-paced team environment',
      'Resigned to begin service in the U.S. Army Reserve'
    ],
    skills: ['Customer Service', 'POS Systems', 'Food Safety', 'Teamwork'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 3,
    role: 'Communication Specialist (25U)',
    company: 'United States Army Reserve',
    location: '7452nd Medical Operations Readiness Detachment',
    duration: '2021 – Present',
    description: [
      'Gained discipline, leadership, and adaptability in high-pressure settings',
      'Trained in military medical operations and teamwork',
      'Learned to follow precise procedures and support unit missions',
      'Developing skills in communication systems and technology'
    ],
    skills: ['Leadership', 'Teamwork', 'Communication Systems', 'Discipline'],
    type: 'military',
    icon: <MilitaryIcon />
  },
  {
    id: 4,
    degree: 'Medical Assistant Certification',
    institution: 'Western Medical Center',
    location: 'San Diego, CA',
    duration: 'Completed',
    description: [
      'Certified Medical Assistant',
      'Trained in medical procedures and patient care',
      'Developed strong organizational and interpersonal skills'
    ],
    skills: ['Medical Procedures', 'Patient Care', 'Medical Terminology'],
    type: 'education',
    icon: <SchoolIcon />
  },
  {
    id: 5,
    degree: 'Ongoing Education',
    institution: 'Grossmont College',
    location: 'San Diego, CA',
    duration: 'Part-Time Student',
    description: [
      'Currently pursuing further education',
      'Balancing studies with military service and work experience',
      'Recently accepted into Army Nursing School'
    ],
    skills: ['Time Management', 'Academic Studies', 'Professional Development'],
    type: 'education',
    icon: <SchoolIcon />
  }
];

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getDotColor = (type) => {
    switch (type) {
      case 'work':
        return 'primary';
      case 'education':
        return 'secondary';
      case 'military':
        return 'success';
      default:
        return 'primary';
    }
  };

  return (
    <Box id="experience" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: 6,
            fontWeight: 700,
            color: 'primary.main',
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            textAlign: 'center',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px'
            },
            fontSize: { xs: '2rem', sm: '2.5rem' }
          }}
        >
          Experience & Education
        </Typography>
        
        <Timeline position={isMobile ? 'right' : 'alternate'} sx={{ m: 0, p: 0 }}>
          {experiences.map((exp) => (
            <TimelineItem key={exp.id}>
              {!isMobile && (
                <TimelineOppositeContent
                  sx={{ 
                    m: 'auto 0', 
                    flex: 0.2, 
                    minWidth: 140,
                    pr: 3,
                    textAlign: 'right',
                    display: { xs: 'none', md: 'block' }
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {exp.duration}
                </TimelineOppositeContent>
              )}
              
              <TimelineSeparator>
                <TimelineDot 
                  color={getDotColor(exp.type)}
                  sx={{ 
                    p: 1.5,
                    boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
                    '&:hover': {
                      transform: 'scale(1.15)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  {exp.icon}
                </TimelineDot>
                <TimelineConnector 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
                    height: '100%',
                    minHeight: 40
                  }} 
                />
              </TimelineSeparator>
              
              <TimelineContent sx={{ py: 0, px: 2, mb: 4 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    position: 'relative',
                    borderLeft: `4px solid ${theme.palette[getDotColor(exp.type)].main}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4]
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {exp.role || exp.degree}
                        {exp.type === 'military' && (
                          <MilitaryIcon 
                            fontSize="small" 
                            color="success" 
                            sx={{ opacity: 0.8 }} 
                          />
                        )}
                      </Typography>
                      
                      <Typography 
                        variant="subtitle1" 
                        color="primary" 
                        sx={{ 
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 1
                        }}
                      >
                        <span>{exp.company || exp.institution}</span>
                        {exp.location && (
                          <Typography 
                            component="span" 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              '& svg': { fontSize: '1rem', mr: 0.5 }
                            }}
                          >
                            <LocationIcon fontSize="inherit" />
                            {exp.location}
                          </Typography>
                        )}
                      </Typography>
                      
                      {isMobile && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontStyle: 'italic' }}
                        >
                          {exp.duration}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  <Box component="ul" sx={{ 
                    pl: 2.5, 
                    mb: 2,
                    '& li': {
                      mb: 0.5,
                      '&::marker': {
                        color: theme.palette[getDotColor(exp.type)].main,
                        fontSize: '1.2em',
                        lineHeight: 1
                      }
                    }
                  }}>
                    {exp.description.map((item, i) => (
                      <Typography 
                        key={i} 
                        component="li"
                        variant="body2"
                        sx={{ 
                          mb: 1,
                          '&:first-letter': {
                            textTransform: 'uppercase'
                          }
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                  
                  {exp.skills && exp.skills.length > 0 && (
                    <Box sx={{ 
                      mt: 'auto',
                      pt: 2,
                      borderTop: `1px dashed ${theme.palette.divider}`,
                      '& > div': { mt: 1 }
                    }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {exp.skills.map((skill, i) => (
                          <Chip 
                            key={i}
                            label={skill}
                            size="small"
                            icon={<StarIcon fontSize="small" />}
                            sx={{
                              bgcolor: theme.palette.mode === 'dark' 
                                ? 'rgba(255,255,255,0.1)' 
                                : 'rgba(0,0,0,0.05)',
                              '& .MuiChip-icon': {
                                color: theme.palette[getDotColor(exp.type)].main,
                                ml: 0.5,
                                fontSize: '0.9rem'
                              },
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem'
                              },
                              height: 24
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

export default Experience;
