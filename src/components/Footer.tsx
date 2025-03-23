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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
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
    { icon: <FacebookIcon />, url: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, url: '#', label: 'Twitter' },
    { icon: <InstagramIcon />, url: '#', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ mr: 1 }} />,
      text: 'brandifyok@gmail.com',
      href: 'mailto:brandifyok@gmail.com',
    },
    {
      icon: <PhoneIcon sx={{ mr: 1 }} />,
      text: '+54 9 221 454 04 30',
      href: 'https://wa.me/5492214540430',
    },
    {
      icon: <LocationOnIcon sx={{ mr: 1 }} />,
      text: 'Argentina',
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
        bgcolor: 'black',
        color: 'white',
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #000000 0%, #1a1a1a 100%)',
          opacity: 0.95,
          zIndex: 0,
        }}
      />

      {/* Decorative Elements */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Logo />
              <Typography
                variant="body1"
                sx={{
                  color: alpha('#fff', 0.7),
                  maxWidth: 300,
                  lineHeight: 1.8,
                }}
              >
                Transformamos ideas en experiencias digitales extraordinarias.
                Innovación y creatividad en cada proyecto.
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Navegación
            </Typography>
            <Grid container spacing={2}>
              {navLinks.map((link, index) => (
                <Grid item xs={6} key={link.text}>
                  <Box
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: alpha('#fff', 0.7),
                      textDecoration: 'none',
                      display: 'block',
                      py: 0.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
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
              <Typography sx={{ color: alpha('#fff', 0.7) }}>
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
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                    },
                    input: { color: 'white' },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
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
                      color: alpha('#fff', 0.7),
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
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
            borderTop: `1px solid ${alpha('#fff', 0.1)}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: alpha('#fff', 0.6) }}>
            © {new Date().getFullYear()} Brandify. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

export default Footer;
