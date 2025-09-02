import { createTheme } from '@mui/material/styles';

// Create a theme instance with Apple-inspired minimalist design
const theme = createTheme({
  palette: {
    primary: {
      main: '#007AFF', // Apple blue
      light: '#5AC8FA',
      dark: '#0056CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8E8E93', // Apple gray
      light: '#C7C7CC',
      dark: '#636366',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF', // Pure white background
      paper: '#F2F2F7', // Light gray for cards
    },
    text: {
      primary: '#1D1D1F', // Apple dark text
      secondary: '#86868B', // Apple secondary text
    },
    grey: {
      50: '#F9F9F9',
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
      700: '#636366',
      800: '#48484A',
      900: '#1D1D1F',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12, // Slightly more rounded corners like Apple
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.04)',
    '0px 2px 6px rgba(0, 0, 0, 0.06)',
    '0px 4px 12px rgba(0, 0, 0, 0.08)',
    '0px 8px 24px rgba(0, 0, 0, 0.1)',
    '0px 16px 48px rgba(0, 0, 0, 0.12)',
    '0px 24px 72px rgba(0, 0, 0, 0.14)',
    '0px 32px 96px rgba(0, 0, 0, 0.16)',
    '0px 40px 120px rgba(0, 0, 0, 0.18)',
    '0px 48px 144px rgba(0, 0, 0, 0.2)',
    '0px 56px 168px rgba(0, 0, 0, 0.22)',
    '0px 64px 192px rgba(0, 0, 0, 0.24)',
    '0px 72px 216px rgba(0, 0, 0, 0.26)',
    '0px 80px 240px rgba(0, 0, 0, 0.28)',
    '0px 88px 264px rgba(0, 0, 0, 0.3)',
    '0px 96px 288px rgba(0, 0, 0, 0.32)',
    '0px 104px 312px rgba(0, 0, 0, 0.34)',
    '0px 112px 336px rgba(0, 0, 0, 0.36)',
    '0px 120px 360px rgba(0, 0, 0, 0.38)',
    '0px 128px 384px rgba(0, 0, 0, 0.4)',
    '0px 136px 408px rgba(0, 0, 0, 0.42)',
    '0px 144px 432px rgba(0, 0, 0, 0.44)',
    '0px 152px 456px rgba(0, 0, 0, 0.46)',
    '0px 160px 480px rgba(0, 0, 0, 0.48)',
    '0px 168px 504px rgba(0, 0, 0, 0.5)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // More rounded like Apple
          padding: '12px 24px',
          fontWeight: 600,
          boxShadow: '0px 2px 8px rgba(0, 122, 255, 0.15)',
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 122, 255, 0.25)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            color: '#FFFFFF',
            background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            background: 'rgba(0, 122, 255, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#F2F2F7',
          border: '1px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#E5E5EA',
          },
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            borderColor: '#007AFF',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#007AFF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#007AFF',
            borderWidth: '2px',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
          transition: 'border-color 0.2s ease',
        },
      },
    },
  },
});

export default theme; 