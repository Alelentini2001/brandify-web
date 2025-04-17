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
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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

interface Project {
  title: string;
  description: string;
  image: string | any;
  tags: string[];
  year: string;
  category: string;
  projectUrl?: string;
  pdfUrl?: string;
  videoUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Integrity Design',
    description:
      'Creación de identidad de marca para Integrity Design, empresa de diseño de interiores. Desarrollo de logotipo minimalista, sistema visual y aplicaciones de marca.',
    image: require('../assets/integrityDesing.png'),
    pdfUrl: require('../assets/IDENTIDAD VISUAL - INTEGRITY DESING.pdf'),
    tags: [
      'Branding',
      'Diseño de Logo',
      'Identidad Visual',
      'Diseño de Interiores',
    ],
    year: '2024',
    category: 'design',
  },
  {
    title: 'Contenido Audiovisual',
    description:
      'Creación de contenido audiovisual para redes sociales y plataformas digitales. Videos promocionales, animaciones y contenido interactivo para marcas.',
    image: 'https://img.youtube.com/vi/video-content-id/maxresdefault.jpg',
    videoUrl: require('../assets/freecompress-prueba 2.mp4'),
    tags: ['Video Marketing', 'Motion Graphics', 'Edición', 'Social Media'],
    year: '2024',
    category: 'design',
  },
  {
    title: 'Musicom',
    description:
      'Aplicación web para conectar músicos y crear comunidades musicales. Plataforma interactiva con funcionalidades de red social y gestión de eventos.',
    image: require('../assets/musicom.png'),
    projectUrl: 'https://musicomapp.com',
    tags: ['React', 'Node.js', 'Firebase', 'WebSockets'],
    year: '2024',
    category: 'web',
  },
  {
    title: 'Website Brandify',
    description:
      'Sitio web corporativo de Brandify, desarrollado con las últimas tecnologías web y enfocado en mostrar servicios y portfolio de manera interactiva.',
    image: require('../assets/brandifyWebsite.png'),
    videoUrl: '',
    tags: ['React', 'TypeScript', 'Material-UI', 'Framer Motion'],
    year: '2024',
    category: 'web',
  },
  {
    title: 'Brand Identity',
    description:
      'Desarrollo de identidad visual para Brandify, incluyendo diseño de logotipo, paleta de colores, tipografía y guía de estilo completa.',
    image: require('../assets/brandIdentity1.png'),
    pdfUrl: require('../assets/Identidad visual - Brandify.pdf'),
    tags: ['Branding', 'Diseño de Logo', 'Identidad Visual', 'Guía de Estilo'],
    year: '2024',
    category: 'design',
  },
];

const Portfolio: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
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
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '56.25%', // 16:9 aspect ratio
                        borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
                        overflow: 'hidden',
                      }}
                    >
                      {project.videoUrl ? (
                        <video
                          src={project.videoUrl}
                          muted
                          playsInline
                          preload="metadata"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          image={project.image}
                          alt={project.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                          }}
                        />
                      )}

                      {/* Hover overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0,0,0,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleOpenProject(project)}
                          sx={{
                            bgcolor: 'rgba(124, 58, 237, 0.9)',
                            '&:hover': {
                              bgcolor: 'rgba(124, 58, 237, 1)',
                            },
                          }}
                        >
                          Ver Proyecto
                        </Button>
                      </Box>
                    </Box>

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

      {/* Project Details Modal */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={handleCloseProject}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'rgba(15, 15, 15, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(124, 58, 237, 0.1)',
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.3)',
                borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                {selectedProject.title}
              </Typography>
              <IconButton
                onClick={handleCloseProject}
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '80vh',
                }}
              >
                {selectedProject.pdfUrl ? (
                  <iframe
                    src={selectedProject.pdfUrl}
                    title={selectedProject.title}
                    width="100%"
                    height="100%"
                    style={{
                      border: 'none',
                    }}
                  />
                ) : selectedProject.videoUrl ? (
                  <video
                    src={selectedProject.videoUrl}
                    controls
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      bgcolor: 'black',
                    }}
                  />
                )}
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 2,
                    lineHeight: 1.7,
                  }}
                >
                  {selectedProject.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {selectedProject.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      sx={{
                        bgcolor: 'rgba(124, 58, 237, 0.1)',
                        color: '#7C3AED',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {selectedProject.projectUrl && (
                    <Button
                      variant="contained"
                      endIcon={<OpenInNewIcon />}
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#7C3AED',
                        '&:hover': {
                          bgcolor: '#6D28D9',
                        },
                      }}
                    >
                      Visitar Proyecto
                    </Button>
                  )}
                  {selectedProject.pdfUrl && (
                    <Button
                      variant="contained"
                      endIcon={<OpenInNewIcon />}
                      href={selectedProject.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#7C3AED',
                        '&:hover': {
                          bgcolor: '#6D28D9',
                        },
                      }}
                    >
                      Descargar PDF
                    </Button>
                  )}
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Portfolio;
