import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  useTheme,
  alpha,
  Tabs,
  Tab,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BusinessIcon from '@mui/icons-material/Business';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const projects = [
  {
    title: 'E-commerce Platform',
    description:
      'Desarrollo de una plataforma de comercio electrónico con sistema de pago integrado y gestión de inventario.',
    image:
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1605&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'Node.js', 'Supabase', 'Stripe'],
    year: '2025',
    category: 'web',
  },
  {
    title: 'Brand Identity Redesign',
    description:
      'Rediseño completo de identidad visual para una marca de moda sostenible.',
    image:
      'https://images.unsplash.com/photo-1611670502424-232bf030c54b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Branding', 'UI/UX', 'Illustration'],
    year: '2025',
    category: 'design',
  },
  {
    title: 'Mobile App Development',
    description:
      'Aplicación móvil para gestión de tareas con sincronización en tiempo real.',
    image:
      'https://images.unsplash.com/photo-1650636353551-1275516077b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React Native', 'Supabase', 'Redux', 'Expo'],
    year: '2025',
    category: 'mobile',
  },
  {
    title: 'Web Platform',
    description:
      'Plataforma web para gestión de recursos humanos con dashboard interactivo.',
    image:
      'https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React.js', 'Python/Java', 'PostgreSQL'],
    year: '2025',
    category: 'web',
  },
  {
    title: 'Landing Page Website',
    description:
      'Diseño y desarrollo de landing page moderna con alto índice de conversión.',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1510&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'A/B Testing'],
    year: '2025',
    category: 'web',
  },
  {
    title: 'Software Development',
    description:
      'Desarrollo de software empresarial con arquitectura escalable y microservicios.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['.NET', 'C#', 'Docker', 'Kubernetes'],
    year: '2025',
    category: 'web',
  },
];

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categories = [
    { label: 'Todos', icon: <BusinessIcon />, value: 'all' },
    { label: 'Web', icon: <CodeIcon />, value: 'web' },
    { label: 'Diseño', icon: <DesignServicesIcon />, value: 'design' },
    { label: 'Móvil', icon: <SmartphoneIcon />, value: 'mobile' },
  ];

  const filteredProjects =
    value === 0
      ? projects
      : projects.filter(
          (project) => project.category === categories[value].value
        );

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
              Nuestro Portfolio
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
              Descubre nuestros proyectos más destacados y cómo hemos ayudado a
              nuestros clientes a alcanzar sus objetivos.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Projects Section */}
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
          <Box sx={{ mb: 6 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="portfolio categories"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#7C3AED',
                  height: 3,
                },
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  minHeight: 48,
                  '&.Mui-selected': {
                    color: '#7C3AED',
                  },
                },
              }}
            >
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  icon={category.icon}
                  label={category.label}
                  sx={{
                    minWidth: { xs: 'auto', sm: 120 },
                    px: { xs: 1, sm: 3 },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Grid container spacing={4} ref={ref}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.title}>
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
                    <CardMedia
                      component="img"
                      height="240"
                      image={project.image}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          mb: 1,
                          fontWeight: 700,
                          color: 'white',
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          lineHeight: 1.6,
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(124, 58, 237, 0.1)',
                              color: '#7C3AED',
                              fontWeight: 500,
                              '&:hover': {
                                bgcolor: 'rgba(124, 58, 237, 0.2)',
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '0.75rem',
                        }}
                      >
                        {project.year}
                      </Typography>
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

export default Portfolio;
