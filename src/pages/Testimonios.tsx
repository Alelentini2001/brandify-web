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
          height: '60vh',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          bgcolor: '#0A0A0A',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
            zIndex: 1,
          },
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
                color: 'white',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(124, 58, 237, 0.3)',
              }}
            >
              Testimonios
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 800,
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
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
          background: 'linear-gradient(180deg, #000000 0%, #090909 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
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
                      bgcolor: 'rgba(15, 15, 15, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(124, 58, 237, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)',
                        borderColor: 'rgba(124, 58, 237, 0.3)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <FormatQuoteIcon
                        sx={{
                          fontSize: 40,
                          color: 'rgba(124, 58, 237, 0.2)',
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          color: 'rgba(255,255,255,0.9)',
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
                            border: '2px solid rgba(124, 58, 237, 0.2)',
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '1rem',
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.6)',
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
