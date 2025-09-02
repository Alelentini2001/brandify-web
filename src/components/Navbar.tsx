import React, { useState, useEffect, memo } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useScrollTrigger,
  useTheme,
  alpha,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Servicios', path: '/servicios' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Testimonios', path: '/testimonios' },
  { title: 'Sobre Nosotros', path: '/sobre-nosotros' },
  { title: 'Contacto', path: '/contacto' },
];

const Navbar: React.FC = memo(() => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

  // Check if user has scrolled down to change navbar appearance
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Hide on scroll down
  const hideOnScroll = useScrollTrigger();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Close menu when route changes
  useEffect(() => {
    handleCloseNavMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isLight = !isHome || scrolled; // Light nav on scroll or non-home routes

  return (
    <Slide appear={false} direction="down" in={true}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isLight ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: isLight ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: isLight ? 'blur(18px)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: isLight ? '0px 1px 0px rgba(0,0,0,0.06)' : 'none',
          borderBottom: isLight ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              height: scrolled ? 64 : 72,
              transition: 'height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              px: { xs: 2, md: 0 },
            }}
          >
            {/* Mobile Menu Icon */}
            <IconButton
              size="large"
              edge="start"
              onClick={handleOpenNavMenu}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                color: isLight ? '#1D1D1F' : 'white',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&:hover': {
                  backgroundColor: isLight
                    ? 'rgba(0,0,0,0.06)'
                    : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {Boolean(anchorElNav) ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Logo */}
            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              component={Link}
              to="/"
            >
              <Logo color={isLight ? 'primary' : 'white'} />
              <Typography
                variant="h6"
                sx={{ color: isLight ? '#1D1D1F' : 'white' }}
                marginLeft={1}
                fontFamily={
                  'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                }
                fontWeight={800}
                fontSize="1.25rem"
                letterSpacing="-0.01em"
              >
                Brandify.
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: isLight ? 'rgba(0,0,0,0.85)' : 'white',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    borderRadius: '12px',
                    padding: '10px 16px',
                    minWidth: 'auto',
                    textTransform: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      backgroundColor: isLight
                        ? alpha(theme.palette.primary.main, 0.08)
                        : 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-1px)',
                      color: isLight ? theme.palette.primary.main : '#5AC8FA',
                    },
                    ...(location.pathname === page.path && {
                      backgroundColor: isLight
                        ? alpha(theme.palette.primary.main, 0.12)
                        : 'rgba(255, 255, 255, 0.2)',
                      color: isLight ? theme.palette.primary.main : 'white',
                      fontWeight: 700,
                      '&:hover': {
                        backgroundColor: isLight
                          ? alpha(theme.palette.primary.main, 0.18)
                          : 'rgba(255, 255, 255, 0.25)',
                      },
                    }),
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* Mobile Navigation Menu */}
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  width: '100%',
                  maxWidth: '100%',
                  top: '64px !important',
                  left: '0 !important',
                  right: '0 !important',
                  backgroundColor: isLight ? '#FFFFFF' : 'rgba(15, 15, 35, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 0,
                  boxShadow: isLight ? '0px 1px 0px rgba(0,0,0,0.06)' : '0px 1px 0px rgba(0, 122, 255, 0.2)',
                  borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0, 122, 255, 0.1)',
                },
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    py: 2.5,
                    px: 3,
                    borderBottom: isLight
                      ? '1px solid rgba(0,0,0,0.06)'
                      : `1px solid rgba(255, 255, 255, 0.1)`,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                    '&:hover': {
                      backgroundColor: isLight
                        ? 'rgba(0,0,0,0.04)'
                        : 'rgba(255, 255, 255, 0.1)',
                    },
                    ...(location.pathname === page.path && {
                      color: isLight ? theme.palette.primary.main : '#5AC8FA',
                      backgroundColor: isLight
                        ? alpha(theme.palette.primary.main, 0.1)
                        : 'rgba(255, 255, 255, 0.15)',
                      fontWeight: 700,
                    }),
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'inherit',
                      letterSpacing: '-0.01em',
                      color: isLight ? '#1D1D1F' : 'white',
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
});

export default Navbar;
