import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  Collapse,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { BentoGrid } from '../components/BentoGrid';
import { BentoCard } from '../components/BentoCard';

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

function PricingCard({ pkg, index }) {
  const [expanded, setExpanded] = useState(false);
  const visibleBullets = pkg.bullets.slice(0, 3);
  const hiddenBullets = pkg.bullets.slice(3);

  return (
    <BentoCard delay={0.1 * index} className="flex flex-col h-full" noPadding>
      <Box sx={{ 
        p: 4, 
        borderTop: pkg.highlight ? '4px solid #7B61FF' : 'none',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {pkg.highlight && (
          <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
            <Chip 
              label="Most Popular" 
              sx={{ 
                background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
                color: 'white',
                fontWeight: 600
              }} 
              size="small" 
            />
          </Box>
        )}
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
          {pkg.name}
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: '#00E5FF', mb: 2, fontWeight: 800 }}>
          {pkg.price}
        </Typography>
        
        <List dense sx={{ flexGrow: 1, mb: 1 }}>
          {visibleBullets.map((b, i) => (
            <ListItem key={i} sx={{ alignItems: 'flex-start', pl: 0 }}>
              <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                <CheckCircleOutlineIcon sx={{ color: '#7B61FF' }} fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} primary={b} />
            </ListItem>
          ))}
          
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {hiddenBullets.map((b, i) => (
              <ListItem key={`hidden-${i}`} sx={{ alignItems: 'flex-start', pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                  <CheckCircleOutlineIcon sx={{ color: '#7B61FF' }} fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} primary={b} />
              </ListItem>
            ))}
          </Collapse>
        </List>

        {hiddenBullets.length > 0 && (
          <Button 
            size="small" 
            disableRipple
            onClick={() => setExpanded(!expanded)} 
            sx={{ 
              alignSelf: 'flex-start', 
              mb: 3, 
              color: '#00E5FF', 
              textTransform: 'none', 
              p: 0,
              minWidth: 'auto',
              fontWeight: 600,
              '&:hover': { background: 'transparent', textDecoration: 'underline' }
            }}
          >
            {expanded ? 'Hide features' : `+${hiddenBullets.length} more features`}
          </Button>
        )}

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mt: 'auto', mb: 3 }}>
          Timeline depends on content readiness.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          to="/contact"
          onClick={() => {
            try {
              window.dispatchEvent(new CustomEvent('cta-click', { detail: { page: 'pricing', cta: 'get_started', pkg: pkg.name } }));
            } catch (_) {}
          }}
          sx={{
            background: pkg.highlight ? 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)' : 'rgba(255,255,255,0.1)',
            color: 'white',
            borderRadius: '50px',
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            '&:hover': {
              background: pkg.highlight ? 'linear-gradient(135deg, #6A4DE5 0%, #00C4DD 100%)' : 'rgba(255,255,255,0.2)'
            }
          }}
        >
          Get Started
        </Button>
      </Box>
    </BentoCard>
  );
}

