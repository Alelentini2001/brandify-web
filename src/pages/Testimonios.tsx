import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
  {
    name: 'María González',
    role: 'CEO, Fashion Brand',
    image: '/images/testimonials/client1.jpg',
    rating: 5,
    content:
      'Brandify transformó completamente nuestra presencia digital. Su equipo profesional y creativo nos ayudó a destacar en un mercado altamente competitivo.',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director de Marketing, Tech Startup',
    image: '/images/testimonials/client2.jpg',
    rating: 5,
    content:
      'El trabajo de Brandify superó todas nuestras expectativas. Su enfoque estratégico y atención al detalle nos permitió alcanzar nuestros objetivos de negocio.',
  },
  {
    name: 'Laura Martínez',
    role: 'Fundadora, E-commerce',
    image: '/images/testimonials/client3.jpg',
    rating: 5,
    content:
      'Increíble experiencia trabajando con Brandify. Su equipo no solo es técnicamente competente, sino que también entiende perfectamente las necesidades del negocio.',
  },
  {
    name: 'David Sánchez',
    role: 'Director de Operaciones, Consultora',
    image: '/images/testimonials/client4.jpg',
    rating: 5,
    content:
      'La calidad del trabajo de Brandify es excepcional. Su capacidad para entregar proyectos a tiempo y dentro del presupuesto es impresionante.',
  },
];

const Testimonios: React.FC = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '85vh',
          minHeight: 500,
          maxHeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          bgcolor: '#FFFFFF',
          pt: { xs: 8, md: 0 }, // Add top padding on mobile to avoid navbar overlap
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              align="center"
              sx={{
                color: '#1D1D1F',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Testimonios
            </Typography>

            <Divider
              sx={{
                width: '60px',
                height: '3px',
                background: '#007AFF',
                borderRadius: '2px',
                mb: 4,
                mt: 1,
                mx: 'auto',
              }}
            />

            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(0,0,0,0.6)',
                maxWidth: '650px',
                mx: 'auto',
                mb: 6,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                lineHeight: 1.5,
                fontWeight: 300,
                letterSpacing: '0.01em',
              }}
            >
              Descubre lo que nuestros clientes dicen sobre su experiencia
              trabajando con nosotros.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Grid */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: '#FFFFFF',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} ref={ref}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={testimonial.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0px 10px 24px rgba(0,0,0,0.10)',
                        borderColor: 'rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <FormatQuoteIcon
                        sx={{
                          fontSize: 40,
                          color: 'rgba(0, 122, 255, 0.2)',
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          color: 'rgba(0,0,0,0.7)',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          lineHeight: 1.8,
                          fontStyle: 'italic',
                        }}
                      >
                        {testimonial.content}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Avatar
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{
                            width: 56,
                            height: 56,
                            border: '2px solid rgba(0, 122, 255, 0.2)',
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#1D1D1F',
                              fontWeight: 600,
                              fontSize: '1rem',
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(0,0,0,0.6)',
                              fontSize: '0.875rem',
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                          <Rating
                            value={testimonial.rating}
                            readOnly
                            sx={{
                              mt: 1,
                              '& .MuiRating-iconFilled': {
                                color: '#7C3AED',
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Testimonios;
