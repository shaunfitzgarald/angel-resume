import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import SchoolIcon from '@mui/icons-material/School';

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    period: '2018 - 2022',
    description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Artificial Intelligence, and Database Systems.',
  },
  {
    degree: 'High School Diploma',
    institution: 'Silicon Valley High School',
    period: '2014 - 2018',
    description: 'Focused on advanced placement courses in Mathematics and Computer Science.',
  },
];

const Education = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, color: 'primary.main', fontWeight: 600 }}>
          Education
        </Typography>
        <Timeline position="alternate">
          {educationData.map((edu, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {edu.period}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary">
                  <SchoolIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  {edu.degree}
                </Typography>
                <Typography>{edu.institution}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Container>
  );
};

export default Education;
