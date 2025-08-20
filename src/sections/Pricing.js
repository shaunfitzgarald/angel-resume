import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const basePackages = [
  {
    name: 'Starter Website',
    price: '$700',
    bullets: [
      'Up to 5 pages (Home, About, Services, Contact, etc.)',
      'Mobile-responsive design',
      '2 rounds of revisions',
      'Client provides all text/images',
      'Delivery: ~2 weeks',
    ],
    // highlight: true,
  },
  {
    name: 'Business Website',
    price: '$1,500',
    bullets: [
      'Up to 10 pages',
      'Custom UI styling',
      'SEO-friendly structure',
      'Contact forms + basic integrations',
      '3 rounds of revisions',
      'Delivery: ~3–4 weeks',
    ],
    highlight: true,
  },
  {
    name: 'Advanced Website',
    price: 'From $3,000',
    bullets: [
      'Unlimited pages or CMS setup',
      'Custom features (logins, bookings, payments, API integrations)',
      'SEO optimization + performance tuning',
      '4 rounds of revisions',
      'Delivery: timeline varies by scope',
    ],
  },
];

const addOns = [
  { label: 'Extra page', value: '$100 each' },
  { label: 'Logo + basic branding', value: '$250' },
  { label: 'Blog setup', value: '$300' },
  { label: 'E-commerce setup', value: '$500–$1,000' },
  { label: 'Hosting/domain setup', value: '$150 flat' },
  { label: 'Copywriting (per page)', value: '$100' },
  { label: 'Stock photos or custom graphics sourcing', value: '$50–$200' },
];

const support = [
  { label: 'Bug fixes (30 days after launch)', value: 'Included' },
  { label: 'Monthly maintenance plan', value: '$100/month (updates, backups, small edits, uptime monitoring)' },
  { label: 'Hourly work beyond scope', value: '$40–$60/hr (depending on complexity)' },
];

const paymentTerms = [
  '30% upfront deposit',
  '40% at design approval',
  '30% at final delivery',
];

function PricingCard({ pkg }) {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        borderWidth: pkg.highlight ? 2 : 1,
        borderStyle: 'solid',
        borderColor: (theme) => (pkg.highlight ? theme.palette.primary.main : 'divider'),
        boxShadow: 3,
      }}
    >
      {pkg.highlight && (
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Chip label="Most Popular" color="primary" size="small" />
        </Box>
      )}
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'text.primary' }}>
          {pkg.name}
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: 'primary.main', mb: 2 }}>
          {pkg.price}
        </Typography>
        <List dense>
          {pkg.bullets.map((b, i) => (
            <ListItem key={i} sx={{ alignItems: 'flex-start', pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={b} />
            </ListItem>
          ))}
        </List>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Timeline depends on content readiness.
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant={pkg.highlight ? 'contained' : 'outlined'}
          color="primary"
          size="large"
          component={Link}
          to="/contact"
        >
          Get Started
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Pricing() {
  useEffect(() => {
    document.title = 'Pricing | Shaun Fitzgarald';
  }, []);

  const [hoveredCol, setHoveredCol] = useState(null);
  const colHoverSx = (key) => ({
    backgroundColor: hoveredCol === key ? 'action.selected' : undefined,
    transition: 'background-color 120ms ease',
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          Pricing
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={760} mx="auto">
          Transparent, fixed pricing with clear deliverables. Project timelines depend on content readiness and scope.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {basePackages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.name}>
            <PricingCard pkg={pkg} />
          </Grid>
        ))}
      </Grid>

      <Box mt={8}>
        <Typography variant="h5" gutterBottom>
          Feature Comparison
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}>
          <Table
            size="small"
            aria-label="pricing comparison table"
            sx={{
              '& tbody tr:nth-of-type(odd)': { backgroundColor: 'action.hover' },
              '& tbody tr:hover': { backgroundColor: 'action.selected' },
            }}
          >
            <TableHead sx={{ '& th': { backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 600 } }}>
              <TableRow>
                <TableCell sx={{ width: { xs: '40%', md: '35%' } }}></TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <Typography variant="subtitle2">Starter</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <Typography variant="subtitle2">Business</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <Typography variant="subtitle2">Advanced</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Pages</TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Up to 5
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Up to 10
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Unlimited / CMS
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Design</TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Responsive
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Custom UI styling
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Custom + performance tuning
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SEO</TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Basic structure
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  SEO-friendly structure
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  SEO optimization
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Forms & Integrations</TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Contact form
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Forms + basic integrations
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Advanced integrations/APIs
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Revisions</TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  2 rounds
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  3 rounds
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  4 rounds
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Timeline</TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('starter')}
                  onMouseEnter={() => setHoveredCol('starter')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  ~2 weeks
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('business')}
                  onMouseEnter={() => setHoveredCol('business')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  ~3–4 weeks
                </TableCell>
                <TableCell
                  align="center"
                  sx={colHoverSx('advanced')}
                  onMouseEnter={() => setHoveredCol('advanced')}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Varies by scope
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Timelines are estimates and depend on content readiness and feedback speed.
        </Typography>
      </Box>

      <Box mt={8}>
        <Typography variant="h5" gutterBottom>
          Add-Ons
        </Typography>
        <Grid container spacing={2}>
          {addOns.map((item) => (
            <Grid item key={item.label}>
              <Chip
                label={`${item.label}: ${item.value}`}
                color="default"
                sx={{
                  borderRadius: 1.5,
                  fontSize: 14,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Ongoing Support
        </Typography>
        <List dense>
          {support.map((s) => (
            <ListItem key={s.label} sx={{ pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={`${s.label}: ${s.value}`}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Payment Terms
        </Typography>
        <List dense>
          {paymentTerms.map((t) => (
            <ListItem key={t} sx={{ pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          FAQs & Policies
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">What counts as a revision and how many are included?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              A revision is a batch of requested changes to the current design/content. Packages include the listed rounds; additional rounds are billed hourly. Revisions don’t include new features or pages (those are add-ons).
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">What affects the timeline?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Content readiness, responsiveness during feedback, and custom feature complexity. Delays in receiving copy, images, or approvals will extend timelines.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Do you offer rush delivery?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Yes—subject to availability. Rush work is typically +20%–30% of the project total.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Who provides copy and images?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Client-provided by default. Optional add-ons are available for copywriting and stock image sourcing. Brand assets (logo, colors, fonts) should be supplied upfront.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">What about ownership and hosting?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Upon final payment, you own the site deliverables. Source code is handed off or hosted on your accounts. I can also set up hosting/domain as an add-on.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">How are out-of-scope changes billed?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              New features or scope changes are billed hourly at the posted rate, or quoted as a separate fixed add-on.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button component={Link} to="/contact" variant="contained" color="primary" size="large">
          Request a Quote
        </Button>
      </Box>
    </Container>
  );
}
