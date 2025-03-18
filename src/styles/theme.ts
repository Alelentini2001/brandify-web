import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#C39B6A',
      light: '#D4B68C',
      dark: '#A27C4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F5F1',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 6px 12px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.12)',
    '0px 10px 20px rgba(0, 0, 0, 0.15)',
    '0px 12px 24px rgba(0, 0, 0, 0.18)',
    '0px 14px 28px rgba(0, 0, 0, 0.2)',
    '0px 16px 32px rgba(0, 0, 0, 0.22)',
    '0px 18px 36px rgba(0, 0, 0, 0.25)',
    '0px 20px 40px rgba(0, 0, 0, 0.28)',
    '0px 22px 44px rgba(0, 0, 0, 0.3)',
    '0px 24px 48px rgba(0, 0, 0, 0.32)',
    '0px 26px 52px rgba(0, 0, 0, 0.35)',
    '0px 28px 56px rgba(0, 0, 0, 0.38)',
    '0px 30px 60px rgba(0, 0, 0, 0.4)',
    '0px 32px 64px rgba(0, 0, 0, 0.42)',
    '0px 34px 68px rgba(0, 0, 0, 0.45)',
    '0px 36px 72px rgba(0, 0, 0, 0.48)',
    '0px 38px 76px rgba(0, 0, 0, 0.5)',
    '0px 40px 80px rgba(0, 0, 0, 0.52)',
    '0px 42px 84px rgba(0, 0, 0, 0.55)',
    '0px 44px 88px rgba(0, 0, 0, 0.58)',
    '0px 46px 92px rgba(0, 0, 0, 0.6)',
    '0px 48px 96px rgba(0, 0, 0, 0.62)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '8px 24px',
          fontWeight: 600,
          boxShadow: '0px 4px 12px rgba(195, 155, 106, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(195, 155, 106, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            color: '#FFFFFF',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
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
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
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
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C39B6A',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C39B6A',
            borderWidth: '2px',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(0, 0, 0, 0.15)',
          transition: 'border-color 0.2s ease',
        },
      },
    },
  },
});

export default theme; 