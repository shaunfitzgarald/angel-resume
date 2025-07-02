import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Chip, useTheme, useMediaQuery, Fade, Grow, Zoom } from '@mui/material';
import { Work as WorkIcon, School as SchoolIcon, MilitaryTech as MilitaryIcon, LocationOn as LocationIcon, Star as StarIcon } from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';

const experiences = [
  {
    id: 1,
    role: 'Freelance Web Developer',
    company: 'Independent Contractor',
    location: 'San Diego, CA',
    duration: 'Jan 2024 – Present',
    description: [
      'Delivered modern, responsive React applications for multiple clients with a focus on user experience and clean design',
      'Managed four client projects simultaneously while attending school full-time, demonstrating excellent time management',
      'Communicated technical requirements and translated vague ideas into functional applications'
    ],
    skills: ['React', 'Web Development', 'Client Communication', 'Project Management'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 2,
    role: 'Web Development Intern',
    company: 'San Diego StartUp Map',
    location: 'Remote',
    duration: 'Nov 2023 – Feb 2024',
    description: [
      'Upgraded a deprecated website to the latest version of Ruby on Rails, improving performance and security',
      'Participated in daily standups and Agile workflow, consistently meeting sprint goals and deadlines',
      'Recognized for squashing the most bugs on the team, demonstrating strong problem-solving skills',
      'Communicated effectively with clients to gather requirements and provide progress updates'
    ],
    skills: ['Ruby on Rails', 'Agile', 'Bug Fixing', 'Client Communication', 'Team Collaboration'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 3,
    role: 'Customer Service & Front-of-House Staff',
    company: 'Various Employers',
    location: 'San Diego, CA',
    duration: '2021 – 2023',
    description: [
      'Provided prompt, courteous service in fast-paced settings, handling high guest volumes efficiently',
      'Managed point-of-sale systems, cash handling, and inventory support',
      'Recognized for reliability, punctuality, and ability to multitask under pressure',
      'Trained and supported new staff to ensure smooth team operations'
    ],
    skills: ['Customer Service', 'POS Systems', 'Inventory Management', 'Training'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 3,
    role: 'Fulfillment Technician',
    company: 'Curology, Inc.',
    location: 'San Diego, CA',
    duration: 'May 2018 – May 2019',
    description: [
      'Processed 650+ daily shipments with 99% accuracy in a high-volume logistics environment',
      'Resolved over 250 order issues, contributing to a 95% team resolution rate',
      'Maintained clean, efficient workstations while adhering to FDA-compliant protocols'
    ],
    skills: ['Logistics', 'Order Processing', 'Problem Solving', 'Compliance'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 4,
    role: 'Personal Executive Assistant',
    company: 'Independent Contractor',
    location: 'San Diego, CA',
    duration: 'Apr 2018 – Jan 2020',
    description: [
      'Managed complex scheduling, travel, and administrative tasks for a C-level executive',
      'Maintained confidentiality and proactively solved logistical challenges across multiple time zones',
      'Delivered work consistently on deadline with strong attention to detail'
    ],
    skills: ['Executive Support', 'Scheduling', 'Problem Solving', 'Confidentiality'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 5,
    role: 'Brand Representative',
    company: 'Abercrombie & Fitch / Hollister Co.',
    location: 'San Diego, CA',
    duration: 'Jun 2013 – Jan 2018',
    description: [
      'Onboarded and trained new employees on company standards and customer service practices',
      'Maintained store appearance and ensured a consistent brand image',
      'Handled customer concerns with empathy and professionalism'
    ],
    skills: ['Training', 'Customer Service', 'Brand Management', 'Retail Operations'],
    type: 'work',
    icon: <WorkIcon />
  },
  {
    id: 6,
    degree: 'Associate Degree for Transfer, Computer Science',
    institution: 'San Diego Mesa College',
    location: 'San Diego, CA',
    duration: 'In Progress - Expected Jan 2025',
    description: [
      'Pursuing Computer Science degree with focus on software development',
      'Maintaining strong academic performance while working as freelance developer',
      'Applying classroom concepts to real-world client projects'
    ],
    skills: ['Computer Science', 'Software Development', 'Problem Solving', 'Time Management'],
    type: 'education',
    icon: <SchoolIcon />
  },
  {
    id: 7,
    degree: 'Full-Stack Web Development Bootcamp',
    institution: 'LEARN Academy',
    location: 'San Diego, CA',
    duration: 'Jan 2024',
    description: [
      'Completed intensive training in full-stack web development',
      'Built multiple projects using React, JavaScript, HTML, and CSS',
      'Collaborated with peers on group projects simulating real-world development environments'
    ],
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Full-Stack Development'],
    type: 'education',
    icon: <SchoolIcon />
  },
  {
    id: 8,
    degree: 'B.S., Human Biology - Minor: International Business & German',
    institution: 'University of California, San Diego',
    location: 'San Diego, CA',
    duration: 'Sep 2014 – Jun 2018',
    description: [
      'Completed Bachelor of Science degree with interdisciplinary focus',
      'Developed strong analytical and research skills',
      'Balanced academic studies with part-time work'
    ],
    skills: ['Research', 'Analysis', 'Time Management', 'Cross-disciplinary Studies'],
    type: 'education',
    icon: <SchoolIcon />
  },
  {
    id: 9,
    degree: 'Intensive German Language Program',
    institution: 'Die Neue Schule',
    location: 'Berlin, Germany',
    duration: 'Aug 2016 – Feb 2017',
    description: [
      'Completed immersive German language program abroad',
      'Developed cultural competency and communication skills',
      'Navigated living and studying in an international environment'
    ],
    skills: ['German Language', 'Cultural Competency', 'International Experience', 'Adaptability'],
    type: 'education',
    icon: <SchoolIcon />
  }
];

// Helper function to convert duration string to a sortable date format
const getStartDateFromDuration = (duration) => {
  // Extract the start year from strings like 'Jan 2024 – Present' or '2021 – 2023'
  const match = duration.match(/(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+)?(\d{4})/);
  return match ? parseInt(match[1]) : 9999; // Default to a high number if no match
};

// Sort experiences by start date (most recent first)
const sortedExperiences = [...experiences].sort((a, b) => {
  const dateA = getStartDateFromDuration(a.duration);
  const dateB = getStartDateFromDuration(b.duration);
  return dateB - dateA; // Descending order (most recent first)
});

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  
  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  // Custom colors for timeline dots using tech color scheme
  const workColor = theme.palette.tech?.blue?.main || '#0066FF';
  const educationColor = theme.palette.tech?.green?.main || '#0ACF83';
  
  const getDotColor = (type) => {
    switch (type) {
      case 'work':
        return 'blue'; // Will be used as a key for styling
      case 'education':
        return 'green'; // Will be used as a key for styling
      case 'military':
        return 'success';
      default:
        return 'blue';
    }
  };
  
  // Custom color mapping for timeline dots
  const dotColorMap = {
    blue: workColor,
    green: educationColor,
  };

  return (
    <Box id="experience" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Zoom in={isVisible}>
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
                width: isVisible ? '100px' : '0px',
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
                transition: 'width 0.8s ease-in-out'
              },
              fontSize: { xs: '2rem', sm: '2.5rem' }
            }}
          >
            Experience & Education
          </Typography>
        </Zoom>
        
        <Timeline position={isMobile ? 'right' : 'alternate'} sx={{ m: 0, p: 0 }}>
          {sortedExperiences.map((exp, index) => (
            <TimelineItem key={exp.id} 
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
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
                <Zoom 
                  in={isVisible} 
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <TimelineDot 
                    sx={{ 
                      p: 1.5,
                      bgcolor: dotColorMap[getDotColor(exp.type)],
                      boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
                      transform: activeIndex === index ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.15)',
                        boxShadow: `0 0 0 4px ${theme.palette.background.paper}, 0 0 0 6px ${dotColorMap[getDotColor(exp.type)]}`,
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#ffffff'
                      }
                    }}
                  >
                    {exp.icon}
                  </TimelineDot>
                </Zoom>
                <TimelineConnector 
                  sx={{ 
                    bgcolor: activeIndex === index ? dotColorMap[getDotColor(exp.type)] : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                    height: '100%',
                    minHeight: 40,
                    transition: 'background-color 0.3s ease',
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible ? `${index * 100}ms ease-out ${index * 150}ms forwards growConnector` : 'none',
                    '@keyframes growConnector': {
                      '0%': {
                        height: '0%',
                      },
                      '100%': {
                        height: '100%',
                      },
                    },
                  }} 
                />
              </TimelineSeparator>
              
              <TimelineContent sx={{ py: 0, px: 2, mb: 4 }}>
                <Grow 
                  in={isVisible} 
                  style={{ 
                    transformOrigin: isMobile ? 'left center' : (index % 2 === 0 ? 'left center' : 'right center'),
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    position: 'relative',
                    borderLeft: `4px solid ${dotColorMap[getDotColor(exp.type)]}`,
                    transition: 'all 0.3s ease',
                    transform: activeIndex === index ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: activeIndex === index ? theme.shadows[8] : theme.shadows[3],
                    '&:hover': {
                      transform: 'translateY(-5px) scale(1.02)',
                      boxShadow: theme.shadows[8]
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: activeIndex === index ? 
                      `${theme.palette.background.paper}` : 
                      theme.palette.background.paper,
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
                        color: dotColorMap[getDotColor(exp.type)],
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
                          opacity: isVisible ? 1 : 0,
                          animation: isVisible ? `fadeIn 0.5s ease forwards ${(index * 100) + (i * 50) + 200}ms` : 'none',
                          '@keyframes fadeIn': {
                            '0%': { opacity: 0, transform: 'translateY(10px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                          },
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
                  <Fade 
                    key={i} 
                    in={isVisible} 
                    style={{ transitionDelay: `${(index * 100) + (i * 50) + 300}ms` }}
                  >
                    <Chip
                      label={skill}
                      size="small"
                      icon={<StarIcon fontSize="small" />}
                      sx={{
                        m: 0.5,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: 'text.primary',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '& .MuiChip-icon': {
                          color: dotColorMap[getDotColor(exp.type)],
                          ml: 0.5,
                          fontSize: '0.9rem'
                        },
                        '& .MuiChip-label': {
                          px: 1,
                          fontSize: '0.75rem'
                        },
                        height: 24,
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: theme.palette.text.primary,
                          transform: 'translateY(-2px)',
                        }
                      }}
                    />
                  </Fade>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
        </Grow>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
      </Container>
    </Box>
  );
};

export default Experience;
