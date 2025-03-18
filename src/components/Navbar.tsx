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
  // { title: 'Proyectos', path: '/proyectos' },
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

  return (
    <Slide appear={false} direction="down" in={true}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: scrolled
            ? alpha(theme.palette.background.default, 0.1)
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: theme.transitions.create(
            ['background-color', 'box-shadow', 'backdrop-filter'],
            {
              duration: theme.transitions.duration.standard,
            }
          ),
          boxShadow: scrolled ? '0 2px 28px 0 rgba(0,0,0,0.06)' : 'none',
          borderBottom: scrolled
            ? `1px solid ${alpha(theme.palette.divider, 0.08)}`
            : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              height: scrolled ? 70 : 80,
              transition: theme.transitions.create('height', {
                duration: theme.transitions.duration.standard,
              }),
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
                color: scrolled ? 'text.primary' : 'white',
              }}
            >
              {Boolean(anchorElNav) ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Logo */}
            <Box
              sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}
              component={Link}
              to="/"
            >
              <Logo color={scrolled ? 'primary' : 'white'} />
              <Typography
                variant="h6"
                color={scrolled ? 'primary' : 'white'}
                marginLeft={1}
                fontFamily={'sans-serif'}
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
                gap: 1,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 1,
                    color: 'invert(1)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '&::after': {
                        width: '80%',
                      },
                    },
                    ...(location.pathname === page.path && {
                      '&::after': {
                        width: '80%',
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
                  top: '70px !important',
                  left: '0 !important',
                  right: '0 !important',
                  backgroundColor: alpha(
                    theme.palette.background.default,
                    0.95
                  ),
                  backdropFilter: 'blur(10px)',
                  borderRadius: 0,
                  boxShadow: '0 2px 28px 0 rgba(0,0,0,0.06)',
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
                    py: 2,
                    borderBottom: `1px solid ${alpha(
                      theme.palette.divider,
                      0.08
                    )}`,
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                    ...(location.pathname === page.path && {
                      color: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    }),
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
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
