import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Button,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import AnimatedButton from '../components/AnimatedButton';

const MotionCard = motion(Card);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  link: string;
  github?: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'Plataforma de comercio electrónico completa con gestión de inventario y análisis de datos en tiempo real.',
    image: '/projects/ecommerce.jpg',
    category: ['Web Development', 'E-commerce'],
    link: '#',
    github: 'https://github.com/brandify/ecommerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description:
      'Aplicación móvil de banca digital con características de seguridad avanzadas y experiencia de usuario optimizada.',
    image: '/projects/banking.jpg',
    category: ['Mobile App', 'Fintech'],
    link: '#',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux Saga'],
  },
  {
    id: 3,
    title: 'Healthcare Platform',
    description:
      'Sistema de gestión hospitalaria con telemedicina integrada y expedientes médicos electrónicos.',
    image: '/projects/healthcare.jpg',
    category: ['Web Development', 'Healthcare'],
    link: '#',
    github: 'https://github.com/brandify/healthcare',
    technologies: ['Vue.js', 'Django', 'PostgreSQL', 'WebRTC'],
  },
  {
    id: 4,
    title: 'Real Estate Portal',
    description:
      'Portal inmobiliario con búsqueda avanzada, tours virtuales y sistema de citas en línea.',
    image: '/projects/realestate.jpg',
    category: ['Web Development', 'Real Estate'],
    link: '#',
    technologies: ['Next.js', 'Prisma', 'GraphQL', 'Three.js'],
  },
  {
    id: 5,
    title: 'Delivery App',
    description:
      'Aplicación de entrega de última milla con seguimiento en tiempo real y optimización de rutas.',
    image: '/projects/delivery.jpg',
    category: ['Mobile App', 'Logistics'],
    link: '#',
    github: 'https://github.com/brandify/delivery',
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Socket.io'],
  },
  {
    id: 6,
    title: 'Educational Platform',
    description:
      'Plataforma de aprendizaje en línea con contenido interactivo y sistema de evaluación automática.',
    image: '/projects/education.jpg',
    category: ['Web Development', 'Education'],
    link: '#',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Socket.io'],
  },
];

const categories = [
  'All',
  'Web Development',
  'Mobile App',
  'E-commerce',
  'Fintech',
  'Healthcare',
  'Education',
];

const Proyectos: React.FC = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) =>
          project.category.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory]);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        ref={headerRef}
        sx={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
          overflow: 'hidden',
          pt: { xs: 12, md: 0 },
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            background:
              'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(0,0,0,0) 50%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div style={{ opacity, y }}>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              sx={{
                color: 'white',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Nuestros Proyectos
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '800px',
                mx: 'auto',
                mb: 8,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Transformando ideas en soluciones digitales innovadoras
            </Typography>

            {/* Category Filter */}
            <Stack
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
              sx={{
                px: { xs: 2, md: 0 },
                '& .MuiChip-root': {
                  m: 0.5,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  fontWeight: 500,
                  height: 'auto',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    backgroundColor:
                      selectedCategory === category
                        ? 'primary.main'
                        : alpha(theme.palette.primary.main, 0.1),
                    color:
                      selectedCategory === category
                        ? 'white'
                        : 'rgba(255,255,255,0.9)',
                    '&:hover': {
                      backgroundColor:
                        selectedCategory === category
                          ? 'primary.dark'
                          : alpha(theme.palette.primary.main, 0.2),
                    },
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Container
        maxWidth="xl"
        sx={{
          mt: -8,
          pb: 12,
          position: 'relative',
          zIndex: 2,
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          px: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)',
                    borderColor: 'rgba(124, 58, 237, 0.3)',
                    '& .project-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    className="project-image"
                    component="img"
                    height="280"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      transition: 'transform 0.6s ease',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 2,
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <AnimatedButton
                        variant="contained"
                        size="small"
                        href={project.link}
                        endIcon={<LaunchIcon />}
                        animationVariant="slide"
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          px: 2,
                          py: 1,
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                          },
                        }}
                      >
                        Ver Demo
                      </AnimatedButton>
                      {project.github && (
                        <IconButton
                          size="small"
                          href={project.github}
                          sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{ mb: 2 }}
                  >
                    {project.category.map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          fontWeight: 500,
                          m: 0.5,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Stack>

                  <Typography
                    variant="h5"
                    gutterBottom
                    fontWeight={600}
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      mb: 2,
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="rgba(255,255,255,0.7)"
                    sx={{
                      mb: 3,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom
                      fontWeight={600}
                      sx={{ mb: 1 }}
                    >
                      Tecnologías
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            color: 'text.primary',
                            m: 0.5,
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Proyectos;
