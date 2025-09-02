import React, { memo } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Stack,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, HTMLMotionProps } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const Footer: React.FC = memo(() => {
  const theme = useTheme();

  const socialLinks = [
    {
      icon: <InstagramIcon />,
      url: 'https://www.instagram.com/brandifygrowth/',
      label: 'Instagram',
    },
    { icon: <LinkedInIcon />, url: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ mr: 1 }} />,
      text: 'info@brandifygrowth.com',
      href: 'mailto:info@brandifygrowth.com',
    },
    {
      icon: <PhoneIcon sx={{ mr: 1 }} />,
      text: '+54 9 221 454 04 30',
      href: 'https://wa.me/5492214540430',
    },
    {
      icon: <LocationOnIcon sx={{ mr: 1 }} />,
      text: 'Italia',
      href: 'https://maps.google.com',
    },
  ];

  const navLinks = [
    { text: 'Inicio', path: '/' },
    { text: 'Servicios', path: '/servicios' },
    // { text: 'Proyectos', path: '/proyectos' },
    { text: 'Sobre Nosotros', path: '/sobre-nosotros' },
    // { text: 'Blog', path: '/blog' },
    { text: 'Contacto', path: '/contacto' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FFFFFF',
        color: theme.palette.text.primary,
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Clean white background for minimal look */}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Logo color="primary" />
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Brandify.
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              Transformamos ideas en experiencias digitales excepcionales.
              Creamos soluciones que conectan, inspiran y generan resultados.
            </Typography>

            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: theme.palette.primary.main,
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                      color: '#FFFFFF',
                      transform: 'translateY(-2px)',
                      borderColor: 'transparent',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Navegación
            </Typography>
            <Grid container spacing={1}>
              {navLinks.map((link, index) => (
                <Grid item xs={6} key={link.text}>
                  <Box
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.text.secondary,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        transform: 'translateX(5px)',
                      },
                    }}
                  >
                    {link.text}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Newsletter
            </Typography>
            <Stack spacing={3}>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                Suscríbete para recibir las últimas noticias y actualizaciones.
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  variant="outlined"
                  placeholder="Tu email"
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 122, 255, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    input: { color: theme.palette.text.primary },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                    borderRadius: 2,
                    px: 2.5,
                    '&:hover': { filter: 'brightness(0.95)' },
                  }}
                >
                  <ArrowForwardIcon />
                </Button>
              </Stack>

              {/* Contact Info */}
              <Stack spacing={2}>
                {contactInfo.map((info, index) => (
                  <Box
                    key={info.text}
                    component="a"
                    href={info.href}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.text.secondary,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    {info.icon}
                    <Typography>{info.text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: `1px solid rgba(0, 0, 0, 0.06)`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            © {new Date().getFullYear()} Brandify. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

export default Footer;
