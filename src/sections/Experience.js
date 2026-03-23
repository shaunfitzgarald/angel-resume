import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Chip, Fade, Zoom, Button } from '@mui/material';
import { Work as WorkIcon, School as SchoolIcon, LocationOn as LocationIcon, Download as DownloadIcon } from '@mui/icons-material';
import { BentoGrid } from '../components/BentoGrid';
import { BentoCard } from '../components/BentoCard';

const experiences = [
  {
    id: 1,
    role: 'Freelance Web Developer',
    company: 'Independent Contractor',
    location: 'San Diego, CA',
    duration: 'Jan 2024 – Present',
    description: [
      'Built high-performance React architectures for diverse client portfolios.',
      'Juggled 4 simultaneous projects while managing full-time academics.',
      'Translated vague client ideas into precise, scalable digital products.'
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
      'Engineered the migration of a deprecated legacy codebase to modern Ruby on Rails.',
      'Led the team in bug resolution, rapidly stabilizing the core platform.',
      'Drove Agile workflows and maintained strict adherence to release sprints.'
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
      'Operated flawlessly under high-pressure, fast-paced environments.',
      'Mastered POS integration, inventory logistics, and cash management.',
      'Spearheaded onboarding and trained incoming staff on operational standards.'
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
      'Orchestrated logistics for 650+ daily shipments, maintaining a 99% accuracy rate.',
      'Troubleshot and resolved 250+ critical order bottlenecks.',
      'Enforced strict FDA-compliant operational and hygiene protocols.'
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
      'Streamlined operations and global travel logistics for C-suite executive.',
      'Handled highly confidential operations across shifting international time zones.',
      'Optimized administrative workflows for maximum daily efficiency.'
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
      'Executed robust onboarding programs for incoming retail associates.',
      'Maintained visual and operational excellence across the storefront.',
      'Resolved high-friction customer interactions with strategic empathy.'
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
      'Focusing aggressively on scalable software architecture and advanced algorithms.',
      'Applying core classroom theory directly to complex freelance deployments.'
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
      'Engineered full-stack applications through intensive 500+ hour curriculum.',
      'Mastered React, modern UI frameworks, and robust API integrations.',
      'Led Agile group deployments simulating high-stakes production environments.'
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
      'Cultivated rigorous analytical problem-solving and deep research methodologies.',
      'Mastered interdisciplinary logic systems across science and international business.'
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
      'Achieved language fluency and cultural adaptability during intensive overseas study.',
      'Navigated and localized into full international immersion.'
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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Experience | Software Development & Freelance – Shaun Fitzgarald</title>
        <meta
          name="description"
          content="Explore Shaun Fitzgarald's professional experience in freelance web development, internships, and education in Computer Science."
        />
        <link rel="canonical" href="https://shaunfitzgarald.com/experience" />
      </Helmet>
      
      <Box id="experience" sx={{ width: '100%', pt: 4, pb: 12 }}>
        <Zoom in={isVisible}>
          <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 8,
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem' },
              color: 'white'
            }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00E5FF]">Experience</span>
          </Typography>
        </Zoom>
        
        <BentoGrid>
          {sortedExperiences.map((exp, index) => (
            <BentoCard 
              key={exp.id} 
              delay={0.1 * (index % 5)}
              className={index === 0 ? "md:col-span-2 row-span-2" : ""}
            >
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: '50%', 
                    background: exp.type === 'work' ? 'rgba(123,97,255,0.2)' : 'rgba(0,229,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: exp.type === 'work' ? '#7B61FF' : '#00E5FF'
                  }}
                >
                  {exp.icon}
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                  {exp.duration}
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'white' }}>
                {exp.role || exp.degree}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ color: exp.type === 'work' ? '#7B61FF' : '#00E5FF', fontWeight: 600 }}>
                  {exp.company || exp.institution}
                </Typography>
                {exp.location && (
                  <>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>•</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      {exp.location}
                    </Typography>
                  </>
                )}
              </Box>

              <ul className="pl-5 space-y-2 mb-4 text-sm text-gray-300 list-disc flex-grow">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {exp.skills && exp.skills.length > 0 && (
                <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {exp.skills.map((skill, i) => (
                    <Chip
                      key={i}
                      label={skill}
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
              )}
            </BentoCard>
          ))}
        </BentoGrid>

        {/* Download Resume Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Fade in={isVisible} style={{ transitionDelay: '300ms' }}>
            <Button
              variant="contained"
              size="large"
              href="/Resume_Stephenson_Shaun.pdf"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadIcon />}
              sx={{ 
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                color: 'white',
                px: 4,
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.4)',
                }
              }}
            >
              Download Full Resume
            </Button>
          </Fade>
        </Box>
      </Box>
    </>
  );
};

export default Experience;
