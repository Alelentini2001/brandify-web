import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
  alpha,
  Button,
  Divider,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { mockImages } from '../components/MockImages';
import VideoBackground from '../components/VideoBackground';
import { serviceVideos } from '../components/PremiumMedia';
import AnimatedButton from '../components/AnimatedButton';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Team members data
const teamMembers = [
  {
    name: 'Alejandro Méndez',
    role: 'CEO & Fundador',
    bio: 'Experto en marketing digital con más de 10 años de experiencia trabajando con marcas internacionales.',
    image: mockImages.team1,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Carmen Rodríguez',
    role: 'Directora de Diseño',
    bio: 'Diseñadora gráfica con pasión por crear identidades visuales que conectan con las audiencias.',
    image: mockImages.team2,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Manuel Torres',
    role: 'Director de Tecnología',
    bio: 'Desarrollador full-stack con experiencia en crear soluciones digitales innovadoras y escalables.',
    image: mockImages.team3,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Lucía Fernández',
    role: 'Especialista en Social Media',
    bio: 'Estratega de contenidos digitales enfocada en aumentar el engagement en redes sociales.',
    image: mockImages.team4,
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
];

// Values data - Simplified to make them more impactful
const values = [
  {
    title: 'Creatividad',
    description: 'Soluciones únicas que reflejan la esencia de cada marca.',
    icon: '🚀',
    gradient: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  },
  {
    title: 'Compromiso',
    description: 'Resultados alineados con los objetivos de cada cliente.',
    icon: '✨',
    gradient: 'linear-gradient(45deg, #4ECDC4, #45B7AF)',
  },
  {
    title: 'Colaboración',
    description: 'Trabajamos juntos para crear estrategias que conecten.',
    icon: '🤝',
    gradient: 'linear-gradient(45deg, #45B7AF, #3B9E98)',
  },
  {
    title: 'Resultados',
    description: 'Impacto tangible y medible para cada acción.',
    icon: '📈',
    gradient: 'linear-gradient(45deg, #3B9E98, #FF6B6B)',
  },
];

const SobreNosotros: React.FC = () => {
  const theme = useTheme();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <Box>
      {/* Hero Section - More concise and impactful */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'black',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0.95) 70%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            style={{ opacity, y }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                textAlign: 'center',
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                component={motion.h1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variant="h1"
                align="center"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Sobre Nosotros
              </Typography>

              <Divider
                component={motion.div}
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                sx={{
                  mx: 'auto',
                  height: '4px',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  borderRadius: '2px',
                  mb: 5,
                  mt: 1,
                }}
              />

              <Typography
                component={motion.p}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variant="h5"
                align="center"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 5,
                  fontSize: { xs: '1.3rem', md: '1.5rem' },
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Soluciones creativas y personalizadas para destacar en el
                entorno digital.
              </Typography>
            </Box>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 15,
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.6)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Box
              component={motion.div}
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              sx={{
                width: 6,
                height: 6,
                backgroundColor: 'white',
                borderRadius: '50%',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Our Story - More visual, less text-heavy */}
      <Container
        maxWidth="xl"
        sx={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          px: { xs: 2, md: 4 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.1) 0%, transparent 25%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 25%)',
            opacity: 0.7,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
            zIndex: 0,
          },
        }}
      >
        <Box ref={storyRef} sx={{ py: { xs: 8, md: 12 } }}>
          <motion.div
            initial="hidden"
            animate={storyInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      p: { xs: 3, md: 4 },
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background:
                          'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(236, 72, 153, 0))',
                        zIndex: -1,
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        position: 'relative',
                        mb: 4,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                        transform: 'translateZ(0)', // Fix for webkit rendering
                      }}
                    >
                      NUESTRA HISTORIA
                    </Typography>

                    <Divider
                      sx={{
                        width: '80px',
                        height: '4px',
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                        borderRadius: '2px',
                        mb: 4,
                      }}
                    />

                    <Typography
                      variant="h6"
                      color="white"
                      paragraph
                      sx={{
                        fontSize: { xs: '1.15rem', md: '1.35rem' },
                        lineHeight: 1.4,
                        mb: 3.5,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Jóvenes, frescos, y con amplia experiencia.
                    </Typography>

                    <Typography
                      variant="body1"
                      color="rgba(255,255,255,0.8)"
                      paragraph
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.8,
                        mb: 3,
                      }}
                    >
                      Brandify nació en 2024 con un equipo internacional que une
                      talento desde Italia, España y Argentina. Nuestra
                      experiencia previa con otras agencias y proyectos privados
                      nos permite ofrecer soluciones de primer nivel.
                    </Typography>

                    {/* Highlight box */}
                    <Box
                      sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 2,
                        background:
                          'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(236, 72, 153, 0.08))',
                        border: '1px solid rgba(124, 58, 237, 0.1)',
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="white"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                      >
                        No somos una agencia convencional:
                        <br />
                        creamos estrategias que generan resultados reales.
                      </Typography>
                    </Box>

                    {/* Services cards */}
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                      {[
                        'Creación de contenido',
                        'Marketing estratégico',
                        'Redes sociales',
                        'Desarrollo web',
                      ].map((service, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              height: '100%',
                              background: 'rgba(255,255,255,0.03)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid rgba(255,255,255,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                background: 'rgba(255,255,255,0.05)',
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="white"
                              align="center"
                              sx={{ fontWeight: 500 }}
                            >
                              {service}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        width: '100%',
                        height: '100%',
                        border: '3px solid',
                        borderImage:
                          'linear-gradient(45deg, #FF6B6B, #4ECDC4) 1',
                        borderRadius: 3,
                        zIndex: 0,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={mockImages.aboutUs}
                      alt="Nuestra historia"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    />
                  </Box>

                  {/* Team highlights */}
                  <Box
                    sx={{
                      mt: 6,
                      p: 4,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          mr: 1.5,
                          fontSize: '1.7rem',
                        }}
                      >
                        🌍
                      </Box>
                      Nuestro Equipo Internacional
                    </Typography>

                    <Grid container spacing={2}>
                      {[
                        { icon: '👨‍💻', text: 'Expertos en informática' },
                        { icon: '📊', text: 'Licenciados en marketing' },
                        { icon: '🎨', text: 'Creadores de contenido' },
                        { icon: '⚙️', text: 'Especialistas en desarrollo' },
                      ].map((item, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: 'rgba(255,255,255,0.04)',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                background: 'rgba(255,255,255,0.07)',
                              },
                            }}
                          >
                            <Typography variant="h4">{item.icon}</Typography>
                            <Typography
                              variant="body2"
                              color="rgba(255,255,255,0.9)"
                              align="center"
                            >
                              {item.text}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Box
                      sx={{
                        mt: 4,
                        p: 3,
                        borderRadius: 2,
                        background:
                          'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                        color="white"
                        sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                      >
                        Creamos tendencias, no las seguimos
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Box>

        {/* Our Values - More visual, less text */}
        <Box
          ref={valuesRef}
          sx={{
            py: { xs: 8, md: 10 },
            position: 'relative',
            overflow: 'hidden',
            mb: 10,
            zIndex: 1,
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  position: 'relative',
                }}
              >
                Nuestros Valores
              </Typography>

              <Divider
                sx={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  borderRadius: '2px',
                  mb: 6,
                  mx: 'auto',
                }}
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
            >
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {values.map((value, index) => (
                  <Grid item key={value.title} xs={12} sm={6} md={3}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                          },
                        },
                      }}
                      whileHover={{
                        y: -10,
                        boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          textAlign: 'center',
                          p: 4,
                          borderRadius: 4,
                          position: 'relative',
                          background: 'rgba(255,255,255,0.03)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(135deg, ${
                              index % 2 === 0
                                ? 'rgba(124, 58, 237, 0.05)'
                                : 'rgba(236, 72, 153, 0.05)'
                            }, transparent)`,
                            opacity: 0.7,
                            zIndex: 0,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '5px',
                            height: '100%',
                            background: value.gradient,
                          }}
                        />
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: { xs: '3rem', md: '4rem' },
                              mb: 3,
                              background: value.gradient,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              transform: 'translateZ(0)', // Fix for webkit rendering
                            }}
                          >
                            {value.icon}
                          </Typography>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              mb: 2,
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                              background: value.gradient,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              transform: 'translateZ(0)', // Fix for webkit rendering
                            }}
                          >
                            {value.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.8)"
                            sx={{
                              lineHeight: 1.7,
                              fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                          >
                            {value.description}
                          </Typography>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* A Quién Servimos - More visual, card-based approach */}
        <Box
          sx={{
            py: { xs: 6, md: 8 },
            mb: 10,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Container>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  position: 'relative',
                }}
              >
                A Quién Servimos
              </Typography>

              <Divider
                sx={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  borderRadius: '2px',
                  mb: 6,
                  mx: 'auto',
                }}
              />
            </motion.div>

            <Box>
              <Grid container spacing={4} sx={{ mt: 2 }}>
                {[
                  {
                    icon: '💼',
                    color: '#FF6B6B',
                    title: 'Empresas',
                    description:
                      'Aumenta tu presencia digital y genera más conversiones.',
                  },
                  {
                    icon: '👤',
                    color: '#4ECDC4',
                    title: 'Emprendedores',
                    description:
                      'Construye una identidad sólida y conecta con tu audiencia.',
                  },
                  {
                    icon: '🏆',
                    color: '#7C3AED',
                    title: 'Marcas Consolidadas',
                    description:
                      'Revitaliza tu presencia y adáptate a las nuevas tendencias.',
                  },
                ].map((item, index) => (
                  <Grid item key={index} xs={12} md={4}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        valuesInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 30 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + index * 0.1,
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                      }}
                      whileHover={{
                        y: -10,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          p: 4,
                          borderRadius: 4,
                          background: 'rgba(255,255,255,0.03)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          transition:
                            'box-shadow 0.3s ease, border-color 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                            borderColor: 'rgba(124, 58, 237, 0.2)',
                            '& .icon-bg': {
                              transform: 'scale(1.2)',
                              opacity: 0.15,
                            },
                          },
                        }}
                      >
                        <Box
                          className="icon-bg"
                          sx={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            fontSize: '8rem',
                            opacity: 0.05,
                            transition: 'all 0.5s ease',
                            color: item.color,
                            zIndex: 0,
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: '2.5rem',
                              mb: 2,
                              color: item.color,
                            }}
                          >
                            {item.icon}
                          </Typography>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              mb: 3,
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                              color: 'white',
                              position: 'relative',
                              pb: 2,
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '60px',
                                height: '3px',
                                background: item.color,
                                borderRadius: '2px',
                              },
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.8)"
                            sx={{
                              lineHeight: 1.7,
                              fontSize: '1.05rem',
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* Our Team - More visual focus */}
        <Box
          ref={teamRef}
          sx={{
            mb: 10,
            py: { xs: 8, md: 10 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                },
              },
            }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                position: 'relative',
                transform: 'translateZ(0)', // Fix for webkit rendering
              }}
            >
              Nuestro Equipo
            </Typography>

            <Divider
              sx={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                borderRadius: '2px',
                mb: 6,
                mx: 'auto',
              }}
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3,
                },
              },
            }}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
          >
            <Grid container spacing={{ xs: 4, md: 4 }}>
              {teamMembers.map((member, index) => (
                <Grid item key={member.name} xs={12} sm={6} md={3}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 100,
                          damping: 15,
                          mass: 1,
                        },
                      },
                    }}
                    whileHover={{
                      y: -15,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '0 30px 60px rgba(124, 58, 237, 0.2)',
                          borderColor: 'rgba(124, 58, 237, 0.3)',
                          '& .member-image': {
                            transform: 'scale(1.1)',
                          },
                          '& .social-overlay': {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          height: '280px',
                        }}
                      >
                        <CardMedia
                          className="member-image"
                          component="img"
                          image={member.image}
                          alt={member.name}
                          sx={{
                            height: '100%',
                            width: '100%',
                            transition:
                              'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            objectFit: 'cover',
                            filter: 'brightness(0.9)',
                          }}
                        />
                        <Box
                          className="social-overlay"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0) 100%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1.5}
                            justifyContent="center"
                            sx={{ p: 3 }}
                          >
                            {Object.entries(member.social).map(
                              ([platform, url]) => {
                                let Icon;
                                switch (platform) {
                                  case 'linkedin':
                                    Icon = LinkedInIcon;
                                    break;
                                  case 'twitter':
                                    Icon = TwitterIcon;
                                    break;
                                  case 'instagram':
                                    Icon = InstagramIcon;
                                    break;
                                  default:
                                    Icon = LinkedInIcon;
                                }

                                return (
                                  <IconButton
                                    key={platform}
                                    href={url}
                                    size="small"
                                    component={motion.a}
                                    whileHover={{
                                      y: -5,
                                      backgroundColor:
                                        platform === 'linkedin'
                                          ? '#0077B5'
                                          : platform === 'twitter'
                                          ? '#1DA1F2'
                                          : '#E1306C',
                                      color: 'white',
                                    }}
                                    sx={{
                                      bgcolor: 'rgba(255,255,255,0.15)',
                                      backdropFilter: 'blur(5px)',
                                      color: 'white',
                                      width: 40,
                                      height: 40,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                      },
                                    }}
                                  >
                                    <Icon fontSize="small" />
                                  </IconButton>
                                );
                              }
                            )}
                          </Stack>
                        </Box>
                      </Box>
                      <CardContent
                        sx={{
                          p: 3,
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'white',
                            mb: 1,
                            fontSize: '1.1rem',
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            background:
                              'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {member.role}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Diferenciador Clave - More visual and focused */}
        <Box sx={{ py: { xs: 6, md: 8 }, mb: 0 }}>
          <Container>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                }}
              >
                Lo Que Nos Hace Diferentes
              </Typography>

              <Divider
                sx={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  borderRadius: '2px',
                  mb: 6,
                  mx: 'auto',
                }}
              />
            </motion.div>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={
                valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              sx={{
                mt: 4,
                p: 0,
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Nuestra Fórmula
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 4,
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="white"
                        sx={{ fontWeight: 600 }}
                      >
                        Creatividad
                      </Typography>
                      <Typography variant="h5">+</Typography>
                      <Typography
                        variant="h6"
                        color="white"
                        sx={{ fontWeight: 600 }}
                      >
                        Estrategia
                      </Typography>
                      <Typography variant="h5">+</Typography>
                      <Typography
                        variant="h6"
                        color="white"
                        sx={{ fontWeight: 600 }}
                      >
                        Tecnología
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      color="rgba(255,255,255,0.9)"
                      sx={{
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        textAlign: 'center',
                        fontWeight: 500,
                      }}
                    >
                      Soluciones personalizadas que no solo se ven bien, sino
                      que funcionan.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Grid container spacing={3}>
                    {[
                      {
                        icon: '🎨',
                        title: 'Soluciones Creativas',
                        color: '#FF6B6B',
                      },
                      {
                        icon: '📱',
                        title: 'Enfoque Digital',
                        color: '#4ECDC4',
                      },
                      {
                        icon: '🔍',
                        title: 'Visión Estratégica',
                        color: '#7C3AED',
                      },
                      {
                        icon: '📊',
                        title: 'Resultados Medibles',
                        color: '#EC4899',
                      },
                      {
                        icon: '🌐',
                        title: 'Visión Internacional',
                        color: '#FF9F43',
                      },
                      {
                        icon: '💡',
                        title: 'Innovación Constante',
                        color: '#00CFE8',
                      },
                    ].map((item, index) => (
                      <Grid item xs={6} md={4} key={index}>
                        <motion.div
                          whileHover={{
                            y: -10,
                            boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            valuesInView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.4 + index * 0.1,
                          }}
                        >
                          <Box
                            sx={{
                              p: 3,
                              textAlign: 'center',
                              borderRadius: 3,
                              background: 'rgba(255,255,255,0.03)',
                              height: '100%',
                              border: '1px solid rgba(255,255,255,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: 'rgba(255,255,255,0.05)',
                                borderColor: item.color,
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '2rem',
                                mb: 2,
                              }}
                            >
                              {item.icon}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: 'white',
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    component={motion.div}
                    whileHover={{ y: -5 }}
                    sx={{
                      mt: 3,
                      p: 3,
                      borderRadius: 3,
                      background:
                        'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1))',
                      border: '1px solid rgba(124, 58, 237, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      align="center"
                      color="white"
                      sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                    >
                      Adaptados a las necesidades de cada cliente
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default SobreNosotros;
