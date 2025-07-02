import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ACF83', // Vibrant tech green
      light: '#3EE6A3',
      dark: '#09A366',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0066FF', // Tech blue
      light: '#4D94FF',
      dark: '#0047B3',
      contrastText: '#fff',
    },
    // Tech color variations
    tech: {
      green: {
        main: '#0ACF83',
        dark: '#09A366',
        darker: '#076E45',
        darkest: '#054C30',
      },
      blue: {
        main: '#0066FF',
        dark: '#0047B3',
        darker: '#003380',
        darkest: '#001F4D',
      },
      cyan: '#00C2FF',
      purple: '#7B61FF',
      black: '#121212',
      darkGray: '#1E1E1E',
      gray: '#2D2D2D',
      lightGray: '#3D3D3D',
    },
    background: {
      default: '#121212', // Near black
      paper: '#1E1E1E', // Dark gray
      elevated: '#2D2D2D', // Slightly lighter dark gray
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#6C6C6C',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#121212',
          color: '#ffffff',
          borderRight: '1px solid rgba(10,207,131,0.2)',
          boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
          transition: 'all 0.2s ease',
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(10,207,131,0.3)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: '#0ACF83',
          '&:hover': {
            background: '#09A366',
          },
        },
        containedSecondary: {
          background: '#0066FF',
          '&:hover': {
            background: '#0047B3',
            boxShadow: '0px 4px 10px rgba(0,102,255,0.3)',
          },
        },
        outlined: {
          borderWidth: 1,
          '&:hover': {
            borderWidth: 1,
            backgroundColor: 'rgba(10,207,131,0.08)',
          }
        },
        outlinedPrimary: {
          borderColor: '#0ACF83',
          '&:hover': {
            borderColor: '#3EE6A3',
          }
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(10,207,131,0.08)',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(10,207,131,0.2)',
          background: 'linear-gradient(90deg, #121212 0%, #1E1E1E 100%)',
          borderBottom: '1px solid rgba(10,207,131,0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#1E1E1E',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #2D2D2D',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, #0ACF83, #0066FF)',
            opacity: 0.9,
            transition: 'height 0.2s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(10,207,131,0.15), 0 8px 30px rgba(0,102,255,0.15)',
            '&::before': {
              height: '3px',
            }
          },
        },
      },
    },
  },
});

export default theme;