export default function Pricing() {
  const [hoveredCol, setHoveredCol] = useState(null);
  const colHoverSx = (key) => (theme) => ({
    backgroundColor:
      hoveredCol === key
        ? theme.palette.action.selected
        : key === 'business'
        ? alpha(theme.palette.primary.main, 0.06)
        : undefined,
    transition: 'background-color 120ms ease',
  });

  return (
    <>
      <Helmet>
        <title>Pricing & Packages | Web Development Services – Shaun Fitzgarald</title>
        <meta
          name="description"
          content="Transparent pricing for custom web development, including starter, business, and advanced packages tailored to your project needs."
        />
        <link rel="canonical" href="https://shaunfitzgarald.com/pricing" />
      </Helmet>
      <Box sx={{ width: '100%', pt: 4, pb: 12 }}>
      <Box textAlign="center" mb={8}>
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
          Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00E5FF]">& Packages</span>
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 760, mx: 'auto' }}>
          Transparent, fixed pricing with clear deliverables. Project timelines depend on content readiness and scope.
        </Typography>
      </Box>

      <BentoGrid className="!auto-rows-auto items-start">
        {basePackages.map((pkg, index) => (
          <div key={pkg.name} className="md:col-span-1">
            <PricingCard pkg={pkg} index={index} />
          </div>
        ))}
      </BentoGrid>

      <Box mt={8}>
        <BentoCard className="md:col-span-3">
          <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
            Feature Comparison
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: { xs: 'block', sm: 'none' }, mb: 2, color: '#00E5FF' }}
          >
            Swipe to see more →
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{
            borderRadius: 2,
            overflowX: 'auto',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            WebkitOverflowScrolling: 'touch',
          }}>
            <Table
              size="small"
              aria-label="pricing comparison table"
              sx={{
                minWidth: { xs: 680, sm: 760 },
                '& td, & th': { whiteSpace: 'nowrap', px: 2, py: 1.5, borderColor: 'rgba(255,255,255,0.05)', color: 'text.secondary' },
                '& tbody tr:hover': { backgroundColor: 'rgba(255,255,255,0.02)' },
              }}
            >
              <TableHead sx={{
                '& th': {
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontWeight: 600,
                  position: 'sticky',
                  top: 0,
                  zIndex: 2,
                  borderColor: 'rgba(255,255,255,0.1)'
                },
              }}>
                <TableRow>
                  <TableCell sx={{
                    width: { xs: '55%', sm: '45%', md: '35%' },
                    position: 'sticky',
                    left: 0,
                    zIndex: 3,
                    background: 'rgba(0,0,0,0.6)',
                  }}></TableCell>
                  <TableCell align="center"><Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700 }}>Starter</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700 }}>Business</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700 }}>Advanced</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontWeight: 500 }}>Pages</TableCell>
                  <TableCell align="center">Up to 5</TableCell>
                  <TableCell align="center">Up to 10</TableCell>
                  <TableCell align="center">Unlimited / CMS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontWeight: 500 }}>Design</TableCell>
                  <TableCell align="center">Responsive</TableCell>
                  <TableCell align="center">Custom UI styling</TableCell>
                  <TableCell align="center">Custom + performance tuning</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontWeight: 500 }}>SEO</TableCell>
                  <TableCell align="center">Basic structure</TableCell>
                  <TableCell align="center">SEO-friendly structure</TableCell>
                  <TableCell align="center">SEO optimization</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontWeight: 500 }}>Forms & Integrations</TableCell>
                  <TableCell align="center">Contact form</TableCell>
                  <TableCell align="center">Forms + basic integrations</TableCell>
                  <TableCell align="center">Advanced integrations/APIs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontWeight: 500 }}>Revisions</TableCell>
                  <TableCell align="center">2 rounds</TableCell>
                  <TableCell align="center">3 rounds</TableCell>
                  <TableCell align="center">4 rounds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontWeight: 500 }}>Timeline</TableCell>
                  <TableCell align="center">~2 weeks</TableCell>
                  <TableCell align="center">~3–4 weeks</TableCell>
                  <TableCell align="center">Varies by scope</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mt: 2 }}>
            Timelines are estimates and depend on content readiness and feedback speed.
          </Typography>
        </BentoCard>
      </Box>

      <Box mt={4}>
        <BentoGrid className="!auto-rows-auto">
          <BentoCard className="md:col-span-2">
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
              Add-Ons
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {addOns.map((item) => (
                <Grid item key={item.label}>
                  <Chip
                    label={`${item.label}: ${item.value}`}
                    sx={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 1.5,
                      fontSize: 14,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </BentoCard>

          <BentoCard className="md:col-span-1">
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
              Ongoing Support
            </Typography>
            <List dense>
              {support.map((s) => (
                <ListItem key={s.label} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#00E5FF' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${s.label}: ${s.value}`}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  />
                </ListItem>
              ))}
            </List>
          </BentoCard>

          <BentoCard className="md:col-span-3">
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
              Payment Terms
            </Typography>
            <List dense sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, md: 4 } }}>
              {paymentTerms.map((t) => (
                <ListItem key={t} sx={{ pl: 0, width: 'auto' }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#7B61FF' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t} primaryTypographyProps={{ variant: 'body2', color: 'text.primary', fontWeight: 600 }} />
                </ListItem>
              ))}
            </List>
          </BentoCard>

          <BentoCard className="md:col-span-3" sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
              FAQs & Policies
            </Typography>
            <Box sx={{ 
              '& .MuiAccordion-root': {
                background: 'transparent',
                color: 'white',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'none',
                '&:before': { display: 'none' }
              },
              '& .MuiAccordionSummary-expandIconWrapper': {
                color: 'white'
              }
            }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>What counts as a revision and how many are included?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    A revision is a batch of requested changes to the current design/content. Packages include the listed rounds; additional rounds are billed hourly. Revisions don’t include new features or pages (those are add-ons).
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>What affects the timeline?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Content readiness, responsiveness during feedback, and custom feature complexity. Delays in receiving copy, images, or approvals will extend timelines.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>Do you offer rush delivery?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Yes—subject to availability. Rush work is typically +20%–30% of the project total.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>Who provides copy and images?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Client-provided by default. Optional add-ons are available for copywriting and stock image sourcing. Brand assets (logo, colors, fonts) should be supplied upfront.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>What about ownership and hosting?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Upon final payment, you own the site deliverables. Source code is handed off or hosted on your accounts. I can also set up hosting/domain as an add-on.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>How are out-of-scope changes billed?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    New features or scope changes are billed hourly at the posted rate, or quoted as a separate fixed add-on.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </BentoCard>
        </BentoGrid>
      </Box>

      <Box textAlign="center" mt={6}>
        <Button
          component={Link}
          to="/contact"
          variant="contained"
          size="large"
          onClick={() => {
            try {
              window.dispatchEvent(new CustomEvent('cta-click', { detail: { page: 'pricing', cta: 'request_quote' } }));
            } catch (_) {}
          }}
          sx={{
            background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '50px',
            px: 6,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1.2rem'
          }}
        >
          Request a Quote
        </Button>
      </Box>
    </Box>
    </>
  );
}
